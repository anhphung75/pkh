import { data_test } from "./data_test.js";

export default {
  //mixins: [queryMixin],
  props: ["otim"],
  watch: {
    // Load the data from the given endpoint
    // on initial rendering of the component and
    // every time the filter property changes.
    otim: {
      immediate: true,
      handler: `load`,
    },
  },
  data() {
    return {
      // Create a new axios instance.
      // See: https://github.com/axios/axios#creating-an-instance
      ttdl: {},
      error: null,
      isload: false,
    };
  },
  methods: {
    load() {
      console.log('load proc from banghoso datatest');
      console.log('banghoso datatest=', JSON.stringify(data_test));
      var s, ss, k, dl = {};
      s = this.otim.toLowerCase();
      for (k in data_test) {
        ss = JSON.stringify(data_test[k]).toLowerCase();
        if (ss.indexOf(s) > -1) {
          dl[k] = data_test[k]
        }
      }
      this.ttdl = dl;
      console.log('banghoso dl ', JSON.stringify(dl));
      console.log('banghoso ttdl ', JSON.stringify(this.ttdl));
      //this.ttdl = Object.freeze(dl);
    },
    computed: {
      odata() {
        console.log('computed o1data proc from banghoso');
        var s, ss, k, dl = {};
        s = this.otim.toLowerCase();
        for (k in data_test) {
          ss = JSON.stringify(data_test[k]).toLowerCase();
          if (ss.indexOf(s) > -1) {
            dl[k] = data_test[k]
          }
        }
        return dl;
        //return Object.freeze(dl);
      },
    },
  },
  render() {
    // Render the default scoped slot and
    // provide data and method properties
    // via the slot scope.
    const slot = this.$scopedSlots.default({
      data: this.ttdl,
      error: this.error,
      isload: this.isload,
      load: this.load,
      odata: this.odata,
      ttdl: this.ttdl,
    });
    return Array.isArray(slot) ? slot[0] : slot;
  },
};