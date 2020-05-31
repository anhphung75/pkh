var oDb = {
  load: async (dbName = '', dbVersion = 1) => {
    let check = dbName.length || 0;
    if (check == 0) { return };
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(dbName, dbVersion);
      request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
      };
      request.onsuccess = e => {
        resolve(e.target.result);
      };
      //tao bang neu chua co
      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore('khachhang', { autoIncrement: false, keyPath: 'makhachhang' });
        db.createObjectStore('hoso', { autoIncrement: false, keyPath: 'mahoso' });
        resolve(db);
      };
    });
  },
  drop: async (dbName = '') => {
    let check = dbName.length || 0;
    if (check == 0) { return };
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.deleteDatabase(dbName);
      request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
      };
      request.onsuccess = e => {
        resolve(null);
      };
      //tao bang neu chua co
      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        window.indexedDB.deleteDatabase(dbName);
        resolve(null);
      };
    });
  }
};

var app = new Vue({
  el: '#trangxem',
  delimiters: ["{`", "`}"],
  data() {
    return {
      dbName: 'Khach',
      dbVersion: 1,
      db: null,
      namlv: 2020,
      showMenu: false,
      showotim: false,
      dHoso: '',
      ldHoso: '',
      dbHoso_filter: {},
      stim: '',
      otim: {},
      oHoso: {
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
          madot: '2020GMMP001',
        },
      },
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
      let check = this.dbName.length || 0;
      if (check == 0) { return false; };
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
      let check = this.dbName.length || 0;
      if (check == 0) { return false; };
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
    async odbHoso() {
      let oRecs = {};
      let storename = 'hoso';
      let trans = this.db.transaction([storename,], 'readonly');
      let store = trans.objectStore(storename);
      let request = await store.openCursor();
      request.onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          //filter dk

          oRecs[cursor.key] = cursor.value;
          cursor.continue();
        };
        return oRecs;
      };
    },
    async suaHoso() {
      let oRecs = this.oHoso;
      let storename = 'hoso';
      console.log('suaHoso ', storename, ' oRec=', oRecs);
      let trans = this.db.transaction([storename,], 'readwrite');
      let store = trans.objectStore(storename);
      try {
        for (const k in oRecs) {
          let v = oRecs[k];
          v['lastupdate'] = Date.now();
          console.log('suaHoso ', storename, ' oRec.k=', k);
          console.log('suaHoso ', storename, ' oRec.v=', v);
          await store.put(v);
        }
        // await trans.complete;
        //await this.odbHoso();
      } catch (err) {
        console.log('error', err.message);
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
    async pro_dbHoso_filter() {
      let listStore = ['hoso', 'khachhang', 'dot',];
      try {
        this.ldHoso = [];
        let _cursor = null;
        let trans = this.db.transaction(listStore, 'readonly');
        let request = await trans.objectStore('hoso').openCursor();
        request.onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            //let _mahoso = _rHoso.value.mahoso;
            let _makhachhang = cursor.value.makhachhang;
            let _madot = cursor.value.madot;
            let dtam = {};
            //dtam bao gom ca blob 1 scanimage
            dtam['hoso'] = cursor.value;
            //mo cac rec khac de kiem
            let req1 = await trans.objectStore('khachhang')
              .openCursor(IDBKeyRange.only(_makhachhang));
            req1.onsuccess = e => {
              _cursor = e.target.result;
              dtam['khachhang'] = _cursor ? _cursor.value : {};
            };
            let req2 = await trans.objectStore('dot')
              .openCursor(IDBKeyRange.only(_madot));
            req2.onsuccess = e => {
              _cursor = e.target.result;
              dtam['dot'] = _cursor ? _cursor.value : {};
            };
            //loc theo otim + namlv + stim
            let s = this.namlv + '.';
            let _otim = JSON.parse(JSON.stringify(this.otim));
            _otim[s] = true;
            s = this.stim;
            _otim[s] = true;
            let isok = true;
            sdtam = JSON.stringify(dtam).toLowerCase();
            for (let k in _otim) {
              s = k.toLowerCase();
              if (sdtam.indexOf(s) === -1) {
                isok = false;
                break;
              };
            };
          };
          if (isok) { this.ldHoso.push(dtam); };
          cursor.continue();
        };
      } catch (err) {
        console.log('odbHoso_filter error=', err.message);
      };
    },
  },
});
