import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js';
import { div } from "../../comps/basetags.js";
import { phuivattu } from "./phuivattu.js";
Vue.component('w', div);
Vue.component('trangin', trangin);

var app = new Vue({
  el: '#vungin',
  delimiters: ["{`", "`}"],
  component: {
    'ongcai': phuivattu,
    'ongnganh': phuivattu,
  },
  data() {
    return {
      ttdl: null,
      ttxl: null,
      csdl: 'Cntđ',
      sohieu: 1,
      namlv: 2020,
      showMenu: false,
      showotim: false,
      ottdl: {},
      oHoso: {},
      oDot: {},
      oKhach: {},
      oDvtc: {},
      mahoso: '2020hs000003',
      madot: '2020GMMP002',
      madvtc: '2020dvtc001',
      makhachhang: '2020kh000002',
      //search
      stim: '',
      otim: {},
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
})

export { app }