<script>
  import axios from "axios";
  import { kho } from "./stores.js";
  import Khach from "./Khach.svelte";
  import { filterListObj } from "./utils.js";

  const API_URL = "http://localhost:8888/api1108/";
  let namhoso = 2019;
  $kho.progress = 20;
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
  // $kho.dskh = dskh;
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
        let stim = nhom[i];
        data = filterListObj(data, stim);
      }
    }
    return data;
  }
  $: dsLocNhom = locNhom(dstim);
  $: dsLoc = filterListObj($kho.dskh, stim);
  let curHoso = 0;
  // phan trang
</script>

<style>
  * {
    text-align: left;
  }
  .hbox {
    display: flex;
    flex-flow: row nowrap;
  }
  section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    height: 95vh;
    width: 100vw;
    overflow: hidden;
  }
  header {
    width: 95vw;
  }
  main {
    flex: 1 1 auto;
    width: 95vw;
    overflow-y: scroll;
  }
  footer {
    width: 95vw;
  }

  h1 {
    color: purple;
    text-align: center;
  }

  .search {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    width: 100%;
    overflow: hidden;
  }
  .search .cot1{
    flex: 1 1 auto;
  }

  .cloud-search {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    border: 2px solid blue;
  }
  .cloud-search-item {
    flex: 1 1 auto;
    padding: 12px ;
  }
  .cloud-search-item:hover {
    background-color: yellowgreen;
  }
  .input {
    border: 2px solid blue;
  }
  input{width: 23em;}
  .image {
    height: 100%;
    width: 100%;
  }
  .hbox-2ben {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .btn {
    background-color: DodgerBlue; /* Blue background */
    border: none; /* Remove borders */
    color: white; /* White text */
    padding: 12px 16px; /* Some padding */
    cursor: pointer; /* Mouse pointer on hover */
  }

  /* Darker background on mouse-over */
  .btn:hover {
    background-color: RoyalBlue;
  }
</style>

<section>
  <header>
    <h1>
      DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM
      <span>{namhoso}</span>
      <span class="image nutcapnhat" on:click={xemHoso}>
        <i class="fa fa-refresh" />
      </span>
    </h1>

    {#if $kho.showProgress}
      <div class="hbox">
        <span>Tiến trình {$kho.progress} % ...</span>
        <progress value={$kho.progress} max="100" />
      </div>
    {/if}
  </header>
  <main>
    <div class="search">
      <div class="hbox cot1">
        <div class="cloud-search">
          {#each dstim as item, id}
            <div
              class="cloud-search-item"
              on:click={() => {
                curdstim = id;
                xoaDstim();
              }}>
              {item}
            </div>
          {/each}
        </div>
      </div>
      <div class="hbox cot2">
        <div class="input">
          <input
            type="search"
            bind:value={stim}
            on:keydown={addDsTim}
            placeholder="Tìm ... (không phân biệt chữ hoa hay thường)" />
          <button class="btn" on:click={() => (dstim = [])}>
            <i class="fa fa-trash fa-lg" />
            Xóa
          </button>
        </div>
      </div>
    </div>

    <ul>
      {#each dsLoc as khach, id}
        <Khach {...khach} on:click={() => (curHoso = id)} />
      {/each}
    </ul>
  </main>
  <footer>
    <br />
    <div class="hbox-2ben">
      <div>Tổng số hồ sơ: {$kho.dskh.length}</div>
      <div>
        bạn đang xem hồ sơ thứ {curHoso} trong {dsLoc.length} hồ sơ chọn lọc
      </div>
    </div>
  </footer>
</section>
