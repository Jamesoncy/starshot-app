'use strict'
const Model = use('MongooseModel')
const mongoosePaginate = require('mongoose-paginate')

class Employee extends Model {

  static boot ({ schema }) {
    schema.plugin(mongoosePaginate)
  }

  static get schema() {
    
    return {
      user_id: { type: Number },
      name_of_employee: { type: String },
      clock_in_time: { type: Date },
      clock_out_time: { type: Date },
      active: { type: Boolean },
    }
  }
}

module.exports = Employee.buildModel('Employee')

