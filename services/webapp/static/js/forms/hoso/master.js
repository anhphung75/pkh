import { getCookie } from "./../utils/web.js";
import { any2obj } from "./../utils/dulieu.js";
let cty = getCookie('macongty') || 'Cntd';
let pbd = getCookie('madvtc') || '';
const csdl = cty + "_" + pbd;
const None = null, w;
let xuongkysu = "./kysu.js", kysu = [];
let xuonghoasy = "./hoasy.js", hoasy = [];
let dulieu

let otim = {
  "namlamviec": 2020,
  "plqt": "",
  "utcid":{"hoso":0,"dvtc":0,"dot":0,"qtgt":0},
  "ma":{"hoso":"","dvtc":"","dot":"","qtgt":""},
};

function stim_keyup(ev) {
  return
}

function clear_otim() {
  document.getElementsById("stim").dataset.otim="";
  document.getElementsById("view-otim").innerHTML=""
}

function add_otim(stim) {
  let a= document.getElementsById("stim").dataset.otim;
  a =JSONparse(a);
  if ("stim" in a){ return;}
  a[stim]=1;
  document.getElementsById("stim").dataset.otim=JSONstringify(a);
  let _id="otim-" + new Date().getTime();
  b = document.createElement("button");
  b.setAttribute("id", _id);
  b.setAttribute("class", "l");
  b.innerHTML=stim + '&times;'
  b.onclick=del_element(_id);
  document.getElementsById("view-otim").appendChild(b);
}

function del_element(uid){
  let myobj = document.getElementById(uid);
  myobj.remove();
}

function options_dot(){
  let i = 0;
  kysu[i] = new Worker(xuongkysu);
  kysu[i].postMessage({ "csdl": csdl, "lenh": { "options_dot": otim } });
  kysu[i].onmessage = (e) => {
    dulieu = any2obj(e.data);
    if (dulieu.cv == 0) {
      kysu[i].terminate();
      if ('err' in dulieu) {
        console.log("err=", dulieu.err);
      }
      //gan vao data-options cua ctl
      let kq=dulieu.kq;
    }
  }
}