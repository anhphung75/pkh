<script>
  import { kho } from "./stores.js";
  import { getdsNam } from "./utils.js";
  let dsnam = getdsNam(10);
  let namhoso = dsnam ? dsnam[1] : 0;
  let isOpen = false;
</script>

<style>

</style>

<div class="container-fluid">
  <div class="row justify-content-center text-primary">
    <div class="col-auto" on:click={() => (isOpen = !isOpen)}>
      <h3>DANH SÁCH KHÁCH HÀNG - NHẬN ĐƠN NĂM&nbsp;</h3>
    </div>
  </div>
  {#if isOpen}
    <div class="row">
      <div class="col-auto">
        <select class="custom-select" id="selectnam" bind:value={namhoso}>
          {#each dsnam as item}
            <option value={item}>{item}</option>
          {/each}
        </select>
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
  {/if}
</div>
