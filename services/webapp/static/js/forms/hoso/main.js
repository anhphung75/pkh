let otim = {
  "namlamviec": 2020,
  "plqt": "",
  "utcid":{"hoso":0,"dvtc":0,"dot":0,"qtgt":0},
  "ma":{"hoso":"","dvtc":"","dot":"","qtgt":""},
};

function stim_keyup(e) {
  console.log("e=",JSON.stringify(e));
  console.log("e.target=",JSON.stringify(e.target));
  console.log("e.key=", e.key, " e.keyCode=", e.keyCode, " e.code=", e.code);
  //console.log("e.value=", e.value, " e.target.value=", e.target.value);
  if (e.code === 'Insert' && this.stim.length > 0) {

    //this.add_otim()
  };
  if (e.code === 'Enter' && this.stim.length > 0) {
    //this.add_otim()
  };
  if (e.code === 'ArrowDown') {
    return
  };
  if (e.code === 'ArrowUp') {
    return
  };
}