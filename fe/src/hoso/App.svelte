<script>
  import { kho, ga } from "../db/stores.js";
  import {
    getdsNam,
    getCookie,
    str2ListObj,
    ListObj2Obj,
    deepCopy
  } from "../utils.js";
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
  let capnhattheoms = 60 * 1000;

  //crud
  function refreshHoso() {
    $kho.dstim = [...$kho.dstim, "h"];
    let r = $kho.dstim.pop();
    r = null;
  }
  function hosoNam(listdict) {
    console.log("type hosoNam = " + typeof listdict);
    console.log("hosoNam = " + JSON.stringify(listdict));
    listdict = str2ListObj(listdict) || [];
    if (listdict.length === 0) {
      return [];
    }
    let listhoso = listdict.filter(i => i.mahoso.startsWith(namhoso));
    return listhoso;
  }
  function gomHoso(listdict) {
    let listhoso = hosoNam(listdict);
    let l = listhoso.length;
    if (l === 0) {
      return;
    }
    $kho.hoso = [];
    refreshHoso();
    listdict = [];
    for (let i = 0; i < l; i++) {
      listdict.push(listhoso[i]);
    }
    $kho.hoso = listdict;
    refreshHoso();
  }
  function moiHoso(listdict) {
    let listhoso = hosoNam(listdict);
    if (listhoso.length === 0) {
      return;
    }
    let dsmahoso = [];
    let l = $kho.hoso.length || 0;
    for (let i = 0; i < l; i++) {
      dsmahoso.push($kho.hoso[i]["mahoso"]);
    }
    listdict = listhoso.filter(i => dsmahoso.indexOf(i.mahoso) === -1);
    hosonew = deepCopy($kho.hoso) || [];
    l = listdict.length || 0;
    for (i = 0; i < l; i++) {
      hosonew.push(listdict[i]);
    }
    $kho.hoso = hosonew;
    refreshHoso();
  }
  function suaHoso(listdict) {
    let listhoso = hosoNam(listdict);
    console.log("suaHoso = " + JSON.stringify(listdict));
    let l = listhoso.length;
    if (l === 0) {
      return;
    }
    let hoso = $kho.hoso || [];
    let l1 = hoso.length;
    if (l1 === 0) {
      return;
    }
    for (let i = 0; i < l; i++) {
      let hsr = listhoso[i];
      for (let i1 = 0; i1 < l1; i1++) {
        let hss = hoso[i1];
        if (hsr.mahoso === hss.mahoso) {
          for (let k in hsr) {
            if (hss.hasOwnProperty(k)) {
              hss[k] = hsr[k];
            }
          }
          break;
        }
      }
    }
    $kho.hoso = hoso;
    refreshHoso();
  }
  function xoaHoso(listdict) {
    let listhoso = hosoNam(listdict);
    let l = listhoso.length;
    if (l === 0) {
      return;
    }
    let hoso = $kho.hoso || [];
    let l1 = hoso.length;
    if (l1 === 0) {
      return;
    }
    for (let i = 0; i < l; i++) {
      let hsr = listhoso[i];
      for (let i1 = 0; i1 < l1; i1++) {
        let hss = hoso[i1];
        if (hsr.mahoso === hss.mahoso) {
          hoso.splice(i1, 1);
          break;
        }
      }
    }
    $kho.hoso = hoso;
    refreshHoso();
  }

  //const tuyen_https = "https://" + location.host + "/api1108/hoso/";
  const tuyen_https = "http://localhost:8888/api1108/hoso/";
  function gomHttps() {
    axios({
      method: "get",
      url: tuyen_https + namhoso,
      responseType: "json",
      responseEncoding: "utf8",
      onDownloadProgress: progressEvent => {
        let percentCompleted = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        $kho.progress = percentCompleted;
        console.log("$kho.progress=" + $kho.progress);
      }
    }).then(response => {
      let chat = response.data.data || "[]";
      gomHoso(JSON.parse(chat));
    });
  }

  function capnhatHttps() {
    axios({
      method: "get",
      url: tuyen_https + "sse",
      responseType: "json",
      responseEncoding: "utf8"
    }).then(response => {
      let chat = response.data || "{}";
      if (chat.event === "moi") {
        moiHoso(JSON.parse(chat.data));
      }
      if (chat.event === "sua") {
        suaHoso(JSON.parse(chat.data));
      }
      if (chat.event === "xoa") {
        xoaHoso(JSON.parse(chat.data));
      }
    });
  }
  $: autoUpdateHoso = setInterval(capnhatHttps, capnhattheoms);
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
            on:click={gomHttps}>
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
