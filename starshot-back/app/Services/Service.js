'use strict'

class Service {

    errorResponse(err) {
        return {
            message: err.message.replace(`${err.code}: `, '').trim(),
            data: [],
            status: 401
        }
    }

    successResponse(message, data, status = 200) {
        return {
            data, message
        }
    }
}

module.exports = Service
