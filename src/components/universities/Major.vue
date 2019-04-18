<template>
  <v-container>
    <br>

    <br><br>

    <h1> Compare Universities by Majors</h1>
    <p> Here you view the top universities for your major </p>
    <hr><br><br>
    <majors-dropdown @newMajor="updateMajor"/>
    <majors-bar-chart :major="major" v-show='major'/>
    <majors-table :major="major" v-show='major'/>
    <!--div v-else align='center'>
      <br><br><br><br><br><br>Please select a Major.<br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div-->
  </v-container>
</template>

<script>
export default {
  name: 'Compare by Major',
  components: {
    MajorsDropdown: () => import('@/components/universities/major_coms/MajorsDropdown'),
    MajorsBarChart: () => import('@/components/universities/major_coms/MajorsBarChart'),
    MajorsTable: () => import('@/components/universities/major_coms/MajorsTable'),
    TableInfo: () => import('@/components/universities/Table')
  },
  data: function() {
    return {
      major: 'Business Analytics'
    }
  },
  methods: {
    updateMajor(variable) {
      this.major = variable;
    }
  },
  mounted(){
    updateMajor()
  }
}
</script>
