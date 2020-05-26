import { loadDb, restHoso } from "./clientdb.js"

var app = new Vue({
  el: '#app',
  delimiters: ["{`", "`}"],
  data() {
    return {
      userid: 'Khach',
      namlv: 2020,
      hoso: new restHoso.gom(namlv)(),
      showMenu: false,
    }
  },
  mounted() {
    this.loaddb;
  },
  methods: {
    loaddb() {
      return new loadDb(userid);
    }
  }
});