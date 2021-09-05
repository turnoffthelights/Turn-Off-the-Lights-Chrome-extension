//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2021 Stefan vd
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

var mousespotlights = null, screenshader = null, lightcolor = null, interval = null;

function setAttributes(el, attrs){
	for(var key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}
// settings - screen shader
const afterBodyReadyShader = () => {
	chrome.storage.sync.get(["mousespotlights", "screenshader", "lightcolor", "interval"], function(response){
		mousespotlights = response["mousespotlights"];
		screenshader = response["screenshader"];
		lightcolor = response["lightcolor"]; if(lightcolor)lightcolor = response["lightcolor"]; else lightcolor = "#000000"; // default color black
		interval = response["interval"]; if(interval == null)interval = 80; // default interval 80%
		if(mousespotlights == true){
			if(screenshader == true){
				if(document.documentElement){
					var newscreenshader = document.createElement("div");
					setAttributes(newscreenshader, {"id": "stefanvdscreenshader", "class": "stefanvdscreenshader"});
					newscreenshader.style.background = lightcolor;
					newscreenshader.style.mixBlendMode = "multiply";
					newscreenshader.style.opacity = interval / 100;
					document.documentElement.insertBefore(newscreenshader, document.documentElement.firstChild);
					chrome.storage.sync.set({"screenshader": true});
				}
			}
		}
	});
}; // afterbody

if(document.body){
	afterBodyReadyShader();
}else{
	const bodyObserver = new MutationObserver((recordList, observer) => {
		// Wait for 'document.body' get the definition
		if(!document.body)return;

		afterBodyReadyShader();
		observer.disconnect();
	});
	bodyObserver.observe(document.documentElement, {childList: true});
}