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

chrome.storage.sync.get(['autostop','autostoponly','autostopDomains','autostopchecklistwhite','autostopchecklistblack'], function(response){
var autostop = response['autostop'];
var autostoponly = response['autostoponly'];
var autostopDomains = response['autostopDomains'];
var autostopchecklistwhite = response['autostopchecklistwhite'];
var autostopchecklistblack = response['autostopchecklistblack'];
if(autostop == true){
window.addEventListener("load", function(){
if(autostoponly == true){
var currenturl = window.location.protocol + '//' + window.location.host;
var stoprabbit = false;
if(typeof autostopDomains == "string") {
	autostopDomains = JSON.parse(autostopDomains);
	var atbuf = [];
	for(var domain in autostopDomains)
		atbuf.push(domain);
        atbuf.sort();
		for(var i = 0; i < atbuf.length; i++){
			if(autostopchecklistwhite == true){
				if(currenturl == atbuf[i]){autostopfunction();}
			}
			else if(autostopchecklistblack == true){
				if(currenturl == atbuf[i]){stoprabbit=true;}
			}
		}
    }
	if(autostopchecklistblack == true){
		if(stoprabbit == false){autostopfunction();}
	}
} else {autostopfunction();}
}, false);

var forceautostop;
var forcecount = 0;
function autostopvideo(video){
	var ytps = document.querySelector('.ytp-play-button');
    if(ytps){
	// YouTube
		if (ytps.getAttribute("aria-label") == "Pause") {
		ytps.click();
		video.currentTime = 0;
		}
	}else{
	// regular HTML5 video
    forceautostop = window.setInterval(function(){
	forcecount +=1;
    video.pause();
	video.currentTime = 0;
	video.autostart = false;
	video.autoplay = false;
	video.preload = "none";
	video.oncanplay = null;
	video.onplay = null;
	if(forcecount >= 25){window.clearInterval(forceautostop);forceautostop=0;forcecount=0;}
    }, 100);
	video.setAttribute("data-stopvideo",true);
	}
}

function autostopfunction(){
 		// New Mutation Summary API Reference
 		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
 		if(MutationObserver) {
 		// setup MutationSummary observer
 		var videolist = document.querySelector('body');
 		var observer = new MutationObserver(function (mutations, observer) {
 		    mutations.forEach(function (mutation) {
 		        if(mutation.target.tagName == "VIDEO") {
 		            if (mutation.attributeName === "src" && mutation.target.src != "") {
 						autostopvideo(mutation.target);
                        mutation.target.addEventListener('timeupdate', function() {
                            if(this.getAttribute("data-stopvideo") == "true"){
                                if(!this.paused){this.pause();this.currentTime = 0;}
                            }
                        },false);
                        mutation.target.addEventListener('play', function() {
                            if(this.getAttribute("data-stopvideo") == "true"){
                                if(!this.paused){this.pause();this.currentTime = 0;}
                            }
                        },false);
                        mutation.target.addEventListener('mouseover', function() {
							// unlocked - regular video player
                            this.setAttribute("data-stopvideo","false");
                        }, false);
 		            }
 		        }
 		        if(typeof mutation.addedNodes == "VIDEO" || typeof mutation.removedNodes == "VIDEO") {
					autostopvideo(mutation.target);
 		        }
 		    });
        });
 
 		observer.observe(videolist, {
			subtree: true,       // observe the subtree rooted at ...videolist...
			childList: true,     // include childNode insertion/removals
			characterData: false, // include textContent changes
			attributes: true     // include changes to attributes within the subtree
        });
 	}

    var ytps = document.querySelector('.ytp-play-button');
    if(ytps) {
        if (ytps.getAttribute("aria-label") == "Pause") {
            ytps.click();
			var myVideo = document.getElementsByTagName('video')[0];
			if(myVideo){
				autostopvideo(myVideo);
			}
		}
    }
	else {
		// regular HTML5 video
		// and inside iframe elements
        var videos = document.querySelectorAll('video');
        for (var i=0; i<videos.length; i++) {
            video = videos[i];
			autostopvideo(video);
			video.oncanplay = function() { autostopvideo(video); };
            video.onplay = function() { autostopvideo(video); };
            video.addEventListener('timeupdate', function() {
                if(this.getAttribute("data-stopvideo") == "true"){
                   if(!this.paused){this.pause();this.currentTime = 0;}
                 }
            }, false);
			video.addEventListener('play', function() {
                if(this.getAttribute("data-stopvideo") == "true"){
                	if(!this.paused){this.pause();this.currentTime = 0;}
                }
            },false);
			video.addEventListener('mouseover', function() {
				// unlocked - regular video player
				this.setAttribute("data-stopvideo","false");
            }, false);
        }
    }
}

} // option autostop on end
});