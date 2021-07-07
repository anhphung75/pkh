import { lamtronso, a2s, a2sl, a2i } from "./../../utils.js";

d3.formatDefaultLocale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "VNĐ"]
});

const fn = {
  a2s: (dl) => {
    try {
      if (dl === undefined || dl === null) {
        return "";
      } else if (dl.constructor === String) {
        return dl.toString();
      } else {
        return JSON.stringify(dl);
      }
    } catch (err) {
      return "";
    }
  },
  a2sl: (dl) => {
    return fn.a2s(dl).toLowerCase();
  },
  a2su: (dl) => {
    return fn.a2s(dl).toUpperCase();
  },
  a2i: (dl) => {
    let kq;
    try {
      kq = parseInt(dl);
    } catch (err) {
      kq = -1;
    }
    return kq;
  },
  sregexp: (stim) => {
    stim = fn.a2s(stim);
    if (stim.length < 1) {
      return stim;
    }
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
  stomau: (sgoc, stim, mausac = "red") => {
    try {
      sgoc = a2s(sgoc);
      stim = a2s(stim);
      if (stim.length < 1) {
        return sgoc;
      }
    } catch (err) {
      return sgoc;
    }
    let mau = fn.sregexp(stim);
    mau = new RegExp(mau, "gi");
    sgoc = sgoc.replace(mau, (m) => {
      if (m === undefined || m === null || m === "") {
        return;
      }
      return ["<b style='color:", mausac, "'>", m, "</b>"].join("");
    });
    return sgoc;
  }
};

// TTDL //
//dữ liệu chung thô, catch
var ga = {
  tjan: Date.now(),
  cv: 0,
  zcv: 1,
  tc: 1,
  tv: 222,
  cpx: {
    1: {
      plcp: "cpxd",
      barcode: "",
      qrcode: "",
      mota: "cp1",
      dvt: "cai",
      "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }
    },
    2: {
      plcp: "cpxd",
      barcode: "",
      qrcode: "",
      mota: "cp2",
      dvt: "cai",
      "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }
    },
    3: {
      plcp: "cpxd",
      barcode: "",
      qrcode: "",
      mota: "cp3",
      dvt: "cai",
      "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }
    }
  }
};

const sw = {
  url: null,
  nv: {},
  moi: function (w = 1) {
    let z8 = this;
    if (window.Worker) {
      if (!z8.url) {
        z8.url = d3.select("#qtgt").attr("data-nv");
      }
    }
    z8.nv[w] = new Worker(z8.url);
    return z8.nv[w];
  },
  xoa: function (w = 1) {
    let z8 = this;
    if (z8.nv[w]) {
      z8.nv[w].terminate();
    }
    z8.nv[w] = null;
  }
};

const idb = {
  csdl: { ten: "CnTĐ", cap: 1 },
  ztg: 222,
  taodb: () => {
    let indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    if (!indexedDB) {
      console.log("khong ho tro idb");
      return null;
    }
    try {
      let db,
        idx,
        ten = idb.csdl.ten,
        cap = idb.csdl.cap,
        yc = indexedDB.open(ten, cap);
      yc.onupgradeneeded = (e) => {
        db = e.target.result;
        if (e.oldVersion < cap) {
          idx = db.createObjectStore("tttt", { keyPath: "tttt" });
          idx = db.createObjectStore("hoso", { keyPath: "idma" });
          idx = db.createObjectStore("khachhang", { keyPath: "idma" });
          idx = db.createObjectStore("khuvuc", { keyPath: "idma" });
          idx = db.createObjectStore("dot", { keyPath: "idma" });
          idx = db.createObjectStore("donvithicong", { keyPath: "idma" });
          idx = db.createObjectStore("hoancong", { keyPath: "idma" });
          idx = db.createObjectStore("trongai", { keyPath: "idma" });
          //chiphi
          idx = db.createObjectStore("chiphi", { keyPath: "idma" });
          idx = db.createObjectStore("chiphiquanly", { keyPath: "idma" });
          //baogia
          idx = db.createObjectStore("bgvl", { keyPath: "idma" });
          idx = db.createObjectStore("bgnc", { keyPath: "idma" });
          idx = db.createObjectStore("bgmtc", { keyPath: "idma" });
          idx = db.createObjectStore("bgtl", { keyPath: "idma" });
          //qtvt
          idx = db.createObjectStore("qtvt", { keyPath: "idma" });
          idx = db.createObjectStore("qtvt_cpvt", { keyPath: "idma" });
          //qtgt
          idx = db.createObjectStore("qtgt", { keyPath: "idma" });
          idx = db.createObjectStore("cpxd", { keyPath: "idma" });
          idx = db.createObjectStore("cpvl", { keyPath: "idma" });
          idx = db.createObjectStore("cpvt", { keyPath: "idma" });
          idx = db.createObjectStore("cptl", { keyPath: "idma" });
          //scan
          idx = db.createObjectStore("scan", { keyPath: "idma" });
          //web
          idx = db.createObjectStore("nhanvien", { keyPath: "idma" });
        }
      };
    } catch (err) {}
  },
  xem: (bien) => {
    console.log("ct-idb.xem ", bien, "=", JSON.stringify(bien, null, 2));
  },
  gom: {
    cpx: (dk = { prog: "cpx", otim: null, gop: false }, cg3 = 0) => {
      let w,
        hoi,
        dap,
        d1r,
        d1s,
        k,
        r,
        prog,
        d8 = ga.cpx;
      //try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) return;
      dk.prog = "cpx";
      prog = [dk.prog, fn.a2s(Date.now())].join("_");
      //main
      w = sw.moi("cpx");
      hoi = {
        csdl: idb.csdl,
        gom: dk
      };
      console.log("idb.gom.cpx hoi=", JSON.stringify(hoi, null, 2));
      w.postMessage(hoi);
      w.onmessage = (e) => {
        dap = e.data;
        if (dap.cv >= 0 && dap.cv <= 100) {
          d1r = dk.prog in dap ? dap[dk.prog] : {};
          k = d1r.idma || d1r.maid;
          if ("ttdl" in d1r || "data" in d1r) {
            r = d1r.ttdl || d1r.data;
            d1s = { ...d8[k] };
            if (!(k in d8) || d1r.tjan > d1s.tjan) {
              d1s = {};
              d1s.idma = r.idma || Date.now();
              d1s.maid = r.maid || d1s.idma;
              d1s.plcp = r.plcp || "cpvt";
              d1s.mota = r.mota.qtgt || r.mota || "...";
              d1s.dvt = r.dvt || "...";
              d1s.tjan = d1r.tjan || Date.now();
              d8[k] = d1s;
            }
          }
          tiendo(prog, dap.cv);
        } else if (dap.cv < 0 || dap.cv > 100) {
          sw.xoa("cpx");
          console.log("nv fin=", JSON.stringify(dap, null, 2));
          idb.xem(ga.cpx);
        } else if ("err" in dap) {
          console.log("nv err=", JSON.stringify(dap.err, null, 2));
        } else if ("info" in dap) {
          console.log("nv info=", JSON.stringify(dap.info, null, 2));
        } else {
          console.log("nv dap=", JSON.stringify(dap, null, 2));
        }
      };

      //} catch (err) {
      //  cg3 += 1;
      //  setTimeout(() => idb.gom.cpx(cg3), idb.ztg);
      //}
    }
  },
  nap: {
    idma: (dk = { prog: "qtgt", idma: null }, cg3 = 0) => {
      let w, hoi, dap, d1r, d1s, _prog;
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) {
          return;
        }
        if (Object.keys(dk).length < 1) {
          return;
        }
        dk.prog = fn.a2sl(dk.prog);
        dk.idma = fn.a2i(dk.idma);
        d1s = window[dk.prog];
        _prog = [dk.prog, dk.idma].join("_");
        //main
        w = sw.moi();
        hoi = {
          csdl: idb.csdl,
          idma: dk
        };
        console.log("idb.nap.idma hoi=", JSON.stringify(hoi, null, 2));
        w.postMessage(hoi);
        w.onmessage = (e) => {
          dap = e.data;
          if (dap.cv === 100) {
            web.tiendo(_prog, dap.cv);
            d1r = "idma" in dap ? dap.idma : {};
            if ("ttdl" in d1r || "data" in d1r) {
              d1s.ttdl = d1r.ttdl || d1r.data;
              d1s.cv = 1;
            }
            if ("tttt" in d1r || "refs" in d1r) {
              d1s.tttt = d1r.tttt || d1r.refs;
              d1s.cv = 1;
            }
          } else if (dap.cv >= 0 && dap.cv < 100) {
            tiendo(_prog, dap.cv);
          } else if (dap.cv < 0 || dap.cv > 100) {
            sw.xoa(w);
            console.log("nv fin=", JSON.stringify(dap, null, 2));
          } else if ("err" in dap) {
            console.log("nv err=", JSON.stringify(dap.err, null, 2));
          } else if ("info" in dap) {
            console.log("nv info=", JSON.stringify(dap.info, null, 2));
          } else {
            console.log("nv dap=", JSON.stringify(dap, null, 2));
          }
          console.log(
            "idb.nap.idma ",
            dk.prog,
            "=",
            JSON.stringify(d1s, null, 2)
          );
        };
      } catch (err) {
        cg3 += 1;
        setTimeout(() => {
          idb.nap.idma(cg3);
        }, idb.ztg);
      }
    },
    baogia: (
      dk = {
        prog: "bgvl",
        chiphi: null,
        baogia: null,
        plgia: "dutoan",
        plbg: "bgvl"
      },
      cg3 = 0
    ) => {
      let w, hoi, dap, d1r, d1s, _prog, chiphi, baogia, plgia, k, i, k2;
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) {
          return;
        }
        if (Object.keys(dk).length < 1) {
          return;
        }
        dk.plbg = fn.a2sl(dk.plbg);
        dk.prog = fn.a2sl(dk.prog || dk.plbg);
        dk.chiphi = fn.a2i(dk.chiphi);
        k2 = qtgt.mabaogia(dk.plgia, dk.baogia);
        dk.plgia = qtgt.ttdl.plgia;
        dk.baogia = qtgt.ttdl.baogia;
        d1s = ga.cpx[dk.chiphi][k2];
        if (!d1s) {
          return;
        }
        _prog = [dk.prog, k2, dk.chiphi].join("_");
        //main
        w = sw.moi();
        hoi = {
          csdl: idb.csdl,
          baogia: dk
        };
        console.log("idb.nap.baogia hoi=", JSON.stringify(hoi, null, 2));
        w.postMessage(hoi);
        w.onmessage = (e) => {
          dap = e.data;
          if (dap.cv === 100) {
            tiendo(_prog, dap.cv);
            d1r = dap || { giavl: 0, gianc: 0, giamtc: 0, giatl: 0 };
            if (dk.prog.includes("nc")) {
              d1s.gianc = d1r.gianc;
            } else if (dk.prog.includes("mtc")) {
              d1s.giamtc = d1r.giamtc;
            } else if (dk.prog.includes("tl")) {
              d1s.giatl = d1r.giatl;
            } else {
              d1s.giavl = d1r.giavl;
            }
          } else if (dap.cv >= 0 && dap.cv < 100) {
            tiendo(_prog, dap.cv);
          } else if (dap.cv < 0 || dap.cv > 100) {
            sw.xoa(w);
            console.log("nv fin=", JSON.stringify(dap, null, 2));
          } else if ("err" in dap) {
            console.log("nv err=", JSON.stringify(dap.err, null, 2));
          } else if ("info" in dap) {
            console.log("nv info=", JSON.stringify(dap.info, null, 2));
          } else {
            console.log("nv dap=", JSON.stringify(dap, null, 2));
          }
          console.log("idb.nap.cpx _cpx=", JSON.stringify(_cpx, null, 2));
        };
      } catch (err) {
        cg3 += 1;
        setTimeout(() => {
          idb.nap.baogia(cg3);
        }, idb.ztg);
      }
    }
  },
  luu: {}
};

