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
var oKhachhang_test = [
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
  let request = await window.indexedDB.open(db.name, db.version);
  request.onerror = e => {
    console.log('Error opening db', e);
  };
  request.onsuccess = e => {
    db.engine = e.target.result;
    console.log('opening db');
  };
  request.onupgradeneeded = e => {
    db.engine = e.target.result;
    db.engine.createObjectStore('hoso', { keyPath: "mahoso" });
    db.engine.createObjectStore('khachhang', { keyPath: "makhachhang" });
    db.engine.createObjectStore('dot', { keyPath: "madot" });
    console.log('upgrade db');
  };
};

var getCookie = (name) => {
  var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
};

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

var app = new Vue({
  el: '#trangxem',
  delimiters: ["{`", "`}"],
  data() {
    return {
      namlv: 2020,
      showMenu: false,
      showotim: false,
      ttdl: { 0: { hoso: {}, dot: {}, khachhang: {} } },
      oHoso: {},
      oKhachhang: {},
      oDot: {},
      mahoso: '2020.hs.002',
      madot: '2020GMMP001',
      makhachhang: '2020.kh.003',
      //search
      stim: '',
      otim: {},
      //phan trang
      tin1trang: 0,
      curtin: 0,
      curtrang: 1,
      oHoso_test: oHoso_test,
    }
  },
  async created() {
    let a = getCookie('workgroup');
    if (a) { db.name = a; }
    await loaddb();
    //await this.loadDb();
    //this.cats = await this.getCatsFromDb();
    //this.ready = true;
  },
  async mounted() {
    // await this.odbHoso();
  },
  methods: {
    async loadKhachhang(uuid = null) {
      //uuid = this.makhachhang || '';
      this.oKhachhang = {};
      let bang = 'khachhang';
      let store = db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang);
      let request;
      if (uuid.length > 0) {
        request = await store.get(uuid);
      } else {
        request = await store.getAll();
      };
      request.onerror = e => {
        console.log('Error loadKhachhang: ', e);
      };
      request.onsuccess = e => {
        this.oKhachhang = e.target.result;
      };
    },
    async loadDot(uuid = null) {
      //uuid = this.madot || '';
      console.log('uuid loadDot: ', uuid);
      this.oDot = {};
      let bang = 'dot';
      let store = db.engine
        .transaction(bang, 'readonly')
        .objectStore(bang);
      let request;
      if (uuid.length > 0) {
        request = await store.get(uuid);
      } else {
        request = await store.getAll();
      };
      request.onerror = e => {
        console.log('Error loadDot: ', e);
      };
      request.onsuccess = e => {
        this.oDot = e.target.result;
        console.log('loadDot oDot: ', this.oDot);
      };
    },
    async loadHoso() {
      var request, cursor, ltam, ssearch, mahoso, madot, makhachhang, s, k, isok;
      var keybo = ['lastupdate', 'scan', 'blob',], data = {}, dtam = {};
      var bang = 'hoso';
      try {
        request = await db.engine
          .transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor();
        request.onerror = e => {
          console.log('Error loadHoso: ', e);
          this.ttdl = { 0: { hoso: {}, dot: {}, khachhang: {} } };
        };
        request.onsuccess = e => {
          cursor = e.target.result;
          if (cursor) {
            //load oKhachhang, oDot
            this.oHoso = cursor.value;
            mahoso = cursor.value.mahoso;
            makhachhang = cursor.value.makhachhang;
            madot = cursor.value.madot;
            console.log("mahoso: ", mahoso, " makh: ", makhachhang, " madot: ",madot)
            Promise.all([
              this.loadKhachhang(makhachhang),
              this.loadDot(madot)])
              .then()
              .catch(err => { console.log("Error in promises ", err) });
            //view test
            console.log("mahoso: ", mahoso, " oHoso: ", this.oHoso)
            console.log("madot: ", madot, " oDot: ", this.oDot)
            console.log("makh: ", makhachhang, " oKhach: ", this.oKhachhang)
            dtam = JSON.parse(JSON.stringify(this.oHoso));
            for (k in dtam) {
              s = k.toLowerCase();
              if (keybo.indexOf(s) > -1) {
                delete dtam[k];
              };
            };
            ltam = Object.values(dtam);
            //khachhang
            dtam = JSON.parse(JSON.stringify(this.oKhachhang));
            for (k in dtam) {
              s = k.toLowerCase();
              if (keybo.indexOf(s) > -1) {
                delete dtam[k];
              };
            };
            ltam = [...ltam, ...Object.values(dtam)];
            //dot
            dtam = JSON.parse(JSON.stringify(this.oDot));
            for (k in dtam) {
              s = k.toLowerCase();
              if (keybo.indexOf(s) > -1) {
                delete dtam[k];
              };
            };
            ltam = [...ltam, ...Object.values(dtam)];
            // loc 
            isok = true;
            ssearch = ltam.toString().toLowerCase();
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
              data[mahoso] = {
                'hoso': this.oHoso,
                'khachhang': this.oKhachhang,
                'dot': this.oDot
              }
            };
            cursor.continue();
          };
          //convert to list sort
          ltam = [];
          for (k in data) {
            //s.push(tam[k]);
            ltam = [...ltam, data[k]];
          };
          data = ltam.sort((a, b) => (a.mahoso > b.mahoso) ? 1 : ((b.mahoso > a.mahoso) ? -1 : 0));
          dtam = {};
          k = data.length;
          for (let i = 0; i <= k; i++) {
            dtam[i] = data[i];
          };
          this.ttdl = dtam;

        };
      } catch (err) {
        console.log('get_ttdl error=', err.message);
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
      this.saveKhachhang(oKhachhang_test);
      this.saveDot(oDot_test);
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
      a = a > (this.tongtin - 1) ? this.tongtin-- : a;
      return a;
    },
    luid() {
      let a = [];
      for (let i = this.tindau; i <= this.tincuoi; i++) {
        a.push(i);
      };
      return a;
    },
  },
});
