import Vue from '../refs/vue.esm.2.6.11.js';
import banghoso from './banghoso.js';

var app = new Vue({
  el: '#trangxem',
  delimiters: ["{`", "`}"],
  components: {
    banghoso,
  },
  data() {
    return {
      //search
      stim: '',
      //phan trang
      tin1trang: 3,
      curtin: 0,
      curtrang: 1,
      //bang hien thi
      curbang: 0,
      tongbang: 3,
      url_ws: { ttdl: '', ttxl: '' },
      isloadws: true,

    }
  },
  methods: {

  },

});