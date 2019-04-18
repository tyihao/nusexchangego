<template>
  <div id="universities">
    <banner/>

    <v-container>
      <v-layout justify-center>

        <v-tooltip
        bottom
        close-delay="0"
        open-delay="100"
        >
          <template v-slot:activator="{ on }">
            <v-btn
            class="ml-0 hidden-sm-and-down"
            flat
            @click="show1method"
            v-scroll-to = "'#university_details'"
            v-on="on"
            >
            University Details
          </v-btn>
        </template>
        <span> Get all the information and reviews you need about a University </span>
      </v-tooltip>
      <v-tooltip
      bottom
      close-delay="0"
      open-delay="100"
      >
        <template v-slot:activator="{ on }">
          <v-btn
          class="ml-0 hidden-sm-and-down"
          flat
          @click="show2method"
          v-scroll-to = "'#compare_by_major'"
          v-on="on"
          >
          Compare By Majors
        </v-btn>
      </template>
      <span> Compare important information between universities based on your selected major</span>
    </v-tooltip>


    <v-tooltip
    bottom
    close-delay="0"
    open-delay="100"
    >
      <template v-slot:activator="{ on }">
        <v-btn
        class="ml-0 hidden-sm-and-down"
        flat
        @click="show3method"
        v-scroll-to = "'#universities_compare'"
        v-on="on"
        >
        Compare Universities
      </v-btn>
    </template>
    <span> 1-to-1 university comparison </span>
  </v-tooltip>



</v-layout>
</v-container>

<university-details v-show='show1' id="university_details"/>
<major v-show='show2' id="compare_by_major"/>
<compare v-show='show3' id="universities_compare"/>



</div>
</div>
</template>

<script>


export default {
  name: 'Universities',
  components: {
    Banner: () => import('@/components/universities/Banner'),
    Major: () => import('@/components/universities/Major'),
    TableInfo: () => import('@/components/universities/Table'),
    Compare: () => import('@/components/universities/Compare'),
    UniversityDetails: () => import('@/components/universities/UniversityDetails')
  },
  data: function(){
    return {
      show1: false,
      show2: false,
      show3: false
    }
  },
  methods: {
    show1method(){
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
    },
    show2method(){
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
    },
    show3method(){
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
    }
  }
}
</script>
