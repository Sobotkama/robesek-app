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
var fps = 15
var ws = new WebSocket("ws://" + ip + ":8000/")



function sendData(data) {
  document.getElementById("debugbox").innerHTML = data
  ws.send(data)  
} 

function reload_img() {
  refreshIntervalId = setInterval(function(){ 
    if (error == 0) {
      mjpeg_img.src = 'http://' + ip + '/cam.jpg?' + new Date().getTime();
    }
    else {
    clearInterval(refreshIntervalId);
    }     
  }, preview_delay);
}


function unerror() {
  setTimeout(function(){
  error = 0
  reload_img()
  },100)
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
  document.getElementById("hors").value = "90"
  document.getElementById("vers").value = "110"
  camhor()
  camver()
}

function createnipple() {
  manager = nipplejs.create({
    zone: document.getElementById('left'),
    mode: 'dynamic',
    color: 'red',
    size: 100
  });
}

function camhor(){
  var payload = "c:hor" + document.getElementById("hors").value
  sendData(payload)
}

function camver(){
  var payload = "c:ver" + document.getElementById("vers").value
  sendData(payload)
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
  modal.style.display = "block";
}

function savevars() {
  ip = document.getElementById("ipbox").value;
  rtext = document.getElementById("rtextbox").value
  fps = Number(document.getElementById("fps").value)
  storage.setItem("rtext", rtext);
  storage.setItem("ip", ip)
  storage.setItem("fps", fps)
  preview_delay = Math.floor(divider / Math.max(fps, 1) * 1000);
  error = 1
  setTimeout(function(){unerror()},preview_delay)
  ws = new WebSocket("ws://" + ip + ":8000/")
}

function loadVars() {
  ip = storage.getItem("ip")
  rtext = storage.getItem("rtext")
  fps = storage.getItem("fps")
  if (ip != null) {
    document.getElementById("ipbox").value = ip
    clearInterval(refreshIntervalId);
    reload_img()
  }
  if (fps != null) {
    document.getElementById("fps").value = fps
    preview_delay = Math.floor(divider / Math.max(fps, 1) * 1000)
    clearInterval(refreshIntervalId);
    reload_img()
  }
  document.getElementById("rtextbox").value = rtext
  ws = new WebSocket("ws://" + ip + ":8000/")
}

createnipple()


//
// Init
//
function init() {
  var modal = document.getElementById('modalSettings');
  var span = document.getElementsByClassName("close")[0];
  divider = 1;
  mjpeg_img = document.getElementById("mjpeg_dest");
  preview_delay = Math.floor(divider / Math.max(fps, 1) * 1000);
  mjpegmode = 0;
  mjpeg_img.onerror = error_img;
  reload_img();
  loadVars()
}


manager.on('dir:up', function () {
    console.log("up")
    sendData("m:for")
    })

manager.on('dir:down', function () {
    console.log("down")
    sendData("m:back")
    })
    
manager.on('dir:left', function () {
    console.log("left")
    sendData("m:left")
    })    

manager.on('dir:right', function () {
    console.log("right")
    sendData("m:right")
    })
manager.on('end', function () {
    console.log("release")
    sendData("m:stop")
    })



