import { any2obj, suaStr } from "../utils/web.js";
import { delay } from "../utils/thoigian.js";
const lbang = {
  tttt: 0,
  hoso: 0,
  dot: 0,
  khachhang: 0,
  donvithicong: 0,
};
var o1Data = {};

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

var nap = async (csdl, bang) => {
  var tam = { ...bang };
  bang = { ten: tam.ten, kq: null };
  bang.nap = tam.nap != null ? tam.nap.toString() : '';
  if (bang.nap.length < 1) {
    o1Data[bang.ten] = { kq: null, status: 'ok' };
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
        o1Data[bang.ten] = { kq: ch['result'], status: 'ok' };
        return;
      };
    };
  } catch (err) {
    o1Data[bang.ten] = { kq: null, status: 'err' };
  }
};

var xoa = async (csdl, bang) => {
  var tam = { ...bang };
  bang = { ten: tam.ten, kq: null };
  bang.xoa = tam.xoa != null ? tam.xoa.toString() : '';
  if (bang.xoa.length < 1) {
    o1Data[bang.ten] = { xoa: bang['xoa'], status: 'pass' };
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
        o1Data[bang.ten] = { xoa: bang['xoa'], status: 'ok' };
        return
      };
    };
  } catch (err) {
    o1Data[bang.ten] = { xoa: bang['xoa'], status: 'err' };
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
      o1Data[bang.ten] = { status: 'save pass null' };
      return;
    } else {
      rec = any2obj(suaStr(rec));
    }
    if (('status' in rec) && (rec.status.toLowerCase().startsWith("fin"))) {
      o1Data[bang.ten] = { status: rec['status'] };
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
        o1Data[bang.ten] = { status: 'ok' };
        delay(1);
        return;
      };
    };
  } catch (err) {
    o1Data[bang.ten] = { status: 'save err' };
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
            o1Data[bang.ten] = { lastuid: namlv, kq: cursor['key'], status: 'ok' };
            return;
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              o1Data[bang.ten] = { lastuid: namlv, kq: cursor['key'], status: 'ok' };
              return;
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    o1Data[bang.ten] = { lastuid: namlv, kq: null, status: 'err' };
  }
};

var firstuid = async (csdl, bang) => {
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
            o1Data[bang.ten] = { firstuid: namlv, kq: cursor['key'], status: 'ok' };
            return;
          } else {
            if (cursor.key.toLowerCase().startsWith(namlv)) {
              o1Data[bang.ten] = { firstuid: namlv, kq: cursor['key'], status: 'ok' };
              return;
            }
          }
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    o1Data[bang.ten] = { firstuid: namlv, kq: null, status: 'err' };
  }
};

export { taodb, luu, xoa, nap };
export { lbang, lastuid, firstuid };