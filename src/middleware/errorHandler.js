import {ValidationError} from '../services/validationService.js';

export function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err instanceof ValidationError) {
        return res.status(400).json({error: err.message});
    }

    res.status(500).json({
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
}