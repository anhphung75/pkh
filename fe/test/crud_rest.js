// web
// import axios from 'axios';
const API_URL = "http://localhost:8888/api1108/hoso/";
function nhanWeb() {
  let apiurl = API_URL + $kho.namhoso;
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
    let dulieu = response.data;
    console.log("response.data=" + dulieu);
    if (dulieu !== null || dulieu !== undefined || dulieu !== "") {
      $kho.dskh = dulieu.hoso;
      console.log("$dulieu.hoso=" + dulieu.hoso);
      console.log("$dulieu.info=" + dulieu.info);
    }
  });
}

function guiWeb(datajson) {
  let apiurl = "http://localhost:8888/api1108/hoso/" + curmahoso;
  axios({
    method: "post",
    url: apiurl,
    // headers: { "X-Requested-With": "XMLHttpRequest" },
    data: datajson,
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
const socket_url = "ws://localhost:8888/hoso/api1108";
var ws = new WebSocket(socket_url);
function nhanSocket() {
  console.log("nhan tin tu server ws.readyState=" + ws.readyState);
  if (ws.readyState > 1) {
    ws = new WebSocket(socket_url);
  }
  ws.onmessage = function (event) {
    let tt = JSON.parse(event.data);
    console.log(
      "tin tu server: 'tin'=" + JSON.stringify(tt));
    if (tt["tin"] === "capnhat") {
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
