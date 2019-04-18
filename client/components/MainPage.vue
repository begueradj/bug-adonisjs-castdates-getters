<template>
  <v-container
    grid-list-md
    text-xs-center
    fill-height
  >
    <v-layout
      row
      wrap
      align-center
    >
      <v-flex
        xs12
        sm4
      >
        <v-text-field
          v-model="studentId"
          label="Student ID"
          outline
        />
      </v-flex>
      <v-flex
        xs12
        sm4
      >
        <v-text-field
          v-model="studentName"
          label="Student name"
          outline
        />
      </v-flex>
      <v-flex
        xs12
        sm4
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="studentBirthday"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="studentBirthday"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="studentBirthday" no-title scrollable>
            <v-spacer />
            <v-btn flat color="primary" @click="menu = false">
              Cancel
            </v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(studentBirthday)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex
        xs12
        sm6
      >
        <v-btn
          @click="submitStudentInfo()"
        >
          Submit
        </v-btn>
      </v-flex>
      <v-flex
        xs12
        sm6
      >
        <v-btn
          @click="getFirstStudent"
        >
          Get
        </v-btn>
      </v-flex>
      <v-flex
        v-if="id"
        xs12
        sm4
      >
        Student ID: {{ id }}
      </v-flex>
      <v-flex
        v-if="dob"
        xs12
        sm4
      >
        DOB: {{ dob }}
      </v-flex>
      <v-flex
        v-if="name"
        xs12
        sm4
      >
        Name: {{ name }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MainPage',

  data() {
    return {
      studentId: null,
      studentName: null,
      studentBirthday: new Date().toISOString().substr(0, 10),
      menu: false,
      id: null,
      dob: null,
      name: null
    }
  },

  methods: {
    async submitStudentInfo() {
      const student = new FormData()
      student.set('id', this.studentId)
      student.set('name', this.studentName)
      student.set('dob', this.studentBirthday)
      const config = {
        headers: {
          'content-type': 'application/json'
        }
      }
      await this.$axios.$post('students', student, config)
    },

    async getFirstStudent() {
      const info = await this.$axios.$get('students/ST100')
      this.id = info.id
      this.dob = info.dob
      this.name = info.name
    }
  }
}
</script>
