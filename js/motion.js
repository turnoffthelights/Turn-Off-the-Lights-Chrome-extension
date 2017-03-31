//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2017 Stefan vd
www.stefanvd.net
www.turnoffthelights.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================

document.addEventListener('DOMContentLoaded', function() { cameramotionlights(); },false);
chrome.storage.onChanged.addListener(function() { cameramotionlights(); });

var cammotionDomains = null;

// Cam Motion
var localMediaStream = null;

var width; var height;
var huemin; var huemax; var satmin; var satmax; var valmin; var valmax;
var last; var thresh; var down; var wasdown;
var movethresh; var brightthresh; var overthresh;
var avg;
var state;
var intervalID;
var draw;
var skin_filter;
var r; var g; var b; var a;
var hsv;
var delt;

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

function cameramotionlights(){
chrome.storage.sync.get(['motion', 'cammotiononly', 'cammotionDomains'], function(response){
var motion = response['motion'];
var cammotiononly = response['cammotiononly'];

if(motion == true){
chrome.runtime.onSuspend.addListener(function() { location.reload(); });
}

function onlycammotionfunction(tab){
	var currenturl = tab;
	if(currenturl.substr(-1) == '/') {
        currenturl = currenturl.substr(0, currenturl.length - 1);
    }

	cammotionDomains  = response['cammotionDomains']; // get latest setting
	if(typeof cammotionDomains == "string") {
		cammotionDomains = JSON.parse(cammotionDomains);
		var cmbuf = [];
		for(var domain in cammotionDomains)
			cmbuf.push(domain);
			cmbuf.sort();
		for(var i = 0; i < cmbuf.length; i++)
			if(currenturl == cmbuf[i]){cammotionstartfunction();}
			else {
				if(localMediaStream){ // stop it
					document.getElementById('motionvideo').pause();
					document.getElementById('motionvideo').src = "";
					localMediaStream.stop();
					localMediaStream = null;
					document.getElementById('motionvideo').load();
					canvas = document.getElementById('motioncanvas');
					canvasgetcont = canvas.getContext('2d');
					canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
					ccanvas = document.getElementById('motioncomp');
					ccgetcont = ccanvas.getContext('2d');
					ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
					clearInterval(intervalID);
				}
			}
		}

}

if(motion == true){

	if(cammotiononly == true){
	// get current tab website
	chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {

		onlycammotionfunction(tab.url);
			
    });
	});
		
	} else {
	cammotionstartfunction();
	}


} else {

	if(localMediaStream){
		document.getElementById('motionvideo').pause();
		document.getElementById('motionvideo').src = "";
		localMediaStream.stop();
		localMediaStream = null;
		document.getElementById('motionvideo').load();
		canvas = document.getElementById('motioncanvas');
		canvasgetcont = canvas.getContext('2d');
		canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
		ccanvas = document.getElementById('motioncomp');
		ccgetcont = ccanvas.getContext('2d');
		ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
		clearInterval(intervalID);
		location.reload(); // to make sure everything is removed of the motion camera
	}
	
}
});
}

