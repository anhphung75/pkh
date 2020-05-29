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

var oHoso = {
  gom: async (nam = 2020) => {
    return await db.select({
      from: tblHoso,
      where: {
        namhoso: nam
      }
    })
  },
  doc: async (mahoso = '') => {
    return await this.db.select({
      from: tblHoso,
      where: {
        mahoso: mahoso
      }
    })
  },
  xoa: async (mahoso = '') => {
    return await this.db.remove({
      from: tblHoso,
      where: {
        mahoso: mahoso
      }
    })
  },
  sua: async (mahoso = '', oHosomoi = {}) => {
    return await this.db.select({
      in: tblHoso,
      where: {
        mahoso: mahoso
      },
      set: oHosomoi
    })
  },
  moi: (oHosomoi = {}) => {
    return this.db.insert({
      into: tblHoso,
      values: [oHosomoi]
    })
  },
}

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
    async odbHoso_filter() {
      let oRecs = {};
      let storename = 'hoso';
      try {
        let trans = this.db.transaction([storename,], 'readonly');
        let store = trans.objectStore(storename);
        let request = await store.openCursor();
        request.onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            let isok = true;
            //loc theo otim va namlv
            let s = this.namlv + '.';
            let _otim = JSON.parse(JSON.stringify(this.otim));
            _otim[s] = true;
            for (let k in _otim) {
              let s = k.toLowerCase();
              if (JSON.stringify(cursor.value).toLowerCase().indexOf(s) === -1) {
                isok = false;
                break;
              }
            };
            if (isok) { oRecs[cursor.key] = cursor.value; };
            cursor.continue();
          };
          console.log('odbHoso_filter oRec=', 'toi day ne', JSON.stringify(oRecs));
          return oRecs;
        };
      } catch (err) {
        console.log('odbHoso_filter error=', err.message);
      };

    },
  },
});
