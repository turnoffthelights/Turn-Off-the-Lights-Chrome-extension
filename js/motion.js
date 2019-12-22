//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2019 Stefan vd
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

document.addEventListener('DOMContentLoaded', function(){cameramotionlights();},false);
chrome.storage.onChanged.addListener(function(changes, namespace){
    for(key in changes){
         var storageChange = changes[key];
         if(changes['motion']){
             if(changes['motion'].newValue == true){
             //enable this
             cameramotionlights();
             }else{
                 //disable this
                 try{ // stop it
                    if(localMediaStream){ // stop it
                        document.getElementById('motionvideo').pause();
                        document.getElementById('motionvideo').src = "";
                        localMediaStream.getTracks().forEach(track => track.stop());
                        localMediaStream = null;
                        document.getElementById('motionvideo').load();
                        canvas = document.getElementById('motioncanvas');
                        canvasgetcont = canvas.getContext('2d');
                        canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
                        ccanvas = document.getElementById('motioncomp');
                        ccgetcont = ccanvas.getContext('2d');
                        ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
                        window.clearInterval(intervalID);
                    }
                }
                catch(e){}
             }
         }
         if(changes['cammotiononly']){
             if(changes['cammotiononly'].newValue == true){
                 //disable this
                 try{ // stop it
                    if(localMediaStream){ // stop it
                        document.getElementById('motionvideo').pause();
                        document.getElementById('motionvideo').src = "";
                        localMediaStream.getTracks().forEach(track => track.stop());
                        localMediaStream = null;
                        document.getElementById('motionvideo').load();
                        canvas = document.getElementById('motioncanvas');
                        canvasgetcont = canvas.getContext('2d');
                        canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
                        ccanvas = document.getElementById('motioncomp');
                        ccgetcont = ccanvas.getContext('2d');
                        ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
                        window.clearInterval(intervalID);
                    }
                }
                catch(e){}
             }else{
                 //enable this
                 cameramotionlights();
             }
         }
     }
 });

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

