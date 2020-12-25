import { taodb, cap1, capn, luu, luun } from "./../../ttdl/db.js";
import { data_test } from "./../../test/data_test.js";

//khoi tao
var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
  namlamviec: new Date().getFullYear().toString(),
  tttt: "",
  ltttt: [],
  mascan: '',
  otim: [],
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
      "https://" + window.location.host + "/" + ga.csdl.ten + "/api/hoso/" + ga.namlamviec,
      "https://" + window.location.host + "/" + ga.csdl.ten + "/api/dshc/" + ga.namlamviec,
    ];
    ga.url["wss"] = "wss://" + window.location.host + "/" + ga.csdl.ten + "/wss/hoso/" + ga.namlamviec;
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
    lv.danhsach();
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

var lv = {
  info: () => {
    d3.select("#info").text(JSON.stringify(ga, null, 4));
  },

  tao: () => {
    lv.namlamviec();
    lv.stim();
    lv.don_otim();
    lv.otim();
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
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            lv.otim();
            ga.loc_otim();
            break;
          case 45: //insert
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            lv.otim();
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
            lv.hosochon(ga.tttt);
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
            lv.hosochon(ga.tttt);
            break;
          default:
            console.log("btn=", ev.code, " keyCode=", ev.keyCode);
        }
      })
      .on("input", function () {
        console.log("oninput s=", this.value);
        lv.danhsach(this.value);
      })
      .on("change", function () {
        console.log("onchange stim=", this.value);
      });
  },

  don_otim: () => {
    d3.select("#don-otim").on("click", function (ev) {
      console.log("btn clear otim=", ev.target);
      ga["otim"] = [ga["namlamviec"]];
      lv.otim();
    });
  },

  otim: (dulieu = ga.otim) => {
    //d3.select("div[id='view_otim']").selectAll("*").remove();
    console.log("otim dulieu=ga.otim=", dulieu);
    let zone = d3.select("#view_otim").selectAll("button").data(dulieu);
    zone
      .enter()
      .append("button")
      .text((d) => d)
      .attr("class", "l b1px")
      .style("paddingLeft", "1em")
      .style("color", "red")
      .on("click", function () {
        let s = this.textContent || this.innerText;
        s = s.trim().toLowerCase() || "";
        ga["otim"] = ga["otim"].filter((i) => i !== s);
        this.remove();
      })
      .on("mouseout", function (ev) {
        this.style.textDecoration = "none";
      })
      .on("mouseover", function (ev) {
        this.style.textDecoration = "line-through";
        console.log("btn mouseover=", ev.target);
      });
    zone.exit().remove();
    //lv.danhsach();
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
        lv.hosochon(ga.tttt);
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
        //lv.scan(mascan);
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

var web = {

}

var soc = {
  wss: null,
  tao: () => {
    try {
      let url = "ws://" + location.host + "/chatsocket";
      soc.wss = new WebSocket(url);
    } catch (err) { };
  },
  gui: (tin) => {
    switch (tin) {
      case "dshc":
        websocket.binaryType = "arraybuffer";
        break;
      case "qtgt":
        break;
      default:
        soc.wss.send(JSON.stringify(tin));
    }
  },
  nhan: (tin) => {

  }
}

var scan = {
  tao: () => {
    idb.lay_api();
  },



  test: () => {
    let pdfFile = d3.select("#view_scan").attr("data-scan");
    console.log("url scan=", pdfFile);
    //let blob = new Blob([pdfFile], { type: 'application/pdf' })
    //let url = (window.URL || window.webkitURL).createObjectURL(blob);
    let url = new URL(pdfFile);
    let mascan = "scan01";
    ga.url.scan = [{ mascan: mascan, url: url.href }];
    scan.hoso("scan01");
  },
  lay_idb: (tttt) => { },

  lay_api: (tttt) => {
    d3.json(ga.url["api"][bang], {
      mode: "cors",
    }).then((res) => {
      console.log("main thread res from server=", JSON.stringify(res, null, 4));
      let dulieu = res.data || [];
      //lay dulieu
      let t = 0,
        rec,
        k,
        stim,
        kotim,
        tttt,
        keys;
      while (true) {
        try {
          rec = dulieu[t];
          stim = null;
          kotim = [
            "tttt",
            "uuid",
            "uid",
            "lastupdate",
            "inok",
            "scan",
            "blob",
            "tt",
            "stt",
          ];
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

  hoso: (mascan) => {
    let dulieu = ga.url.scan;
    console.log("scan hoso mascan=", mascan, " dulieu=", dulieu);

    let zone = d3.select("#view_scan").attr("class", "w100");
    //zone.selectAll("object").remove();

    let cells = zone
      .selectAll("object")
      .data(dulieu)
      .filter((d) => {
        console.log("Scan cells filter d=", d);
        return d.mascan.includes(mascan);
      });

    cells
      .enter()
      .append("object")
      .style("background-color", "transparent")
      .attr("type", "application/pdf")
      .attr("typemustmatch", true)
      .attr("width", "500")
      .attr("height", "2000");
    cells.attr("data", (d, i) => {
      if (d) {
        return d.url.toString();
      } else {
        return d;
      }
    });
    cells.exit().remove();
  },
};

class Hoso {
  constructor() {
    this.hon = new Worker(document.getElementById("danhsach").dataset.hon, {
      type: "module",
    });
    this.get_tieude(1);
    this.tat();
  }


  tat() {
    // load json data
    let api_url = window.location.host;
    api_url += "/" + ga["csdl"]["ten"];
    api_url += "/wss";
    api_url += "/hoso/" + ga["namlamviec"];

    this.hon.postMessage({ csdl: ga["csdl"], api: api_url });
    this.hon.onmessage = (e) => {
      let kq = e.data;
      console.log("tat kq=", JSON.stringify(kq, null, 2));
      if (kq.cv < 0) {
        console.log("tat kq.cv=", kq.cv);
        this.hon.terminate();
        if ("err" in kq) {
          console.log("err=", kq.err);
        }
        return null;
      }
      //gan vao data-options cua ctl
      let r = kq.kq;
      console.log("tat dulieu=", JSON.stringify(r, null, 4));
      let dulieu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      switch (ga["bang"]) {
        case 2:
          dulieu = [
            "crud",
            "utcid",
            "sodot",
            "khachhang",
            "diachi",
            "ngaythietke",
            "ngaylendot",
            "ngaythicong",
            "ngaytrongai",
          ];
          break;
        case 3:
          dulieu = [
            "crud",
            "utcid",
            "sodot",
            "khachhang",
            "diachi",
            "ngaythietke",
            "ngaylendot",
            "ngaythicong",
            "ngaytrongai",
          ];
          break;
        default:
          dulieu[0] = "crud";
          dulieu[1] = r["tttt"] ? r["tttt"]["matttt"] : "";
          dulieu[2] = r["dot"] ? r["dot"]["sodot"] : "";
          dulieu[3] = r["khachhang"] ? r["khachhang"]["khachhang"] : "";
          dulieu[4] = r["khachhang"] ? r["khachhang"]["diachi"] : "";
          dulieu[5] = "2020-10-15";
          dulieu[6] = "2020-10-15";
          dulieu[7] = "2020-10-15";
          dulieu[8] = "2020-10-15";
      }
      d3.select("div[id='ketqua:noidung']")
        .append("div")
        .attr("class", "grid w100 hov bang" + ga["bang"])
        //.style("background-color", "#d1e5f0")
        .on("mouseover", function (ev) {
          console.log("ketqua:noidung bang", ga["bang"], " rec=", ev.target);
        })
        .selectAll("div")
        .data(dulieu)
        .enter()
        .append("div")
        .text((d) => d)
        .attr("class", (d, id) => "l bl wb cot" + id)
        .style("color", "magenta")
        .on("click", function (ev) {
          //sort
        });
    };
  }
  nap(uid = "") {
    let dulieu = [];
    switch (ga["bang"]) {
      case 2:
        dulieu = [
          "nd crud",
          "nd utcid",
          "nd sodot",
          "nd khachhang",
          "nd diachi",
          "nd ngaythietke",
          "nd ngaylendot",
          "nd ngaythicong",
          "nd ngaytrongai",
        ];
        break;
      case 3:
        dulieu = [
          "nd crud",
          "nd utcid",
          "nd sodot",
          "nd khachhang",
          "nd diachi",
          "nd ngaythietke",
          "nd ngaylendot",
          "nd ngaythicong",
          "nd ngaytrongai",
        ];
        break;
      default:
        dulieu = [
          "nd crud",
          "nd utcid",
          "nd sodot",
          "nd khachhang",
          "nd diachi",
          "nd ngaythietke",
          "nd ngaylendot",
          "nd ngaythicong",
          "nd ngaytrongai",
        ];
    }
    this.textloc = [{ crud: "nd crud" }, { uctid: "nd utcid" }];
    let curid = 0;
    d3.select("div[id='view_hoso']")
      .attr("class", "grid view-hoso w100 hov bang")
      //.style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("view_hoso", ga["bang"], " rec=", ev.target);
      })
      .selectAll("div")
      .data(this.textloc)
      .enter()
      .append("div")
      .text((d) => {
        curid = this.tieude.indexOf(d);
        return d;
      })
      .attr("class", (d) => "l bl cot" + curid)
      .style("color", "magenta")
      .on("click", function (ev) {
        //sort
      })
      .join("div")
      .append("div")
      .text(this.textloc[curid])
      .attr("class", "l bl cot" + curid)
      .style("color", "green")
      .on("click", function (ev) {
        //sort
      });
  }
  sua(uid = "") {
    let dulieu = [];
    switch (this.bang) {
      case 2:
        dulieu = [
          "nd crud",
          "nd utcid",
          "nd sodot",
          "nd khachhang",
          "nd diachi",
          "nd ngaythietke",
          "nd ngaylendot",
          "nd ngaythicong",
          "nd ngaytrongai",
        ];
        break;
      case 3:
        dulieu = [
          "nd crud",
          "nd utcid",
          "nd sodot",
          "nd khachhang",
          "nd diachi",
          "nd ngaythietke",
          "nd ngaylendot",
          "nd ngaythicong",
          "nd ngaytrongai",
        ];
        break;
      default:
        dulieu = [
          "nd crud",
          "nd utcid",
          "nd sodot",
          "nd khachhang",
          "nd diachi",
          "nd ngaythietke",
          "nd ngaylendot",
          "nd ngaythicong",
          "nd ngaytrongai",
        ];
    }
    this.textloc = [{ crud: "nd crud" }, { uctid: "nd utcid" }];
    let curid = 0;
    d3.select("#view_hoso")
      .attr("class", "grid view-hoso w100 hov bang")
      //.style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("view_hoso", ga["bang"], " rec=", ev.target);
      })
      .selectAll("div")
      .data(this.textloc)
      .enter()
      .append("div")
      .text((d) => {
        curid = this.tieude.indexOf(d);
        return d;
      })
      .attr("class", (d) => "l bl cot" + curid)
      .style("color", "magenta")
      .on("click", function (ev) {
        //sort
      })
      .join("div")
      .append("div")
      .text(this.textloc[curid])
      .attr("class", "l bl cot" + curid)
      .style("color", "green")
      .on("click", function (ev) {
        //sort
      });
  }
}

ga.tao();
lv.tao();
scan.test();

var sw = {
  lay_scan() {
    let sw = `
      self.onmessage = (ev) => {
      let tin = ev.data;
      try {
        let cv = 1;
        indexedDB.open(tin.csdl.ten, tin.csdl.cap).onsuccess = (e) => {
          const db = e.target.result;
          db.transaction(tin.bang, 'readonly')
            .objectStore(tin.bang)
            .openCursor(IDBKeyRange.only(tin.dk.idutc))
            .onsuccess = (e) => {
              let cs = e.target.result;
              if (cs) {
                let kq = cs.value.pdf || cs.value.blob;
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
}

var idb = {
  lay_scan: () => {
    if (!ga.tttt) { return };
    let gui, tra, ma, k, i = 0, w = {};
    let blob, url, sw_url = sw.lay_scan();
    ga.url.scan = {};
    for (k in ga.dulieu[ga.tttt]) {
      if (['iddot', 'dot.idutc'].includes(k)) {
        ma = ga.dulieu[ga.tttt][k];
        gui = {
          csdl: { ten: "pkh", cap: 1 },
          lenh: "lay",
          bang: "dot",
          dk: { "idutc": ma },
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
      if (['idhoso', 'hoso.idutc'].includes(k)) {
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
    }
  },
};


/*
inline worker
var blob = new Blob([
  "onmessage = function(e) { postMessage('msg from worker'); }"]);

// Obtain a blob URL reference to our worker 'file'.
var blobURL = window.URL.createObjectURL(blob);

var worker = new Worker(blobURL);
worker.onmessage = function(e) {
// e.data == 'msg from worker'
};
//stop worker
worker.terminate();

//giai phong bo nho luu tru blob
window.URL.revokeObjectURL(blobURL);

worker.postMessage(); // Start the worker.
*/
