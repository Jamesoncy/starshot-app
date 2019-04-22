'use strict'

const Model = use('Model')
const uuid = require('uuid')

class BaseModel extends Model {
    static boot () {
        super.boot()
    
        this.addHook('beforeCreate', async (model) => {
            model.id = uuid()
        })
    }

    static castDates (field, value) {
        return value.format('YYYY-MM-DD h:m A')
    }

    static get primaryKey () {
      return 'id'
    }
    
    static get incrementing () {
      return false
    }
}

module.exports = BaseModel