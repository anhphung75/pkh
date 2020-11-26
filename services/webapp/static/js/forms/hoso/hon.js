const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
var loadHsKh = async (csdl, nam) => {
  let dulieu = {};
  var suastr = (ss = '') => {
    try {
      ss = JSON.stringify(ss);
      //loai bo 2 space, tabs, newlines
      ss = ss.replace(/\s\s+/g, ' ');
      //loai bo 2 space
      ss = ss.replace(/  +/g, ' ');
      //thay NumpadSubtract = Minus
      ss = ss.replace(/-+/g, '-');
      //loai bo 2 Minus --
      ss = ss.replace(/--+/g, '-');
      ss = ss.replace(/, ,/g, ',');
      ss = ss.replace(/,,+/g, ',');
      return ss;
    } catch (err) {
      return ss.toString();
    };

  };
  var load_songsong = async (mahoso, makhachhang, madot, madvtc) => {
    console.log('nap(hoso) mahoso=', mahoso);
    console.log('nap(khachhang) makhachhang=', makhachhang);
    console.log('nap(dot) madot=', madot);
    console.log('nap(donvithicong) madvtc=', madvtc);

    await nap('hoso', mahoso);
    await nap('khachhang', makhachhang);
    await nap('dot', madot);
    await nap('donvithicong', madvtc);
    console.log("Ket thuc Promiseall");
  };
  var nap = async (bang, uuid) => {
    try {
      let yc = await indexedDB.open(csdl.ten, csdl.sohieu);
      yc.onsuccess = e => {
        let ch = e.target.result
          .transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor(IDBKeyRange.only(uuid));
        ch.onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            dulieu[bang] = cursor.value;
          }
          return true;
        };
      };
    } catch (err) {
      console.log("err nap bang=",bang, " uuid=", uuid);
      return null;
    }
  };
  var isData = () => {
    let bang, k, v, s, ss, ltam = [];
    let keybo = {
      status: 0,
      lastupdate: 0,
      scan: 0,
      blob: 0,
      isedit: 0,
      isselect: 0,
    };
    console.log("isData nam=", JSON.stringify(nam, null, 4));
    console.log("isData dulieu=", JSON.stringify(dulieu, null, 4));
    try {
      for (bang in dulieu) {
        for (k in bang) {
          if ((k in keybo) || (bang[k].length < 1)) {
            delete bang[k];
          }
        }
      }
      for (bang in dulieu) {
        v = Object.values(dulieu[bang]);
        ltam = [...ltam, ...v];
      }
      if (ltam.length < 1) { return false; };
      ss = suastr(ltam);
      nam = nam.toString();
      if (ss.indexOf(nam) === -1) {
        console.log("false isData nam=", nam, " not in ss=", ss);
        return false;
      }
      return true;
    } catch (err) {
      console.log("err isData nam=", JSON.stringify(nam, null, 4));
      console.log("err isData dulieu=", JSON.stringify(dulieu, null, 4));
      return false;
    }
  };
  try {
    let bang = 'tttt';
    let id = 1;
    let yc = await indexedDB.open(csdl.ten, csdl.sohieu);
    yc.onsuccess = e => {
      let ch = e.target.result
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      ch.onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          let matttt = cursor.value.matttt || "";
          dulieu[bang] = cursor.value;
          let mahoso = cursor.value.mahoso || "";
          nap('hoso', mahoso);
          delay(500);
          let makhachhang = cursor.value.makhachhang || "";
          nap('khachhang', makhachhang);
          delay(500);
          let madot = cursor.value.madot || "";
          nap('dot', madot);
          delay(500);
          let madvtc = cursor.value.madvtc || "";
          nap('donvithicong', madvtc);
          //load_songsong(mahoso, makhachhang, madot, madvtc);
          delay(500);
          if (isData()) {
            console.log('id=', id);
            console.log({ cv: id, kq: dulieu });
            self.postMessage({ cv: id, kq: dulieu });
            id++;
          } else {
            let info = 'isData false, matttt= ' + matttt;
            self.postMessage({ cv: id, kq: dulieu, err: info });
          }
          cursor.continue();
        } else {
          self.postMessage({ cv: 0, kq: {} });
        }
      };
    };
  } catch (err) {
    console.log({ kq: null, status: 'err' });
    self.postMessage({ cv: 0, kq: {}, err: err });
  }
};

//main 
self.onmessage = (e) => {
  let kq = e.data;
  console.log("hon e.kq=", JSON.stringify(kq, null, 4));
  //{ csdl: csdl, lenh: { options_dot: nam } }
  try {
    if (!kq.csdl) {
      return;
    }
    loadHsKh(kq.csdl, kq.nam);
  } catch (err) {
    console.log("err on hon=", err);
  }
};
