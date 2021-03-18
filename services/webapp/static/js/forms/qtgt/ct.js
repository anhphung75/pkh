import { lamtronso, a2s, a2sl, a2i } from "./../../utils.js"

d3.formatDefaultLocale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "VNĐ"]
});

const fn = {
  a2s: (dulieu) => {
    return a2s(dulieu);
  },
  a2sl: (dulieu) => {
    return a2sl(dulieu);
  },
  a2i: (dulieu) => {
    return a2i(dulieu);
  },
  sregexp: (stim) => {
    stim = fn.a2s(stim);
    if (stim.length < 1) { return stim; }
    let k,
      ltim = [...stim],
      mau = "";
    for (k in ltim) {
      if (
        ["$", "(", ")", "[", ".", "+", "*", "^", "?", "\\"].includes(ltim[k])
      ) {
        mau += "\\" + ltim[k];
      } else {
        mau += ltim[k];
      }
    }
    return mau;
  },
  stomau: (sgoc, stim, mausac = 'red') => {
    try {
      sgoc = a2s(sgoc);
      stim = a2s(stim);
      if (stim.length < 1) { return sgoc; }
    } catch (err) { return sgoc; }
    let mau = fn.sregexp(stim);
    mau = new RegExp(mau, "gi");
    sgoc = sgoc.replace(mau, (m) => {
      if (m === undefined || m === null || m === "") { return; }
      return ["<b style='color:", mausac, "'>", m, "</b>"].join('');
    });
    return sgoc;
  },
};

const app = {
  url: null,
  cv: 100,
  nam: new Date().getFullYear().toString(),
  hoso: { id: 123, ma: '', },
  khachhang: { id: 1, ma: '', },
  qtgt: { id: 123, ma: '', },
  dvtc: { id: 123, ma: '', },
  plgia: 'dutoan',
  baogia: 20190726,

  macpql: 20200827,

  idma: {
    hoso: 123,
    qtgt: 123,
    dot: 123,
    plgia: 'dutoan',
    baogia: 20190726,
    oc: {
      cpxd: 1,
      cpvt: 1,
      cpvl: 1,
      cptl: 1,
    },
    on: {
      cpxd: 1,
      cpvt: 1,
      cpvl: 1,
      cptl: 1,
    },
    cpql: 20200827,
  },

  macpql: 20200827,
  hoso: {
    idma: {
      dot: 123,
      qtgt: 123,
    },
    khachhang: '',
    diachi: '',
  },
  qtgt: {
    idma: 123,

  },
  chiphi: {
    cv: 0,
    baogia: 20190726,
    plgia: 'dutoan',
    d8: {
      '1': { chiphi: 1, baogia: 20190726, plgia: 'dutoan', mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000 },
      '2': { chiphi: 2, baogia: 20190726, plgia: 'dutoan', mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000 },
      '3': { chiphi: 3, baogia: 20190726, plgia: 'dutoan', mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000 },
    },
  },
  oc: {
    zvl: 0,
    znc: 0,
    zmtc: 0,
    ztl: 0,
    cpxd: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      l8: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
    },
    cpvt: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      dscp: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
    },
    cpvl: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      dscp: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
    },
    phui: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', dai: 0.5, rong: 0.5, sau: 1 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', dai: 0, rong: 0.3, sau: 0.6 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', dai: 0, rong: 0.3, sau: 0.6 },
    ],
  },
};

const ram = {
  zcpx: {},
};

