//khai bao bien global
const db = {
  name: 'Scan',
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

var loadDbi = async () => {
  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
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
      map = db.engine.createObjectStore('dot', { keyPath: "madot" });
      //map.createIndex("madot0", "madot0", { unique: false });
    };
    console.log('upgrade db');
  };
};


export { db as dbi, loadDbi };