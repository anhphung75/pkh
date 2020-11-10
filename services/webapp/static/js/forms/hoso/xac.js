//tao option bang hoso:
function tao_banghoso() {
    let bang = document.getElementById("banghoso");
    // add row by nam, load hidden
    let dong = document.createElement("div");
    let dulieu = { "utcid": "111222" };
    let madot = "", maqt = "", mahoso = "";
    dong.setAttribute("id", "hoso" + mahoso);
    dong.classList.add("che", "hoso", madot, maqt);

    bang.appendChild(dong);
};

function up_dot(madot) {
  //load dulieu dot
  let w = new Worker(hon);
  w.postMessage({ "csdl": csdl, "lenh": { "options_dot": otim } });
  w.onmessage = (e) => {
    let kq = any2obj(e.data);
    if (kq.cv == 0) {
      w.terminate();
      if ('err' in kq) {
        console.log("err=", kq.err);
      }
    }
    //gan vao data-options cua ctl
    let r=kq.kq;
    let zone=document.querySelectorAll('#banghoso .hoso.' + madot);
    //loop
    let i=0;
    while (zone[i]) {
      try {
        let cell=zone[i]
        i++;
      }
      catch(err) {
        break;
      }
    }
  }
}

