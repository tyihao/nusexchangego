<template>
  <base-card dark>
    <v-img
      class="grey lighten-2"
      height="400"
      width="100%"
      :src="require('@/assets/articles/library.jpg')"
    >
      <v-layout
        fill-height
        align-center
        pa-3
      >
        <v-flex
          xs12
          md7
          offset-md5
        >
          <h1 class="display-3 font-weight-light">
            Partner Universities
          </h1>
          <div class="subheading text pl-1 mb-4">
            Helping you make the right decision
          </div>

        </v-flex>
      </v-layout>
    </v-img>
  </base-card>
</template>

<script>
  export default {
    data () {
      return {
        select: {},
        items: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' }
        ]
      }
    }
  }
</script>
