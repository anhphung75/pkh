import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";
const lsave = ['save', 'sua', 'savelist', 'savedict', 'capnhat', 'update'];
const lprog = ['load', 'delete', 'xem', 'xoa'];
const bang = 'hoso';

self.onerror = (err) => {
  self.postMessage("err sw on hoso" + err.mesasage)
};

self.onmessage = (e) => {
  const dprog = any2obj(e.data);
  console.log("worker say = ", e.data);
  var id, prog, info, oData = {};
  //define function
  var load = async (uuid) => {
    try {
      var request = await indexedDB.open(dbname, dbversion);
      request.onsuccess = e => {
        var store = e.target.result
          .transaction(bang, 'readonly')
          .objectStore(bang)
          .get(IDBKeyRange.only(uuid));
        store.onerror = err => {
          console.log('Error load: ', err);
          oData = {};
          self.postMessage(oData);
        };
        store.onsuccess = e => {
          oData = e.target.result;
          //oData = store.result;
          console.log('hoso oData = ', oData);
          self.postMessage(oData);
        };
      }
    } catch (err) {
      oData = {};
      self.postMessage(oData);
    }
  };
  var xoa = async (uuid) => {
    try {
      var request = await indexedDB.open(dbname, dbversion);
      request.onsuccess = e => {
        var store = e.target.result
          .transaction(bang, 'readwrite')
          .objectStore(bang)
          .delete(IDBKeyRange.only(uuid));
        store.onerror = err => {
          info = 'del ' + uuid + ' err: ' + err.mesasage;
          self.postMessage({ info: info });
        };
        store.onsuccess = e => {
          info = 'ok del on ' + uuid;
          self.postMessage({ info: info });
        };
      }
    } catch (err) {
      info = err.mesasage;
      self.postMessage({ info: info });
    }
  };
  var luu = async (rec) => {
    var k, sgoc, smoi, rmoi, uuid, db;
    sgoc = JSON.stringify(rec) || '{}';
    if (sgoc === '{}') {
      return;
    }
    var utcid = Date.now();
    try {
      rec.mahoso0 = rec.mahoso0 || '';
      if (rec.mahoso0.length < 1) {
        rec.mahoso0 = utcid;
      }
      rec.isedit = rec.isedit || false;
      rec.mahoso = rec.mahoso || '';
      if (rec.mahoso.length < 1) {
        rec.mahoso = utcid;
        uuid = rec.mahoso;
      } else {
        uuid = rec.mahoso;
        Promise.all([load(uuid)])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(oData);
        rmoi = JSON.parse(sgoc);
        for (k in rec) {
          rmoi[k] = rec[k];
        }
        smoi = suaStr(JSON.stringify(rmoi));
        if (sgoc === smoi) {
          return;
        } else {
          rec = JSON.parse(smoi);
        }
        delay(1);
      }
      rec['lastupdate'] = Date.now();
      var request = await indexedDB.open(dbname, dbversion);
      request.onsuccess = e => {
        var store = e.target.result
          .transaction(bang, 'readwrite')
          .objectStore(bang)
          .put(rec);
        store.onerror = err => {
          info = 'save ' + rec.mahoso + ' err: ' + err.mesasage;
          self.postMessage({ info: info });
        };
        store.onsuccess = e => {
          info = 'ok save on ' + rec.mahoso;
          self.postMessage({ info: info });
        };
      };
      request.onupgradeneeded = e => {
        db = e.target.result;
        if (e.oldVersion < 1) {
          var map = db.createObjectStore('hoso', { keyPath: "mahoso" });
          map.createIndex("mahoso0", "mahoso0", { unique: false });
          map.onsuccess = e => {
            info = 'ok creat hoso';
            self.postMessage({ info: info });
          };
        }
        //re-save
        store = db
          .transaction(bang, 'readwrite')
          .objectStore(bang)
          .put(rec);
        store.onerror = err => {
          info = 'save ' + uuid + ' err: ' + err.mesasage;
          self.postMessage({ info: info });
        };
        store.onsuccess = e => {
          info = 'ok save on ' + uuid;
          self.postMessage({ info: info });
        };
      };
    } catch (err) {
      info = 'save ' + uuid + ' err: ' + err.mesasage;
      self.postMessage({ info: info });
    }
  };
  //main
  for (id in lprog) {
    prog = lprog[id];
    if (prog in dprog) {
      const dbname = dprog[prog].dbname || 'Cntđ';
      const dbversion = dprog[prog].dbname || 1;
      const uuid = dprog[prog].mahoso || '';
      var rec;
      if (uuid.length > 0) {
        if (prog in ['load', 'xem']) {
          load(uuid);
        }
        if (prog in ['delete', 'xoa']) {
          xoa(uuid);
        }
      }
    }
  }
  for (id in lsave) {
    prog = lsave[id];
    console.log("worker say lsave prog= ", prog);
    if (prog in dprog) {
      const dbname = dprog[prog].dbname || 'Cntđ';
      const dbversion = dprog[prog].dbname || 1;
      console.log("worker say in lsave prog dbname= ", dbname, 'prog ', prog);
      var k, rec;
      //dprog = {
      //  save: {
      //    dbname: '', dbversion: 1, data: [{ mahoso: '', ngaylendot: '' }]
      //  }
      //};
      if (prog in ['save', 'sua']) {
        rec = dprog[prog].data || {};
        luu(rec);
      } else {
        for (k in dprog[prog].data) {
          rec = dprog[prog].data[k];
          console.log("worker say savelist.rec= ", rec);
          luu(rec);
        };
      }
    }
  };

};
