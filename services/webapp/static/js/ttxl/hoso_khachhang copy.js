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
        v = Object.values(bang);
        ss = [...ltam];
        ltam = [...ss, ...v];
      }
      if (ltam.length < 1) { return false; };
      ss = suaStr(defaStr(ltam).toLowerCase());
      for (k in otim) {
        s = k.toLowerCase();
        if (ss.indexOf(s) === -1) {
          return false;
        }
      }
      return true;
    } catch (err) { return false; }
  };
  try {
    var bang = 'tttt',
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
          await Promise.all([
            nap('hoso', mahoso),
            nap('khachhang', makhachhang),
            nap('dot', madot),
            nap('donvithicong', madvtc),
          ]);
          delay(100);
          otim = defaObj(otim, {});
          if (JSON.stringify(otim) === '{}') {
            ttxl.postMessage({ kq: o1Data, status: 'ok' });
          } else {
            if (isData()) {
              ttxl.postMessage({ kq: o1Data, status: 'ok' });
            }
          };
          //delay(100);
          cursor.continue();
        }
      };
    };
  } catch (err) {
    ttxl.postMessage({ kq: null, status: 'err' });
  }
};

// main worker
self.onconnect = (e) => {
  ttxl = e.ports[0];
  ttxl.start();

  ttxl.onerror = (err) => {
    ttxl.postMessage("Error ttxl: " + err.mesasage)
  };
  ttxl.onmessage = async (e) => {
    //dprog = {
    //  csdl: {ten:"", sohieu:1}
    //  bang: {ten:'hoso',gom:2020,xoa=uuid, sua={ mahoso: '', ngaylendot: '' } ,
    //         suanhom: [{ mahoso: '', ngaylendot: '' }], capnhat:dulieu dict-dict-dict//dict-list-dict
    //  }
    //};
    const dprog = any2obj(e.data);
    var csdl = { ...dprog.csdl } || null;
    var bang = { ...dprog.bang } || null;
    if (csdl == null || bang == null) {
      return;
    }
    await taodb(csdl);
    const ocapnhat = { capnhat: 0, update: 0 };
    const oxoa = { xoa: 0, del: 0, delete: 0 };
    const onap = { nap: 0, load: 0, get: 0 };
    const oluu = { luu: 0, them: 0, moi: 0, sua: 0, save: 0, add: 0, new: 0 };
    const ogom = { gom: 0, getall: 0 };
    const oluunhom = {
      luunhom: 0, themnhom: 0, moinhom: 0, nhommoi: 0, suanhom: 0,
      savegroup: 0, addgroup: 0, newgroup: 0
    };
    for (k in bang) {
      if (k in ocapnhat) {
        await capnhat(csdl, bang[k]);
      };
      if (k in onap) {
        loadHsKh(csdl, bang[k]);
      };
    }
  }
};