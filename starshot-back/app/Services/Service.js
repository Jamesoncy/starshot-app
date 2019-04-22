'use strict'

class Service {

    errorResponse(err) {
        return {
            message: err.message.replace(`${err.code}: `, '').trim(),
            data: [],
            status: 401
        }
    }
}

module.exports = Service
