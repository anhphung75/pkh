<script>
  import axios from "axios";
  import { kho } from "./stores.js";
  import Khach from "./Khach.svelte";

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
    })
    .then(response => {
      let dulieu = response.data;
      console.log("response.data=" + dulieu);
      if (dulieu !== null || dulieu !== undefined || dulieu !== "") {
        $kho.dskh = dulieu.hoso;
        console.log("$dulieu.hoso=" + dulieu.hoso);
        console.log("$dulieu.info=" + dulieu.info);
        }
      })
  };

  let dskh = [
    {
      mahoso: "2019hs001",
      khachhang: "Nguyen Van A",
      diachi: "123 Tran Van Thoi, Q12"
    },
    {
      mahoso: "2019hs002",
      khachhang: "Nguyen Van A",
      diachi: "123 Tran Van Thoi, Q12"
    },
    {
      mahoso: "2019hs003",
      khachhang: "Nguyen Van A",
      diachi: "123 Tran Van Thoi, Q12"
    },
    {
      mahoso: "2019hs004",
      khachhang: "Nguyen Van A",
      diachi: "123 Tran Van Thoi, Q12"
    }
  ];
  let sKiem = '';
  let dsKiem = [];
  function adddsKiem(event) {
        if (event.key === 'Enter') {
            dsKiem = [...dsKiem, sKiem];
            sKiem = '';
        }
    }
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
</style>

<h1>DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN</h1>
<div class="hbox">
  {#if $kho.progress < 100}
    <progress value={$kho.progress} max="100" />
  {/if}
  <div class="nam">
    <span>Năm {namhoso}</span>

    <span class="image nutcapnhat" on:click={xemHoso}>
      <i class="fa fa-refresh fa-spin" style="font-size:24px" />
    </span>
  </div>
  <div class="search">
  <span>Search {dsKiem}</span>
  <input type="search" bind:value={sKiem} on:keydown={adddsKiem} placeholder="Search ...">
  </div>
</div>

<ul>
	{#each $kho.dskh as khach}
		<Khach {...khach} />
	{/each}
</ul>