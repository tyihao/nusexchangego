<template>
  <v-container>
    <strong><font face="verdana" size="7" color="#3B3A37"> {{school}} </font></strong>
    <br>
    <font face="verdana" size="4"> Hello there, Shervin. </font>
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
            {{ description1 }}
            <br><br>
            {{ description2 }}
            <br><br>
            {{ description3 }}
          </div></br>
          <br>
          <br>
          <h4 id="list-item-2">Reviews</h4>
          Based on {{ numberOfStudents }} students from the past 4 semesters.
          <br> <br> <br>
          <div align = 'left'>

            <v-flex xs11 align-center>
            <div class="details">
               <b-card-group deck >
                 <b-card
                   border-variant="secondary"
                   header="Average Expenditure"
                   header-border-variant="secondary"
                   align="center"
                 >
                 <v-container ma-0 pa-1 pl-5 pr-5>
                    <b-card-title> ${{averageExpenditure}} </b-card-title>
                    <b-card-text> This is higher than {{expenditurePercentile}}% of other Partner Universities. </b-card-text>
                  </v-container>
                 </b-card>

                 <b-card
                   border-variant="secondary"
                   header="School's location"
                   header-border-variant="secondary"
                   align="center"
                 >
                 <v-container ma-0 pa-1 pl-5 pr-5>
                    <b-card-title> {{locationScore}}/5.0 </b-card-title>
                    <b-progress :value="locationScore" :max="max" class="mb-3"></b-progress>
                    <b-card-text> This is higher than {{locationPercentile}}% of other Partner Universities. </b-card-text>
                  </v-container>
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
                    class="text-center"
                  > <b-card-body>
                    <v-container ma-0 pa-1 pl-5 pr-5>
                    <b-card-title> {{safetyScore}}/5.0 </b-card-title>
                    <b-progress :value="safetyScore" :max="max" class="mb-3"></b-progress>
                    <b-card-text> This is higher than {{safetyPercentile}}% of other Partner Universities. </b-card-text>
                  </v-container>
                  </b-card-body>
                  </b-card>




                  <b-card
                    border-variant="secondary"
                    header="Culture and Heritage"
                    header-border-variant="secondary"
                    align="center"
                  >
                  
                  <v-container ma-0 pa-1 pl-5 pr-5>
                    <b-card-title> {{cultureScore}}/5.0 </b-card-title>
                    <b-progress :value="cultureScore" :max="max" class="mb-3"></b-progress>
                    <b-card-text> This is higher than {{culturePercentile}}% of other Partner Universities. </b-card-text>
                  </v-container>
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
          <font size='3' face='verdana'> Students by Major </font> <br>
          <div id="piechart" align='center'>
            <apexchart type=pie width=360 :options="piechartOptions" :series="pieseries" />
          </div>

          <font size='3' face='verdana'> CAP Distribution </font> <br>
          <div id="piechart" align='center'>
            <apexchart width="500" type="bar" :options="options" :series="barSeries"></apexchart>
          </div>



        </div></br>
      </div>
    </div>
  </b-col>
</b-row>
</v-container>
</template>


<script>

import { universityDetailsDataRef } from '../../../firebase';

