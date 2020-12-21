import { taodb, cap1, capn, luu, luun } from "./../../ttdl/db.js";
import { data_test } from "./../../test/data_test.js";

//untils
d3.selection.prototype.first = function () {
  return d3.select(
    this.nodes()[0]
  );
};
d3.selection.prototype.last = function () {
  return d3.select(
    this.nodes()[this.size() - 1]
  );
};
//khoi tao

var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
  namlamviec: new Date().getFullYear().toString(),
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
        ga.colsBE = ["stt", "utcid", "sohoso", "khachhang", "diachigandhn", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
        ga.tieude = ["stt", "utcid", "so ho so", "khach hang", "dia chi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
    }
  },

  lay_url: () => {
    ga.url['api'] = [
      "https://" + window.location.host + "/" + ga.csdl.ten + "/api/hoso/" + ga.namlamviec,
      "https://" + window.location.host + "/" + ga.csdl.ten + "/api/dshc/" + ga.namlamviec,
    ];
    ga.url['wss'] = "wss://" + window.location.host + "/" + ga.csdl.ten + "/wss/hoso/" + ga.namlamviec;
    ga.url['hon'] = d3.select("table[id='danhsach']").attr("data-hon");
  },

  lay_idb: () => {

  },
  //load tu idb loc theo otim
  lay_api: (bang = 0) => {
    d3.json(ga.url['api'][bang], {
      mode: "cors",
    }).then((res) => {
      console.log("main thread res from server=", JSON.stringify(res, null, 4));
      let dulieu = res.data || [];
      //lay dulieu
      let t = 0, rec, k, stim, kotim, tttt, keys;
      while (true) {
        try {
          rec = dulieu[t];
          stim = null;
          kotim = ['tttt', 'uuid', 'uid', 'lastupdate', 'inok', 'scan', 'blob', 'tt', 'stt'];
          tttt = rec.tttt || rec.uuid;
          if (!tttt) {
            tttt = Date.now();
            while (tttt in ga.dulieu) {
              tttt += 1;
            }
          };
          if (!(tttt in ga.dulieu)) {
            ga.dulieu[tttt] = { 'tttt': tttt };
          };
          for (k in rec) {
            if (['tttt', 'uuid'].includes(k) === false) {
              ga.dulieu[tttt][k] = rec[k];
            }
            if (kotim.includes(k) === false) {
              if (stim) {
                stim = [...new Set([...stim, ...rec[k].toString().split(/\s+/)])];
              } else {
                stim = [...new Set([...rec[k].toString().split(/\s+/)])];
              }
            }
          }
          ga.dulieu[tttt]['stim'] = stim.join(' ').trim();
          t++;
        } catch (err) {
          break;
        }
      }
      //xep thu tu
      keys = Object.keys(ga.dulieu).sort();
      t = 1;
      for (k in keys) {
        ga.dulieu[keys[k]]['stt'] = d3.format("03,d")(t);
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
    mvc.danhsach();
  },
};

var mvc = {
  info: () => {
    d3.select("#info").text(JSON.stringify(ga, null, 4));
  },

  tao: () => {
    mvc.namlamviec();
    mvc.stim();
    mvc.don_otim();
    mvc.otim();
  },

  sregexp: (stim) => {
    if (!stim) { return stim };
    let k, ltim = [...stim];
    let mau = '';
    for (k in ltim) {
      if (['$', '(', ')', '[', '.', '+', '*', '^', '?', '\\'].includes(ltim[k])) {
        mau += "\\" + ltim[k];
      } else {
        mau += ltim[k];
      }
    }
    return mau;
  },

  namlamviec: () => {
    d3.select("#namlamviec")
      .on("change", function () {
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
        //api_hoso(namchu);
        ga.lay_api();
        mvc.info();
        //mvc.otim();
      });
  },

  stim: () => {
    d3.select("#stim")
      .on("keydown", function (ev) {
        let s = this.value ? this.value.trim().toLowerCase() : '';
        let zone, cur, truoc, sau;
        switch (ev.keyCode) {
          case 13: //enter goto 1st hosoloc
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            mvc.otim();
            ga.loc_otim();
            break;
          case 45: //insert
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            mvc.otim();
            ga.loc_otim();
            this.value = "";
            break;
          case 38: //mui ten len
            zone = d3.select("table[id='danhsach']").select("tbody").select("tr");
            cur = zone.select(".mau");
            if (cur.empty()) { console.log("empty cur") };
            console.log("zone=", zone, "type=", typeof (zone));
            cur = zone.classed("mau", false);
            zone.select(() => cur.previousElementSibling).classed("mau", true);
            break;
          case 40: //mui ten xuong
            zone = d3.select("table[id='danhsach']").select("tbody").select("tr[class='mau']");
            console.log("zone=", zone, "type=", typeof (zone));
            cur = zone.classed("mau", false);
            zone.select(() => cur.nextElementSibling).classed("mau", true);
            break;
          default:
            console.log("btn=", ev.code, " keyCode=", ev.keyCode);
        }
      })
      .on("input", function () {
        console.log("oninput s=", this.value);
        mvc.danhsach(this.value);
      })
      .on("change", function () {
        console.log("onchange stim=", this.value);
      });
  },

  don_otim: () => {
    d3.select("#don-otim").on("click", function (ev) {
      console.log("btn clear otim=", ev.target);
      ga["otim"] = [ga["namlamviec"]];
      mvc.otim();
    });
  },

  otim: (dulieu = ga.otim) => {
    //d3.select("div[id='view_otim']").selectAll("*").remove();
    console.log("otim dulieu=ga.otim=", dulieu);
    let zone = d3.select("#view_otim").selectAll("button")
      .data(dulieu);
    zone.enter()
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
        mvc.info();
      })
      .on("mouseout", function (ev) {
        this.style.textDecoration = "none";
      })
      .on("mouseover", function (ev) {
        this.style.textDecoration = "line-through";
        console.log("btn mouseover=", ev.target);
      });
    zone.exit()
      .remove();
    //mvc.danhsach();
  },

  danhsach: (stim) => {
    let bang = d3.select("table[id='danhsach']").attr("style", "margin: 0");
    //tieude
    bang.select("thead").selectAll("th")
      .data(ga.tieude)
      .enter()
      .append("th")
      .attr("class", "c")
      .text((col) => col);

    //rows
    bang.select("tbody").selectAll("tr").remove();
    let rows = bang.select("tbody").selectAll("tr").data(ga.noidung);
    let row = rows.enter().append("tr")
      .attr("class", "l")
      .attr("data-tttt", (d, i) => {
        console.log("data-tttt d=", d, " i=", i);
        return d.tttt;
      })
      .filter(d => {
        stim = stim ? stim : '';
        let dk = d.stim.includes(stim);
        console.log("filter row d=", d, "dk=", dk);
        return dk
      })
      .on("mouseenter", function (ev) {
        d3.select(this).classed("mau test", true);
        console.log("row mouseenter=", ev.target.__data__);
        mvc.hoso();
      })
      .on("mouseleave", function (ev) {
        d3.select(this).classed("mau test", false);
        console.log("row mouseleave=", ev.target);
      })
      .on("click", function (ev) {
        mvc.hoso();
        console.log("row click=", ev.target.parentNode.__data__);
      });
    row.exit().remove();
    rows.exit().remove();

    //col
    let cols = row.selectAll("td")
      .data((d) => d3.permute(d, ga.colsBE));
    cols.enter().append("td")
      .html((d, i) => {
        if (!d || !stim) { return d };
        console.log("col d=", d, " i=", i);
        stim = stim.toString();
        let zone = d.toString();
        let mau = mvc.sregexp(stim);
        console.log("mau func sregexp=", mau);
        mau = new RegExp(mau, 'gi');
        zone = zone.replace(mau, (m) => {
          if (m === undefined || m === null || m === '') { return };
          console.log("col mau tim duoc=", m, " i=", i);
          let moi = "<b style='color:red'>" + m + "</b>";
          return moi;
        })
        return zone;
      })
    cols.exit().remove();
  },
  hoso: (tttt) => {
    if (!tttt) {
      tttt = d3.select("table[id='danhsach']").select("tbody").select('.mau').attr("data-tttt");
    };
    console.log("hoso tttt=", tttt);
    let noidung = d3.permute(ga.dulieu[tttt], ga.colsBE)
    let i, k, v, dulieu = [];
    for (i in ga.colsBE) {
      dulieu.push(ga.tieude[i]);
      dulieu.push(noidung[i]);
    }
    let zone = d3.select("#view_hoso")
      .attr("class", "grid row w100")
      .style('grid', 'auto-flow minmax(1rem, max-content)/max-content 1fr');
    let cells = zone.selectAll("div").data(dulieu);
    cells.enter().append("div");
    cells.attr("class", "l")
      .text(d => d);
    cells.exit().remove();
  },
  scan: () => {

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

  get_tieude(bang = 1) {
    bang = parseInt(bang) || 1;
    let dulieu = [];
    switch (bang) {
      case 2:
        ga["bang"] = bang;
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
        ga["bang"] = bang;
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
        ga["bang"] = 1;
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
    }
    this.tieude = [...dulieu];
    let zone = d3.select("div[id='ketqua:tieude']");
    zone
      .attr("class", "grid w100 ba hov bang" + bang)
      .style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("ketqua:tieude bang", ga["bang"], " rec=", ev.target);
      });
    zone.selectAll("*").remove();
    zone
      .selectAll("div")
      .data(dulieu)
      .enter()
      .append("div")
      .text((d) => d)
      .attr("class", (d, id) => "c bl fb wb cot" + id)
      .style("color", "magenta")
      .on("click", function (ev) {
        //sort
      });
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
mvc.tao();