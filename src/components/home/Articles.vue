<template>
  <section id="feed">
    <feed>
      <slot />
    </feed>
  </section>
</template>

<script>
  export default {
    components: {

//not sure if capitalisation matters here Feed vs feed

      feed: () => import('@/components/Feed')
    }
  }
</script>
