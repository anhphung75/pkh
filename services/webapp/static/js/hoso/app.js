
import { data_test as test } from "../data_test.js"
import { db, loadDb, getCookie } from "../clientdb.js";
loadDb();
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
      oMap: {},
      oHoso: {},
      oKhach: {},
      oDot: {},
      oDvtc: {},
      mahoso: '2020hs000001',
      makhachhang: '2020kh000001',
      madot: '2020GMMP001',
      madvtc: '2020dvtc001',
      keyHoso: ['mahoso', 'sohoso'],
      keyKhach: ['makhachhang', 'hoten', 'diachi'],
      keyDot: ['madot', 'sodot', 'ngaylendot'],
      keyDvtc: ['madvtc', 'tendonvi'],
      keybo: ['lastupdate', 'scan', 'blob', 'isedit', 'isselect'],
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
    async loadHoso() {
      var cursor, bang = 'hoso';
      var request = await db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(this.mahoso));
      request.onerror = e => {
        this.oHoso = {};
        console.log('Error loadHoso: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.oHoso = cursor.value;
          cursor.continue();
        };
      };
    },
    async loadKhach() {
      var cursor, bang = 'khachhang';
      var request = await db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(this.makhachhang));
      request.onerror = e => {
        this.oKhach = {};
        console.log('Error loadKhach: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.oKhach = cursor.value;
          cursor.continue();
        };
      };
    },
    async loadDot() {
      var cursor, bang = 'dot';
      var request = await db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(this.madot));
      request.onerror = e => {
        this.oDot = {};
        console.log('Error loadDot: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.oDot = cursor.value;
          cursor.continue();
        };
      };
    },
    async loadDvtc() {
      var cursor, bang = 'donvithicong';
      var request = await db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(this.madvtc));
      request.onerror = e => {
        this.oDvtc = {};
        console.log('Error loadDvtc: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.oDvtc = cursor.value;
          cursor.continue();
        };
      };
    },
    async loadMap() {
      var cursor, bang = 'map';
      var request = await db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(this.mahoso));
      request.onerror = e => {
        this.oMap = {};
        console.log('Error loadMap: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.oMap = cursor.value;
          cursor.continue();
        };
      };
    },
    async loadOttdl() {
      this.ottdl = {};
      var cursor, bang = 'map';
      var request = db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      request.onerror = e => {
        console.log('Error loadOttdl: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.mahoso = cursor.value.mahoso || '';
          this.makhachhang = cursor.value.makhachhang || '';
          this.madot = cursor.value.madot || '';
          this.madvtc = cursor.value.madvtc || '';
          Promise.all([
            this.loadHoso(),
            this.loadKhach(),
            this.loadDot(),
            this.loadDvtc()
          ]).catch(err => { console.log("Error in Promise.all ", err) })
            .then(() => {
              console.log('loadOttdl ok on {mahoso: ', this.mahoso, ', makhachhang: ', this.makhachhang, 'madot: ', this.madot, 'madvtc: ', this.madvtc, '}');
            });
          //view test
          delay(1);
          cursor.continue();
        };
      };
    },
    async saveMap(recs) {
      var k, k1, v, rec, sgoc, smoi, rmoi, utcid, ddtam;
      var oRecs = {}, bang = 'map';
      ddtam = ld2dd(recs);
      for (k in ddtam) {
        utcid = Date.now();
        rec = ddtam[k];
        this.mahoso = rec.mahoso || utcid;
        Promise.all([this.loadMap()])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(this.oMap);
        rmoi = JSON.parse(JSON.stringify(this.oMap));
        for (k1 in rec) {
          rmoi[k1] = rec[k1];
        };
        rmoi['mahoso0'] = rec['mahoso0'] || utcid;
        rmoi['isok'] = rec['isok'] || false;
        smoi = JSON.stringify(rmoi);
        smoi = suaStr(smoi);
        if (sgoc !== smoi) {
          oRecs[k] = JSON.parse(smoi);
        };
        delay(1);
      }
      var store = db.engine
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        for (k in oRecs) {
          v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
      } catch (err) {
        console.log('Error saveMap', err.message);
      };
    },
    async saveHoso(recs) {
      var k, k1, v, rec, sgoc, smoi, rmoi, utcid, ddtam;
      var oRecs = {}, bang = 'hoso';
      ddtam = ld2dd(recs);
      for (k in ddtam) {
        utcid = Date.now();
        rec = ddtam[k];
        this.mahoso = rec.mahoso || utcid;
        Promise.all([this.loadHoso()])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(this.oHoso);
        rmoi = JSON.parse(JSON.stringify(this.oHoso));
        for (k1 in rec) {
          rmoi[k1] = rec[k1];
        };
        rmoi['mahoso0'] = rec['mahoso0'] || utcid;
        rmoi['isok'] = rec['isok'] || false;
        smoi = JSON.stringify(rmoi);
        smoi = suaStr(smoi);
        if (sgoc !== smoi) {
          oRecs[k] = JSON.parse(smoi);
        };
        delay(1);
      }
      var store = db.engine
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        for (k in oRecs) {
          v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
      } catch (err) {
        console.log('Error saveHoso', err.message);
      };
    },
    async saveKhach(recs) {
      var k, k1, v, rec, sgoc, smoi, rmoi, utcid, ddtam;
      var oRecs = {}, bang = 'khachhang';
      ddtam = ld2dd(recs);
      for (k in ddtam) {
        utcid = Date.now();
        rec = ddtam[k];
        this.makhachhang = rec.makhachhang || utcid;
        Promise.all([this.loadKhach()])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(this.oKhach);
        rmoi = JSON.parse(JSON.stringify(this.oKhach));
        for (k1 in rec) {
          rmoi[k1] = rec[k1];
        };
        rmoi['makhachhang0'] = rec['makhachhang0'] || utcid;
        rmoi['isok'] = rec['isok'] || false;
        smoi = JSON.stringify(rmoi);
        smoi = suaStr(smoi);
        if (sgoc !== smoi) {
          oRecs[k] = JSON.parse(smoi);
        };
        delay(1);
      }
      var store = db.engine
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        for (k in oRecs) {
          v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
      } catch (err) {
        console.log('Error saveKhach', err.message);
      };
    },
    async saveDot(recs) {
      var k, k1, v, rec, sgoc, smoi, rmoi, utcid, ddtam;
      var oRecs = {}, bang = 'dot';
      ddtam = ld2dd(recs);
      for (k in ddtam) {
        utcid = Date.now();
        rec = ddtam[k];
        this.madot = rec.madot || utcid;
        Promise.all([this.loadDot()])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(this.oDot);
        rmoi = JSON.parse(JSON.stringify(this.oDot));
        for (k1 in rec) {
          rmoi[k1] = rec[k1];
        };
        rmoi['madot0'] = rec['madot0'] || utcid;
        rmoi['isok'] = rec['isok'] || false;
        smoi = JSON.stringify(rmoi);
        smoi = suaStr(smoi);
        if (sgoc !== smoi) {
          oRecs[k] = JSON.parse(smoi);
        };
        delay(1);
      }
      var store = db.engine
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        for (k in oRecs) {
          v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
      } catch (err) {
        console.log('Error saveDot', err.message);
      };
    },
    async saveDvtc(recs) {
      var k, k1, v, rec, sgoc, smoi, rmoi, utcid, ddtam;
      var oRecs = {}, bang = 'donvithicong';
      ddtam = ld2dd(recs);
      for (k in ddtam) {
        utcid = Date.now();
        rec = ddtam[k];
        this.madvtc = rec.madvtc || utcid;
        Promise.all([this.loadDvtc()])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(this.oDvtc);
        rmoi = JSON.parse(JSON.stringify(this.oDvtc));
        for (k1 in rec) {
          rmoi[k1] = rec[k1];
        };
        rmoi['madvtc0'] = rec['madvtc0'] || utcid;
        rmoi['isok'] = rec['isok'] || false;
        smoi = JSON.stringify(rmoi);
        smoi = suaStr(smoi);
        if (sgoc !== smoi) {
          oRecs[k] = JSON.parse(smoi);
        };
        delay(1);
      }
      var store = db.engine
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        for (k in oRecs) {
          v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
      } catch (err) {
        console.log('Error saveDvtc', err.message);
      };
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
        for (i = this.tindau; i <= this.tincuoi; i++) {
          if (i === this.curtin) {
            this.ttdl[i].isok = true;
          } else {
            this.ttdl[i].isok = false;
          }
        };
      };
      if (e.code === 'ArrowUp') {
        this.curtin--;
        if (this.curtin < this.tindau) { this.curtin = this.tincuoi };
        for (i = this.tindau; i <= this.tincuoi; i++) {
          if (i === this.curtin) {
            this.ttdl[i].isok = true;
          } else {
            this.ttdl[i].isok = false;
          }
        };
      };
    },
    edit_ttdl() {
      this.ttdl[this.curtin].isedit = true;
    },
    stop_ttdl() {
      this.ttdl[this.curtin].isedit = false;
    },
  },
  computed: {
    //loc
    lHoso() {
      var dtam, s, k;
      var ltam = [];
      try {
        dtam = JSON.parse(JSON.stringify(this.oHoso));
        if (dtam.mahoso !== this.mahoso) { return ltam; };
        for (k in dtam) {
          s = k.toLowerCase();
          if (this.keybo.indexOf(s) > -1) {
            delete dtam[k];
          };
          s = dtam[k] || '';
          if (s.length < 1) {
            delete dtam[k];
          };
        };
        ltam = Object.values(dtam);
      } catch (err) {
        console.log('Error lHoso', err.message);
      };
      console.log('mahoso=', this.mahoso, ' lHoso=', ltam);
      return ltam;
    },
    lDot() {
      var dtam, s, k;
      var ltam = [];
      try {
        dtam = JSON.parse(JSON.stringify(this.oDot));
        if (dtam.madot !== this.madot) { return ltam; };
        for (k in dtam) {
          s = k.toLowerCase();
          if (this.keybo.indexOf(s) > -1) {
            delete dtam[k];
          };
          s = dtam[k] || '';
          if (s.length < 1) {
            delete dtam[k];
          };
        };
        ltam = Object.values(dtam);
      } catch (err) {
        console.log('Error lHoso', err.message);
      };
      console.log('madot=', this.madot, ' lDot=', ltam);
      return ltam;
    },
    lKhach() {
      var dtam, s, k;
      var ltam = [];
      try {
        dtam = JSON.parse(JSON.stringify(this.oKhach));
        if (dtam.makhachhang !== this.makhachhang) { return ltam; };
        for (k in dtam) {
          s = k.toLowerCase();
          if (this.keybo.indexOf(s) > -1) {
            delete dtam[k];
          };
          s = dtam[k] || '';
          if (s.length < 1) {
            delete dtam[k];
          };
        };
        ltam = Object.values(dtam);
      } catch (err) {
        console.log('Error lKhach', err.message);
      };
      console.log('makhachhang=', this.makhachhang, ' lKhach=', ltam);
      return ltam;
    },
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
      var i, s, k, o, dl, ltam, ssearch, isok;
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
      ltam = [...this.lHoso, ...this.lDot, ...this.lKhach];
      if (ltam.length < 1) { return; };
      ssearch = ltam.toString().toLowerCase();
      console.log('ssearch=', ssearch);
      isok = true;
      for (k in this.otim_ext) {
        s = k.toLowerCase();
        if (ssearch.indexOf(s) === -1) {
          isok = false;
          break;
        };
        console.log('key=', k);
        console.log('ssearch=', ssearch, ' isok= ', isok);
      };
      if (isok) {
        console.log('add ottdl =');
        this.oHoso.isedit = false;
        this.oDot.isedit = false;
        this.oKhach.isedit = false;
        this.oDvtc.isedit = false;
        this.ottdl[this.mahoso] = {
          hoso: this.oHoso,
          dot: this.oDot,
          khachhang: this.oKhach,
          donvithicong: this.oDvtc,
          isedit: false,
          isok: false,
        };
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
