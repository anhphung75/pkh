<script>
  import { kho } from "./stores.js";
  import { filterListObj } from "./utils.js";
  
  // tim kiem
  $kho.dsloc = [];
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
</script>

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
