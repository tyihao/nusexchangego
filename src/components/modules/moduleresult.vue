<template>

  <div v-show="matric">
    <v-container>
      <h2>Here you go!</h2>
      {{matric}},
      <br>You have entered NUS in
      <b>{{year}}</b>, from
      <b>{{faculty}}</b> and majoring
      in
      <b>{{major}}</b>.
      <br>We have generated a list of partner universities with the most pre-approved
      modules for your major.
      <br>Modules listed include all cores and programme electives.
      <br>
      <br>To learn more about the partner university, simply click on its name.
      <br>For more Information,.....
    </v-container>



    <v-container id="results" grid-list-md text-xs-left>
      <a>Welcome, </a><h2>{{matric}}</h2><br>

      <v-layout row wrap>
        <v-flex xs1>
          <h3> Faculty </h3>
        </v-flex>
        <v-flex xs1>
          <h3> : </h3>
        </v-flex>
        <v-flex xs10>
          <h4> GetFaculty </h4>
        </v-flex>
        <v-flex xs1>
          <h3> Major </h3>
        </v-flex>
        <v-flex xs1>
          <h3> : </h3>
        </v-flex>
        <v-flex xs10>
          <h4> GetMajor </h4>
        </v-flex>
        <v-flex xs1>
          <h3> Year </h3>
        </v-flex>
        <v-flex xs1>
          <h3> : </h3>
        </v-flex>
        <v-flex xs10>
          <h4> GetYear </h4>
        </v-flex>
      </v-layout>
    </v-container>



    <v-container fluid text-xs-center>
    <v-layout row wrap>
      <v-flex xs1></v-flex>
      <v-flex xs2 >
        <v-select
          :items="regions"
          label="Select Regions"
        ></v-select>

        <v-radio-group v-model="radioGroup">

      <v-radio
        v-for="n in 5"
        :key="n"
        :label="`University ${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
      </v-flex>

      <v-flex xs1></v-flex>

      <v-flex xs7>
        <h2> Select Module </h2>
        <h4> University Name</h4>

        <v-card>
          <v-card-title primary-title>
          <div>
            <div class="headline">CS7641 Machine Learning</div>
            <span class="grey--text">Maps: CS3244 Machine Learning</span>
          </div>
        </v-card-title>
      </v-card>

      <v-card>
          <v-card-title primary-title>
          <div>
            <div class="headline">CS7641 Machine Learning</div>
            <span class="grey--text">Maps: CS3244 Machine Learning</span>
          </div>
        </v-card-title>
      </v-card>

      <v-card>
          <v-card-title primary-title>
          <div>
            <div class="headline">CS7641 Machine Learning</div>
            <span class="grey--text">Maps: CS3244 Machine Learning</span>
          </div>
        </v-card-title>
      </v-card>


      </v-flex>

      <v-flex xs1></v-flex>





    </v-layout>
    </v-container>








    <!--v-container>
      <v-layout row wrap align-center>
        <v-flex xs6>
          {{ mappingCounts }}<br>
          {{ matric }}<br>
          {{ studentToken }}<br>
          <button @click="getStudentInformation()">Get Mapping</button><br>
          {{majorAndAY}}
        </v-flex>
      </v-layout>
    </v-container-->

    <v-container>
      <Childresults/>
    </v-container>

  </div>
</template>


<script>
import { programEnrolmentRef } from "../../firebase";
import { moduleEnrolmentRef } from "../../firebase";
import { coreModulesRef } from "../../firebase";
import { moduleMappingsRef } from "../../firebase";

export default {
  name: "moduleresult",
  props: {
    msg: {
      type: String
    }
  },
  data: function() {
    return {
      matric: "",
      studentid: [
        ["A001", "School of Computing", "Business Analytics", "AY17/18"],
        ["A002", "School of Computing", "Computer Science", "AY17/18"]
      ],
      faculty: "[faculty]",
      major: "[major]",
      year: "[year]",
      studentToken: "",
      studentInformation: [],
      modulemap: {},
      majorAndAY: "",
      regions: [
        'Asia',
        'Europe',
        'North America',
        'Oceania',
        'South Africa'
      ]
    };
  },
  firebase: {
    coreModules: coreModulesRef,
    programEnrolment: programEnrolmentRef,
    moduleEnrolment: moduleEnrolmentRef,
    moduleMappings: moduleMappingsRef
  },
  watch: {
    msg: function() {
      this.matric = this.msg;
      this.studentToken = this.msg;
    }
  },
  mounted(){
      mappingCounts
  },
  components: {

  },
  computed: {
    studentCoreModules() {
      if (this.studentInformation.length > 0) {
        var majorAndAY = this.studentInformation[2] + " AY" + this.studentInformation[3];
          this.studentInformation[2] + " AY" + this.studentInformation[3];
        var columnNames = this.coreModules[0][".value"];
        var index = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == majorAndAY) {
            index = i;
            break;
          }
        }
        var result = [];
        for (var j = 1; j < this.coreModules.length; j++) {
          var moduleCode = this.coreModules[j][".value"][index];
          if (moduleCode != "") {
            result.push(moduleCode);
          }
        }
        return result;
      } else {
        return [];
      }
    },
    studentTakenModules() {
      if (this.studentInformation.length > 0) {
        var columnNames = this.moduleEnrolment[0][".value"];
        var moduleIndex = -1;
        var tokenIndex = -1;
        for (var i = 0; i < columnNames.length; i++) {
          if (columnNames[i] == "Token") {
            tokenIndex = i;
          }
          if (columnNames[i] == "Module Code") {
            moduleIndex = i;
          }
        }
        var result = [];
        for (var j = 1; j < this.moduleEnrolment.length; j++) {
          if (
            this.moduleEnrolment[j][".value"][tokenIndex] ==
            this.studentInformation[0]
          ) {
            result.push(this.moduleEnrolment[j][".value"][moduleIndex]);
          }
        }
        return result;
      } else {
        return [];
      }
    },
    studentMappableModules() {
      if (
        this.studentCoreModules.length > 0 &&
        this.studentTakenModules.length > 0
      ) {
        var result = [];
        for (var i = 0; i < this.studentCoreModules.length; i++) {
          var coreModule = this.studentCoreModules[i];
          if (!this.studentTakenModules.includes(coreModule)) {
            result.push(coreModule);
          }
        }
        return result;
      } else {
        return [];
      }
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
        return result;
      } else {
        return {};
      }
    }
  },
  methods: {
    getStudentInformation() {
      var columnNames = this.programEnrolment[0][".value"];
      var tokenIndex = -1;
      var majorIndex = -1;
      var yearIndex = -1;
      for (var i = 0; i < columnNames.length; i++) {
        if (columnNames[i] == "Token") {
          tokenIndex = i;
        }
        if (columnNames[i] == "Major") {
          majorIndex = i;
        }
        if (columnNames[i] == "Year of Enrolment") {
          yearIndex = i;
        }
      }
      for (var j = 1; j < this.programEnrolment.length; j++) {
        if ((this.programEnrolment[tokenIndex] = this.studentToken)) {
          this.studentInformation = this.programEnrolment[j][".value"];
        }
      }
    }
  }
};
</script>
