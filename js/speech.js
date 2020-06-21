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

document.addEventListener('DOMContentLoaded', function(){ speechrecognition(); },false);
chrome.storage.onChanged.addListener(function(changes, namespace){
   for(key in changes){
        var storageChange = changes[key];
        if(changes['speech']){
			if(changes['speech'].newValue == true){
			//enable this
			speechrecognition();
			}else{
				//disable this
				try{
					if(recognizing){recognition.stop();recognizing = false;}
				}
				catch(e){}
			}
		}
		if(changes['speechonly']){
			if(changes['speechonly'].newValue == true){
				//disable this
				try{
					if(recognizing){recognition.stop();recognizing = false;}
				}
				catch(e){}
			}else{
				//enable this
				speechrecognition();
			}
		}
	}
});

var speechDomains = null;

// Simple function that checks existence of s in str
var userSaid = function(str, s){return str.indexOf(s) > -1;}

function removespeechinfo(){
// you are speaking now -- remove the bubble
chrome.runtime.sendMessage({'name' : 'slidersave', 'value' : true});
chrome.tabs.query({active: true}, function(tabs){
	var i;
	var l = tabs.length;
	for(i = 0; i < l; i++){
		if(tabs[i].url.match(/^http/i)){
			chrome.tabs.executeScript(tabs[i].id,{file: "js/speechbubbleremove.js"});
        }
	}
});
}

function addspeechinfo(){
// you are speaking now -- add the bubble
chrome.runtime.sendMessage({'name' : 'slidersave', 'value' : true});						
chrome.tabs.query({active: true}, function(tabs){
	var i;
	var l = tabs.length;
	for(i = 0; i < l; i++){
		if(tabs[i].url.match(/^http/i)){
			chrome.tabs.executeScript(tabs[i].id,{file: "js/speechbubbleadd.js"});
        }
	}
});
}

function actiondone(){
	document.getElementById('myAudio').src="images/chime-end.wav";
	var playPromise = document.getElementById('myAudio').play();
	if(playPromise !== undefined){
	  playPromise.then(_ =>{
		// Automatic playback started!
		// Show playing UI.
	  })
	  .catch(error =>{
		// Auto-play was prevented
		// Show paused UI.
	  });
	}
	heybrowser = false;
	removespeechinfo();
}

