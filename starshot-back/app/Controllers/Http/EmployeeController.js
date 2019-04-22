'use strict'
const Service = use('App/Services/Employee')
const BaseController = use('App/Controllers/BaseController')

class EmployeeController extends BaseController {

    async list({ response, params: { page } }) {
        const result = await Service.paginate(page)
        return this.response(response, result)
    }

    async create({ response, request }) {
        const { user_id, name_of_employee, clock_in_time, clock_out_time, active } = request.post(),
            result = await Service.create(user_id, name_of_employee, clock_in_time, clock_out_time, active)

        return this.response(response, result)
    }

    async update({ response, request, params: { id } }) {
        const { name_of_employee, clock_in_time, clock_out_time, active } = request.post(),

            result = await Service.update(id, name_of_employee, clock_in_time, clock_out_time, active)

        return this.response(response, result)
    }

    async delete({ response, params: { id } }) {
        const result = await Service.delete(id)

        return this.response(response, result)
    }
}

module.exports = EmployeeController
