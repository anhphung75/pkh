<script>
  import { kho } from "./stores.js";
  export let id;
  export let mahoso;
  export let sohoso;
  export let khachhang;
  export let diachi;
  export let lienhe;
  export let maq;
  export let maqp;
  export let mota;
  // hoan cong
  export let ngaygan;
  export let sodhn;
  export let hieudhn;
  export let chisodhn;
  export let madma;
  export let malotrinh;
  // pkh
  export let trongai;
  export let tainhap;
  export let taithicong;
  export let hoantien;

  let isOpen = false;
  let isEdit = false;

  function suaHoso() {}
  function showHoso() {}
</script>

<style>
  tr {
    display: table;
    table-layout: fixed;
  }
</style>

<tr style="width:{$kho.tblWidth}px;">
  {#if isEdit}
    <th scope="row" on:blur={() => (isEdit = false)}>
      <button
        class="btn btn-outline-secondary"
        type="button"
        on:click={() => {
          isEdit = false;
          suaHoso();
        }}>
        <i class="fa fa-save" />
        {id + 1}
      </button>
    </th>
    <td>{mahoso}{$kho.tblWidth}</td>
    <td>
      <input bind:value={sohoso} />
    </td>
    <td>
      <input bind:value={khachhang} />
    </td>
    <td>
      <input bind:value={diachi} />
    </td>
    <td>
      <input bind:value={lienhe} />
    </td>
    <td>
      <input bind:value={mota} />
    </td>
  {:else}
    <th scope="row">
      <button
        class="btn btn-outline-secondary"
        type="button"
        on:click={() => (isEdit = true)}>
        <i class="fa fa-edit" />
        {id + 1}
      </button>
    </th>
    <td>{mahoso}</td>
    <td>{sohoso}</td>
    <td>{khachhang}</td>
    <td>{diachi}</td>
    <td>{lienhe}</td>
    <td>{mota}</td>
  {/if}
</tr>
