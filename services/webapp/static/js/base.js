function hover_class_in(uid) {
  let w = document.getElementsByClassName(uid), i = 0;
  while (true) {
    try {
      w[i].dataset.bgcolor = w[i].style.backgroundColor;
      w[i].style.backgroundColor = 'yellow';
      i++;
    }
    catch (err) {
      break;
    }
  }
}

function hover_class_out(uid) {
  let w = document.getElementsByClassName(uid), i = 0;
  while (true) {
    try {
      let bgcolor = w[i].dataset.bgcolor;
      w[i].style.backgroundColor = bgcolor;
      i++;
    }
    catch (err) {
      break;
    }
  }
}