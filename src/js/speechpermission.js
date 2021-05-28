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

var recognizing = false;
var ignore_onend;
var recognition;

function speechstartfunction(){
	// start automatic up
	if(!recognizing){ startButton(); }
}
function startButton(){
	// Abort previous instances of recognition already running
	if(recognition && recognition.abort){ recognition.abort(); }
	recognition.lang = "en-US";
	try{ recognition.start(); }catch(e){ console.error(e); }
	ignore_onend = false;
}

function startinit(){
// Check for live API permissions
	navigator.permissions.query({name:"microphone"})
		.then(function(permissionStatus){
			permissionStatus.onchange = function(){
				if(this.state == "granted"){
					var micaccess = window.self; micaccess.opener = window.self; micaccess.close();
				}else{
					var micdenied = window.self; micdenied.opener = window.self; micdenied.close();
				}
			};
		});

	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	if(typeof SpeechRecognition === "undefined"){
	// not supported
	}else{
		recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.onstart = function(){
			recognizing = true;
			// console.log("speak now");
		};
		recognition.onerror = function(event){
			if(event.error == "no-speech" || event.error == "audio-capture" || event.error == "not-allowed"){ ignore_onend = true; }
			if(ignore_onend == true){ console.log("ignore onend"); }
		};
	}
	speechstartfunction();
}

document.addEventListener("DOMContentLoaded", function(){ startinit(); }, false);