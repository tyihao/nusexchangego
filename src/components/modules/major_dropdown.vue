<template>

<v-container>
<v-layout row wrap align-center>
<v-flex xs6>
<v-subheader> Select your </v-subheader>
</v-flex>

<v-flex xs12 sm6>
<v-select
:items="majors"
label="Select a Major..."
></v-select>
</v-flex>
</v-layout>


</v-container>

</template>

<script>
export default {
data: () => ({
majors: ['Business Analytics', 'Computer Science', 'Information System', 'Wanking'],
faculty: ['School of Computing', 'Faculty of Science', 'SDE', 'Arts'],
year: ['AY16/17', 'AY17/18', 'AY18/19', 'Penis'],
Fac:true,
Maj:false

})
}
</script>