// WEB VIEW //
//web app dùng chung
var wa = {
  tagid: "",
  hov_intag: (tagid = null) => {
    let tag,
      zone,
      row,
      col,
      hov = "yellow",
      act = "#888fff";
    try {
      tagid ? (web.tagid = tagid) : (tagid = web.tagid);
      tag = tagid.split("__");
    } catch (err) {
      return;
    }
    zone = tag[0];
    row = tag[1];
    col = tag[2];
    zone.charAt(0) == "#" ? (zone = zone.substr(1)) : 0;
    tag = [".", zone, ".r", row].join("");
    d3.selectAll(tag).each(function () {
      let o = d3.select(this);
      o.style("background-color", hov);
    });
    tag = [".", zone, ".c", col].join("");
    d3.selectAll(tag).each(function () {
      let o = d3.select(this);
      o.style("background-color", hov);
    });
    if (tagid.charAt(0) != "#") {
      tagid = ["#", tagid].join("");
    }
    d3.selectAll(tagid).each(function () {
      let o = d3.select(this);
      o.style("background-color", act);
    });
  },
  hov_outtag: (tagid = null) => {
    let tag, zone, row, col;
    try {
      tagid ? (web.tagid = tagid) : (tagid = web.tagid);
      tag = tagid.split("__");
    } catch (err) {
      return;
    }
    zone = tag[0];
    row = tag[1];
    col = tag[2];
    if (zone.charAt(0) == "#") {
      zone = zone.substr(1);
    }
    tag = [".", zone, ".r", row].join("");
    d3.selectAll(tag).style("background-color", "transparent");
    tag = [".", zone, ".c", col].join("");
    d3.selectAll(tag).style("background-color", "transparent");
  },
  move2id: (row = 0, col = 0, maxR = 0, maxC = 1) => {
    console.log("start move2id=", web.tagid, " row=", row, " col=", col);
    if (!row && !col) {
      return;
    }
    let tagid, tag, zone, el;
    try {
      tagid = web.tagid;
      tag = tagid.split("__");
    } catch (err) {
      return;
    }
    if (tagid.charAt(0) != "#") {
      tagid = ["#", tagid].join("");
    }
    zone = tag[0].toLowerCase();
    if (zone.charAt(0) == "#") {
      zone = zone.substr(1);
    }
    row = parseInt(tag[1]) + parseInt(row);
    col = parseInt(tag[2]) + parseInt(col);
    switch (zone) {
      case "oc_cpxd":
        maxR = app.oc.cpxd.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = "oc_cpvt";
          row = 1;
          col = 0;
        }
        if (row < 0) {
          zone = "oc_cpvl";
          row = app.oc.cpvl.length + 1;
          col = 0;
        }
        break;
      case "oc_cpvt":
        maxR = app.oc.cpvt.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = "oc_cpvl";
          row = 1;
          col = 0;
        }
        if (row < 0) {
          zone = "oc_cpxd";
          row = app.oc.cpxd.length + 1;
          col = 0;
        }
        break;
      case "oc_cpvl":
        maxR = app.oc.cpvl.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = "oc_cpxd";
          row = 1;
          col = 0;
        }
        if (row < 0) {
          zone = "oc_cpvt";
          row = app.oc.cpvt.length + 1;
          col = 0;
        }
        break;
      case "on_cpxd":
        maxR = app.on.cpxd.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = "on_cpvt";
          row = 1;
          col = 0;
        }
        if (row < 0) {
          zone = "on_cpvl";
          row = app.on.cpvl.length + 1;
          col = 0;
        }
        break;
      case "on_cpvt":
        maxR = app.on.cpvt.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = "on_cpvl";
          row = 1;
          col = 0;
        }
        if (row < 0) {
          zone = "on_cpxd";
          row = app.on.cpxd.length + 1;
          col = 0;
        }
        break;
      case "on_cpvl":
        maxR = app.on.cpvl.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = "on_cpxd";
          row = 1;
          col = 0;
        }
        if (row < 0) {
          zone = "on_cpvt";
          row = app.on.cpvt.length + 1;
          col = 0;
        }
        break;
      default:
        maxR = maxR;
        maxC = maxC;
    }
    col > maxC ? (col = 0) : col < 0 ? (col = maxC) : col;
    console.log("move2id hov_outtag tagid=", JSON.stringify(tagid));
    web.hov_outtag(tagid);
    tag = [zone, row, col].join("__");
    web.olua(tag);
  },
  olua: (tagid = wa.tagid) => {
    console.log("olua start tagid=", tagid, " web.tagig=", web.tagid);
    //try {
    if (tagid.charAt(0) != "#") {
      tagid = ["#", tagid].join("");
    }
    let el = d3.select(tagid).node();
    el.focus();
    if (el && ["INPUT", "TEXTAREA"].includes(el.tagName)) {
      el.select();
    }
    if (tagid.charAt(0) == "#") {
      tagid = tagid.substr(1);
    }
    web.tagid = tagid;
    //} catch (err) { return; }
    web.hov_intag(tagid);
    console.log("olua end tagid=", tagid, " web.tagig=", web.tagid);
  }
};

