import { defaInt, defaStr, defaObj } from "../utils/bien.js";
import { suaStr } from "../utils/web.js";
import { delay } from "../utils/thoigian.js";
var obang = {
  "tttt": { uid: "matttt", uid0: "matttt0" },
  "hoso": { "uid": "mahoso", "uid0": "mahoso0" },
  "dot": { uid: "madot", uid0: "madot0" },
  "khachhang": { uid: "makhachhang", uid0: "makhachhang0" },
  "donvithicong": { uid: "madvtc", uid0: "madvtc0" },
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
    var recmoi = defaObj(suaStr(defaStr(bang.luu)));
    console.log('recmoi=', recmoi);
    if (JSON.stringify(recmoi) === '{}') {
      return false;
    }
    bang = defaStr(bang.ten);

    if (!obang[bang]) {
      console.log('exit vi bang=', bang);
      //return false;
    }
    var uid = obang[bang.ten].uid, uid0 = obang[bang.ten].uid0;
    var uuid = defaStr(recmoi[uid]);
    console.log('uuid=', uuid, ' uid=', uid, ' uid0=', uid0);
    if (uuid.length < 1) {
      uuid = (new Date().getFullYear()) + csdl.ten + Date.now();
      recmoi[uid] = uuid;
      recmoi[uid0] = uuid;
      delay(1);
    }
    // load data
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readwrite')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(uuid));
      ch.onsuccess = e => {
        console.log('curso thanh cong =', bang);
        var cursor = e.target.result;
        if (cursor) {
          var rec = cursor.value;
          rec['lastupdate'] = defaInt(rec['lastupdate']);
          recmoi['lastupdate'] = defaInt(recmoi['lastupdate']);
          if (rec['lastupdate'] > recmoi['lastupdate']) {
            console.log('data save too old');
            return false;
          }
          const key0test = { thongbao: 0, ghichu: 0, lastupdate: 0 }
          for (var k in recmoi) {
            if (!rec[k]) {
              rec[k] = recmoi[k];
            } else if (key0test[k]) {
              rec[k] = recmoi[k];
            } else {
              // du lieu thay doi phai co
              var dl = defaStr(recmoi[k]);
              if (dl.length > 0) {
                rec[k] = recmoi[k];
              }
            }
          }
          rec['lastupdate'] = Date.now();
          var cs = cursor.update(rec);
          cs.onsuccess = () => {
            console.log('Save fin');
            return true;
          };
          cursor.continue();
        } else {
          ///new data
          console.log('data moi =', bang);
          recmoi['lastupdate'] = Date.now();
          var yc1 = indexedDB.open(csdl.ten, csdl.sohieu);
          yc1.onsuccess = e => {
            var ch1 = e.target.result
              .transaction(bang, 'readwrite')
              .objectStore(bang)
              .put(recmoi);
            ch1.onsuccess = () => {
              console.log('Save new fin');
              return true;
            };
          };
        };
      }
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

export { taodb, xoa, luu, luunhom, capnhat };
export { obang, lastuid, firstuid };