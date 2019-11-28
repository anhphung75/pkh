<script>
  import { kho, ga } from "./stores.js";
  import Timhoso from "./Timhoso.svelte";
  // init data
  $: tonghoso = $kho.hoso.length;
  $: tongloc = $kho.dsloc ? $kho.dsloc.length : 0;
  $: danhsach = $kho.dsloc
    ? $kho.dsloc.map(x => ({ ...x, isEdit: false }))
    : [];
  // thanh cuon
  let hs_start = 0;
  let hs_per = 18;
  $: hs_stop = tongloc ? hs_start + hs_per : tongloc;
  let curbang = 0;
  let tongbang = 4;

  //rest
  function guiTau(nhan, hang) {
    let tgdi = new Date().getTime();
    let chat = {
      tin: { uuid: [$ga.khach, tgdi].join("."), nhan: nhan, ve: $ga.ve },
      kho: hang
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
  function suaHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    let hoso = JSON.parse(JSON.stringify($kho.hoso)) || [];
    let l = hoso.length || 0;
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
    guiTau("sua", { hoso: listhoso });
  }

  //hoso sua
  let rowCur = 0;
  let hsgoc = {};
  let hssua = {};
  function btnSave() {
    //kiem tra hososua so voi hosơ cũ
    let tam = { mahoso: hssua["mahoso"] };
    for (let k in hssua) {
      let a = hssua[k] || "";
      if (a.length > 0 && a !== hsgoc[k]) {
        tam[k] = typeof a === "string" ? a.trim() : a;
      }
    }
    if (Object.keys(tam).length > 1) {
      let listhoso = [JSON.parse(JSON.stringify(tam))];
      // update client dskh
      suaHoso(listhoso);
    } else {
      let dai = danhsach.length;
      for (let i = 0; i < dai; i++) {
        let a = danhsach[i];
        if (a.mahoso === tam.mahoso) {
          a["isEdit"] = false;
        }
      }
    }
    // init data
    hssua = {};
  }
</script>

<style>
  section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-height: 95vh;
  }
  main {
    flex: 1 1 auto;
    min-height: 2cm;
  }
  input {
    width: 100%;
    height: 100%;
  }
  .tieude {
    grid-area: tieude;
    background-color: lightcoral;
    text-align: center;
  }
  .noidung {
    grid-area: noidung;
    background-color: transparent;
  }
  .tieude div,
  .noidung div {
    border: 1px solid black;
    word-break: break-all;
  }
  .noidung div {
    border-top: 1px solid white;
    word-break: break-all;
  }
  .cuonhoso {
    grid-area: cuonhoso;
    background-color: yellowgreen;
  }
  #cuonhoso {
    -webkit-appearance: slider-vertical;
    transform: rotate(180deg);
    outline: none;
  }
  .per-hoso {
    grid-area: per-hoso;
    background-color: transparent;
  }
  .banghoso {
    display: grid;
    min-width: 5cm;
    grid-template-columns: 1fr 20px;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "tieude per-hoso"
      "noidung cuonhoso";
  }
  .stt {
    grid-area: stt;
    background-color: transparent;
  }
  .mahoso {
    grid-area: mahoso;
    background-color: transparent;
  }
  .sohoso {
    grid-area: sohoso;
    background-color: transparent;
  }
  .khach-hang {
    grid-area: khach-hang;
    background-color: transparent;
  }
  .dia-chi {
    grid-area: dia-chi;
    background-color: transparent;
  }
  .lienhe {
    grid-area: lienhe;
    background-color: transparent;
  }
  .mo-ta {
    grid-area: mo-ta;
    background-color: transparent;
  }
  .tro-ngai {
    grid-area: tro-ngai;
    background-color: transparent;
  }
  .tai-nhap {
    grid-area: tai-nhap;
    background-color: transparent;
  }
  .tai-thi-cong {
    grid-area: tai-thi-cong;
    background-color: transparent;
  }
  .hoan-tien {
    grid-area: hoan-tien;
    background-color: transparent;
  }
  .qrcode {
    grid-area: qrcode;
    background-color: transparent;
  }
  .dc1 {
    grid-area: dc1;
    background-color: transparent;
  }
  .dc2 {
    grid-area: dc2;
    background-color: transparent;
  }
  .maq {
    grid-area: maq;
    background-color: transparent;
  }
  .maqp {
    grid-area: maqp;
    background-color: transparent;
  }
  .ghitat {
    grid-area: ghitat;
    background-color: transparent;
  }
  .maqt {
    grid-area: maqt;
    background-color: transparent;
  }
  .ngaylendot {
    grid-area: ngaylendot;
    background-color: transparent;
  }
  .ngaygan {
    grid-area: ngaygan;
    background-color: transparent;
  }
  .sodhn {
    grid-area: sodhn;
    background-color: transparent;
  }
  .hieudhn {
    grid-area: hieudhn;
    background-color: transparent;
  }
  .chisodhn {
    grid-area: chisodhn;
    background-color: transparent;
    text-align: right;
  }
  .madma {
    grid-area: madma;
    background-color: transparent;
  }
  .malotrinh {
    grid-area: malotrinh;
    background-color: transparent;
  }
  .sodanhbo {
    grid-area: sodanhbo;
    background-color: transparent;
  }
  .bang0 {
    display: grid;
    grid-auto-rows: min-content;
    grid-auto-columns: min-content;
    grid-template-rows: auto;
    grid-template-columns: minmax(50px, 1fr) 2fr 2fr 2fr 4fr 7fr;
    grid-template-areas: "stt mahoso madot sohoso khach-hang dia-chi";
  }
  .bang1 {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: minmax(50px, 1fr) 5fr 3fr 6fr 2fr 2fr 2fr 2fr;
    grid-template-areas: "stt khach-hang lienhe mo-ta tro-ngai tai-nhap tai-thi-cong hoan-tien";
  }
  .bang2 {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: minmax(50px, 1fr) 3fr 3fr 3fr 1fr 1fr 2fr;
    grid-template-areas: "stt khach-hang dc1 dc2 maq maqp ghitat";
  }
  .bang3 {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: minmax(50px, 1fr) 6fr 2fr 2fr 2fr 2fr 1fr 1fr;
    grid-template-areas: "stt khach-hang maqt ngaylendot ngaygan sodhn hieudhn chisodhn";
  }
  .bang4 {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: minmax(50px, 1fr) 6fr 2fr 2fr 2fr 1fr;
    grid-template-areas: "stt khach-hang madma malotrinh sodanhbo qrcode";
  }
