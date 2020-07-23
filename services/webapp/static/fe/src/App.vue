<template>
  <div id="webapp">
    <div class="app-container">
      <img alt="Vue logo" src="./assets/logo.png" />
      <HelloWorld msg="Welcome to Your PrimeVue App" />
      <form @submit.prevent="greet">
        <InputText type="text" v-model="text" />
        <Button type="submit" label="Submit" />
        <h3>{{message}}</h3>
      </form>
    </div>

    <Toast />
  </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";

import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "app",
  components: {
    HelloWorld,
    InputText,
    Button,
    Toast
  },
  data() {
    return {
      message: null,
      text: null
    };
  },
  methods: {
    greet() {
      this.$toast.add({ severity: "info", summary: "Hello " + this.text });
      this.message = "Hello " + this.text;
    }
  }
};
</script>

<style>
html {
  font-size: 16px;
}
body {
  margin: 0;
}

#webapp {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>