import Quochuy from "./quochuy.js"

export default {
  props: {
    maqt: {
      type: String,
      required: true
    },
    url_ws: {
      type: String,
      required: true
    },
  },
  components: {
    //"quochuy": Quochuy,
  },
  data() {
    //load dulieu tu bang in_qt
    return {
      odl: null,
    }
  },
  methods: {
    napqt(maqt) {
      return
    },
  },
  computed: {

  },
  template: `
    <div>
      trang 1
    </diw>
  `,
};