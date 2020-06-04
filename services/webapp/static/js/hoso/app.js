var oHoso_test = {
  '2020.hs.001': {
    mahoso: '2020.hs.001',
    makhachhang: '2020.kh.001',
    hoten: 'Tran Van Anh 1',
    diachi: '123- To Ngoc Van- Q.Td',
    madot: '2020GMMP001',
  },
  '2020.hs.002': {
    mahoso: '2020.hs.002',
    makhachhang: '2020.kh.002',
    hoten: 'Tran Van Anh 2',
    diachi: '124- To Ngoc Van- Q.Td',
    madot: '2020GMMP001',
  },
  '2020.hs.003': {
    mahoso: '2020.hs.003',
    makhachhang: '2020.kh.003',
    hoten: 'Tran Van Anh 3',
    diachi: '125- To Ngoc Van- Q.Td',
    madot: '2020GMMP002',
  },
};

function getCookie(name) {
  var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
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
      ldHoso_filter: {},
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
    async doc_oKhachhang() {
      let bang = 'khachhang';
      let uuid = this.makhachhang || '';
      let request = await this.db
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .get(uuid);
      request.onerror = e => {
        console.log('Error get_oDot', e);
      };
      request.onsuccess = e => {
        this.oDot = e.target.result;
      };
    },
    async doc_oDot() {
      let bang = 'dot';
      let uuid = this.madot || '';
      let request = await this.db
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .get(uuid);
      request.onerror = e => {
        console.log('Error get_oDot', e);
      };
      request.onsuccess = e => {
        this.oDot = e.target.result;
      };
    },
    async saveHoso(oRecs) {
      let bang = 'hoso';
      let store = this.db
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
        for (const k in oRecs) {
          let v = oRecs[k];
          v['lastupdate'] = Date.now();
          await store.put(v);
        }
        // await trans.complete;
        //await this.odbHoso();
      } catch (err) {
        console.log('Error saveHoso', err.message);
      };
    },
    async saveKhachhang(oRecs) {
      let bang = 'khachhang';
      let store = this.db
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
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
    async saveDot(oRecs) {
      let bang = 'dot';
      let store = this.db
        .transaction(bang, 'readwrite')
        .objectStore(bang);
      try {
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
  },
  computed: {
    dbName() {
      let a = getCookie('workgroup') || 'Cntđ';
      return a;
    },
    dbDot() {
      let kq;
      let a = this.doc_oDot(this.madot);
      a.then((kq1) => kq = kq1)
      return kq;
    },
    otim_ext() {
      //loc theo otim + namlv + stim
      let s = this.namlv + 'hs';
      let _otim = JSON.parse(JSON.stringify(this.otim));
      _otim[s] = true;
      s = this.stim;
      _otim[s] = true;
      return _otim;
    },


  },
});
