<template>
  <div v-if="matric" id="intro" class="moduleresult">
    <v-container text-xs-left>
      <v-layout row wrap>
        <v-flex xs4>
          <div class="welcome pb-2">
            <h5>
              Welcome,
              <strong>{{ studentName }}</strong>
            </h5>
          </div>

          <div class="instruction">
            <h5>Here you go!</h5>You entered NUS in
            <strong>{{yearOfEnrolment}}</strong>,
            is from the
            <strong>{{faculty}}</strong>, and your major is
            <strong>{{major}}</strong>.
            <br>We have generated a list of Partner Universities with the most
            pre-approved modules for your major.
            <br>The modules listed includes all cores and programme electives.
            <br>
            <br>For more information, click on the module of your choice!
          </div>

          <br>
          <v-select
            v-model="selectedRegions"
            :items="regions"
            label="Select"
            :menu-props="{ maxHeight: '400' }"
            multiple
            hint="Pick your favorite regions"
            persistent-hint
          >
            <template v-slot:prepend-item>
              <v-list-tile ripple @click="toggle">
                <v-list-tile-action>
                  <v-icon :color="selectedRegions.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Select All</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>

          <br>

          <div>
            <b-list-group v-for="x in sortedMappingCounts" v-b-scrollspy:listgroup-ex>
              <b-list-group-item
                href="javascript:return false;"
                variant="light"
                v-on:click="clickUni(x['Uni'])"
              >{{x['Uni']}} ({{x['Mod']}})</b-list-group-item>
            </b-list-group>
          </div>
        </v-flex>
        <v-flex xs1></v-flex>

        <v-flex xs7 v-if="selectedUniversity">
          <v-flex>
            <v-btn-toggle v-model="showAllMods" mandatory>
              <v-btn
                light
                @click="toggleShowCore"
              >Show Core Modules Only ({{ numberOfMappableCoreModules }})</v-btn>
              <v-btn
                light
                @click="toggleShowAll"
                toggle
              >Show All Modules ({{ numberOfMappableAllModules }})</v-btn>
              
            </v-btn-toggle>
          </v-flex>
          <br>
          <h3>{{selectedUniversity}}</h3>
          <br>

          

          <v-flex>
            <div>
              <template>
                <v-data-table :headers="header" :items="mappingTable.slice(1)" class="elevation-1 text-xs-center" 
                :pagination.sync="pagination" v-model="selectedModule">
                  <template v-slot:items="props">
                    <td @click="clickmodule(props.item[1])" v-scroll-to="'#dashboard'">{{ props.item[1] }}</td>
                    <td @click="clickmodule(props.item[1])" v-scroll-to="'#dashboard'">{{ props.item[2] }}</td>
                    <td @click="clickmodule(props.item[1])" v-scroll-to="'#dashboard'">{{ props.item[4] }}</td>
                    <td @click="clickmodule(props.item[1])" v-scroll-to="'#dashboard'">{{ props.item[5] }}</td>
                  </template>
                </v-data-table>
              </template>
            </div>
          </v-flex>

      


        </v-flex>
      </v-layout>
    </v-container>

    <v-container id="dashboard" v-show="selectedModule">
      <Moduleinfo :msg="selectedModule"/>
    </v-container>
  </div>
</template>


<script>
import { programEnrolmentRef } from "../../firebase";
import { moduleEnrolmentRef } from "../../firebase";
import { coreModulesRef } from "../../firebase";
import { moduleMappingsRef } from "../../firebase";
import { universitiesRef } from "../../firebase";
import { moduleReviewsDataRef } from "../../firebase";

