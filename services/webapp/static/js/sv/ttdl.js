import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";

var ttdl;
var ttxl;

var taodb = async (csdl) => {
  if (!indexedDB) {
    return;
  };
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onupgradeneeded = e => {
      var db = e.target.result;
      if (e.oldVersion < 1) {
        var idx = db.createObjectStore('tttt', { keyPath: 'matttt' });
        idx.createIndex("matttt0", "matttt0", { unique: false });
        idx.createIndex("mahoso", "mahoso", { unique: false });
        idx.createIndex("madot", "madot", { unique: false });
        idx.createIndex("makhachhang", "makhachhang", { unique: false });
        idx.createIndex("madvtc", "madvtc", { unique: false });

        idx = db.createObjectStore('hoso', { keyPath: 'mahoso' });
        idx.createIndex("mahoso0", "mahoso0", { unique: false });
        idx = db.createObjectStore('khachhang', { keyPath: 'makhachhang' });
        idx.createIndex("makhachhang0", "makhachhang0", { unique: false });
        idx = db.createObjectStore('dot', { keyPath: 'madot' });
        idx.createIndex("madot0", "madot0", { unique: false });
        idx = db.createObjectStore('donvithicong', { keyPath: 'madvtc' });
        idx.createIndex("madvtc0", "madvtc0", { unique: false });
      }
    };
  } catch (err) { };
};

var gom = async (csdl, bang) => {
  var tam = { ...bang };
  bang = { ten: tam.ten, kq: null };
  bang.gom = tam.gom != null ? tam.gom.toString() : 'all';
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
          var k, lma = {}, o1Data = {};
          for (k in lbang) {
            lma[k.uid] = 0;
            lma[k.uid0] = 0;
          }
          var dl = cursor.value;
          for (k in lma) {
            if (k in dl) {
              o1Data[k] = dl[k];
            }
          }
          if (bang.gom in gomca) {
            bang.kq = o1Data;
            ttdl.postMessage(bang);
          } else {
            if (o1Data[tam.uid].toLowerCase().startsWith(bang.gom)) {
              bang.kq = o1Data;
            }
            ttdl.postMessage(bang);
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    bang.err = err;
    ttdl.postMessage(bang);
  }
};

var nap = async (csdl, bang) => {
  var tam = { ...bang };
  bang = { ten: tam.ten, kq: null };
  bang.nap = tam.nap != null ? tam.nap.toString() : '';
  if (bang.nap.length < 1) {
    ttdl.postMessage(bang);
    return;
  }
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .get(IDBKeyRange.only(bang.nap));
      ch.onsuccess = () => {
        bang.kq = ch.result;
        ttdl.postMessage(bang);
      };
    };
  } catch (err) {
    bang.err = err;
    ttdl.postMessage(bang);
  }
};

var xoa = async (csdl, bang) => {
  var tam = { ...bang };
  bang = { ten: tam.ten, kq: null };
  bang.xoa = tam.xoa != null ? tam.xoa.toString() : '';
  if (bang.xoa.length < 1) {
    ttdl.postMessage(bang);
    return;
  }
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .delete(IDBKeyRange.only(bang.xoa));
      ch.onsuccess = e => {
        bang.kq = 'ok';
        ttdl.postMessage(bang);
      };
    };
  } catch (err) {
    bang.err = err;
    ttdl.postMessage(bang);
  }
};

