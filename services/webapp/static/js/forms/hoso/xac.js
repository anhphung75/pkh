class Hoso {
  constructor(nam) {
    this.nam = nam;
    this.bang = 1;
    this.tieude = [];
    this.textloc = ["nd crud", "nd utcid", "nd sodot", "nd khachhang", "nd diachi", "nd ngaythietke", "nd ngaylendot", "nd ngaythicong", "nd ngaytrongai"];
    this.scanloc = []
    console.log("class Hoso nam=", this.nam, " bang=", this.bang);
  }

  tieu_de(bang = 1) {
    bang = parseInt(bang) || this.bang;
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
  noidung() {
    let dulieu = [];
    switch (this.bang) {
      case 2:
        dulieu = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
        break;
      case 3:
        dulieu = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
        break;
      default:
        dulieu = ["crud", "utcid", "sodot", "khachhang", "diachi", "ngaythietke", "ngaylendot", "ngaythicong", "ngaytrongai"];
    }
    d3.select("#ketqua-noidung")
      .append("div")
      .attr("class", "grid w100 hov bang" + this.bang)
      //.style("background-color", "#d1e5f0")
      .on("mouseover", function (ev) {
        console.log("ketqua-noidung bang", this.bang, " rec=", ev.target);
      })
      .selectAll("div")
      .data(dulieu)
      .enter()
      .append("div")
      .text((d) => d)
      .attr("class", (d) => "l bl cot" + dulieu.indexOf(d))
      .style("color", "magenta")
      .on("click", function (ev) {
        //sort
      });
  }
  hoso() {
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
    this.textloc = [{crud:"nd crud"},{uctid:"nd utcid"}];
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

function moi_otim(s) {
  s = s.trim().toLowerCase() || "";
  if (s.length < 1 || otim.indexOf(s) > -1) {
    return;
  }
  otim.push(s);
}

function xoa_otim(s) {
  s = s.trim().toLowerCase() || "";
  otim = otim.filter((i) => i !== s);
}

function view_otim() {
  d3.select("#view-otim").selectAll("*").remove();
  d3.select("#view-otim")
    .selectAll("button")
    .data(otim)
    .enter()
    .append("button")
    .text((d) => d)
    .attr("class", "l b1px")
    .style("paddingLeft", "1em")
    .style("color", "red")
    .on("click", function (ev) {
      let s = this.textContent || this.innerText;
      this.remove();
      xoa_otim(s);
    })
    .on("mouseout", function (ev) {
      this.style.textDecoration = "none";
    })
    .on("mouseover", function (ev) {
      this.style.textDecoration = "line-through";
      console.log("btn mouseover=", ev.target);
      d3.select("#info").text(otim);
    });
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
  d3.select("#info").text(otim);
}

//main
let namlamviec = "2020",
  otim = [namlamviec],
  w = [];

let hon = new Worker(document.getElementById("view-ketqua").dataset.hon);

d3.select("#stim")
  .on("keydown", function (ev) {
    let s = this.value.trim().toLowerCase();
    switch (ev.keyCode) {
      case 13:
        moi_otim(this.value);
        view_otim();
        break;
      case 45:
        moi_otim(this.value);
        this.value = "";
        view_otim();
        break;
      default:
        //che cac rows ko thoa
        hon.postMessage("post from xac");
        hon.onmessage = (e) => {
          let kq = any2obj(e.data);
          try {
            if (kq.cv == 0) {
              self.terminate();
              if ("err" in kq) {
                console.log("err=", kq.err);
              }
            }
            console.log("post from hon=", kq);
          } catch (err) {
            console.log("err on hon=", err);
          }
        }

    }
  })
  .on("input", function () {
    console.log("oninput stim=", this.value);
  })
  .on("change", function () {
    console.log("onchange stim=", this.value);
  });

d3.select("#clear-otim").on("click", function (ev) {
  console.log("btn clear otim=", ev.target);
  otim = [namlamviec];
  view_otim();
});

d3.select("#namlamviec")
  .on("change", function doinam() {
    if (namlamviec == this.value) {
      return;
    }
    xoa_otim(namlamviec);
    namlamviec = this.value;
    moi_otim(namlamviec);
    view_otim();
    let xem = new Hoso(namlamviec);
    xem.tieu_de(1);
    xem.noidung();
    xem.hoso();
    console.log("namlamviec=", namlamviec);
    info();
  });