export default {
  name: "moduleresult",
  props: {
    msg: {
      type: String
    }
  },
  data: function() {
    return {
      pagination: { rowsPerPage: 20 },
      header: [
        { text: "PU Module Code" },
        { text: "PU Module Name" },
        { text: "NUS Module Code" },
        { text: "NUS Module Name" }
      ],
      showAllMods: false,
      selectedUniversity: "",
      selectedModule: "",
      matric: "A0170548B", // hardcoded
      initialSelectedRegionsSet: false,
      selectedRegions: []
    };
  },
  firebase: {
    coreModules: coreModulesRef,
    programEnrolment: programEnrolmentRef,
    moduleEnrolment: moduleEnrolmentRef,
    moduleMappings: moduleMappingsRef,
    universities: universitiesRef,
    moduleReviewsData: moduleReviewsDataRef
  },
  components: {
    Moduleinfo: () => import("@/components/modules/moduleinfo")
  },
  computed: {
    studentInformation() {
      var result = {};
      if (this.programEnrolment.length > 0) {
        var columnNames = this.programEnrolment[0][".value"];
        var matricIndex = -1;
        var nameIndex = -1;
        var facultyIndex = -1;
        var majorIndex = -1;
        var yearIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Matric") {
            matricIndex = i;
          }
          if (columnNames[i] == "Name") {
            nameIndex = i;
          }
          if (columnNames[i] == "Faculty") {
            facultyIndex = i;
          }
          if (columnNames[i] == "Major") {
            majorIndex = i;
          }
          if (columnNames[i] == "Year of Enrolment") {
            yearIndex = i;
          }
        }
        for (var j = 1; j < this.programEnrolment.length; j++) {
          if (this.programEnrolment[j][".value"][matricIndex] == this.matric) {
            result["Student's Name"] = this.programEnrolment[j][".value"][
              nameIndex
            ];
            result["Faculty"] = this.programEnrolment[j][".value"][
              facultyIndex
            ];
            result["Major"] = this.programEnrolment[j][".value"][majorIndex];
            result["Year of Enrolment"] = this.programEnrolment[j][".value"][
              yearIndex
            ];
          }
        }
      }
      return result;
    },
    studentName() {
      if (Object.keys(this.studentInformation).length > 0) {
        return this.studentInformation["Student's Name"];
      } else {
        return "";
      }
    },
    faculty() {
      if (Object.keys(this.studentInformation).length > 0) {
        return this.studentInformation["Faculty"];
      } else {
        return "";
      }
    },
    major() {
      if (Object.keys(this.studentInformation).length > 0) {
        return this.studentInformation["Major"];
      } else {
        return "";
      }
    },
    yearOfEnrolment() {
      if (Object.keys(this.studentInformation).length > 0) {
        return "AY" + this.studentInformation["Year of Enrolment"];
      } else {
        return "";
      }
    },
    studentCoreModules() {
      var result = [];
      if (Object.keys(this.studentInformation).length > 0) {
        var majorAndAY = this.major + " " + this.yearOfEnrolment;
        var columnNames = this.coreModules[0][".value"];
        var index = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == majorAndAY) {
            index = i;
            break;
          }
        }
        for (var j = 1; j < this.coreModules.length; j++) {
          var moduleCode = this.coreModules[j][".value"][index];
          if (moduleCode != "") {
            result.push(moduleCode);
          }
        }
      }
      return result;
    },
    studentTakenModules() {
      var result = [];
      if (
        Object.keys(this.studentInformation).length > 0 &&
        this.moduleEnrolment.length > 0
      ) {
        var columnNames = this.moduleEnrolment[0][".value"];
        var moduleIndex = -1;
        var matricIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Matric") {
            matricIndex = i;
          }
          if (columnNames[i] == "Module Code") {
            moduleIndex = i;
          }
        }
        for (var j = 1; j < this.moduleEnrolment.length; j++) {
          if (this.moduleEnrolment[j][".value"][matricIndex] == this.matric) {
            result.push(this.moduleEnrolment[j][".value"][moduleIndex]);
          }
        }
      }
      return result;
    },
    studentMappableModules() {
      var result = [];
      if (
        this.studentCoreModules.length > 0 &&
        this.studentTakenModules.length > 0
      ) {
        for (var i = 0; i < this.studentCoreModules.length; i++) {
          var coreModule = this.studentCoreModules[i];
          if (!this.studentTakenModules.includes(coreModule)) {
            result.push(coreModule);
          }
        }
      }
      return result;
    },
    numberOfMappableCoreModules() {
      var result = 0;
      if (this.selectedUniversity != "") {
        var columnNames = this.moduleMappings[0][".value"];
        var puNameIndex = -1;
        var nusModuleCodeIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Partner University") {
            puNameIndex = i;
          }
          if (columnNames[i] == "NUS Module Code") {
            nusModuleCodeIndex = i;
          }
        }
        for (var j = 1; j < this.moduleMappings.length; j++) {
          var row = this.moduleMappings[j][".value"];
          if (row[puNameIndex] == this.selectedUniversity) {
            if (this.studentMappableModules.includes(row[nusModuleCodeIndex])) {
              result += 1;
            }
          }
        }
      }
      return result;
    },
    numberOfMappableAllModules() {
      var result = 0;
      if (this.selectedUniversity != "") {
        var columnNames = this.moduleMappings[0][".value"];
        var puNameIndex = -1;
        var nusModuleCodeIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Partner University") {
            puNameIndex = i;
          }
          if (columnNames[i] == "NUS Module Code") {
            nusModuleCodeIndex = i;
          }
        }
        for (var j = 1; j < this.moduleMappings.length; j++) {
          var row = this.moduleMappings[j][".value"];
          if (row[puNameIndex] == this.selectedUniversity) {
            if (!this.studentTakenModules.includes(row[nusModuleCodeIndex])) {
              result += 1;
            }
          }
        }
      }
      return result;
    },
    mappingCounts() {
      if (
        this.studentMappableModules.length > 0 &&
        !(typeof this.moduleMappings == undefined)
      ) {
        var columnNames = this.moduleMappings[0][".value"];
        var puNameIndex = -1;
        var nusModuleCodeIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Partner University") {
            puNameIndex = i;
          }
          if (columnNames[i] == "NUS Module Code") {
            nusModuleCodeIndex = i;
          }
        }
        var result = {};
        for (var j = 1; j < this.moduleMappings.length; j++) {
          var nusModule = this.moduleMappings[j][".value"][nusModuleCodeIndex];
          if (this.studentMappableModules.includes(nusModule)) {
            var puName = this.moduleMappings[j][".value"][puNameIndex];
            if (puName in result) {
              result[puName] += 1;
            } else {
              result[puName] = 1;
            }
          }
        }
        var columnNames = this.universities[0][".value"];
        var regionIndex = -1;
        var puNameIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Continent") {
            regionIndex = i;
          }
          if (columnNames[i] == "Partner University") {
            puNameIndex = i;
          }
        }
        for (var i = 1; i < this.universities.length; i++) {
          var puName = this.universities[i][".value"][puNameIndex];
          if (puName in result) {
            var region = this.universities[i][".value"][regionIndex];
            if (!this.selectedRegions.includes(region)) {
              delete result[puName];
            }
          }
        }
        var final = [];
        Object.keys(result).forEach(function(key) {
          final.push({ Uni: key, Mod: result[key] });
        });
        return final;

      } 
      else {
        return [];
      }
    },
    sortedMappingCounts() {
      var result = [];
      if (this.mappingCounts.length > 0) {
        var result = this.mappingCounts;
        for (var i = 0; i < result.length; i++) {
          for (var j = 0; j < result.length - 1; j++) {
            if (result[j]["Mod"] < result[j+1]["Mod"]) {
              console.log(j)
              console.log(result[j]["Uni"]);
              console.log(j+1);
              console.log(result[j+1]["Uni"]);
              var temp1 = result[j]["Uni"];
              var temp2 = result[j]["Mod"];
              result[j]["Uni"] = result[j+1]["Uni"];
              result[j]["Mod"] = result[j+1]["Mod"];
              result[j+1]["Uni"] = temp1;
              result[j+1]["Mod"] = temp2;
            }
          }
        }
      }
      return result;
    },
    regions() {
      var result = [];
      if (this.universities.length > 0) {
        var columnNames = this.universities[0][".value"];
        var index = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Continent") {
            index = i;
          }
        }
        for (var j = 1; j < this.universities.length; j++) {
          var continent = this.universities[j][".value"][index];
          if (!result.includes(continent)) {
            result.push(continent);
          }
        }
        if (!this.initialSelectedRegionsSet) {
          for (var k = 0; k < result.length; k++) {
            this.selectedRegions.push(result[k]);
          }
          this.initialSelectedRegionsSet = true;
        }
      }
      return result;
    },
    universityList() {
      var result = [];
      if (this.universities.length > 0) {
        var columnNames = this.universities[0][".value"];
        var regionIndex = -1;
        var puNameIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Continent") {
            regionIndex = i;
          }
          if (columnNames[i] == "Partner University") {
            puNameIndex = i;
          }
        }
        for (var j = 1; j < this.universities.length; j++) {
          var region = this.universities[j][".value"][regionIndex];
          if (this.selectedRegions.includes(region)) {
            result.push(this.universities[j][".value"][puNameIndex]);
          }
        }
      }
      return result;
    },
    likesAllRegion() {
      this.$emit("newRegions", this.selectedRegions);
      return this.selectedRegions.length === this.regions.length;
    },
    likesSomeRegion() {
      this.$emit("newRegions", this.selectedRegions);
      return this.selectedRegions.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllRegion) return "mdi-close-box";
      if (this.likesSomeRegion) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    mappingTable() {
      if (this.selectedUniversity == "") {
        return [];
      } else {
        return this.getMappingTable(this.selectedUniversity);
      }
    }
  },
  methods: {
    mouseOver() {
      this.active = !this.active;   
    },
    toggleShowAll() {
      this.showAllMods = true;
    },
    toggleShowCore() {
      this.showAllMods = false;
    },
    clickmodule(data) {
      this.selectedModule = data;
    },
    clickUni(data) {
      this.selectedUniversity = data;
    },
    getMappingTable(puName) {
      var columnNames = this.moduleMappings[0][".value"];
      var puNameIndex = -1;
      var nusFacIndex = -1;
      var puModuleCodeIndex = -1;
      var puModuleTitleIndex = -1;
      var puModuleCreditsIndex = -1;
      var nusModuleCodeIndex = -1;
      var nusModuleTitleIndex = -1;
      var nusModuleCreditsIndex = -1;
      for (var i = 0; i < columnNames.length; i++) {
        if (columnNames[i] == "Partner University") {
          puNameIndex = i;
        }
        if (columnNames[i] == "Faculty") {
          nusFacIndex = i;
        }
        if (columnNames[i] == "PU Module Code") {
          puModuleCodeIndex = i;
        }
        if (columnNames[i] == "PU Module Title") {
          puModuleTitleIndex = i;
        }
        if (columnNames[i] == "PU Module Credits") {
          puModuleCreditsIndex = i;
        }
        if (columnNames[i] == "NUS Module Code") {
          nusModuleCodeIndex = i;
        }
        if (columnNames[i] == "NUS Module Title") {
          nusModuleTitleIndex = i;
        }
        if (columnNames[i] == "NUS Module Credits") {
          nusModuleCreditsIndex = i;
        }
      }
      columnNames = [
        "Faculty",
        "PU Module Code",
        "PU Module Title",
        "PU Module Credits",
        "NUS Module Code",
        "NUS Module Title",
        "NUS Module Credits",
        "Overall Ratings"
      ];
      var table = [];
      table.push(columnNames);

      for (var i = 1; i < this.moduleMappings.length; i++) {
        var row = this.moduleMappings[i][".value"];
        if (row[puNameIndex] == puName) {
          var nusModuleCode = row[nusModuleCodeIndex];
          var puModuleCode = row[puModuleCodeIndex];
          var moduleInfo = this.moduleReviewsData[0][puModuleCode];
          if (!(typeof moduleInfo === "undefined")) {
            if (this.showAllMods) {
              var newRow = [];
              newRow.push(row[nusFacIndex]);
              newRow.push(row[puModuleCodeIndex]);
              newRow.push(row[puModuleTitleIndex]);
              newRow.push(row[puModuleCreditsIndex]);
              newRow.push(row[nusModuleCodeIndex]);
              newRow.push(row[nusModuleTitleIndex]);
              newRow.push(row[nusModuleCreditsIndex]);
              newRow.push(moduleInfo["Overall Rating"]);
              table.push(newRow);
            } else if (this.studentMappableModules.includes(nusModuleCode)) {
              var newRow = [];
              newRow.push(row[nusFacIndex]);
              newRow.push(row[puModuleCodeIndex]);
              newRow.push(row[puModuleTitleIndex]);
              newRow.push(row[puModuleCreditsIndex]);
              newRow.push(row[nusModuleCodeIndex]);
              newRow.push(row[nusModuleTitleIndex]);
              newRow.push(row[nusModuleCreditsIndex]);
              newRow.push(moduleInfo["Overall Rating"]);
              table.push(newRow);
            }
          }
        }
      }
      return table;
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllRegion) {
          this.selectedRegions = [];
          this.$emit("newRegions", this.selectedRegions);
        } else {
          this.selectedRegions = this.regions.slice();
          this.$emit("newRegions", this.selectedRegions);
        }
      });
    }
  }
};
</script>

<style>
a {
  color: black;
}

.welcome {
  colour: #848484;
}

.studentinfo {
  color: #002674;
}

.modulecard {
  border-style: solid;
  border-width: 1px !important;
  border-color: #dddddd !important;
}

.instruction {
  font-size: 16px;
  color: #888888;
}

.listofmods {
  background: #f9f9f9 !important;
  color: #3c3c3c !important;
  border-style: solid;
  border-width: 1px !important;
  border-color: #dddddd !important;
  text-align: left !important;
}

.modcontent {
  text-align: left;
}

.moduleresult {
  height: 1000px;
}

table.v-table tbody td,
table.v-table tbody th {
  height: 80px;
  cursor: pointer;
}
</style>
