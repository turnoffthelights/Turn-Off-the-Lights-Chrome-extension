//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2020 Stefan vd
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

chrome.storage.sync.get(['autostop','autostoponly','autostopDomains','autostopchecklistwhite','autostopchecklistblack','autostopred','autostoptrans'], function(response){
var autostop = response['autostop'];
var autostoponly = response['autostoponly'];
var autostopDomains = response['autostopDomains'];
var autostopchecklistwhite = response['autostopchecklistwhite'];
var autostopchecklistblack = response['autostopchecklistblack'];
var autostopred = response['autostopred'];
var autostoptrans = response['autostoptrans'];
if(autostop == true){
document.addEventListener("DOMContentLoaded", function(event){
if(autostoponly == true){
var currenturl = window.location.protocol + '//' + window.location.host;
var stoprabbit = false;
if(typeof autostopDomains == "string"){
	autostopDomains = JSON.parse(autostopDomains);
	var atbuf = [];
	var domain;
	for(domain in autostopDomains)
		atbuf.push(domain);
		atbuf.sort();
		var i;
		var l = atbuf.length;
		for(i = 0; i < l; i++){
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
}else{autostopfunction();}
}, false);

function getPosition(el){
var xPos = 0;var yPos = 0;
while (el){xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);yPos += (el.offsetTop - el.scrollTop + el.clientTop);el = el.offsetParent;}
return{x:xPos,y:yPos};
}

function autostopfunction(){
	// A regular on first run
	autostopdetectionstart();
	// B New Mutation Summary API Reference
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	if(MutationObserver){
	// setup MutationSummary observer
	var videolist = document.body;
	var observer = new MutationObserver(function(mutations, observer){
		mutations.forEach(function(mutation){
			if(mutation.target.tagName == "VIDEO"){
				if(mutation.attributeName === "src" && mutation.target.currentSrc != ""){
					autostopdetectionstart();
				}
			}
			// dynamic add and remove video
			if(mutation.type == 'childList'){
				var i;
				var la = mutation.addedNodes.length;
				for(i = 0; i < la; i++){
					if(mutation.addedNodes[i].tagName == "VIDEO"){
						autostopdetectionstart();
					}
				}
				var j;
				var lr = mutation.removedNodes.length;
				for(j = 0; j < lr; j++){
					if(mutation.removedNodes[j].tagName == "VIDEO"){
						autostopdetectionstart();
					}
				}
			}
			// inside it
			var i;
			var l = mutation.addedNodes.length;
			for(i = 0; i < l; i++){
				if(mutation.addedNodes[i]){
					var j;
					var lac = mutation.addedNodes[i].childNodes.length;
					for(j = 0; j < lac; j++){
						var detail = mutation.addedNodes[i].childNodes[j];
						if(detail.nodeName == "VIDEO"){
							autostopdetectionstart();
						}
					}
				}
			}
			// detect change style - this for floating box in div detection
			if(mutation.attributeName == 'style'){
				var currentClass = mutation.target.className;
				if(currentClass!="stefanvdautostop"){
					refreshsize();
				}
			}
		});
	});

	observer.observe(videolist,{
		subtree: true,       // observe the subtree rooted at ...videolist...
		childList: true,     // include childNode insertion/removals
		characterData: false, // include textContent changes
		attributes: true     // include changes to attributes within the subtree
	});
	
	}
}

function autostopdetectionstart(){
	// first remove the excisting autostop panels
	var firstautostopremove = document.getElementsByClassName("stefanvdautostop");
	while(firstautostopremove.length > 0){
		firstautostopremove[0].parentNode.removeChild(firstautostopremove[0]);
	}
	
	var visualvideos = document.getElementsByTagName("video");
	var i;
	var l = visualvideos.length;
	for(i = 0; i < l; i++){
		video = visualvideos[i];
		video.setAttribute("data-videonum",i);
		video.setAttribute("data-stopvideo","true");

		if(video.paused == false){
			var playPromise = video.play();
			if(playPromise !== undefined){
			playPromise.then(_ => {
				// Automatic playback started!
				// Show playing UI.
				// We can now safely pause video...
				video.pause();video.currentTime = 0;
			})
			.catch(error => {
				// Auto-play was prevented
				// Show paused UI.
			});
			}
		}

		var reqId;
		var stopTracking = function(){
			if(video.getAttribute("data-stopvideo") == "true"){
				if(reqId){
				cancelAnimationFrame(reqId);
				}
			}
		};
		video.addEventListener('playing', function(ev){
			reqId = requestAnimationFrame(function play(){
				if(ev.target.getAttribute("data-stopvideo")){
				}else{
					ev.target.setAttribute("data-stopvideo","true");
				}
				if(ev.target.getAttribute("data-stopvideo")){
					if(ev.target.getAttribute("data-stopvideo") == "true"){
						if(!ev.target.paused){
							var playPromise = ev.target.play();
							if(playPromise !== undefined){
							playPromise.then(_ => {
								// Automatic playback started!
								// Show playing UI.
								// We can now safely pause video...
								ev.target.pause();ev.target.currentTime = 0;
								stopTracking();
							})
							.catch(error => {
								// Auto-play was prevented
								// Show paused UI.
							});
							}							
						}
						rock = ev.target.getAttribute("data-videonum");
						if(document.getElementById('stefanvdautostoppanel'+rock)){
							document.getElementById('stefanvdautostoppanel'+rock).style.display = "block";
							refreshsize();
						}
						//console.log(Math.round(video.currentTime * 1000));
						reqId = requestAnimationFrame(play);
					}
				}
			});
		},false);
		video.addEventListener('pause', stopTracking);

		// design panel
		var myElement = document.getElementsByTagName("video")[i];
		if(myElement.currentStyle){
			var d = myElement.currentStyle["display"];
			var w = myElement.currentStyle["width"];
			var h = myElement.currentStyle["height"];
			var t = myElement.currentStyle["top"];
		}
		else if(window.getComputedStyle){
			var st = document.defaultView.getComputedStyle(myElement, null);
			var d = st.getPropertyValue("display");
			var w = st.getPropertyValue("width");
			var h = st.getPropertyValue("height");
			var t = st.getPropertyValue("top");
		}

		var visposition = getPosition(myElement);

		var newautostoppanel = document.createElement("div");
		newautostoppanel.setAttribute("id","stefanvdautostoppanel"+i);
		newautostoppanel.setAttribute("data-videonum",i);

		newautostoppanel.className = "stefanvdautostop";
		if(autostopred == true){
			newautostoppanel.setAttribute("style","background:rgba(165,8,0,0.88)!important");
		}

		// if previous path is none, then hide it too
		var path = [];
		do{
			var qq = path.unshift(myElement.nodeName);

			if(myElement.currentStyle){
				var adisplay = qq.currentStyle["display"];
			}else{
				var st = document.defaultView.getComputedStyle(myElement, null);
				var adisplay = st.getPropertyValue("display");
			}
			if(adisplay == "none"){
				newautostoppanel.style.display = "none";
			}
		}while((myElement.nodeName.toLowerCase() != 'html') && (myElement = myElement.parentNode))
		//---
		
		// YouTube video top position negative value, then minus the height
		if(parseInt(t, 10) < 0){
			newautostoppanel.style.top = visposition.y-h+"px";
		}else{
			newautostoppanel.style.top = visposition.y+"px";
		}
		newautostoppanel.style.left = visposition.x+"px";
		newautostoppanel.style.width = w;
		newautostoppanel.style.height = h;
		if(d == "none"){newautostoppanel.style.display = "none";}

		newautostoppanel.addEventListener("click", function(event){
			var templearn = event.target.id;
			templearn = templearn.substr(0, 26);
			if(templearn != "stefanvdautostoppanellearn"){
			rock = this.getAttribute("data-videonum");
			document.getElementById('stefanvdautostoppanel'+rock).style.display = "none";
			document.getElementsByTagName("video")[rock].setAttribute("data-stopvideo","false");
			var playPromise = document.getElementsByTagName("video")[rock].play();
			if(playPromise !== undefined) {
			  playPromise.then(_ => {
				// Automatic playback started!
			  })
			  .catch(error => {
				// Auto-play was prevented
			  });
			}
			}
		},false);
		newautostoppanel.addEventListener('contextmenu', event => event.preventDefault());
		document.body.appendChild(newautostoppanel);

		if(autostopred == true){
		var newautostoptitel = document.createElement("div");
		newautostoptitel.className = "stefanvdautostoptitel";
		newautostoptitel.innerText = chrome.i18n.getMessage("autostopenabled");
		newautostoppanel.appendChild(newautostoptitel);

		var newautostopdes = document.createElement("div");
		newautostopdes.className = "stefanvdautostopdes";
		newautostopdes.innerText = chrome.i18n.getMessage("autostopclickme");
		newautostoppanel.appendChild(newautostopdes);

		var newautostoplearn = document.createElement("div");
		newautostoplearn.setAttribute("id","stefanvdautostoppanellearn"+i);
		newautostoplearn.className = "stefanvdautostoplearn";
		newautostoplearn.addEventListener("click", function(event){
			window.open("https://www.turnoffthelights.com/support/browser-extension/what-is-the-autostop-feature/", "_blank");
		},false);
		newautostoplearn.innerText = chrome.i18n.getMessage("autostopdetails");
		newautostoppanel.appendChild(newautostoplearn);

		var newautostopfoot = document.createElement("div");
		newautostopfoot.className = "stefanvdautostopfoot";
		newautostopfoot.innerText = chrome.i18n.getMessage("autostopblocked");
		newautostoppanel.appendChild(newautostopfoot);
		}
	}
}

function refreshsize(){
var cusid_ele = document.getElementsByClassName('stefanvdautostop');
var i;
var l = cusid_ele.length;
for(i = 0; i < l; ++i){
	var item = cusid_ele[i];  
	myElement = document.getElementsByTagName("video")[i];
	if(myElement){
		if(myElement.currentStyle){
			var d = myElement.currentStyle["display"];
			var w = myElement.currentStyle["width"];
			var h = myElement.currentStyle["height"];
			var t = myElement.currentStyle["top"];
		}
		else if(window.getComputedStyle){
			var st = document.defaultView.getComputedStyle(myElement, null);
			var d = st.getPropertyValue("display");
			var w = st.getPropertyValue("width");
			var h = st.getPropertyValue("height");
			var t = st.getPropertyValue("top");
		}

		visposition = getPosition(myElement);

		// if previous path is none, then hide it too
		var path = [];
		do{
			var qq = path.unshift(myElement.nodeName);

			if(myElement.currentStyle){
				var adisplay = qq.currentStyle["display"];
			}else{
				var st = document.defaultView.getComputedStyle(myElement, null);
				var adisplay = st.getPropertyValue("display");
			}
			if(adisplay == "none"){
				item.style.display = "none";
			}
		}while((myElement.nodeName.toLowerCase() != 'html') && (myElement = myElement.parentNode))
		//---

		// YouTube video top position negative value, then minus the height
		if(parseInt(t, 10) < 0){
			item.style.top = visposition.y-h+"px";
		}else{
			item.style.top = visposition.y+"px";
		}
		item.style.left = visposition.x+"px";
		item.style.width = w;
		item.style.height = h;
	
		if(d == "none"){item.style.display = "none";}
	}else{
		// remove this stop layer
		if(item){
			item.parentNode.removeChild(item);
		}
	}
}
}
window.addEventListener('resize', function(){refreshsize()},false);
window.addEventListener('scroll', function(){refreshsize()},false);

} // option autostop on end
});