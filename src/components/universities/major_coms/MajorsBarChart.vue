<template>
  <v-container id="chart">

    <v-layout row justify-space-around>

      <v-flex xs4 sm4 md3 offset-xs0 align-self-center>
        <b-card
        border-variant="secondary"
        header="Filters"
        header-border-variant="secondary"
        align="center"
        >

        <b-card-text>
          <v-container>
            <font face="verdana">Cumulative Average Point</font>

            <v-flex xs12>
              <vue-slider
              ref="slider"
              v-model="filterCap"
              min="0.0"
              max="5.0"
              interval="0.01"
              ></vue-slider>
            </v-flex>



            <font face="verdana">Average Expenditure</font>

            <v-flex xs12>
              <vue-slider
              ref="slider"
              v-model="filterExp"
              min="8000"
              :enable-cross='false'
              max="20000"
              interval="100"
              ></vue-slider>
            </v-flex>

            <v-flex xs111>
              <v-btn flat outline small @click="reRender"> Apply </v-btn>
            </v-flex>


          </v-container>
        </b-card-text>
      </b-card>
      <v-spacer></v-spacer>
    </v-flex>
    <v-spacer></v-spacer>
  </v-flex>
  <v-flex xs17 sm9>
    <apexchart type=line height=350 :options="chartOptions" :series="series" />
  </v-flex>
</v-layout>
</v-container>
</template>

<script>

import { universityDetailsDataRef } from '../../../firebase';

export default {
  firebase: {
    universityDetailsData: universityDetailsDataRef
  },
  methods: {
    reRender () {
      this.CAPLimit = this.filterCap;
      this.expenditureUpperLimit = this.filterExp[1];
      this.expenditureLowerLimit = this.filterExp[0];    
      }
  },
  computed: {
    universityData() {
      var result = [];
      if (this.universityDetailsData.length > 0) {
        var universityDetails = this.universityDetailsData[0];

        var counter = 0;
        var numberOfUni = Object.keys(universityDetails).length - 1;

        for (var puName in universityDetails) {
          
          var expenditureDetails = universityDetails[puName]["Average Expenditure"];
          var averageExpenditure = 0;
          for (var i = 0; i < expenditureDetails.length; i++) {
            averageExpenditure += expenditureDetails[i] / expenditureDetails.length;
          }
          averageExpenditure = Math.round(averageExpenditure);
          
          var CAPDetails = universityDetails[puName]["CAP Cut-off"];
          var averageCAP = 0;
          for (var i = 0; i < CAPDetails.length; i++) {
            averageCAP += CAPDetails[i] / CAPDetails.length;
          }
          averageCAP = averageCAP.toFixed(2);

          var studentsCount = universityDetails[puName]["Students Count by Major"];
          var majors = universityDetails[puName]["Majors"];
          var index = -1;
          for (var i = 0; i < majors.length; i++) {
            if (majors[i] == this.selectedMajor) {
              index = i;
            }
          }
          var numberStudents = studentsCount[index];

          result.push({ name: puName, 
                        expenditure: averageExpenditure,
                        cap: averageCAP,
                        numstu: numberStudents });
  
          counter += 1;
          if (counter == numberOfUni) {
            break;
          }
        }
      }
      return result;     
    },
    universityDataTopFive() {
      var result = [];
      if (this.universityData.length > 0) {

        var indexUsed = [];
        for (var counter = 0; counter < 5; counter++) {

          var greatestIndex = -1;
          var greatest = 0;
          for (var i = 0; i < this.universityData.length; i++) {
            if (this.universityData[i]["numstu"] > greatest) {
              if (! indexUsed.includes(i)) {
                if (this.universityData[i]["expenditure"] >= this.expenditureLowerLimit &&
                    this.universityData[i]["expenditure"] <= this.expenditureUpperLimit) {
                  if (this.universityData[i]["cap"] <= this.CAPLimit) {
                    greatest = this.universityData[i]["numstu"];
                    greatestIndex = i;
                  }
                }
              }
            }
          }
          if (greatestIndex != -1) {
            result.push(this.universityData[greatestIndex]);
            indexUsed.push(greatestIndex);
          }
        }
      }
      return result;
    },
    series() {
      var result = [];
      var expenditureData = [];
      var CAPCutoffData = [];
      var numberStudentsData = [];
      if (this.universityDataTopFive.length > 0) {
        for (var i = 0; i < this.universityDataTopFive.length; i++) {
          var uniDetail = this.universityDataTopFive[i];
          expenditureData.push(uniDetail["expenditure"]);
          CAPCutoffData.push(uniDetail["cap"]);
          numberStudentsData.push(uniDetail["numstu"]);
        }
      }
      var numStuText = "Number of " + this.selectedMajor + " Students";
      result.push({name: "Average Expenditure", type: "column", data: expenditureData});
      result.push({name: "CAP Cut-Off", type: "column", data: CAPCutoffData});
      result.push({name: numStuText, type: "line", data: numberStudentsData});
      return result;
    },
    chartOptions() {
      var result = {};
      if (this.series.length > 0) {

        var puNames = [];
        for (var i = 0; i < this.universityDataTopFive.length; i++) {
          puNames.push(this.universityDataTopFive[i]["name"]);
        }
        var chartTitle = "Most Popular Universities for " + this.selectedMajor + " Majors";
        var yAxisNumStu = "Number of " + this.selectedMajor + " Students";

        result = {
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
            text: chartTitle,
            align: 'center',
            offsetX: 0,
            style: {
              fontSize: '16px',
              fontFamily: 'Verdana',
              color: undefined
            } 
          },
          xaxis: {
            categories: puNames,
            labels: {
              style: {
                fontSize: '12px'
              }
            }
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
                fontSize: '13px'
              }
            },
            title: {
              text: "Average Expenditure (Singapore Dollars)",
              style: {
                color: '#008FFB',
                fontSize: '13px'
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
              color: '#00E396',
              fontSize: '13px'
            },
            labels: {
              style: {
                color: '#00E396',
                fontSize: '13px'
              }
            },
            title: {
              text: "CAP Cut-Off",
              style: {
                color: '#00E396',
                fontSize: '13px'
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
              color: '#FEB019',
              fontSize: '13px'
            },
            labels: {
              style: {
                color: '#FEB019',
                fontSize: '13px'
              },
            },
            title: {
              text: yAxisNumStu,
              style: {
                color: '#FEB019',
                fontSize: '13px'
              }
            }
          }],
          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            },
          },
          legend: {
            horizontalAlign: 'center',
            offsetX: 0
          }
        }
      }
      return result;
    }
  },
  data: function() {
    return {
      selectedMajor: "Business Analytics",
      CAPLimit: 5.0,
      expenditureUpperLimit: 20000,
      expenditureLowerLimit: 8000,
      filterCap: 5.0,
      filterExp: [8000,20000],   
    }
  },
  props: {
    major:{
      type:String
    }
  },
  watch: {
    major: function() {
      this.selectedMajor = this.major
    }
  },
  mounted(){
    universityData()
  }
}
</script>
