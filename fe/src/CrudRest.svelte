<script context="module">
  import { kho } from "./stores.js";
  $kho.hoso = $kho.hoso ? $kho.hoso : [];
  $kho.progress = $kho.progress ? $kho.progress : 100;
  $kho.dstim = $kho.dstim ? $kho.dstim : [];
  function refreshHoso() {
    $kho.dstim = [...$kho.dstim, "h"];
    let r = $kho.dstim.pop();
    r = null;
  }
  function moiHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    if (listhoso.length === 0) {
      return;
    }
    $kho.hoso = [...$kho.hoso, listhoso];
    refreshHoso();
  }
  function suaHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    if (listhoso.length === 0) {
      return;
    }
    if ($kho.hoso.length === 0) {
      $kho.hoso = listhoso;
      return;
    }
    let l1 = listhoso.length;
    for (let i1 = 0; i1 < l1; i1++) {
      let hsr = listhoso[i1];
      let l = $kho.hoso.length;
      for (let i = 0; i < l; i++) {
        let hss = $kho.hoso[i];
        if (hsr.mahoso === hss.mahoso) {
          for (let k in hsr) {
            if (hss.hasOwnProperty(k)) {
              hss[k] = hsr[k];
            }
          }
        }
      }
    }
    refreshHoso();
  }
  function xoaHoso(listhoso) {
    listhoso = listhoso ? JSON.parse(JSON.stringify(listhoso)) : [];
    if (listhoso.length === 0 || $kho.hoso.length === 0) {
      return;
    }
    let l1 = listhoso.length;
    for (let i1 = 0; i1 < l1; i1++) {
      let hsr = listhoso[i1];
      let l = $kho.hoso.length;
      for (let i = 0; i < l; i++) {
        let hss = $kho.hoso[i];
        if (hsr.mahoso === hss.mahoso) {
          $kho.hoso.splice(i, 1);
          break;
        }
      }
    }
    $kho.hoso = $kho.hoso;
    refreshHoso();
  }
  // web
  const API_URL = "http://localhost:8888/api1108/hoso/";
  function nhanWeb(nam) {
    let apiurl = nam ? API_URL + nam : API_URL;
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
      let dulieu = response.data || {};
      console.log("response.data=" + dulieu);
      if (Object.keys(dulieu).length > 1) {
        $kho.hoso = dulieu.goi.hoso;
        console.log("$dulieu.hoso=" + dulieu.hoso);
        console.log("$dulieu.info=" + dulieu.info);
      }
    });
  }

  function guiWeb(datajson) {
    let apiurl = API_URL;
    axios({
      method: "post",
      url: apiurl,
      // headers: { "X-Requested-With": "XMLHttpRequest" },
      data: datajson,
      xsrfCookieName: "_xsrf",
      onUploadProgress: progressEvent => {
        let percentCompleted = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        $kho.progress = percentCompleted;
        console.log("$kho.progress=" + $kho.progress);
      }
    }).then(response => {
      let dulieu = response.data;
      console.log("response.data=" + dulieu);
      //cap nhat hososua
    });
  }

  // socket
  let conggiaotiep = "pkh";
  let manguoidung = "pkh003";
  const socket_url = "ws://localhost:8888/hoso/api1108";
  var ws = new WebSocket(socket_url);
  function nhanSocket() {
    console.log("nhan tin tu server ws.readyState=" + ws.readyState);
    if (ws.readyState > 1) {
      ws = new WebSocket(socket_url);
    }
    ws.onmessage = function(event) {
      let tt = JSON.parse(event.data);
      console.log("tin tu server: 'tin'=" + JSON.stringify(tt));
      if (tt["tin"]["nhan"] === "capnhat") {
        //cap nhat hoso
        $kho.hososua = tt["goi"];
      }
    };
  }

  function guiSocket(datajson) {
    console.log("gui tin ws.readyState=" + ws.readyState);
    if (ws.readyState > 1) {
      ws = new WebSocket(socket_url);
    }
    ws.send(JSON.stringify(datajson));
  }

  export { nhanWeb, guiWeb, nhanSocket, guiSocket };
</script>
