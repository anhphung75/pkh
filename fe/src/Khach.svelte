<script>
  export let mahoso;
  export let sohoso;
  export let khachhang;
  export let diachikhachhang;
  export let lienhe;
  export let ghichu;

  let isOpen = false;

  function suaHoso() {}
  function showHoso() {}
</script>

<style>

</style>

<td>{mahoso}</td>
<td>{sohoso}</td>
<td>{khachhang}</td>
<td>{diachikhachhang}</td>
<td>{lienhe}</td>
<td>{ghichu}</td>
<td on:click={suaHoso}>
  <i class="fa fa-edit" />
</td>