function cammotionstartfunction(){
//---
var video = document.getElementById('motionvideo');
var canvas = document.getElementById('motioncanvas');
var canvasgetcont = canvas.getContext('2d');
var ccanvas = document.getElementById('motioncomp');
var ccgetcont = ccanvas.getContext('2d');

// reset everything
if(localMediaStream){
document.getElementById('motionvideo').pause();
document.getElementById('motionvideo').src = "";
localMediaStream.stop();
localMediaStream = null;
document.getElementById('motionvideo').load();
canvas = document.getElementById('motioncanvas');
canvasgetcont = canvas.getContext('2d');
canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
ccanvas = document.getElementById('motioncomp');
ccgetcont = ccanvas.getContext('2d');
ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
}

navigator.getUserMedia({audio:false,video:true},function(stream){
        localMediaStream = stream; // Store the video stream
        video.src = window.URL.createObjectURL(stream);
        video.addEventListener('play', function(){ intervalID = window.setInterval(dump,1000/25); });
},function(){ console.log('Something is wrong here! Check your camera!'); })

var compression = 5;
width = height = 0;

        function dump() {
            if (localMediaStream) {
                if (canvas.width != video.videoWidth) {
                    width = Math.floor(video.videoWidth / compression);
                    height = Math.floor(video.videoHeight / compression);
                    canvas.width = ccanvas.width = width;
                    canvas.height = ccanvas.height = height;
                }
                if (width != 0) {
                    canvasgetcont.drawImage(video, width, 0, -width, height);
                    draw = canvasgetcont.getImageData(0, 0, width, height);
                    //ccgetcont.putImageData(draw,0,0);
                    skinfilter();
                    camtest();
                }
            }
        }

huemin = 0.0; huemax = 0.10; satmin = 0.0; satmax = 1.0; valmin = 0.4; valmax = 1.0;
        function skinfilter() {

            skin_filter = canvasgetcont.getImageData(0, 0, width, height)
            var total_pixels = skin_filter.width * skin_filter.height
            var index_value = total_pixels * 4

            var count_data_big_array = 0;
            for (var y = 0 ; y < height ; y++) {
                for (var x = 0 ; x < width ; x++) {
                    index_value = x + y * width
                    r = draw.data[count_data_big_array]
                    g = draw.data[count_data_big_array + 1]
                    b = draw.data[count_data_big_array + 2]
                    a = draw.data[count_data_big_array + 3]

                    hsv = rgb2Hsv(r, g, b);
                    //When the hand is too lose (hsv[0] > 0.59 && hsv[0] < 1.0)
                    //Skin Range on HSV values
                    if (((hsv[0] > huemin && hsv[0] < huemax) || (hsv[0] > 0.59 && hsv[0] < 1.0)) && (hsv[1] > satmin && hsv[1] < satmax) && (hsv[2] > valmin && hsv[2] < valmax)) {

                        skin_filter[count_data_big_array] = r
                        skin_filter[count_data_big_array + 1] = g
                        skin_filter[count_data_big_array + 2] = b
                        skin_filter[count_data_big_array + 3] = a
                    } else {

                        skin_filter.data[count_data_big_array] =
                        skin_filter.data[count_data_big_array + 1] =
                        skin_filter.data[count_data_big_array + 2] = 0
                        skin_filter.data[count_data_big_array + 3] = 0
                    }

                    count_data_big_array = index_value * 4;
                }
            }
            draw = skin_filter
        }

        function rgb2Hsv(r, g, b) {

            r = r / 255
            g = g / 255
            b = b / 255;

            var max = Math.max(r, g, b)
            var min = Math.min(r, g, b);

            var h, s, v = max;

            var d = max - min;

            s = max == 0 ? 0 : d / max;

            if (max == min) {
                h = 0; // achromatic
            } else {

                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [h, s, v];
        }

        last = false; thresh = 150; down = false; wasdown = false;
        function camtest() {
            delt = canvasgetcont.createImageData(width, height)
            if (last !== false) {
                var totalx = 0, totaly = 0, totald = 0, totaln = delt.width * delt.height
                , dscl = 0
                , pix = totaln * 4; while (pix -= 4) {
                    var d = Math.abs(
                            draw.data[pix] - last.data[pix]
                    ) + Math.abs(
                            draw.data[pix + 1] - last.data[pix + 1]
                    ) + Math.abs(
                            draw.data[pix + 2] - last.data[pix + 2]
                    )
                    if (d > thresh) {
                        delt.data[pix] = 160
                        delt.data[pix + 1] = 255
                        delt.data[pix + 2] =
                delt.data[pix + 3] = 255
                        totald += 1
                        totalx += ((pix / 4) % width)
                        totaly += (Math.floor((pix / 4) / delt.height))
                    }
                    else {
                        delt.data[pix] =
                                delt.data[pix + 1] =
                                delt.data[pix + 2] = 0
                        delt.data[pix + 3] = 0
                    }
                }
            }
            //slide.setAttribute('style','display:initial')
            //slide.value=(totalx/totald)/width
            if (totald) {
                down = {
                    x: totalx / totald,
                    y: totaly / totald,
                    d: totald
                }
                handledown()
            }
            //console.log(totald)
            last = draw
            ccgetcont.putImageData(delt, 0, 0)
        }
        movethresh = 2; brightthresh = 300; overthresh = 1000;
        function calibrate() {
            wasdown = {
                x: down.x,
                y: down.y,
                d: down.d
            }
        }
        avg = 0;
        state = 0;//States: 0 waiting for gesture, 1 waiting for next move after gesture, 2 waiting for gesture to end
        function handledown() {
        avg = 0.9 * avg + 0.1 * down.d;
            var davg = down.d - avg, good = davg > brightthresh;
            //console.log(davg)
            switch (state) {
                case 0:
                    if (good) {//Found a gesture, waiting for next move
                        state = 1
                        calibrate()
                    }
                    break
                case 2://Wait for gesture to end
                    if (!good) {//Gesture ended
                        state = 0
                    }
                    break;
                case 1://Got next move, do something based on direction
                    var dx = down.x - wasdown.x, dy = down.y - wasdown.y
                    var dirx = Math.abs(dy) < Math.abs(dx)//(dx,dy) is on a bowtie
                    //console.log(good,davg)
                    if (dx < -movethresh && dirx) {
                        //console.log('right')
                    }
                    else if (dx > movethresh && dirx) {
                        //console.log('left')
                    }
                    if (dy > movethresh && !dirx) {
                        if (davg > overthresh) {
                            // console.log('over up');
							// to enable the fall down effect
							chrome.storage.sync.set({"slideeffect": true});
                            chrome.tabs.query({active: true}, function (tabs) {
                                for (var i = 0; i < tabs.length; i++) {
                                    if (tabs.url.match(/^http/i)){
                                    chrome.tabs.executeScript(tab.id, {file: "js/light.js"});
                                    }
                                }
						    }
					        );
                        }
                        else{
							// console.log('up');
							// to enable the fall down effect
							chrome.storage.sync.set({"slideeffect": true});
							chrome.tabs.query({active: true}, function (tabs) {
                                for (var i = 0; i < tabs.length; i++) {
                                    if (tabs.url.match(/^http/i)){
                                    chrome.tabs.executeScript(tab.id, {file: "js/light.js"});
                                    }
                                }
						    }
					        );
                        }
                    } else if (dy < -movethresh && !dirx) {
                        if (davg > overthresh) {
							//console.log('over down')
							//writeinlog("over down");
                        }
                        else{
							//console.log('down')
							//writeinlog("down");
                        }
                    }
                    state = 2
                    break
            }
        }
}