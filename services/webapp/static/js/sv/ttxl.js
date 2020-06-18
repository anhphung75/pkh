import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";
var ttxl;
var info;

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

var getHsKh = (odata, otim) => {
  const key0test = { thongbao: 0, ghichu: 0, lastupdate: 0 }
  try {
    odata = any2obj(odata);
    otim = any2obj(otim);
    otim = JSON.stringify(otim) || '{}';
    if (otim === '{}') {
      ttxl.postMessage(odata);
      return;
    }




    otim = JSON.parse(otim);
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
    return;
  } catch (err) {
    console.log('Error recSave: ', err.mesasage);
  };
};

// main worker
self.onconnect = (e) => {
  console.log('ttxl connect');
  ttxl = e.ports[0];

  ttxl.onerror = (err) => {
    ttxl.postMessage("Error ttxl: " + err.mesasage)
  };
  ttxl.onmessage = (e) => {
    const lprog = {
      getRecsave: 0,
    };
    //dprog = {
    //  recSave: {
    //    ogoc:{}, omoi:{},
    //  }
    //};
    const dprog = any2obj(e.data);
    console.log("ttxl say = ", e.data);
    var k, dl, ts1, ts2, ts3;
    for (k in dprog) {
      if (!(k() in lprog)) {
        self.close();
      }
      dl = dprog[k];
      switch (k) {
        case 'getRecsave':
          ts1 = dl.ogoc || {};
          ts2 = dl.omoi || {};
          getRecsave(ts1, ts2);
          break;
        case y:
          // code block
          break;
        default:
        // code block
      }
    }
  }
};