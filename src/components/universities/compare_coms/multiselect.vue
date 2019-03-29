<template>
  <div>
    <font face="verdana" size="4"> Select up to 3 Universities </font> <br><br>
    <multiselect :max="3" :hide-selected="true" :options-limit="10" v-model="value" tag-placeholder="Add this as new tag" placeholder="Search and add a university" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>

  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  export default {
    components: {
      Multiselect
    },
    data () {
      return {
        value: [
        ],
        options: [
          { name: 'Georgia Institute of Technology', code: 'vu' },
          { name: 'Tsinghua University', code: 'jsx' },
          { name: 'ETH Zurich', code: 'jas' },
          { name: 'New York University', code: 'jds' },
          { name: 'Waterloo', code: 'jxas' },
          { name: 'Hong Kong University', code: 'osea' }
        ]
      }
    },
    methods: {
      addTag (newTag) {
        const tag = {
          name: newTag,
          code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }
        this.options.push(tag)
        this.value.push(tag)
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
