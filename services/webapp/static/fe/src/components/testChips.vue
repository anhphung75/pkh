<template>
  <div>
    <Chips v-model="ltim" @keyup="tim_keyup"/>
    <div>ltim = {{ltim}}</div>
  </div>
</template>

<script>
import Chips from "primevue/chips";

export default {
  components: {
    Chips
  },
  data() {
    return {
      ltim: null
    };
  }
};
</script>

