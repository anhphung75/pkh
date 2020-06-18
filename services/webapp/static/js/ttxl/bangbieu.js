import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";

var info;

var taodb = async (csdl, sohieu, bang) => {
  if (!indexedDB) {
    console.log('Trình duyệt không hỗ trợ IndexedDB');
    return;
  };
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onupgradeneeded = e => {
      var db = e.target.result;
      if (e.oldVersion < 1) {
        var map = db.createObjectStore('map', { keyPath: 'mamap' });
        map.createIndex("map0", "map0", { unique: false });
        map.createIndex("mahoso", "mahoso", { unique: false });
        map.createIndex("madot", "madot", { unique: false });
        map.createIndex("makhachhang", "makhachhang", { unique: false });
        map.createIndex("madvtc", "madvtc", { unique: false });

        map = db.createObjectStore(bang.ten, { keyPath: bang.uid });
        map.createIndex(bang.uid0, bang.uid0, { unique: false });
      };
      console.log('upgrade db');
    };
  } catch (err) {
    console.log('Error taodb ', bang.ten, ": ", err.mesasage);
    self.close();
  };
};

var gom = async (csdl, sohieu, bang) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .openCursor();
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          const gomca = { all: 0, tatca: 0, toanbo: 0, tat: 0 };
          var k, oMap = {};
          var lma = {
            mamap: 0, mahoso: 0, madot: 0, makhachhang: 0, madvtc: 0,
            mamap0: 0, mahoso0: 0, madot0: 0, makhachhang0: 0, madvtc0: 0
          };
          var dl = cursor.value;
          for (k in lma) {
            if (k in dl) {
              oMap[k] = dl[k];
            }
          }
          var namlv = bang.namlv != null ? bang.namlv.toString() : 'all';
          if (namlv in gomca) {
            console.log('Success gom cursor oMap= ', oMap);
            self.postMessage(oMap);
          } else {
            if (oMap[bang.uid].toLowerCase().startsWith(namlv)) {
              console.log('Success gom cursor oMap= ', oMap);
              self.postMessage(oMap);
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log('Error prog nap ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
    self.postMessage(null);
    self.close();
  }
};

var nap = async (csdl, sohieu, bang) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .get(IDBKeyRange.only(bang.uuid));
      ch.onsuccess = e => {
        console.log('Success nap ', bang.uid, '= ', bang.uuid);
        self.postMessage(ch.result);
        self.close();
      };
    };
  } catch (err) {
    console.log('Error prog nap ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
    self.postMessage(null);
    self.close();
  }
};

var xoa = async (csdl, sohieu, bang) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .delete(IDBKeyRange.only(bang.uuid));
      ch.onsuccess = e => {
        console.log('Success xoa ', bang.uid, '= ', bang.uuid);
        self.postMessage(ch.result);
        self.close();
      };
    };
  } catch (err) {
    console.log('Error prog xoa ', bang.uid, '= ', bang.uuid, ': ', err.mesasage);
    self.postMessage(null);
    self.close();
  }
};

var luu = async (csdl, sohieu, bang) => {
  try {
    var rec = JSON.stringify(bang.rec) || '{}';
    if (rec === '{}') {
      return;
    }
    rec = JSON.parse(rec);
    if ('status' in rec) {
      if (rec.status.toLowerCase().startsWith("fin")) {
        return;
      }
    }
    var utcid = Date.now().toString();
    rec[bang.uid] = rec[bang.uid] != null ? rec[bang.uid].toString() : '';
    if (rec[bang.uid].toString().length < 1) {
      rec[bang.uid] = utcid;
    }
    rec[bang.uid0] = rec[bang.uid0] != null ? rec[bang.uid0].toString() : '';
    if (rec[bang.uid0].toString().length < 1) {
      rec[bang.uid0] = utcid;
    }
    rec['ghichu'] = rec['ghichu'] || '';
    rec['thongbao'] = rec['thongbao'] || '';
    rec['lastupdate'] = Date.now();
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .put(rec);
      ch.onsuccess = e => {
        info = 'Success luu ' + bang.ten + 'rec= ' + rec;
        self.postMessage({ info: info });
        delay(1);
      };
    };
  } catch (err) {
    info = 'Error prog luu ' + bang.ten + ': ' + err.mesasage;
    self.postMessage({ info: info });
    self.close();
  }
};

