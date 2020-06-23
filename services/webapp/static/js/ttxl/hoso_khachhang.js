import { taodb, capnhat } from "../ttdl/db.js";
import { defaInt, defaStr, defaObj } from "../utils/bien.js";
import { suaStr } from "../utils/web.js";
import { delay } from "../utils/thoigian.js";
var ttxl;

var loadHsKh = async (csdl, otim) => {
  var o1Data = {};
  var nap = async (bang, uuid) => {
    try {
      var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
      yc.onsuccess = e => {
        var ch = e.target.result
          .transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor(IDBKeyRange.only(uuid));
        ch.onsuccess = e => {
          var cursor = e.target.result;
          if (cursor) {
            o1Data[bang] = defaObj(cursor.value);
          }
          return true;
        };
      };
    } catch (err) {
      return null;
    }
  };
  var isData = () => {
    var bang, k, v, s, ss, ltam = [];
    var keybo = {
      status: 0,
      lastupdate: 0,
      scan: 0,
      blob: 0,
      isedit: 0,
      isselect: 0,
    };
    try {
      for (bang in o1Data) {
        for (k in bang) {
          s = defaStr(bang[k]);
          if ((k in keybo) || (s.length < 1)) {
            delete bang[k];
          }
        }
      }
      for (bang in o1Data) {
        v = Object.values(o1Data[bang]);
        ltam = [...ltam, ...v];
      }
      if (ltam.length < 1) { return false; };
      ss = suaStr(defaStr(ltam).toLowerCase());
      for (k in otim) {
        s = defaStr(k).toLowerCase();
        if (ss.indexOf(s) === -1) {
          return false;
        }
      }
      return true;
    } catch (err) { return false; }
  };
  try {
    var bang = 'tttt';
    var stt = 0;
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          var mahoso = defaStr(cursor.value.mahoso);
          var makhachhang = defaStr(cursor.value.makhachhang);
          var madot = defaStr(cursor.value.madot);
          var madvtc = defaStr(cursor.value.madvtc);
          Promise.all([
            nap('hoso', mahoso),
            nap('khachhang', makhachhang),
            nap('dot', madot),
            nap('donvithicong', madvtc),
          ]);
          delay(100);
          otim = defaObj(otim, {});
          if (JSON.stringify(otim) === '{}') {
            console.log('stt=', stt);
            console.log({ kq: { stt: o1Data }, status: 'ok' });
            //ttxl.postMessage({ kq: o1Data, status: 'ok' });
          } else {
            if (isData()) {
              console.log('stt=', stt);
              console.log({ kq: { stt: o1Data }, status: 'ok' });
              //ttxl.postMessage({ kq: o1Data, status: 'ok' });
            }
          };
          //delay(100);
          stt++;
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log({ kq: null, status: 'err' });
    //ttxl.postMessage({ kq: null, status: 'err' });
  }
};

export { loadHsKh };