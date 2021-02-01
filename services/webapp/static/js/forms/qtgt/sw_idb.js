var idb = {
  csdl: { ten: 'cntd', cap: 1 },
  gom: (bang, nam = 0) => {
    try {
      let db, cs, kq,
        cv = 1;
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readonly')
          .objectStore(bang)
          .openCursor(null, 'prev')
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              kq = cs.value;
              if (kq) {
                self.postMessage({ cv: cv, kq: kq });
                cv++;
              }
              cs.continue();
            } else {
              self.postMessage({ cv: -1, kq: null });
            }
          }
      }
    } catch (err) {
      self.postMessage({ cv: cv, err: err });
    };
  },
  nap1: {
    baogia: () => {
      let sw = `
        self.onmessage = (ev) => {
          try {
            let tin = ev.data,
              bang = tin.bang.toString().toLowerCase(),
              plgia = tin.nap.plgia.toString().toLowerCase(),
              baogia = tin.nap.baogia === '0' ? 0 : parseInt(tin.nap.baogia) || -1,
              chiphi = tin.nap.chiphi === '0' ? 0 : parseInt(tin.nap.chiphi) || -1,
              ce = new Date(baogia).getTime(),
              cs = parseInt(ce - 3600000 * 24 * 60);
            ce = parseInt(ce + 3600000 * 24);
          } catch (err) {
            self.postMessage({ cv: -1, kq: "nothing to nap" });
          }
          try {
            let db, r, kq, cv = 1;
            indexedDB.open("` + idb.csdl.ten + `",` + idb.csdl.cap + `).onsuccess = (e) => {
              db = e.target.result;
              db.transaction(bang, 'readonly')
                .objectStore(bang)
                .openCursor(IDBKeyRange.bound(cs, ce))
                .onsuccess = (e) => {
                  cs = e.target.result;
                  ce = 0;
                  if (cs) {
                    r = cs.value;
                    if (r.data.mabaogia > ce && r.data.mabaogia <= baogia && r.data.chiphi.id === chiphi && r.data.plgia === plgia) {
                      ce = r.data.mabaogia;
                      kq = Math.abs(r.data[plgia]) || 0;
                    }
                    cs.continue();
                  } else {
                    if (kq) { self.postMessage({ cv: cv, kq: kq }); }
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
    makhoa: () => {
      let sw = `
        self.onmessage = (ev) => {
          try {
            let tin = ev.data,
              bang = tin.bang.toString().toLowerCase(),
              sma = tin.nap.sma.toString().toLowerCase(),
              vma = tin.nap.vma.toString().toLowerCase();
          } catch (err) {
            self.postMessage({ cv: -1, kq: "nothing to nap" });
          }
          try {
            let db, cs, kq, cv = 1;
            indexedDB.open("` + idb.csdl.ten + `",` + idb.csdl.cap + `).onsuccess = (e) => {
              db = e.target.result;
              db.transaction(bang, 'readonly')
                .objectStore(bang)
                .openCursor(null, 'prev')
                .onsuccess = (e) => {
                  cs = e.target.result;
                  if (cs) {
                    kq = cs.value;
                    try {
                      if (r.data.sma.toString().toLowerCase()===vma){
                        self.postMessage({ cv: cv, kq: kq });
                        self.postMessage({ cv: -1, kq: null });
                      }
                    } catch (err) {}
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
  },
  draft: () => {
    self.onmessage = (ev) => {
      try {
        let db, cs, rs, k, sx,
          tin = ev.data,
          bang = tin.bang.toString().toLowerCase(),
          rr = tin.luu,
          idutc = rr.idutc,
          cv = 1;
      } catch (err) {
        self.postMessage({ cv: -1, kq: "not obj to luu" });
      }

      console.log("sw idb luu1=", JSON.stringify(tin, null, 2))
      try {
        indexedDB.open("` + idb.csdl.ten + `", ` + idb.csdl.cap + `).onsuccess = (e) => {
          db = e.target.result;
          db.transaction(bang, 'readwrite')
            .objectStore(bang)
            .openCursor(IDBKeyRange.only(idutc))
            .onsuccess = (e) => {
              cs = e.target.result;
              if (cs) {
                rs = cs.value;
                if (rs['lastupdate'] > rr['lastupdate']) {
                  cv++;
                  cs.continue();
                }
                for (k in rr) {
                  if (rr[k]) {
                    if (rr[k].length > 0 || rr[k].size > 0) {
                      rs[k] = rr[k];
                    } else {
                      if (['ghichu', 'notes'].includes(k)) {
                        rs[k] = rr[k];
                      }
                    }
                  }
                }
                rs['lastupdate'] = Date.now();
                sx = cs.update(rs);
                sx.onsuccess = () => {
                  self.postMessage({ cv: -1, kq: "save fin" });
                };
                cv++;
                cs.continue();
              } else {
                ///new data
                rr['lastupdate'] = Date.now();
                indexedDB.open("`+ idb.csdl.ten + `", ` + idb.csdl.cap + `).onsuccess = (e) => {
                  let db1 = e.target.result
                    .transaction(bang, 'readwrite')
                    .objectStore(bang)
                    .put(rr);
                  db1.onsuccess = () => {
                    self.postMessage({ cv: -1, kq: "save fin" });
                  }
                }
              }
            }
        }
      } catch (err) {
        self.postMessage({ cv: cv, err: err });
      };
    }
  },
  upkey: (rs, rr, cap = 1) => {
    let k, st = false;
    //object
    if (rr.constructor === Object) {
      if (rs.constructor !== Object) { rs = {}; }
      for (k in Object.keys(rr)) {
        if (rr[k].constructor === Object) {
          if (rs[k].constructor !== Object) { rs[k] = {}; }
          idb.upkey(rs[k], rr[k], cap++);
        } else if (rr[k].constructor === Array) {
          if (rs[k].constructor !== Array) { rs[k] = []; }
          idb.upkey(rs[k], rr[k], cap++);
        } else {
          if (rr[k] in rs) {
            if (['ghichu', 'notes'].includes(rr[k])) {
              rs[k] = rr[k];
            } else {
              if (rr[k].length > 0 || rr[k].size > 0) { rs[k] = rr[k]; }
            }
          } else { rs[k] = rr[k]; }
        }
      }
    } else if (rr.constructor === Array) {
      if (rs.constructor !== Array) { rs = []; }
      for (k in rr) {
        if (rr[k].constructor === Object) {
          if (rs[k].constructor !== Object) { rs[k] = {}; }
          idb.upkey(rs[k], rr[k], cap++);
        } else if (rr[k].constructor === Array) {
          if (rs[k].constructor !== Array) { rs[k] = []; }
          idb.upkey(rs[k], rr[k], cap++);
        } else {
          if (rs.includes(rr[k])) {
            if (['ghichu', 'notes'].includes(rr[k])) {
              rs[k] = rr[k];
            } else {
              if (rr[k].length > 0 || rr[k].size > 0) { rs[k] = rr[k]; }
            }
          } else { rs[k] = rr[k]; }
        }
      }
    } else {
      if (rr.length > 0 || rr.size > 0) { rs = rr; }
    }
    return rs;
  },
  luu1: (bang, luu) => {
    try {
      let uid = luu.idutc === '0' ? 0 : parseInt(luu.idutc);
    } catch (err) {
      self.postMessage({ cv: -1, kq: "not obj to luu" });
    }
    //main
    try {
      let db, cs, rr, rs, sx,
        cv = 1;
      indexedDB.open(idb.csdl.ten, idb.csdl.cap).onsuccess = (e) => {
        db = e.target.result;
        db.transaction(bang, 'readwrite')
          .objectStore(bang)
          .openCursor(IDBKeyRange.only(uid))
          .onsuccess = (e) => {
            cs = e.target.result;
            if (cs) {
              rr = cs.value;
              if (rr['lastupdate'] > luu['lastupdate']) {
                cv++;
                cs.continue();
              }
              rs['refs'] = idb.upkey(rr['refs'], luu['refs']);
              rs['data'] = idb.upkey(rr['data'], luu['data']);
              rs['status'] = luu['status'];
              rs['lastupdate'] = Date.now();
              sx = cs.update(rs);
              sx.onsuccess = () => {
                self.postMessage({ cv: -1, kq: "save fin" });
              };
              cv++;
              cs.continue();
            }
          }
      }
    } catch (err) {
      self.postMessage({ cv: cv, err: err });
    }
  },



};

//main worker
self.onmessage = (ev) => {
  try {
    let tin = ev.data,
      csdl_ten = tin.csdl.ten.toString().toLowerCase(),
      csdl_cap = tin.csdl.cap === '0' ? 0 : parseInt(tin.csdl.cap) || 0,
      bang = tin.bang.toString().toLowerCase();
  } catch (err) {
    self.postMessage({ cv: -1, kq: "nothing to do" });
  }
  idb.csdl = { ten: csdl_ten, cap: csdl_cap };
  if ('gom' in tin) {

  }
  if ('nap1' in tin) {

  }
  if ('luu1' in tin) {
    idb.luu1(bang, tin.luu1);
  }

}