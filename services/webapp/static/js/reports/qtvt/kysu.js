import { any2obj } from "./../utils/dulieu.js";

function dulieuin(csdl) {
  try {
    let bang = 'dot';
    let yc = await indexedDB.open(csdl, 1);
    yc.onsuccess = e => {
      let ch = e.target.result
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      ch.onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          let r = cursor.value;
          if (r.inok == true) {
            let madot = r.madot.toString() || '';
            if (madot.lenght() > 0) {
              let odata = {};
              odata['madot'] = madot;
              odata["sodot"] = r.sodot || '9999GMMP001';
              odata["ngaylap"] = r.ngaylap || 99990101;
              odata["dvtcid"] = r.dvtcid || 0;
              postMessage({ "cv": 1, "madot": madot, "odata": odata });
            }
          }
          cursor.continue();
        } else {
          postMessage({ "cv": 0 });
        }
      };
    };
  } catch (err) {
    postMessage({ "cv": 0, "err": err });
  }
}


function qtvt(csdl, madot) {
  try {
    let bang = 'qtvt';
    let yc = await indexedDB.open(csdl, 1);
    yc.onsuccess = e => {
      let ch = e.target.result
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      ch.onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          let r = cursor.value;
          if (r.madot == madot) {
            let machiphi = r.machiphi.toString() || '';
            if (machiphi.lenght() > 0) {
              let tt = r.tt || 0;
              let thucxuat = r.thucxuat || 0;
              let sudung = r.sudung || 0;
              let tainhap = r.tainhap || 0;
              let xuatbu = r.xuatbu || 0;
              let chiphi={"tt": tt, "machiphi": machiphi, "thucxuat": thucxuat, "sudung": sudung, "tainhap": tainhap, "xuatbu": xuatbu};
              postMessage({ "cv": 1,"chiphi":chiphi});
            }
          }
          cursor.continue();
        } else {
          postMessage({ "cv": 0 });
        }
      };
    };
  } catch (err) {
    postMessage({ "cv": 0, "err": err });
  }
}
//main web worker
onmessage = (e) => {
  const dulieu = any2obj(e.data);
  const csdl = dulieu.csdl || null;
  if (csdl == null) { return };
  let lenh = { ...dulieu.lenh };

  //thuc hien cac dieu kien
  if ('dulieuin' in lenh) {
    dulieuin(csdl);
  }
  if ('qtvt' in lenh) {
    let madot = lenh.qtvt || '';
    qtvt(csdl, madot);
  }
};