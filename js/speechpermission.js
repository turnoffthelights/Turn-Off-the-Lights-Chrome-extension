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

function speechstartfunction(){
	// start automatic up
	if(!recognizing){startButton(event);}
}
function startButton(event){
	// Abort previous instances of recognition already running
    if(recognition && recognition.abort){
        recognition.abort();
    }
	final_transcript = '';
	recognition.lang = 'en-US';
	try{ recognition.start(); } catch(e){}
	ignore_onend = false;
	try{ start_timestamp = event.timeStamp; } catch(e){}
}

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;
function startinit(){
// Check for live API permissions  
navigator.permissions.query({name:'microphone'})
.then(function(permissionStatus){
  permissionStatus.onchange = function(){
	if(this.state == "granted"){
		var lol = window.self;
		lol.opener = window.self;
		lol.close();
	}else{
		var lol = window.self;
		lol.opener = window.self;
		lol.close();
	}
  };
});

	if(!('webkitSpeechRecognition' in window)){
	// not supported
	}else{
		recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
	
		recognition.onstart = function(){
			recognizing = true;
			// console.log("speak now");
		};
	
		recognition.onerror = function(event){
		if(event.error == 'no-speech'){
			// No speech was detected.
			ignore_onend = true;
		}
		if(event.error == 'audio-capture'){
			// No microphone was found.
			ignore_onend = true;
		}
		if(event.error == 'not-allowed'){
			if(event.timeStamp - start_timestamp < 100){
				// Permission to use microphone is blocked. 
			}else{
				// Permission to use microphone was denied.
			}
			ignore_onend = true;
		}
		};
	
	}

	speechstartfunction();
}

document.addEventListener('DOMContentLoaded', function(){ startinit(); },false);