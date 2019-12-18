<script>
  import { kho, ga } from "./stores.js";
  import { getdsNam, getCookie, deepCopy } from "./utils.js";
  import Progress from "./Progress.svelte";
  import Hoso from "./Hoso.svelte";
  //import HosoMoi from "./HosoMoi.svelte";
  // init data
  $kho.hoso = [];
  $kho.progress = 100;

  let curComp = Hoso;
  let dsnam = getdsNam(10);
  let namhoso = dsnam ? dsnam[1] : 0;
  let isOpen = false;

  //crud
  function refreshHoso() {
    $kho.dstim = [...$kho.dstim, "h"];
    let r = $kho.dstim.pop();
    r = null;
  }
  function nhap_hang(chat) {
    if (chat.hasOwnProperty("data")) {
      let listhoso = chat["data"] || [];
      let l1 = listhoso.length || 0;
      if (l1 === 0) {
        return;
      }
    }
    if (chat.hasOwnProperty("event") && chat["event"] === "xoa") {
      let hoso = deepCopy($kho.hoso) || [];
      let l = hoso.length;
      if (l === 0) {
        return;
      }
      for (let i1 = 0; i1 < l1; i1++) {
        let hsr = listhoso[i1];
        for (let i = 0; i < l; i++) {
          let hss = hoso[i];
          if (hsr.mahoso === hss.mahoso) {
            hoso.splice(i, 1);
            break;
          }
        }
      }
      $kho.hoso = deepCopy(hoso);
      refreshHoso();
    } else {
      let hsnam = listhoso.filter(i => i.mahoso.startsWith(namhoso));
      let ds_mahoso_cu = [];
      hoso = deepCopy($kho.hoso) || [];
      l = hoso.length;
      for (i = 0; i < l; i++) {
        hss = hoso[i];
        ds_mahoso_cu.push(hss["mahoso"]);
        for (i1 = 0; i1 < l1; i1++) {
          hsr = listhoso[i1];
          if (hsr.mahoso === hss.mahoso) {
            for (let k in hsr) {
              if (hss.hasOwnProperty(k)) {
                hss[k] = hsr[k];
              }
            }
          }
        }
      }
      //add new
      let hosonew = listhoso.filter(i => ds_mahoso_cu.indexOf(i.mahoso) === -1);
      listhoso = deepCopy(hosonew);
      hosonew = deepCopy($kho.hoso) || [];
      l = listhoso.length || 0;
      for (i = 0; i < l; i++) {
        hosonew.push(listhoso[i]);
      }
      $kho.hoso = deepCopy(hosonew);
      refreshHoso();
    }
  }

  const API_URL = "http://localhost:8888/api1108/hoso/";
  function nhanWeb() {
    let apiurl = namhoso ? API_URL + namhoso : API_URL;
    axios({
      method: "get",
      url: apiurl,
      responseType: "json",
      responseEncoding: "utf8",
      onDownloadProgress: progressEvent => {
        let percentCompleted = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        $kho.progress = percentCompleted;
        console.log("$kho.progress=" + $kho.progress);
      }
    }).then(response => {
      let chat = response.data || {};
      console.log("response.data=" + chat);
      if (Object.keys(chat).length > 1) {
        nhap_hang(chat);
        console.log("$dulieu.hoso=" + chat.data);
        console.log("$dulieu.info=" + chat.info);
      }
    });
  }
</script>
