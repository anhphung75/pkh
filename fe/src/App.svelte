<script>
  import axios from "axios";
  import { kho } from "./stores.js";
  import Khach from "./Khach.svelte";
  import { filterListObj } from "./utils.js";

  const API_URL = "http://localhost:8888/api1108/";
  let dsnam = [2020, 2019, 2018, 2017, 2016];
  let namhoso = 2019;
  $kho.progress = 0;
  $kho.showProgress = true;
  $kho.dskh = [];

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

  let dskh = [
    {
      mahoso: "2019hs001",
      khachhang: "Nguyen Van A",
      sohoso: "GM01200/19",
      diachikhachhang: "123 Tran Van Thoi, Q10"
    },
    {
      mahoso: "2019hs002",
      khachhang: "Pham Van Tuan",
      diachikhachhang: "625 Tran Van Thoi, Q11"
    },
    {
      mahoso: "2019hs003",
      khachhang: "Tran Van Ty",
      diachikhachhang: "1243 Tran Van Thoi, Q12"
    },
    {
      mahoso: "2019hs004",
      khachhang: "Nguyen Thi Nhanh",
      diachikhachhang: "125 Tran Van Thoi, Q12"
    }
  ];
  // tim kiem
  $kho.dskh = dskh;
  let stim = "";
  let dstim = [];
  let curdstim = 0;
  function addDsTim(event) {
    if (event.key === "Enter") {
      dstim = [...dstim, stim];
      stim = "";
    }
  }
  function xoaDstim() {
    dstim.splice(curdstim);
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
  $: dsLoc = filterListObj(dsLocNhom, stim);
  let curHoso = 0;
  // phan trang
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<section>
  <header class="container-fluid">
    <h1 class="row justify-content-md-center text-primary">
      <div class="col-md-auto">DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM</div>
      <div class="col-md-auto">
        <select bind:value={namhoso} class="form-control" id="selectnam">
          {#each dsnam as namlamviec}
            <option value={namlamviec}>{namlamviec}</option>
          {/each}
        </select>
      </div>
      <div class="col-md-auto">
        <button class="btn btn-primary" on:click={xemHoso}>
          <i class="fa fa-sync-alt" aria-hidden="true" />
        </button>
      </div>
    </h1>
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
    <div class="container-fluid">
      <div class="row">
        <div class="col border border-primary">
          <div class="row">
            <div class="col">
              {#each dstim as item, id}
                <button
                  type="button"
                  class="btn btn-outline-info"
                  on:click={() => {
                    curdstim = id;
                    xoaDstim();
                  }}>
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
            <th scope="col">Ghi chú</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {#each dsLoc as khach, id}
            <tr>
              <th scope="row">{id+1}</th>
              <Khach {...khach} />
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
  <footer>
    <br />
    <div class="row">
      <div class='col-auto'>Tổng số hồ sơ: {$kho.dskh.length}</div>
      <div class='col'></div>
      <div class='col-auto'>
        bạn đang xem hồ sơ thứ {curHoso} trong {dsLoc.length} hồ sơ chọn lọc
      </div>
    </div>
  </footer>
</section>