const idb = {
  csdl: { ten: 'cntd', cap: 1 },
  taodb: () => {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      console.log('khong ho tro idb');
      return null;
    };
    try {
      let db, idx,
        ten = idb.csdl.ten,
        cap = idb.csdl.cap,
        yc = indexedDB.open(ten, cap);
      yc.onupgradeneeded = e => {
        db = e.target.result;
        if (e.oldVersion < cap) {
          idx = db.createObjectStore('tttt', { keyPath: 'tttt' });
          idx = db.createObjectStore('hoso', { keyPath: 'idma' });
          idx = db.createObjectStore('khachhang', { keyPath: 'idma' });
          idx = db.createObjectStore('khuvuc', { keyPath: 'idma' });
          idx = db.createObjectStore('dot', { keyPath: 'idma' });
          idx = db.createObjectStore('donvithicong', { keyPath: 'idma' });
          idx = db.createObjectStore('hoancong', { keyPath: 'idma' });
          idx = db.createObjectStore('trongai', { keyPath: 'idma' });
          //chiphi
          idx = db.createObjectStore('chiphi', { keyPath: 'idma' });
          idx = db.createObjectStore('chiphiquanly', { keyPath: 'idma' });
          //baogia
          idx = db.createObjectStore('bgvl', { keyPath: 'idma' });
          idx = db.createObjectStore('bgnc', { keyPath: 'idma' });
          idx = db.createObjectStore('bgmtc', { keyPath: 'idma' });
          idx = db.createObjectStore('bgtl', { keyPath: 'idma' });
          //qtvt
          idx = db.createObjectStore('qtvt', { keyPath: 'idma' });
          idx = db.createObjectStore('qtvt_cpvt', { keyPath: 'idma' });
          //qtgt
          idx = db.createObjectStore('qtgt', { keyPath: 'idma' });
          idx = db.createObjectStore('cpxd', { keyPath: 'idma' });
          idx = db.createObjectStore('cpvl', { keyPath: 'idma' });
          idx = db.createObjectStore('cpvt', { keyPath: 'idma' });
          idx = db.createObjectStore('cptl', { keyPath: 'idma' });
          //scan
          idx = db.createObjectStore('scan', { keyPath: 'idma' });
          //web
          idx = db.createObjectStore('nhanvien', { keyPath: 'idma' });
        }
      };
    } catch (err) { };
  },
  gom: {
    zcpx: (dk = { baogia: app.baogia, plgia: app.plgia }, zd8 = app.chiphi, gang = 0) => {
      try {
        if (Object.keys(dk).length === 0) { return; }
        if (Object.keys(zd8.d8).length === 0 || zd8.cv === 100) { return; }
        gang = fn.a2i(gang);
        if (gang > 3) { return; };
      } catch (err) { return; }
      const maxrec = 2000;
      let tin, gui, i, k, k3, v, r, phui, plcp, idma, plgia, baogia, chiphi, d1, d8, l8, nook,
        cv = 0, zcv,
        w = {},
        zdl = zd8.d8;
      l8 = [];
      for (k in zdl) {
        r = zdl[k];
        r.chiphi = k;
        l8.push(r);
      }
      l8 = l8.sort((a, b) => b.idma - a.idma);
      for (i in l8) {
        d1 = l8[i];
        if (i + 1 > maxrec && 'giavl' in d1 && 'gianc' in d1 && 'giamtc' in d1 && 'giatl' in d1) {
          k = d1.chiphi;
          if (k in zdl) { delete zdl[k]; }
        }
      }
      zcv = l8.length;
      if (zcv < 1) { return; };
      //check new cp
      baogia = fn.a2i(dk.baogia);
      plgia = fn.a2sl(dk.plgia);
      if (baogia !== zd8.baogia || plgia !== zd8.plgia) {
        zd8.plgia = plgia;
        zd8.baogia = baogia;
        for (k in zdl) {
          d1 = zdl[k];
          d1.baogia = baogia;
          d1.chiphi = k;
          d1.plgia = plgia;
          d1.idma = [baogia, k, plgia].join('.');
          if ('giavl' in d1) { delete d1.giavl }
          if ('gianc' in d1) { delete d1.gianc }
          if ('giamtc' in d1) { delete d1.giamtc }
          if ('giatl' in d1) { delete d1.giatl }
        }
      }
      zd8.cv = 0;
      for (k in zdl) {
        d1 = zdl[k];
        if (!('mota' in d1) || !('dvt' in d1)) {
          nook = true;
          idb.nap.chiphi({ idma: d1.chiphi }, d1, 0);
        };
        if (!('giavl' in d1)) {
          nook = true;
          idb.nap.baogia({ baogia: baogia, plgia: plgia, plbg: 'bgvl', chiphi: d1.chiphi }, d1, 0);
        };
        if (!('gianc' in d1)) {
          nook = true;
          idb.nap.bgvl();
        };
        if (!('giamtc' in d1)) {
          nook = true;
          idb.nap.bgvl();
        };
        if (!('giall' in d1)) {
          nook = true;
          idb.nap.bgvl();
        };
      }
      setTimeout(() => { idb.gom.zcpx(); }, 100);
    },
  },
  nap: {
    hoso: (dk = { idma: null }, dl = {}) => {
      if (dk.constructor !== Object) { return; }
    },
    phuidao: (dk = { phui: 'on', idma: null }, dl = {}) => {
      if (dk.constructor !== Object) { return; }
    },
    dscp: (proc = 'on_cpxd', dk = { idma: null }) => {
      if (dk.constructor !== Object) { return; }
      let phui, plcp, idma, tin, gui, i, k, zdl,
        w = new Worker(app.url['swidb']);

      gui = {
        csdl: idb.csdl,
        prog: prog,
        dk: dk,
        gang: 0,
      };
      console.log("idb.nap.", phui, ".", plcp, " gui=", JSON.stringify(gui, null, 2));
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        if ("err" in tin) {
          console.log("swidb err=", JSON.stringify(tin.err, null, 2));
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        } else if (tin.cv >= 0 && tin.cv <= 100) {
          if ('idma' in tin) {
            //ok action
            zdl = tin.idma.data;
            if (zdl.constructor === Array) {
              for (i in zdl) {
                zdl[i].barcode = '';
                zdl[i].qrcode = '';
                zdl[i].mota = '';
                zdl[i].dvt = '';
                zdl[i].giavl = 0;
                zdl[i].gianc = 0;
                zdl[i].giamtc = 0;
                zdl[i].giatl = 0;
                zdl[i].tienvl = 0;
                zdl[i].tiennc = 0;
                zdl[i].tienmtc = 0;
                zdl[i].tientl = 0;
                zdl[i].cv = 0;
                idma = zdl[i].chiphi;
                idb.nap.chiphi({ idma: idma });
              }
              app[phui][plcp] = zdl;
            }
          }
        } else if (tin.cv === 100) {
          if ('oc_cpxd' in tin) {
            k = 'oc_cpxd'
            zdl = tin[k];
            web.tiendo(k, tin.cv);
            app.oc.cpxd = zdl;
            web.oc.cpxd(zdl);
          }
        } else if (tin.cv < 0 || tin.cv > 100) {
          if (w) { w.terminate(); }
          w = null;
          console.log("swidb fin=", JSON.stringify(tin, null, 2));
        } else {
          console.log("swidb info=", JSON.stringify(tin, null, 2));
        }
        console.log("idb.nap.cpphui app[", phui, ".", plcp, "]=", JSON.stringify(app[phui][plcp], null, 2));
      }
    },

  },
  luu: {

  },
};

