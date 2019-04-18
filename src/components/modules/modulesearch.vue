<template>
  <div class="modulesearch">
    <v-container>
      <v-card>

        <v-card-text>Search for Partner Universities with the NUS Module you want to map!</v-card-text>
        <v-card-text>
          <v-autocomplete
            v-model="moduleToMap"
            :items="NUSModulesList"
            :loading="isLoading"
            :search-input.sync="search"
            auto-select-first
            dont-fill-mask-blanks
            hide-no-data
            hide-selected
            color="grey"
            label="Insert NUS Module Code"
            placeholder="Module code, name, and descriptions"
            prepend-icon="mdi-file-find"
            return-object
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-container>

    <v-container id="table" v-if="moduleToMap">
      <v-flex>
        <div>
          <template>
            <v-data-table
              :headers="header"
              :items="mappableModulesList"
              class="elevation-1 text-xs-center"
              v-model="selectedModule"
            >
              <template v-slot:items="props">
                <td
                  @click="clickmodule(props.item.pucode)"
                  v-scroll-to="'#modInfo'"
                >{{ props.item.name }}</td>
                <td
                  @click="clickmodule(props.item.pucode)"
                  v-scroll-to="'#modInfo'"
                >{{ props.item.pucode }}</td>
                <td
                  @click="clickmodule(props.item.pucode)"
                  v-scroll-to="'#modInfo'"
                >{{ props.item.pumodname }}</td>
              </template>
            </v-data-table>
          </template>
        </div>
      </v-flex>
    </v-container>

    <v-container id="modInfo" v-show="selectedModule">
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
      moduleToMap: "",
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      search: null,
      header: [
        { text: "Partner University" },
        { text: "Module Code" },
        { text: "Module Name" }
      ],
      header: [
        {
          text: "Partner University",
          align: "middle",
          sortable: true,
          value: "name"
        },
        { text: "Module Code (PU University)", align: "middle", value: "pucode" },
        { text: "Module Title (PU University)", align: "middle", value: "pumodname" }
      ],
      selectedModule: "",
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
    NUSModulesList() {
      var result = [];
      var last = "";
      if (this.moduleReviewsData.length > 0) {
        for (var puModuleCode in this.moduleReviewsData[0]) {
          var nusModuleCode = this.moduleReviewsData[0][puModuleCode]["NUS Module Code"];
          var nusModuleTitle = this.moduleReviewsData[0][puModuleCode]["NUS Module Title"];
          var nusModule = nusModuleCode + " " + nusModuleTitle;
          if (! result.includes(nusModule)) {
            result.push(nusModule);
          }
        }
        result.pop();
      }
      return result;
    },
    mappableModulesList() {
      var result = [];
      if (this.moduleToMap != "") {
        var nusModuleCode = this.moduleToMap.split(" ")[0];
        if (this.moduleReviewsData.length > 0) {
          for (var puModuleCode in this.moduleReviewsData[0]) {
            if (this.moduleReviewsData[0][puModuleCode]["NUS Module Code"] == nusModuleCode) {
              var puName = this.moduleReviewsData[0][puModuleCode]["Partner University"];
              var puModuleTitle = this.moduleReviewsData[0][puModuleCode]["PU Module Title"];
              result.push({ name: puName, 
                            pucode: puModuleCode, 
                            pumodname: puModuleTitle });
            }
          }
        }
      }
      return result;
    }
  },
  methods: {
    clickmodule(data) {
      this.selectedModule = data;
    },
  }
};
</script>

<style>
.modulesearch {
  height: 1000px;
}

table.v-table tbody td,
table.v-table tbody th {
  height: 80px;
  cursor: pointer;
}
</style>