function startButton(event){
	// Abort previous instances of recognition already running
    if(recognition && recognition.abort){
        recognition.abort();
    }
	final_transcript = '';
	chrome.storage.sync.get(['speechcountry'], function(response){
		var speechcountry = response['speechcountry'];if(speechcountry == null)speechcountry = 'en-US';
		recognition.lang = speechcountry;
	});
	try{ recognition.start(); } catch(e){}
	ignore_onend = false;
	try{ start_timestamp = event.timeStamp; } catch(e){}
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

// Check for live API permissions
try{
navigator.permissions.query({name:'microphone'})
.then(function(permissionStatus){
  permissionStatus.onchange = function(){
	if(this.state == "granted"){
		speechrecognition();
	}
  };
});
}catch(e){}

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition;
function speechrecognition(){
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
				var speechpermissionpage = chrome.extension.getURL('speech.html');
				PopupCenter(speechpermissionpage,'stefanpemspeech','685','380');
				// Permission to use microphone was denied.
			}
			ignore_onend = true;
		}
		};
	
		recognition.onend = function(){
			removespeechinfo();
			recognizing = false;
			// think you are ending, start it back up
				//startButton();
				// location.reload();
				//recognition.start(); // bug alsways refresh -> to crash possible
			if(ignore_onend){
			return;
			}
			if(!final_transcript){
			// console.log("Click on the microphone icon and begin speaking.");
			return;
			}
		};
	
	var heybrowser = false;
	var exitmode;
	var i18nlspeechheybrowser = chrome.i18n.getMessage("speechheybrowser"); // Hey browser
	i18nlspeechheybrowser = i18nlspeechheybrowser.toLowerCase();
	var i18nlspeechokbrowser = chrome.i18n.getMessage("speechokbrowser"); // OK browser
	i18nlspeechokbrowser = i18nlspeechokbrowser.toLowerCase();
	var i18nldesspeech1command = chrome.i18n.getMessage("desspeech1command"); // turn off the lights
	i18nldesspeech1command = i18nldesspeech1command.toLowerCase();
	var i18nldesspeech2command = chrome.i18n.getMessage("desspeech2command"); // turn on the lights
	i18nldesspeech2command = i18nldesspeech2command.toLowerCase();
	var i18nldesspeech3command = chrome.i18n.getMessage("desspeech3command"); // play video
	i18nldesspeech3command = i18nldesspeech3command.toLowerCase();
	var i18nldesspeech4command = chrome.i18n.getMessage("desspeech4command"); // pause video
	i18nldesspeech4command = i18nldesspeech4command.toLowerCase();
	var i18nldesspeech5command = chrome.i18n.getMessage("desspeech5command"); // browser lamp
	i18nldesspeech5command = i18nldesspeech5command.toLowerCase();
	
		recognition.onresult = function(event){
		var interim_transcript = '';
		var i;
		var l = event.results.length;
		for(i = event.resultIndex; i < l; ++i){
			if(event.results[i].isFinal){
				final_transcript = event.results[i][0].transcript;
				//console.log("I said: "+final_transcript + " heybrowser= "+heybrowser);
				if(userSaid(final_transcript, i18nlspeechheybrowser)||userSaid(final_transcript, i18nlspeechokbrowser)){
					// play sound thing
					document.getElementById('myAudio').src="images/chime-start.wav";
					var playPromise = document.getElementById('myAudio').play();
					if(playPromise !== undefined){
					  playPromise.then(_ =>{
						// Automatic playback started!
						// Show playing UI.
					  })
					  .catch(error =>{
						// Auto-play was prevented
						// Show paused UI.
					  });
					}
	
					heybrowser = true;
					addspeechinfo();
					window.clearTimeout(exitmode);
				}
				if(heybrowser == true){
					addspeechinfo();
					actions(final_transcript);
				}
	
				exitmode = window.setTimeout(function(){ heybrowser = false;removespeechinfo(); }, 15000);
			}else{
				interim_transcript += event.results[i][0].transcript;
			}
		}
		};
	}
	
	function actions(final_transcript){
		chrome.storage.sync.set({"speechhistorysave": final_transcript});
		if(userSaid(final_transcript, i18nldesspeech1command)){
		// console.log("yes: turn off the lights");
		chrome.storage.sync.set({"slideeffect": true});
		chrome.tabs.query({active: true}, function(tabs){
			var i;
			var l = tabs.length;
			for(i = 0; i < l; i++){
				if(tabs[i].url.match(/^http/i)){
					chrome.tabs.executeScript(tabs[i].id,{file: "js/light.js"});
					actiondone();
				}
			}
		});
		}
		else if(userSaid(final_transcript, i18nldesspeech2command)){
		// console.log("yes: turn on the lights");
		chrome.storage.sync.set({"slideeffect": true});
		chrome.tabs.query({active: true}, function(tabs){
			var i;
			var l = tabs.length;
			for(i = 0; i < l; i++){
				if(tabs[i].url.match(/^http/i)){
					chrome.tabs.executeScript(tabs[i].id,{file: "js/light.js"});
					actiondone();
				}
			}
		});
		}
		// Play the video
		else if(userSaid(final_transcript, i18nldesspeech3command)){
		chrome.tabs.query({active: true}, function(tabs){
			var i;
			var l = tabs.length;
			for(i = 0; i < l; i++){
				if(tabs[i].url.match(/^http/i)){
					chrome.tabs.executeScript(tabs[i].id,{file: "js/videoplay.js"});
					actiondone();
				}
			}
		});
		}
		// Stop the video
		else if(userSaid(final_transcript, i18nldesspeech4command)){
		chrome.tabs.query({active: true}, function(tabs){
			var i;
			var l = tabs.length;
			for(i = 0; i < l; i++){
				if(tabs[i].url.match(/^http/i)){
					chrome.tabs.executeScript(tabs[i].id,{file: "js/videopause.js"});
					actiondone();
				}
			}
		});
		}
	}

chrome.storage.sync.get(['speech', 'speechonly', 'speechDomains'], function(response){
speech = response['speech'];
speechonly  = response['speechonly'];

//if(speech == true){
//chrome.runtime.onSuspend.addListener(function(){ location.reload(); });
//}

function speechstartfunction(){
// start automatic up
if(!recognizing){startButton(event);}
}

function extractHostname(url){
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if(url.indexOf("://") > -1){
        hostname = url.split('/')[2];
    }
    else{
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

var foundtheurlspeech = false;
function onlyspeechfunction(tab){
	var currenturl = tab;
	var thatwebsite = new URL(currenturl);
	var thatpage = thatwebsite.protocol + '//' + thatwebsite.hostname;
	speechDomains  = response['speechDomains']; // get latest setting
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
				if(foundtheurlspeech == false){
					if(thatpage == sbuf[i]){speechstartfunction();foundtheurlspeech = true;}
				}
			}
		}
		// stop
		if(foundtheurlspeech == false){
			try{ // stop it
				if(recognizing){recognition.stop();recognizing = false;}
			}
			catch(e){}
		}
		// reset
		foundtheurlspeech = false;
}

if(speech == true){

	if(speechonly == true){
		// on page update
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
			if(tab.url){
				if((tab.url.match(/^http/i)||tab.url.match(/^https/i)||tab.url.match(/^file/i)||tab.url==browsernewtab)){
					if(tabId != null){
						onlyspeechfunction(tab.url);
					}
				}
			}
		});
		// on highlight
		chrome.tabs.onHighlighted.addListener(function(o){ tabId = o.tabIds[0];
			chrome.tabs.get(tabId, function(tab){
				if(tab.url){
					if(tab.url.match(/^http/i)||tab.url.match(/^https/i)||tab.url.match(/^file/i)||tab.url==browsernewtab){
						onlyspeechfunction(tab.url);
					}
				}
			});
		});
	}else{
	speechstartfunction();
	}

}else{
try{
	if(recognizing){recognition.stop(); recognizing = false;}
}
catch(e){}
}
});
}