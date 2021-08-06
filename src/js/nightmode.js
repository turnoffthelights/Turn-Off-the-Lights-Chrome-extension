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

function $(id){ return document.getElementById(id); }
function occurrences(string, subString, allowOverlapping){
	string += "";
	subString += "";
	if(subString.length <= 0)return(string.length + 1);

	var n = 0,
		pos = 0,
		step = allowOverlapping ? 1 : subString.length;

	var tempwhile = true;
	while(tempwhile){
		pos = string.indexOf(subString, pos);
		if(pos >= 0){
			++n;
			pos += step;
		}else break;
	}
	return n;
}
var switchelements;
var startshow = false;
var counter = 0;
function convertwebnight(node){
	var getthatid = node.id;
	if(getthatid && getthatid.length >= 18){
		getthatid = getthatid.substring(0, 18);
	}else{ getthatid = ""; }

	if(getthatid == "stefanvdnighttheme"){
		if($("stefanvdnighttheme")){
			startshow = true;
		}
	}else{

		if(startshow == true){
			if(counter <= switchelements){
				// do nothing
			}
			counter += +1;

			if(counter == switchelements){
				counter = 0;
				startshow = false;
			}
		}else{
			switch(node.tagName){
			case"IMG":
			case"STYLE":
			case"SCRIPT":
			case"HEAD":
			case"META":
			case"LINK":
			case"TITLE":
			case"IFRAME":
			case"svg":
			case"path":
			case"PICTURE":
			case"SOURCE":
			case"VIDEO":
			case"AUDIO":
			case"FIGURE":
			case"CANVAS":
			case"MAP":
			case"TRACK":
			case"AREA":
			case"NOSCRIPT":
			case"BASE":
			case"BR":
				// do nothing
				break;
			default:
				var st;
				var y;
				var z;
				var x;
				var w;
				// if night class is already added, skip this node
				// Else create it
				if(node.classList.contains("stefanvdnightbck") == false){
					var thatbckishere = false;
					if(node.currentStyle){
						y = node.currentStyle["background-color"];
						z = node.currentStyle["background-image"];
						x = node.currentStyle["border-color"];
						w = node.currentStyle["box-shadow"];
					}else if(window.getComputedStyle){
						st = document.defaultView.getComputedStyle(node, null);
						y = st.getPropertyValue("background-color");
						z = st.getPropertyValue("background-image");
						x = st.getPropertyValue("border-color");
						w = st.getPropertyValue("box-shadow");
					}

					if(y == "rgba(0, 0, 0, 0)" || y.includes("rgba(0, 0, 0, 0")){
						thatbckishere = false;
						if(z == "none"){
							var alpha = y.replace(/^.*,(.+)\)/, "$1");
							if(alpha > .1){
								// alpha value higher than 10%
								thatbckishere = true;
							}
						}else if(z.indexOf("linear-gradient") || z.indexOf("radial-gradient")){
							// check if use more than 2X gradient white
							var bla = occurrences(z, "rgb(255, 255, 255)");
							if(bla >= 1){ // check if includes it 1 item or more
								thatbckishere = true;
							}
						}else{
							// div with background image url inside
							// thatbckishere = true;
						}
					}else{
						thatbckishere = true;
					}

					// background color is transparent, then add only the text color
					if(node.tagName == "BUTTON" || (node.tagName == "INPUT" && node.type == "submit")){
						if(thatbckishere == true){
							// if no background then do nothing
							node.classList.add("stefanvdnightbutton");
						}else{
							// if no background then do nothing
							node.classList.add("stefanvdnight");
						}
					}else{
						if(thatbckishere == true){
							node.classList.add("stefanvdnightbck", "stefanvdnight");
						}else{
							node.classList.add("stefanvdnight");
						}
					}
					// <a> with background change it to night button color
					if(node.tagName == "A"){
						if(y != "rgba(0, 0, 0, 0)"){
							node.classList.add("stefanvdnightbutton");
						}
					}

					// change border color
					if(x !== null){
						node.classList.add("stefanvdnightborder");
					}

					// box shadow that look also as a single border line
					var partw = w.includes("0px 0px 0px 1px");
					if(partw){
						node.classList.add("stefanvdnightboxshadow");
					}

				}
			}
		}

	}
}

const afterBodyReady = () => {
	var nightenabletheme = null, nightmodebck = null; chrome.storage.sync.get(["nightenabletheme", "nightmodebck"], function(response){
		nightenabletheme = response["nightenabletheme"]; nightmodebck = response["nightmodebck"];
		if(nightenabletheme == true){
			var head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
			var b = ".stefanvdnightbck{background:" + nightmodebck + "!important;background-color:" + nightmodebck + "!important;}";
			style.type = "text/css";
			style.setAttribute("id", "totlnightmodestyle");
			style.appendChild(document.createTextNode(b));
			head.appendChild(style);

			document.getElementsByTagName("html")[0].classList.add("stefanvdnightbck", "stefanvdnight");
			document.getElementsByTagName("body")[0].classList.add("stefanvdnightbck", "stefanvdnight");

			// search all elements and add night class
			var n = document.body.getElementsByTagName("*");
			var i;
			var l = n.length;
			for(i = 0; i < l; i++){
				convertwebnight(n[i]);
			}
		}
	});
};

if(document.body){
	afterBodyReady();
}else{
	const bodyObserver = new MutationObserver((recordList, observer) => {
		// Wait for 'document.body' get the definition
		if(!document.body)return;

		afterBodyReady();
		observer.disconnect();
	});
	bodyObserver.observe(document.documentElement, {childList: true});
}