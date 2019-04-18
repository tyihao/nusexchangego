<template>

<v-container id="table">
      <v-flex>
            <div>
              <template>
                {{lol}}
                <v-data-table :headers="header" :items="tableData" class="elevation-1 text-xs-center">
                  <template v-slot:items="props">
                    <td >{{ props.item.name }}</td>
                    <td >{{ props.item.expenditure }}</td>
                    <td >{{ props.item.cap }}</td>
                    <td >{{ props.item.numstu }}</td>
                  </template>
                </v-data-table>
              </template>
            </div>
      </v-flex>
</v-container>

</template>


<script>

import { universityDetailsDataRef } from '../../../firebase';

export default {
  firebase: {
    universityDetailsData: universityDetailsDataRef
  },
  computed: {
    tableData() {
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
    header() {
      var numStuText = "Number of " + this.selectedMajor + " Students";
      return [
          {text: 'Partner University', align: 'middle', sortable: false, value: 'name'},
          { text: 'Average Expenditure', align: 'middle', value: 'expenditure' },
          { text: 'CAP Cut Off', align: 'middle', value: 'cap' },
          { text: numStuText, align: 'middle', value: 'numstu' }
        ]
    }
  },
  data: function() {
    return {
      selectedMajor: "Business Analytics",
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
    tableData()
  }
}
</script>