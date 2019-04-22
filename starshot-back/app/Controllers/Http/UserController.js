'use strict'
const Service = use('App/Services//User'),
  BaseController = use('App/Controllers/BaseController')

class UserController extends BaseController {

    async login({ request, response, auth }) {
        const { username, password } = request.all()
        const result = await Service.validate(username, password, auth)

        return this.response(response, result)
    }
}

module.exports = UserController
