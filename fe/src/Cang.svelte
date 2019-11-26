<script>
  import { kho, ga } from "./stores.js";
  //init data
  let toa = $ga.toa || "pkh";
  let khach = $ga.khach || ["pkh002", Date.now()].join(".");
  let ve = $ga.ve || "1pkh2Pkh3pKh4pkH";
  let _xsrf = $ga._xsrf || "1pkH2pKh3Pkh4pkh";
  let namhoso = $kho.namhoso || 2019;
  let hoso = $kho.hoso || [];
  let hososua = $kho.hososua || [];
  let hosomoi = $kho.hosomoi || [];
  let lenhgui = $kho.lenhgui || "";
  let isOpen = true;
  //tam
  //import { tamdskh } from "./tamdskh.js";
  //$kho.hoso = tamdskh;
  //het tam

  //const tuyen = "tau://" + location.host + "/api1108/" + toa + "/hoso/" + khach;
  const tuyen = "ws://localhost:8888" + "/api1108/" + toa + "/hoso/" + khach;
  $ga.tau = new WebSocket(tuyen) || null;

  function nhanTau() {
    let noOK = false;
    let dsnhan = ["gom", "moi", "xem", "sua", "xoa"];
    try {
      $ga.tau.onmessage = function(event) {
        let chat = JSON.parse(event.data);
        //console.log("nhanSocket tin tu server: nhan=" + nhan + " tin=" + JSON.stringify(chat));
        if (dsnhan.indexOf(chat["tin"]["nhan"]) !== -1) {
          $ga.ve = chat["tin"]["ve"];
          autoNhan(chat);
        }
      };
    } catch (err) {
      let noOK = true;
      console.log("error " + err);
    } finally {
      if (noOK) {
        $ga.tau = new WebSocket(tuyen);
        $ga.tau.onmessage = function(event) {
          let chat = JSON.parse(event.data);
          //console.log("nhanSocket tin tu server: nhan=" + nhan + " tin=" + JSON.stringify(chat));
          if (dsnhan.indexOf(chat["tin"]["nhan"]) !== -1) {
            $ga.ve = chat["tin"]["ve"];
            autoNhan(chat);
          }
        };
      }
    }
  }
  function guiTau(nhan, hang) {
    let chat = {
      tin: { uuid: [khach, Date.now()].join("."), nhan: nhan, ve: ve },
      kho: hang
    };
    try {
      $ga.tau.send(JSON.stringify(chat));
      console.log("rest try guiSocket=" + JSON.stringify(chat));
    } catch (err) {
      console.log("error " + err);
    }
  }

  //crud
  function refreshHoso() {
    $kho.dstim = [...$kho.dstim, "h"];
    let r = $kho.dstim.pop();
    r = null;
  }
  function moiHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    if (listhoso.length === 0) {
      return;
    }
    let hsnam = listhoso.filter(i => i.mahoso.startsWith(namhoso));
    listhoso = JSON.parse(JSON.stringify(hsnam));
    $kho.hoso = [...$kho.hoso, listhoso];
    refreshHoso();
  }
  function suaHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    let l = hoso.length;
    if (listhoso.length === 0 || l === 0) {
      return;
    }
    let l1 = listhoso.length;
    for (let i1 = 0; i1 < l1; i1++) {
      let hsr = listhoso[i1];
      for (let i = 0; i < l; i++) {
        let hss = hoso[i];
        if (hsr.mahoso === hss.mahoso) {
          for (let k in hsr) {
            if (hss.hasOwnProperty(k)) {
              hss[k] = hsr[k];
            }
          }
        }
      }
    }
    $kho.hoso = JSON.parse(JSON.stringify(hoso));
    refreshHoso();
  }
  function xoaHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    let l = hoso.length || 0;
    if (listhoso.length === 0 || l === 0) {
      return;
    }
    let l1 = listhoso.length;
    for (let i1 = 0; i1 < l1; i1++) {
      let hsr = listhoso[i1];
      for (let i = 0; i < l; i++) {
        let hss = $kho.hoso[i];
        if (hsr.mahoso === hss.mahoso) {
          $kho.hoso.splice(i, 1);
          break;
        }
      }
    }
    $kho.hoso = hoso;
    refreshHoso();
  }

  function autoNhan(chat) {
    let listhoso = chat.kho.hoso || [];
    if (listhoso.length === 0) {
      return;
    }
    if (chat.tin.nhan === "moi" || chat.tin.nhan === "gom") {
      moiHoso(listhoso);
    }
    if (chat.tin.nhan === "sua") {
      suaHoso(listhoso);
    }
    if (chat.tin.nhan === "xoa") {
      xoaHoso(listhoso);
    }
  }
  $: lenhgui = $kho.lenhgui || "";
  console.log("Cang lenhgui= " + lenhgui);
  function autoGui() {
    console.log("autoGui lenhgui= " + lenhgui);
    if (lenhgui === "gom") {
      let nhan = "gom";
      let hang = { hoso: { namhoso: namhoso } };
      guiTau(nhan, hang);
    }
    if (lenhgui === "moi") {
      let nhan = "moi";
      moiHoso(hosomoi);
      guiTau(nhan, hosomoi);
    }
    if (lenhgui === "sua") {
      let nhan = "sua";
      suaHoso(hososua);
      guiTau(nhan, hososua);
    }
    if (lenhgui === "xoa") {
      let nhan = "xoa";
      xoaHoso(hososua);
    }
  }
  $: autogui: autoGui();
  $: autonhan: nhanTau();
  console.log("Cang $kho.hoso=" + JSON.stringify($kho.hoso));
</script>

<style>

</style>

{#if isOpen}
  <div>{hoso}</div>
{/if}
