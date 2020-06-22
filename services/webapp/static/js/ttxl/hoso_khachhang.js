import { taodb, nap, capnhat } from "../ttdl/db.js";
import { any2obj, suaStr } from "../utils/web.js";
import { delay } from "../utils/thoigian.js";
var ttxl;

var loadHsKh = async (csdl, otim) => {
  var bang = 'tttt', o1Data = {};
  try {
    var yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      var ch = e.target.result
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      ch.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          var mahoso = cursor.value.mahoso || '';
          var makhachhang = cursor.value.makhachhang || '';
          var madot = cursor.value.madot || '';
          var madvtc = cursor.value.madvtc || '';
          var [oHoso, oKhach, oDot, oDvtc] = await Promise.all([
            nap(csdl, { ten: 'hoso', nap: mahoso }),
            //nap(csdl, { ten: 'khachhang', nap: makhachhang }),
            //nap(csdl, { ten: 'dot', nap: madot }),
            //nap(csdl, { ten: 'donvithicong', nap: madvtc }),
          ]);
          ttxl.postMessage({ kq: o1Data, status: 'ok' });
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