<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="tempMessage"
            label="A01234567X"
            @keyup.enter="submit"
            hint="Enter Your Matric Number"
            persistent-hint
            single-line
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Token",
  data() {
    return {
      tempMessage: "",
      matricnumber: "",
      studentid: [
        ["A001", "School of Computing", "Business Analytics", "AY17/18"],
        ["A002", "School of Computing", "Computer Science", "AY17/18"]
      ]
    };
  },
  methods: {
    submit: function() {
      this.$emit("inputData", this.tempMessage);
      this.tempMessage = "";
    }
  }
};
</script>
