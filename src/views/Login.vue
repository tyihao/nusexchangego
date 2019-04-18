<template>
  <div id="home">

      <banner/>
      <v-container v-if="!login">
      <br>
      <br><br>
      <h1> Hello there, Shervin. </h1>
      <p> This is your information. </p>
      <hr>
      <v-container>

          <v-layout row wrap >

            Name: Shervin Lee Jia Ning<br><br>
            Faculty: School of Computing<br><br>
            Major: Business Analytics<br><br>
            Year of Study: 2<br><br>



          </v-layout>
        </v-container>
      </v-container>
      <v-container v-else>
        Congrats, you've logon.

        <v-btn flat @click="logout"> Logout </v-btn>
      </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Login',

    components: {

      Banner: () => import('@/components/home/Banner')

    },
    data() {
      return {
        login: false,
        show1: false,
        tempMessage: "",
        matricnumber: "",
        tempPassword: "",
        studentid: [['A001','School of Computing','Business Analytics', 'AY17/18'],
        ['A002','School of Computing','Computer Science', 'AY17/18']]
      };
    },
    methods: {
      submit: function() {
        this.$emit("inputData", this.tempMessage);
        this.tempMessage = "";
        this.tempPassword = "";
        this.login = true;
      },
      logout: function() {
        this.login = false;
      }
    }
  }
</script>
