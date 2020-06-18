import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";
var ttdl;
var info;

var taodb = async (csdl, bang) => {
  if (!indexedDB) {
    console.log('Trình duyệt không hỗ trợ IndexedDB');
    return;
  };
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
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
  };
};

var gom = async (csdl, bang) => {
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .openCursor();
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          const gomca = { all: 0, getall: 0, tatca: 0, toanbo: 0, tat: 0 };
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
            ttdl.postMessage(oMap);
          } else {
            if (oMap[bang.uid].toLowerCase().startsWith(namlv)) {
              console.log('Success gom cursor oMap= ', oMap);
              ttdl.postMessage(oMap);
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log('Error prog gom ', bang.ten, ' nam ', bang.namlv, ': ', err.mesasage);
    ttdl.postMessage(null);
  }
};

var nap = async (csdl, bang) => {
  try {
    var uuid = bang.nap != null ? bang.nap.toString() : '';
    ttdl.postMessage({ "test uuid": uuid });
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .get(IDBKeyRange.only(uuid));
      ch.onsuccess = e => {
        console.log('Success nap ', bang.uid, '= ', uuid);
        ttdl.postMessage(ch.result);
      };
    };
  } catch (err) {
    console.log('Error prog nap ', bang.uid, '= ', uuid, ': ', err.mesasage);
    ttdl.postMessage(null);
  }
};

var xoa = async (csdl, bang) => {
  try {
    var uuid = bang.xoa != null ? bang.xoa.toString() : '';
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .delete(IDBKeyRange.only(uuid));
      ch.onsuccess = e => {
        console.log('Success xoa ', bang.uid, '= ', uuid);
        ttdl.postMessage(ch.result);
      };
    };
  } catch (err) {
    console.log('Error prog xoa ', bang.uid, '= ', uuid, ': ', err.mesasage);
    ttdl.postMessage(null);
  }
};

var luu = async (csdl, bang) => {
  try {
    var rec = JSON.stringify(bang.luu) || '{}';
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
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .put(rec);
      ch.onsuccess = e => {
        info = 'Success luu ' + bang.ten + 'rec= ' + rec;
        ttdl.postMessage({ info: info });
        delay(1);
      };
    };
  } catch (err) {
    info = 'Error prog luu ' + bang.ten + ': ' + err.mesasage;
    ttdl.postMessage({ info: info });
  }
};

var lastUid = async (csdl, bang) => {
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
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
            ttdl.postMessage(cursor.key);
            yc.close();
            //return;
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              console.log('Success lastUid nam= ', namlv, ' bang= ', bang.ten, ': ', cursor.key);
              ttdl.postMessage(cursor.key);
              yc.close();
              //return;
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log('Error prog lastUid nam= ', namlv, ' bang= ', bang.ten, ': ', err.mesasage);
    ttdl.postMessage(null);

  }
};

var firstUid = async (csdl, bang) => {
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
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
            ttdl.postMessage(cursor.key);
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              console.log('Success firstUid nam= ', namlv, ' bang= ', bang.ten, ': ', cursor.key);
              ttdl.postMessage(cursor.key);
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log('Error prog lastUid nam= ', namlv, ' bang= ', bang.ten, ': ', err.mesasage);
    ttdl.postMessage(null);
  }
};

// main worker
self.onconnect = (e) => {
  console.log('ttdl connect');
  ttdl = e.ports[0];

  ttdl.onerror = (err) => {
    ttdl.postMessage("Error ttdl: " + err.mesasage);
  };
  ttdl.onmessage = (e) => {
    const lbang = {
      map: ["mamap", "mamap0"],
      hoso: ["mahoso", "mahoso0"],
      dot: ["madot", "madot0"],
      khachhang: ["makhachhang", "makhachhang0"],
      donvithicong: ["madvtc", "madvtc0"],
    };
    //dprog = {
    //  csdl: {ten:"", sohieu:1}
    //  bang: {ten:'hoso',gom:2020,xoa=uuid, sua={ mahoso: '', ngaylendot: '' } ,
    //         suanhom: [{ mahoso: '', ngaylendot: '' }],
    //  }
    //};
    console.log("ttdl say = ", e.data);
    const dprog = any2obj(e.data);
    var csdl = dprog.csdl;
    var bang = dprog.bang;
    var k, dl, id = {};
    //var bang = { ten: '', uid: '', uid0: '', uuid: '', rec: {} };
    if (bang.ten.toLowerCase() in lbang) {
      bang.uid = lbang[bang.ten][0];
      bang.uid0 = lbang[bang.ten][1];
    }
    taodb(csdl, bang);
    const oxoa = { xoa: 0, del: 0, delete: 0 };
    const onap = { nap: 0, load: 0, get: 0 };
    const oluu = { luu: 0, them: 0, moi: 0, sua: 0, save: 0, add: 0, new: 0 };
    const ogom = { gom: 0, getall: 0 };
    const oluunhom = {
      luunhom: 0, themnhom: 0, moinhom: 0, nhommoi: 0, suanhom: 0,
      savegroup: 0, addgroup: 0, newgroup: 0
    };
    for (k in bang) {
      if (k in oxoa) {
        bang['xoa'] = bang[k];
        delete bang[k];
        xoa(csdl, bang);
      };
      if (k in onap) {
        bang.nap = bang[k];
        delete bang[k];
        nap(csdl, bang);
      };
      if (k in oluu) {
        bang['luu'] = bang[k];
        delete bang[k];
        luu(csdl, bang);
      }
      if (k in oluunhom) {
        dl = JSON.parse(JSON.stringify(bang[k]));
        delete bang[k];
        for (id in dl) {
          bang['luu'] = dl[id];
          luu(csdl, bang);
        }
      }
      if (k in ogom) {
        bang['namlv'] = bang[k];
        delete bang[k];
        gom(csdl, bang);
      }
      if ('lastUid' === k || 'lastuid' === k) {
        bang.namlv = bang[k];
        lastUid(csdl, bang);
      }
      if ('firstUid' === k || 'firstuid' === k) {
        bang.namlv = bang[k];
        firtsUid(csdl, bang);
      }
    }
  }
};