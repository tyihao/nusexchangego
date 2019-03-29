<template>

  <v-container
    id="majors_dropdown"
    tag="section"
  >
  <v-layout row wrap align-center>
       <v-flex xs6>
         <v-subheader>Select your Major</v-subheader>
       </v-flex>

       <v-flex xs12 sm6>
         <v-select
           v-model="select"
           :items="majors"

           label="Select"
           persistent-hint
           return-object
           single-line
         ></v-select>
       </v-flex>
     </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      majors: [
        'Business Analytics',
        'Computer Science',
        'Information Security',
        'Information Systems'

      ],
      selectedMajor: ''
    }),

    computed: {
      changeMajor () {
        this.$emit("newMajor",this.selectedMajor)
    }

    }
  }
</script>
