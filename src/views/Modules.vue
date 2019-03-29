<template>
  <div id="modules">
    <Banner/>
    <Token @inputData="updateMessage" />
    <Result :msg="childData" />

  </div>
</template>

<script>
export default {
  name: 'Modules',
  components: {
    Banner: () => import('@/components/modules/Banner'),
    Result: () => import('@/components/modules/moduleresult'),
    Token: () => import('@/components/modules/token')
  },
  data: function() {
    return {
      childData: ""
    };
  },
  methods: {
    updateMessage(variable) {
      this.childData= variable;
    }
  }
}
</script>
