var idb = {
  csdl: { ten: 'cntd', cap: 1 },

  upkey: (rs, rr, cap = 1) => {
    let k, k1, v1;
    //object
    if (rr === null || rr === undefined) {
      return rs;
    } else if (rr.constructor === Object) {
      if (!rs || rs.constructor !== Object) { rs = {}; }
      for (k in rr) {
        if (rr[k] === null || rr[k] === undefined) {
        } else if (rr[k].constructor === Object) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = {};
          } else if (rs[k].constructor !== Object) {
            k1 = ["old", k].join("_");
            v1 = rs[k];
            rs[k] = {};
            rs[k][k1] = v1;
          } else { }
          rs[k] = idb.upkey(rs[k], rr[k], cap++);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = idb.upkey(rs[k], rr[k], cap++);
        } else if (rr[k].constructor === Number || rr[k].constructor === Boolean) {
          rs[k] = rr[k];
        } else if (rr[k].constructor === String) {
          if (rr[k].length > 0) {
            rs[k] = rr[k];
          } else if (['ghichu', 'notes'].includes(k) && k in rs) {
            delete rs[k];
          }
        } else { }
      }
      if (Object.keys(rs).length == 0) { return null; }
    } else if (rr.constructor === Array) {
      if (!rs || rs.constructor !== Array) { rs = []; }
      for (k in rr) {
        if (rr[k] === null || rr[k] === undefined) {
        } else if (rr[k].constructor === Object) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = {};
          } else if (rs[k].constructor !== Object) {
            k1 = ["old", k, rs[k]].join("_");
            v1 = rs[k];
            rs[k] = {};
            rs[k][k1] = v1;
          } else { }
          rs[k] = idb.upkey(rs[k], rr[k], cap++);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = idb.upkey(rs[k], rr[k], cap++);
        } else if (rr[k].constructor === Number || rr[k].constructor === Boolean) {
          rs.push(rr[k]);
        } else if (rr[k].constructor === String) {
          if (rr[k].length > 0) {
            rs.push(rr[k]);
          }
        } else { }
      }
      rs = [...new Set(rs)];
      if (rs.length == 0) { return null; }
    } else if (rr.constructor === Number || rr.constructor === Boolean) {
      rs = rr;
    } else if (rr.constructor === String) {
      if (rr.length > 0) {
        rs = rr;
      } else {
        return null;
      }
    } else { }
    return rs;
  },
  luu1: (bang, luu) => {
    let uid = luu.idutc === '0' ? 0 : parseInt(luu.idutc) || -1;
    console.log("idb luu1 uid=", uid);
    if (uid < 0) { return; }
    //main
    //try {
    let db, db1, cs, rr, rs, sx,
      cv = 1;
    indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
      db = e.target.result;
      db.transaction(bang, 'readwrite')
        .objectStore(bang)
        .openCursor(IDBKeyRange.only(uid))
        .onsuccess = (e) => {
          cs = e.target.result;
          if (cs) {
            rs = cs.value;
            if (rs['lastupdate'] > luu['lastupdate']) {
              cv++;
              cs.continue();
            }
            rs['refs'] = idb.upkey(rs['refs'], luu['refs']);
            rs['data'] = idb.upkey(rs['data'], luu['data']);
            rs['status'] = luu['status'];
            rs['lastupdate'] = Date.now();
            sx = cs.update(rs);
            sx.onsuccess = () => {
              console.log("save fin");
            };
            cv++;
            cs.continue();
          } else {
            ///new data
            luu['lastupdate'] = Date.now();
            indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
              db1 = e.target.result
                .transaction(bang, 'readwrite')
                .objectStore(bang)
                .put(luu);
              db1.onsuccess = () => {
                console.log("save fin");
                //self.postMessage({ cv: -1, kq: "save fin" });
              }
            }
          }
        }
    }
    //} catch (err) { self.postMessage({ cv: cv, err: err }); }
  },
}

function test_dulieu() {
  let dl = [
    {
      "idutc": 2001,
      "refs": { "hesoid": 20190725, "ghichu": "quy ước làm tròn sl=3, tiền=0", "test": '', "test2": '' },
      "data": {
        "macpql": 20190725, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
        "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"
        },
      },
      "status": "Fin",
      "lastupdate": Date.now()
    },
    {
      "idutc": 2002,
      "refs": { "hesoid": 20200721 },
      "data": {
        "macpql": 20200721, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
        "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"
        },
      },
      "status": "Fin",
      "lastupdate": Date.now()
    },
    {
      "idutc": 2003,
      "refs": { "hesoid": 20200827, "ghichu": "quy ước làm tròn sl=3, tiền=0" },
      "data": {
        "macpql": 20200827, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
        "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"
        },
      },
      "status": "Fin",
      "lastupdate": Date.now()
    },
  ]
  idb.luu1("chiphiquanly", dl[0])
}
//test_dulieu();

let dl = { "hesoid": 20190725, "ghichu": ["quy ước làm tròn sl=3, tiền=0", "quy ước làm tròn sl=3"] };
let dl1 = { "hesoid": [20190725, 1234, { "id": 456, "ma": "hs123456" }], ghichu: { "bdg": 'lamtron', "pbd": 'ko lam tron' }, "test": ["test1", '0', "test2", '', null], "stringne": 'anh hai day' };
let k1, k = 'ghichu';
console.log("k1=", ['old_', k].join(''));
console.log("kq=", idb.upkey(dl, dl1));