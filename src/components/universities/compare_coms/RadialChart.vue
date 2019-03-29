lm ,<template>
  <div>

    <apexchart type=radar height=350 :options="chartOptions" :series="series"/></apexchart>
  </div>
</template>

<script>

export default {
    data: function() {
      return {
        series: [{
            name: 'Georgia Institute of Technology',
            data: [2,3,4,5,3,2],
        }, {
            name: 'New York University',
            data: [5,3,1,2,3,5],
        }, {
            name: 'University of California',
            data: [3,3,4,4,2,1],
        }],

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
          labels: ['CAP Cut-Off', 'Safety', 'Culture and Heritage', 'Location', 'Price', 'Difficulty']
        }
    }
  }
}
</script>
