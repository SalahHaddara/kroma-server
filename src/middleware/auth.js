export const protect = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

};