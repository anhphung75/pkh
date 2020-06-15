//import { db, loadDb } from "./db.js";
import { delay } from "../utils/thoigian.js"
import { suaStr } from "../utils/web.js"


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
// init database
loadDb();

var oData = {
  hoso: {},
  khachhang: {},
  dot: {},
  donvithicong: {}
};


var loadHoso = async (uuid) => {
  var bang = 'hoso';
  var request = await db.engine
    .transaction(bang, 'readonly')
    .objectStore(bang)
    .openCursor(IDBKeyRange.only(uuid));
  request.onerror = e => {
    oData[bang] = {};
    console.log('Error loadDot: ', e);
  };
  request.onsuccess = e => {
    var cursor = e.target.result;
    if (cursor) {
      oData[bang] = cursor.value;
      cursor.continue();
    };
  };
};


var loadKhach = async (uuid) => {
  var bang = 'khachhang';
  var request = await db.engine
    .transaction(bang, 'readonly')
    .objectStore(bang)
    .openCursor(IDBKeyRange.only(uuid));
  request.onerror = e => {
    oData[bang] = {};
    console.log('Error loadDot: ', e);
  };
  request.onsuccess = e => {
    var cursor = e.target.result;
    if (cursor) {
      oData[bang] = cursor.value;
      cursor.continue();
    };
  };
};


var loadDot = async (uuid) => {
  var bang = 'dot';
  var request = await db.engine
    .transaction(bang, 'readonly')
    .objectStore(bang)
    .openCursor(IDBKeyRange.only(uuid));
  request.onerror = e => {
    oData[bang] = {};
    console.log('Error loadDot: ', e);
  };
  request.onsuccess = e => {
    var cursor = e.target.result;
    if (cursor) {
      oData[bang] = cursor.value;
      cursor.continue();
    };
  };
};


var loadDvtc = async (uuid) => {
  var bang = 'donvithicong';
  var request = await db.engine
    .transaction(bang, 'readonly')
    .objectStore(bang)
    .openCursor(IDBKeyRange.only(uuid));
  request.onerror = e => {
    oData[bang] = {};
    console.log('Error loadDot: ', e);
  };
  request.onsuccess = e => {
    var cursor = e.target.result;
    if (cursor) {
      oData[bang] = cursor.value;
      cursor.continue();
    };
  };
};


var isData = (otim) => {
  var rec, k, s;
  var keybo = {
    lastupdate: true,
    scan: true,
    blob: true,
    isedit: true,
    isselect: true
  };
  try {
    var dtim = JSON.parse(JSON.stringify(oData));
    for (rec in dtim) {
      for (k in rec) {
        s = rec[k] || '';
        if ((k in keybo) || (s.length < 1)) {
          delete rec[k];
        }
      }
    }
    var l1 = Object.values(dtim.hoso) || [];
    var l2 = Object.values(dtim.dot) || [];
    var l3 = Object.values(dtim.khachhang) || [];
    var ltam = [...l1, ...l2, ...l3];
    if (ltam.length < 1) { return false; };
    var ss = ltam.toString().toLowerCase();
    ss = suaStr(ss);
    console.log('ssearch=', ss);
    for (k in otim) {
      s = k.toLowerCase();
      if (ss.indexOf(s) === -1) {
        return false;
      }
    }
    return true;
  } catch (err) { return false; }
};







var save = async (recs) => {
  var k, k1, v, rec, sgoc, smoi, rmoi, utcid;
  // xoa  key rong
  for (k in recs) {
    if (isObjEmpty(recs[k])) { delete recs[k] };
  };
  var oRecs = {};
  //ddtam = ld2dd(recs);
  try {
    for (k in recs) {
      utcid = Date.now();
      rec = recs[k];
      rec.mahoso0 = rec.mahoso0 || '';
      if (rec.mahoso0.length < 1) { rec.mahoso0 = utcid; };
      rec.isedit = rec.isedit || false;
      rec.mahoso = rec.mahoso || '';
      if (rec.mahoso.length < 1) {
        rec.mahoso = utcid;
        smoi = suaStr(JSON.stringify(rec));
        oRecs[k] = JSON.parse(smoi);
      } else {
        Promise.all([load(rec.mahoso)])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(oData);
        rmoi = JSON.parse(JSON.stringify(sgoc));
        for (k1 in rec) {
          rmoi[k1] = rec[k1];
        };
        smoi = suaStr(JSON.stringify(rmoi));
        if (sgoc !== smoi) {
          oRecs[k] = JSON.parse(smoi);
        };
      };
      delay(1);
    };
    var store = db.engine
      .transaction(bang, 'readwrite')
      .objectStore(bang);
    for (k in oRecs) {
      v = oRecs[k];
      v['lastupdate'] = Date.now();
      await store.put(v);
    }
  } catch (err) {
    console.log('Error saveMap', err.message);
  };
};

// rest
var gom = () => {

};
var doc = () => {

};
var moi = () => {

};
var sua = () => {

};
var xoa = () => {

};

//main prog
self.onerror = (e) => { console.log("err on worker hoso_khachhang ", e) };
//{load:{...dstim}}
self.onmessage = (e) => {
  if ('load' in e.data) {
    loadDb();
    var otim = e.data['load'];
    var bang = 'map';
    var request = db.engine
      .transaction(bang, 'readonly')
      .objectStore(bang)
      .openCursor();
    request.onerror = e => {
      console.log('Error worker loadOttdl: ', e);
    };
    request.onsuccess = e => {
      var mahoso, makhachhang, madot, madvtc;
      var cursor = e.target.result;
      if (cursor) {
        mahoso = cursor.value.mahoso || '';
        makhachhang = cursor.value.makhachhang || '';
        madot = cursor.value.madot || '';
        madvtc = cursor.value.madvtc || '';
        Promise.all([
          loadHoso(mahoso),
          loadKhach(makhachhang),
          loadDot(madot),
          loadDvtc(madvtc)
        ]).catch(err => { console.log("Error in Promise.all ", err) })
          .then(() => {
            console.log('worker loadOttdl ok on {mahoso: ', this.mahoso, ', makhachhang: ', this.makhachhang, 'madot: ', this.madot, 'madvtc: ', this.madvtc, '}');
          });
        //view test
        //delay(1);
        if (isData(otim)) {
          self.postMessage(oData);
        }
        cursor.continue();
      };
    };
    //request.close();
    //self.terminate();
  };
};