//components
const tiendo = (sv = "", cv = 0) => {
  sv = fn.a2s(sv);
  let zone,
    cv0,
    elid,
    el = ["tiendo", ...sv.split(" ")].join("_"),
    rong = "18rem";
  el = el.split(".").join("_");
  elid = ["#", el].join("");
  cv = cv < 0 ? 0 : fn.a2i(cv % 101);
  zone = d3.select("#tiendo").select(elid);
  if (!zone.node()) {
    cv0 = "0";
    zone = d3
      .select("#tiendo")
      .append("li")
      .attr("id", el)
      .style("width", rong);
  } else {
    cv0 = zone.attr("data-cv");
  }
  zone.attr("data-cv", cv);
  zone.selectAll("*").remove();
  zone.append("div").attr("class", "c ba w100").html(sv);
  zone
    .append("div")
    .attr("class", "c")
    .style("background-color", "green")
    .style("color", "white")
    .style("width", cv0 + "%")
    .html(cv + " %")
    .transition()
    .duration(777)
    .style("width", cv + "%");
  if (cv === 100) {
    zone.transition().delay(77).remove();
  }
};
const hoso = {
  cv: 0,
  zcv: 0,
  idma: 123,
  idmau: 12345,
  tttt: {
    maid: "2021.HS000001",
    khachhang: { idma: 123, maid: "2021.KH000001" },
    dot: { idma: 123, maid: "2020.GMMP001" },
    qtgt: { idma: 123, maid: "2020.GMMP001.HC01.001" },
    khuvuc: { idma: 123, maid: "0202" },
    dvtc: { idma: 123, maid: "dvtc001" }
  },
  ttdl: {
    khachhang: "Nguyễn Văn A",
    diachi: "123456 Trần Văn Thời, Kp.3, P.Tăng Nhơn Phú A, Tp.Thủ Đức"
  },
  status: "ok",
  lastupdate: Date.now()
};
const qtgt = {
  cv: 0,
  zcv: 1,
  ztg: 777,

  mau: { idma: 12345, maid: 12345, gxd: 0 },
  d8n: {
    idma: 123
  },
  d8s: {
    idma: 123,
    tttt: {
      maid: "2020.GMMP001.HC01.001",
      oc_cpxd: { idma: 123, maid: "kh001" },
      oc_cpvt: { idma: 123, maid: "kh001" },
      oc_cpvl: { idma: 123, maid: "kh001" },
      oc_cptl: { idma: 123, maid: "kh001" },
      on_cpxd: { idma: 123, maid: "kh001" },
      on_cpvt: { idma: 123, maid: "kh001" },
      on_cpvl: { idma: 123, maid: "kh001" },
      on_cptl: { idma: 123, maid: "kh001" },
      cpql: { idma: 123, maid: "kh001" }
    },
    ttdl: {
      baogia: 20200827,
      plgia: "dutoan",
      sodhn: 1,
      gxd: 0,
      tienkhach: 0,
      tienung: 0,
      tiencty: 0,
      ngaylap: 20210101,
      nguoilap: ""
    },
    info: "sua",
    tjan: Date.now()
  },
  d8l: {
    idma: 123,
    tttt: {
      maid: "2020.GMMP001.HC01.001",
      oc_cpxd: { idma: 123, maid: "kh001" },
      oc_cpvt: { idma: 123, maid: "kh001" },
      oc_cpvl: { idma: 123, maid: "kh001" },
      oc_cptl: { idma: 123, maid: "kh001" },
      on_cpxd: { idma: 123, maid: "kh001" },
      on_cpvt: { idma: 123, maid: "kh001" },
      on_cpvl: { idma: 123, maid: "kh001" },
      on_cptl: { idma: 123, maid: "kh001" },
      cpql: { idma: 123, maid: "kh001" }
    },
    ttdl: {
      baogia: 20200827,
      plgia: "dutoan",
      sodhn: 1,
      gxd: 0,
      tienkhach: 0,
      tienung: 0,
      tiencty: 0,
      ngaylap: 20210101,
      nguoilap: ""
    },
    info: "ok",
    tjan: Date.now()
  },

  mabaogia: function (plgia = null, baogia = null) {
    plgia = fn.a2sl(plgia || this.d8s.ttdl.plgia || this.d8n.ttdl.plgia);
    baogia = fn.a2sl(baogia || this.d8s.ttdl.baogia || this.d8n.ttdl.baogia);
    this.d8s.ttdl.plgia = plgia;
    this.d8s.ttdl.baogia = baogia;
    return [plgia, baogia].join(".");
  },
  nap: (cg3 = 0) => {
    let cv, r, i, k, isok, z8, r8, d8, plgia, baogia, cpql;
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) {
        return;
      }
      z8 = qtgt;
      r8 = z8.tttt;
      d8 = z8.ttdl;
      z8.idma = fn.a2i(z8.idma);
      if (qtgt.idma < 1) {
        return;
      }
      z8.cv = 0;
      z8.zcv = 1;
      plgia = r8.plgia || d8.plgia || "dutoan";
      baogia = r8.baogia || d8.baogia;
      cpql = r8.cpql || d8.cpql;
      r8 = {};
      d8 = {};
      r8.baogia = baogia;
      r8.plgia = plgia;
      r8.cpql = cpql;
      idb.nap.qtgt({ prog: "qtgt", idma: z8.idma });
    } catch (err) {
      cg3 += 1;
      setTimeout(() => {
        qtgt.nap(cg3);
      }, qtgt.ztg);
      return;
    }
    console.log("end ct qtgt.nap=", JSON.stringify(qtgt, null, 2));
  }
};
const oc_cpxd = {
  ten: "oc_cpxd",
  cv: 0,
  zcv: 1,
  ztg: 111,
  tjan: Date.now(),
  idma: 123,
  zs: {
    idma: 123,
    refs: {
      maid: "2020.GMMP001.HC01.001"
    },
    data: [
      { chiphi: 1, soluong: 1 },
      { chiphi: 2, soluong: 2 }
    ],
    info: "oKtra",
    tjan: Date.now()
  },
  d8: {},
  l8: [
    {
      tt: 0,
      chiphi: 100,
      soluong: 0.1,
      mota: "cp1",
      dvt: "cai",
      giavl: 100,
      gianc: 20,
      giamtc: 5000,
      tienvl: 0,
      tiennc: 10,
      tienmtc: 20
    },
    {
      tt: 1,
      chiphi: 200,
      soluong: 0.2,
      mota: "cp2",
      dvt: "cai",
      giavl: 102,
      gianc: 60,
      giamtc: 80,
      tienvl: 0,
      tiennc: 200,
      tienmtc: 220
    },
    {
      tt: 2,
      chiphi: 300,
      soluong: 0.3,
      mota: "cp3",
      dvt: "cai",
      giavl: 500,
      gianc: 10,
      giamtc: 100,
      tienvl: 0,
      tiennc: 300,
      tienmtc: 330
    }
  ],
  l8_: [
    {
      tt: 3,
      chiphi: 0,
      soluong: 0,
      mota: "",
      dvt: "",
      giavl: 0,
      gianc: 0,
      giamtc: 0,
      tienvl: 0,
      tiennc: 0,
      tienmtc: 0
    }
  ],
  nap: function (cg3 = 0) {
    let i,
      r,
      z8 = this,
      d8 = z8.d8 || {},
      l8 = z8.l8 || [];
    try {
      console.log(
        "start ct ",
        z8.ten,
        ".nap this=",
        JSON.stringify(z8, null, 2)
      );
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) return;
      z8.idma = fn.a2i(z8.idma);
      if (z8.idma < 0) return;
      if (z8.idma in d8) {
        z8.cv = 1;
        z8.zcv = 1;
        l8 = d8[z8.idma];
      } else {
        z8.cv = 0;
        z8.zcv = 1;
        //set defa soluong=0
        for (i in l8) {
          r = l8[i];
          r.soluong = 0;
          r.tienvl = 0;
          r.tiennc = 0;
          r.tienmtc = 0;
        }
        idb.nap.idma({ prog: z8.ten, idma: z8.idma });
      }
    } catch (err) {
      cg3 += 1;
      setTimeout(() => {
        z8.nap(cg3);
      }, z8.ztg);
      return;
    }
    console.log("end ct ", ten, ".nap this=", JSON.stringify(this, null, 2));
  },
  tinh: function (cg3 = 0) {
    let i,
      r,
      k,
      cp,
      bg,
      cv = 0,
      z8 = this,
      l8 = z8.l8 || [];
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) return;
    z8.zcv = l8.length;
    bg = qtgt.mabaogia();
    z8.cv = cg3 === 0 ? 0 : fn.a2i(z8.cv);
    for (i in l8) {
      r = l8[i];
      cp = _cpx.d8[r.chiphi];
      if (!("mota" in r) || !("dvt" in r)) {
        r.barcode = cp.barcode;
        r.qrcode = cp.qrcode;
        r.mota = cp.mota;
        r.dvt = cp.dvt;
      }
      r.soluong = lamtronso(Math.abs(r.soluong), 3);
      k = "giavl";
      if (!(k in r)) {
        r[k] = cp[bg][k];
      }
      r.tienvl = lamtronso(r.soluong * r[k], 0);
      k = "gianc";
      if (!(k in r)) {
        r[k] = cp[bg][k];
      }
      r.tiennc = lamtronso(r.soluong * r[k], 0);
      k = "giamtc";
      if (!(k in r)) {
        r[k] = cp[bg][k];
      }
      r.tienmtc = lamtronso(r.soluong * r[k], 0);
      if ("mota" in r && "giavl" in r && "gianc" in r && "giamtc" in r) {
        cv++;
      }
      if (cv > z8.cv) {
        z8.cv = cv;
        k = fn.a2i(100 * (cv / z8.zcv));
        web.tiendo(z8.ten, k);
      }
    }
    if (z8.cv !== z8.zcv) {
      setTimeout(() => {
        z8.tinh(1);
      }, z8.ztg);
    }
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => { z8.tinh(cg3); }, z8.ztg);
    //  return;
    //}
    console.log("end ct ", z8.ten, ".tinh=", JSON.stringify(this, null, 2));
    z8.xem(0);
  },
  xem: function (cg3 = 0) {
    let vz,
      vr,
      i,
      r,
      k,
      row,
      tagid,
      z8 = this,
      tag = fn.a2sl(z8.ten),
      l8 = z8.l8 || [];
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) return;
    for (i in l8) {
      r = l8[i];
      r.tt = i;
    }
    //main
    tag = tag.charAt(0) == "#" ? tag.substr(1) : tag;
    tagid = "#" + tag;
    vz = d3
      .select(tagid)
      .style("list-style", "none")
      .style("margin", 0)
      .style("padding", 0)
      .style("max-height", "10.25rem")
      .style("overflow-y", "auto")
      .style("border", "1px solid #d4d4d4");
    vz.selectAll("li").remove();
    row = vz.selectAll("li").data(l8);
    vr = row.exit().remove();
    vr = row.enter().append("li").attr("class", "grid qt3x");
    //tt crud
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "0"].join("__"))
      .attr("class", (d, i) => ["c bb fito", tag, "r" + i, "c0"].join(" "))
      .text((d) => d3.format("03d")(parseInt(d.tt) + 1));
    //mota
    vr.append("div")
      .attr("class", "bb")
      .append("textarea")
      .attr("id", (d, i) => [tag, i, "1"].join("__"))
      .attr("class", (d, i) => ["j w100 fito", tag, "r" + i, "c1"].join(" "))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text((d) => d.mota)
      .on("input", function (ev, d) {
        let el = ev.target.parentNode,
          stim = ev.target.value;
        d3.select(ev.target).classed("fito", false);
        ev.target.style.height = "auto";
        ev.target.style.height = [ev.target.scrollHeight, "px"].join("");
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
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "2"].join("__"))
      .attr("class", (d, i) => ["c bb", tag, "r" + i, "c2"].join(" "))
      .text((d) => d.dvt);
    vr.append("div")
      .attr("class", "bb")
      .append("textarea")
      .attr("id", (d, i) => [tag, i, "3"].join("__"))
      .attr("class", (d, i) => ["r f0 fito", tag, "r" + i, "c3"].join(" "))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text((d) => d3.format(",.3r")(d.soluong))
      .on("change", (ev, d) => {
        let v = Math.abs(parseFloat(ev.target.value)) || 0;
        if (v > 0) {
          l8[d.tt].soluong = v;
          ev.target.style.height = "auto";
          ev.target.style.height = [ev.target.scrollHeight, "px"].join("");
          z8.tinh(1);
        }
      })
      .on("keydown", function (ev, d) {
        if ([13].includes(ev.keyCode)) {
          ev.preventDefault();
          let v = Math.abs(parseFloat(ev.target.value)) || 0;
          if (v > 0) {
            l8[d.tt].soluong = v;
            ev.target.style.height = "auto";
            ev.target.style.height = [ev.target.scrollHeight, "px"].join("");
            z8.tinh(1);
          }
          //chuyen dong ke tiep
          web.tagid = ev.target.id;
          web.move2id(1, 0);
        }
      });
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "4"].join("__"))
      .attr("class", (d, i) => ["r bb fito", tag, "r" + i, "c4"].join(" "))
      .text((d) => d3.format(",.0r")(d.giavl));
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "5"].join("__"))
      .attr("class", (d, i) => ["r bb fito", tag, "r" + i, "c5"].join(" "))
      .text((d) => d3.format(",.0r")(d.gianc));
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "6"].join("__"))
      .attr("class", (d, i) => ["r bb fito", tag, "r" + i, "c6"].join(" "))
      .text((d) => d3.format(",.0r")(d.giamtc));
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "7"].join("__"))
      .attr("class", (d, i) => ["r bb fito", tag, "r" + i, "c7"].join(" "))
      .text((d) => d3.format(",.0r")(d.tienvl));
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "8"].join("__"))
      .attr("class", (d, i) => ["r bb fito", tag, "r" + i, "c8"].join(" "))
      .text((d) => d3.format(",.0r")(d.tiennc));
    vr.append("div")
      .attr("id", (d, i) => [tag, i, "9"].join("__"))
      .attr("class", (d, i) => ["r bb fito", tag, "r" + i, "c9"].join(" "))
      .text((d) => d3.format(",.0r")(d.tienmtc));
    //add hov
    k = "[id^=" + tag + "]";
    vr.selectAll(k)
      .on("mouseenter", (ev) => {
        console.log("ev.target=", ev.target);
        web.tagid = ev.target.id;
        web.hov_intag(web.tagid);
      })
      .on("mouseleave", (ev) => {
        web.tagid = ev.target.id;
        web.hov_outtag(web.tagid);
      });
    z8.moi();
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => { self.xem(cg3); }, self.ztg);
    //  return;
    //}
  },
  moi: function (cg3 = 0) {
    let vz,
      vr,
      i,
      r,
      k,
      row,
      tagid,
      z8 = this,
      tag = fn.a2sl(z8.ten),
      l1 = [{ ...z8.l8[0] }] || [],
      stt = z8.l8.length;
    console.log("start ct ", z8.ten, ".moi=", JSON.stringify(l1, null, 2));
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) return;
    for (i in l1) {
      r = l1[i];
      for (k in r) {
        if (r[k].constructor === Number) r[k] = 0;
        if (r[k].constructor === String) r[k] = "";
      }
      r.tt = stt;
    }
    //main
    tag = tag.charAt(0) == "#" ? tag.substr(1) : tag;
    tagid = "#" + tag + "_moi";
    vz = d3
      .select(tagid)
      .style("list-style", "none")
      .style("margin", 0)
      .style("padding", 0)
      .style("max-height", "10.25rem")
      .style("overflow-y", "auto")
      .style("border", "0px solid #d4d4d4");
    vz.selectAll("li").remove();
    row = vz.selectAll("li").data(l1);
    vr = row.exit().remove();
    vr = row.enter().append("li").attr("class", "grid qt3x");
    //tt crud
    vr.append("div")
      .attr("id", [tag, stt, "0"].join("__"))
      .attr("class", ["c bb fito", tag, "r" + stt, "c0"].join(" "))
      .text((d) => d3.format("03d")(parseInt(d.tt) + 1));
    //mota
    vr.append("div")
      .attr("class", "bb")
      .append("textarea")
      .attr("id", [tag, stt, "1"].join("__"))
      .attr("class", ["j w100 fito", tag, "r" + stt, "c1"].join(" "))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text((d) => d.mota)
      .on("input", function (ev, d) {
        let el = ev.target.parentNode,
          stim = ev.target.value;
        d3.select(ev.target).classed("fito", false);
        ev.target.style.height = "auto";
        ev.target.style.height = [ev.target.scrollHeight, "px"].join("");
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
    vr.append("div")
      .attr("id", [tag, stt, "2"].join("__"))
      .attr("class", ["c bb", tag, "r" + stt, "c2"].join(" "))
      .text((d) => d.dvt);
    vr.append("div")
      .attr("class", "bb")
      .append("textarea")
      .attr("id", [tag, stt, "3"].join("__"))
      .attr("class", ["r f0 fito", tag, "r" + stt, "c3"].join(" "))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text((d) => d3.format(",.3r")(d.soluong))
      .on("change", (ev, d) => {
        let v = Math.abs(parseFloat(ev.target.value)) || 0;
        if (v > 0) {
          l8[d.tt].soluong = v;
          ev.target.style.height = "auto";
          ev.target.style.height = [ev.target.scrollHeight, "px"].join("");
          z8.tinh(1);
        }
      })
      .on("keydown", function (ev, d) {
        if ([13].includes(ev.keyCode)) {
          ev.preventDefault();
          let v = Math.abs(parseFloat(ev.target.value)) || 0;
          if (v > 0) {
            l8[d.tt].soluong = v;
            ev.target.style.height = "auto";
            ev.target.style.height = [ev.target.scrollHeight, "px"].join("");
            z8.tinh(1);
          }
          //chuyen dong ke tiep
          web.tagid = ev.target.id;
          web.move2id(1, 0);
        }
      });
    vr.append("div")
      .attr("id", [tag, stt, "4"].join("__"))
      .attr("class", ["r bb fito", tag, "r" + stt, "c4"].join(" "))
      .text((d) => d3.format(",.0r")(d.giavl));
    vr.append("div")
      .attr("id", [tag, stt, "5"].join("__"))
      .attr("class", ["r bb fito", tag, "r" + stt, "c5"].join(" "))
      .text((d) => d3.format(",.0r")(d.gianc));
    vr.append("div")
      .attr("id", [tag, stt, "6"].join("__"))
      .attr("class", ["r bb fito", tag, "r" + stt, "c6"].join(" "))
      .text((d) => d3.format(",.0r")(d.giamtc));
    vr.append("div")
      .attr("id", [tag, stt, "7"].join("__"))
      .attr("class", ["r bb fito", tag, "r" + stt, "c7"].join(" "))
      .text((d) => d3.format(",.0r")(d.tienvl));
    vr.append("div")
      .attr("id", [tag, stt, "8"].join("__"))
      .attr("class", ["r bb fito", tag, "r" + stt, "c8"].join(" "))
      .text((d) => d3.format(",.0r")(d.tiennc));
    vr.append("div")
      .attr("id", [tag, stt, "9"].join("__"))
      .attr("class", ["r bb fito", tag, "r" + stt, "c9"].join(" "))
      .text((d) => d3.format(",.0r")(d.tienmtc));
    //add hov
    k = "[id^=" + tag + "]";
    vr.selectAll(k)
      .on("mouseenter", (ev) => {
        console.log("ev.target=", ev.target);
        web.tagid = ev.target.id;
        web.hov_intag(web.tagid);
      })
      .on("mouseleave", (ev) => {
        web.tagid = ev.target.id;
        web.hov_outtag(web.tagid);
      });
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => { self.xem(cg3); }, self.ztg);
    //  return;
    //}
  }
};

