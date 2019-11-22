<script>
  import { kho } from "./stores.js";
  import { guiWeb } from "./crud_rest.js";
  import Timhoso from "./Timhoso.svelte";
  //init data
  $kho.curbang = 0;
  $kho.tongbang = 4;
  //hoso sua
  let editGroup = false;
  let rowCur = 0;
  let rowEdit = -1;
  let hsgoc = {};
  let hssua = {};
  function btnSave() {
    editGroup = false;
    rowEdit = -1;
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
      // update server
      guiWeb(hssua);
    }
    // init data
    hssua = {};
  }
  //thong tin tong
  $: tonghoso = $kho.dskh ? $kho.dskh.length : 0;
  $: tongloc = $kho.dsloc ? $kho.dsloc.length : 0;
  $: danhsach = $kho.dsloc? $kho.dsloc: [];
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
</style>

<section>
  <header>
    <div class="container-fluid">
      <Timhoso />
    </div>
  </header>

  <main>
    <div class="container-fluid">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã hồ sơ</th>
              <th scope="col">Mã đợt</th>
              <th scope="col">Số hồ sơ</th>
              <th scope="col">Khách hàng</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Liên hệ</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Trở ngại</th>
              <th scope="col">Tái nhập</th>
              <th scope="col">Tái thi công</th>
              <th scope="col">Hoàn tiền</th>
            </tr>
          </thead>
          <tbody>
            {#each danhsach as hs, stt}
              {#if stt >= $kho.hs_start && stt <= $kho.hs_stop}
                <tr on:mouseover={() => (rowCur = stt)}>
                  {#if editGroup && rowCur === stt && rowEdit === stt}
                    <th scope="row">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        on:click={btnSave}>
                        <i class="fa fa-save" />
                        {stt + 1}
                      </button>
                    </th>
                    <td>{hssua.mahoso}</td>
                    <td>{hssua.madot}</td>
                    <td>
                      <input bind:value={hssua.sohoso} />
                    </td>
                    <td>
                      <input bind:value={hssua.khachhang} />
                    </td>
                    <td>
                      <input bind:value={hssua.diachi} />
                    </td>
                    <td>
                      <input bind:value={hssua.lienhe} />
                    </td>
                    <td>
                      <input bind:value={hssua.mota} />
                    </td>
                    <td>
                      <input bind:value={hssua.trongai} />
                    </td>
                    <td>
                      <input bind:value={hssua.tainhap} />
                    </td>
                    <td>
                      <input bind:value={hssua.taithicong} />
                    </td>
                    <td>
                      <input bind:value={hssua.hoantien} />
                    </td>
                  {:else}
                    <th scope="row">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        on:click={() => {
                          editGroup = true;
                          rowEdit = stt;
                          hsgoc = JSON.parse(JSON.stringify(hs));
                          hssua = JSON.parse(JSON.stringify(hs));
                        }}>
                        <i class="fa fa-edit" />
                        {stt + 1}
                      </button>
                    </th>
                    <td>{hs.mahoso}</td>
                    <td>{hs.madot}</td>
                    <td>{hs.sohoso}</td>
                    <td>{hs.khachhang}</td>
                    <td>{hs.diachi}</td>
                    <td>{hs.lienhe}</td>
                    <td>{hs.mota}</td>
                    <td>{hs.trongai}</td>
                    <td>{hs.tainhap}</td>
                    <td>{hs.taithicong}</td>
                    <td>{hs.hoantien}</td>
                  {/if}
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <footer>
    <hr />
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="row">
            <div class="col">Hiện có {tongloc}/{tonghoso} hồ sơ</div>
          </div>
          <div class="row">
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Xem</span>
                </div>
                <input
                  class="form-control col"
                  type="number"
                  bind:value={$kho.hs_trang} />
                <div class="input-group-append">
                  <span class="input-group-text">hồ sơ/trang</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {#if $kho.tongtrang > 0}
          <div class="col-4 mb-3 chontrang">
            <div class="row">
              <input
                class="col"
                type="range"
                bind:value={$kho.curtrang}
                min="0"
                max={$kho.tongtrang - 1} />
            </div>
            <div class="row">
              <div class="col-2">Trang</div>
              <div class="col-2">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  on:click={() => ($kho.curtrang > 0 ? $kho.curtrang-- : 0)}>
                  <i class="fa fa-caret-square-left" />
                </button>
              </div>
              <input class="col-4" type="number" bind:value={$kho.curtrang} />
              <div class="col-2">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  on:click={() => ($kho.curtrang < $kho.tongtrang - 1 ? $kho.curtrang++ : $kho.tongtrang - 1)}>
                  <i class="fa fa-caret-square-right" />
                </button>
              </div>
              <div class="col-2">/{$kho.tongtrang}</div>
            </div>
          </div>
        {/if}

        {#if $kho.tongbang > 0}
          <div class="col-4 mb-12 chonbang">
            <div class="row">
              <input
                class="col"
                type="range"
                bind:value={$kho.curbang}
                min="0"
                max={$kho.tongbang - 1} />
            </div>
            <div class="row">
              <div class="col-2">Bang</div>
              <div class="col-2">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  on:click={() => ($kho.curbang > 0 ? $kho.curbang-- : 0)}>
                  <i class="fa fa-caret-square-left" />
                </button>
              </div>
              <input class="col-4" type="number" bind:value={$kho.curbang} />
              <div class="col-2">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  on:click={() => ($kho.curbang < $kho.tongbang - 1 ? $kho.curbang++ : $kho.tongbang - 1)}>
                  <i class="fa fa-caret-square-right" />
                </button>
              </div>
              <div class="col-2">/{$kho.tongbang}</div>
            </div>
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
