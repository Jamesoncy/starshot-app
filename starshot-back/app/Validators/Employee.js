'use strict'

class Employee {
  get rules () {
    const method = this.ctx.request.method(),
      { clock_in_time } = this.ctx.request.all()

    if (method === `PATCH`) {
      return {
        name_of_employee: `required`,
        clock_in_time: 'required|date',
        clock_out_time:`required|date|after:${ new Date(clock_in_time) }`,
        active: 'required|boolean'
      }
    }
    
    return {
      user_id: 'required|integer',
      name_of_employee: 'required',
      clock_in_time: 'required|date',
      clock_out_time: `required|date|after:${ new Date(clock_in_time) }`,
      active: 'required|boolean'
    }
  }
}

module.exports = Employee
