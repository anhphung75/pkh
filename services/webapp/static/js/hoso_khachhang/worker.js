//global function
var delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
var suaStr = (ss = '') => {
  try {
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
  } catch (err) { };
  return ss;
};
var any2obj = (sdata) => {
  if (typeof sdata === 'string') {
    let data = sdata.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    sdata = data.replace(/'/g, '"');
    return JSON.parse(sdata);
  }
  return sdata;
};
var engine;

//worker script
self.onerror = (err) => {
  self.postMessage("err on worker hoso_khachhang " + err.mesasage)
};

self.onmessage = (e) => {
  const dprog = any2obj(e.data);
  const dbname = 'Cntđ';
  const dbversion = 1;


  //declare function
  var loadHoso = async (uuid) => {
    var bang = 'hoso';
    try {
      var request = await indexedDB.open(dbname, dbversion);
      request.onsuccess = e => {
        engine = e.target.result;
        console.log('opening db');
      };
      request = await engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(uuid));
      request.onerror = e => {
        oData[bang] = {};
        console.log('Error loadHoso: ', e);
      };
      request.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          oData[bang] = cursor.value;
          cursor.continue();
        };
      };
    } catch (err) {
      oData[bang] = {};
    };
  };
  var loadKhach = async (uuid) => {
    if (engine == null) {
      await loadEngine();
    }
    var bang = 'khachhang';
    try {
      var request = await engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(uuid));
      request.onerror = e => {
        oData[bang] = {};
        console.log('Error loadKhach: ', e);
      };
      request.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          oData[bang] = cursor.value;
          cursor.continue();
        };
      };
    } catch (err) { };
  };
  var loadDot = async (uuid) => {
    if (engine == null) {
      await loadEngine();
    }
    var bang = 'dot';
    try {
      var request = await engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(uuid));
      request.onerror = e => {
        oData[bang] = {};
        console.log('Error loadDot: ', e);
      };
      request.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          oData[bang] = cursor.value;
          cursor.continue();
        };
      };
    } catch (err) { };
  };
  var loadDvtc = async (uuid) => {
    if (engine == null) {
      await loadEngine();
    }
    var bang = 'donvithicong';
    try {
      var request = await engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(uuid));
      request.onerror = e => {
        oData[bang] = {};
        console.log('Error loadDvtc: ', e);
      };
      request.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          oData[bang] = cursor.value;
          cursor.continue();
        };
      };
    } catch (err) { };
  };
  var isData = () => {
    var rec, k, s;
    var keybo = {
      lastupdate: true,
      scan: true,
      blob: true,
      isedit: true,
      isselect: true
    };
    try {
      var dtim = JSON.parse(JSON.stringify(oData));
      for (rec in dtim) {
        for (k in rec) {
          s = rec[k] || '';
          if ((k in keybo) || (s.length < 1)) {
            delete rec[k];
          }
        }
      }
      var l1 = Object.values(dtim.hoso) || [];
      var l2 = Object.values(dtim.dot) || [];
      var l3 = Object.values(dtim.khachhang) || [];
      var ltam = [...l1, ...l2, ...l3];
      if (ltam.length < 1) { return false; };
      var ss = ltam.toString().toLowerCase();
      ss = suaStr(ss);
      console.log('ssearch=', ss);
      for (k in otim) {
        s = k.toLowerCase();
        if (ss.indexOf(s) === -1) {
          return false;
        }
      }
      return true;
    } catch (err) { return false; }
  };
  var loadoData = async () => {
    if (engine == null) {
      await loadEngine();
    }
    var bang = 'map';
    try {
      var request = await engine
        .transaction(bang, 'readonly')
        .objectStore(bang)
        .openCursor();
      request.onerror = e => {
        console.log('Error loadoData: ', e);
      };
      request.onsuccess = e => {
        var cursor = e.target.result;
        if (cursor) {
          var mahoso = cursor.value.mahoso || '';
          var makhachhang = cursor.value.makhachhang || '';
          var madot = cursor.value.madot || '';
          var madvtc = cursor.value.madvtc || '';
          Promise.all([
            loadHoso(mahoso),
            loadKhach(makhachhang),
            loadDot(madot),
            loadDvtc(madvtc)
          ]).catch(err => { console.log("Error in Promise.all ", err) })
            .then(() => {
              console.log('worker loadOData ok on {mahoso: ', this.mahoso, ', makhachhang: ', this.makhachhang, 'madot: ', this.madot, 'madvtc: ', this.madvtc, '}');
            });
          //view test
          //delay(1);
          console.log('oData truoc filter =', oData);
          if (isData(otim)) {
            console.log('oData sau filter =', oData);
            self.postMessage(oData);
            //self.postMessage(JSON.stringify(oData));
          }
          cursor.continue();
        };
      };
    } catch (err) { };
  };

  var saveHoso = async (rec) => {
    var k, sgoc, smoi, rmoi;
    sgoc = JSON.stringify(rec) || '{}';
    if (sgoc === '{}') {
      return;
    }
    var bang = 'hoso';
    var utcid = Date.now();
    try {
      rec.mahoso0 = rec.mahoso0 || '';
      if (rec.mahoso0.length < 1) {
        rec.mahoso0 = utcid;
      }
      rec.isedit = rec.isedit || false;
      rec.mahoso = rec.mahoso || '';
      if (rec.mahoso.length < 1) {
        rec.mahoso = utcid;
      } else {
        Promise.all([loadHoso(rec.mahoso)])
          .catch(err => { console.log("Error in Promise.all ", err) });
        sgoc = JSON.stringify(oData[bang]);
        rmoi = JSON.parse(sgoc);
        for (k in rec) {
          rmoi[k] = rec[k];
        }
        smoi = suaStr(JSON.stringify(rmoi));
        if (sgoc === smoi) {
          return;
        } else {
          rec = JSON.parse(smoi);
        }
        delay(1);
      }
      rec['lastupdate'] = Date.now();
      var request = await indexedDB.open(dbname, dbversion);
      request.onsuccess = e => {
        e.target.result
          .transaction(bang, 'readwrite')
          .objectStore(bang)
          .put(rec);
      };
      request.onupgradeneeded = e => {
        var engine1 = e.target.result;
        if (e.oldVersion < 1) {
          var map = engine1.createObjectStore('hoso', { keyPath: "mahoso" });
          map.createIndex("mahoso0", "mahoso0", { unique: false });
        }
      };
    } catch (err) {
      console.log('Error saveHoso', err.message);
    }
  };

  //main prog
  var oData = {
    hoso: {},
    khachhang: {},
    dot: {},
    donvithicong: {}
  };
  var otim = {};

  if ('load' in dprog) {
    otim = dprog['load'];
    loadoData();
  }
  if ('save' in dprog) {
    var doData = dprog['save'];
    for (var k in doData) {
      var dulieu = doData[k];
      if ('hoso' in dulieu) {
        console.log("dulieu['hoso']", dulieu['hoso'])
        saveHoso(dulieu['hoso']);
      }
    }
  }
};


