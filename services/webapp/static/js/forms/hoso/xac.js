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

function info() {
  d3.select("#info").text(otim);
}

//main
let namlamviec = "2020",
  otim = [namlamviec],
  w=[];
let hon = new Worker("./hon.js");

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
        console.log("press key=", ev.code, " code=", ev.keyCode);
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

d3.select("#namlamviec").on("change", function doinam() {
  if (namlamviec == this.value) {
    return;
  }
  xoa_otim(namlamviec);
  namlamviec = this.value;
  moi_otim(namlamviec);
  view_otim();
  console.log("namlamviec=", namlamviec);
  info();
});