export default {
  name: 'Further Details',
  props: {
    selectedSchool: {
      type: String
    }
  },
  firebase: {
    universityDetailsData: universityDetailsDataRef,
  },
  computed: {
    description1() {
      var result = "";
      if (this.universityDetailsData.length > 0) {
        result = this.universityDetailsData[0][this.school]["Description 1"];
      }
      return result;
    },
    description2() {
      var result = "";
      if (this.universityDetailsData.length > 0) {
        result = this.universityDetailsData[0][this.school]["Description 2"];
      }
      return result;
    },
    description3() {
      var result = "";
      if (this.universityDetailsData.length > 0) {
        result = this.universityDetailsData[0][this.school]["Description 3"];
      }
      return result;
    },
    numberOfStudents() {
      var result = 0;
      if (this.universityDetailsData.length > 0) {
        var studentCounts = this.universityDetailsData[0][this.school]["Number of Students"];
        for (var i = 0; i < studentCounts.length; i++) {
          result += studentCounts[i];
        }
      }
      return result;
    },
    series() {
      var result = [];
      if (this.universityDetailsData.length > 0) {
        var universityDetails = this.universityDetailsData[0][this.school];
        result.push({name: "Average Expenditure", type: 'column', data: universityDetails["Average Expenditure"]});
        result.push({name: "CAP Cut-Off", type: 'column', data: universityDetails["CAP Cut-off"]});
        result.push({name: "Number of Students", type: 'line', data: universityDetails["Number of Students"]});
      }
      return result;
    },
    chartOptions() {
      var result = []
      if (this.universityDetailsData.length > 0) {
        result = {
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
            categories: this.universityDetailsData[0][this.school]["AYSem"],
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
          },],
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
      return result;
    },
    pieseries() {
      var result = [];
      if (this.universityDetailsData.length > 0) {
        result = this.universityDetailsData[0][this.school]["Students Count by Major"];
      }
      return result;
    },
    piechartOptions() {
      var result = {};
      if (this.universityDetailsData.length > 0) {
        var majors = this.universityDetailsData[0][this.school]["Majors"];
        var result = {
          labels: majors,
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
      return result;
    },
    barSeries() {
      var result = [];
      if (this.universityDetailsData.length > 0) {
        var CAPDistribution = this.universityDetailsData[0][this.school]["CAP Distribution"];
        result = [{name: 'Number of Students', data: CAPDistribution}];
      }
      return result;
    },
    averageExpenditure() {
      var result = 0;
      if (this.universityDetailsData.length > 0) {
        for (var universityName in this.universityDetailsData)
        var expenditure = this.universityDetailsData[0][this.school]["Average Expenditure"];
        for (var i = 0; i < expenditure.length; i++) {
          result += expenditure[i];
        }
        result = Math.round(result / expenditure.length);
      }
      return result;
    },
    expenditurePercentile() {
      var result = 0;
      var lessCount = 0;
      if (this.universityDetailsData.length > 0) {
        var counter = 0;
        var numberOfUni = Object.keys(this.universityDetailsData[0]).length - 1;
        for (var universityName in this.universityDetailsData[0]) {
          var expenditure = this.universityDetailsData[0][universityName]["Average Expenditure"];
          var average = 0;
          for (var i = 0; i < expenditure.length; i++) {
            average += expenditure[i];
          }
          average = Math.round(average / expenditure.length);
          if (average < this.averageExpenditure) {
            lessCount += 1;
          }
          counter += 1;
          if (counter == numberOfUni) {
            break;
          }
        }
        result = Math.round((lessCount / numberOfUni) * 100);
      }
      return result;
    },
    locationScore() {
      var result = 0;
      if (this.universityDetailsData.length > 0) {
        for (var universityName in this.universityDetailsData)
        var locationScore = this.universityDetailsData[0][this.school]["Location Score"];
        for (var i = 0; i < locationScore.length; i++) {
          result += locationScore[i];
        }
        result = result / locationScore.length;
        result = result.toFixed(1);
      }
      result = parseFloat(result);
      return result;
    },
    locationPercentile() {
      var result = 0;
      var lessCount = 0;
      if (this.universityDetailsData.length > 0) {
        var counter = 0;
        var numberOfUni = Object.keys(this.universityDetailsData[0]).length - 1;
        for (var universityName in this.universityDetailsData[0]) {
          var location = this.universityDetailsData[0][universityName]["Location Score"];
          var average = 0;
          for (var i = 0; i < location.length; i++) {
            average += location[i];
          }
          average = Math.round(average / location.length);
          if (average < this.locationScore) {
            lessCount += 1;
          }
          counter += 1;
          if (counter == numberOfUni) {
            break;
          }
        }
        result = Math.round((lessCount / numberOfUni) * 100);
      }
      return result;
    },
    safetyScore() {
      var result = 0;
      if (this.universityDetailsData.length > 0) {
        for (var universityName in this.universityDetailsData)
        var safetyScore = this.universityDetailsData[0][this.school]["Safety Score"];
        for (var i = 0; i < safetyScore.length; i++) {
          result += safetyScore[i];
        }
        result = result / safetyScore.length;
        result = result.toFixed(1);
      }
      result = parseFloat(result);
      return result;
    },
    safetyPercentile() {
      var result = 0;
      var lessCount = 0;
      if (this.universityDetailsData.length > 0) {
        var counter = 0;
        var numberOfUni = Object.keys(this.universityDetailsData[0]).length - 1;
        for (var universityName in this.universityDetailsData[0]) {
          var safety = this.universityDetailsData[0][universityName]["Safety Score"];
          var average = 0;
          for (var i = 0; i < safety.length; i++) {
            average += safety[i];
          }
          average = Math.round(average / safety.length);
          if (average < this.safetyScore) {
            lessCount += 1;
          }
          counter += 1;
          if (counter == numberOfUni) {
            break;
          }
        }
        result = Math.round((lessCount / numberOfUni) * 100);
      }
      return result;
    },
    cultureScore() {
      var result = 0;
      if (this.universityDetailsData.length > 0) {
        for (var universityName in this.universityDetailsData)
        var cultureScore = this.universityDetailsData[0][this.school]["Culture Score"];
        for (var i = 0; i < cultureScore.length; i++) {
          result += cultureScore[i];
        }
        result = result / cultureScore.length;
        result = result.toFixed(1);
      }
      result = parseFloat(result);
      return result;
    },
    culturePercentile() {
      var result = 0;
      var lessCount = 0;
      if (this.universityDetailsData.length > 0) {
        var counter = 0;
        var numberOfUni = Object.keys(this.universityDetailsData[0]).length - 1;
        for (var universityName in this.universityDetailsData[0]) {
          var culture = this.universityDetailsData[0][universityName]["Culture Score"];
          var average = 0;
          for (var i = 0; i < culture.length; i++) {
            average += culture[i];
          }
          average = Math.round(average / culture.length);
          if (average < this.cultureScore) {
            lessCount += 1;
          }
          counter += 1;
          if (counter == numberOfUni) {
            break;
          }
        }
        result = Math.round((lessCount / numberOfUni) * 100);
      }
      return result;
    }
  },
  data () {
    return {
      max: 5,
      school: "",
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['3.0 - 3.5','3.5 - 4.0','4.0 - 4.5','4.5 - 5.0']
        },
        chart:{
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
      },
    }
  },
  watch: {
    selectedSchool: function(){
      this.school = this.selectedSchool
    }
  }
}
</script>

<style>
.card-body{
  text-align: center !important;
}
</style>