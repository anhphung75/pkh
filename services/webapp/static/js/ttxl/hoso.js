import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";
const lbang = {
  hoso: ["mahoso", "mahoso0"],
  dot: ["madot", "madot0"],
  khachhang: ["makhachhang", "makhachhang0"],
  donvithicong: ["madvtc", "madvtc0"],
};
var info, oData = {};

var taodb = async (csdl, sohieu, bang) => {
  if (!indexedDB) {
    console.log('Trình duyệt không hỗ trợ IndexedDB');
    return;
  };
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onerror = err => {
      console.log('Error opening db', err.mesasage);
    };
    yc.onsuccess = e => {
      console.log('opening db');
    };
    yc.onupgradeneeded = e => {
      var db = e.target.result;
      if (e.oldVersion < 1) {
        var map = db.createObjectStore(bang.ten, { keyPath: bang.uid });
        map.createIndex(bang.uid0, bang.uid0, { unique: false });
      };
      console.log('upgrade db');
    };
  } catch (err) {
    console.log('Error taodb', err.mesasage);
  };
};

var nap = async (csdl, sohieu, bang) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onerror = err => {
      console.log('Error open nap ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
      self.postMessage(null);
    };
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .get(IDBKeyRange.only(bang.uuid));
      ch.onerror = err => {
        console.log('Error nap getkey ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
        self.postMessage(null);
      };
      ch.onsuccess = e => {
        console.log('Success nap ', bang.uid, '= ', bang.uuid);
        self.postMessage(ch.result);
      };
    };
  } catch (err) {
    console.log('Error prog nap ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
    self.postMessage(null);
  }
};

var xoa = async (csdl, sohieu, bang) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onerror = err => {
      console.log('Error open xoa ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
      self.postMessage(null);
    };
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .delete(IDBKeyRange.only(bang.uuid));
      ch.onerror = err => {
        console.log('Error xoa getkey ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
        self.postMessage(null);
      };
      ch.onsuccess = e => {
        console.log('Success xoa ', bang.uid, '= ', bang.uuid);
        self.postMessage(ch.result);
      };
    };
  } catch (err) {
    console.log('Error prog xoa ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
    self.postMessage(null);
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
