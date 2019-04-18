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
           v-model="selectedMajor"
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
      yourMajor: "Business Analytics",
      majors: [
        'Business Analytics',
        'Computer Science',
        'Information Systems'
      ],
      selectedMajor: 'Business Analytics'
    }),

    watch: {
      selectedMajor () {
        this.$emit("newMajor",this.selectedMajor)
    }

    },
    mounted(){
      selectedMajor()
    }
  }
</script>
