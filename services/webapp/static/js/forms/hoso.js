var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
  namlamviec: new Date().getFullYear().toString(),
  tttt: "",
  ltttt: [],
  mascan: '',
  otim: null,
  dulieu: {},
  tieude: [],
  noidung: [],
  colsBE: [],
  url: {},

  tao: () => {
    ga.lay_url();
    ga.lay_tieude();
  },

  lay_tieude: (bang = 0) => {
    switch (bang) {
      case "dshc":
        break;
      case "qtgt":
        break;
      default:
        ga.colsBE = ["stt", "tttt", "madvtc", "sodot", "sohoso", "khachhang", "diachigandhn", "ngaythietke", "codhn", "ngaylendot", "ngaythicong", "ngaytrongai",];
        ga.tieude = ["Stt", "Mã hồ sơ", "Đvtc", "Số đợt", "Số hồ sơ", "Khách hàng", "Địa chỉ gắn đhn", "Cỡ đhn", "Ngày thiết kế", "Ngày lên đợt", "Ngày thi công", "Ngày trở ngại",];
    }
  },

  lay_url: () => {
    ga.url["api"] = [
      ["https://", window.location.host, "/", ga.csdl.ten, "/api/hoso/", ga.namlamviec].join(''),
      ["https://", window.location.host, "/", ga.csdl.ten, "/api/dshc/", ga.namlamviec].join(''),
    ];
    ga.url["wss"] = ["wss://", window.location.host, "/", ga.csdl.ten, "/wss/hoso"].join('');
    ga.url["hon"] = d3.select("table[id='danhsach']").attr("data-hon");
  },

  lay_idb: () => {
    let w = { tttt: null };
    let gui = {
      csdl: { ten: "pkh", cap: 1 },
      lenh: "lay",
      bang: "",
      dk: "",
      kq: {},
    };
    //lay danhsach tttt
    w["tttt"] = new Worker(ga.url.hon);
    gui.lenh = "gom";
    gui.dk = { tttt: "all" };
    w["tttt"].postMessage(gui);
    w["tttt"].onmessage = (e) => {
      let tra = e.data;
      console.log("w[", i, "] tra=", JSON.stringify(tra, null, 2));
      if (tra.cv < 0) {
        console.log("tat kq.cv=", tra.cv);
        w[i].terminate();
        if ("err" in tra) {
          console.log("err=", tra.err);
        }
        return null;
      }
      ga.ltttt = tra.kq;
      //lay chitiet tttt
      let i,
        l = ga.ltttt.length - 1 || 0;
      for (i = 0; i < l; i++) {
        w[i] = new Worker(ga.url.hon);
        gui.lenh = "gom";
        gui.dk = { tttt: "all" };
        gui.otim = ga.otim;
        w[i].postMessage(gui);
        w[i].onmessage = (e) => {
          let tra = e.data;
          console.log("w[", i, "] tra=", JSON.stringify(tra, null, 2));
          if (tra.cv < 0) {
            console.log("tat kq.cv=", tra.cv);
            w[i].terminate();
            if ("err" in tra) {
              console.log("err=", tra.err);
            }
            return null;
          }
        };
      }
    };
  },
  //load tu idb loc theo otim
  lay_api: (bang = 0) => {
    d3.json(ga.url["api"][bang], {
      mode: "cors",
    }).then((res) => {
      console.log("main thread res from server=", JSON.stringify(res, null, 4));
      let dulieu = res.data || [];
      //lay dulieu
      let t = 0, rec, k, stim, kotim, tttt, keys; while (true) {
        try {
          rec = dulieu[t];
          stim = null;
          kotim = ["tttt", "uuid", "uid", "lastupdate", "inok", "scan", "blob", "tt", "stt",];
          tttt = rec.tttt || rec.uuid;
          if (!tttt) {
            tttt = Date.now();
            while (tttt in ga.dulieu) {
              tttt += 1;
            }
          }
          if (!(tttt in ga.dulieu)) {
            ga.dulieu[tttt] = { tttt: tttt };
          }
          for (k in rec) {
            if (["tttt", "uuid"].includes(k) === false) {
              ga.dulieu[tttt][k] = rec[k];
            }
            if (kotim.includes(k) === false) {
              if (stim) {
                stim = [
                  ...new Set([...stim, ...rec[k].toString().split(/\s+/)]),
                ];
              } else {
                stim = [...new Set([...rec[k].toString().split(/\s+/)])];
              }
            }
          }
          ga.dulieu[tttt]["stim"] = stim.join(" ").trim();
          t++;
        } catch (err) {
          break;
        }
      }
      //xep thu tu
      keys = Object.keys(ga.dulieu).sort();
      t = 1;
      for (k in keys) {
        ga.dulieu[keys[k]]["stt"] = d3.format("03,d")(t);
        t += 1;
      }
      ga.loc_otim();
    });
  },

  loc_otim: () => {
    ga.noidung = [];
    let k, keys, isok, i, ss, s;
    keys = Object.keys(ga.dulieu).sort();
    console.log("ga.dulieu=", ga.dulieu);
    console.log("keys=", keys);
    for (k in keys) {
      isok = true;
      for (i in ga.otim) {
        ss = ga.dulieu[keys[k]].stim;
        s = ga.otim[i];
        console.log("loc_otim ss=", s, " s=", s);
        if (ss.includes(s) === false) {
          isok = false;
          break;
        }
      }
      if (isok) {
        ga.noidung.push(ga.dulieu[keys[k]]);
      }
    }
    console.log("ga noidung=", ga.noidung);
    web.danhsach();
  },
};

