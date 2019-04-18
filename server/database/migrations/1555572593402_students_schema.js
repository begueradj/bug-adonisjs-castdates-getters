'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentsSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.string('id', 30).primary()
      table.date('dob').notNullable()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentsSchema
