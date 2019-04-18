'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  static get dates() {
    return super.dates.concat(['dob'])
  }
  
  static castDates(field, value) {
    if (field === 'dob') {
      return value.format('DD-MM-YYYY')
    }
  }

  getName(name) {
    return name.toLowerCase()
  }
}

module.exports = Student
