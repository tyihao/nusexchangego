<template>
  <div>
    <apexchart type=radar height=350 :options="chartOptions" :series="series"/></apexchart>
  </div>
</template>

<script>

export default {
  props: {
    parentSchools: {
      type: Array
    }
  },
  watch: {
    parentSchools: function(){
      this.schools = this.parentSchools
      this.series = this.parentSchools
    }
  },
  data: function() {
    return {
      schools: [],

      series: [],

      chartOptions: {
        chart: {
          dropShadow: {
            enabled: false,
            blur: 1,
            left: 1,
            top: 1
          },
          toolbar: {show: false}
        },

        stroke: {
          width: 0
        },
        fill: {
          opacity: 0.4
        },
        markers: {
          size: 0
        },
        labels: ['CAP Cut-Off', 'Safety', 'Culture and Heritage', 'Location', 'Expenditure', 'Overall Experience']
      }
    }
  }
}
</script>
