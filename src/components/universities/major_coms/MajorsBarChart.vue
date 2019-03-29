<template>
  <v-container id="chart">

    <v-layout row wrap align-center>
      <v-flex xs6>
        <font face='verdana' size='4'> Filters </font><br><br><br><br>
        <div id="cap_filter">
          <v-flex d-flex grid-list-lg>
            <v-layout row wrap>
              <v-flex xs9>
                <v-slider
                v-model="filterCap"
                :max="5"
                :step='0.01'
                thumb-label
                label="Cumulative Average Point"
                ></v-slider>
              </v-flex>

              <v-flex xs9>
                <v-range-slider
                v-model="filterExp"
                :max="20000"
                :min="8000"
                :step="1"
                thumb-label
                label="Average Expenditure"
                ></v-range-slider>
                <v-flex xs9>
                  <v-btn flat small @click="reRender"> Update </v-btn>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-flex d-flex>

        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <apexchart type=line height=350 :options="chartOptions" :series="series" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  methods: {
    reRender () {
      this.indexs1 = [];
      this.indexs2 = [];
      this.filteredCap = [];
      this.filteredExp = [];
      this.filteredNumStudents = [];
      this.filteredSchools = [];
      for (i = 0; i < this.capCutOff.length; i++) {
        if (this.capCutOff[i] <= this.filterCap){
          this.indexs1.push(i);
        }
      }
      for (var i of this.indexs1) {
        if ( this.avgExp[i] <= this.filterExp[1]){
          var x = parseInt(i, 10);
          this.indexs2.push(x);
        }
      }

      for (var i of this.indexs2) {
        this.filteredCap.push(this.capCutOff[i]);
        this.filteredNumStudents.push(this.numStuds[i]);
        this.filteredExp.push(this.avgExp[i]);
        this.filteredSchools.push(this.schoolNames[i]);
      }

      this.series = [{
        name: 'Average Expenditure',
        type: 'column',
        data: this.filteredExp
      }, {
        name: 'CAP Cut-Off',
        type: 'column',
        data: this.filteredCap
      }, {
        name: 'Number of Students',
        type: 'line',
        data: this.filteredNumStudents
      }]
      this.chartOptions = {
        xaxis:{
          categories: this.filteredSchools
        }
      }
    }
  },
  data: function() {
    return {
      schoolNames: ['Tsinghua University', 'Hong Kong University', 'ETH Zurich', 'New York University', 'Waterloo'],
      filteredSchools: [],
      filteredCap: [],
      filteredNumStudents: [],
      filteredExp: [],
      indexs1: [],
      indexs2: [],
      avgExp: [12000, 16000, 15000, 11000, 17000],
      capCutOff: [4.1,4.3,4.6,3.1,4.5],
      numStuds: [23, 42, 43, 30, 41],
      filterCap: 5.0,
      filterExp: [8000,20000],
      series: [{
        name: 'Average Expenditure',
        type: 'column',
        data: [12000, 16000, 15000, 11000, 17000]
      }, {
        name: 'CAP Cut-Off',
        type: 'column',
        data: [4.1,4.3,4.6,3.1,4.5]
      }, {
        name: 'Number of Students',
        type: 'line',
        data: [23, 42, 43, 30, 41]
      }],
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        chart:{
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: 'Popular Universities for your major',
          align: 'left',
          offsetX: 160
        },
        xaxis: {
          categories: ['Tsinghua University', 'Hong Kong University', 'ETH Zurich', 'New York University', 'Waterloo'],
        },
        yaxis: [{
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              color: '#008FFB',
            }
          },
          title: {
            text: "Average Expenditure (Singapore Dollars)",
            style: {
              color: '#008FFB',
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: 'CAP Cut-Off',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              color: '#00E396',
            }
          },
          title: {
            text: "CAP Cut-Off",
            style: {
              color: '#00E396',
            }
          },
        },
        {
          seriesName: 'Number of Students',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              color: '#FEB019',
            },
          },
          title: {
            text: "Number of Students",
            style: {
              color: '#FEB019',
            }
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  }
}
}
</script>
