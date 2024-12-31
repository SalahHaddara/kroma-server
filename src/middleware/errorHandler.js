import {ValidationError} from '../services/validationService.js';

export function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err instanceof ValidationError) {
        return res.status(400).json({error: err.message});
    }
}