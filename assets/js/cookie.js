let cookieToggle = document.querySelector('#cookieWrap'), cookieButton = document.querySelector('#cookieAccept');

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var cookie = getCookie("cookieAccepted")
  console.log(cookie)
  if (cookie != "") {
    cookieToggle.classList.toggle('accepted');
  }
}

cookieButton.onclick = function() {
  document.cookie = "cookieAccepted=true";
  cookieToggle.classList.toggle('accepted');
}

window.onload = function(){
  checkCookie()
}