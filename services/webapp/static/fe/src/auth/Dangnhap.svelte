<script>
  import { kho, ga } from "../db/stores.js";
  let _email = "";
  let _pwd = "";
  $ga.login = "https://" + location.host + "/khach/dangnhap/";
  function logIn() {
    axios({
      method: "post",
      url: $ga.login,
      data: { email: _email, pwd: _pwd },
      //headers: {"Content-Type": "application/json"},
      xsrfHeaderName: "X-XSRFToken",
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
    });
  }
</script>

<div class="container-fluid">
  <div class="row">
    <i class="fa fa-envelope icon" />
    <input type="email" placeholder="Thư điện tử ..." bind:value={_email} />
  </div>
  <div class="row">
    <i class="fa fa-key icon" />
    <input type="password" placeholder="Mật mã ..." bind:value={_pwd} />
  </div>
  <div class="row">
    <button class="btn btn-outline-secondary" type="button" on:click={logIn}>
      <i class="fa fa-sign-in " />
      Đăng nhập
    </button>
  </div>
</div>
