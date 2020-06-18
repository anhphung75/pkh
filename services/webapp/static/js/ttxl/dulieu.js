import { any2obj, suaStr } from "./utils/web.js";
import { delay } from "./utils/thoigian.js";

var info;

var getRecsave = (ogoc, omoi) => {
  const key0test = { thongbao: 0, ghichu: 0, lastupdate: 0 }
  try {
    omoi = any2obj(omoi);
    ogoc = any2obj(ogoc);
    ogoc = JSON.stringify(ogoc) || '{}';
    if (ogoc === '{}') {
      return omoi;
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
    self.postMessage(ogoc);
    //delay(1);
    self.close();
  } catch (err) {
    console.log('Error recSave: ', err.mesasage);
    self.close();
  };
};

// main worker
self.onerror = (err) => {
  self.postMessage("Error sw dulieu: " + err.mesasage)
};
self.onmessage = (e) => {
  const lprog = {
    getRecsave: 0,
  };
  //dprog = {
  //  recSave: {
  //    ogoc:{}, omoi:{},
  //  }
  //};
  const dprog = any2obj(e.data);
  console.log("Sw dulieu say = ", e.data);
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
};