'use strict'

const Model = use('App/Models/Employee')

class Employee {
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    const { user_id, name_of_employee } = request.all()
      ,findUserID = await Model.findOne({ user_id })
      ,method = request.method()
      ,findUserName = await Model.findOne({ name_of_employee }),
      status = 409

    if (findUserID && method === "POST") {
      return response.status(status).json({
        message: `User with the UserID ${user_id} Exist...!`,
        data: { 
            user_id, 
            name_of_employee: findUserID.name_of_employee 
        }
      })
    }

    if ( ( findUserName && method === "POST" ) || ( findUserName && findUserName.user_id != id && method === "PATCH" ) ) {
      return response.status(status).json({
        message: `User with the Name ${name_of_employee} Exist...!`,
        data: { 
          user_id: findUserName.user_id, 
          name_of_employee: findUserName.name_of_employee 
        } 
      })
    }

    await next()
  }
}

module.exports = Employee
