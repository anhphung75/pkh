<script>
  import { kho } from "./stores.js";
  import { filterListObj } from "./utils.js";
  import { tamdskh } from "./tamdskh.js";
  $kho.namhoso = 2019;
  $kho.dskh = tamdskh;
  $kho.progress = 0;
  $kho.showProgress = true;
  $kho.curbang = 0;
  $kho.tongbang = 4;

  //api
  const API_URL = "http://localhost:8888/api1108/";

  let dsnam = [2020, 2019, 2018, 2017, 2016];
  $kho.namhoso = 2019;
  //nhan data tu server
  function xemHoso() {
    let apiurl = API_URL + "hoso/";
    axios({
      method: "get",
      url: "http://localhost:8888/api1108/hoso/",
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
      let dulieu = response.data;
      console.log("response.data=" + dulieu);
      if (dulieu !== null || dulieu !== undefined || dulieu !== "") {
        $kho.dskh = dulieu.hoso;
        console.log("$dulieu.hoso=" + dulieu.hoso);
        console.log("$dulieu.info=" + dulieu.info);
      }
    });
  }
  // tim kiem
  $kho.dsloc = [];
  let dsLocNhom = [];
  let stim = "";
  let dstim = [];
  let curdstim = 0;
  function addDsTim(event) {
    if (event.key === "Enter" && stim.length > 0) {
      stim = stim.trim();
      let dai = dstim.length;
      let data = [stim];
      for (let i = 0; i < dai; i++) {
        if (dstim[i] !== stim) {
          data.push(dstim[i]);
        }
      }
      dstim = data;
      stim = "";
    }
  }
  function xoaDstim() {
    let dai = dstim.length;
    let data = [];
    for (let i = 0; i < dai; i++) {
      if (i !== curdstim) {
        data.push(dstim[i]);
      }
    }
    dstim = data;
  }
  function locNhom(nhom) {
    let l = nhom.length || 0;
    let data = $kho.dskh;
    if (l > 0) {
      for (let i = 0; i < l; i++) {
        let s = nhom[i];
        data = filterListObj(data, s);
      }
    }
    return data;
  }
  $: dsLocNhom = locNhom(dstim);
  $: $kho.dsloc = filterListObj(dsLocNhom, stim);
  // phan trang
  $kho.hs_trang = 3;
  $kho.tongtrang = 0;
  $kho.curtrang = 0;
  function tinhTongTrang(dsloc) {
    let a = dsloc !== undefined ? dsloc.length : 0;
    let l = a % $kho.hs_trang > 0 ? 1 : 0;
    let c = parseInt(a / $kho.hs_trang);
    let t = c > 0 ? c + l : 0;
    return t;
  }
  $: $kho.tongtrang = tinhTongTrang($kho.dsloc);
  $: $kho.curtrang =
    $kho.curtrang > $kho.tongtrang ? $kho.tongtrang : $kho.curtrang;
  $: $kho.hs_start = $kho.curtrang * $kho.hs_trang;
  $: $kho.hs_stop = $kho.hs_start + $kho.hs_trang - 1;
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
      <div class="col-auto">
        <h3>DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM&nbsp;</h3>
      </div>
      <div class="col-auto">
        <div class="input-group">
          <select
            class="custom-select"
            id="selectnam"
            bind:value={$kho.namhoso}>
            {#each dsnam as namlamviec}
              <option value={namlamviec}>{namlamviec}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-primary btn-rounded"
          type="button"
          on:click={xemHoso}>
          <i class="fa fa-sync-alt" />
        </button>
      </div>
    </div>
    {#if $kho.showProgress}
      <div class="row">
        <div class="col">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated
              bg-info"
              role="progressbar"
              aria-valuenow={$kho.progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: {$kho.progress}%">
              {$kho.progress}%
            </div>
          </div>
        </div>
      </div>
    {/if}
  </header>
  <main>
    <!-- search search search search         -----------------------                                           -->
    <div class="container-fluid">
      <div class="row">
        <div class="col border border-primary">
          <div class="row">
            <div class="col">
              {#each dstim as item, id}
                <button
                  type="button"
                  class="btn btn-outline-info"
                  on:mouseover={() => (curdstim = id)}
                  on:click|preventDefault={xoaDstim}>
                  {item}
                </button>
              {/each}
            </div>
            <div class="col-auto">
              <button class="btn" on:click={() => (dstim = [])}>
                <i class="fa fa-trash fa-lg" />
                Xóa hết
              </button>
            </div>
          </div>
        </div>
        <div class="col-3">
          <input
            class="col"
            type="search"
            bind:value={stim}
            on:keydown={addDsTim}
            placeholder="Tìm ... (không phân biệt chữ hoa hay thường)" />
        </div>
      </div>
    </div>
    <!-- hoso         -----------------------                                           -->
    <div class="container-fluid">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã hồ sơ</th>
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
            {#each $kho.dsloc as hs, stt}
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
                    <td>{hs.mahoso}</td>
                    <td>
                      <input bind:value={hs.sohoso} />
                    </td>
                    <td>
                      <input bind:value={hs.khachhang} />
                    </td>
                    <td>
                      <input bind:value={hs.diachi} />
                    </td>
                    <td>
                      <input bind:value={hs.lienhe} />
                    </td>
                    <td>
                      <input bind:value={hs.mota} />
                    </td>
                    <td>
                      <input bind:value={hs.trongai} />
                    </td>
                    <td>
                      <input bind:value={hs.tainhap} />
                    </td>
                    <td>
                      <input bind:value={hs.taithicong} />
                    </td>
                    <td>
                      <input bind:value={hs.hoantien} />
                    </td>
                  {:else}
                    <th scope="row">
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
                    </th>
                    <td>{hs.mahoso}</td>
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
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-auto">
          Hiện có {$kho.dsloc.length}/{$kho.dskh.length} hồ sơ
        </div>
        {#if $kho.tongtrang > 0}
          <div class="col-4 chontrang">
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
          <div class="col-4 chonbang">
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
        <div class="col-auto">
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
