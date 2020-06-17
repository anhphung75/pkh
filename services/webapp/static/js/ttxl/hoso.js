import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";
const bang = 'hoso';
const uid = 'mahoso';
const uid0 = uid + 0;
var info, oData = {};

var taodb = async (csdl, sohieu) => {
  var db;
  if (!indexedDB) {
    console.log('Trình duyệt không hỗ trợ IndexedDB');
    return;
  };
  var yc = await indexedDB.open(csdl, sohieu);
  yc.onerror = err => {
    console.log('Error opening db', err);
  };
  yc.onsuccess = e => {
    //db = e.target.result;
    db = yc.result;
    console.log('opening db');
  };
  yc.onupgradeneeded = e => {
    db = e.target.result;
    if (e.oldVersion < 1) {
      var map = db.createObjectStore(bang, { keyPath: uid });
      map.createIndex(uid0, uid0, { unique: false });
    };
    console.log('upgrade db');
  };
};

var nap = async (csdl, sohieu, uuid) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onerror = err => {
      console.log('Error opening db on nap ', uid, '=', uuid, ': ', err);
      oData = {};
      self.postMessage(oData);
    };
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .get(IDBKeyRange.only(uuid));
      ch.onerror = err => {
        console.log('Error yc on nap: ', err);
        oData = {};
        self.postMessage(oData);
      };
      ch.onsuccess = e => {
        console.log('nap success hoso oData = ', oData);
        oData = ch.result;
        if (oData == null) {
          oData = {};
        }
        self.postMessage(oData);
        return oData;
      };
    };
  } catch (err) {
    console.log('Error catch on nap: ', err);
    oData = {};
    postMessage(oData);
  }
};

var xoa = async (csdl, sohieu, uuid) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onerror = err => {
      info = 'xoa ' + uuid + ' yc err: ' + err.mesasage;
      self.postMessage({ info: info });
    };
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readwrite')
        .objectStore(bang)
        .delete(IDBKeyRange.only(uuid));
      ch.onerror = err => {
        info = 'xoa ' + uuid + ' ch err: ' + err.mesasage;
        self.postMessage({ info: info });
      };
      ch.onsuccess = e => {
        info = 'ok xoa on ' + uuid;
        self.postMessage({ info: info });
      };
    };
  } catch (err) {
    info = 'xoa ' + uuid + ' catch err: ' + err.mesasage;
    self.postMessage({ info: info });
  }
};

var luu = async (csdl, sohieu, rec) => {
  var sgoc = JSON.stringify(rec) || '{}';
  if (sgoc === '{}') {
    return;
  }
  if ('status' in rec) {
    if (rec.status.toLowerCase().startsWith("fin")) {
      return;
    }
  }
  var utcid = Date.now().toString();
  try {
    rec[uid] = rec[uid] != null ? rec[uid].toString() : '';
    if (rec[uid].toString().length < 1) {
      rec[uid] = utcid;
    }
    rec.isedit = rec.isedit || false;
    rec[uid0] = rec[uid0] != null ? rec[uid0].toString() : '';
    if (rec[uid0].toString().length < 1) {
      rec[uid0] = utcid;
    }
    rec['lastupdate'] = Date.now();
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onerror = err => {
      console.log('Error opening db', err);
    };
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readwrite')
        .objectStore(bang)
        .put(rec);
      ch.onerror = err => {
        info = 'save2db ' + rec[uid] + ' err: ' + err.mesasage;
        self.postMessage({ info: info });
      };
      ch.onsuccess = e => {
        info = 'ok save2db on ' + rec[uid];
        self.postMessage({ info: info });
        delay(1);
      };
    };
  } catch (err) {
    info = 'save ' + rec[uid] + ' err: ' + err.mesasage;
    self.postMessage({ info: info });
  }
};

// main worker
self.onerror = (err) => {
  self.postMessage("err sw on hoso" + err.mesasage)
};
self.onmessage = (e) => {
  //dprog = {
  //  save: {
  //    csdl: '', sohieu: 1,
  //    ttdl: [{ mahoso: '', ngaylendot: '' }] hoac mahoso='', dl={ mahoso: '', ngaylendot: '' }
  //  }
  //};
  const dprog = any2obj(e.data);
  console.log("worker say = ", e.data);
  var k, dl, rec, id;
  for (k in dprog) {
    dl = dprog[k];
    const csdl = dl.csdl || 'Cntđ';
    const sohieu = dl.sohieu || 1;
    taodb(csdl, sohieu);
    if (uid in dl) {
      const uuid = dl[uid] || '';
      const oxoa = { xoa: 0, del: 0, delete: 0 };
      if (k in oxoa) {
        console.log("worker say prog= 'xoa' uuid=", uuid);
        xoa(csdl, sohieu, uuid);
      } else {
        console.log("worker say prog= 'nap' uuid=", uuid);
        nap(csdl, sohieu, uuid);
      }
    } else {
      if ('dl' in dl) {
        rec = dl.dl || {};
        luu(csdl, sohieu, rec);
      }
      if ('ttdl' in dl) {
        for (id in dl.ttdl) {
          rec = dl.ttdl[id] || {};
          console.log("worker say prog= 'luu' ttdl[", id, "]=", dl);
          luu(csdl, sohieu, rec);
        }
      }
    }
  }
  self.close();
};
