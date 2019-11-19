<script>
  import { kho } from "./stores.js";
  import Hoso from "./Hoso.svelte";
  import HosoMoi from "./HosoMoi.svelte";
  import { tamdskh } from "./tamdskh.js";
  $kho.dskh = tamdskh;
  $kho.progress = 0;
  $kho.showProgress = true;
  //api
  const API_URL = "http://localhost:8888/api1108/";

  let curComp = Hoso;
  let dsnam = [2020, 2019, 2018, 2017, 2016];
  let namhoso = 2019;
  //ham
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
</script>

<style>
  section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
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
          <select class="custom-select" id="selectnam" bind:value={namhoso}>
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
    <svelte:component this={curComp} />
  </main>
  <footer>
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-auto">Tổng số hồ sơ:</div>
        <div class="col-auto">
          <button
            class="btn btn-outline-secondary"
            type="button"
            on:click={() => {
              curComp = HosoMoi;
              $kho.dskh = [];
            }}>
            <i class="fa fa-plus" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</section>
