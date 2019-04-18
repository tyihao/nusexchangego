<template>
  <v-container>
    <strong><font face="verdana" size="7" color="#3B3A37"> {{school}} </font></strong>
    <br>
    <font face="verdana" size="4"> Hello there, school. </font>
    <hr><br>
    <b-row>
      <b-col cols="3">
        <b-list-group v-b-scrollspy:listgroup-ex >
          <b-list-group-item href="#list-item-1" variant="light">Overall Information</b-list-group-item>
          <b-list-group-item href="#list-item-2" variant="light">Reviews</b-list-group-item>
          <b-list-group-item href="#list-item-3" variant="light">Analysis</b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="9">
        <div id="listgroup-ex" style="position:relative;overflow-y:auto;height:400px">

          <h4 id="list-item-1">Overall Information</h4>
          <div align='left'>
            The Georgia Institute of Technology, also known as Georgia Tech, is a top-ranked public college and one of the leading research universities in the USA.
            <br><br>
            Georgia Tech provides a technologically focused education to more than 25,000 undergraduate and graduate students in fields ranging from engineering, computing, and sciences, to business, design, and liberal arts.
            <br><br>
            Georgia Tech's wide variety of technologically-focused majors and minors consistently earn strong national rankings. Georgia Tech has six colleges and 28 schools focusing on Business, Computing, Design, Engineering, Liberal Arts, and Sciences.
          </div></br>
          <br>
          <br>
          <h4 id="list-item-2">Reviews</h4>
          Based on 28 students from the past 4 semesters.
          <br> <br> <br>
          <div align = 'left'>

            <v-flex xs11 align-center>
            <div>
               <b-card-group deck>
                 <b-card
                   border-variant="secondary"
                   header="Average Expenditure"
                   header-border-variant="secondary"
                   align="center"
                 >
                   <b-card-text>aLorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                 </b-card>

                 <b-card
                   border-variant="secondary"
                   header="School's location"
                   header-border-variant="secondary"
                   align="center"
                 >
                   <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                 </b-card>


               </b-card-group>
             </div>
             <br>
             <div>
                <b-card-group deck>
                  <b-card
                    border-variant="secondary"
                    header="Overall Safety"
                    header-border-variant="secondary"
                    align="center"
                  >
                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                  </b-card>

                  <b-card
                    border-variant="secondary"
                    header="Culture and Heritage"
                    header-border-variant="secondary"
                    align="center"
                  >
                    <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
                  </b-card>


                </b-card-group>
              </div>
            </v-flex>






        </div></br>
        <br>
        <br>
        <h4 id="list-item-3">Analysis</h4>
        <div align='left'>
          <br><br>
          <font size='3' face='verdana'> Students by Semester </font> <br>
          <div id="multichart" align='center'>
            <apexchart width="500" type="line" :options="chartOptions" :series="series"></apexchart>
          </div>
          <font size='3' face='verdana'> Students by Faculty </font> <br>
          <div id="piechart" align='center'>
            <apexchart type=pie width=360 :options="piechartOptions" :series="pieseries" />
          </div>



        </div></br>
      </div>
    </div>
  </b-col>
</b-row>
</v-container>
</template>


<script>
export default {
  name: 'Further Details',
  props: {
    selectedSchool: {
      type: String
    }
  },
  data () {
    return {
      school: "",
      schools: [
        { school: 'Florida University', deets: 'FL is awesome' },
        { school: 'Georgia Institute of Technology', deets: 'GA is awesome' },
        { school: 'Nebraska University', deets: 'NE is awesome' },
        { school: 'University of California', deets: 'CA is awesome' },
        { school: 'New York University', deets: 'NY is awesome' }
      ],
      series: [{
        name: 'Average Expenditure',
        type: 'column',
        data: [12000, 16000, 11000, 17000]
      }, {
        name: 'CAP Cut-Off',
        type: 'column',
        data: [4.0, 4.1, 4.2, 4.5]
      }, {
        name: 'Number of Students',
        type: 'line',
        data: [23, 42, 30, 41]
      }],
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        chart:{
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: ['AY16/17 S2', 'AY17/18 S1', 'AY17/18 S2', 'AY18/19 S1'],
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
          seriesName: 'Income',
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
          seriesName: 'Revenue',
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
    },
    pieseries: [30,42,10,22,40],
    piechartOptions: {
      labels: ['School of Computing', 'Faculty of Arts and Social Sciences', 'Faculty of Science', 'Faculty of Engineering', 'School of Design and Environment'],
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      legend: {
        show: true,
        position: 'bottom'
      }
    }
  }
},
watch: {
  selectedSchool: function(){
    this.school = this.selectedSchool
  }
}
}
</script>
