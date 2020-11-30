import { taodb, cap1, capn, luu, luun } from "./../../ttdl/db.js";
import { data_test } from "./../../test/data_test.js";
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
    let zone = d3.select("div[id='view:otim']")
      .selectAll("button")
      .data(ga["otim"]);
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
    this.hon = new Worker(document.getElementById("view-ketqua").dataset.hon,
      { type: 'module' });
    this.get_tieude(1);
    this.tat();
  }

  get_tieude(bang = 1) {
    bang = parseInt(bang) || 1;
    let dulieu = [];
    switch (bang) {
      case 2:
        ga['bang'] = bang;
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
        ga['bang'] = bang;
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
        ga['bang'] = 1;
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
        console.log("ketqua:tieude bang", ga['bang'], " rec=", ev.target);
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
    this.hon.postMessage({ csdl: ga["csdl"], nam: ga["namlamviec"] });
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
      switch (ga['bang']) {
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
        .attr("class", "grid w100 hov bang" + ga['bang'])
        //.style("background-color", "#d1e5f0")
        .on("mouseover", function (ev) {
          console.log("ketqua:noidung bang", ga['bang'], " rec=", ev.target);
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
    switch (ga['bang']) {
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
        console.log("view:hoso", ga['bang'], " rec=", ev.target);
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
        console.log("view:hoso", ga['bang'], " rec=", ev.target);
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


//khoi tao
var ga = {
  csdl: { "ten": "pkh", "sohieu": 1 },
  namlamviec: new Date().getFullYear().toString(),
  bang: 1,
  otim: [],
};
var tim = new Otim();
var hoso = new Hoso();
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
  api_hoso(namchu);
  info();
  tim.don();
  hoso.tat();
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
    tim.sua(this.value);
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

  let api_url = "https://localhost:8888/" + ga["csdl"]["ten"] + "/api/hoso/" + ga["namlamviec"];
  d3.json(api_url).then(json => { console.log("json from server=", JSON.stringify(json, null, 4)) });
  //d3.json(api_url, {
  //  headers: new Headers({
  //    "Authorization": `Basic ${base64.encode(`${login}:${password}`)}`
    //"Authorization", "Basic " + btoa(username + ":" + password));
  //  }),
  //}).then(json => { /* do something */ });
}