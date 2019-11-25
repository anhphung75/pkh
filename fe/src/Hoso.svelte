<script>
  import { kho } from "./stores.js";
  import { guiWeb } from "./crud_rest.js";
  import Timhoso from "./Timhoso.svelte";

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
      hssua = JSON.parse(JSON.stringify(tam));
      // update client dskh
      let dai = $kho.dskh.length;
      for (let i = 0; i < dai; i++) {
        let a = $kho.dskh[i];
        if (a.mahoso === hssua.mahoso) {
          for (let k in hssua) {
            if (a.hasOwnProperty(k)) {
              a[k] = hssua[k];
            }
          }
        }
      }
      $kho.dstim = [...$kho.dstim, "h"];
      let r = $kho.dstim.pop();
      // update server
      guiWeb(hssua);
    }
    // init data
    hssua = {};
  }
  //thong tin tong
  $: tonghoso = $kho.dskh ? $kho.dskh.length : 0;
  $: tongloc = $kho.dsloc ? $kho.dsloc.length : 0;
  $: danhsach = $kho.dsloc
    ? $kho.dsloc.map(x => ({ ...x, isEdit: false }))
    : [];
  // thanh cuon
  let hs_start = 0;
  let hs_per = 7;
  $: hs_stop = tongloc ? hs_start + hs_per : tongloc;
  let curbang = 0;
  let tongbang = 4;
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
    min-height: 2cm;
  }
  #bang {
    max-height: 12cm;
  }
  #cuonhoso {
    -webkit-appearance: slider-vertical;
    transform: rotate(180deg);
    outline: none;
    width: 100%;
    height: 100%;
  }
  .noidung {
    width: 100%;
  }
</style>

