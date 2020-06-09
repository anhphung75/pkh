var oHoso_test = [
  {
    mahoso: '2020hs001',
    sohoso: '2020.hs.001',
    makhachhang: '2020.kh.001',
    hoten: 'Tran Van Anh 1',
    diachi: '123- To Ngoc Van- Q.Td',
    madot: '2020GMMP001',
    ngaygan: '2020-04-05',
    ngayhoancong: '2020-04-10',
    thongbao: '',
    ghichu: '',
    madvtc: '2020dv001',
  },
  {
    mahoso: '2020hs002',
    sohoso: '2020.hs.002',
    makhachhang: '2020.kh.002',
    hoten: 'Tran Van Anh 2',
    diachi: '124- To Ngoc Van- Q.Td',
    madot: '2020GMMP001',
    ngaygan: '2020-04-05',
    ngayhoancong: '2020-04-10',
    thongbao: '',
    ghichu: '',
    madvtc: '2020dv001',
  },
  {
    mahoso: '2020hs003',
    sohoso: '2020.hs.003',
    makhachhang: '2020.kh.003',
    hoten: 'Tran Van Anh 3',
    diachi: '125- To Ngoc Van- Q.Td',
    madot: '2020GMMP002',
    ngaygan: '2020-04-05',
    ngayhoancong: '2020-04-10',
    thongbao: '',
    ghichu: '',
    madvtc: '2020dv001',
  },
];
var oKhach_test = [
  {
    mahoso: '2020.hs.001',
    sohoso: '2020.hs.001',
    makhachhang: '2020.kh.001',
    hoten: 'Tran Van Anh 1',
    diachi: '123- To Ngoc Van- Q.Td',
    madot: '2020GMMP001',
    ngaygan: '2020-04-05',
    ngayhoancong: '2020-04-10',
    thongbao: '',
    ghichu: '',
    madvtc: '2020dv001',
  },
  {
    mahoso: '2020.hs.002',
    sohoso: '2020.hs.002',
    makhachhang: '2020.kh.002',
    hoten: 'Tran Van Anh 2',
    diachi: '124- To Ngoc Van- Q.Td',
    madot: '2020GMMP001',
    ngaygan: '2020-04-05',
    ngayhoancong: '2020-04-10',
    thongbao: '',
    ghichu: '',
    madvtc: '2020dv001',
  },
  {
    mahoso: '2020.hs.003',
    sohoso: '2020.hs.003',
    makhachhang: '2020.kh.003',
    hoten: 'Tran Van Anh 3',
    diachi: '125- To Ngoc Van- Q.Td',
    madot: '2020GMMP002',
    ngaygan: '2020-04-05',
    ngayhoancong: '2020-04-10',
    thongbao: '',
    ghichu: '',
    madvtc: '2020dv001',
  },
];
var oDot_test = [
  {
    madot: '2020GMMP001',
    sodot: 'GMMP 001/20',
    ngaylendot: '2020-04-05',
    thongbao: '',
    ghichu: '',
    scan: 'anh 01',
  },
  {
    madot: '2020GMMP003',
    sodot: 'GMMP 003/20',
    ngaylendot: '2020-04-05',
    thongbao: '',
    ghichu: '',
    scan: 'anh 03',
  },
  {
    madot: '2020GMMP002',
    sodot: 'GMMP 002/20',
    ngaylendot: '2020-05-05',
    thongbao: '',
    ghichu: '',
    scan: 'anh 02',
  },
];

//khai bao bien global
const db = {
  name: 'Cntđ',
  version: 1,
  engine: null,
  trans: null,
  drop: async () => {
    let request = await window.indexedDB.deleteDatabase(this.name);
    request.onerror = err => {
      console.log('Error drop db', err);
    };
    await window.location.reload();
  },
  clearstore: async (storename = 'hoso') => {
    try {
      let store = this.engine
        .transaction([storename,], 'readwrite')
        .objectStore(storename);
      await store.clear();
    } catch (err) {
      console.log('Error clearstore ', err);
    };
    //await window.location.reload();
  }
};

