export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Please log in to access this resource'});
    }
};