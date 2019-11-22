<script>
  import { kho } from "./stores.js";
  //init data
  let p = $kho.progress || 0;
  $: isOpen = p < 100 ? true : false;
</script>

<style>

</style>

{#if isOpen}
  <div class="row">
    <div class="col">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated bg-info"
          role="progressbar"
          aria-valuenow={p}
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: {p}%">
          {p}%
        </div>
      </div>
    </div>
  </div>
{/if}
