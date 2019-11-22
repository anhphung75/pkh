<script>
  import { kho } from "./stores.js";
  import Progress from "./Progress.svelte";
  import Hoso from "./Hoso.svelte";
  //import HosoMoi from "./HosoMoi.svelte";
  import { tamdskh } from "./tamdskh.js";
  $kho.dskh = tamdskh;
  //$kho.dskh = [];
  $kho.progress = 0;
  // web
  const API_URL = "http://localhost:8888/api1108/hoso/";
  function nhanWeb() {
    let apiurl = namhoso ? API_URL + namhoso : API_URL;
    axios({
      method: "get",
      url: apiurl,
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
      $kho.dskh = dulieu? dulieu.hoso:[];
    });
  }

  let curComp = Hoso;
  let dsnam = [2020, 2019, 2018, 2017, 2016, 2015, 2014];
  let namhoso = 2019;
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
            bind:value={namhoso}>
            {#each dsnam as item}
              <option value={item}>{item}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-primary btn-rounded"
          type="button"
          on:click={nhanWeb()}>
          <i class="fa fa-sync-alt" />
        </button>
      </div>
    </div>
    <Progress />
  </header>

  <main>
    <div class="container-fluid">
      <svelte:component this={curComp} />
    </div>
  </main>

  <footer />
</section>
