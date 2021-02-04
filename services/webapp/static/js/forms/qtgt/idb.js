var idb = {
  csdl: { ten: 'cntd', cap: 1 },
  data2uid: (bang, luu) => {
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { return; };
    let uid = luu.idutc === '0' ? 0 : parseInt(luu.idutc) || -1;
    if (uid < 0) { return; }
    //try {
    let db, cs, rr, kq,
      cv = 1,
      rs = JSON.stringify(luu.data);
    indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
      db = e.target.result;
      db.transaction(bang, 'readwrite')
        .objectStore(bang)
        .openCursor(null, 'prev')
        .onsuccess = (e) => {
          cs = e.target.result;
          if (cs) {
            rr = idb.upkey({}, cs.value.data);
            rr = JSON.stringify(rr);
            if (rs === rr) {
              kq = cs.value.idutc ? cs.value.idutc : -1;
              //self.postMessage({ cv: cv, data2uid: kq });
              //self.postMessage({ cv: -1, kq: "fin" });
              console.log("have bang=", bang, " uid=", kq);
              return kq;
            }
            cs.continue();
          } else {
            console.log("end proc uid=", uid);
            //self.postMessage({ cv: cv, data2uid: -1 });
            //self.postMessage({ cv: -1, kq: "fin" });
            return -1;
          }
        }
    }
    //} catch (err) { self.postMessage({ cv: cv, err: err }); }
  },
  upkey: (rs, rr) => {
    let k, k1, v1,
      keyxoa = ['notes', 'ghichu', 'old_'];
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
          rs[k] = idb.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = idb.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Number || rr[k].constructor === Boolean) {
          rs[k] = rr[k];
        } else if (rr[k].constructor === String) {
          if (rr[k].length > 0) {
            rs[k] = rr[k];
          } else {
            for (k1 in keyxoa) {
              if (k.includes(keyxoa[k1]) && k in rs) {
                delete rs[k];
                break;
              }
            }
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
          rs[k] = idb.upkey(rs[k], rr[k]);
        } else if (rr[k].constructor === Array) {
          if (rs[k] === null || rs[k] === undefined) {
            rs[k] = [];
          } else if (rs[k].constructor !== Array) {
            rs[k] = [rs[k]];
          } else { }
          rs[k] = idb.upkey(rs[k], rr[k]);
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
  xoa1: (bang, xoa) => {
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { return; };
    let uid = xoa.idutc === '0' ? 0 : parseInt(xoa.idutc) || -1;
    if (uid < 0) { return; }
    //try {
    let db, cs, rs, st,
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
            st = rs.status ? rs.status.toString().toLowerCase() : '';
            if (st.includes('fin')) {
              return;
            } else {
              cs.delete();
              cv++;
            }
            cs.continue();
          } else {
            console.log("del rec=", cv);
            return;
          }
        }
    }
    //} catch (err) { self.postMessage({ cv: cv, err: err }); }
  },
  luu1: (bang, luu) => {
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { return; };
    let uid = luu.idutc === '0' ? 0 : parseInt(luu.idutc) || -1;
    if (uid < 0) { return; }
    //try {
    let db, db1, cs, rs, st, sx,
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
            st = rs.status ? rs.status.toString().toLowerCase() : '';
            if (st.includes('fin') || rs['lastupdate'] > luu['lastupdate']) {
              console.log("fin or to old to save uid=", uid);
              return;
            } else {
              rs['data'] = idb.upkey(rs['data'], luu['data']);
              rs['data'] = idb.upkey({}, luu['data']);
              uid = idb.data2uid(bang, rs['data']);
              console.log("save cur uid=", luu['idutc'], ' old uid=', uid);
              if (uid > 0) {
                luu['idutc'] = uid;
                console.log("pass save to uid=", luu['idutc']);
                idb.luu1(bang, luu);
                return;
                //self.postMessage({ cv: -1, kq: "save fin" });
              } else {
                rs['refs'] = idb.upkey(rs['refs'], luu['refs']);
                rs['refs'] = idb.upkey({}, luu['refs']);
                rs['status'] = luu['status'];
                rs['lastupdate'] = Date.now();
                sx = cs.update(rs);
                sx.onsuccess = () => {
                  console.log("cv=", cv, " save old fin uid=", luu['idutc']);
                  cv++;
                  return;
                  //self.postMessage({ cv: -1, kq: "save fin" });
                }
              }
            }
            cs.continue();
          } else {
            ///new data
            luu['data'] = idb.upkey({}, luu['data']);
            console.log("check bang=", bang, " old data=", JSON.stringify(luu['data']));
            uid = idb.data2uid(bang, luu['data']);
            console.log("save new uid=", luu['idutc'], ' old uid=', uid);
            if (uid > 0) {
              luu['idutc'] = uid;
              console.log("pass save to uid=", luu['idutc']);
              idb.luu1(bang, luu);
              return;
            } else {
              luu['refs'] = idb.upkey({}, luu['refs']);
              luu['lastupdate'] = Date.now();
              indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
                db1 = e.target.result
                  .transaction(bang, 'readwrite')
                  .objectStore(bang)
                  .put(luu);
                db1.onsuccess = () => {
                  console.log("cv=", cv, " save new fin uid=", luu['idutc']);
                  //self.postMessage({ cv: -1, kq: "save fin" });
                }
              }
            }
          }
        }
    }
    //} catch (err) { self.postMessage({ cv: cv, err: err }); }
  },
  nap1: {
    baogia: (bang, chiphi, baogia, plgia = 'dutoan') => {
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else { return 0; };
      chiphi = chiphi === '0' ? 0 : parseInt(chiphi) || -1;
      if (chiphi < 0) { return 0; }
      baogia = baogia === '0' ? 0 : parseInt(baogia) || -1;
      if (baogia < 0) { return 0; }
      if (plgia) {
        plgia = plgia.toString().toLowerCase();
      } else { plgia = 'dutoan'; };
      //try {
      let db, r, v, dk, cs, k1,
        k = 0,
        kq = {};
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            dk = 0;
            if (cs) {
              r = cs.value;
              dk = parseInt(r.data.mabaogia);
              if (r.data.chiphi === chiphi && plgia in r.data && dk <= baogia && dk > k) {
                k = dk;
                v = Math.abs(r.data[plgia]);
                if (!(k in kq)) {
                  kq[k] = v;
                  for (k1 in kq) {
                    if (k1 < k) { delete kq[k1]; }
                  }
                }
              }
              cs.continue();
            } else {
              for (k in kq) {
                break;
              }
              console.log([' else kq[', k, '] ', bang, '=', JSON.stringify(kq)].join(''));
              return kq[k];

              //self.postMessage({ cv: cv, kq: kq });
              //self.postMessage({ cv: -1, kq: "fin" });
            }
          }
      }
      //} catch (err) { self.postMessage({ cv: cv, err: err }); }
    },
    idutc: () => {
      let sw = `
        self.onmessage = (ev) => {
          try {
            let tin = ev.data,
              bang = tin.bang.toString().toLowerCase(),
              uid = tin.nap.idutc === '0' ? 0 : parseInt(tin.nap.idutc) || -1;
          } catch (err) {
            self.postMessage({ cv: -1, kq: "nothing to nap" });
          }
          try {
            let db, cs, kq, cv = 1;
            indexedDB.open("` + idb.csdl.ten + `",` + idb.csdl.cap + `).onsuccess = (e) => {
              db = e.target.result;
              db.transaction(bang, 'readonly')
                .objectStore(bang)
                .openCursor(IDBKeyRange.only(uid))
                .onsuccess = (e) => {
                  cs = e.target.result;
                  if (cs) {
                    kq = cs.value;
                    if (kq) { self.postMessage({ cv: cv, kq: kq }); }
                    cs.continue();
                  } else {
                    self.postMessage({ cv: -1, kq: null });
                  }
                }
            }
          } catch (err) {
            self.postMessage({ cv: cv, err: err });
          };
        }`,
        blob = new Blob([sw], { type: "text/javascript" }),
        url = (window.URL || window.webkitURL).createObjectURL(blob);
      return url;
    },
  }
  
}

