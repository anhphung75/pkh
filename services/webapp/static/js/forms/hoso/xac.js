import { taodb, cap1, capn, luu, luun } from "./../../ttdl/db.js";
import { data_test } from "./../../test/data_test.js";

//khoi tao
var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
  namlamviec: new Date().getFullYear().toString(),
  bang: "nhandon",
  otim: [],
  tieude: [],
  dulieu: [],
};

//stim
//otim

//view:ketqua ->table
function nap_tieude() {
  let bang = ga["bang"];
  console.log("nap_tieude bang=", bang);
  //bang = bang.toLowerCase();
  switch (bang) {
    case "dshc":
      ga["tieude"] = [
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
    case "qtgt":
      ga["tieude"] = [
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
      ga["bang"] = "nhandon";
      ga["tieude"] = [
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
}
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
    ga["dulieu"] = res.data || [];
    console.log("ga['dulieu']=", ga["dulieu"]);
  });
}

function danhmuchoso(dulieu,colsBE) {
  let bang = d3.select("table[id='danhmuchoso']").attr("style", "margin: 0");

  //tieude
  bang
    .select("thead")
    .selectAll("th")
    .data(["TT", ...ga["tieude"]])
    .enter()
    .append("th")
    .attr("class", "c")
    .text((col) => col);

  //row
  let row = bang
    .select("tbody")
    .selectAll("tr")
    .data(ga["dulieu"])
    .enter()
    .append("tr")
    .attr("class", "l");
  //.filter()
  //.on("mouseenter,click", function () {
  //  d3.select(this).classed("mau test", true);
  //})
  //.on("mouseleave", function () {
  //  d3.select(this).classed("mau test", false);
  //});

  //col
  console.log("colsBE ga['dulieu'][0]=", ga["dulieu"][0]);
  let colsBE = Object.keys(ga["dulieu"][0]);
  let col = row
    .selectAll("td")
    .data((rec) => d3.permute(rec, colsBE))
    .enter()
    .append("td")
    .text((d) => d);
  let act = row
    .insert("td", "td")
    .attr("class", "c")
    .text(d,i=> d3.format("03d")(i))
    .html(d, (i) => {
      console.log("html d=",d," i=",i);
    });
  //react view
  row.exit().remove();
}
//view:hoso
//view:scan

class Otim {
  constructor() {
    this.don();
  }

  don() {
    ga["otim"] = [ga["namlamviec"]];
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
    this.hon = new Worker(document.getElementById("danhmuchoso").dataset.hon, {
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
  let i = 1;
  while (true) {
    try {
      //command
      i++;
    } catch (err) {
      break;
    }
  }
}

var tim = new Otim();
//var hoso = new Hoso();
function info() {
  d3.select("#info").text(JSON.stringify(ga, null, 4));
}

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
  nap_tieude();
  nap_dulieu();
  danhmuchoso();
  info();
  tim.don();
  //hoso.tat();
});

d3.select("#stim")
  .on("keydown", function (ev) {
    switch (ev.keyCode) {
      case 13: //enter goto 1st hosoloc
        tim.moi(this.value);
        break;
      case 45: //insert
        tim.moi(this.value);
        this.value = "";
        break;
      default:
        console.log("btn=", ev.code, " keyCode=", ev.keyCode);
    }
  })
  .on("input", function () {
    console.log("oninput s=", this.value);
  })
  .on("change", function () {
    console.log("onchange stim=", this.value);
  });

d3.select("#don-otim").on("click", function (ev) {
  console.log("btn clear otim=", ev.target);
  ga["otim"] = [ga["namlamviec"]];
  tim.xem();
});

//database
//taodb(ga['csdl']);
//capn(ga['csdl'], data_test);

function api_hoso(nam) {
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
    let dulieu = res.data || {};
    let flds_be = ["utcid", "sohoso", "khachhang", "diachigandhn"];
    let flds_fe = ["utcid", "so ho so", "khach hang", "dia chi"];
    show_ketqua(dulieu, flds_be, flds_fe);
  });
  //d3.json(api_url, {
  //  headers: new Headers({
  //    "Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
  //"Authorization", "Basic " + btoa(username + ":" + password));
  //  }),
  //}).then(json => { /* do something */ });
}

function show_ketqua(dulieu, flds_be, flds_fe) {
  let bang = d3
    .select("div[id='test']")
    .append("table")
    .attr("style", "margin: 0");
  //go bo class hidden
  d3.select("tbody").selectAll("tr").remove();
  //tieude

  bang
    .append("thead")
    .selectAll("th")
    .data(["crud", ...flds_fe])
    .enter()
    .append("th")
    .attr("class", "c")
    .text((fld) => fld);

  //row
  let row = bang
    .append("tbody")
    .selectAll("tr")
    .data(dulieu)
    .enter()
    .append("tr")
    .attr("class", "l hov");

  //col
  let col = row
    .selectAll("td")
    .data((rec) => d3.permute(rec, flds_be))
    .enter()
    .append("td")
    .text((d) => d);
  let crud = row.insert("td", "td");
  crud
    .append("button")
    .on("click", function () {
      console.log("button trash click=", this.value);
    })
    .html('<i class="fa fa-trash"></i>');
  crud
    .append("button")
    .on("click", function () {
      console.log("button edit click=", this.value);
    })
    .html('<i class="fa fa-edit"></i>');
  return bang;
}