</style>

<section>
  <header>
    <Timhoso />
  </header>

  <main>
    <div class="banghoso">
      <div class="tieude bang{curbang}">
        <div class="stt">STT</div>
        <div class="khach-hang">Khách hàng</div>
        {#if curbang === 0}
          <div class="mahoso">Mã hồ sơ</div>
          <div class="madot">Mã đợt</div>
          <div class="sohoso">Số hồ sơ</div>
          <div class="dia-chi">Địa chỉ</div>
        {:else if curbang === 1}
          <div class="lien-he">Liên hệ1</div>
          <div class="mo-ta">Mô tả</div>
          <div class="tro-ngai">Trở ngại</div>
          <div class="tai-nhap">Tái nhập</div>
          <div class="tai-thi-cong">Tái thi công</div>
          <div class="hoan-tien">Hoàn tiền</div>
        {:else if curbang === 2}
          <div class="dc1">Địa chỉ 1</div>
          <div class="dc2">Địa chỉ 2</div>
          <div class="maq">Mã quận</div>
          <div class="maqp">Mã qp</div>
          <div class="ghitat">Ghi tắt</div>
        {:else if curbang === 3}
          <div class="maqt">Mã qtgt</div>
          <div class="ngaylendot">Ngày lên đợt</div>
          <div class="ngaygan">Ngày gắn</div>
          <div class="sodhn">Số đhn</div>
          <div class="hieudhn">Hiệu đhn</div>
          <div class="chisodhn">Chỉ số</div>
        {:else}
          <div class="madma">Mã dma</div>
          <div class="malotrinh">Mã lộ trình</div>
          <div class="sodanhbo">Số danh bộ</div>
          <div class="qrcode">Mã QR</div>
        {/if}
      </div>
      <div class="noidung">
        {#each danhsach as hs, stt}
          {#if stt >= hs_start && stt <= hs_stop}
            <div class="bang{curbang}" on:mouseover={() => (rowCur = stt)}>
              {#if hs.isEdit}
                <div class="stt">
                  <i class="fa fa-save" on:click={btnSave}>{stt + 1}</i>
                  <i
                    class="fa fa-stop-circle"
                    on:click={() => (hs.isEdit = false)} />
                </div>
                <div
                  class="khach-hang"
                  contenteditable="true"
                  bind:innerHTML={hssua.khachhang} />
                {#if curbang === 0}
                  <div class="mahoso">{hssua.mahoso}</div>
                  <div class="madot">{hssua.madot}</div>
                  <div
                    class="sohoso"
                    contenteditable="true"
                    bind:innerHTML={hssua.sohoso} />
                  <div
                    class="dia-chi"
                    contenteditable="true"
                    bind:innerHTML={hssua.diachi} />
                {:else if curbang === 1}
                  <div
                    class="lien-he"
                    contenteditable="true"
                    bind:innerHTML={hssua.lienhe} />
                  <div
                    class="mo-ta"
                    contenteditable="true"
                    bind:innerHTML={hssua.mota} />
                  <div
                    class="tro-ngai"
                    contenteditable="true"
                    bind:innerHTML={hssua.trongai} />
                  <div
                    class="tai-nhap"
                    contenteditable="true"
                    bind:innerHTML={hssua.tainhap} />
                  <div
                    class="tai-thi-cong"
                    contenteditable="true"
                    bind:innerHTML={hssua.taithicong} />
                  <div
                    class="hoan-tien"
                    contenteditable="true"
                    bind:innerHTML={hssua.hoantien} />
                {:else if curbang === 2}
                  <div
                    class="dc1"
                    contenteditable="true"
                    bind:innerHTML={hssua.dc1} />
                  <div
                    class="dc2"
                    contenteditable="true"
                    bind:innerHTML={hssua.dc2} />
                  <div
                    class="maq"
                    contenteditable="true"
                    bind:innerHTML={hssua.maq} />
                  <div
                    class="maqp"
                    contenteditable="true"
                    bind:innerHTML={hssua.maqp} />
                  <div
                    class="ghitat"
                    contenteditable="true"
                    bind:innerHTML={hssua.ghitat} />
                {:else if curbang === 3}
                  <div
                    class="maqt"
                    contenteditable="true"
                    bind:innerHTML={hssua.maqt} />
                  <div class="ngaylendot">
                    <input type="date" bind:value={hssua.ngaylendot} />
                  </div>
                  <div class="ngaygan">
                    <input type="date" bind:value={hssua.ngaygan} />
                  </div>
                  <div
                    class="sodhn"
                    contenteditable="true"
                    bind:innerHTML={hssua.sodhn} />
                  <div
                    class="hieudhn"
                    contenteditable="true"
                    bind:innerHTML={hssua.hieudhn} />
                  <div
                    class="chisodhn"
                    contenteditable="true"
                    bind:innerHTML={hssua.chisodhn} />
                {:else}
                  <div
                    class="madma"
                    contenteditable="true"
                    bind:innerHTML={hssua.madma} />
                  <div
                    class="malotrinh"
                    contenteditable="true"
                    bind:innerHTML={hssua.malotrinh} />
                  <div
                    class="sodanhbo"
                    contenteditable="true"
                    bind:innerHTML={hssua.sodanhbo} />
                  <div class="qrcode">{hssua.qrcode}</div>
                {/if}
              {:else}
                <div class="stt">
                  <i
                    class="fa fa-edit"
                    on:click={() => {
                      hs.isEdit = true;
                      hsgoc = JSON.parse(JSON.stringify(hs));
                      hssua = JSON.parse(JSON.stringify(hs));
                    }}>
                    {stt + 1}
                  </i>
                </div>
                <div class="khach-hang">{hs.khachhang}</div>
                {#if curbang === 0}
                  <div class="mahoso">{hs.mahoso}</div>
                  <div class="madot">{hs.madot}</div>
                  <div class="sohoso">{hs.sohoso}</div>
                  <div class="dia-chi">{hs.diachi}</div>
                {:else if curbang === 1}
                  <div class="lien-he">{hs.lienhe}</div>
                  <div class="mo-ta">{hs.mota}</div>
                  <div class="tro-ngai">{hs.trongai}</div>
                  <div class="tai-nhap">{hs.tainhap}</div>
                  <div class="tai-thi-cong">{hs.taithicong}</div>
                  <div class="hoan-tien">{hs.hoantien}</div>
                {:else if curbang === 2}
                  <div class="dc1">{hs.dc1}</div>
                  <div class="dc2">{hs.dc2}</div>
                  <div class="maq">{hs.maq}</div>
                  <div class="maqp">{hs.maqp}</div>
                  <div class="ghitat">{hs.ghitat}</div>
                {:else if curbang === 3}
                  <div class="maqt">{hs.maqt}</div>
                  <div class="ngaylendot">{hs.ngaylendot}</div>
                  <div class="ngaygan">{hs.ngaygan}</div>
                  <div class="sodhn">{hs.sodhn}</div>
                  <div class="hieudhn">{hs.hieudhn}</div>
                  <div class="chisodhn">{hs.chisodhn}</div>
                {:else}
                  <div class="madma">{hs.madma}</div>
                  <div class="malotrinh">{hs.malotrinh}</div>
                  <div class="sodanhbo">{hs.sodanhbo}</div>
                  <div class="qrcode">{hs.qrcode}</div>
                {/if}
              {/if}
            </div>
          {/if}
        {/each}
      </div>
      <div class="cuonhoso">
        <input
          id="cuonhoso"
          type="range"
          bind:value={hs_start}
          min="0"
          max={tongloc - hs_per - 1} />
      </div>
      <div class="per-hoso">
        <i
          class="fa fa-angle-up"
          on:click={() => {
            hs_per = hs_per > 0 ? (hs_per = hs_per - 1) : 0;
          }} />
        <i
          class="fa fa-angle-down"
          on:click={() => {
            hs_per = hs_per < tongloc ? (hs_per = hs_per + 1) : tongloc;
          }} />
      </div>
    </div>
    <hr />
  </main>

  <footer>
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="col">Hiện có {tongloc}/{tonghoso} hồ sơ</div>
        </div>

        {#if tongbang > 0}
          <div class="col-4 mb-12 chonbang">
            <input
              class="col"
              type="range"
              bind:value={curbang}
              min="0"
              max={tongbang} />
          </div>
        {/if}
        <div class="col-1 mb-3">
          <button class="btn btn-outline-secondary" type="button">
            <i class="fa fa-plus" />
            Thêm mới
          </button>
        </div>
      </div>
    </div>
  </footer>
</section>
