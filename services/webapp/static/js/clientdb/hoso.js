import { db, loadDb } from "./db.js";
import { delay } from "../utils/thoigian.js"
import { isObjEmpty, ld2dd } from "../utils/web.js"

const bang = 'hoso';
var oData;
loadDb();


var load = async (uuid) => {
  var request = await db.engine
    .transaction(bang, 'readonly')
    .objectStore(bang)
    .openCursor(IDBKeyRange.only(uuid));
  request.onerror = e => {
    oData = {};
    console.log('Error loadDot: ', e);
  };
  request.onsuccess = e => {
    var cursor = e.target.result;
    if (cursor) {
      oData = cursor.value;
      cursor.continue();
    };
  };
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

self.onmessage = (e) => {
  switch (e.data) {
    case "gom":
      gom();
      self.postMessage("Obj gom");
      break;
    case "doc":
      doc();
      self.postMessage("Obj doc");
      break;
    case "moi":
      moi();
      self.postMessage("Obj moi");
      break;
    case "sua":
      sua();
      self.postMessage("Obj sua");
      break;
    case "xoa":
      xoa();
      self.postMessage("Obj xoa");
      break;
  }
};