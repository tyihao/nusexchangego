<template>
  <v-container>
    <br>
    <br><br>
    <h1> University Details </h1>
    <p> Find out more about the university that you are interested in </p>
    <hr><br><br>

    <br><br>
    <regions-dropdown id="university_details" @newRegions="updateRegions"/>
    <university-dropdown :regionsList="regions" @selectedSchool="updateSchool"/>
    <further-details id="further_details" v-show="selectedUniversity" :selectedSchool="selectedUniversity"/>
  </v-container>
</template>

<script>

export default {
  name: 'University Details',
  components: {
    UniversityDropdown: () => import('@/components/universities/UniversityDropdown'),
    RegionsDropdown: () => import('@/components/universities/RegionsDropdown'),
    FurtherDetails: () => import('@/components/universities/details_coms/furtherDetails'),
    Autocomplete: () => import('@/components/universities/details_coms/autocomplete')
  },
  data: function() {
    return {
      regions: [],
      selectedUniversity: "",
    }
  },
  methods: {
    updateRegions(variable) {
      this.regions = variable;
    },
    updateSchool(variable) {
      this.selectedUniversity = variable;
      var elmnt = document.getElementById("further_details");
      elmnt.scrollIntoView();
    }
  }
}
</script>
