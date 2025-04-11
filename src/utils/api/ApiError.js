class ApiError extends Error {
    constructor(statusCode , message, errors = []) {
        super(message)
        this.message = message || "Something went wrong";
        this.data = null;
        this.success = false;
        this.statusCode = statusCode;
        this.errors = errors
    }
}

export default ApiError