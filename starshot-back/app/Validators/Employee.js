'use strict'

class Employee {
  get rules () {
    const method = this.ctx.request.method()
    if (method === `PATCH`) {
      const {
        id
      } = this.ctx.params
      return {
        name_of_employee: `required`,
        clock_in_time: 'required|date',
        clock_out_time:'required|date',
        status: 'required|boolean'
      }
    }
    return {
      user_id: 'required|integer',
      name_of_employee: 'required',
      clock_in_time: 'required|date',
      clock_out_time: 'required|date',
      status: 'required|boolean'
    }
  }
}

module.exports = Employee
