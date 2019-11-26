<script>
  import { kho } from "./stores.js";
  import { filterListObj } from "./utils.js";

  // tim kiem
  export let hoso;
  console.log("hoso= " + $kho.hoso.length)
  $kho.dsloc = [];
  $kho.dstim = [];
  let stim = "";
  let curdstim = 0;
  function addDsTim(event) {
    if (event.key === "Enter" && stim.length > 0) {
      stim = stim.trim();
      let dai = $kho.dstim ? $kho.dstim.length : 0;
      let data = [stim];
      for (let i = 0; i < dai; i++) {
        if ($kho.dstim[i] !== stim) {
          data.push($kho.dstim[i]);
        }
      }
      $kho.dstim = JSON.parse(JSON.stringify(data));
      stim = "";
    }
  }
  function xoaDstim() {
    let dai = dstim.length;
    let data = [];
    for (let i = 0; i < dai; i++) {
      if (i !== curdstim) {
        data.push($kho.dstim[i]);
      }
    }
    dstim = data;
  }
  function locNhom(nhom) {
    let l = nhom.length || 0;
    let data = hoso;
    if (l > 0) {
      for (let i = 0; i < l; i++) {
        let s = nhom[i];
        data = filterListObj(data, s);
      }
    }
    return data;
  }
  $: $kho.dsloc = filterListObj(locNhom($kho.dstim), stim);
  // phan trang
  $kho.hs_trang = 7;
  $kho.tongtrang = 0;
  $kho.curtrang = 0;
  function tongTrang(danhsach) {
    let a = danhsach ? danhsach.length : 0;
    let l = a % $kho.hs_trang > 0 ? 1 : 0;
    let c = parseInt(a / $kho.hs_trang);
    let t = c > 0 ? c + l : 0;
    return t;
  }
  $: $kho.tongtrang = tongTrang($kho.dsloc);
  $: $kho.curtrang =
    $kho.curtrang > $kho.tongtrang ? $kho.tongtrang : $kho.curtrang;
  $: $kho.hs_start = $kho.curtrang * $kho.hs_trang;
  $: $kho.hs_stop = $kho.hs_start + $kho.hs_trang - 1;
</script>

<div class="container-fluid">
  <div class="row">
    <div class="col border border-primary">
      <div class="row">
        <div class="col">
          {#each $kho.dstim as item, id}
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
          <button class="btn" on:click={() => ($kho.dstim = [])}>
            <i class="fa fa-trash fa-lg" />
            Xóa lọc
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
