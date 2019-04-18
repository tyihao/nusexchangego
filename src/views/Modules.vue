<template>
  <div id="modules">
    <Banner/>
    <Filler id="filler"/>
    <v-container>
      <v-layout justify-center>
        <v-tooltip bottom close-delay="0" open-delay="100">
          <template v-slot:activator="{ on }">
            <v-btn class="ml-0 hidden-sm-and-down" flat @click="show1method" v-scroll-to = "'#filler'" v-on="on" >Modules Mappings</v-btn>
          </template>
          <span> See mappable modules in a selected Partner University </span>
        </v-tooltip>
        <v-tooltip bottom close-delay="0" open-delay="100">
          <template v-slot:activator="{ on }">
            <v-btn class="ml-0 hidden-sm-and-down" flat @click="show2method" v-scroll-to = "'#filler'" v-on="on" >Search for Modules</v-btn>
          </template>
          <span> Search for a specific NUS module to map</span>
        </v-tooltip>
      </v-layout>
    </v-container>
    

    <!-- Only show either one of the following depending on what is selected in Modulemenu -->
    <Result v-if='show1' :msg="childData" id="modresult"/>
    <Modulesearch v-if='show2' id="modsearch"/>

  </div>
</template>

<script>
export default {
  name: 'Modules',
  components: {
    Banner: () => import('@/components/modules/Banner'),
    Filler: () => import('@/components/modules/filler'),
    Result: () => import('@/components/modules/moduleresult'),
    Modulesearch: () => import('@/components/modules/modulesearch')

  },
  data: function() {
    return {
      childData: "",
      show1: false,
      show2: false
    };
  },
  methods: {
    updateMessage(variable) {
      this.childData= variable;
    },
    show1method(){
      this.show1 = true;
      this.show2 = false;
    },
    show2method(){
      this.show1 = false;
      this.show2 = true;
    }
  }
}
</script>
