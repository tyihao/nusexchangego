<template>
  <v-container>
    {{regions}}
    <br>
    <br><br>
    <h1> Compare Universities by Majors </h1>
    <p> Here you can compare universities by majors </p>
    <hr><br><br>
    <majors-dropdown @newMajor="updateMajor"/>
    <majors-bar-chart/>
    </v-container>
  </template>

  <script>
  export default {
    name: 'Compare by Major',
    components: {
      MajorsDropdown: () => import('@/components/universities/major_coms/MajorsDropdown'),
      MajorsBarChart: () => import('@/components/universities/major_coms/MajorsBarChart'),
      TableInfo: () => import('@/components/universities/Table')
    },
    data: function() {
      return {
        major: ''
      }
    },
    methods: {
      updateRegions(variable) {
        this.major = variable;
      }
    }
  }
  </script>
