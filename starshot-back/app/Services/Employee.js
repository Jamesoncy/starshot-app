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

            return {
                data,
                message: `Employees has been retrieve Successfully from # ${ startPage } to ${ limitPage }`
            }
        } catch (err) {
            return this.errorResponse(err)
        }
    }

}

module.exports = new Employee()
