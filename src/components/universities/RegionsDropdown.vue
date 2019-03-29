<template>

  <v-container
    id="university_dropdown"
    tag="section"
  >
<v-layout row wrap align-center>
  <v-flex xs6>
        <v-subheader>Select your Region(s)</v-subheader>
      </v-flex>
      <v-flex xs12 sm6>
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
            <v-list-tile
              ripple
              @click="toggle"
            >
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
      </v-flex>
</v-layout>
  </v-container>
</template>

<script>

  import { universitiesRef } from '../../firebase';

  export default {
    data: () => ({
      initialSelectedRegionsSet: false,
      selectedRegions: []
    }),
    firebase: {
      universities: universitiesRef
    },
    computed: {
      likesAllRegion () {
        this.$emit("newRegions",this.selectedRegions)
        return this.selectedRegions.length === this.regions.length
      },
      likesSomeRegion () {
        this.$emit("newRegions",this.selectedRegions)
        return this.selectedRegions.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllRegion) return 'mdi-close-box'
        if (this.likesSomeRegion) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
      regions() {
        var result = [];
        if (this.universities.length > 0) {
          if (this.universities[0]['.value'].length > 0) {
            var columnNames = this.universities[0]['.value'];
            var index = -1;
            for (var i = 0; i < columnNames.length; i++) {
              if (columnNames[i] == "Continent") {
                index = i;
                break;
              }
            }
            for (var j = 1; j < this.universities.length; j++) {
              var continent = this.universities[j]['.value'][index];
              if (!(result.includes(continent))) {
                result.push(continent)
              }
            }
            if (!(this.initialSelectedRegionsSet)) {
              for (var k = 0; k < result.length; k++) {
                this.selectedRegions.push(result[k]);
              }
              this.initialSelectedRegionsSet = true;
            }
          }
        }
        return result;
      }
    },
    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllRegion) {
            this.selectedRegions = []
            this.$emit("newRegions",this.selectedRegions)
          } else {
            this.selectedRegions = this.regions.slice()
            this.$emit("newRegions",this.selectedRegions)
          }
        })
      }
    }
  }
</script>
