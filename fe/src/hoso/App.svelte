<script>
  import { kho, ga } from "../db/stores.js";
  import { getdsNam, getCookie } from "../utils.js";
  import Progress from "../Progress.svelte";
  import Hoso from "./Bang.svelte";
  //import HosoMoi from "./HosoMoi.svelte";
  // init data
  $kho.hoso = [];
  $kho.progress = 100;

  let curComp = Hoso;
  let dsnam = getdsNam(10);
  let namhoso = dsnam ? dsnam[1] : 0;
  let isOpen = false;

  //init data
  $ga.toa = getCookie("toa") || "cntd";
  $ga.khach = getCookie("khach") || ["khach", new Date().getTime()].join(".");
  $ga.ve = getCookie("ve") || "1pkh2Pkh3pKh4pkH";
  $ga.uuid = getCookie("uuid") || "1khacH2khaCh3khAch4kHach5Khach";

  const tuyen = "wss://" + location.host + "/api1108/" + $ga.toa + "/hoso/" + $ga.khach;
  //const tuyen = "wss://localhost:8888" + "/api1108/" + $ga.toa + "/hoso/" + $ga.khach;
  $ga.tau = new WebSocket(tuyen) || null;

  function nhanTau() {
    let noOK = false;
    let dsnhan = ["gom", "moi", "xem", "sua", "xoa"];
    try {
      $ga.tau.onmessage = function(event) {
        let chat = JSON.parse(event.data);
        if (dsnhan.indexOf(chat["tin"]["nhan"]) !== -1) {
          let vedi = chat["tin"]["uuid"] || "";
          let veve = chat["tin"]["ve"] || "";
          if ($ga.uuid === vedi || $ga.ve !== veve) {
            //check time
            let tgdi = parseInt(vedi.split(".").pop());
            let tgve = parseInt(veve.split(".").pop()) || 0;
            let chenhlech = tgve - tgdi;
            if (tgve - tgdi >= 0) {
              $ga.ve = veve;
              autoNhan(chat);
            }
          }
        }
      };
    } catch (err) {
      noOK = true;
      console.log("error " + err);
    } finally {
      if (noOK) {
        $ga.tau.onmessage = function(event) {
          let chat = JSON.parse(event.data);
          if (dsnhan.indexOf(chat["tin"]["nhan"]) !== -1) {
            let vedi = chat["tin"]["uuid"] || "";
            let veve = chat["tin"]["ve"] || "";
            if ($ga.uuid === vedi || $ga.ve !== veve) {
              //check time
              let tgdi = parseInt(vedi.split(".").pop());
              let tgve = parseInt(veve.split(".").pop()) || 0;
              let chenhlech = tgve - tgdi;
              if (tgve - tgdi >= 0) {
                $ga.ve = veve;
                autoNhan(chat);
              }
            }
          }
        };
      }
    }
  }
  function guiTau() {
    $kho.hoso = [];
    refreshHoso();
    let tgdi = new Date().getTime();
    let chat = {
      tin: { uuid: [$ga.khach, tgdi].join("."), nhan: "gom", ve: $ga.ve },
      kho: { hoso: { namhoso: namhoso } }
    };
    $ga.uuid = chat.tin.uuid;
    try {
      $ga.tau.send(JSON.stringify(chat));
    } catch (err) {
      //console.log("error " + err);
    }
  }

  //crud
  function refreshHoso() {
    $kho.dstim = [...$kho.dstim, "h"];
    let r = $kho.dstim.pop();
    r = null;
  }
  function gomHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    if (listhoso.length === 0) {
      return;
    }
    let hsnam = listhoso.filter(i => i.mahoso.startsWith(namhoso));
    listhoso = JSON.parse(JSON.stringify(hsnam));
    let hosonew = [];
    let l = listhoso.length;
    for (let i = 0; i < l; i++) {
      hosonew.push(listhoso[i]);
    }
    $kho.hoso = JSON.parse(JSON.stringify(hosonew));
    refreshHoso();
  }
  function moiHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    if (listhoso.length === 0) {
      return;
    }
    let hsnam = listhoso.filter(i => i.mahoso.startsWith(namhoso));
    listhoso = JSON.parse(JSON.stringify(hsnam));
    let dsmahoso = [];
    let l = $kho.hoso.length || 0;
    for (let i = 0; i < l; i++) {
      dsmahoso.push($kho.hoso[i]["mahoso"]);
    }
    let hosonew = listhoso.filter(i => dsmahoso.indexOf(i.mahoso) === -1);
    listhoso = JSON.parse(JSON.stringify(hosonew));
    hosonew = JSON.parse(JSON.stringify($kho.hoso)) || [];
    l = listhoso.length || 0;
    for (let i = 0; i < l; i++) {
      hosonew.push(listhoso[i]);
    }
    $kho.hoso = JSON.parse(JSON.stringify(hosonew));
    refreshHoso();
  }
  function suaHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    let hoso = JSON.parse(JSON.stringify($kho.hoso)) || [];
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
    let hoso = JSON.parse(JSON.stringify($kho.hoso)) || [];
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
          hoso.splice(i, 1);
          break;
        }
      }
    }
    $kho.hoso = JSON.parse(JSON.stringify(hoso));
    refreshHoso();
  }

  function autoNhan(chat) {
    chat = JSON.parse(JSON.stringify(chat));
    let listhoso = JSON.parse(chat.kho.hoso) || [];
    console.log("listhoso type of=" + typeof(listhoso));
    //listhoso = JSON.parse(JSON.stringify(listhoso));
    let hosonew = [];
    let l = listhoso.length;
    for (let i = 0; i < l; i++) {
      hosonew.push(listhoso[i]);
    }
    listhoso =hosonew;
    console.log("listhoso=" + JSON.stringify(listhoso));
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
  $: autonhan: nhanTau();
</script>

<style>
  section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  main {
    flex: 1 1 auto;
  }
</style>

<section>
  <header class="container-fluid">
    <div class="row justify-content-center text-primary">
      <div class="col-auto" on:click={() => (isOpen = !isOpen)}>
        <h3>DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM {namhoso}</h3>
      </div>
    </div>
    {#if isOpen}
      <div class="row">
        <div class="col-auto">Vui lòng lựa chọn hồ sơ của năm&nbsp;</div>
        <div class="col-auto">
          <select class="custom-select" id="selectnam" bind:value={namhoso}>
            {#each dsnam as item}
              <option value={item}>{item}</option>
            {/each}
          </select>
        </div>
        <div class="col">
          <button
            class="btn btn-outline-primary btn-rounded"
            type="button"
            on:click={guiTau}>
            <i class="fa fa-sync-alt" />
          </button>
        </div>
      </div>
    {/if}
    <Progress />
  </header>

  <main>
    <svelte:component this={Hoso} />
  </main>

  <footer />
</section>
