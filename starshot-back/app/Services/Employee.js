'use strict'
const Model = use('App/Models/Employee')
const Service = require('./Service')

class Employee extends Service {

    async paginate(page) {
        try {
            const start = Number(page || 1),
                limit = 5,
                data = await Model.paginate({}, { page: start, limit }),
                limitPage = start * limit,
                startPage = limitPage - limit + 1

            return this.successResponse(
                `Employees has been retrieve Successfully from # ${ startPage } to ${ limitPage }`,
                data
            )
        } catch (err) {
            return this.errorResponse(err)
        }
    }

    async create(user_id, name_of_employee, clock_in_time, clock_out_time, active) {
        try {
            const record = await Model.create({
                user_id,
                name_of_employee,
                clock_in_time,
                clock_out_time,
                active
            })

            return this.successResponse(
                `Employee ${name_of_employee} has been created Successfully...!`,
                record
            )
        } catch (err) {
            return this.errorResponse(err)
        }
    }

    async update(user_id, name_of_employee, clock_in_time, clock_out_time, active) {
        try {
            await Model.updateOne({ user_id }, { name_of_employee, clock_in_time, clock_out_time, active })
            const user = await Model.findOne({ user_id })

            return this.successResponse(
                `UserID ${user_id} has been updated Successfully...!`,
                user
            )
        } catch (err) {
            return this.errorResponse(err)
        }
    }

    async delete(user_id) {
        try {
            const record = await Model.remove({ user_id });
            
            return this.successResponse(
                `UserID ${user_id} has been removed Successfully...!`,
                record
            )
        } catch (err) {
            return this.errorResponse(err)
        }
    }

}

module.exports = new Employee()
