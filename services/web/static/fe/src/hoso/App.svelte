<script>
  import { kho, ga } from "../db/stores.js";
  import { getdsNam } from "../utils/thoigian.js";
  import { getCookie, listObj2Obj } from "../utils/api.js";
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
  function capnhatHoso(listdict) {
    let hosomoi, hosocu, hsr, uuid, l, i, k;
    if (Array.isArray(listdict)) {
      hosomoi = listdict;
    } else {
      hosomoi = [listdict];
    }
    l = hosomoi.length || 0;
    if (l === 0) {
      return;
    }
    hosocu = listObj2Obj($kho.hoso, "mahoso") || {};
    for (i = 0; i < l; i++) {
      hsr = hosomoi[i];
      uuid = hsr["mahoso"];
      if (uuid.startsWith(namhoso)) {
        hosocu[uuid] = {};
        for (k in hsr) {
          hosocu[uuid][k] = hsr[k];
        }
      }
    }
    //convert to list
    hosomoi = [];
    for (k in hosocu) {
      if (k.startsWith(namhoso)) {
        hosomoi.push(hosocu[k]);
      }
    }
    $kho.hoso = hosomoi;
    refreshHoso();
  }
  function xoaHoso(listdict) {
    let hosomoi, hosocu, hsr, uuid, l, i, k;
    l = $kho.hoso.length || 0;
    if (l === 0) {
      return;
    }
    if (Array.isArray(listdict)) {
      hosomoi = listdict;
    } else {
      hosomoi = [listdict];
    }
    l = hosomoi.length || 0;
    if (l === 0) {
      return;
    }
    hosocu = listObj2Obj($kho.hoso, "mahoso") || {};
    for (i = 0; i < l; i++) {
      hsr = hosomoi[i];
      uuid = hsr["mahoso"];
      delete hosocu[uuid];
    }
    //convert to list
    hosomoi = [];
    for (k in hosocu) {
      hosomoi.push(hosocu[k]);
    }
    $kho.hoso = hosomoi;
    refreshHoso();
  }
  function gomHoso(listdict) {
    $kho.hoso = [];
    capnhatHoso(listdict);
  }
  $ga.tuyen_https = "https://" + location.host + "/api1108/hoso/" + namhoso;
  //$ga.tuyen_https = "http://localhost:8888/api1108/hoso/" + namhoso;
  function gomHttps() {
    axios({
      method: "get",
      url: $ga.tuyen_https,
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
      url: $ga.tuyen_https + "sse",
      responseType: "json",
      responseEncoding: "utf8"
    }).then(response => {
      let chat = response.data || "{}";
      if (chat.event === "moi" || chat.event === "sua") {
        capnhatHoso(JSON.parse(chat.data));
      }
      if (chat.event === "xoa") {
        xoaHoso(JSON.parse(chat.data));
      }
    });
  }
  //$: autoUpdateHoso = setInterval(capnhatHttps, capnhattheoms);
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
