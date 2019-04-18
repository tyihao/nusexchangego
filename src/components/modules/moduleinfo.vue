<template>
  <v-container ma-0 pa-0 text-xs-left>
    <v-layout row wrap pa-0>
      <v-flex xs6 class="col1">
        <b-card class="moduleinfo pa-0">
          <div class="card-header">Module Information</div>
          <v-container pt-1 ma-0>
            <div class="modtitle">{{ moduleCode }} {{ puModuleTitle }}</div>
            <div class="mapping">{{ puName }}</div>
            <div class="mapping">Maps {{ nusModuleCode }} {{ nusModuleTitle }}</div>
          </v-container>

          <v-container ma-0 pa-0 text-xs-left>
            <v-layout row wrap>
            <star-rating
              class="pt-0 pl-4"
              :border-width="4"
              border-color="#d8d8d8"
              :rounded-corners="true"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
              read-only="true"
              :show-rating="false"
              v-model="overallRating"
              star-size="30"
            ></star-rating>
            <div class="ratingNum">({{ totalStudentsTaken }})</div>
            </v-layout>
          </v-container>

          <v-container>
            <pie-chart :data="pieChartData" height="200px" legend="bottom"></pie-chart>
          </v-container>
        </b-card>
        <b-card class="popularity">
          <div class="card-header">Module Popularity</div>
          <v-container>
            <line-chart :data="studentCountsBySemester" height="200px" ytitle="Number of Students"></line-chart>
          </v-container>
        </b-card>
        <b-card class="upbutton" v-scroll-to="'#filler'">
          BACK TO MODULE LIST
        </b-card>
      </v-flex>

      <v-flex xs3 class="col2">
        <b-card class="rating">
          <div class="card-header">Recommendation Scale</div>
          <div class="bar">
            <b-progress
              :value="totalStudentsRecommend"
              :max="totalStudentsTaken"
              show-progress
              animated
              variant="success"
              style="height:20px;"
            ></b-progress>
            <div
              class="description"
            ><strong>{{ totalStudentsRecommend }}</strong> of {{ totalStudentsTaken }} 
            students recommends this module!</div>
          </div>
        </b-card>
        <b-card class="rating">
          <div class="card-header">Enjoyment Rating</div>
          <div class="bar">
            <b-progress
              :value="enjoymentRating"
              :max="5"
              show-progress
              animated
              variant="success"
              style="height:20px;"
            ></b-progress>
            <div class="description">Enjoyment rating of <strong>{{ enjoymentRating }}</strong></div>
          </div>
        </b-card>
        <b-card class="feedback">
          <div class="card-header">Positive Feedback</div>
          <wordcloud
            :data="defaultWords"
            nameKey="name"
            valueKey="value"
            :color="myColors"
            :showTooltip="false"
            :wordClick="wordClickHandler"
          ></wordcloud>
        </b-card>
      </v-flex>

      <v-flex xs3 class="col3">
        <b-card class="rating">
          <div class="card-header">Difficulty Rating</div>
          <div class="bar">
            <b-progress
              :value="difficultyRating"
              :max="5"
              show-progress
              animated
              variant="success"
              style="height:20px;"
            ></b-progress>
            <div class="description">Difficulty rating of <strong>{{ difficultyRating }}</strong></div>
          </div>
        </b-card>
        <b-card class="rating">
          <div class="card-header">Module Material Rating</div>
          <div class="bar">
            <b-progress
              :value="moduleMaterialRating"
              :max="5"
              show-progress
              animated
              variant="success"
              style="height:20px;"
            ></b-progress>
            <div class="description">Module Materials rating of <strong>{{ difficultyRating }}</strong></div>
          </div>
        </b-card>
        <b-card class="feedback">
          <div class="card-header">Negative Feedback</div>
          <wordcloud
            :data="badWords"
            nameKey="name"
            valueKey="value"
            :color="myColors"
            :showTooltip="true"
            :wordClick="wordClickHandler"
          ></wordcloud>
        </b-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { moduleReviewsDataRef } from "../../firebase";