var loaddb = async () => {
  var map;
  var request = await window.indexedDB.open(db.name, db.version);
  request.onerror = e => {
    console.log('Error opening db', e);
  };
  request.onsuccess = e => {
    db.engine = e.target.result;
    console.log('opening db');
  };
  request.onupgradeneeded = e => {
    db.engine = e.target.result;
    if (event.oldVersion < 1) {
      map = db.engine.createObjectStore('map', { keyPath: "mahoso" });
      //map.createIndex("madot", "madot", { unique: false });
      //map.createIndex("makhachhang", "makhachhang", { unique: false });
      //map.createIndex("madshc", "madshc", { unique: false });
      //map.createIndex("maqtgt", "maqtgt", { unique: false });
      //map.createIndex("maquan", "maquan", { unique: false });
      //map.createIndex("maphuong", "maphuong", { unique: false });
      map = db.engine.createObjectStore('hoso', { keyPath: "mahoso" });
      //map.createIndex("mahoso0", "mahoso0", { unique: false });
      map = db.engine.createObjectStore('khachhang', { keyPath: "makhachhang" });
      //map.createIndex("makhachhang0", "makhachhang0", { unique: false });
      map = db.engine.createObjectStore('dot', { keyPath: "madot" });
      //map.createIndex("madot0", "madot0", { unique: false });
    };

    console.log('upgrade db');
  };
};

var getCookie = (name) => {
  var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
};

var setupdb = async () => {
  let a = getCookie('workgroup');
  if (a) { db.name = a; }
  await loaddb();
};

setupdb();

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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


