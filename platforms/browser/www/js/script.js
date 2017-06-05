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

function reload_img() {
  if (!halted) mjpeg_img.src = "http://" + ip + "/cam.jpg?" + new Date().getTime();
  else setTimeout("reload_img()", 500);
}

function error_img() {
  mjpeg_img.src = 'img/err.png'
}

//
// INTERFACE
//

//JOYSTICK

function createnipple() {
  var joystickL = nipplejs.create({
    zone: document.getElementById('left'),
    mode: 'dynamic',
    color: 'red',
    size: 100
  });
}

//SETTINGS

// Get the modal


// When the user clicks on <span> (x), close the modal
function spanc() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function settwindow() {
  console.log("settings")
  modal.style.display = "block";
}

function savevars() {
  ip = document.getElementById("ipbox").value;
}

//
// Init
//
function init() {
  var modal = document.getElementById('modalSettings');
  var span = document.getElementsByClassName("close")[0];
  createnipple();
  mjpeg = 0;
  video_fps = 25;
  divider = 1
  mjpeg_img = document.getElementById("mjpeg_dest");
  preview_delay = Math.floor(divider / Math.max(video_fps, 1) * 1000000);
  if (mjpeg) {
    mjpegmode = 1;
  }
  else {
    mjpegmode = 0;
    mjpeg_img.onload = reload_img;
    mjpeg_img.onerror = error_img;
    reload_img();
  }
}
