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
        offset-sm4
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
        offset-sm4
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer />
            <v-btn flat color="primary" @click="menu = false">
              Cancel
            </v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">
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
          @click="get"
        >
          Get
        </v-btn>
      </v-flex>
      <v-flex
        v-if="id"
        xs12
        sm6
      >
        Student ID: {{ id }}
      </v-flex>
      <v-flex
        v-if="dob"
        xs12
        sm6
      >
        DOB: {{ dob }}
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
      studentBirthDay: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      id: null,
      dob: null
    }
  },

  methods: {
    async submitStudentInfo() {
      console.log(this.studentId)
      console.log(this.date)
      const student = new FormData()
      student.set('id', this.studentId)
      student.set('dob', this.date)
      const config = {
        headers: {
          'content-type': 'application/json'
        }
      }
      await this.$axios.$post('students', student, config)
    },

    async get() {
      const info = await this.$axios.$get('students/ST100')
      this.id = info.id
      this.dob = info.dob
    }
  }
}
</script>
