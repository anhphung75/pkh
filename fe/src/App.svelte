<script>
  import { kho, chu } from "./stores.js";
  import { getdsNam, getCookie } from "./utils.js";
  import Progress from "./Progress.svelte";
  import Hoso from "./Banghoso.svelte";
  //import HosoMoi from "./HosoMoi.svelte";
  // init data
  $chu.conggiaotiep = $chu.conggiaotiep ? $chu.conggiaotiep : "pkh";
  $chu.manguoidung = $chu.manguoidung ? $chu.manguoidung : "pkh002";
  $chu.magiaotiep = $chu.magiaotiep ? $chu.magiaotiep : "1pkh2Pkh3pKh4pkH";
  $kho.hoso = $kho.hoso ? $kho.hoso : [];
  $kho.progress = $kho.progress ? $kho.progress : 100;

  import { tamdskh } from "./tamdskh.js";
  $kho.hoso = $kho.hoso ? $kho.hoso : tamdskh;
  let curComp = Hoso;
  let dsnam = getdsNam(10);
  let namhoso = dsnam ? dsnam[1] : 0;
  let isOpen = false;

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
    if (listhoso.length === 0) {
      return;
    }
    if ($kho.hoso.length === 0) {
      $kho.hoso = listhoso;
      return;
    }
    let l1 = listhoso.length;
    for (let i1 = 0; i1 < l1; i1++) {
      let hsr = listhoso[i1];
      let l = $kho.hoso.length;
      for (let i = 0; i < l; i++) {
        let hss = $kho.hoso[i];
        if (hsr.mahoso === hss.mahoso) {
          for (let k in hsr) {
            if (hss.hasOwnProperty(k)) {
              hss[k] = hsr[k];
            }
          }
        }
      }
    }
    refreshHoso();
  }
  function xoaHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    if (listhoso.length === 0 || $kho.hoso.length === 0) {
      return;
    }
    let l1 = listhoso.length;
    for (let i1 = 0; i1 < l1; i1++) {
      let hsr = listhoso[i1];
      let l = $kho.hoso.length;
      for (let i = 0; i < l; i++) {
        let hss = $kho.hoso[i];
        if (hsr.mahoso === hss.mahoso) {
          $kho.hoso.splice(i, 1);
          break;
        }
      }
    }
    $kho.hoso = $kho.hoso;
    refreshHoso();
  }
  //rest
  //const socket_url = "ws://" + location.host + "/api1108/" + conggiaotiep + "/hoso/" + manguoidung;
  const socket_url =
    "ws://localhost:8888" +
    "/api1108/" +
    $chu.conggiaotiep +
    "/hoso/" +
    $chu.manguoidung;
  var ws = new WebSocket(socket_url);
  function nhanSocket() {
    let noOK = false;
    try {
      ws.onmessage = function(event) {
        let chat = JSON.parse(event.data);
        console.log("nhanSocket tin tu server: 'tin'=" + JSON.stringify(chat));
        if (
          ["gom", "moi", "xem", "sua", "xoa"].indexOf(
            chat["data"]["tin"]["nhan"]
          ) !== -1
        ) {
          return {
            nhan: chat["data"]["tin"]["nhan"],
            hoso: chat["data"]["goi"]["hoso"]
          };
        }
      };
    } catch (err) {
      let noOK = true;
      console.log("error " + err);
    } finally {
      if (noOK) {
        ws = new WebSocket(socket_url);
        ws.onmessage = function(event) {
          let chat = JSON.parse(event.data);
          console.log(
            "nhanSocket tin tu server: 'tin'=" + JSON.stringify(chat)
          );
          if (
            ["gom", "moi", "xem", "sua", "xoa"].indexOf(
              chat["data"]["tin"]["nhan"]
            ) !== -1
          ) {
            return {
              nhan: chat["data"]["tin"]["nhan"],
              hoso: chat["data"]["goi"]["hoso"]
            };
          }
        };
      }
    }
  }

  function guiSocket(datajson) {
    let noOK = false;
    try {
      ws.send(JSON.stringify(datajson));
      console.log("rest try guiSocket=" + JSON.stringify(datajson));
    } catch (err) {
      noOK = true;
      console.log("error " + err);
    } finally {
      if (noOK) {
        ws = new WebSocket(socket_url);
        ws.send(JSON.stringify(datajson));
      }
    }
  }
  // gui server
  $: $chu.conggiaotiep = getCookie("conggiaotiep") || "pkh";
  $: $chu.manguoidung = getCookie("manguoidung") || "pkh002";
  $: $chu.magiaotiep = getCookie("magiaotiep") || "1pkh2Pkh3pKh4pkH";
  $: $chu._xsrf = getCookie("_xsrf") || "1pkH2pKh3Pkh4pkh";
  function guiServer() {
    var chat = {
      uuid: [$chu.manguoidung, Date.now()].join("."),
      data: { tin: {}, goi: {} }
    };
    chat.data.tin = { nhan: "gom", magiaotiep: $chu.magiaotiep };
    chat.data.tin._xsrf = $chu._xsrf;
    chat.data.goi = { hoso: { namhoso: namhoso } };
    guiSocket(chat);
    console.log("guiSocket=" + JSON.stringify(chat));
  }
  function nhanServer() {
    let chat = nhanSocket() || { nhan: "", hoso: [] };
    if (chat.nhan === "moi") {
      $kho.hoso = chat.hoso ? moiHoso(chat.hoso) : $kho.hoso;
    }
    if (chat.nhan === "sua") {
      $kho.hoso = chat.hoso ? suaHoso(chat.hoso) : $kho.hoso;
    }
    if (chat.nhan === "xoa") {
      $kho.hoso = chat.hoso ? xoaHoso(chat.hoso) : $kho.hoso;
    }
  }
  $: autoUpdate = nhanServer();
</script>

<style>
  section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
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
        <div class="col">Vui lòng lựa chọn hồ sơ của năm&nbsp;</div>
        <div class="col-auto">
          <select class="custom-select" id="selectnam" bind:value={namhoso}>
            {#each dsnam as item}
              <option value={item}>{item}</option>
            {/each}
          </select>
        </div>
        <div class="col-auto">
          <button
            class="btn btn-outline-primary btn-rounded"
            type="button"
            on:click={guiServer}>
            <i class="fa fa-sync-alt" />
          </button>
        </div>
      </div>
    {/if}
    <Progress />
  </header>

  <main>
    <svelte:component this={curComp} />
  </main>

  <footer />
</section>
