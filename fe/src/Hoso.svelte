<script>
  import { kho } from "./stores.js";
  import Timhoso from "./Timhoso.svelte";

  let isEdit = false;
  let cur_id = 0;
  let edit_id = -1;
  let curmahoso = "";
  let hosomoi = {
    mahoso: "2019hs001",
    khachhang: "Nguyen Van A",
    sohoso: "GM01200/19",
    diachi: "123 Tran Van Thoi, Q10",
    maq: "01",
    maqp: "0102",
    mota: "",
    ngaygan: "2019/10/20",
    sodhn: "1232",
    chisodhn: 0.0,
    madma: "xxx",
    malotrinh: "112",
    trongai: "",
    tainhap: "",
    taithicong: "",
    hoantien: "",
    lienhe: "",
    hieudhn: "kent"
  };
  // ham
  function suaHoso() {
    let h = {};
    h.mahoso = mahoso;
    h.sohoso = sohoso;
    h.khachhang = khachhang;
    h.diachi = diachi;
    let tincangui = { tin: "capnhat", goi: h };
    //guitinServer(tincangui);
  }
  // tao scroll y
  let rongbang;
  let caobang;
  let caotieude;
  $: caonoidung = caobang - caotieude;
  $: scrollWidth = rongbang - 10;
</script>

<style>
  session {
    height: 100%;
  }
  tbody {
    display: block;
    overflow-y: auto;
  }
  thead,
  tbody tr {
    display: table;
    table-layout: fixed;
  }
</style>

<session>
  <div class="container-fluid">
    <Timhoso />
  </div>
  <div>curid ={cur_id}</div>
  <div class="container-fluid" bind:clientHeight={caobang}>
    <div class="table-responsive" bind:clientWidth={rongbang}>
      <table class="table table-hover">
        <thead bind:clientHeight={caotieude} style="width:{scrollWidth}px;">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã hồ sơ</th>
            <th scope="col">Số hồ sơ</th>
            <th scope="col">Khách hàng</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Liên hệ</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Trở ngại</th>
            <th scope="col">Tái nhập</th>
            <th scope="col">Tái thi công</th>
            <th scope="col">Hoàn tiền</th>
          </tr>
        </thead>
        <tbody style="max-height:{caonoidung}px; width:{scrollWidth}px;">
          {#each $kho.dsloc as hs, stt}
            <tr on:mouseover={() => (cur_id = stt)}>
              {#if isEdit && cur_id === stt && edit_id === stt}
                <th scope="row">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    on:click={() => {
                      isEdit = false;
                      edit_id = -1;
                      suaHoso();
                    }}>
                    <i class="fa fa-save" />
                    {stt + 1}
                  </button>
                </th>
                <td>{hs.mahoso}</td>
                <td>
                  <input bind:value={hs.sohoso} />
                </td>
                <td>
                  <input bind:value={hs.khachhang} />
                </td>
                <td>
                  <input bind:value={hs.diachi} />
                </td>
                <td>
                  <input bind:value={hs.lienhe} />
                </td>
                <td>
                  <input bind:value={hs.mota} />
                </td>
                <td>
                  <input bind:value={hs.trongai} />
                </td>
                <td>
                  <input bind:value={hs.tainhap} />
                </td>
                <td>
                  <input bind:value={hs.taithicong} />
                </td>
                <td>
                  <input bind:value={hs.hoantien} />
                </td>
              {:else}
                <th scope="row">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    on:click={() => {isEdit = true;
                    edit_id = stt;}}>
                    <i class="fa fa-edit" />
                    {stt + 1}
                  </button>
                </th>
                <td>{hs.mahoso}</td>
                <td>{hs.sohoso}</td>
                <td>{hs.khachhang}</td>
                <td>{hs.diachi}</td>
                <td>{hs.lienhe}</td>
                <td>{hs.mota}</td>
                <td>{hs.trongai}</td>
                <td>{hs.tainhap}</td>
                <td>{hs.taithicong}</td>
                <td>{hs.hoantien}</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</session>