function test_dulieu() {
  let dl = [
    {
      "idutc": Date.now(),
      "refs": { "hesoid": 20190725, "ghichu": "quy ước làm tròn sl=3, tiền=0", "test": '', "test2": '' },
      "data": {
        "macpql": 20190725, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
        "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"
        },
      },
      "status": "ok",
      "lastupdate": Date.now()
    },
    {
      "idutc": Date.now() + 1,
      "refs": { "hesoid": 20200721 },
      "data": {
        "macpql": 20200721, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
        "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"
        },
      },
      "status": "ok",
      "lastupdate": Date.now()
    },
    {
      "idutc": Date.now() + 2,
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
  idb.luu1("chiphiquanly", dl[1])
  idb.luu1("chiphiquanly", dl[2])
}
//test_dulieu();
//let s = ["s=", idb.xoa1("bgvl", { "idutc": 1612321134188 })].join('');
//console.log(s);
let dl = {
  "idutc": Date.now(),
  "refs": { "hesoid": 20190725, "ghichu": "quy ước làm tròn sl=3, tiền=0", "test": '', "test2": '' },
  "data": {
    "macpql": 20190725, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
    "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
    "phaply": {
      "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
      "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"
    },
  },
  "status": "ok",
  "lastupdate": Date.now()
};
//idb.data2uid("chiphiquanly", dl);