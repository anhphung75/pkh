import { getCookie } from "./../utils/web.js";
import { any2obj } from "./../utils/dulieu.js";
let cty = getCookie('macongty') || 'Cntd';
let pbd = getCookie('madvtc') || '';
const csdl = cty + "_" + pbd;
const None = null, w;
let xuongkysu = "./kysu.js", kysu = [];
let xuonghoasy = "./hoasy.js", hoasy = [];
let dulieuin = [], odata = {};


function load_dulieu() {
  //lay list dot da danh dau
  let i = 0;
  kysu[i] = new Worker(xuongkysu);
  kysu[i].postMessage({ "csdl": csdl, "lenh": { "dulieuin": "dot" } });
  kysu[i].onmessage = (e) => {
    const odl = any2obj(e.data);
    if (old.cv == 0) {
      kysu[i].terminate();
      if ('err' in old) {
        console.log("err=", odl.err);
      }
    }
    let madot = odl.madot;
    dulieuin.push(madot);
    odata[madot] = { ...odl.odata };
    //lay dulieu qtvt
    odata[madot]['cpvt'] = [];
    i++;
    kysu[i] = new Worker(xuongkysu);
    kysu[i].postMessage({ "csdl": csdl, "lenh": { "qtvt": madot } });
    kysu[i].onmessage = (e) => {
      const odl = any2obj(e.data);
      if (old.cv == 0) {
        kysu[i].terminate();
        if ('err' in old) {
          console.log("err=", odl.err);
        }
      }
      let chiphi = { ...odl.chiphi };
      odata[madot]['cpvt'].push(chiphi);
    }
  }
}


function chung() {
  let i = 0;
  hoasy[i] = new Worker(xuonghoasy);
  hoasy[i].postMessage({ "csdl": csdl, "lenh": { "dulieuin": "dot" } });
  hoasy[i].onmessage = (e) => {
    const odl = any2obj(e.data);
    if (old.cv == 0) {
      hoasy[i].terminate();
      if ('err' in old) {
        console.log("err=", odl.err);
      }
    }
    let madot = odl.madot;
    dulieuin.push(madot);
    odata[madot] = { ...odl.odata };
    //lay dulieu qtvt
    odata[madot]['cpvt'] = [];
    i++;
    hoasy[i] = new Worker(xuongkysu);
    hoasy[i].postMessage({ "csdl": csdl, "lenh": { "qtvt": madot } });
    hoasy[i].onmessage = (e) => {
      const odl = any2obj(e.data);
      if (old.cv == 0) {
        hoasy[i].terminate();
        if ('err' in old) {
          console.log("err=", odl.err);
        }
      }
      let chiphi = { ...odl.chiphi };
      odata[madot]['cpvt'].push(chiphi);
    }
  }
}

function auto_render() {

}

