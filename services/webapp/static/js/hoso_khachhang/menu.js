var panel = new Vue({
  el: '#panel',
  delimiters: ["{`", "`}"],
  data() {
    return {
      showMenu: false,
    }
  }
});

var menu = new Vue({
  el: '#menu',
  delimiters: ["{`", "`}"],
  data() {
    return {
      showMenu: false,
    }
  }
});