import { defaInt, defaStr, defaObj } from "../utils/bien.js";
import { suaStr } from "../utils/dulieu.js";
import { delay } from "../utils/thoigian.js";
const obang = {
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
        var idx = db.createObjectStore('tttt', { keyPath: 'tttt' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("idhoso", "idhoso", { unique: false });
        idx.createIndex("mahoso", "mahoso", { unique: false });
        idx.createIndex("iddot", "iddot", { unique: false });
        idx.createIndex("madot", "madot", { unique: false });
        idx.createIndex("idkhachhang", "idkhachhang", { unique: false });
        idx.createIndex("makhachhang", "makhachhang", { unique: false });
        idx.createIndex("iddvtc", "iddvtc", { unique: false });
        idx.createIndex("madvtc", "madvtc", { unique: false });
        idx.createIndex("iddshc", "iddshc", { unique: false });
        idx.createIndex("mahctn", "mahctn", { unique: false });

        idx = db.createObjectStore('hoso', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("mahoso", "mahoso", { unique: false });

        idx = db.createObjectStore('khachhang', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("makhachhang", "makhachhang", { unique: false });

        idx = db.createObjectStore('dot', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("madot", "madot", { unique: false });

        idx = db.createObjectStore('donvithicong', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("madvtc", "madvtc", { unique: false });

        idx = db.createObjectStore('hoancong', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("mahctn", "mahctn", { unique: false });

        idx = db.createObjectStore('chiphi', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("machiphi", "machiphi", { unique: false });

        idx = db.createObjectStore('cpxd', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("macpxd", "macpxd", { unique: false });

        idx = db.createObjectStore('cpvl', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("macpvl", "macpvl", { unique: false });

        idx = db.createObjectStore('cpvt', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("macpvt", "macpvt", { unique: false });

        idx = db.createObjectStore('cpql', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("macpql", "macpql", { unique: false });

        idx = db.createObjectStore('khuvuc', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("maq", "maq", { unique: false });
        idx.createIndex("maqp", "maqp", { unique: false });

        idx = db.createObjectStore('baogia', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("mabaogia", "mabaogia", { unique: false });

        idx = db.createObjectStore('bgvl', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("mabaogia", "mabaogia", { unique: false });

        idx = db.createObjectStore('bgnc', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("mabaogia", "mabaogia", { unique: false });

        idx = db.createObjectStore('bgmtc', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("mabaogia", "mabaogia", { unique: false });

        idx = db.createObjectStore('nhanvien', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("manhanvien", "manhanvien", { unique: false });

        idx = db.createObjectStore('scan', { keyPath: 'idutc' });
        idx.createIndex("lastupdated", "lastupdated", { unique: false });
        idx.createIndex("mascan", "mascan", { unique: false });
      }
    };
  } catch (err) { };
};

var xoa = async (csdl, bang) => {
  try {
    var ma = defaStr(bang.xoa);
    if (ma.length < 1) {
      return false;
    }
    bang = defaStr(bang.ten);
    if (!obang[bang]) {
      return false;
    }
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readwrite')
        .objectStore(bang)
        .delete(IDBKeyRange.only(ma));
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
    var rr = defaObj(bang.luu);
    for (var k in rr) {
      var s = defaStr(rr[k]).trim();
      rr[k] = suaStr(s);
    }
    if (JSON.stringify(rr) === '{}') {
      return false;
    }
    bang = defaStr(bang.ten);
    if (!obang[bang]) {
      return false;
    }
    var uid = obang[bang].uid, uid0 = obang[bang].uid0;
    var ma = defaStr(rr[uid]);
    if (ma.length < 1) {
      ma = (new Date().getFullYear()) + csdl.ten + Date.now();
      rr[uid] = ma;
      rr[uid0] = ma;
      delay(1);
    }
    // load data
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readwrite')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(ma));
      ch.onsuccess = e => {
        console.log('curso thanh cong =', bang);
        var cursor = e.target.result;
        if (cursor) {
          var rs = cursor.value;
          rs['lastupdate'] = defaInt(rs['lastupdate']);
          rr['lastupdate'] = defaInt(rr['lastupdate']);
          if (rs['lastupdate'] > rr['lastupdate']) {
            console.log('data save too old');
            return false;
          }
          const key0test = { thongbao: 0, ghichu: 0, lastupdate: 0 };
          for (k in rr) {
            if (!rs[k]) {
              rs[k] = rr[k];
            } else if (key0test[k]) {
              rs[k] = rr[k];
            } else {
              // du lieu thay doi phai co
              var dl = defaStr(rr[k]);
              if (dl.length > 0) {
                rs[k] = rr[k];
              }
            }
          }
          rs['lastupdate'] = Date.now();
          var cs = cursor.update(rs);
          cs.onsuccess = () => {
            console.log('Save fin');
            return true;
          };
          cursor.continue();
        } else {
          ///new data
          console.log('data moi =', bang);
          rr['lastupdate'] = Date.now();
          var yc1 = indexedDB.open(csdl.ten, csdl.sohieu);
          yc1.onsuccess = e => {
            var ch1 = e.target.result
              .transaction(bang, 'readwrite')
              .objectStore(bang)
              .put(rr);
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

var luun = async (csdl, bang) => {
  const oluunhom = {
    luun: 0, luunhom: 0, themnhom: 0, moinhom: 0, nhommoi: 0, suanhom: 0,
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

var cap1 = async (csdl, dl1) => {
  try {
    for (var k in dl1) {
      await luun(csdl, { ten: k, luu: dl1[k] });
    }
    return true;
  } catch (err) {
    return false;
  }
};

var capn = async (csdl, dln) => {
  try {
    for (var k in dln) {
      await luun(csdl, { ten: k, luun: dln[k] });
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

export { taodb, xoa, luu, luun, cap1, capn };
export { obang, lastuid, firstuid };