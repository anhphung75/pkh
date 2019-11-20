<script>
  import { kho } from "./stores.js";

  let editGroup = false;
  let rowCur = 0;
  let rowEdit = -1;
  let curmahoso = "";
  let hososua = {};
  let hosomoi = {
    mahoso: "",
    khachhang: "",
    sohoso: "",
    diachi: "",
    maq: "",
    maqp: "",
    mota: "",
    ngaygan: "",
    sodhn: "",
    chisodhn: 0.0,
    madma: "",
    malotrinh: "",
    trongai: "",
    tainhap: "",
    taithicong: "",
    hoantien: "",
    lienhe: "",
    hieudhn: ""
  };
  // ham
  function btnEdit() {
    editGroup = true;
    rowEdit = stt;
    hososua = JSON.parse(JSON.stringify(hs));
  }
  function btnSave() {
    editGroup = false;
    rowEdit = -1;
    //kiem tra hososua
    let tam = {};
    for (let k in hososua) {
      if (hososua[k].length > 0) {
        tam[k] =
          typeof hososua[k] === "string" ? hososua[k].trim() : hososua[k];
      }
    }
    if (tam.length > 0) {
      // update client dskh
      let lll = $kho.dskh.length;
      for (let i = 0; i < lll; i++) {
        let hsCapnhat = $kho.dskh[i];
        if (hsCapnhat.mahoso === curmahoso) {
          for (let k in tam) {
            if (hsCapnhat.hasOwnProperty(k)) {
              hsCapnhat[k] = tam[k];
            }
          }
        }
      }
      // update server
      let tincangui = { tin: "capnhat", goi: h };
      postServer(tincangui);
    }
  }

</script>

<style>

</style>

<div class="container">
  <div class="row tieude">
    <div class="col-auto">STT</div>
    <div class="col-auto">Mã hồ sơ</div>
    <div class="col-auto">Số hồ sơ</div>
    <div class="col-auto">Khách hàng</div>
    <div class="col-auto">Địa chỉ</div>
    <div class="col-auto">Liên hệ</div>
    <div class="col-auto">Mô tả</div>
  </div>
  <div class="row noidung">
    {#each $kho.dsloc as hs, stt}
      <div
        class="row"
        on:mouseover={() => {
          rowCur = stt;
          curmahoso = hs.mahoso;
        }}>
        {#if editGroup && rowCur === stt && rowEdit === stt}
          <div class="col-auto">
            <button
              class="btn btn-outline-secondary"
              type="button"
              on:click={btnSave}>
              <i class="fa fa-save" />
              {stt + 1}
            </button>
          </div>
          <div class="col-auto">{hososua.mahoso}</div>
          <div class="col-auto">{hososua.sohoso}</div>
          <div class="col-auto">{hososua.khachhang}</div>
          <div class="col-auto">{hososua.diachi}</div>
          <div class="col-auto">{hososua.lienhe}</div>
          <div class="col-auto">{hososua.mota}</div>
        {:else}
          <div class="col-auto">
            <button
              class="btn btn-outline-secondary"
              type="button"
              on:click={btnEdit}>
              <i class="fa fa-edit" />
              {stt + 1}
            </button>
          </div>
          <div class="col-auto">{hs.mahoso}</div>
          <div class="col-auto">{hs.sohoso}</div>
          <div class="col-auto">{hs.khachhang}</div>
          <div class="col-auto">{hs.diachi}</div>
          <div class="col-auto">{hs.lienhe}</div>
          <div class="col-auto">{hs.mota}</div>
        {/if}
      </div>
    {/each}
  </div>
</div>