var bien = {
  sregexp: (stim) => {
    if (!stim) {
      return stim;
    }
    let k,
      ltim = [...stim];
    let mau = "";
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
};

var web = {
  info: () => {
    d3.select("#info").text(JSON.stringify(ga, null, 2));
  },

  tao: () => {
    web.namlamviec();
    web.stim();
    web.don_otim();
    web.otim();
  },

  namlamviec: () => {
    d3.select("#namlamviec").on("change", function () {
      let namchu = this.value.toString();
      if (ga["namlamviec"] == namchu) {
        return;
      }
      if (/^\d+$/.test(namchu)) {
        ga["namlamviec"] = namchu;
      } else {
        switch (namchu) {
          case "":
          case "all":
          case "tat":
            ga["namlamviec"] = "";
            break;
          default:
            ga["namlamviec"] = new Date().getFullYear().toString();
        }
      }
      ga.lay_api();
    });
  },

  stim: () => {
    d3.select("#stim")
      .on("keydown", function (ev) {
        let s = this.value ? this.value.trim().toLowerCase() : "";
        let zone, h, d, c, t;
        switch (ev.keyCode) {
          case 13: //enter goto 1st hosoloc
            ga.otim = ga.otim || new Set();
            if (s !== "") {
              console.log("add stim=", s, " ga.otim=", ga.otim)
              ga.otim.add(s);
            }
            web.otim();
            //ga.loc_otim();
            web.info()
            break;
          case 45: //insert
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            web.otim();
            ga.loc_otim();
            this.value = "";
            break;
          case 38: //mui ten len
            zone = d3
              .select("table[id='danhsach']")
              .select("tbody")
              .selectAll("tr.mau");
            if (zone.empty()) {
              console.log("empty zone");
              ga.tttt = ga.ltttt[ga.ltttt.length - 1];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            } else {
              zone.classed("mau", false);
              t = ga.ltttt.indexOf(ga.tttt);
              ga.tttt = t < 1 ? ga.ltttt[ga.ltttt.length - 1] : ga.ltttt[t - 1];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            }
            web.hosochon(ga.tttt);
            break;
          case 40: //mui ten xuong
            zone = d3
              .select("table[id='danhsach']")
              .select("tbody")
              .selectAll("tr.mau");
            if (zone.empty()) {
              console.log("empty zone");
              ga.tttt = ga.ltttt[0];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("tr[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            } else {
              zone.classed("mau", false);
              t = ga.ltttt.indexOf(ga.tttt);
              ga.tttt = t > ga.ltttt.length - 2 ? ga.ltttt[0] : ga.ltttt[t + 1];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("tr[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            }
            web.hosochon(ga.tttt);
            break;
          default:
            console.log("btn=", ev.code, " keyCode=", ev.keyCode);
        }
      })
      .on("input", function () {
        console.log("oninput s=", this.value);
        web.danhsach(this.value);
      })
      .on("change", function () {
        console.log("onchange stim=", this.value);
      });
  },

  don_otim: () => {
    d3.select("#don-otim").on("click", function () {
      ga["otim"] = new Set([ga["namlamviec"]]);
      web.otim();
    });
  },

  otim: (dulieu = ga.otim) => {
    if (!dulieu) { return }
    d3.select("div[id='view_otim']").selectAll("*").remove();
    d3.select("#view_otim").selectAll("button").data(dulieu)
      .enter().append("button")
      .text((d) => d)
      .attr("class", "l b1px")
      .style("paddingLeft", "1em")
      .style("color", "red")
      .on("click", function (ev, d) {
        try {
          ga["otim"].delete(d);
          web.otim(ga.otim);
        } catch (error) { }
      })
      .on("mouseout", function (ev) {
        this.style.textDecoration = "none";
      })
      .on("mouseover", function (ev) {
        this.style.textDecoration = "line-through";
        console.log("btn mouseover=", ev.target);
      });
    //web.danhsach();
  },

  danhsach: (stim) => {
    let bang = d3.select("table[id='danhsach']")
      .attr("class", "w100")
      .style("table-layout", "auto")
      .style("border-collapse", "separate")
      .style("border-spacing", "1px 1px")
      .style("overflow", "auto")
      .style("margin", "0");

    //tieude
    bang.select("thead").selectAll("th").data(ga.tieude)
      .enter()
      .append("th")
      .attr("class", "c")
      .text((col) => col);

    //rows
    ga.ltttt = [];
    bang.select("tbody").selectAll("tr").remove();
    let row = bang.select("tbody").selectAll("tr").data(ga.noidung).enter().append("tr");
    row.attr("class", "l")
      .attr("data-tttt", (d) => d.tttt)
      .filter((d) => {
        stim = stim ? stim : "";
        let dk = d.stim.includes(stim);
        if (dk) {
          ga.ltttt.push(d.tttt);
        }
        return dk;
      })
      .on("mouseenter", (ev, d) => {
        bang.selectAll("tr").classed("mau test", false);
        d3.select(this).classed("mau test", true);
        console.log("row mouseenter d=", d);
        ga.tttt = d.tttt;
        web.hosochon(ga.tttt);
      })
      .on("mouseleave", function (ev, d) {
        console.log("row mouseleave ga.ltttt=", ga.ltttt);
        let t = ga.ltttt.indexOf(d.tttt);
        if (t === 0 || t + 1 === ga.ltttt.length) {
          console.log("row mouseleave return ev=", ev.target);
          return;
        }
        d3.select(this).classed("mau test", false);
        console.log("row mouseleave ev=", ev.target);
      });

    //col
    let cell = row.selectAll("td").data((d) => d3.permute(d, ga.colsBE))
      .enter().append("td");
    cell
      .attr("class", (d, i) => {
        let s = "l bb";
        if (i === 0) { s = "c bb" }
        if (i === 3) { s = "l u bb" }
        return s;
      })
      .html((d, i) => {
        if (!d || !stim) {
          return d;
        }
        console.log("col d=", d, " i=", i);
        stim = stim.toString();
        let zone = d.toString();
        let mau = bien.sregexp(stim);
        console.log("mau func sregexp=", mau);
        mau = new RegExp(mau, "gi");
        zone = zone.replace(mau, (m) => {
          if (m === undefined || m === null || m === "") {
            return;
          }
          console.log("col mau tim duoc=", m, " i=", i);
          let moi = "<b style='color:red'>" + m + "</b>";
          return moi;
        });
        return zone;
      });
  },

  hosochon: (tttt) => {
    if (!tttt) {
      tttt = d3.select("table[id='danhsach']").select("tbody").select(".mau").attr("data-tttt");
      ga.tttt = tttt;
    }
    console.log("hoso tttt=", tttt);
    let noidung = d3.permute(ga.dulieu[tttt], ga.colsBE);
    let i, rec, dulieu = [];
    for (i in ga.colsBE) {
      rec = { k: ga.tieude[i] || '', v: noidung[i] || '' };
      dulieu.push(rec);
    }

    let bang = d3.select("table[id='hosochon']")
      .attr("class", "w100")
      .style("table-layout", "auto")
      .style("border-collapse", "separate")
      .style("border-spacing", "1px 1px")
      .style("overflow", "auto")
      .style("margin", "0");

    bang.selectAll("tr").remove();

    let row = bang.selectAll("tr").data(dulieu)
      .enter().append("tr")
      .attr("class", "w100");

    row.append("td")
      .attr("class", "l")
      .style("background-color", "coral")
      .style("width", "10%")
      .text((d) => d.k);
    row.append("td")
      .attr("class", (d, i) => {
        let s = "l fb bb";
        if (i === 3) { s = "l u fb bb" }
        return s;
      })
      .attr("data-maunen", "transparent")
      .attr("data-mascan", (d, i) => {
        let ma = '';
        if ([1, 2, 3, 4, 5].includes(i)) {
          ma = ga.dulieu[ga.tttt]['hoso.idutc'] || ga.dulieu[ga.tttt]['idhoso'] || '';
        }
        return 'hoso.' + ma;
      })
      .text((d) => d.v)
      .on("mouseenter", (ev, d) => {
        let el = ev.target;
        el.style.backgroundColor = "#9999ff";
        let mascan = el.dataset.mascan;
        console.log("hosochon mouseenter ev=", ev.target, " d=", d, " mascan=", mascan);
        //web.scan(mascan);
      })
      .on("mouseleave", function (ev) {
        let maunen = ev.target.dataset.maunen || "transparent";
        ev.target.style.backgroundColor = maunen;
        console.log("hosochon mouseleave ev=", ev.target);
      });
    row.exit().remove();
  },

  scan: (mascan) => {
    if (!mascan || mascan === ga.mascan) {
      console.log("scan exit by mascan=", mascan, " ga.mascan=", ga.mascan);
      return;
    };
    ga.mascan = mascan;
    let dulieu = ga.url.scan[mascan] || [];
    console.log("scan mascan=", mascan, " dulieu=", dulieu);
    let zone = d3.select("#view_scan").attr("class", "w100");

    zone.selectAll("object").remove();

    let cells = zone.selectAll("object").data(dulieu);
    cells.enter().append("object")
      .style("background-color", "transparent")
      .attr("type", "application/pdf")
      .attr("typemustmatch", true)
      .attr("width", "500")
      .attr("height", "2000");
    cells.attr("data", (d, i) => {
      if (d) {
        return d.toString();
      } else {
        return d;
      }
    });
    cells.exit().remove();
  },
};

var sw_api = {
  gom: () => {
    let sw = `
    self.onmessage = (e) => {
      let tin = e.data, cv = 1, wss = null;
      try {
        wss = new WebSocket("`+ ga.url["wss"] + `")
      } catch (err) {
      } finally {
        wss.onopen = () => {
          wss.send(JSON.stringify(tin))
        }
        wss.onmessage = (e) => {
          self.postMessage({ cv: cv, kq: e.data })
          cv++;
        }
        wss.onclose = () => {
          self.postMessage({ cv: -1, kq: null })
          //delete wss;
        }
        wss.onerror = (err) => {
          self.postMessage({ cv: cv, err: err.message })
        }
      }
    }`;
    let blob = new Blob([sw], { type: "text/javascript" });
    let url = (window.URL || window.webkitURL).createObjectURL(blob);
    return url;
  }
};

var api = {
  gom: (bang, nam = new Date().getFullYear().toString()) => {
    let w = {}, kq;
    let tin = {
      id: Date.now(),
      ve: [window.location.pathname.split('/')[1], Date.now()].join('.'),
      dl: { bang: bang, gom: nam }
    };
    w[0] = new Worker(sw_api.gom());
    console.log("api.gom gui tin=", JSON.stringify(tin, null, 2));
    w[0].postMessage(tin);
    w[0].onmessage = (e) => {
      tin = e.data;
      console.log("api.gom tra tin=", JSON.stringify(tin, null, 2));
      if ("err" in tin) {
        console.log("err=", tin.err);
        //lam lai sau 2 giay
        setTimeout(() => { api.gom(bang, nam); }, 2000);
      }
      if (("cv" in tin) && (tin.cv < 0)) {
        w[0].terminate();
        delete w[0];
      }
      if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
        if (typeof tin.kq === 'string' || tin.kq instanceof String) {
          kq = JSON.parse(tin.kq);
          console.log("api.gom parse tin.kq=", kq);
        } else { kq = tin.kq; }
        if (("dl" in kq) && (typeof kq.dl === 'string' || kq.dl instanceof String)) {
          kq = JSON.parse(kq.dl);
          console.log("api.gom parse tin.kq.dl=", kq);
        } else { kq = kq.dl; }
        if (("dl" in kq) && (typeof kq.dl === 'string' || kq.dl instanceof String)) {
          kq = JSON.parse(kq.dl);
          console.log("api.gom parse tin.kq.dl.dl=", kq);
        } else { kq = kq.dl; }
        console.log("api.gom tra de luu idb bang=", bang, " kq=", kq);
        //luu idb
        if (kq) { idb.luu(bang, kq); }
      }
    }
  },
}
var sw_idb = {
  scan: () => {
    let sw = `
    self.onmessage = (ev) => {
    let tin = ev.data;
    try {
      let cv = 1,rr,kq;
      indexedDB.open(tin.csdl.ten, tin.csdl.cap).onsuccess = (e) => {
        const db = e.target.result;
        db.transaction(tin.bang, 'readonly')
          .objectStore(tin.bang)
          .openCursor(IDBKeyRange.only(tin.idutc))
          .onsuccess = (e) => {
            let cs = e.target.result;
            if (cs) {
              rr = cs.value;
              kq = rr.pdf || rr.blob || rr.scan;
              if (kq) {
                self.postMessage({ cv: cv, kq: kq });
                cv++;
              };
              cs.continue();
            } else {
              self.postMessage({ cv: -1, kq: null });
            };
          };
      }
    } catch (err) {
      self.postMessage({ cv: cv, err: err });
    };
  }`;
    let blob = new Blob([sw], { type: "text/javascript" });
    let url = (window.URL || window.webkitURL).createObjectURL(blob);
    return url;
  },
  luu1: () => {
    let sw = `
    self.onmessage = (e) => {
      let tin = e.data;
      if (!("bang" in tin) || !("luu" in tin) || !tin.luu || (typeof tin.luu !== 'object')) {
        self.postMessage({ cv: -1, kq: "nothing to save" });
      }
      try {
        let cv = 1, rr = tin.luu, db, cs, rs, k, sx;
        indexedDB.open("`+ idb.csdl.ten + `", ` + idb.csdl.cap + `).onsuccess = (e) => {
          db = e.target.result;
          db.transaction(tin.bang, 'readwrite')
            .objectStore(tin.bang)
            .openCursor(IDBKeyRange.only(rr.idutc))
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
                    .transaction(tin.bang, 'readwrite')
                    .objectStore(tin.bang)
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
      }
    }`;
    let blob = new Blob([sw], { type: "text/javascript" });
    let url = (window.URL || window.webkitURL).createObjectURL(blob);
    return url;
  },
  nap: () => {
    let sw = `
    self.onmessage = (ev) => {
      let tin = ev.data;
      if (!("bang" in tin) || !("nap" in tin) || !tin.nap || (tin.nap<0)) {
        self.postMessage({ cv: -1, kq: "nothing to nap" });
      }
      try {
        let cv = 1, db, cs, kq = {};
        indexedDB.open("`+ idb.csdl.ten + `",` + idb.csdl.cap + `).onsuccess = (e) => {
          db = e.target.result;
          db.transaction(tin.bang, 'readonly')
            .objectStore(tin.bang)
            .openCursor(IDBKeyRange.only(tin.nap))
            .onsuccess = (e) => {
              cs = e.target.result;
              if (cs) {
                kq = cs.value;
                self.postMessage({ cv: cv, kq: kq });
                cv++;
                cs.continue();
              } else {
                self.postMessage({ cv: -1, kq: {} });
              }
            };
        }
      } catch (err) {
        self.postMessage({ cv: cv, err: err });
      };
    }`;
    let blob = new Blob([sw], { type: "text/javascript" });
    let url = (window.URL || window.webkitURL).createObjectURL(blob);
    return url;
  },
  gom: (nam) => {
    let sw = `
    self.onmessage = (ev) => {
      let tin = ev.data;
      try {
        let cv = 1, db, cs, ce, kq = {};
        if (nam) {
          nam = pareseInt(nam);
          cs = (nam - 1) + "-12-01";
          cs = new Date(cs).getTime();
          ce = nam + "-12-31";
          ce = new Date(ce).getTime();
        } else {
          cs = 0;
          ce = new Date().getFullYear().toString() + "-12-31";
          ce = new Date(ce).getTime();
        }
        indexedDB.open(tin.csdl.ten, tin.csdl.cap).onsuccess = (e) => {
          db = e.target.result;
          db.transaction(tin.bang, 'readonly')
            .objectStore(tin.bang)
            .openCursor(IDBKeyRange.bound(cs, ce))
            .onsuccess = (e) => {
              cs = e.target.result;
              if (cs) {
                kq = cs.value;
                self.postMessage({ cv: cv, kq: kq });
                cv++;
                cs.continue();
              } else {
                self.postMessage({ cv: -1, kq: {} });
              }
            };
        }
      } catch (err) {
        self.postMessage({ cv: cv, err: err });
      };
    }`;
    let blob = new Blob([sw], { type: "text/javascript" });
    let url = (window.URL || window.webkitURL).createObjectURL(blob);
    return url;
  },
};

var idb = {
  csdl: { ten: 'cntd', cap: 1 },
  taodb: () => {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      return null;
    };
    try {
      let yc = indexedDB.open(idb.csdl.ten, idb.csdl.cap);
      yc.onupgradeneeded = e => {
        let db = e.target.result;
        if (e.oldVersion < idb.csdl.cap) {
          let idx = db.createObjectStore('tttt', { keyPath: 'tttt' });
          idx = db.createObjectStore('hoso', { keyPath: 'idutc' });
          idx = db.createObjectStore('khachhang', { keyPath: 'idutc' });
          idx = db.createObjectStore('dot', { keyPath: 'idutc' });
          idx = db.createObjectStore('donvithicong', { keyPath: 'idutc' });
          idx = db.createObjectStore('hoancong', { keyPath: 'idutc' });
          idx = db.createObjectStore('chiphi', { keyPath: 'idutc' });
          idx = db.createObjectStore('cpxd', { keyPath: 'idutc' });
          idx = db.createObjectStore('cpvl', { keyPath: 'idutc' });
          idx = db.createObjectStore('cpvt', { keyPath: 'idutc' });
          idx = db.createObjectStore('chiphiquanly', { keyPath: 'idutc' });
          idx = db.createObjectStore('khuvuc', { keyPath: 'idutc' });
          idx = db.createObjectStore('baogia', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgvl', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgnc', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgmtc', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgtl', { keyPath: 'idutc' });

          idx = db.createObjectStore('nhanvien', { keyPath: 'idutc' });

          idx = db.createObjectStore('scan', { keyPath: 'idutc' });
        }
      };
    } catch (err) { };
  },
  lay_scan: () => {
    if (!ga.tttt) { return };
    let gui, tra, ma, k, i = 0, w = {};
    let blob, url, sw_url = idb.sw.lay_scan();
    ga.url.scan = {};
    for (k in ga.dulieu[ga.tttt]) {
      if (['dot.idutc', 'iddot'].includes(k)) {
        ma = ga.dulieu[ga.tttt][k];
        gui = {
          csdl: { ten: "pkh", cap: 1 },
          lenh: "lay",
          bang: "dot",
          idutc: ma,
        };
        ma = 'dot.' + ma;
        ga.url.scan[ma] = [];
        w[i] = new Worker(sw_url);
        w[i].postMessage(gui);
        w[i].onmessage = (e) => {
          tra = e.data;
          console.log("idb.lay_scan tra=", JSON.stringify(tra, null, 2));
          if ("err" in tra) {
            console.log("err=", tra.err);
          }
          if (tra.cv > 0) {
            blob = new Blob([tra.kq], { type: "application/pdf" });
            url = (window.URL || window.webkitURL).createObjectURL(blob);
            ga.url.scan[ma].push(url);
          } else {
            w[i].terminate();
            (window.URL || window.webkitURL).revokeObjectURL(sw_url);
          };
        }
      }
      if (['hoso.idutc', 'idhoso'].includes(k)) {
        ma = ga.dulieu[ga.tttt][k];
        gui = {
          csdl: { ten: "pkh", cap: 1 },
          lenh: "lay",
          bang: "hoso",
          dk: { "idutc": ma },
        };
        ma = 'hoso.' + ma;
        ga.url.scan[ma] = [];
        w[i] = new Worker(sw_url);
        w[i].postMessage(gui);
        w[i].onmessage = (e) => {
          tra = e.data;
          console.log("idb.lay_scan tra=", JSON.stringify(tra, null, 2));
          if ("err" in tra) {
            console.log("err=", tra.err);
          }
          if (tra.cv > 0) {
            blob = new Blob([tra.kq], { type: "application/pdf" });
            url = (window.URL || window.webkitURL).createObjectURL(blob);
            ga.url.scan[ma].push(url);
          } else {
            w[i].terminate();
            (window.URL || window.webkitURL).revokeObjectURL(sw_url);
          };
        }
      }
      i++;
    }
  },
  lay_hoso: (nam = ga.namlamviec) => {
    if (!ga.tttt) { return };
    let gui, tra, tin, tttt, ii, ma, bang, k, i = 0, w = {};
    let blob, sw_url = idb.sw.gom(nam);
    ga.dulieu = {};
    gui = {
      csdl: { ten: "pkh", cap: 1 },
      bang: "hoso",
    };
    w[0] = new Worker(sw_url);
    w[0].postMessage(gui);
    w[0].onmessage = (e) => {
      tra = e.data;
      console.log("idb.lay_hoso tra=", JSON.stringify(tra, null, 2));
      if ("err" in tra) {
        console.log("err=", tra.err);
      }
      if (tra.cv > 0) {
        tttt = tra.kq.idutc;
        if (tttt && tra.kq) {
          tra = tra.kq;
          ga.dulieu[tttt] = tra;
          if ('dot' in tra) {
            gui.bang = 'dot';
            gui.idutc = tra.dot.idutc || tra.dot.refs.id;
            ii = gui.bang + gui.idutc;
            w[ii] = new Worker(idb.sw.nap());
            w[ii].postMessage(gui);
            w[ii].onmessage = (e) => {
              tin = e.data;
              console.log("idb.lay_hoso.dot tin=", JSON.stringify(tin, null, 2));
              if ("err" in tin) {
                console.log("err=", tin.err);
              }
              if ((tin.cv > 0) && tin.kq) {
                tin = tin.kq;
                bang = 'dot';
                ma = bang + "_idutc";
                ga.dulieu[tttt][ma] = tin.idutc;
                ma = bang + "_status";
                ga.dulieu[tttt][ma] = tin.status;
                ma = bang + "_lastupdate"
                ga.dulieu[tttt][ma] = tin.lastupdate;
                for (k in tin.refs) {
                  ma = bang + '_refs_' + k;
                  ga.dulieu[tttt][ma] = tin.refs[k];
                }
                for (k in tin.data) {
                  ma = bang + '_data_' + k;
                  ga.dulieu[tttt][ma] = tin.data[k];
                }
              }
              if (tin.cv < 0) {
                w[ii].terminate();
                delete w[ii];
              };
            }
          }
          if ('khachhang' in tra) {
            gui.bang = 'khachhang';
            gui.idutc = tra.khachhang.idutc || tra.khachhang.refs.id;
            ii = gui.bang + gui.idutc;
            w[ii] = new Worker(idb.sw.nap());
            w[ii].postMessage(gui);
            w[ii].onmessage = (e) => {
              tin = e.data;
              console.log("idb.lay_hoso.khachhang tin=", JSON.stringify(tin, null, 2));
              if ("err" in tin) {
                console.log("err=", tin.err);
              }
              if ((tin.cv > 0) && tin.kq) {
                tin = tin.kq;
                bang = 'khachhang';
                ma = bang + "_idutc";
                ga.dulieu[tttt][ma] = tin.idutc;
                ma = bang + "_status";
                ga.dulieu[tttt][ma] = tin.status;
                ma = bang + "_lastupdate"
                ga.dulieu[tttt][ma] = tin.lastupdate;
                for (k in tin.refs) {
                  ma = bang + '_refs_' + k;
                  ga.dulieu[tttt][ma] = tin.refs[k];
                }
                for (k in tin.data) {
                  ma = bang + '_data_' + k;
                  ga.dulieu[tttt][ma] = tin.data[k];
                }
              }
              if (tin.cv < 0) {
                w[ii].terminate();
                delete w[ii];
              };
            }
          }
          if ('donvithicong' in tra) {
            gui.bang = 'donvithicong';
            gui.idutc = tra.khachhang.idutc || tra.khachhang.refs.id;
            ii = gui.bang + gui.idutc;
            w[ii] = new Worker(idb.sw.nap());
            w[ii].postMessage(gui);
            w[ii].onmessage = (e) => {
              tin = e.data;
              console.log("idb.lay_hoso.donvithicong tin=", JSON.stringify(tin, null, 2));
              if ("err" in tin) {
                console.log("err=", tin.err);
              }
              if ((tin.cv > 0) && tin.kq) {
                tin = tin.kq;
                bang = 'donvithicong';
                ma = bang + "_idutc";
                ga.dulieu[tttt][ma] = tin.idutc;
                ma = bang + "_status";
                ga.dulieu[tttt][ma] = tin.status;
                ma = bang + "_lastupdate"
                ga.dulieu[tttt][ma] = tin.lastupdate;
                for (k in tin.refs) {
                  ma = bang + '_refs_' + k;
                  ga.dulieu[tttt][ma] = tin.refs[k];
                }
                for (k in tin.data) {
                  ma = bang + '_data_' + k;
                  ga.dulieu[tttt][ma] = tin.data[k];
                }
              }
              if (tin.cv < 0) {
                w[ii].terminate();
                delete w[ii];
              };
            }
          }
        }
      }
      if (tra.cv) {
        w[0].terminate();
        delete w[0];
      };
    }

    for (k in ga.dulieu[ga.tttt]) {
      if (['dot.idutc', 'iddot'].includes(k)) {
        ma = ga.dulieu[ga.tttt][k];

        ma = 'dot.' + ma;
        ga.url.scan[ma] = [];
        w[i] = new Worker(sw_url);
        w[i].postMessage(gui);
        w[i].onmessage = (e) => {
          tra = e.data;
          console.log("idb.lay_scan tra=", JSON.stringify(tra, null, 2));
          if ("err" in tra) {
            console.log("err=", tra.err);
          }
          if (tra.cv > 0) {
            blob = new Blob([tra.kq], { type: "application/pdf" });
            url = (window.URL || window.webkitURL).createObjectURL(blob);
            ga.url.scan[ma].push(url);
          } else {
            w[i].terminate();
            (window.URL || window.webkitURL).revokeObjectURL(sw_url);
          };
        }
      }
      if (['hoso.idutc', 'idhoso'].includes(k)) {
        ma = ga.dulieu[ga.tttt][k];
        gui = {
          csdl: { ten: "pkh", cap: 1 },
          lenh: "lay",
          bang: "hoso",
          dk: { "idutc": ma },
        };
        ma = 'hoso.' + ma;
        ga.url.scan[ma] = [];
        w[i] = new Worker(sw_url);
        w[i].postMessage(gui);
        w[i].onmessage = (e) => {
          tra = e.data;
          console.log("idb.lay_scan tra=", JSON.stringify(tra, null, 2));
          if ("err" in tra) {
            console.log("err=", tra.err);
          }
          if (tra.cv > 0) {
            blob = new Blob([tra.kq], { type: "application/pdf" });
            url = (window.URL || window.webkitURL).createObjectURL(blob);
            ga.url.scan[ma].push(url);
          } else {
            w[i].terminate();
            (window.URL || window.webkitURL).revokeObjectURL(sw_url);
          };
        }
      }
      i++;
    }
  },
  luu: (bang, dl) => {
    let ii = 0, w = {}, l, tin;
    if (!Array.isArray(dl)) {
      dl = [dl];
    }
    l = dl.length;
    while (ii < l) {
      try {
        tin = {
          bang: bang,
          luu: dl[ii],
        };
        console.log("idb.luu gui dl[", ii, "] tin=", JSON.stringify(tin, null, 2));
        w[ii] = new Worker(sw_idb.luu1());
        w[ii].postMessage(tin);
        w[ii].onmessage = (e) => {
          tin = e.data;
          console.log("idb.luu tra tin=", JSON.stringify(tin, null, 2));
          if (("cv" in tin) && (tin.cv < 0)) {
            try {
              w[ii].terminate();
              delete w[ii];
            } catch (error) { }
          }
          if ("err" in tin) {
            console.log("err=", tin.err);
            //lam lai sau 2 giay
            setTimeout(() => { idb.luu(bang, dl[ii]); }, 2000);
          }
          if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
            console.log("idb.luu tra tin.kq=", tin.kq);
          }
        }
      } catch (err) {
        break;
      }
      ii++;
    }
  },
  nap: (bang, uid) => {

  }
};

idb.taodb();
ga.tao();
web.tao();

api.gom('hoso', 2020);
//sw_idb.luu1();