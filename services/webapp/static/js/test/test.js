import cloudtags from '../comps/cloudtags.js';
import banghoso from './banghoso.js';

const app = Vue.createApp({
  //delimiters: ["{`", "`}"],
  components: {
    //'banghoso': banghoso,
    'cloud-tags': cloudtags,
  },
  data() {
    return {
      //search
      otim: [],
      curec: 0,

    }
  },
  methods: {
    showotim(event) {
      console.log('otim=', event.target.value) // will log a value of the selected option
    }
  },
  template: `
  <cloud-tags></cloud-tags>
  `
});
app.mount('#trangxem');