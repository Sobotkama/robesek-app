//
// MJPEG
//
var ip = "192.168.104.143"
var mjpeg_img;
var halted = 0;
var previous_halted = 99;
var mjpeg_mode = 0;
var preview_delay = 0;

function reload_img () {
  if(!halted) mjpeg_img.src = "http://" + ip + "/cam.jpg?" + new Date().getTime();
  else setTimeout("reload_img()", 500);
}

function error_img () {
  setTimeout("mjpeg_img.src = 'http://' + ip + '/cam.jpg?time=' + new Date().getTime();", 100);
}



function createnipple() {
    var joystickL = nipplejs.create({
        zone: document.getElementById('left'),
        mode: 'dynamic',
        color: 'red',
        size: 80
    });
}


//
// Init
//
function init(mjpeg, video_fps, divider) {
  createnipple();
  mjpeg = 0;
  video_fps = 25;
  divider = 1
  mjpeg_img = document.getElementById("mjpeg_dest");
  preview_delay = Math.floor(divider / Math.max(video_fps,1) * 1000000);
  if (mjpeg) {
    mjpegmode = 1;
  } else {
     mjpegmode = 0;
     mjpeg_img.onload = reload_img;
     mjpeg_img.onerror = error_img;
     reload_img();
  }
}


