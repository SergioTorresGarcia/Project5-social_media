export const handleSuccess = (res, successMessage, data, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message: successMessage,
        data: data
    })
};