var app = new Vue({
  el: '#trangxem',
  delimiters: ["{`", "`}"],
  data() {
    return {
      namlv: 2020,
      showMenu: false,
      showotim: false,
      ottdl: {},
      oHoso: {},
      oKhach: {},
      oDot: {},
      mahoso: '2020.hs.002',
      madot: '2020GMMP001',
      makhachhang: '2020.kh.003',
      keybo: ['lastupdate', 'scan', 'blob', 'isedit'],
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
      oHoso_test: oHoso_test,
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
    async loadKhach() {
      console.log('uuid loadKhachhang: ', this.makhachhang);
      //this.oKhach = {};
      var cursor, bang = 'khachhang';
      var request = await db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(this.makhachhang));
      request.onerror = e => {
        console.log('Error loadKhach: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.oKhach = cursor.value;
          delay(1);
          cursor.continue();
        };
      };
    },
    async loadDot() {
      console.log('uuid loadDot: ', this.madot);
      //this.oDot = {};
      var cursor, bang = 'dot';
      var request = await db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(this.madot));
      request.onerror = e => {
        console.log('Error loadDot: ', e);
      };
      request.onsuccess = e => {
        cursor = e.target.result;
        if (cursor) {
          this.oDot = cursor.value;
          delay(1);
          cursor.continue();
        };
      };
    },
    async loadHoso() {
      var request, cursor, bang = 'hoso';
      this.ottdl = {};
      try {
        //this.oHoso = {};
        request = db.engine
          .transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor();
        request.onerror = e => {
          console.log('Error loadHoso: ', e);
        };
        request.onsuccess = e => {
          cursor = e.target.result;
          if (cursor) {
            //load oKhach, oDot
            this.oHoso = cursor.value || {};
            this.mahoso = cursor.value.mahoso || '';
            this.makhachhang = cursor.value.makhachhang || '';
            this.madot = cursor.value.madot || '';
            Promise.all([
              this.loadKhach(),
              this.loadDot()])
              .then(() => {
                console.log('load ttdl ok on {mahoso: ', this.mahoso, ', makhachhang: ', this.makhachhang, 'madot: ', this.madot, '}');
              })
              .catch(err => { console.log("Error in Promise.all ", err) });
            //view test
            delay(100);
            cursor.continue();
          };

        };
      } catch (err) {
        console.log('loadHoso error=', err.message);
      };
    },
    async loadMap() {
      var request, cursor, bang = 'map';
      this.ottdl = {};
      try {
        //this.oHoso = {};
        request = db.engine
          .transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor();
        request.onerror = e => {
          console.log('Error loadHoso: ', e);
        };
        request.onsuccess = e => {
          cursor = e.target.result;
          if (cursor) {
            //load oKhach, oDot
            this.mahoso = cursor.value.mahoso || '';
            this.makhachhang = cursor.value.makhachhang || '';
            this.madot = cursor.value.madot || '';
            Promise.all([
              this.loadHoso(),
              this.loadKhach(),
              this.loadDot()])
              .then(() => {
                console.log('load ttdl ok on {mahoso: ', this.mahoso, ', makhachhang: ', this.makhachhang, 'madot: ', this.madot, '}');
              })
              .catch(err => { console.log("Error in Promise.all ", err) });
            //view test
            delay(100);
            cursor.continue();
          };
        };
      } catch (err) {
        console.log('loadHoso error=', err.message);
      };
    },
    async saveHoso(recs) {
      let bang = 'hoso';
      let store = this.db
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        let oRecs = ld2dd(recs);
        for (const k in oRecs) {
          let v = oRecs[k];
          v['isedit'] = false;
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
        // await trans.complete;
        //await this.odbHoso();
      } catch (err) {
        console.log('Error saveHoso', err.message);
      };
    },
    async saveKhachhang(recs) {
      let bang = 'khachhang';
      let store = this.db
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        let oRecs = ld2dd(recs);
        for (const k in oRecs) {
          let v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
        // await trans.complete;
        //await this.odbHoso();
      } catch (err) {
        console.log('Error saveKhachhang', err.message);
      };
    },
    async saveDot(recs) {
      let bang = 'dot';
      let store = this.db
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        let oRecs = ld2dd(recs);
        for (const k in oRecs) {
          let v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
        // await trans.complete;
        //await this.odbHoso();
      } catch (err) {
        console.log('Error saveDot', err.message);
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
      this.loadHoso();
    },
    tim_keyup(e) {
      console.log("event.key=", e.key);
      console.log("event.keyCode=", e.keyCode);
      var lcode = ['KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ',
        'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT',
        'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ',
        ' Equal', 'Comma', 'Minus', 'Period', 'Quote', 'Semicolon', 'BracketLeft', 'BracketRight',
        'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
        'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9',
        'NumpadAdd', 'NumpadDecimal', 'NumpadComma', 'NumpadDevide', 'NumpadMultiply', 'NumpadStar', 'NumpadSubtract']
      if (lcode.indexOf(e.code) > -1) { this.loadHoso(); }
      if (e.code === 'Insert' && this.stim.length > 0) {
        this.otim[this.stim] = true;
        this.showotim = true;
        this.stim = '';
      };
    },
    save_data_test() {
      this.saveHoso(oHoso_test);
      this.saveKhachhang(oKhach_test);
      this.saveDot(oDot_test);
    },

  },
  computed: {
    //loc
    lHoso() {
      var dtam, s, k;
      var ltam = ['',];
      try {
        dtam = JSON.parse(JSON.stringify(this.oHoso));
        if (dtam.mahoso !== this.mahoso) { return ltam; };
        for (k in dtam) {
          s = k.toLowerCase();
          if (this.keybo.indexOf(s) > -1) {
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
      var ltam = ['',];
      try {
        dtam = JSON.parse(JSON.stringify(this.oDot));
        if (dtam.madot !== this.madot) { return ltam; };
        for (k in dtam) {
          s = k.toLowerCase();
          if (this.keybo.indexOf(s) > -1) {
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
      var ltam = ['',];
      try {
        dtam = JSON.parse(JSON.stringify(this.oKhach));
        if (dtam.makhachhang !== this.makhachhang) { return ltam; };
        for (k in dtam) {
          s = k.toLowerCase();
          if (this.keybo.indexOf(s) > -1) {
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
          hoso: { mahoso: '', sohoso: '', isedit: false },
          dot: { madot: '', sodot: '' },
          khachhang: { makhachhang: '', hoten: '', diachi: '' },
          isedit: false,
          isselect: false,
        }
      };
      try {
        ltam = [...this.lHoso, ...this.lDot, ...this.lKhach];
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
          this.ottdl[this.mahoso] = { hoso: this.oHoso, dot: this.oDot, khach: this.oKhach };
        };
        //convert to list sort
        dl = this.ottdl;
        ltam = [];
        for (k in dl) {
          //s.push(tam[k]);
          ltam = [...ltam, dl[k]];
        };
        dl = ltam.sort((a, b) => (a.mahoso > b.mahoso) ? 1 : ((b.mahoso > a.mahoso) ? -1 : 0));
        //dtam = {};
        k = dl.length;
        for (i = 0; i <= k; i++) {
          o = JSON.parse(JSON.stringify(dl[i]));
          o.isedit = false;
          o.isselect = false;
          dtam[i] = o;
        };
      } catch (err) {
        console.log('Error ttdl', err.message);
      };
      return dtam;
    },
    //phan trang
    tongtin() {
      let a = Object.keys(this.ttdl).length || 0;
      return a;
    },
    tongtrang() {
      if (this.tin1trang < 1) { this.tin1trang = 1; };
      let a = Math.floor(this.tongtin / this.tin1trang);
      a = this.tongtin % this.tin1trang > 0 ? a++ : a;
      a = a < 1 ? 1 : a;
      return a;
    },
    tindau() {
      if (this.tin1trang < 1) { this.tin1trang = 1; };
      if (this.curtrang < 1) { this.curtrang = 1; };
      let a = (this.curtrang - 1) * this.tin1trang;
      return a;
    },
    tincuoi() {
      let a = this.tindau + this.tin1trang - 1;
      a = a > (this.tongtin - 1) ? this.tongtin - 1 : a;
      return a;
    },
    luid() {
      let i, a = [];
      for (i = this.tindau; i <= this.tincuoi; i++) {
        a.push(i);
      };
      return a;
    },
  },
});
