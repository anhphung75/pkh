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

function tim_hoso_utcid(){
  let i = 0;
  kysu[i] = new Worker(xuongkysu);
  kysu[i].postMessage({ "csdl": csdl, "lenh": { "tim_hoso_utcid": otim } });
  kysu[i].onmessage = (e) => {
    const odl = any2obj(e.data);
    if (old.cv == 0) {
      kysu[i].terminate();
      if ('err' in old) {
        console.log("err=", odl.err);
      }
    }
  }
}
