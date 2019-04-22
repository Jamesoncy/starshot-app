'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Employee', (faker) => {
  return {
    name_of_employee: faker.username(),
    clock_time_in: new Date(),
    clock_time_out: new Date(),
    active: faker.bool()
  }
})
