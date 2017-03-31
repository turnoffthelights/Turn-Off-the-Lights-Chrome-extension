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

document.addEventListener('DOMContentLoaded', function() { speechrecognition(); },false);
chrome.storage.onChanged.addListener(function() { speechrecognition(); });

var speechDomains = null;

// Simple function that checks existence of s in str
var userSaid = function(str, s) {return str.indexOf(s) > -1;}

function removespeechinfo(){
// you are speaking now -- remove the bubble
chrome.runtime.sendMessage({'name' : 'slidersave', 'value' : true});
chrome.tabs.query({active: true}, function (tabs) {
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].url.match(/^http/i)){
			chrome.tabs.executeScript(tabs[i].id, {file: "js/speechbubbleremove.js"});
        }
	}
});									
}

function addspeechinfo(){
// you are speaking now -- add the bubble
chrome.runtime.sendMessage({'name' : 'slidersave', 'value' : true});						
chrome.tabs.query({active: true}, function (tabs) {
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].url.match(/^http/i)){
			chrome.tabs.executeScript(tabs[i].id, {file: "js/speechbubbleadd.js"});
        }
	}
});	
}

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
// not supported
} else {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;

	recognition.onstart = function() {
		recognizing = true;
		// console.log("speak now");
	};

	recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
		// No speech was detected.
		ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
		// No microphone was found.
		ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
		if (event.timeStamp - start_timestamp < 100) {
			// Permission to use microphone is blocked. 
		} else {
			// Permission to use microphone was denied.
		}
		ignore_onend = true;
	}
	};

	recognition.onend = function() {
		removespeechinfo();
		recognizing = false;
		// think you are ending, start it back up
			//startButton();
			// location.reload();
			//recognition.start(); // bug alsways refresh -> to crash possible
		if (ignore_onend) {
		return;
		}
		if (!final_transcript) {
		// console.log("Click on the microphone icon and begin speaking.");
		return;
		}
	};
	
var i18nldesspeech1command = chrome.i18n.getMessage("desspeech1command"); // turn off the lights
var i18nldesspeech2command = chrome.i18n.getMessage("desspeech2command"); // turn on the lights
var i18nldesspeech3command = chrome.i18n.getMessage("desspeech3command"); // play video
var i18nldesspeech4command = chrome.i18n.getMessage("desspeech4command"); // pause video
var i18nldesspeech5command = chrome.i18n.getMessage("desspeech5command"); // browser lamp

	recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
		addspeechinfo();
		if (event.results[i].isFinal) {
			final_transcript = event.results[i][0].transcript;
			// console.log(final_transcript);
			chrome.storage.sync.set({"speechhistorysave": final_transcript});
				if (userSaid(final_transcript, i18nldesspeech1command)) {
				// console.log("yes: turn off the lights");
				chrome.storage.sync.set({"slideeffect": true});
				chrome.tabs.query({active: true}, function (tabs) {
					for (var i = 0; i < tabs.length; i++) {
						if (tabs[i].url.match(/^http/i)){
							chrome.tabs.executeScript(tabs[i].id, {file: "js/light.js"});
						}
					}
				});
				}
				else if (userSaid(final_transcript, i18nldesspeech2command)) {
				// console.log("yes: turn on the lights");
				chrome.storage.sync.set({"slideeffect": true});
				chrome.tabs.query({active: true}, function (tabs) {
					for (var i = 0; i < tabs.length; i++) {
						if (tabs[i].url.match(/^http/i)){
							chrome.tabs.executeScript(tabs[i].id, {file: "js/light.js"});
						}
					}
				});	
				}
				// Play the video
				else if (userSaid(final_transcript, i18nldesspeech3command)) {
				chrome.tabs.query({active: true}, function (tabs) {
					for (var i = 0; i < tabs.length; i++) {
						if (tabs[i].url.match(/^http/i)){
							chrome.tabs.executeScript(tabs[i].id, {file: "js/videoplay.js"});
						}
					}
				});	
				}
				// Stop the video
				else if (userSaid(final_transcript, i18nldesspeech4command)) {
				chrome.tabs.query({active: true}, function (tabs) {
					for (var i = 0; i < tabs.length; i++) {
						if (tabs[i].url.match(/^http/i)){
							chrome.tabs.executeScript(tabs[i].id, {file: "js/videopause.js"});
						}
					}
				});	
				}
		removespeechinfo();
		} else {
			interim_transcript += event.results[i][0].transcript;
		}
	}
	};
}

function startButton(event) {
	// Abort previous instances of recognition already running
    if (recognition && recognition.abort) {
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

function speechrecognition(){
chrome.storage.sync.get(['speech', 'speechonly', 'speechDomains'], function(response){
speech = response['speech'];
speechonly  = response['speechonly'];

if (speech == true){
chrome.runtime.onSuspend.addListener(function() { location.reload(); });
}

function speechstartfunction(){
// start automatic up
if (!recognizing) {startButton(event);}
}

function onlyspeechfunction(tab){
	var currenturl = tab;
	if(currenturl.substr(-1) == '/') {
        currenturl = currenturl.substr(0, currenturl.length - 1);
    }

	speechDomains  = response['speechDomains']; // get latest setting
	if(typeof speechDomains == "string") {
		speechDomains = JSON.parse(speechDomains);
		var sbuf = [];
		for(var domain in speechDomains)
			sbuf.push(domain);
			sbuf.sort();
		for(var i = 0; i < sbuf.length; i++)
			if(currenturl == sbuf[i]){speechstartfunction();}
			else {
				try{ // stop it
					if (recognizing) {
					recognition.stop(); recognizing = false; 
					}
				}
				catch(e){}
			}
		}
}

if (speech == true){

	if(speechonly == true){
		// get current tab website
		chrome.tabs.onActivated.addListener(function(info) {
			var tab = chrome.tabs.get(info.tabId, function(tab) {onlyspeechfunction(tab.url);});
		});
	} else {
	speechstartfunction();
	}

} else {
try{
	if (recognizing) {recognition.stop(); recognizing = false;}
}
catch(e){}
}
});
}