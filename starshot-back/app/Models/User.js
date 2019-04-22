'use strict'
const Model = require('./BaseModel')
const uuid = require('uuid')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()
    
    this.addHook('beforeCreate', async (model) => {
      model.id = uuid()
    })
    
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
}

module.exports = User
