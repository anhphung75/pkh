import { db, loadDb } from "../clientdb/db.js";
import { delay } from "../utils/thoigian.js"
import { suaStr } from "../utils/web.js"

var oData = {
  hoso: {},
  khachhang: {},
  dot: {},
  donvithicong: {}
};

// init database
loadDb();

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
    db.close();
    self.terminate();
  };
};