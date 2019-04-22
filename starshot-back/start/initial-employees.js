/*await use(`App/Models/Employee`)
      .insertMany([
        {
          name_of_employee: `James Roncesvalles`,
          clock_time_in: new Date(),
          clock_time_out: new Date(),
          active: true
        },
        {
          name_of_employee: `James Roncesvalles`,
          clock_time_in: new Date(),
          clock_time_out: new Date(),
          active: true
        },
        {
          name_of_employee: `James Roncesvalles`,
          clock_time_in: new Date(),
          clock_time_out: new Date(),
          active: true
        }
    ])*/

const EmployeeModel = use('App/Models/Employee');
const { name: { findName }, random: { boolean } } = require('faker')
const { range, each } = require('lodash')

const CreateEmployees = () => {
    const employees = []

    each(range(1, 11), (user_id) => {
        employees.push({
            user_id,
            name_of_employee: findName(),
            clock_in_time: new Date(),
            clock_out_time: new Date(),
            active: boolean()
        })
    })

    return employees
}

const InitialEmployees = async () => {
    const count = await EmployeeModel.countDocuments()

    if (count === 0) {
        const employees = CreateEmployees()

        await EmployeeModel.insertMany(employees)
    }
}

InitialEmployees()