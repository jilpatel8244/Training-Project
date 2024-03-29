exports.globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).json({
        success: false,
        statusCode: error.statusCode,
        message: error.message
    })
}