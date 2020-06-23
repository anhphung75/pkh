import { data_test as test } from "../data_test.js"
import { taodb, capnhat, luu, luunhom } from "../ttdl/db.js";

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

    //await this.loadDb();
    //this.cats = await this.getCatsFromDb();
    //this.ready = true;
  },
  async mounted() {
    // await this.odbHoso();
  },
  methods: {
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
      var w = new SharedWorker(this.url_ws.ttxl, { type: 'module' });
      w.port.start();
      const sw = w.port;
      sw.onerror = (err) => {
        console.log("err on loadHoso ", err.message);
      };
      sw.onmessage = (e) => {
        var kq = e.data.kq;
        console.log('sw.kq=', kq);
        return kq;
      };
      var dprog = {
        csdl: {
          ten: this.csdl,
          sohieu: this.sohieu,
        },
        bang: {
          ten: 'hoso',
          nap: { '2002': 0 },
        }
      };
      sw.postMessage(dprog);
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
      luu(db, bang);
      //capnhat(db, test);
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
          capnhat: rec,
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
      var oMap; oData = {};
      var dprog = {
        nap: {
          csdl: this.csdl,
          sohieu: this.sohieu,
          bang: 'hoso',
          //uuid: this.mahoso,
          gom: 2020,
        }
      };
      var wMap = new Worker(this.url_ws.dulieu, { type: 'module' });
      wMap.onerror = (err) => {
        console.log("err on loadHoso ", err.message);
      };
      wMap.postMessage(dprog);
      wMap.onmessage = (e) => {
        if (e.data != null) {
          oMap = e.data;
        }
        if ('mahoso' in oMap) {
          var wHoso = new Worker(this.url_ws.bangbieu, { type: 'module' });
          dprog.nap = {
            csdl: this.csdl,
            sohieu: this.sohieu,
            bang: 'hoso',
            uuid: oMap.mahoso,
          }
          wHoso.postMessage(dprog);
          wHoso.onmessage = (e) => {
            if (e.data != null) {
              oData['hoso'] = e.data;
            }
          }
        }
        if ('madot' in oMap) {
          var wDot = new Worker(this.url_ws.bangbieu, { type: 'module' });
          dprog.nap = {
            csdl: this.csdl,
            sohieu: this.sohieu,
            bang: 'dot',
            uuid: oMap.madot,
          }
          wDot.postMessage(dprog);
          wDot.onmessage = (e) => {
            if (e.data != null) {
              oData['dot'] = e.data;
            }
          }
        }
        if ('makhachhang' in oMap) {
          var wKhach = new Worker(this.url_ws.bangbieu, { type: 'module' });
          dprog.nap = {
            csdl: this.csdl,
            sohieu: this.sohieu,
            bang: 'khachhang',
            uuid: oMap.makhachhang,
          }
          wKhach.postMessage(dprog);
          wKhach.onmessage = (e) => {
            if (e.data != null) {
              oData['khachhang'] = e.data;
            }
          }
        }
        if ('madvtc' in oMap) {
          var wDvtc = new Worker(this.url_ws.bangbieu, { type: 'module' });
          dprog.nap = {
            csdl: this.csdl,
            sohieu: this.sohieu,
            bang: 'donvithicong',
            uuid: oMap.madvtc,
          }
          wDvtc.postMessage(dprog);
          wDvtc.onmessage = (e) => {
            if (e.data != null) {
              oData['donvithicong'] = e.data;
            }
          }
        }
        var wOttdl = new Worker(this.url_ws.dulieu, { type: 'module' });

      };
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
