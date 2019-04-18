<template>
  <v-container>
    <v-flex>
    <h1> Compare Universities </h1>
    <p> Here you can choose and compare the specific universities!</p>
  </v-flex> <hr>
  <br>
  <v-layout row wrap>
  <v-flex xs12>
  <multi-selects @changeSchool="changeSchool"/>
  </v-flex>
  <v-layout>
  <v-flex xs12>
  <radial-chart v-show="schools[0]" :parentSchools="schools"/>
  <div v-if="!schools[0]" align='center'>
    <br><br><br><br><br><br>Please select at least one University.<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
  </v-flex>

  </v-layout>
  </v-layout>
</v-container>
</template>

<script>

export default {
  name: 'Compare Universities',
  data() {
    return {
      schools: []
    };
  },
  methods: {
    changeSchool(variable) {
      this.schools = variable;
    }
  },
  components: {
    RadialChart: () => import('@/components/universities/compare_coms/RadialChart'),
    MultiSelects: () => import('@/components/universities/compare_coms/multiselect')
  }
}
</script>
