export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export function validateStructure(generated, template) {
    for (const key in template) {
        if (!(key in generated)) {
            throw new ValidationError(`Missing required key: ${key}`);
        }
        if (typeof template[key] !== typeof generated[key]) {
            throw new ValidationError(`Invalid type for key: ${key}`);
        }
    }
}

export function validatePrompt(prompt) {
    if (!prompt || typeof prompt !== 'string') {
        throw new ValidationError('Valid prompt string is required');
    }
    if (prompt.length < 10) {
        throw new ValidationError('Prompt must be at least 10 characters long');
    }
}