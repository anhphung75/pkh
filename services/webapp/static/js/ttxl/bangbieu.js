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
        self.close();
      };
    };
  } catch (err) {
    info = 'Error prog luu ' + bang.ten + ': ' + err.mesasage;
    self.postMessage({ info: info });
    self.close();
  }
};

// main worker
self.onerror = (err) => {
  self.postMessage("Error sw bangbieu: " + err.mesasage)
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
  var k, dl, rec, id, bang = {};
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
      console.log("worker say prog= 'gom' namlv=", dl.gom);

    } else {
      self.close();
    }
  }
};
