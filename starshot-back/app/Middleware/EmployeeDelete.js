'use strict'
const Model = use('App/Models/Employee')

class EmployeeDelete {
  async handle ({ response, params: { id } }, next) {
    // call next to advance the request

    const findUser = await Model.findOne({ user_id: id })

    if (!findUser) {
      return response.status(409).json({
        message: `User with the User ID ${ id } is not Existing...!`,
        data: []
      })
    }

    await next()
  }
}

module.exports = EmployeeDelete
