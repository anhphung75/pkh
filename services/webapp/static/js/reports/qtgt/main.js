import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js';

import quochuy from "./quochuy.js";
import tieude from "./tieude.js";
import tieudebang from "./tieudebang.js";
import cpvt from "./cpvt.js";


var report_qtgt = new Vue({
  el: '#vungin',
  delimiters: ["{`", "`}"],
  components: {
    'quochuy': quochuy,
    'tieude': tieude,
  },
  data() {
    return {
      dsmaqt: ['pkh001', 'pkh002'],
      caorpt:0,
      curtieude:'',
      curid:'',
    }
  },
  methods: {
    tinh_caorpt(id) {
      //let id='quochuy:' + maqt;
      id=id.toString();
      console.log('id=',id);
      console.log('this.$refs=',this.$refs);
      console.log('this.$refs.id=',this.$refs.id);
      let box = document.querySelector(id);
      let cao=box.offsetHeight;
      console.log('cao=',cao);

    },
  },
})