var box_chiphi = (el, dl) => {
  function nap(plcp = "cpvt", stim = "") {
    if (dl.constructor !== Object) {
      return;
    }
    try {
      plcp = fn.a2sl(plcp);
      if (!["cpxd", "cpvt", "cpvl", "cptl"].includes(plcp)) {
        plcp = "cpvt";
      }
    } catch (err) {
      plcp = "cpvt";
    }
    try {
      stim = fn.a2sl(stim);
    } catch (err) {
      stim = "";
    }
    let k,
      r,
      ss,
      rec,
      d8 = ga.cpx,
      l8 = [
        { maketoan: "Mã chi phí", mota: "Mô tả chi phí", dvt: "Đvt" },
        { maketoan: "...", mota: "(...)", dvt: "", maid: "" }
      ];
    for (k in d8) {
      r = { ...d8[k] };
      ss = [fn.a2sl(r.mota), fn.a2sl(r.dvt)].join(" ");
      rec = {};
      if (r.plcp === plcp && ss.includes(stim)) {
        rec.maketoan = r.maketoan;
        rec.mota = fn.stomau(r.mota, stim);
        rec.dvt = fn.stomau(r.dvt, stim);
        rec.maid = k;
        l8.push(rec);
      }
    }
    return l8;
  }
  function box(tagid = null) {
    try {
      if (tagid.charAt(0) != "#") {
        tagid = ["#", tagid].join("");
      }
    } catch (err) {
      return;
    }
    d3.selectAll("#box").remove();
    zone = d3
      .select(tagid)
      .append("ol")
      .attr("id", "box")
      .style("list-style", "none")
      .style("margin", 0)
      .style("padding", 0)
      .style("max-height", "10.25rem")
      .style("overflow-y", "auto")
      .style("border", "1px solid #d4d4d4");
  }
};

const app = {
  tc: 1,
  run: function (cg3 = 0) {
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) return;
      idb.taodb();
      idb.gom.cpx({ otim: "" }, 0);
      //cpx.wxem();
    } catch (err) {
      cg3 += 1;
      setTimeout(() => app.run(cg3), app.tc);
    }
  }
};

app.run();
