<template>
<div>
<v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-flex xs4 d-flex>
        <v-select
          :items="regions"
          label="Select Region"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>

  <v-data-table
    :headers="headers"
    :items="universities"
    class="elevation-1"
    :pagination.sync="pagination"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.mods }}</td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pagination: {
          sortBy: 'mods',
          descending: true
        },
        headers: [
          {
            text: 'Name of Partner University',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Number of Pre-approved Modules', 
          value: 'mods' }
        ],
        universities: [
          {
            name: 'Georgia Tech',
            mods: 6
          },
          {
            name: 'Berkeley',
            mods: 5
          },
          {
            name: 'Lund',
            mods: 2
          },
          {
            name: 'KTH',
            mods: 3
          },
          {
            name: 'Standford',
            mods: 4
          }
        ],
        regions: [
      'Asia',
      'Europe',
      'North America',
      'Oceania',
      'South Africa'
    ],
    selectedRegions: []
      }
    }
  }
</script>

<style>
</style>
