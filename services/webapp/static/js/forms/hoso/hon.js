var any2obj = (sdata) => {
  try {
    if (typeof sdata === 'string') {
      let data = sdata.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
      sdata = data.replace(/'/g, '"');
      return JSON.parse(sdata);
    }
  } catch (err) {
    return { "err": sdata };
  }
};

//main 
self.onmessage = (e) => {
  let kq = any2obj(e.data);
  try {
    if (kq.cv == 0) {
      self.terminate();
      if ("err" in kq) {
        console.log("err=", kq.err);
      }
    }
    console.log("post from xac=", kq);
    self.postMessage("post from hon");
  } catch (err) {
    console.log("err on hon=", err);
  }
};