function cameramotionlights(){
chrome.storage.sync.get(['motion', 'cammotiononly', 'cammotionDomains'], function(response){
var motion = response['motion'];
var cammotiononly = response['cammotiononly'];

if(motion == true){
chrome.runtime.onSuspend.addListener(function(){location.reload();});
}

var foundtheurlcamera = false;
function onlycammotionfunction(tab){
	var currenturl = tab;
	var thatwebsite = new URL(currenturl);
    var thatpage = thatwebsite.protocol + '//' + thatwebsite.hostname;
	speechDomains  = response['cammotionDomains']; // get latest setting
	if(typeof speechDomains == "string"){
		speechDomains = JSON.parse(speechDomains);
        var sbuf = [];
        var domain;
		for(domain in speechDomains)
			sbuf.push(domain);
            sbuf.sort();
        var i;
        var l = sbuf.length;
		for(i = 0; i < l; i++){
            if(foundtheurlcamera == false){
                if(thatpage == sbuf[i]){cammotionstartfunction();foundtheurlcamera = true;}
            }
        }
		}
		// stop
		if(foundtheurlcamera == false){
			try{ // stop it
				if(localMediaStream){ // stop it
					document.getElementById('motionvideo').pause();
					document.getElementById('motionvideo').src = "";
                    localMediaStream.getTracks().forEach(track => track.stop());
					localMediaStream = null;
					document.getElementById('motionvideo').load();
					canvas = document.getElementById('motioncanvas');
					canvasgetcont = canvas.getContext('2d');
					canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
					ccanvas = document.getElementById('motioncomp');
					ccgetcont = ccanvas.getContext('2d');
					ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
					window.clearInterval(intervalID);
				}
			}
			catch(e){}
		}
		// reset
        foundtheurlcamera = false;
}

if(motion == true){

	if(cammotiononly == true){
		// on page update
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
			if(tab.url){
				if(tab.url.match(/^http/i)||tab.url.match(/^https/i)||tab.url.match(/^file/i)||tab.url==browsernewtab){
					if(tabId != null){
						onlycammotionfunction(tab.url);
					}
				}
			}
        });
    	// on highlight
		chrome.tabs.onHighlighted.addListener(function(o){ tabId = o.tabIds[0];
			chrome.tabs.get(tabId, function(tab){
				if(tab.url){
					if(tab.url.match(/^http/i)||tab.url.match(/^https/i)||tab.url.match(/^file/i)||tab.url==browsernewtab){
					    onlycammotionfunction(tab.url);
					}
				}
			});
		});
	}else{
        cammotionstartfunction();

	}

}else{

	if(localMediaStream){
		document.getElementById('motionvideo').pause();
		document.getElementById('motionvideo').src = "";
        localMediaStream.getTracks().forEach(track => track.stop());
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

function PopupCenter(url, title, w, h){
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if(window.focus){
        newWindow.focus();
    }
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
localMediaStream.getTracks().forEach(track => track.stop());
localMediaStream = null;
document.getElementById('motionvideo').load();
canvas = document.getElementById('motioncanvas');
canvasgetcont = canvas.getContext('2d');
canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
ccanvas = document.getElementById('motioncomp');
ccgetcont = ccanvas.getContext('2d');
ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
}

if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then(function(stream){
        //Display the video stream in the video object
        localMediaStream = stream; // Store the video stream
        video.srcObject = stream;
        video.addEventListener('play', function(){ intervalID = window.setInterval(dump,1000/25); });
     })
     .catch(function(e){
          //console.log(e.name + ": " + e.message);
          if(e.name == "NotAllowedError"){
            var motionpermissionpage = chrome.extension.getURL('motion.html');
            PopupCenter(motionpermissionpage,'stefanpemmotion','685','380');
          }
         });
}

var compression = 5;
width = height = 0;

        function dump(){
            if(localMediaStream){
                if(canvas.width != video.videoWidth){
                    width = Math.floor(video.videoWidth / compression);
                    height = Math.floor(video.videoHeight / compression);
                    canvas.width = ccanvas.width = width;
                    canvas.height = ccanvas.height = height;
                }
                if(width != 0){
                    canvasgetcont.drawImage(video, width, 0, -width, height);
                    draw = canvasgetcont.getImageData(0, 0, width, height);
                    //ccgetcont.putImageData(draw,0,0);
                    skinfilter();
                    camtest();
                }
            }
        }

huemin = 0.0; huemax = 0.10; satmin = 0.0; satmax = 1.0; valmin = 0.4; valmax = 1.0;
        function skinfilter(){

            skin_filter = canvasgetcont.getImageData(0, 0, width, height)
            var total_pixels = skin_filter.width * skin_filter.height
            var index_value = total_pixels * 4

            var count_data_big_array = 0;
            var y;
            for(y = 0; y < height; y++){
                var x;
                for(x = 0; x < width; x++){
                    index_value = x + y * width
                    r = draw.data[count_data_big_array]
                    g = draw.data[count_data_big_array + 1]
                    b = draw.data[count_data_big_array + 2]
                    a = draw.data[count_data_big_array + 3]

                    hsv = rgb2Hsv(r, g, b);
                    //When the hand is too lose (hsv[0] > 0.59 && hsv[0] < 1.0)
                    //Skin Range on HSV values
                    if(((hsv[0] > huemin && hsv[0] < huemax) || (hsv[0] > 0.59 && hsv[0] < 1.0)) && (hsv[1] > satmin && hsv[1] < satmax) && (hsv[2] > valmin && hsv[2] < valmax)){

                        skin_filter[count_data_big_array] = r
                        skin_filter[count_data_big_array + 1] = g
                        skin_filter[count_data_big_array + 2] = b
                        skin_filter[count_data_big_array + 3] = a
                    }else{

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

        function rgb2Hsv(r,g,b){

            r = r / 255
            g = g / 255
            b = b / 255;

            var max = Math.max(r, g, b)
            var min = Math.min(r, g, b);

            var h, s, v = max;

            var d = max - min;

            s = max == 0 ? 0 : d / max;

            if(max == min){
                h = 0; // achromatic
            }else{

                switch(max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [h, s, v];
        }

        last = false; thresh = 150; down = false; wasdown = false;
        function camtest(){
            delt = canvasgetcont.createImageData(width, height)
            if(last !== false){
                var totalx = 0, totaly = 0, totald = 0, totaln = delt.width * delt.height
                , dscl = 0
                , pix = totaln * 4; while (pix -= 4){
                    var d = Math.abs(
                            draw.data[pix] - last.data[pix]
                    ) + Math.abs(
                            draw.data[pix + 1] - last.data[pix + 1]
                    ) + Math.abs(
                            draw.data[pix + 2] - last.data[pix + 2]
                    )
                    if(d > thresh){
                        delt.data[pix] = 160
                        delt.data[pix + 1] = 255
                        delt.data[pix + 2] =
                delt.data[pix + 3] = 255
                        totald += 1
                        totalx += ((pix / 4) % width)
                        totaly += (Math.floor((pix / 4) / delt.height))
                    }
                    else{
                        delt.data[pix] =
                                delt.data[pix + 1] =
                                delt.data[pix + 2] = 0
                        delt.data[pix + 3] = 0
                    }
                }
            }
            //slide.setAttribute('style','display:initial')
            //slide.value=(totalx/totald)/width
            if(totald){
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
        function calibrate(){
            wasdown = {
                x: down.x,
                y: down.y,
                d: down.d
            }
        }
        avg = 0;
        state = 0;//States: 0 waiting for gesture, 1 waiting for next move after gesture, 2 waiting for gesture to end
        function handledown(){
        avg = 0.9 * avg + 0.1 * down.d;
            var davg = down.d - avg, good = davg > brightthresh;
            //console.log(davg)
            switch (state){
                case 0:
                    if(good){//Found a gesture, waiting for next move
                        state = 1
                        calibrate()
                    }
                    break
                case 2://Wait for gesture to end
                    if(!good){//Gesture ended
                        state = 0
                    }
                    break;
                case 1://Got next move, do something based on direction
                    var dx = down.x - wasdown.x, dy = down.y - wasdown.y
                    var dirx = Math.abs(dy) < Math.abs(dx)//(dx,dy) is on a bowtie
                    //console.log(good,davg)
                    if(dx < -movethresh && dirx){
                        //console.log('right')
                    }
                    else if(dx > movethresh && dirx){
                        //console.log('left')
                    }
                    if(dy > movethresh && !dirx){
                        if(davg > overthresh){
                            // console.log('over up');
							// to enable the fall down effect
							chrome.storage.sync.set({"slideeffect": true});
                            chrome.tabs.query({active: true}, function(tabs){
                                var i;
                                var l = tabs.length;
                                for(i = 0; i < l; i++){
                                    var protocol = tabs[i].url.split(":")[0];
                                    if(protocol == "http" || protocol == "https"){
                                    chrome.tabs.executeScript(tabs[i].id,{file: "js/light.js"});
                                    }
                                }
                            });
                        }
                        else{
							// console.log('up');
							// to enable the fall down effect
							chrome.storage.sync.set({"slideeffect": true});
                            chrome.tabs.query({active: true}, function(tabs){
                                var i;
                                var l = tabs.length;
                                for(i = 0; i < l; i++){
                                    var protocol = tabs[i].url.split(":")[0];
                                    if(protocol == "http" || protocol == "https"){
                                    chrome.tabs.executeScript(tabs[i].id,{file: "js/light.js"});
                                    }
                                }
                            });
                        }
                    }else if(dy < -movethresh && !dirx){
                        if(davg > overthresh){
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