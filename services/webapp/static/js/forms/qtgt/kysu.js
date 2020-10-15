import { any2obj } from "./../utils/dulieu.js";

function tomau_stim(stim = '', noidung = '') {
  if (!stim || stim.length < 1) { return noidung; }
  let stim = new RegExp(stim, 'gi');
  let ltim = noidung.match(stim);
  let dai = ltim.length || 0;
  if (dai < 1) { return noidung; }
  let i = 0;
  while (true) {
    try {
      noidung = noidung.replace(ltim[i], "<b style='color:red'>" + ltim[i] + "</b>");
      i++;
    } catch (error) {
      return noidung;
    }
  }
}

function options_dot(csdl, otim) {
  try {
    let zone = `
    <div id="options_dot" class="">
    `;
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
          let row, stim, nd0, nd1, i, isok = false;
          let r = cursor.value;
          //tim dieu kien namlv
          stim = otim.namlamviec;
          nd0 = r.madot.toString() || '';
          nd1 = tomau_stim(stim, nd0);
          row = `<div class="grid option-dot"><div>` + nd1 + `</div>`;
          if (nd0 !== nd1) { isok = true; }
          nd0 = r.sodot.toString() || '';
          nd1 = tomau_stim(stim, nd0);
          row += `<div>` + nd1 + `</div>`;
          if (nd0 !== nd1) { isok = true; }
          //tim dieu kien plqt
          if (isok == false) {
            stim = otim.plqt;
            nd0 = r.madot.toString() || '';
            nd1 = tomau_stim(stim, nd0);
            row = `<div class="grid option-dot"><div>` + nd1 + `</div>`;
            if (nd0 !== nd1) { isok = true; }
            nd0 = r.sodot.toString() || '';
            nd1 = tomau_stim(stim, nd0);
            row += `<div>` + nd1 + `</div>`;
            if (nd0 !== nd1) { isok = true; }
          }
          //tim dieu kien dvtc
          if (isok == false) {
            stim = otim.ma.dvtc;
            nd0 = r.madvtc.toString() || '';
            nd1 = tomau_stim(stim, nd0);
            if (nd0 !== nd1) {
              isok = true;
              nd1 = r.madot.toString() || '';
              row = `<div class="grid option-dot"><div>` + nd1 + `</div>`;
              nd1 = r.sodot.toString() || '';
              row += `<div>` + nd1 + `</div>`;
            }
          }
          //het dieukien add uctid
          row += `<div>` + r.uctid + `</div></div>`;
          if (isok) { zone += row; }
          cursor.continue();
        } else {
          zone += `</div>`;
          postMessage({ "cv": 0, "kq": zone });
        }
      };
    };
  } catch (err) {
    postMessage({ "cv": 0, "err": err });
  }
}

function tim_hoso_utcid(csdl, otim) {
  try {
    let bang = 'tttt';
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


function qtgt(csdl, madot) {
  try {
    let bang = 'qtgt';
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
            let maqtgt = r.maqtgt.toString() || '';
            if (maqtgt.lenght() > 0) {
              let macpvt = r.macpvt || '';
              postMessage({ "cv": 1, "maqtgt": maqtgt, "macpvt": macpvt });
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

function qtvt_maqtgt(csdl, maqtgt) {
  try {
    let bang = 'cpvt';
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
          if (r.maqtgt == maqtgt) {
            let machiphi = r.machiphi.toString() || '';
            if (machiphi.lenght() > 0) {
              let soluong = r.soluong || 0;
              postMessage({ "cv": 1, "machiphi": machiphi, "soluong": soluong });
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
  if ('qtgt' in lenh) {
    let madot = lenh.qtgt || '';
    qtgt(csdl, madot);
  }
  if ('qtvt' in lenh) {
    let maqtgt = lenh.qtvt || '';
    qtvt_maqtgt(csdl, maqtgt);
  }
};