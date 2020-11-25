var any2obj = (sdata) => {
  try {
    if (typeof sdata === 'string') {
      let data = sdata.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
      sdata = data.replace(/'/g, '"');
      return JSON.parse(sdata);
    }
  } catch (err) {
    return { "err": sdata };
  }
};

var ga = { "csdl": "pkh", "namlamviec": new Date().getFullYear().toString(), "otim": [] };

class Otim {
  constructor() {
    d3.select("#clear-otim").on("click", function (ev) {
      console.log("btn clear otim=", ev.target);
      ga['otim'] = [ga['namlamviec']];
      this.xem();
    });
    this.clear();
  }

  clear() {
    ga['otim'] = [ga['namlamviec']];
    this.xem();
  }

  moi(s) {
    s = s.trim().toLowerCase() || "";
    if (s.length < 1 || ga['otim'].indexOf(s) > -1) {
      return;
    }
    ga['otim'].push(s);
    this.xem();
  }

  xoa(s) {
    s = s.trim().toLowerCase() || "";
    ga['otim'] = ga['otim'].filter((i) => i !== s);
    this.xem();
  }

  sua(s) {
    s = s.trim().toLowerCase() || "";
    if (s.length < 1 || ga['otim'].indexOf(s) > -1) {
      return;
    }
    ga['otim'].pop();
    ga['otim'].push(s);
    this.xem();
  }

  xem() {
    d3.select("div[id='view:otim']").selectAll("*").remove();
    d3.select("div[id='view:otim']")
      .selectAll("button")
      .data(ga['otim'])
      .enter()
      .append("button")
      .text((d) => d)
      .attr("class", "l b1px")
      .style("paddingLeft", "1em")
      .style("color", "red")
      .on("click", function () {
        let s = this.textContent || this.innerText;
        this.xoa(s);
      })
      .on("mouseout", function (ev) {
        this.style.textDecoration = "none";
      })
      .on("mouseover", function (ev) {
        this.style.textDecoration = "line-through";
        console.log("btn mouseover=", ev.target);
      });
    d3.select("#info").text(ga['otim']);
  }
}


class Hoso {
  constructor() {
    this.hon = new Worker(document.getElementById("view-ketqua").dataset.hon);
    this.get_tieude(1);
    this.tat();
  }

  get_tieude(bang = 1) {
    bang = parseInt(bang) || 1;
    let dulieu = [];
    switch (bang) {
      case 2:
        this.bang = bang;
        dulieu = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
        break;
      case 3:
        this.bang = bang;
        dulieu = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
        break;
      default:
        this.bang = 1;
        dulieu = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
    }
    this.tieude = [...dulieu];
    let zone = d3.select("div[id='ketqua:tieude']")
    zone.attr("class", "grid w100 ba hov bang" + bang).style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("ketqua:tieude bang", this.bang, " rec=", ev.target);
      });
    zone.selectAll("*").remove();
    zone.selectAll("div")
      .data(dulieu).enter()
      .append("div")
      .text((d) => d)
      .attr("class", (d) => "c bl fb cot" + dulieu.indexOf(d))
      .style("color", "magenta")
      .on("click", function (ev) {
        //sort
      });
  }

  tat() {
    console.log("Hoso tat() sub Tim().clear();");
    new Otim().clear();
    d3.select("#namlamviec")
      .on("change", function () {
        let nam = this.value;
        if (ga['namlamviec'] == nam) {
          return;
        }
        switch (nam) {
          case Number.isInteger(nam):
            ga['namlamviec'] = nam.toString();
            break;
          case "":
          case "all":
          case "tat":
            ga['namlamviec'] = ""
            break;
          default:
            ga['namlamviec'] = new Date().getFullYear().toString();
        }
        console.log("namlamviec onchange Tim().clear();");
        new Otim().clear();
      });
    // load json data
    this.hon.terminate();
    this.hon.postMessage({ csdl: ga['csdl'], lenh: { "otim": ga['otim'] } });
    this.hon.onmessage = (e) => {
      let kq = any2obj(e.data);
      if (kq.cv == 0) {
        this.hon.terminate();
        if ("err" in kq) {
          console.log("err=", kq.err);
          return null;
        }
      }
      //gan vao data-options cua ctl
      let r = kq.kq;
      d3.select("#ketqua-noidung")
        .append("div")
        .attr("class", "grid w100 hov bang" + this.bang)
        //.style("background-color", "#d1e5f0")
        .on("mouseover", function (ev) {
          console.log("ketqua-noidung bang", this.bang, " rec=", ev.target);
        })
        .selectAll("div")
        .data(r)
        .enter()
        .append("div")
        .text((d) => d)
        .attr("class", (d, i) => {
          console.log("data d=", d, " i=", i);
          return "l bl cot" + r.indexOf(d);
        })
        .style("color", "magenta")
        .on("click", function (ev) {
          //sort
        });
    };
  }
  nap(uid = "") {
    let dulieu = [];
    switch (this.bang) {
      case 2:
        dulieu = ["nd crud", "nd utcid", "nd sodot", "nd khachhang", "nd diachi", "nd ngaythietke", "nd ngaylendot", "nd ngaythicong", "nd ngaytrongai"];
        break;
      case 3:
        dulieu = ["nd crud", "nd utcid", "nd sodot", "nd khachhang", "nd diachi", "nd ngaythietke", "nd ngaylendot", "nd ngaythicong", "nd ngaytrongai"];
        break;
      default:
        dulieu = ["nd crud", "nd utcid", "nd sodot", "nd khachhang", "nd diachi", "nd ngaythietke", "nd ngaylendot", "nd ngaythicong", "nd ngaytrongai"];
    }
    this.textloc = [{ crud: "nd crud" }, { uctid: "nd utcid" }];
    let curid = 0;
    d3.select("div[id='view:hoso']")
      .attr("class", "grid view-hoso w100 hov bang")
      //.style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("view:hoso", this.bang, " rec=", ev.target);
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
        dulieu = ["nd crud", "nd utcid", "nd sodot", "nd khachhang", "nd diachi", "nd ngaythietke", "nd ngaylendot", "nd ngaythicong", "nd ngaytrongai"];
        break;
      case 3:
        dulieu = ["nd crud", "nd utcid", "nd sodot", "nd khachhang", "nd diachi", "nd ngaythietke", "nd ngaylendot", "nd ngaythicong", "nd ngaytrongai"];
        break;
      default:
        dulieu = ["nd crud", "nd utcid", "nd sodot", "nd khachhang", "nd diachi", "nd ngaythietke", "nd ngaylendot", "nd ngaythicong", "nd ngaytrongai"];
    }
    this.textloc = [{ crud: "nd crud" }, { uctid: "nd utcid" }];
    let curid = 0;
    d3.select("div[id='view:hoso']")
      .attr("class", "grid view-hoso w100 hov bang")
      //.style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("view:hoso", this.bang, " rec=", ev.target);
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
function tao_banghoso() {
  let bang = document.getElementById("banghoso");
  // add row by nam, load hidden
  let dong = document.createElement("div");
  let dulieu = { utcid: "111222" };
  let madot = "",
    maqt = "",
    mahoso = "";
  dong.setAttribute("id", "hoso" + mahoso);
  dong.classList.add("che", "hoso", madot, maqt);

  bang.appendChild(dong);
}

