<script>
    export let mahoso;
    export let sohoso;
    export let khachhang;
    export let diachikhachhang;
    export let lienhe;
    export let ghichu;

    let isOpen = false;

    function suaHoso() {

    };
    function showHoso() {

    };
</script>

<style>
  .hbox {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start
  }
  .hbox span{
      flex: 1 1 auto;
  }
  .mahoso{flex: 1 1 auto;}
  .khachhang{flex: 3 3 auto;}
  .diachi{flex: 7 7 auto;}
</style>

<li class="hbox">
    <span class="hover-cursor" >
        <i class="fa fa-plus-square-o" style="font-size:48px;color:blue"></i>
    </span>
    <span class='mahoso'>{mahoso}</span>
    <span class='sohoso'>{sohoso}</span>
    <span class='khachhang'>{khachhang}</span>
    <span class='diachi'>{diachikhachhang}</span>
    <span class='lienhe'>{lienhe}</span>
    <span class='mota'>{ghichu}</span>
    <span class="hover-cursor text-danger pull-right" on:click={suaHoso}>
        <i class="fa fa-edit"></i>
    </span>
</li>