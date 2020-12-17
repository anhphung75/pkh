import { taodb, cap1, capn, luu, luun } from "./../../ttdl/db.js";
import { data_test } from "./../../test/data_test.js";

//khoi tao
var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
  namlamviec: new Date().getFullYear().toString(),
  otim: [],
  dulieu: [],
  colsBE: [],
  colsFE: [],
  url: {},

  tao: () => {
    ga.lay_url();
    ga.tieude();
  },

  tieude: (bang = 0) => {
    switch (bang) {
      case "dshc":
        break;
      case "qtgt":
        break;
      default:
        ga.colsBE = ["utcid", "sohoso", "khachhang", "diachigandhn", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
        ga.colsFE = ["utcid", "so ho so", "khach hang", "dia chi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
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

  //load tu idb loc theo otim
  noidung: (bang = 0) => {
    d3.json(ga.url['api'][bang], {
      mode: "cors",
    }).then((res) => {
      console.log("main thread res from server=", JSON.stringify(res, null, 4));
      let dulieu = res.data || [];
      ga.ktra_dulieu(dulieu);
      mvc.danhsach();
    });
  },

  ktra_dulieu: (ld) => {
    let t = 0, d = [], rec, k, v;
    while (true) {
      try {
        rec = ld[t];
        for (k in ga.colsBE) {
          k in rec ? v = 0 : rec[k] = '';
        }
        d.push(rec);
        t++;
      } catch (err) {
        break;
      }
    }
    ga.dulieu = d;
  },

  loc_stim: (s) => {
    s = s ? s.toString().toLowerCase() : '';
    let kq = ga.dulieu.filter(d => JSON.stringify(Object.values(d)).toLowerCase().includes(s));
    return kq;
  },
  loc_otim: () => {

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
      //api_hoso(namchu);
      ga.tieude(0);
      ga.noidung();
      mvc.info();
      mvc.otim();
      //hoso.tat();
    });
  },

  stim: () => {
    d3.select("#stim")
      .on("keydown", function (ev) {
        let s = this.value ? this.value.trim().toLowerCase() : '';
        switch (ev.keyCode) {
          case 13: //enter goto 1st hosoloc
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            mvc.otim();
            break;
          case 45: //insert
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            mvc.otim();
            this.value = "";
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
    //d3.select("div[id='view:otim']").selectAll("*").remove();
    console.log("otim dulieu=ga.otim=", dulieu);
    let zone = d3.select("div[id='view:otim']").selectAll("button")
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
    mvc.info();
  },

  danhsach: (stim) => {
    let bang = d3.select("table[id='danhsach']").attr("style", "margin: 0");
    //tieude
    bang.select("thead").selectAll("th")
      .data(["Id", ...ga.colsFE])
      .enter()
      .append("th")
      .attr("class", "c")
      .text((col) => col);

    //rows
    bang.select("tbody").selectAll("tr").remove();
    let dulieu = ga.loc_stim(stim);
    let rows = bang.select("tbody").selectAll("tr").data(dulieu);
    let row = rows.enter().append("tr")
      .attr("class", "l")
      .attr("data-uuid", (d, i) => {
        console.log("data-uuid d=", d, " i=", i);
        return d.utcid;
      })
      .on("mouseenter", function (ev) {
        d3.select(this).classed("mau test", true);
        mvc.hoso(ev.target.__data__);
      })
      .on("mouseleave", function (ev) {
        d3.select(this).classed("mau test", false);
        console.log("row mouseleave=", ev.target);
      })
      .on("click", function (ev) {
        mvc.hoso(ev.target.parentNode.__data__);
        console.log("row click=", ev.target.parentNode.__data__);
      });
    rows.exit().remove();

    //col
    let cols = row.selectAll("td")
      .data((d, i) => [d3.format("03d")(i + 1), ...d3.permute(d, ga.colsBE)]);
    cols.enter().append("td")
      .html((d) => d);
    cols.exit().remove();

    //tomau
    let tomau_stim = (stim) => {
      if (!stim) { return };
      let goc = new RegExp("<td>[^<]*(" + stim + ")", 'gi');
      let zone = bang.select("tbody").html().toString();
      zone = zone.replace(goc, (m) => {
        let mau = new RegExp(stim, 'gi');
        let moi = "<b style='color:red'>" + stim + "</b>";
        m = m.replace(mau, moi);
        return m;
      });
      bang.select("tbody").html(zone);
    };
    tomau_stim(stim);
  },
  hoso: (dulieu) => {
    let uuid = d3.select("table[id='danhsach']").select("tbody").select('.mau').attr("data-uuid");
    console.log("hoso uuid=", uuid);
    let bang = d3.select("div[id='view:hoso']");

    let rows = bang.selectAll("div").data(dulieu);
    let row = rows.enter().append("div")
      .attr("class", "grid row w100");
    rows.exit().remove();

    let cols = row.selectAll("div")
      .data((d, i) => {
        console.log("hoso cols d=", d);
        return d;
      });
    cols.enter().append("div")
      .html((d) => d);
    cols.exit().remove();
  },
  scan: () => {

  },
};
//stim filter danhsach

//otim filter tu idb

//view:ketqua ->table

function nap_dulieu() {
  //rest api
  let api_url =
    window.location.protocol +
    "//" +
    window.location.host +
    "/" +
    ga["csdl"]["ten"] +
    "/api/hoso/" +
    ga["namlamviec"];
  console.log("api_url=", api_url);
  d3.json(api_url, {
    mode: "cors",
  }).then((res) => {
    console.log("main thread res from server=", JSON.stringify(res, null, 4));
    let dulieu = res.data || [];
    ga.ktra_dulieu(dulieu);
    mvc.danhsach();
  });
}


//view:hoso
//view:scan

class Otim {
  constructor() {
    this.don();
  }

  don() {
    //ga["otim"] = [ga["namlamviec"]];
    this.xem();
  }

  moi(s) {
    s = s.trim().toLowerCase() || "";
    if (s.length < 1 || ga["otim"].indexOf(s) > -1) {
      return;
    }
    ga["otim"].push(s);
    this.xem();
  }

  xem() {
    //d3.select("div[id='view:otim']").selectAll("*").remove();
    let zone = d3
      .select("div[id='view:otim']")
      .selectAll("button")
      .data(ga["otim"]);
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
        info();
      })
      .on("mouseout", function (ev) {
        this.style.textDecoration = "none";
      })
      .on("mouseover", function (ev) {
        this.style.textDecoration = "line-through";
        console.log("btn mouseover=", ev.target);
      });
    zone.exit().remove();
    info();
  }
}

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
    d3.select("div[id='view:hoso']")
      .attr("class", "grid view-hoso w100 hov bang")
      //.style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("view:hoso", ga["bang"], " rec=", ev.target);
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
    d3.select("div[id='view:hoso']")
      .attr("class", "grid view-hoso w100 hov bang")
      //.style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("view:hoso", ga["bang"], " rec=", ev.target);
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

//tao option bang hoso:

function loopjs() {
  let t = 1;
  while (true) {
    try {
      //command
      t++;
    } catch (err) {
      break;
    }
  }
}




ga.tao();
mvc.tao();