<template>
  <v-container>
  <v-layout align-center>
  <v-flex xs6>
  <multi-selects/>
  <radial-chart/>
  </v-flex>
  </v-layout>
</v-container>
</template>

<script>

export default {
  name: 'Compare Universities',
  data() {
    return {
      value: null,
      options: ['list', 'of', 'options']
    };
  },
  components: {
    RadialChart: () => import('@/components/universities/compare_coms/RadialChart'),
    MultiSelects: () => import('@/components/universities/compare_coms/multiselect')
  }
}
</script>
