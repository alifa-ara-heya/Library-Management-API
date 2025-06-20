import express, { NextFunction, Request, Response } from 'express';
import { Book } from '../models/book.model';
export const booksRoutes = express.Router();

booksRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body
        const book = await Book.create(body)

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        })
    } catch (error: any) {
        next(error)
    }
})

// get all books
booksRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query
        console.log('sort', sort);
        console.log('sortBy', sortBy);

        // console.log(filter);
        const query: any = {}
        if (filter) {
            query.genre = filter
            // console.log('query', query);
            // console.log('filter', filter);
        }

        const sortOrder = sort === 'desc' ? -1 : 1;

        // const books = await Book.find({ genre: filter })
        const books = await Book.find(query)
            .sort({ [sortBy as string]: sortOrder })
            .limit((Number(limit)))

        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        })

    } catch (error: any) {
        next(error)
    }
})


// global error handler (sobar last e)
booksRoutes.use((error: any, req: Request, res: Response, next: NextFunction) => {

    if (error.name === 'ValidationError') {
        // return console.log('error', error);
        res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: {
                name: error.name,
                errors: error.errors
            }
        })
    }

    // other errors
    res.status(400).json({
        message: error.message || 'Something went wrong',
        success: false,
        error
    });

})