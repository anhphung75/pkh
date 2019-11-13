<script>
  import axios from "axios";
  import { kho } from "./stores.js";
  import Khach from "./Khach.svelte";
  import { filterListObj } from "./utils.js";

  const API_URL = "http://localhost:8888/api1108/";
  let namhoso = 2019;
  $kho.progress = 100;
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
  $kho.dskh = dskh;
  let stim = "";
  let dstim = [];
  let curdstim = 0;
  function addDsTim(event) {
    if (event.key === "Enter") {
      dstim = [...dstim, stim];
      stim = "";
    }
  };
  function xoaDstim(){
    dstim.splice(curdstim);
  };
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
  $: dsLoc = filterListObj(dsLocNhom, stim);
</script>

<style>
  .hbox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  h1 {
    color: purple;
  }
  .image {
    height: 100%;
    width: 100%;
  }
  .search {
    height: 100%;
  }
  .cloud-search {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .cloud-search-item {
    flex: 1 1 auto;
  }
</style>

<h1>
  DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN Năm
  <div class="nam">
    <span>{namhoso}</span>
    <span class="image nutcapnhat" on:click={xemHoso}>
      <i class="fa fa-refresh" />
    </span>
  </div>
</h1>

{#if $kho.progress < 100}
  <div class="hbox">
    <progress value={$kho.progress} max="100" />
  </div>
{/if}

<div class="hbox search">
  {#if dstim.length > 0}
    <span class="hbox">
      <div class="cloud-search">
        {#each dstim as item, id}
          <div class="cloud-search-item" on:click={() => {curdstim=id; xoaDstim();}}>
            {item}-{id}-{curdstim}
            <i class="fa fa-remove" />
          </div>
        {/each}
      </div>
      <div on:click={() => (dstim = [])}>
        <i class="fa fa-trash fa-lg" />
      </div>
    </span>
  {/if}
  <span class="hbox">
    <div>
      <input
        type="search"
        bind:value={stim}
        on:keydown={addDsTim}
        placeholder="Search ..." />
    </div>
    <div>
      <i class="fa fa-search fa-lg" />
    </div>
  </span>
</div>

<ul>
  {#each dsLoc as khach}
    <Khach {...khach} />
  {/each}
</ul>
