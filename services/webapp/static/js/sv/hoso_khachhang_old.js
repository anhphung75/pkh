import { taodb, lbang, luu, xoa, nap } from "../clientdb/db.js";
import { any2obj, suaStr } from "../utils/web.js";
import { delay } from "../utils/thoigian.js";
var ttxl;


var isData = (odata, otim) => {
  var rec, k, s;
  var keybo = {
    status: 0,
    lastupdate: 0,
    scan: 0,
    blob: 0,
    isedit: 0,
    isselect: 0,
  };
  try {
    otim = JSON.stringify(otim) || '{}';
    if (otim === '{}') {
      return true;
    }
    otim = any2obj(otim);
    odata = any2obj(odata);
    for (rec in odata) {
      for (k in rec) {
        s = rec[k] || '';
        if ((k in keybo) || (s.length < 1)) {
          delete rec[k];
        }
      }
    }
    var l1 = Object.values(odata.hoso) || [];
    var l2 = Object.values(odata.dot) || [];
    var l3 = Object.values(odata.khachhang) || [];
    var ltam = [...l1, ...l2, ...l3];
    if (ltam.length < 1) { return false; };
    var ss = ltam.toString().toLowerCase();
    ss = suaStr(ss);
    for (k in otim) {
      s = k.toLowerCase();
      if (ss.indexOf(s) === -1) {
        return false;
      }
    }
    return true;
  } catch (err) { return false; }
};

var loadHsKh = async (csdl, otim) => {
  var bang = 'hoso', o1Data = {};
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
          await Promise.all([
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

var getRecsave = (ogoc, omoi) => {
  const key0test = { thongbao: 0, ghichu: 0, lastupdate: 0 }
  try {
    omoi = any2obj(omoi);
    ogoc = any2obj(ogoc);
    ogoc = JSON.stringify(ogoc) || '{}';
    if (ogoc === '{}') {
      ttxl.postMessage(omoi);
      return;
    }
    ogoc = JSON.parse(ogoc);
    for (k in omoi) {
      if (!(k in ogoc)) {
        ogoc[k] = omoi[k];
      }
      if (k in key0test) {
        ogoc[k] = omoi[k];
      }
      // du lieu thay doi phai co
      var dl = omoi[k] != null ? omoi[k].toString() : '';
      if (dl.length > 0) {
        ogoc[k] = omoi[k];
      }
    };
    ogoc['status'] = 'ok';
    ttxl.postMessage(ogoc);
    //delay(1);
  } catch (err) {
    console.log('Error recSave: ', err.mesasage);
  };
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
    const dprog = any2obj(e.data);
    var csdl = { ...dprog.csdl } || null;
    var bang = { ...dprog.bang } || null;
    if (csdl == null || bang == null) {
      return;
    }
    if (!(bang.ten.toLowerCase() in lbang)) {
      return;
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
      if (k in onap) {
        loadHsKh(csdl, bang[k]);
      };
    }

  }
};