var lastUid = async (csdl, sohieu, bang) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .openCursor(null, 'prev');
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          const gomca = { all: 0, tatca: 0, toanbo: 0, tat: 0 };
          var namlv = bang.namlv != null ? bang.namlv.toString() : 'all';
          if (namlv in gomca) {
            console.log('Success lastUid nam= ', namlv, ' bang= ', bang.ten, ': ', cursor.key);
            self.postMessage(cursor.key);
            self.close();
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              console.log('Success lastUid nam= ', namlv, ' bang= ', bang.ten, ': ', cursor.key);
              self.postMessage(cursor.key);
              self.close();
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log('Error prog lastUid nam= ', namlv, ' bang= ', bang.ten, ': ', err.mesasage);
    self.postMessage(null);
    self.close();
  }
};

var firstUid = async (csdl, sohieu, bang) => {
  try {
    var yc = await indexedDB.open(csdl, sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .openCursor();
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          const gomca = { all: 0, tatca: 0, toanbo: 0, tat: 0 };
          var namlv = bang.namlv != null ? bang.namlv.toString() : 'all';
          if (namlv in gomca) {
            console.log('Success firstUid nam= ', namlv, ' bang= ', bang.ten, ': ', cursor.key);
            self.postMessage(cursor.key);
            self.close();
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              console.log('Success firstUid nam= ', namlv, ' bang= ', bang.ten, ': ', cursor.key);
              self.postMessage(cursor.key);
              self.close();
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log('Error prog lastUid nam= ', namlv, ' bang= ', bang.ten, ': ', err.mesasage);
    self.postMessage(null);
    self.close();
  }
};

// main worker
self.onerror = (err) => {
  self.postMessage("Error sw bangbieu: " + err.mesasage);
  self.close();
};
self.onmessage = (e) => {
  const lbang = {
    map: ["mamap", "mamap0"],
    hoso: ["mahoso", "mahoso0"],
    dot: ["madot", "madot0"],
    khachhang: ["makhachhang", "makhachhang0"],
    donvithicong: ["madvtc", "madvtc0"],
  };
  //dprog = {
  //  save: {
  //    csdl: 'cntd', sohieu: 1, bang:'hoso',
  //    gom:'2020' // uuid='2020hs012345' // dl={ mahoso: '', ngaylendot: '' } // ttdl: [{ mahoso: '', ngaylendot: '' }],
  //  }
  //};
  const dprog = any2obj(e.data);
  console.log("Sw bangbieu say = ", e.data);
  var k, dl, id, bang = {};
  for (k in dprog) {
    dl = dprog[k];
    const csdl = dl.csdl || 'Cntđ';
    const sohieu = dl.sohieu || 1;
    //var bang = { ten: '', uid: '', uid0: '', uuid: '', rec: {} };
    if (!(dl.bang.toLowerCase() in lbang)) {
      self.close();
    }
    bang.ten = dl.bang.toLowerCase();
    bang.uid = lbang[bang.ten][0];
    bang.uid0 = lbang[bang.ten][1];
    taodb(csdl, sohieu, bang);
    if ('uuid' in dl) {
      bang.uuid = dl['uuid'] || '';
      const oxoa = { xoa: 0, del: 0, delete: 0 };
      if (k in oxoa) {
        xoa(csdl, sohieu, bang);
      } else {
        nap(csdl, sohieu, bang);
      }
    } else if ('dl' in dl) {
      bang.rec = dl.dl || {};
      luu(csdl, sohieu, bang);
    } else if ('ttdl' in dl) {
      for (id in dl.ttdl) {
        bang.rec = dl.ttdl[id] || {};
        console.log("worker say prog= 'luu' ttdl[", id, "]=", dl);
        luu(csdl, sohieu, bang);
      }
    } else if ('gom' in dl) {
      bang.namlv = dl.gom;
      console.log("worker say prog= 'gom' namlv=", dl.gom);
      gom(csdl, sohieu, bang);
    } else if ('lastUid' in dl || 'lastuid' in dl) {
      bang.namlv = dl.lastUid || dl.lastuid;
      console.log("worker say prog lastUid");
      lastUid(csdl, sohieu, bang);
    } else if ('firstUid' in dl || 'firstuid' in dl) {
      bang.namlv = dl.firstUid || dl.firstuid;
      console.log("worker say prog firstUid");
      firstUid(csdl, sohieu, bang);
    } else {
      self.close();
    }
  }
};
