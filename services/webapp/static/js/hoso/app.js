
import { data_test as test } from "../data_test.js"
//import { db, loadDb, getCookie } from "../clientdb.js";
//loadDb();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

var ld2dd = (recs) => {
  let orecs = {};
  if (Array.isArray(recs)) {
    try {
      let dai = recs.length || 0;
      for (let i = 0; i < dai; i++) {
        orecs[i] = recs[i];
      };
      return orecs;
    } catch (err) {
      console.log('Error ld2dd ', err.message);
    };
  };
  if (typeof recs === 'object') {
    return recs;
  } else {
    return orecs;
  };
};

var suaStr = (ss = '') => {
  try {
    //loai bo 2 space, tabs, newlines
    ss = ss.replace(/\s\s+/g, ' ');
    //loai bo 2 space
    ss = ss.replace(/  +/g, ' ');
    //thay NumpadSubtract = Minus
    ss = ss.replace(/-+/g, '-');
    //loai bo 2 Minus --
    ss = ss.replace(/--+/g, '-');
  } catch (err) { };
  return ss;
};

var app = new Vue({
  el: '#trangxem',
  delimiters: ["{`", "`}"],
  data() {
    return {
      namlv: 2020,
      showMenu: false,
      showotim: false,
      ottdl: {},
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
      url_worker: '',
    }
  },
  async created() {

    //await this.loadDb();
    //this.cats = await this.getCatsFromDb();
    //this.ready = true;
  },
  async mounted() {
    // await this.odbHoso();
  },
  methods: {
    saveDataTest() {
      this.saveMap(test.map);
      this.saveHoso(test.hoso);
      this.saveKhach(test.khachhang);
      this.saveDot(test.dot);
      this.saveDvtc(test.donvithicong);
    },
    add_otim() {
      if (this.stim.length > 0) {
        this.otim[this.stim] = true;
        this.showotim = true;
        this.stim = '';
      };
    },
    clear_otim() {
      this.showotim = false;
      this.otim = {};
      this.loadOttdl();
    },
    tim_keyup(e) {
      console.log("event.key=", e.key, " event.keyCode=", e.keyCode, " event.code=", e.code);
      var i;
      var lcode = ['KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ',
        'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT',
        'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ',
        'Equal', 'Comma', 'Minus', 'Period', 'Quote', 'Semicolon', 'BracketLeft', 'BracketRight', 'Slash',
        'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
        'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9',
        'NumpadAdd', 'NumpadDecimal', 'NumpadComma', 'NumpadDevide', 'NumpadMultiply', 'NumpadStar', 'NumpadSubtract']
      if (lcode.indexOf(e.code) > -1) { this.loadOttdl(); }
      if (e.code === 'Insert' && this.stim.length > 0) {
        this.otim[this.stim] = true;
        this.showotim = true;
        this.stim = '';
      };
      if (e.code === 'ArrowDown') {
        this.curtin++;
        if (this.curtin > this.tincuoi) { this.curtin = this.tindau };
      };
      if (e.code === 'ArrowUp') {
        this.curtin--;
        if (this.curtin < this.tindau) { this.curtin = this.tincuoi };
      };
    },
    loadOttdl() {
      this.ottdl = {};
      var w = new Worker(this.url_worker, { type: "module" });
      w.onerror = (e) => { console.log("err on loadOttdl ", e.message) };
      w.onmessage = (e) => {
        this.ottdl = e.data;
      };
      w.postMessage({ load: this.otim_ext });
    },
  },
  computed: {
    otim_ext() {
      //loc theo otim + namlv + stim
      let _otim = JSON.parse(JSON.stringify(this.otim));
      let s = '';
      if (['all', 'tất cả', 'toàn bộ',].indexOf(this.namlv) === -1) {
        s = this.namlv + 'hs';
        _otim[s] = true;
      }
      s = this.stim;
      if (s.length > 0) {
        _otim[s] = true;
      }
      return _otim;
    },
    ttdl() {
      var i, k, dl, ltam;
      var dtam = {
        0: {
          hoso: { mahoso: '', sohoso: '', ngaygan: '', ngayhoancong: '', isedit: false },
          dot: { madot: '', sodot: '', ngaylap: '', isedit: false },
          khachhang: { makhachhang: '', khachhang: '', diachi: '', isedit: false },
          donvithicong: { madvtc: '', dvtc: '', isedit: false },
          isedit: false,
          isok: false,
        }
      };
      //convert to list sort
      dl = this.ottdl || {};
      if (Object.keys(dl) < 1) { return; };
      ltam = [];
      for (k in dl) {
        //s.push(tam[k]);
        ltam = [...ltam, dl[k]];
      };
      dl = ltam.sort((a, b) => (a.mahoso > b.mahoso) ? 1 : ((b.mahoso > a.mahoso) ? -1 : 0));
      //dtam = {};
      k = dl.length;
      try {
        for (i = 0; i <= k; i++) {
          dtam[i] = JSON.parse(JSON.stringify(dl[i]));
        };
      } catch (err) {
        console.log('Error ttdl', err.message);
      };
      return dtam;
    },
    //phan trang
    tongtin() {
      try {
        return Object.keys(this.ttdl).length;
      } catch (err) {
        return 0;
      };
    },
    tongtrang() {
      if (this.tin1trang < 1) { this.tin1trang = 1; };
      var a = Math.floor(this.tongtin / this.tin1trang);
      a = this.tongtin % this.tin1trang > 0 ? a++ : a;
      a = a < 1 ? 1 : a;
      return a;
    },
    tindau() {
      if (this.tin1trang < 1) { this.tin1trang = 1; };
      if (this.curtrang < 1) { this.curtrang = 1; };
      var a = (this.curtrang - 1) * this.tin1trang;
      return a;
    },
    tincuoi() {
      var a = this.tindau + this.tin1trang - 1;
      a = a > (this.tongtin - 1) ? this.tongtin - 1 : a;
      return a;
    },
    luid() {
      var i, a = [];
      for (i = this.tindau; i <= this.tincuoi; i++) {
        a.push(i);
      };
      return a;
    },
  },
});
