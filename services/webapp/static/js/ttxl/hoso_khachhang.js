import { defaInt, defaStr, defaObj } from "../utils/bien.js";
import { suaStr } from "../utils/web.js";
import { delay } from "../utils/thoigian.js";
var ttxl;
var info;

var loadHsKh = async (csdl, otim) => {
  var o1data = {};
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
            o1data[bang] = defaObj(cursor.value);
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
      for (bang in o1data) {
        for (k in bang) {
          s = defaStr(bang[k]);
          if ((k in keybo) || (s.length < 1)) {
            delete bang[k];
          }
        }
      }
      for (bang in o1data) {
        v = Object.values(o1data[bang]);
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
    var id = 0;
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          var matttt = defaStr(cursor.value.matttt);
          o1data[bang] = cursor.value;
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
          delay(500);
          otim = defaObj(otim, {});
          if (JSON.stringify(otim) === '{}') {
            console.log('id=', id);
            console.log({ id: id, kq: o1data, status: 'ok' });
            ttxl.postMessage({ id: id, kq: o1data, status: 'ok', info: 'otim rong' });
            id++;
          } else {
            if (isData()) {
              console.log('id=', id);
              console.log({ id: id, kq: o1data, status: 'ok' });
              ttxl.postMessage({ id: id, kq: o1data, status: 'ok', info: 'otim ko rong ' });
              id++;
            } else {
              info = 'isData false, matttt= ' + matttt;
              ttxl.postMessage({ id: id, kq: o1data, status: 'nook', info: info });
            }
          };
          cursor.continue();
        }
      };
    };
  } catch (err) {
    console.log({ kq: null, status: 'err' });
    //ttxl.postMessage({ kq: null, status: 'err' });
  }
};

// main worker
self.onconnect = (e) => {
  ttxl = e.ports[0];
  ttxl.postMessage('ttxl connect')
  ttxl.start();

  ttxl.onerror = (err) => {
    ttxl.postMessage("Error ttxl: " + err.mesasage)
  };
  ttxl.onmessage = (e) => {
    //dprog = {
    //  csdl: {ten:"", sohieu:1}
    //  bang: {ten:'hoso',gom:2020,xoa=uuid, sua={ mahoso: '', ngaylendot: '' } ,
    //         suanhom: [{ mahoso: '', ngaylendot: '' }],
    //  }
    //};
    var csdl = defaObj(e.data.csdl, null);
    var otim = defaObj(e.data.otim, null);
    if (!csdl) {
      return;
    }
    if (otim) {
      loadHsKh(csdl, otim);
    }
  }
};