function up_dot(madot) {
  //load dulieu dot
  let w = new Worker(hon);
  w.postMessage({ csdl: csdl, lenh: { options_dot: otim } });
  w.onmessage = (e) => {
    let kq = any2obj(e.data);
    if (kq.cv == 0) {
      w.terminate();
      if ("err" in kq) {
        console.log("err=", kq.err);
      }
    }
    //gan vao data-options cua ctl
    let r = kq.kq;
    let zone = document.querySelectorAll("#banghoso .hoso." + madot);
    //loop
    let i = 0;
    while (zone[i]) {
      try {
        let cell = zone[i];
        i++;
      } catch (err) {
        break;
      }
    }
  };
}


function loopjs() {
  let i = 1;
  while (true) {
    try {
      //command
      i++;
    }
    catch (err) {
      break;
    }
  }
}
function view_ketqua(bang = 1) {
  d3.select("#view-ketqua").selectAll("*").remove();
  bang = parseInt(bang) || 1;
  console.log("view_ketqua bang=", bang);
  //gan tieu de
  let tieude = [];
  switch (bang) {
    case 2:
      tieude = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
      break;
    case 3:
      tieude = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
      break;
    default:
      bang = 1;
      tieude = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
  }
  d3.select("#ketqua:tieude")
    .append("div")
    .attr("class", "grid w100 bang" + bang)
    .style("background-color", "#d1e5f0")
    .on("mouseover", function (ev) {
      console.log("view_ketqua bang", bang, " rec=", ev.target);
    });
  d3.select("#ketqua:tieude")
    .selectAll("div")
    .data(tieude)
    .enter()
    .append("div")
    .text((d) => d)
    .attr("class", (d) => "c ba fb hov cot" + tieude.indexOf(d))
    .style("color", "magenta")
    .on("click", function (ev) {
      //sort
    });
  //gan noidung
  let dulieu = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];;
  rec = d3.select("#view-ketqua")
    .append("div")
    .attr("class", "grid w100 bang" + bang)
    .on("mouseover", function (ev) {
      console.log("view_ketqua bang", bang, " rec=", ev.target);
    })
    .selectAll("div")
    .data(dulieu)
    .enter()
    .append("div")
    .text((d) => d)
    .attr("class", (d) => "l ba hov cot" + dulieu.indexOf(d))
    .on("click", function (ev) {
      //sort
    });

}

function info() {
  d3.select("#info").text(ga);
}

//main
d3.select("#stim")
  .on("keydown", function (ev) {
    let s = this.value.trim().toLowerCase();
    switch (ev.keyCode) {
      case 13://enter goto 1st hosoloc
        new Otim().moi(s);
        break;
      case 45://insert
        new Otim().moi(s);
        this.value = "";
        break;
      default:
        console.log("btn=", ev.code, " keyCode=", ev.keyCode);
    }
  })
  .on("input", function () {
    let s = this.value.trim().toLowerCase();
    console.log("oninput s=", s);
    new Otim().sua(s);
  })
  .on("change", function () {
    console.log("onchange stim=", this.value);
  });
new Hoso();
d3.select("#info").text(JSON.stringify(ga));