var loadEngine = (dbname = 'Cntđ', dbversion = 1) => {
  if (!indexedDB) {
    console.log('Trình duyệt không hỗ trợ IndexedDB');
    return
  };
  var map;
  var request = indexedDB.open(dbname, dbversion);
  request.onerror = e => {
    console.log('Error opening db', e);
  };
  request.onsuccess = e => {
    engine = e.target.result;
    console.log('opening db');
  };
  request.onupgradeneeded = e => {
    engine = e.target.result;
    if (e.oldVersion < 1) {
      map = engine.createObjectStore('map', { keyPath: "mahoso" });
      //map.createIndex("madot", "madot", { unique: false });
      //map.createIndex("makhachhang", "makhachhang", { unique: false });
      //map.createIndex("madshc", "madshc", { unique: false });
      //map.createIndex("maqtgt", "maqtgt", { unique: false });
      //map.createIndex("maquan", "maquan", { unique: false });
      //map.createIndex("maphuong", "maphuong", { unique: false });
      map = engine.createObjectStore('hoso', { keyPath: "mahoso" });
      //map.createIndex("mahoso0", "mahoso0", { unique: false });
      map = engine.createObjectStore('khachhang', { keyPath: "makhachhang" });
      //map.createIndex("makhachhang0", "makhachhang0", { unique: false });
      map = engine.createObjectStore('dot', { keyPath: "madot" });
      //map.createIndex("madot0", "madot0", { unique: false });
      map = engine.createObjectStore('donvithicong', { keyPath: "madvtc" });
      //map.createIndex("madot0", "madot0", { unique: false });
    };
    console.log('upgrade db');
  };
};