const web = {
  tagid: '',
  hov: { mau1: "yellow", mau2: "#9999ff" },
  tao: () => {
    web.sw_url();
    web.otim.nam();
    web.otim.plqt();
    web.otim.dvtc();
    web.otim.dot();
    web.otim.hoso();
    web.oc.tieude();
    //web.oc.cpvt();
    //web.oc.cpvl();
    //web.oc.bth();
    //web.on.cpxd();
    //web.on_cpvt();
    //web.on_cpvl();
    //web.ongnganh();
    //web.tlmd.cptl();
    //web.tlmd.bth();
  },
  sw_url: () => {
    if (!app.url) { app.url = {}; }
    app.url["api"] = [
      ["https://", window.location.host, "/", idb.csdl.ten, "/api/hoso/", ga.namlamviec].join(''),
      ["https://", window.location.host, "/", idb.csdl.ten, "/api/dshc/", ga.namlamviec].join(''),
    ];
    app.url["wss"] = ["wss://", window.location.host, "/", idb.csdl.ten, "/wss/hoso"].join('');
    app.url["swidb"] = d3.select("#qtgt").attr("data-swidb");
    app.url["swapi"] = d3.select("#qtgt").attr("data-swapi");
  },

  otim: {
    nam: () => {
      let zone, inp, box,
        zdl = ga.nam,
        v0 = zdl[app.nam].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_nam")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.nam();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['nam', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.nam = d.id;
              web.otim.nam();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['nam', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb nam r', i, ' c1'].join('');
            } else {
              return ['l fb nam r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['nam', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb nam r', i, ' c2'].join('');
            } else {
              return ['l bl nam r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    plqt: () => {
      let zone, inp, box,
        zdl = ga.plqt,
        v0 = zdl[app.plqt].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_plqt")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.plqt();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['plqt', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.plqt = d.id;
              web.otim.plqt();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['plqt', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb plqt r', i, ' c1'].join('');
            } else {
              return ['l fb plqt r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['plqt', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb plqt r', i, ' c2'].join('');
            } else {
              return ['l bl plqt r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    dvtc: () => {
      let zone, inp, box,
        zdl = ga.dvtc,
        v0 = zdl[app.dvtc].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_dvtc")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.dvtc();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['dvtc', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.dvtc = d.id;
              web.otim.dvtc();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['dvtc', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dvtc r', i, ' c1'].join('');
            } else {
              return ['l fb dvtc r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['dvtc', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dvtc r', i, ' c2'].join('');
            } else {
              return ['l bl dvtc r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    dot: () => {
      let zone, inp, box,
        zdl = ga.dot,
        v0 = zdl[app.dot].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_dot")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.dot();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['dot', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.dot = d.id;
              web.otim.dot();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['dot', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dot r', i, ' c1'].join('');
            } else {
              return ['l fb dot r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['dot', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dot r', i, ' c2'].join('');
            } else {
              return ['l bl dot r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    hoso: () => {
      let zone, inp, box,
        zdl = ga.hoso,
        v0 = zdl[app.hoso].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_hoso")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.hoso();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['hoso', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.hoso = d.id;
              web.otim.hoso();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['hoso', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb hoso r', i, ' c1'].join('');
            } else {
              return ['l fb hoso r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['hoso', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb hoso r', i, ' c2'].join('');
            } else {
              return ['l bl hoso r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
  },
  oc: {
    tieude: () => {
      d3.select("#oc_cpxd_tieude")
        .style("list-style", "none")
        .style("background-color", "transparent")
        .style("margin", 0)
        .style("padding", 0)
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");
      d3.select("#oc_cpvt_tieude")
        .style("list-style", "none")
        .style("background-color", "transparent")
        .style("margin", 0)
        .style("padding", 0)
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");
      d3.select("#oc_cpvl_tieude")
        .style("list-style", "none")
        .style("background-color", "transparent")
        .style("margin", 0)
        .style("padding", 0)
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");
    },
    cpxd: (zdl = [
      { chiphi: 100, soluong: 0, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 200, soluong: 0, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 300, soluong: 0, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ]) => {
      let zone, i, r, row, o, dl,
        dulieu = [];
      if (zdl === undefined || zdl === null || zdl.constructor !== Array) {
        zdl = app.oc.cpxd.dscp;
        if (zdl === undefined || zdl === null || zdl.constructor !== Array) {
          return;
        }
      }
      console.log("web.oc.cpxd app.oc.cpxd=", JSON.stringify(app.oc));
      for (i in zdl) {
        r = zdl[i];
        //tra lai chiphi
        if (app.chiphi) {
          dl = app.chiphi[r.chiphi];
          r.barcode = dl.barcode;
          r.qrcode = dl.qrcode;
          r.mota = dl.mota;
          r.dvt = dl.dvt;
          r.giavl = dl.giavl;
          r.gianc = dl.gianc;
          r.giamtc = dl.giamtc;
          r.giatl = dl.giatl;
        }
        //soluong
        r.soluong = lamtronso(Math.abs(r.soluong), 3);
        //tinh lai tien
        r.tienvl = lamtronso(r.soluong * r.giavl, 0);
        r.tiennc = lamtronso(r.soluong * r.gianc, 0);
        r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
        r.tt = i;
        r.plcp = 'cpxd';
        r.plqt = 'oc';
        dulieu.push(r);
      }
      //main
      zone = d3.select("#oc_cpxd")
        .style("list-style", "none")
        .style("margin", 0)
        .style("padding", 0)
        .style("max-height", "10.25rem")
        .style("overflow-y", "auto")
        .style("border", "1px solid #d4d4d4");
      zone.selectAll('li').remove();
      row = zone.selectAll("li").data(dulieu).enter().append("li")
        .style("display", "grid")
        //.style("align-items", "center")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");

      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '0'].join('__'))
        .attr("class", (d, i) => ['c bb fito oc_cpxd r', i, ' c0'].join(''))
        .text((d) => d3.format("03d")(parseInt(d.tt) + 1))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("class", "bb")
        .append('textarea')
        .attr("id", (d, i) => ['oc_cpxd', i, '1'].join('__'))
        .attr("class", (d, i) => ['j w100 fito oc_cpxd r', i, ' c1'].join(''))
        .attr("rows", 1)
        .style("margin", 0)
        .style("padding", "1pt")
        .style("outline", "none")
        .text(d => d.mota)
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        })
        .on("input", function (ev, d) {
          let el = ev.target.parentNode,
            stim = ev.target.value;
          d3.select(ev.target).classed("fito", false);
          ev.target.style.height = 'auto';
          ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
          web.box.chiphi(el, d, stim);
        })
        .on("click", function (ev, d) {
          if (d3.select("#xem").node()) {
            d3.selectAll("#xem").remove();
            d3.select(ev.target).classed("fito", true);
          } else {
            let el = ev.target.parentNode,
              stim = ev.target.value;
            d3.select(ev.target).classed("fito", false);
            web.box.chiphi(el, d, stim);
            ev.target.focus();
            ev.target.select();
          }
        })
        .on("keydown", function (ev, d) {
          if ([13].includes(ev.keyCode)) {
            ev.preventDefault();
            d3.selectAll("#xem").remove();
            //chuyen dong ke tiep
            web.tagid = ev.target.id;
            web.move2id(1, 0);
          }
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '2'].join('__'))
        .attr("class", (d, i) => ['c bb oc_cpxd r', i, ' c2'].join(''))
        .text((d) => d.dvt)
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("class", "bb")
        .append('textarea')
        .attr("id", (d, i) => ['oc_cpxd', i, '3'].join('__'))
        .attr("class", (d, i) => ['r f0 fito oc_cpxd r', i, ' c3'].join(''))
        .attr("rows", 1)
        .style("margin", 0)
        .style("padding", "1pt")
        .style("outline", "none")
        .text((d) => d3.format(",.3r")(d.soluong))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        })
        .on("change", (ev, d) => {
          let v = Math.abs(parseFloat(ev.target.value)) || 0;
          if (v > 0) {
            let r = app.oc.cpxd[d.tt];
            console.log("origine app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
            console.log("soluong moi=", v);
            r.soluong = v;
            r.tienvl = lamtronso(r.soluong * r.giavl, 0);
            r.tiennc = lamtronso(r.soluong * r.gianc, 0);
            r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
            ev.target.style.height = 'auto';
            ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
            console.log("update app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
          }
          web.oc.cpxd();
          web.oc.bth();
        })
        .on("keydown", function (ev, d) {
          if ([13].includes(ev.keyCode)) {
            ev.preventDefault();
            let v = Math.abs(parseFloat(ev.target.value)) || 0;
            if (v > 0) {
              let r = app.oc.cpxd[d.tt];
              console.log("origine app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
              console.log("soluong moi=", v);
              r.soluong = v;
              r.tienvl = lamtronso(r.soluong * r.giavl, 0);
              r.tiennc = lamtronso(r.soluong * r.gianc, 0);
              r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
              ev.target.style.height = 'auto';
              ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
              console.log("update app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
            }
            web.tagid = ev.target.id;
            web.oc.cpxd();
            web.oc.bth();
            //chuyen dong ke tiep
            web.move2id(1, 0);
          }
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '4'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c4'].join(''))
        .text((d) => d3.format(",.0r")(d.giavl))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '5'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c5'].join(''))
        .text((d) => d3.format(",.0r")(d.gianc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '6'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c6'].join(''))
        .text((d) => d3.format(",.0r")(d.giamtc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '7'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c7'].join(''))
        .text((d) => d3.format(",.0r")(d.tienvl))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '8'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c8'].join(''))
        .text((d) => d3.format(",.0r")(d.tiennc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '9'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c9'].join(''))
        .text((d) => d3.format(",.0r")(d.tienmtc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
    },

    bth: (zdl) => {
      let zone, kiem,
        self = app.oc;
      console.log("bth app.oc=", JSON.stringify(self));
      zone = d3.select("#ongcai");
      kiem = zone.select(".grid.ongcai")
        .attr("data-show", "true")
        .on("click", (ev) => {
          if (kiem.attr("data-show") === "true") {
            zone.selectAll("#show_ongcai").classed("hide", false);
            kiem.attr("data-show", "false");
          } else {
            zone.selectAll("#show_ongcai").classed("hide", true);
            kiem.attr("data-show", "true");
          }
        });
      if (!('oc' in app)) { app.oc = { zvl: 0, znc: 0, zmtc: 0 }; }
      try {
        self.zvl = self.cpxd.reduce(function (z, rec) { return z + rec.tienvl }, 0);
        self.zvl = self.cpvt.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
        self.zvl = self.cpvl.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
      } catch (err) { }
      try {
        self.znc = self.cpxd.reduce(function (z, rec) { return z + rec.tiennc }, 0);
        self.znc = self.cpvt.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
        self.znc = self.cpvl.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
      } catch (err) { }
      try {
        self.zmtc = self.cpxd.reduce(function (z, rec) { return z + rec.tienmtc }, 0);
        self.zmtc = self.cpvt.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
        self.zmtc = self.cpvl.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
      } catch (err) { }
      d3.select("#oc_zvl").data([self.zvl])
        .attr("class", "fb")
        .text((d) => d3.format(",.0r")(d));
      d3.select("#oc_znc").data([self.znc])
        .attr("class", "fb")
        .text((d) => d3.format(",.0r")(d));
      d3.select("#oc_zmtc").data([self.zmtc])
        .attr("class", "fb")
        .text((d) => d3.format(",.0r")(d));
    },
    up_cpxd: (dl) => {
      if (dl.constructor !== Object) { return; }
      if (dl.chiphi === '...') {
        app.oc.cpxd.splice(dl.tt, 1);
      } else {
        app.oc.cpxd[dl.tt] = dl;
      }
      web.oc.cpxd();
      web.oc.bth();
      //console.log("up_cpxd dl=", JSON.stringify(dl));
    },
    up_cpvt: (dl) => {
      if (dl.constructor !== Object) { return; }
      if (dl.chiphi === '...') {
        app.oc.cpvt.splice(dl.tt, 1);
      } else {
        app.oc.cpvt[dl.tt] = dl;
      }
      web.oc.cpvt();
      web.oc.bth();
    },
    up_cpvl: (dl) => {
      if (dl.constructor !== Object) { return; }
      if (dl.chiphi === '...') {
        app.oc.cpvl.splice(dl.tt, 1);
      } else {
        app.oc.cpvl[dl.tt] = dl;
      }
      web.oc.cpvl();
      web.oc.bth();
    },
  },



  tlmd: {

  },
  cpql: (idma = null) => {
    let zone, kiem, bang, rec, self;
    zone = d3.select("section[id='cpql']");
  },
  tiendo: (ten = '', cv = 0) => {
    ten = fn.a2s(ten);
    cv = fn.a2i(cv);
    let hg, zone = d3.select("#tiendo")
    if (cv === 100) {
      zone.selectAll("*").remove();
      if (hg) { clearTimeout(hg); }
    } else {
      zone.selectAll("*").remove();
      zone.append("label").text(ten);
      zone.append("progress")
        .attr("max", 100)
        .attr("value", cv)
        .text([cv, "%"].join(''));
      hg = setTimeout(web.tiendo(), 300);
    }
  },
  hov_intag: (tagid = null) => {
    let tag, zone, row, col,
      hov = "yellow",
      act = "#888fff";
    try {
      tagid ? web.tagid = tagid : tagid = web.tagid;
      tag = tagid.split('__');
    } catch (err) { return; }
    zone = tag[0];
    row = tag[1];
    col = tag[2];
    if (zone.charAt(0) == '#') { zone = zone.substr(1); }
    tag = ['.', zone, '.r', row].join('');
    d3.selectAll(tag)
      .each(function () {
        let o = d3.select(this);
        o.style("background-color", hov);
      });
    tag = ['.', zone, '.c', col].join('');
    d3.selectAll(tag)
      .each(function () {
        let o = d3.select(this);
        o.style("background-color", hov);
      });
    if (tagid.charAt(0) != '#') { tagid = ['#', tagid].join(''); }
    d3.selectAll(tagid)
      .each(function () {
        let o = d3.select(this);
        o.style("background-color", act);
      });
  },
  hov_outtag: (tagid = null) => {
    let tag, zone, row, col;
    try {
      tagid ? web.tagid = tagid : tagid = web.tagid;
      tag = tagid.split('__');
    } catch (err) { return; }
    zone = tag[0];
    row = tag[1];
    col = tag[2];
    if (zone.charAt(0) == '#') { zone = zone.substr(1); }
    tag = ['.', zone, '.r', row].join('');
    d3.selectAll(tag).style("background-color", "transparent");
    tag = ['.', zone, '.c', col].join('');
    d3.selectAll(tag).style("background-color", "transparent");
  },
  move2id: (row = 0, col = 0, maxR = 0, maxC = 1) => {
    console.log("start move2id=", web.tagid, " row=", row, " col=", col);
    if (!row && !col) { return; }
    let tagid, tag, zone, el;
    try {
      tagid = web.tagid;
      tag = tagid.split('__');
    } catch (err) { return; }
    if (tagid.charAt(0) != '#') { tagid = ['#', tagid].join(''); }
    zone = tag[0].toLowerCase();
    if (zone.charAt(0) == '#') { zone = zone.substr(1); }
    row = parseInt(tag[1]) + parseInt(row);
    col = parseInt(tag[2]) + parseInt(col);
    switch (zone) {
      case 'oc_cpxd':
        maxR = app.oc.cpxd.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpvt';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpvl';
          row = app.oc.cpvl.length + 1;
          col = 0;
        };
        break;
      case 'oc_cpvt':
        maxR = app.oc.cpvt.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpvl';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpxd';
          row = app.oc.cpxd.length + 1;
          col = 0;
        };
        break;
      case 'oc_cpvl':
        maxR = app.oc.cpvl.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpxd';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpvt';
          row = app.oc.cpvt.length + 1;
          col = 0;
        };
        break;
      case 'on_cpxd':
        maxR = app.on.cpxd.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'on_cpvt';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'on_cpvl';
          row = app.on.cpvl.length + 1;
          col = 0;
        };
        break;
      case 'on_cpvt':
        maxR = app.on.cpvt.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'on_cpvl';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'on_cpxd';
          row = app.on.cpxd.length + 1;
          col = 0;
        };
        break;
      case 'on_cpvl':
        maxR = app.on.cpvl.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'on_cpxd';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'on_cpvt';
          row = app.on.cpvt.length + 1;
          col = 0;
        };
        break;
      default:
        maxR = maxR;
        maxC = maxC;
    }
    col > maxC ? col = 0 : col < 0 ? col = maxC : col;
    console.log("move2id hov_outtag tagid=", JSON.stringify(tagid));
    web.hov_outtag(tagid);
    tag = [zone, row, col].join('__');
    web.olua(tag);
  },
  olua: (tagid = null) => {
    console.log("olua start tagid=", tagid, " web.tagig=", web.tagid);
    //try {
    if (tagid.charAt(0) != '#') { tagid = ['#', tagid].join(''); }
    let el = d3.select(tagid).node();
    el.focus();
    if (el && ['INPUT', 'TEXTAREA'].includes(el.tagName)) {
      el.select();
    }
    if (tagid.charAt(0) == '#') { tagid = tagid.substr(1); }
    web.tagid = tagid;
    //} catch (err) { return; }
    web.hov_intag(tagid);
    console.log("olua end tagid=", tagid, " web.tagig=", web.tagid);
  },
  box: {
    hov: { mau1: "#9999ff" },
    chiphi(el, dl, stim = null) {
      if (dl.constructor !== Object) { return; }
      let plcp;
      try {
        plcp = dl.plcp.toString().toLowerCase();
        if (!(['cpxd', 'cpvt', 'cpvl', 'cptl'].includes(plcp))) { return; }
      } catch (err) { return; }
      try {
        stim = stim.toString().toLowerCase();
      } catch (err) { stim = ''; }

      console.log("open box chiphi", JSON.stringify(app.chiphi));
      let zone, k, r, ss, row,
        zdl = ga.chiphi,
        dulieu = [
          { id: "Mã chi phí", show: "Mô tả chi phí", dvt: "Đvt" },
          { id: "...", show: "(Không chọn)", dvt: "" },
        ];
      for (k in zdl) {
        r = { ...zdl[k] };
        ss = JSON.stringify(r).toLowerCase();
        if (r.plcp === plcp && ss.includes(stim)) {
          r.id = k;
          r.show = ham.stomau(r.mota.qtgt, stim);
          r.dvt = ham.stomau(r.dvt, stim);
          dulieu.push(r);
        }
      }
      d3.selectAll("#xem").remove();
      zone = d3.select(el).append("ol")
        .attr("id", "xem")
        .style("list-style", "none")
        .style("margin", 0)
        .style("padding", 0)
        .style("max-height", "10.25rem")
        .style("overflow-y", "auto")
        .style("border", "1px solid #d4d4d4");
      //noidung chon
      row = zone.selectAll("li").data(dulieu)
        .enter()
        .append("li")
        .attr("id", (d, i) => ['chiphi', i, 0].join('__'))
        .attr("class", (d, i) => i == 0 ? 'nen0' : 'l')
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content)/3fr 8fr 1fr")
        .on("click", (ev, d) => {
          //ev.preventDefault();
          if (ev.target.id != 'chiphi__0__0') {
            dl.chiphi = d.id;
            zone.remove();
            plcp = ['up_', plcp].join('');
            web[dl.plqt][plcp](dl);
          }
        });
      //o chi tiet
      row.append("div")
        .attr("id", (d, i) => ['chiphi', i, 1].join('__'))
        .attr("class", (d, i) => {
          ss = ['fb fito chiphi r', i, ' c1'].join('');
          if (i == 0) {
            return ['c u', ss].join(' ');
          } else {
            return ['l', ss].join(' ');
          }
        })
        .style("line-height", "100%")
        //.style("grid-area", "1/1/3/2")
        .html(d => d.id);
      row.append("div")
        .attr("id", (d, i) => ['chiphi', i, 2].join('__'))
        .attr("class", (d, i) => {
          if (i == 0) {
            return ['c u fb chiphi r', i, ' c2'].join('');
          } else {
            return ['l fb chiphi r', i, ' c2'].join('');
          }
        })
        .style("line-height", "100%")
        .html(d => d.show);
      row.append("div")
        .attr("id", (d, i) => ['chiphi', i, 3].join('__'))
        .attr("class", (d, i) => {
          if (i == 0) {
            return ['c u fb chiphi r', i, ' c3'].join('');
          } else {
            return ['l fb chiphi r', i, ' c3'].join('');
          }
        })
        .style("line-height", "100%")
        .html(d => d.dvt);
      //hov div
      row.selectAll('div')
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
    },
    cpql: () => {
      let zond = d3.select("ga_cpql").attr("data-macpql", "20200827");
      zone.selectAll("option").data(ga.tieude.cptl)
        .enter()
        .append("option")
        .attr("class", "c")
        .text((col) => col);
    },
  },
};

const ga = {

};

