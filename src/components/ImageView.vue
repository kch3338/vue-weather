<template>
  <img :src="imgSrc" alt="weatherImage" />
</template>

<script>
import { ref } from "vue";


export default {
  props: {
    fileName: String
  },
  setup(props) {
    const imgSrc = ref(`public/images/${props.fileName}.png`);

    return {
      imgSrc
    }
  }
}
</script>

<style lang="scss" scoped>

</style>