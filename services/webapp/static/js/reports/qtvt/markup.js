function suatieude(tieude) {
  let w = document.getElementsByClassName("tieude"), i = 0;
  while (true) {
    try {
      w[i].innerHTML = tieude;
      i++;
    }
    catch (err) {
      break;
    }
  }
}

function suangaylap(ngaylap) {
  let w = document.getElementsByClassName("ngaylap"), i = 0;
  while (true) {
    try {
      w[i].innerHTML = ngaylap;
      i++;
    }
    catch (err) {
      break;
    }
  }
}