var luu = async (csdl, bang) => {
  var tam = { ...bang };
  bang = { ten: tam.ten, kq: null, luu: null };
  try {
    var uid = tam.uid;
    var uid0 = tam.uid0;
    var rec = JSON.stringify(tam.luu) || '{}';
    if (rec === '{}') {
      bang.err = '{}';
      ttdl.postMessage(bang);
      return;
    } else {
      rec = any2obj(suaStr(rec));
    }
    if (('status' in rec) && (rec.status.toLowerCase().startsWith("fin"))) {
      bang.err = rec.status;
      ttdl.postMessage(bang);
      return;
    }
    var utcid = Date.now().toString();
    rec[uid] = rec[uid] != null ? rec[uid].toString() : '';
    if (rec[uid].length < 1) {
      rec[uid] = utcid;
    }
    rec[uid0] = rec[uid0] != null ? rec[uid0].toString() : '';
    if (rec[uid0].length < 1) {
      rec[uid0] = utcid;
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
        bang.kq = 'ok';
        ttdl.postMessage(bang);
        delay(1);
      };
    };
  } catch (err) {
    bang.err = err;
    ttdl.postMessage(bang);
  }
};

var lastuid = async (csdl, bang) => {
  var tam = { ...bang };
  var namlv = tam.namlv != null ? tam.namlv.toString() : 'all';
  bang = { ten: tam.ten, kq: null, lastuid: namlv };
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
          if (namlv in gomca) {
            bang.kq = cursor.key;
            ttdl.postMessage(bang);
            return;
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              bang.kq = cursor.key;
              ttdl.postMessage(bang);
              return;
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    bang.err = err.mesasage;
    ttdl.postMessage(bang);
  }
};

var firsuid = async (csdl, bang) => {
  var tam = { ...bang };
  var namlv = tam.namlv != null ? tam.namlv.toString() : 'all';
  bang = { ten: tam.ten, kq: null, firstuid: namlv };
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
          if (namlv in gomca) {
            bang.kq = cursor.key;
            ttdl.postMessage(bang);
            return;
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              bang.kq = cursor.key;
              ttdl.postMessage(bang);
              return;
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    bang.err = err.mesasage;
    ttdl.postMessage(bang);
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
      tttt: { uid: "matttt", uid0: "matttt0" },
      hoso: { uid: "mahoso", uid0: "mahoso0" },
      dot: { uid: "madot", uid0: "madot0" },
      khachhang: { uid: "makhachhang", uid0: "makhachhang0" },
      donvithicong: { uid: "madvtc", uid0: "madvtc0" },
    };
    //dprog = {
    //  csdl: {ten:"", sohieu:1}
    //  bang: {ten:'hoso',gom:2020,xoa=uuid, sua={ mahoso: '', ngaylendot: '' } ,
    //         suanhom: [{ mahoso: '', ngaylendot: '' }],
    //  }
    //};
    console.log("ttdl say = ", e.data);
    const dprog = any2obj(e.data);
    var csdl = { ...dprog.csdl } || null;
    var bang = { ...dprog.bang } || null;
    if (csdl == null || bang == null) {
      return;
    }
    ttxl = { ...dprog.ttxl } || null;
    var k, dl, id = {};
    //var bang = { ten: '', uid: '', uid0: '', uuid: '', rec: {} };
    if (bang.ten.toLowerCase() in lbang) {
      bang.uid = lbang[bang.ten].uid;
      bang.uid0 = lbang[bang.ten].uid0;
    }
    taodb(csdl);
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
        xoa(csdl, bang);
      };
      if (k in onap) {
        bang['nap'] = bang[k];
        ttdl.postMessage({ csdlmoi: csdl, bangmoi: bang });
        nap(csdl, bang);
      };
      if (k in oluu) {
        bang['luu'] = bang[k];
        luu(csdl, bang);
      }
      if (k in oluunhom) {
        dl = { ...bang[k] };
        for (id in dl) {
          bang['luu'] = dl[id];
          luu(csdl, bang);
        }
      }
      if (k in ogom) {
        bang['gom'] = bang[k];
        gom(csdl, bang);
      }
      if (k.toLowerCase() === 'lastuid') {
        bang.namlv = bang[k];
        lastuid(csdl, bang);
      }
      if (k.toLowerCase() === 'firstuid') {
        bang.namlv = bang[k];
        firtsuid(csdl, bang);
      }
    }
  }
};