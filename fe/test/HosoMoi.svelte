<script>
  import { kho } from "./stores.js";
  import Timhoso from "./Timhoso.svelte";
  //hoso sua
  $kho.hososua = {};
  let editGroup = false;
  let rowCur = 0;
  let rowEdit = -1;
  let hosocu = {};
  function btnSave() {
    editGroup = false;
    rowEdit = -1;
    //kiem tra hososua so voi h sơ cũ
    let tam = {};
    for (let k in $kho.hososua) {
      if ($kho.hososua[k].length > 0 && $kho.hososua[k] !== hosocu[k]) {
        tam[k] =
          typeof $kho.hososua[k] === "string"
            ? $kho.hososua[k].trim()
            : $kho.hososua[k];
      }
    }
    if (tam.length > 0) {
      $kho.hososua = JSON.parse(JSON.stringify(tam));
      // update client dskh
      let dai = $kho.dskh.length;
      for (let i = 0; i < dai; i++) {
        let a = $kho.dskh[i];
        if (a.mahoso === hosocu.mahoso) {
          for (let k in $kho.hososua) {
            if (a.hasOwnProperty(k)) {
              a[k] = $kho.hososua[k];
            }
          }
        }
      }
      // update server
      let tincangui = $kho.hososua;
      postServer(tincangui);
    }
    // init data
    $kho.hososua = {};
  }
  // grid-table
  function timscrolLeft(event) {
    console.log("on scroll event");
    for (let k in event) {
      console.log("key=" + k + " value=" + event.k);
    }
  }
  let timH;
  let timL;
  let cuontrai;
  $: $kho.cuontrai = cuontrai;
</script>

<style>
  session {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  .bangdulieu {
    flex: 1 1 auto;
  }
  #grid-table {
    display: block;
    width: 100%;
    overflow: scroll;
  }
  #tieude span {
    top: 0;
    text-align: center;
    vertical-align: middle;
    color: white;
    background-color: rgb(25, 24, 29);
    border: 1px solid black;
  }
  .rec {
    display: grid;
    grid-auto-rows: min-content;
    grid-auto-columns: max-content;
    grid-template-columns:
      repeat(4, minmax(100px, 1fr))
      minmax(300px, 3fr)
      minmax(700px, 7fr)
      repeat(6, minmax(100px, 1fr));
    grid-auto-flow: column;
  }
  .rec > span {
    border: 1px solid black;
    word-wrap: break-word;
  }
</style>

<svelte:window bind:scrollX={cuontrai} />
<session>
  <div class="container-fluid" bind:clientHeight={timH}>
    <Timhoso />
  </div>

  <div class="bangdulieu">
    <div class="container-fluid" bind:clientWidth={$kho.tblW}>
      <div id="tieude" class="rec">
        <span>STT</span>
        <span>Mã hồ sơ</span>
        <span>Đợt</span>
        <span>Số hồ sơ</span>
        <span>Khách hàng</span>
        <span>Địa chỉ</span>
        <span>Liên hệ</span>
        <span>Ghi chú</span>
        <span>Trở ngại</span>
        <span>Tái nhập</span>
        <span>Tái thi công</span>
        <span>Hoàn tiền</span>
      </div>
      <div
        id="grid-table"
        style="width:{$kho.tblW - 10}px;height:{$kho.tblH}px;">
        {#each $kho.dsloc as hs, stt}
          <div class="rec noidung" on:mouseover={() => (rowCur = stt)}>
            {#if editGroup && rowCur === stt && rowEdit === stt}
              <span>
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  on:click={btnSave}>
                  <i class="fa fa-save" />
                  {stt + 1}
                </button>
              </span>
              <span>{$kho.hososua.mahoso}</span>
              <span>{$kho.hososua.madot}</span>
              <span>{$kho.hososua.sohoso}</span>
              <span>{$kho.hososua.khachhang}</span>
              <span>{$kho.hososua.diachi}</span>
              <span>{$kho.hososua.lienhe}</span>
              <span>{$kho.hososua.mota}</span>
              <span>{$kho.hososua.trongai}</span>
              <span>{$kho.hososua.tainhap}</span>
              <span>{$kho.hososua.taithicong}</span>
              <span>{$kho.hososua.hoantien}</span>
            {:else}
              <span>
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  on:click={() => {
                    editGroup = true;
                    rowEdit = stt;
                    hosocu = JSON.parse(JSON.stringify(hs));
                  }}>
                  <i class="fa fa-edit" />
                  {stt + 1}
                </button>
              </span>
              <span>{hs.mahoso}</span>
              <span>{hs.madot}</span>
              <span>{hs.sohoso}</span>
              <span>{hs.khachhang}</span>
              <span>{hs.diachi}</span>
              <span>{hs.lienhe}</span>
              <span>{hs.mota}</span>
              <span>{hs.trongai}</span>
              <span>{hs.tainhap}</span>
              <span>{hs.taithicong}</span>
              <span>{hs.hoantien}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</session>
