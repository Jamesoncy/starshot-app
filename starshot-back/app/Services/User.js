'use strict'

class User {

    async validate(username, password, auth) {
        try {
            const result = await auth.attempt(username, password)
            return {
                message: 'User credentials successfully logged in...!',
                data: result
            }
        } catch(err) {
            return {
                message: err.message.replace(`${err.code}: `, '').trim(),
                data: [],
                status: 401
            }
        }
    }
}

module.exports = new User()
