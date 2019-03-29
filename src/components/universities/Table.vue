<template>

  <v-container>
    {{regions}}
    <b-table striped hover :items="items" :fields="fields" />
  </v-container>
</template>

<script>
  export default {
    name: 'Region table information',
    props: {
      regionsList: {
        type: Array
      }
    },
    watch: {
      regionsList: function() {
        this.regions = this.regionsList
      }
    },
    data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'last_name',
            sortable: true
          },
          {
            key: 'first_name',
            sortable: true
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
            // Variant applies to the whole column, including the header and footer

          }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
        regions: []
      }
    }
  }
</script>
