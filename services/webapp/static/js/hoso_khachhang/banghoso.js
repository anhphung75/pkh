export default {
  //mixins: [queryMixin],
  props: {
    //worker read
    wr: {
      type: Object,
    },
    // Provide a filter to limit the
    // results of the API request.
    filter: {
      type: Object,
    },
  },
  watch: {
    // Load the data from the given endpoint
    // on initial rendering of the component and
    // every time the filter property changes.
    filter: {
      immediate: true,
      handler: `load`,
    },
  },
  data() {
    return {
      // Create a new axios instance.
      // See: https://github.com/axios/axios#creating-an-instance
      api: axios.create({ baseURL: this.baseUrl }),
      ttdl: null,
      error: null,
      isload: false,
    };
  },
  methods: {
    load() {
      var dprog = {
        csdl: {
          ten: this.csdl,
          sohieu: this.sohieu
        },
        otim: this.otim_ext,
        //otim: { '2020': 0, 'gm': 0 },
      };
      this.ttdl = {};
      var myWorker = new Worker('worker.js');
      var w = new SharedWorker(this.url_ws.ttxl, { type: 'module' });
      w.port.start();
      const sw = w.port;
      sw.postMessage(dprog);
      sw.onerror = (err) => {
        console.log("err on loadHsKh ", err.message);
      };
      sw.onmessage = (e) => {
        var info = e.data.info;
        if (info) {
          console.log('info= =', info);
        }
        var status = e.data.status || '';
        if (status.toLowerCase() === 'ok') {
          var id = e.data.id;
          var kq = e.data.kq;
          this.ttdl[id] = kq;
          console.log('sw.id=', id, 'sw.kq=', kq);
        }
        console.log('ttdl=', this.ttdl);
      };
    },
  },
  render() {
    // Render the default scoped slot and
    // provide data and method properties
    // via the slot scope.
    return this.$scopedSlots.default({
      data: this.ttdl,
      error: this.error,
      load: this.load,
      isload: this.isload,
    });
  },
};