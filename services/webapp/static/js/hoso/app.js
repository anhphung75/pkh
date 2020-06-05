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

function getCookie(name) {
  var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
};

function ld2dd(recs) {
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
      dbVersion: 1,
      db: null,
      namlv: 2020,
      showMenu: false,
      showotim: false,
      ldHoso: '',
      ttdl0: {},
      ttdl: {},
      info: { tin1trang: 0, curtin: 0, curtrang: 1 },
      oHoso: {},
      oKhachhang: {},
      oDot: {},
      mahoso: '2020.hs.002',
      madot: '2020GMMP001',
      makhachhang: '2020.kh.003',
      stim: '',
      otim: {},
      oHoso_test: oHoso_test,
    }
  },
  async created() {
    await this.loadDb();
    //this.cats = await this.getCatsFromDb();
    //this.ready = true;
  },
  async mounted() {
    // await this.odbHoso();
  },
  methods: {
    async loadDb() {
      let request = await window.indexedDB.open(this.dbName, this.dbVersion);
      request.onerror = e => {
        console.log('Error opening db', e);
      };
      request.onsuccess = e => {
        this.db = e.target.result;
      };
      request.onupgradeneeded = e => {
        this.db = e.target.result;
        this.db.createObjectStore('hoso', { keyPath: "mahoso" });
        this.db.createObjectStore('khachhang', { keyPath: "makhachhang" });
        this.db.createObjectStore('dot', { keyPath: "madot" });
      };
    },
    async dropDb() {
      let request = await window.indexedDB.deleteDatabase(this.dbName);
      request.onerror = err => {
        console.log('Error opening db', err);
      };
      await window.location.reload();
    },
    async clearDbStore(storename = 'hoso') {
      try {
        let trans = this.db.transaction([storename,], 'readwrite');
        let store = trans.objectStore(storename);
        let request = await store.clear();
      } catch (err) {
        console.log('Error deleteObjectStore ', err);
      };
      //await window.location.reload();
    },
    async get_oKhachhang(makhachhang) {
      let bang = 'khachhang';
      let uuid = makhachhang || '';
      let request = await this.db
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .get(uuid);
      request.onerror = e => {
        console.log('Error get_oDot', e);
        this.oKhachhang = {};
      };
      request.onsuccess = e => {
        this.oKhachhang = e.target.result;
      };
    },
    async get_oDot(madot) {
      let bang = 'dot';
      let uuid = madot || '';
      let request = await this.db
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .get(uuid);
      request.onerror = e => {
        console.log('Error get_oDot', e);
        this.oDot = {};
      };
      request.onsuccess = e => {
        this.oDot = e.target.result;
      };
    },
    async get_ttdl() {
      try {
        let tam = {};
        let bang = 'hoso';
        let request = await this.db
          .transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor();
        request.onerror = e => {
          console.log('Error get_ttdl', e);
          this.ttdl = {};
        };
        request.onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            //load oKhachhang, oDot
            this.oHoso = cursor.value;
            let mahoso = cursor.value.mahoso;
            let makhachhang = cursor.value.makhachhang;
            let madot = cursor.value.madot;

            Promise.all([
              this.get_oKhachhang(makhachhang),
              this.get_oDot(madot)])
              .then(result => {
                console.log(result)
              })
              .catch(error => console.log(`Error in promises ${error}`));
            //dtam bao gom ca blob 1 scanimage
            let s = '';
            let keybo = ['lastupdate', 'scan',];
            let dtam = JSON.parse(JSON.stringify(this.oHoso));
            for (let k in dtam) {
              s = k.toLowerCase();
              if (keybo.indexOf(s) > -1) {
                delete dtam[k];
              };
            };
            let lsearch = Object.values(dtam);
            //khachhang
            dtam = JSON.parse(JSON.stringify(this.oKhachhang));
            for (let k in dtam) {
              s = k.toLowerCase();
              if (keybo.indexOf(s) > -1) {
                delete dtam[k];
              };
            };
            lsearch = [...lsearch, ...Object.values(dtam)];
            //dot
            dtam = JSON.parse(JSON.stringify(this.oDot));
            for (let k in dtam) {
              s = k.toLowerCase();
              if (keybo.indexOf(s) > -1) {
                delete dtam[k];
              };
            };
            lsearch = [...lsearch, ...Object.values(dtam)];
            // loc 
            let isok = true;
            let ssearch = lsearch.toString().toLowerCase();
            for (let k in this.otim_ext) {
              s = k.toLowerCase();
              if (ssearch.indexOf(s) === -1) {
                isok = false;
                break;
              };
              console.log('key=', k);
              console.log('ssearch=', ssearch, ' isok= ', isok);
            };
            if (isok) {
              tam[mahoso] = {
                'hoso': this.oHoso,
                'khachhang': this.oKhachhang,
                'dot': this.oDot
              }
            };
            cursor.continue();
          };
          //convert to list
          let s = [];
          for (let k in tam) {
            //s.push(tam[k]);
            s = [...s, tam[k]];
          };
          this.ttdl0 = s;
          //phan trang
          this.info.tongtin = s.length || 0;
          if (this.info.tin1trang > 0) {
            this.info.tongtrang = Math.floor(this.info.tongtin / this.info.tin1trang);
            if (this.info.tongtin % this.info.tin1trang > 0) { this.info.tongtrang++; };
            if (this.info.curtrang > this.info.tongtrang) { this.info.curtrang = this.info.tongtrang; };
            this.info.tindau = this.info.tin1trang * this.info.curtrang;
            this.info.tincuoi = this.info.tindau + this.info.tin1trang;
            if (this.info.tincuoi > this.info.tongtin) { this.info.tincuoi = this.info.tongtin };
          } else {
            this.info.tongtrang = 1;
            this.info.curtrang = 1;
            this.info.tindau = 0;
            this.info.tincuoi = this.info.tongtin;
          };
          // tinh lai du lieu
          this.ttdl = [];
          try {
            for (let i = this.info.tindau; i <= this.info.tincuoi; i++) {
              this.ttdl.push(this.ttdl0[i]);
            };
          } catch (err) {
            console.log('Error ttdl ', err.message);
          };

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
      //if (e.key = 'Insert') { this.get_ttdl(); }

    },
    save_data_test() {
      this.saveHoso(oHoso_test);
      this.saveKhachhang(oKhachhang_test);
      this.saveDot(oDot_test);
    },

  },
  computed: {
    dbName() {
      let a = getCookie('workgroup') || 'Cntđ';
      return a;
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
  },
});
