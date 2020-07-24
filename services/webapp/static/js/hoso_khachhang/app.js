import Vue from 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm.browser.min.js';
import { data_test as test } from "../test/data_test.js";
import { taodb, cap1, capn, luu, luun } from "../ttdl/db.js";
//import { loadHsKh } from "../ttxl/hoso_khachhang.js";

var app = new Vue({
  el: '#trangxem',
  delimiters: ["{`", "`}"],
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
  async created() {
    await taodb();
    //this.cats = await this.getCatsFromDb();
    //this.ready = true;
  },
  async mounted() {
    // await this.odbHoso();
  },
  methods: {
    loadHsKh() {
      var dprog = {
        csdl: {
          ten: this.csdl,
          sohieu: this.sohieu
        },
        otim: this.otim_ext,
        //otim: { '2020': 0, 'gm': 0 },
      };
      this.ttdl = {};
      var w = new SharedWorker(this.url_ws.ttxl, { type: 'module' });
      w.port.start();
      const sw = w.port;
      sw.postMessage(dprog);
      sw.onerror = (err) => {
        console.log("err on loadHsKh ", err.message);
      };
      sw.onmessage = (e) => {
        var info = e.data.info;
        if (info) {
          console.log('info= =', info);
        }
        var status = e.data.status || '';
        if (status.toLowerCase() === 'ok') {
          var id = e.data.id;
          var kq = e.data.kq;
          this.ttdl[id] = kq;
          console.log('sw.id=', id, 'sw.kq=', kq);
        }
        console.log('ttdl=', this.ttdl);
      };
    },
    xoaUrl_ws() {
      var element = document.getElementById("url_ws");
      element.parentNode.removeChild(element);
    },
    startSv() {
      var w;
      if (typeof (SharedWorker) === "undefined") {
        console.log("Xin lỗi, trình duyệt không tương thích ..!")
        return;
      }
      w = new SharedWorker(this.url_ttdl, { type: 'module' });
      w.port.start();
      this.ttdl = w.port;
      w = new SharedWorker(this.url_ttxl, { type: 'module' });
      w.port.start();
      this.ttxl = w.port;
      this.isloadws = false;
      this.ttxl.postMessage({ ttdl: this.ttdl });
    },
    stopSv(w) {
      w.terminate();
      w = undefined;
    },
    loadHoso1() {
      var db = {
        ten: this.csdl,
        sohieu: this.sohieu,
      };
      var otim = { '2020': 0 };
      loadHsKh(db, otim);
    },

    loadHoso() {
      var db = {
        ten: this.csdl,
        sohieu: this.sohieu
      };
      taodb(db);
      var bang = {
        ten: 'hoso',
        nap: this.mahoso
      };

    },
    saveHoso() {
      var db = {
        ten: this.csdl,
        sohieu: this.sohieu
      };
      taodb(db);
      var bang = {
        ten: 'hoso',
        luu: test.hoso[1],
      };
      console.log('bang=', bang)
      //luu(db, bang);
      capn(db, test);
    },
    saveHoso1(rec) {
      if (typeof (SharedWorker) === "undefined") {
        console.log("Xin lỗi, trình duyệt không tương thích ..!")
        return;
      }
      var w = new SharedWorker(this.url_ws.ttxl, { type: 'module' });
      w.port.start();
      const sw = w.port;
      sw.onerror = (err) => {
        console.log("err on saveHoso ", err.message)
      };
      sw.onmessage = (e) => {
        console.log("worker say saveHoso= ", e.data);
      };
      rec = test;
      var dprog = {
        csdl: {
          ten: this.csdl,
          sohieu: this.sohieu
        },
        bang: {
          ten: 'server',
          capn: rec,
          //gom: 2020,}
        }
      };
      sw.postMessage(dprog)
    },
    lastUid() {
      if (typeof (SharedWorker) === "undefined") {
        console.log("Xin lỗi, trình duyệt không tương thích ..!")
        return;
      }
      var w = new SharedWorker(this.url_ws.ttdl, { type: 'module' });
      w.port.start();
      const sw = w.port;
      sw.onmessage = (e) => {
        console.log("worker say lastUid= ", e.data);
      };
      var dprog = {
        csdl: {
          ten: this.csdl,
          sohieu: this.sohieu
        },
        bang: {
          ten: 'hoso',
          lastUid: 2020,
        }
      };
      sw.postMessage(dprog)
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
        'NumpadAdd', 'NumpadDecimal', 'NumpadComma', 'NumpadDevide', 'NumpadMultiply', 'NumpadStar', 'NumpadSubtract',
        'Backspace', 'Delete',]
      if (lcode.indexOf(e.code) > -1) {
        console.log('loadHsKh otim=', this.otim_ext);
        this.loadHsKh();
      }
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
  },
  computed: {
    otim_ext() {
      //loc theo otim + namlv + stim
      let _otim = JSON.parse(JSON.stringify(this.otim));
      let s = '';
      if (['all', 'tất cả', 'toàn bộ',].indexOf(this.namlv) === -1) {
        s = this.namlv;
        _otim[s] = false;
        s = 'hs';
        _otim[s] = false;
      }
      s = this.stim;
      if (s.length > 0) {
        _otim[s] = false;
      }
      return _otim;
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

export { app };