export default {
  name: "Token",
  firebase: {
    moduleReviewsData: moduleReviewsDataRef
  },
  data() {
    return {
      numberFeedbacks: 10,
      moduleCode: "",
      selectedAY: "",
      counter: 85,
      max: 100,
      valueDeterminate: 88,

      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
      defaultWords: [
        {
          name: "Professors",
          value: 16
        },
        {
          name: "Webcasted",
          value: 16
        },
        {
          name: "Materials",
          value: 18
        },
        {
          name: "Resourceful",
          value: 16
        },
        {
          name: "Smart",
          value: 15
        },
        {
          name: "Helpful",
          value: 9
        }
      ],
      badWords: [
        {
          name: "Fast",
          value: 16
        },
        {
          name: "Poor delivery",
          value: 18
        },
        {
          name: "Difficult",
          value: 32
        },
        {
          name: "Heavy workload",
          value: 16
        },
        {
          name: "Complex",
          value: 13
        }
      ]
    };
  },
  methods: {
  },
  computed: {
    getVariant(data) {
      return "success";
    },
    moduleInformation() {
      var result = "";
      if (this.moduleReviewsData.length > 0) {
        result = this.moduleReviewsData[0][this.moduleCode];
      }
      return result;
    },
    puModuleTitle() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["PU Module Title"];
      }
      return result;
    },
    puName() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["Partner University"];
      }
      return result;
    },
    nusModuleCode() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["NUS Module Code"];
      }
      return result;
    },
    nusModuleTitle() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["NUS Module Title"];
      }
      return result;
    },
    totalStudentsTaken() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["Total Number of Students"];
      }
      return result;
    },
    totalStudentsRecommend() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["Number of Recommends"];
      }
      return result;
    },
    overallRating() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["Overall Rating"];
        Math.round(result * 100) / 100;
      }
      return result;
    },
    enjoymentRating() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["Enjoyment Rating"];
        Math.round(result * 100) / 100;
      }
      return result;
    },
    difficultyRating() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["Difficulty Rating"];
        Math.round(result * 100) / 100;
      }
      return result;
    },
    moduleMaterialRating() {
      var result = "";
      if (Object.keys(this.moduleInformation).length > 0) {
        result = this.moduleInformation["Module Material Rating"];
        Math.round(result * 100) / 100;
      }
      return result;
    },
    studentCountsBySemester() {
      var result = {};
      if (Object.keys(this.moduleInformation).length > 0) {
        var AYSem = this.moduleInformation["AYSem"];
        var studentCounts = this.moduleInformation[
          "Student Counts by Semester"
        ];
        for (var i = 0; i < AYSem.length; i++) {
          result[AYSem[i]] = studentCounts[i];
        }
      }
      return result;
    },
    pieChartData() {
      var result = [];
      if (Object.keys(this.moduleInformation).length > 0) {
        var majors = this.moduleInformation["Majors"];
        var studentCounts = this.moduleInformation["Student Counts by Major"];
        for (var i = 0; i < majors.length; i++) {
          result.push([majors[i], studentCounts[i]]);
        }
      }
      return result;
    }
  },
  props: {
    msg: {
      type: String
    }
  },
  watch: {
    msg: function() {
      this.moduleCode = this.msg;
    }
  }
};
</script>

<style>
.penguin {
  border-radius: 0px;
  border-style: solid;
  border-color: #000000;
  border-width: 1px;
}

.test {
  background-color: #ebebeb;
}

.theme--light.v-sheet {
  border-color: #c0d6e4;
}

.headline {
  color: #4b4b4b;
  font-family: "Times New Roman", Times, serif;
}

.display {
  color: #4b4b4b;
  text-align: center;
}

.bar {
  padding-left: 10%;
  padding-right: 10%;
}

.moduleinfo {
  width: 100%;
  height: 520px;
  padding: 0 !important;
  margin-bottom: 10px;
}

.popularity {
  width: 100%;
  height: 300px;
  padding: 0 !important;
  margin-bottom: 10px;
}

.rating {
  text-align: center;
  width: 100%;
  height: 190px;
  margin-bottom: 10px;
}

.feedback {
  width: 100%;
  height: 430px;
}

.rating p {
  font-size: 16px;
  color: #9a9a9a;
}

.col1 {
  padding: 5px;
}

.col2 {
  padding: 5px;
}

.col3 {
  padding: 5px;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(49, 49, 49, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  font-weight: 300;
}

.card-body {
  -ms-flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  padding: 0px !important;
  text-align: left;
}

.bar {
  padding: 30px 10px 10px 10px;
}

.modtitle {
  font-size: 20px;
  font-weight: bold;
  color: #6b6a6a;
  padding: 5px 8px 0 8px;
}
.mapping {
  font-size: 16px;
  color: #b6b6b6;
  padding: 5px 8px 0 8px;
}

.description {
  color: #797979;
  padding-top: 10px;
  text-align: center;
  display: block;
}

.ratingNum{
  display: inline-block;
  font-size: 24px;
  color: #797979;
  padding: 10px 0 0 10px;
}

.upbutton {
  cursor: pointer;
  width: 200px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #e9e9e9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  font-weight: bold;
  text-align: center;
  color: #4b4b4b;
}

.upbutton:hover {
  cursor: pointer;
  width: 200px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #e9e9e9;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  font-weight: bold;
  text-align: center;
  box-shadow: 1px 2px 4px 0 #C2C2C2;
  color: #4b4b4b;
}
</style>
