'use strict'

class ManageController {
    
    response (response, obj) {
        if (obj.status === undefined || obj.status === null) {
          obj.status = 200
        }

        return response.status(obj.status).json({
          message: obj.message,
          data: obj.data
        })
    }
}

module.exports = ManageController
