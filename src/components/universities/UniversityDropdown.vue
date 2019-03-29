<template>
  <v-container
    id="university_dropdown"
    tag="section"
  >
<v-layout row wrap align-center>
  <v-flex xs6>
        <v-subheader>  Select your University</v-subheader>
      </v-flex>

      <v-flex xs6>
        <!--
        <v-select
          v-model="select"
          :hint="`Pick the University you want to know more about`"
          :items="items"
          label="Select"
          item-text="school"
          item-value="abbr"
          persistent-hint
          return-object
          single-line
        ></v-select>
      -->
      <v-autocomplete
        v-model="select"
        :hint="'Pick a university'"
        :items="universityNames"
        item-text="school"
        :label="`Select`"
        :keyup.enter="submit"
        persistent-hint
        flat
      >
      </v-autocomplete>

      <br>
      </v-flex>
</v-layout>
  </v-container>
</template>

<script>

  import { universitiesRef } from '../../firebase';

  export default {
    name: 'University_Dropdown',
    props: {
      regionsList: {
        type: Array
      }
    },
    firebase: {
      universities: universitiesRef
    },
    data () {
      return {
        a: -1,
        b: -1,
        select: {school:'test1', abbr: 'txt1'},
        regions: [],
      }
    },
    watch: {
      regionsList: function(){
        this.regions = this.regionsList
      },
      select: function() {
        this.$emit("selectedSchool",this.select)
      }
    },
    computed: {
      universityNames() {
        var result = []
        if (this.universities.length > 0) {
          if (this.universities[0]['.value'].length > 0) {
            var columnNames = this.universities[0]['.value'];
            var puNameIndex = -1;
            var continentIndex = -1;
            for (var i = 0; i < columnNames.length; i++) {
              if (columnNames[i] == "Partner University") {
                puNameIndex = i;
              }
              if (columnNames[i] == "Continent") {
                continentIndex = i;
              }
            }
            for (var j = 1; j < this.universities.length; j++) {
              var continent = this.universities[j]['.value'][continentIndex];
              if (this.regionsList.includes(continent)) {
                var puName = this.universities[j]['.value'][puNameIndex];
                result.push(puName);
              }
            }
          }
        }
        return result;
      }
    },
    methods: {
      submit: () => {
        this.$emit("selectedSchool",this.select)
      }
    }
  }
</script>
