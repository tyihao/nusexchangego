<template>
  <v-container>
    <v-flex>
    <h1> Compare Universities </h1>
    <p> Here you can choose and compare the specific universities!</p>
  </v-flex> <hr>
  <br>
  <v-layout row wrap>
  <v-flex xs12>
  <multi-selects/>
  </v-flex>
  <v-layout>
  <v-flex xs6>
  <radial-chart/>
  </v-flex>
  <v-flex xs6>
  <radial-chart/>
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

    };
  },
  components: {
    RadialChart: () => import('@/components/universities/compare_coms/RadialChart'),
    MultiSelects: () => import('@/components/universities/compare_coms/multiselect')
  }
}
</script>
