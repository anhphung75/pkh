import { getCookie } from "./../utils/web.js";
import { any2obj } from "./../utils/dulieu.js";
let cty = getCookie('macongty') || 'Cntd';
let pbd = getCookie('madvtc') || '';
const csdl = cty + "_" + pbd;
const None = null, w;
let xuongkysu = "./kysu.js", kysu = [];
let xuonghoasy = "./hoasy.js", hoasy = [];
let dulieuin = [], odata = {};


function get_dulieuin() {
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
    //lay dulieu qtgt
    odata[madot]['maqtgt'] = [];
    odata[madot]['macpvt'] = [];
    i++;
    kysu[i] = new Worker(xuongkysu);
    kysu[i].postMessage({ "csdl": csdl, "lenh": { "qtgt": madot } });
    kysu[i].onmessage = (e) => {
      const odl = any2obj(e.data);
      if (old.cv == 0) {
        kysu[i].terminate();
        if ('err' in old) {
          console.log("err=", odl.err);
        }
      }
      let maqtgt = odl.maqtgt;
      let macpvt = odl.macpvt;
      odata[madot]['maqtgt'].push(maqtgt);
      odata[madot]['macpvt'].push(macpvt);
      //lay dulieu chiphi
      odata[madot]['cpvt'] = {};
      i++;
      kysu[i] = new Worker(xuongkysu);
      kysu[i].postMessage({ "csdl": csdl, "lenh": { "qtvt": maqtgt } });
      kysu[i].onmessage = (e) => {
        const odl = any2obj(e.data);
        if (old.cv == 0) {
          kysu[i].terminate();
          if ('err' in old) {
            console.log("err=", odl.err);
          }
        }
        let machiphi = odl.machiphi;
        let soluong = odl.soluong;
        if (machiphi in odata[madot]['cpvt']) {
          odata[madot]['cpvt'][machiphi] += soluong;
        } else {
          odata[madot]['cpvt'][machiphi] = soluong;
        }
        //loai bo cac chi phi khong phai vat tu


      }
    }
  }
}


function chung() {

}

function auto_render() {

}

