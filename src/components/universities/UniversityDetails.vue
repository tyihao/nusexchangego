<template>
  <v-container>
     parent: {{selectedUniversity}}
    <b-card-group deck>
       <b-card
         header-tag="header"
         overlay
         text-variant='white'
         img-src="https://picsum.photos/899/70/"
         footer-tag="footer"
         title="University Details"
       >
         <b-card-text> Find out more about the university that you are interested in! </b-card-text>
       </b-card>
    </b-card-group>

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
