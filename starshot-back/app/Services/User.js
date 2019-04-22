'use strict'
const Service = require('./Service')

class User extends Service {

    async validate(username, password, auth) {
        try {
            const result = await auth.attempt(username, password)
            return this.successResponse(
                'User credentials successfully logged in...!',
                result
            )
        } catch(err) {
            return this.errorResponse(err)
        }
    }
}

module.exports = new User()
