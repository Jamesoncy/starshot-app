'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { response }) {
    let message,
        name = error.name

    if (name === "ValidationException") {
      message = error.messages
    } else {
      message = error.message
    }

    response.status(error.status).json({
      message,
      name
    })
  }
}

module.exports = ExceptionHandler
