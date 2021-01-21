self.onmessage = (e) => {
  let tin = e.data, cv = 1, wss = null;
  try {
    wss = new WebSocket(tin.xe)
  } catch (err) {
  } finally {
    wss.onopen = () => {
      wss.send(JSON.stringify(tin))
    }
    wss.onmessage = (e) => {
      self.postMessage({ cv: cv, kq: e.data })
      cv++;
    }
    wss.onclose = () => {
      self.postMessage({ cv: -1, kq: null })
      //delete wss;
    }
    wss.onerror = (err) => {
      self.postMessage({ cv: cv, err: err.message })
    }
  }
}