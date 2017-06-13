//
// MJPEG
//
var ip = "192.168.104.143"
var mjpeg_img;
var halted = 0;
var previous_halted = 99;
var mjpeg_mode = 0;
var preview_delay = 0;
var modal;
var span;
var storage = window.localStorage;
var rtext;
var error = 0;
function reload_img() {
  if (error = 0) {
    setTimeout("mjpeg_img.src = 'http://' + ip + '/cam.jpg?' + new Date().getTime();", preview_delay )
    reload_img;
  }
}

function unerror() {
	error = 0
	reload_img
}

function error_img() {
  if (mjpeg_img.src != 'img/err.png') {
    mjpeg_img.src = 'img/err.png'
  }
  error = 1
  setTimeout("unerror()", 5000)
}

//
// INTERFACE
//

//JOYSTICK

function resetcam() {
  document.getElementById("hors").value="90"
  document.getElementById("vers").value="110"
}

function createnipple() {
  var joystickL = nipplejs.create({
    zone: document.getElementById('left'),
    mode: 'dynamic',
    color: 'red',
    size: 100
  });
}

//SETTINGS

function spanc() {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function settwindow() {
  console.log("settings");
  modal.style.display = "block";
}

function savevars() {
  ip = document.getElementById("ipbox").value;
  reload_img();
  rtext = document.getElementById("rtextbox").value
  fps = Number(document.getElementById("fps").value)
  storage.setItem("rtext", rtext);
  storage.setItem("ip", ip)
  storage.setItem("fps", fps)
}

function loadVars() {
  ip = storage.getItem("ip")
  rtext = storage.getItem("rtext")
  fps = storage.getItem("fps")
  if (ip != null) {
    document.getElementById("ipbox").value = ip
  }
  if (fps != null) {
    document.getElementById("fps").value = fps
    preview_delay = Math.floor(divider / Math.max(video_fps, 1) * 1000)
  }
  document.getElementById("rtextbox").value = rtext
}

//
// Init
//
function init() {
  var modal = document.getElementById('modalSettings');
  var span = document.getElementsByClassName("close")[0];
  //createnipple();
  video_fps = 15;
  divider = 1;
  mjpeg_img = document.getElementById("mjpeg_dest");
  preview_delay = Math.floor(divider / Math.max(video_fps, 1) * 1000);
  mjpegmode = 0;
  mjpeg_img.onerror = error_img;
  reload_img();
  loadVars()
}
