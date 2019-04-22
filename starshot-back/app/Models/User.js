'use strict'
const Model = use('MongooseModel')

class User extends Model {
  
  static get schema() {
    return {
      username: { type: String },
      password: { type: String }
    }
  }
}

module.exports = User.buildModel('User')

