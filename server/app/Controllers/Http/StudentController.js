'use strict'

const Student = use('App/Models/Student')

class StudentController {

  async store({ request, response }) {
    const data = request.post()
    const student = new Student()
    student.id = data.id
    student.dob = data.dob
    await student.save()
    response.status(200)
  }

  async show({ request, response, params }) {
    try {
      const student = await Student.find(params.id)
      console.log(student.toJSON())
      return student.toJSON()
    } catch(e) {
      console.log(e.message)
    }
  }
}

module.exports = StudentController
