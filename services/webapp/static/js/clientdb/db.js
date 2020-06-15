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

var loadDb = async () => {
  //var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
  if (!indexedDB) {
    console.log('Trình duyệt không hỗ trợ IndexedDB');
    return;
  };
  var map;
  var request = await indexedDB.open(db.name, db.version);
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
      map = db.engine.createObjectStore('donvithicong', { keyPath: "madvtc" });
      //map.createIndex("madot0", "madot0", { unique: false });
    };
    console.log('upgrade db');
  };
};

export { db, loadDb };