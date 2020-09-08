import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js';

import quochuy from "./quochuy.js";
import tieude from "./tieude.js";
import tieudebang from "./tieudebang.js";
import cpvt from "./cpvt.js";


var report_qtgt = new Vue({
  el: 'body',
  delimiters: ["{`", "`}"],
  components: {
    'quochuy': quochuy,
    'tieude': tieude,
  },
  data() {
    return {
      dsmaqt: ['pkh001', 'pkh002'],
    }
  }
})