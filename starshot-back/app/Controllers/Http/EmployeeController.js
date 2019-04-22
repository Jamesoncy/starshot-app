'use strict'
const Service = use('App/Services/Employee')
const BaseController = use('App/Controllers/BaseController')

class EmployeeController extends BaseController {

    async list({ response, params: { page } }) {
        const result = await Service.paginate(page)
        return this.response(response, result)
    }
}

module.exports = EmployeeController
