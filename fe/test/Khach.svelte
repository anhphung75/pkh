<script>
  import { kho } from "./stores.js";
  $kho.hosocapnhat = "";
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

  // socket
  const socket_url = "ws://localhost:8888/hoso/api1108";
  var ws = new WebSocket(socket_url);
  function nhantinServer() {
    console.log("nhan tin tu server ws.readyState=" + ws.readyState);
    if (ws.readyState > 1) {
      ws = new WebSocket(socket_url);
    }
    ws.onmessage = function(event) {
      let tt = JSON.parse(event.data);
      console.log(
        "tin tu server: 'tin'=" + JSON.stringify(tt));
      if (tt["tin"] === "capnhat") {
        $kho.hosocapnhat = tt["goi"];
      }
    };
  }

  function guitinServer(sjson) {
    console.log("gui tin ws.readyState=" + ws.readyState);
    if (ws.readyState > 1) {
      ws = new WebSocket(socket_url);
    }
    ws.send(JSON.stringify(sjson));
  }

  function suaHoso() {
    let goi = {};
    goi.mahoso = mahoso;
    goi.sohoso = sohoso;
    goi.khachhang = khachhang;
    goi.diachi = diachi;
    let tincangui = { tin: "capnhat", goi: goi };
    guitinServer(tincangui);
  }
  function showHoso() {}
  $: updateHoso = nhantinServer();
</script>

<style>
  tr {
    display: table;
    table-layout: fixed;
  }
</style>

<tr style="width:{$kho.tblWidth}px;">
  {#if isEdit}
    <th scope="row">
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
