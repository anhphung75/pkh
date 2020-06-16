Vue.component('nd-bang1', {
  props: ['rec','stt'],
  template: `
  <div v-if="isedit" class="row m-0 p-0 bg-warning">
    <div class="col-1 crud text-break">
      {{hoso.mahoso}}
        <button type="button" class="m-0 p-0 btn btn-sm btn-success" @click="save_ttdl">
          <i class="fa fa-save">{{stt + 1}}</i>
        </button>
        <button type="button" class="m-0 p-0 btn btn-sm btn-danger" @click="stop_ttdl">
          <i class="fa fa-stop-circle">Bỏ</i>
        </button>
      </div>
    </div>

  </div>
  <div v-else class="row m-0 p-0 bg-sucess">
    <div class="col-1 crud text-break">
    {{hoso.mahoso}}
      <button type="button" class="m-0 p-0 btn btn-sm btn-info" @click="edit_ttdl">
        <i class="fa fa-edit">{{stt + 1}}</i>
      </button>
    </div>
  </div>
  `,
  data() {
    return {
      isedit: rec.isedit,
      hoso: rec.hoso,
      dot: rec.dot,
      khachhang: rec.khachhang,
    };
  },
  methods: {
    stop_ttdl() {
      this.isedit = false;
      console.log('stop_ttdl');
    },
    edit_ttdl() {
      this.isedit = true;
      console.log('edit_ttdl');
    },
    save_ttdl() {
      this.isedit = false;
      console.log('save_ttdl');
    },
  },
});