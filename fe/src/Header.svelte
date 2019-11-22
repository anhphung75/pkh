<script>
  //import { kho } from "./stores.js";

  let isLogin = false;
</script>

<style>

</style>

<div class="container-fluid">
  <div class="row">
    <div class="col" />
    {#if isLogin}
      <div class="col-auto">
        <button class="btn btn-outline-secondary" type="button">
          <i class="fa fa-sign-out " />
          Đăng xuất
        </button>
      </div>
    {:else}
      <div class="col-auto">
        <button class="btn btn-outline-secondary" type="button">
          <i class="fa fa-indent" />
          Đăng ký
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-secondary" type="button">
          <i class="fa fa-sign-in " />
          Đăng nhập
        </button>
      </div>
    {/if}
  </div>
</div>
