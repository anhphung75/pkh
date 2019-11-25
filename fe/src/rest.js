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
function nhanSocket(conggiaotiep = 'pkh', manguoidung = 'pkh002') {
  //const socket_url = "ws://" + location.host + "/api1108/" + conggiaotiep + "/hoso/" + manguoidung;
  const socket_url = "ws://localhost:8888" + "/api1108/" + conggiaotiep + "/hoso/" + manguoidung;
  var ws = new WebSocket(socket_url);
  if (ws.readyState > 1) {
    try { ws = new WebSocket(socket_url); } catch (err) { console.log("error " + err); } finally {
      console.log("nhanSocket nhan tin tu server ws.readyState=" + ws.readyState);
      ws.onmessage = function (event) {
        let tt = JSON.parse(event.data);
        console.log("nhanSocket tin tu server: 'tin'=" + JSON.stringify(tt));
        if (['gom', 'moi', 'xem', 'sua', 'xoa'].indexOf(tt["tin"]["nhan"]) !== -1) {
          return { nhan: tt["tin"]["nhan"], hoso: tt["goi"]["hoso"] };
        }
      };
    };
  }

}

function guiSocket(datajson, conggiaotiep , manguoidung) {
  //const socket_url = "ws://" + location.host + "/api1108/" + conggiaotiep + "/hoso/" + manguoidung;
  const socket_url = "ws://localhost:8888" + "/api1108/" + conggiaotiep + "/hoso/" + manguoidung;
  var ws = new WebSocket(socket_url);
  if (ws.readyState > 1) {
    try {
      ws.send(JSON.stringify(datajson));
      console.log("rest try guiSocket=" + JSON.stringify(datajson));
    } catch (err) {
      ws = new WebSocket(socket_url);
    } finally {
      ws.send(JSON.stringify(datajson));
      console.log("rest final guiSocket=" + JSON.stringify(datajson));
    };
  }
}

export { nhanWeb, guiWeb, nhanSocket, guiSocket };