<section>
  <header>
    <div class="container-fluid">
      <Timhoso />
    </div>
  </header>

  <main>
    <div class="container-fluid">
      <div class="row">
        <div id="bang" class="col">
          <div class="container-fluid">
            <div class="row tieude">
              <div class="col-auto">STT</div>
              {#if curbang === 0}
                <div class="col">Mã hồ sơ</div>
                <div class="col">Mã đợt</div>
                <div class="col">Số hồ sơ</div>
              {/if}
              <div class="col-4">Khách hàng</div>
              {#if curbang === 0}
                <div class="col">Địa chỉ</div>
              {:else if curbang === 1}
                <div class="col">Liên hệ1</div>
                <div class="col">Mô tả</div>
                <div class="col">Trở ngại</div>
                <div class="col">Tái nhập</div>
                <div class="col">Tái thi công</div>
                <div class="col">Hoàn tiền</div>
              {:else if curbang === 2}
                <div class="col">Liên hệ2</div>
                <div class="col">Mô tả2</div>
                <div class="col">Trở ngại</div>
                <div class="col">Tái nhập</div>
                <div class="col">Tái thi công</div>
                <div class="col">Hoàn tiền</div>
              {:else if curbang === 3}
                <div class="col">Liên hệ3</div>
                <div class="col">Mô tả3</div>
                <div class="col">Trở ngại</div>
                <div class="col">Tái nhập</div>
                <div class="col">Tái thi công</div>
                <div class="col">Hoàn tiền</div>
              {:else}
                <div class="col">Liên hệ4</div>
                <div class="col">Mô tả4</div>
                <div class="col">Trở ngại</div>
                <div class="col">Tái nhập</div>
                <div class="col">Tái thi công</div>
                <div class="col">Hoàn tiền</div>
              {/if}
            </div>
            {#each danhsach as hs, stt}
              {#if stt >= hs_start && stt <= hs_stop}
                <div class="row noidung" on:mouseover={() => (rowCur = stt)}>
                  {#if hs.isEdit}
                    <div class="col-auto">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        on:click={btnSave}>
                        <i class="fa fa-save" />
                        {stt + 1}
                      </button>
                    </div>
                    {#if curbang === 0}
                      <div class="col">{hssua.mahoso}</div>
                      <div class="col">{hssua.madot}</div>
                      <div class="col">
                        <input bind:value={hssua.sohoso} />
                      </div>
                    {/if}
                    <div class="col-4">
                      <input bind:value={hssua.khachhang} />
                    </div>
                    {#if curbang === 0}
                      <div class="col">
                        <input bind:value={hssua.diachi} />
                      </div>
                    {:else if curbang === 1}
                      <div class="col">
                        <input bind:value={hssua.lienhe} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.mota} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.trongai} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.tainhap} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.taithicong} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.hoantien} />
                      </div>
                    {:else if curbang === 2}
                      <div class="col">
                        <input bind:value={hssua.lienhe} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.mota} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.trongai} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.tainhap} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.taithicong} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.hoantien} />
                      </div>
                    {:else if curbang === 3}
                      <div class="col">
                        <input bind:value={hssua.lienhe} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.mota} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.trongai} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.tainhap} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.taithicong} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.hoantien} />
                      </div>
                    {:else}
                      <div class="col">
                        <input bind:value={hssua.lienhe} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.mota} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.trongai} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.tainhap} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.taithicong} />
                      </div>
                      <div class="col">
                        <input bind:value={hssua.hoantien} />
                      </div>
                    {/if}
                  {:else}
                    <div class="col-auto">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        on:click={() => {
                          hs.isEdit = true;
                          hsgoc = JSON.parse(JSON.stringify(hs));
                          hssua = JSON.parse(JSON.stringify(hs));
                        }}>
                        <i class="fa fa-edit" />
                        {stt + 1}
                      </button>
                    </div>
                    {#if curbang === 0}
                      <div class="col">{hs.mahoso}</div>
                      <div class="col">{hs.madot}</div>
                      <div class="col">{hs.sohoso}</div>
                    {/if}
                    <div class="col-4">{hs.khachhang}</div>
                    {#if curbang === 0}
                      <div class="col">{hs.diachi}</div>
                    {:else if curbang === 1}
                      <div class="col">{hs.lienhe}</div>
                      <div class="col">{hs.mota}</div>
                      <div class="col">{hs.trongai}</div>
                      <div class="col">{hs.tainhap}</div>
                      <div class="col">{hs.taithicong}</div>
                      <div class="col">{hs.hoantien}</div>
                    {:else if curbang === 2}
                      <div class="col">{hs.lienhe}</div>
                      <div class="col">{hs.mota}</div>
                      <div class="col">{hs.trongai}</div>
                      <div class="col">{hs.tainhap}</div>
                      <div class="col">{hs.taithicong}</div>
                      <div class="col">{hs.hoantien}</div>
                    {:else if curbang === 3}
                      <div class="col">{hs.lienhe}</div>
                      <div class="col">{hs.mota}</div>
                      <div class="col">{hs.trongai}</div>
                      <div class="col">{hs.tainhap}</div>
                      <div class="col">{hs.taithicong}</div>
                      <div class="col">{hs.hoantien}</div>
                    {:else}
                      <div class="col">{hs.lienhe}</div>
                      <div class="col">{hs.mota}</div>
                      <div class="col">{hs.trongai}</div>
                      <div class="col">{hs.tainhap}</div>
                      <div class="col">{hs.taithicong}</div>
                      <div class="col">{hs.hoantien}</div>
                    {/if}
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        </div>
        <div class="cuonhoso" style="width:2%;">
          <input
            id="cuonhoso"
            type="range"
            bind:value={hs_start}
            min="0"
            max={tongloc - hs_per - 1} />
        </div>
      </div>
    </div>
  </main>

  <footer>
    <hr />
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
          <button
            class="btn btn-outline-secondary"
            type="button"
            on:click={() => {
              $kho.dskh = [];
            }}>
            <i class="fa fa-plus" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</section>
