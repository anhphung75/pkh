<script>
  import { writable } from "svelte/store";
  import Khach from "./Khach.svelte";
  
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
  let a2 = writable({});
  $a2.dskh = dskh
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

<h1>Danh sach khach hang</h1>
<div class="hbox">
  <div class='nam'>
    <span>Nam</span>
    <span class='image nutcapnhat'>
        <i class="fa fa-refresh fa-spin" style="font-size:24px"></i>
    </span>
  </div>
  <div class='search'>Search</div>
</div>

<ul>
  {#each $a2.dskh as khach}
    <Khach {...khach} />
  {/each}
</ul>
