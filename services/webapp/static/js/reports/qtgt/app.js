import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js';
import { div_tag } from "../../comps/basetags.js";
import quochuy from "./quochuy.js";
import tieude from "./tieude.js";
import tieudebang from "./tieudebang.js";
import cpvt from "./cpvt.js";

Vue.component('w', div_tag);

var app = new Vue({
  el: '#vungin',
  delimiters: ["{`", "`}"],
  components: {
    'quochuy': quochuy,
    'tieude': tieude,
    'tieudebang': tieudebang,
    'cpvt': cpvt,
  },
  data() {
    return {
      css: {
        grid: "auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr",
      },
      ldotqt: ["2020GMMP001001", "2020GMMP001002"],
      url_ws: { ttdl: 'ttdl', ttxl: 'ttxl' },
      isloadws: true,
      maqt: "2020GMMP001001",
      onZvl:200,
      onZnc:200,
      onZmtc:200,
      phuioc: [
        {
          mota: '- Cắt mặt nhựa', dvt: 'mét', 'sl': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },
        {
          mota: '- Đào bốc mặt nhựa', dvt: 'mét', 'sl': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },],
      vattuoc: [
        {
          mota: 'Đai lấy nước PP 100 x 20F', dvt: 'bộ', 'sl': 1, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },
        {
          mota: 'Van bi cóc đồng 3/4" x 25mm', dvt: 'cái', 'sl': 1, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },],
      phuion: [
        {
          mota: '- Cắt mặt nhựa', dvt: 'mét', 'sl': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },
        {
          mota: '- Đào bốc mặt nhựa', dvt: 'mét', 'sl': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },],
      vattuon: [
        {
          mota: 'Đai lấy nước PP 100 x 20F', dvt: 'bộ', 'sl': 1, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },
        {
          mota: 'Van bi cóc đồng 3/4" x 25mm', dvt: 'cái', 'sl': 1, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
          'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040
        },],
    }
  },
})

export { app }