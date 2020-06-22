import { any2obj, suaStr } from "../utils/web.js";
import { delay } from "../utils/thoigian.js";
const obang = {
  tttt: { uid: "matttt", uid0: "matttt0" },
  hoso: { uid: "mahoso", uid0: "mahoso0" },
  dot: { uid: "madot", uid0: "madot0" },
  khachhang: { uid: "makhachhang", uid0: "makhachhang0" },
  donvithicong: { uid: "madvtc", uid0: "madvtc0" },
};

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
        //idx.createIndex("mahoso0", "mahoso0", { unique: false });
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
  try {
    bang.ten = bang.ten != null ? bang.ten.toString() : '';
    if (!(bang.ten in obang)) {
      return null;
    }
    bang.nap = bang.nap != null ? bang.nap.toString() : '';
    if (bang.nap.length < 1) {
      return null;
    }
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readonly')
        .objectStore(bang.ten)
        .get(IDBKeyRange.only(bang.nap));
      ch.onsuccess = () => {
        var kq = ch.result || null;
        console.log('test kq nap=', kq);
        return kq;
      };
    };
  } catch (err) {
    return null;
  }
};

var xoa = async (csdl, bang) => {
  try {
    bang.ten = bang.ten != null ? bang.ten.toString() : '';
    if (!(bang.ten in obang)) {
      return false;
    }
    bang.xoa = bang.xoa != null ? bang.xoa.toString() : '';
    if (bang.nap.length < 1) {
      return false;
    }
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .delete(IDBKeyRange.only(bang.xoa));
      ch.onsuccess = e => {
        return true;
      };
    };
  } catch (err) {
    return false;
  }
};

var luu = async (csdl, bang) => {
  try {
    bang.ten = bang.ten != null ? bang.ten.toString() : '';
    if (bang.ten in obang) {
      var k = bang.ten, uid = obang[k].uid, uid0 = obang[k].uid0;
    } else {
      return false;
    }
    var rec = bang.luu != null ? JSON.stringify(bang.luu) : '{}';
    if (rec === '{}') {
      return false;
    }
    var utcid = Date.now().toString();
    var recmoi = { ...bang['luu'] };
    var uuid = recmoi[uid] != null ? recmoi[uid].toString() : '';
    if (uuid.length < 1) {
      uuid = utcid;
      recmoi[uid] = uuid;
      recmoi[uid0] = uuid;
    }
    recmoi = any2obj(suaStr(rec));
    console.log('bang luu, bang = ', bang, ' uuid=', uuid);
    console.log('bang luu, recmoi = ', recmoi);
    // load data cu
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang.ten, 'readwrite')
        .objectStore(bang.ten)
        .openCursor(IDBKeyRange.only(uuid));
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          rec = cursor.value;
          rec[uid] = recmoi[uid];
          const key0test = { thongbao: 0, ghichu: 0, lastupdate: 0 }
          for (k in recmoi) {
            if (!(k in rec)) {
              rec[k] = recmoi[k];
            } else if (k in key0test) {
              rec[k] = recmoi[k];
            } else {
              // du lieu thay doi phai co
              var dl = recmoi[k] != null ? recmoi[k].toString() : '';
              if (dl.length > 0) {
                rec[k] = recmoi[k];
              }
            }
          }
          rec['lastupdate'] = Date.now();
          var cs = cursor.update(rec);
          cs.onsuccess = () => {
            console.log('Save fin');
          };
          delay(1);
          console.log('cursor save delay 1');
          cursor.continue();
          console.log('cursor save tiep');
        }
        ///new data
        console.log('cursor chua co');
        var yc1 = indexedDB.open(csdl.ten, csdl.sohieu);
        yc1.onsuccess = e => {
          var ch1 = e.target.result
            .transaction(bang.ten, 'readwrite')
            .objectStore(bang.ten)
            .put(recmoi);
        };
      };
    };
  } catch (err) {
    console.log('prog save err=', err.message);
    return false;
  }
};

var luunhom = async (csdl, bang) => {
  const oluunhom = {
    luunhom: 0, themnhom: 0, moinhom: 0, nhommoi: 0, suanhom: 0,
    savegroup: 0, addgroup: 0, newgroup: 0
  };
  try {
    for (var k in bang) {
      if (k in oluunhom) {
        var dl = bang[k];
        for (var id in dl) {
          await luu(csdl, { ten: bang['ten'], luu: dl[id] });
        }
      }
    }
    return true;
  } catch (err) {
    return false;
  }
};

var capnhat = async (csdl, dulieu) => {
  try {
    for (var k in dulieu) {
      await luunhom(csdl, { ten: k, luunhom: dulieu[k] });
    }
    return true;
  } catch (err) {
    return false;
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

export { taodb, nap, xoa, luu, luunhom, capnhat };
export { obang, lastuid, firstuid };