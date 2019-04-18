'use strict'

const Student = use('App/Models/Student')

class StudentController {

  async store({ request, response }) {
    const data = request.post()
    const student = new Student()
    const keys = Object.keys(data)
    keys.forEach((key) => { student[key] = data[key] })
    await student.save()
    response.status(200)
  }

  async show({ request, response, params }) {
    try {
      const student = await Student.find(params.id)
      return student.toJSON()
    } catch(e) {
      console.log(e.message)
    }
  }
}

module.exports = StudentController
