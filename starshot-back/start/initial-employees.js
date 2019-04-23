const EmployeeModel = use('App/Models/Employee');
const { name: { findName }, random: { boolean } } = require('faker')
const { range, each } = require('lodash')
const moment = require('moment')

const CreateEmployees = () => {
    const employees = [],
      clock_in_time = moment(),
      clock_out_time = moment(clock_in_time).add(1, 'days')

    each(range(1, 11), (user_id) => {
        employees.push({
            user_id,
            name_of_employee: findName(),
            clock_in_time,
            clock_out_time,
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