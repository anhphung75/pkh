//import "./../../refs/d3.min.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function suastr(ss = '') {
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
  }
};

function nap(csdl, bang, uuid) {
  //try {
  indexedDB.open(csdl.ten, csdl.sohieu).onsuccess = (e) => {
    const db = e.target.result;
    db.transaction(bang, 'readonly').objectStore(bang).openCursor(IDBKeyRange.only(uuid)).onsuccess = (e) => {
      let cs = e.target.result;
      if (cs) {
        dulieu[bang] = cs.value;
        cs.continue();
      }
    };
  }

  //} catch (err) {
  //  console.log("err nap bang=", bang, " uuid=", uuid);
  // return null;
  //}
};

function load_songsong(csdl, mahoso, makhachhang, madot, madvtc) {
  console.log('nap(hoso) mahoso=', mahoso);
  console.log('nap(khachhang) makhachhang=', makhachhang);
  console.log('nap(dot) madot=', madot);
  console.log('nap(donvithicong) madvtc=', madvtc);
  Promise.allSettled([
    nap(csdl, 'hoso', mahoso),
    nap(csdl, 'khachhang', makhachhang),
    nap(csdl, 'dot', madot),
    nap(csdl, 'donvithicong', madvtc)
  ])
  console.log("Ket thuc allSettled");
};


function loadHsKh(csdl, nam) {
  try {
    let yc, ch, bang = 'tttt', cs0, cv = 0;
    indexedDB.open(csdl.ten, csdl.sohieu).onsuccess = (e) => {
      const db = e.target.result;
      console.log("yc db=", JSON.stringify(db, null, 4));
      db.transaction(bang, 'readonly').objectStore(bang).openCursor().onsuccess = (e) => {
        cs0 = e.target.result;
        if (cs0) {
          dulieu[bang] = cs0.value;
          let mahoso = cs0.value.mahoso || "";
          let makhachhang = cs0.value.makhachhang || "";
          let madot = cs0.value.madot || "";
          let madvtc = cs0.value.madvtc || "";
          //delay(50000);
          load_songsong(csdl, mahoso, makhachhang, madot, madvtc);
          //delay(50000);
          if (isData()) {
            console.log({ cv: cv, kq: dulieu });
            self.postMessage({ cv: cv, kq: dulieu });
            cv++;
          } else {
            let info = 'isData false, matttt= ' + matttt;
            self.postMessage({ cv: cv, kq: dulieu, err: info });
          }
          cs0.continue();
        } else {
          self.postMessage({ cv: -1, kq: {} });
        }
      }
    };
  } catch (err) {
    console.log({ kq: null, status: 'err' });
    self.postMessage({ cv: -1, kq: {}, err: err });
  }

  function isData() {
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
  }
};

function api_hoso(csdl) {
  let api = "https://" + api_url;
  d3.json(api, {
    mode: 'cors'
  }).then(res => {
    console.log("webworker api, res from server=", JSON.stringify(res, null, 4));
    let dulieu = res.data || {};
    let flds_be = ["utcid", "sohoso", "khachhang", "diachigandhn"];
    let flds_fe = ["utcid", "so ho so", "khach hang", "dia chi"];
    //show_ketqua(dulieu, flds_be, flds_fe);
  });
  //d3.json(api_url, {
  //  headers: new Headers({
  //    "Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
  //"Authorization", "Basic " + btoa(username + ":" + password));
  //  }),
  //}).then(json => { /* do something */ });
}

function hoso_wss(nam) {
  let utcid = Date.now();
  let api = "wss://" + api_url;
  api += "socket" + Date.now();
  let chat = {
    "utcid": utcid,
    "ve": "client" + utcid,
    "dulieu": [{ "test": "Here's some test that the server is urgently awaiting!" },
    { "real": "Here's some text that the server is urgently awaiting!" }]
  };
  let wss = new WebSocket(api);
  wss.onopen = function (ev) {
    console.log("chat from wss client=", chat);
    wss.send(JSON.stringify(chat));
  };
  wss.onmessage = function (ev) {
    let dulieu = JSON.parse(ev.data);
    console.log("dulieu from wss server=", dulieu);
  }
};


//main
var api_url, dulieu = {};
self.onmessage = (ev) => {
  let kq = ev.data;
  console.log("hon ev.kq=", JSON.stringify(kq, null, 4));
  //{ csdl: csdl, lenh: { options_dot: nam } }
  try {
    if (!kq.csdl) {
      return;
    }
    api_url = kq.api;
    hoso_wss(kq.csdl, kq.api);
    //loadHsKh(kq.csdl, kq.nam);
  } catch (err) {
    console.log("err on hon=", err);
  }
};
