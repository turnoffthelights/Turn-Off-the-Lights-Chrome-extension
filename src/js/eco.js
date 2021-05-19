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

// date today
var currenttoday = new Date();
var dd = currenttoday.getDate();
var mm = currenttoday.getMonth() + 1; // January is 0!

var yyyy = currenttoday.getFullYear();
if(dd < 10){ dd = "0" + dd; }
if(mm < 10){ mm = "0" + mm; }
var today = dd + "/" + mm + "/" + yyyy;

function search(nameKey, myArray){
	var item = myArray.find((item) => item.name === nameKey);
	return item;
}

function autoanalyticscleanup(){
	// autoclean up to the last 7 days
	if(analytics.length > 7){
		var last7daysanal = analytics.slice(-7);
		chrome.storage.sync.set({"analytics":last7daysanal});
	}
}

function autositeengagementcleanup(){
	// autoclean up to the last 7 days
	if(siteengagement.length > 7){
		var last7dayssiten = siteengagement.slice(-7);
		chrome.storage.sync.set({"siteengagement":last7dayssiten});
	}
}

function logbytesanalytics(bytes){
	// cleanup the big files
	// limit in Google Chrome => 8192
	if(bytes >= 5000){
		autoanalyticscleanup();
	}
}

function logbytessiteengagement(bytes){
	// cleanup the big files
	// limit in Google Chrome => 8192
	if(bytes >= 5000){
		autositeengagementcleanup();
	}
}

var analytics;
var siteengagement;
var seeanalytics;
var emptyarray = [{name:today, details:{active:0, time:0, day:{0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0}}}];
var todaysite = [{name:today}];
chrome.storage.sync.get(["analytics", "siteengagement", "seeanalytics"], function(items){
	seeanalytics = items["seeanalytics"]; if(seeanalytics == null)seeanalytics = true;
	if(seeanalytics == true){
		if(items["analytics"]){
			analytics = items["analytics"];

			chrome.storage.sync.getBytesInUse(["analytics"], logbytesanalytics);

			// search if today date is there
			var resultObject = search(today, analytics);
			console.log("4stefan: ", resultObject);
			if(typeof resultObject === "undefined"){
				var finalarray = analytics.concat(emptyarray);

				chrome.storage.sync.set({"analytics":finalarray}, function(){
					if(chrome.runtime.lastError == "QUOTA_BYTES" || chrome.runtime.lastError == "QUOTA_BYTES_PER_ITEM" || chrome.runtime.lastError == "MAX_ITEMS"){
						autoanalyticscleanup();
					}
				});

			}
		}else{
			// if empty, create this empty day
			chrome.storage.sync.set({"analytics":emptyarray});
		}
		if(items["siteengagement"]){
			siteengagement = items["siteengagement"];

			chrome.storage.sync.getBytesInUse(["siteengagement"], logbytessiteengagement);

			// search if today date is there
			var todayresultObject = search(today, siteengagement);
			if(typeof todayresultObject === "undefined"){
				var finalsite = siteengagement.concat(todaysite);

				chrome.storage.sync.set({"siteengagement":finalsite}, function(){
					if(chrome.runtime.lastError == "QUOTA_BYTES" || chrome.runtime.lastError == "QUOTA_BYTES_PER_ITEM" || chrome.runtime.lastError == "MAX_ITEMS"){
						autositeengagementcleanup();
					}
				});

			}
		}else{
			chrome.storage.sync.set({"siteengagement":todaysite});
		}
	}
});

// observeDOM - dynamic check
var observeDOM = (function(){
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
		eventListenerSupported = window.addEventListener;

	return function(obj, callback){
		if(MutationObserver){
			// define a new observer
			var obs = new MutationObserver(function(mutations){
				if(mutations[0].addedNodes.length || mutations[0].removedNodes.length)
					callback();
			});
			// have the observer observe foo for changes in children
			obs.observe(obj, {childList:true, subtree:true});
		}else if(eventListenerSupported){
			obj.addEventListener("DOMNodeInserted", callback, false);
			obj.addEventListener("DOMNodeRemoved", callback, false);
		}
	};
})();

function setTime(){
	if(document.visibilityState === "visible"){
		++totalSeconds;
	}
}

var element = document.querySelector("#stefanvdlightareoff1");
var in_dom = document.body.contains(element);
if(document.body.contains(element)){
	in_dom = true;
}else if(in_dom){
	in_dom = false;
}
var totalSeconds = 0;
var refreshIntervalId;
var taskaddseconds = false; // default false, when refresh the web page it save correct the value

var resultObject;
var currentseconds;
observeDOM(document.body, function(){

	if(document.getElementById("stefanvdlightareoff1")){
		if(!in_dom){
			taskaddseconds = false;

			chrome.storage.sync.get(["analytics", "seeanalytics"], function(items){
				seeanalytics = items["seeanalytics"]; if(seeanalytics == null)seeanalytics = true;
				if(seeanalytics == true){
					if(items["analytics"]){
						analytics = items["analytics"];
						resultObject = search(today, analytics);
						var rest = JSON.stringify(resultObject["details"]["active"]);
						var currentnumber = parseInt(rest);
						currentnumber += 1;
						rest = currentnumber;
						resultObject["details"]["active"] = rest;
						// when used the light off
						var d = new Date();
						var n = d.getHours();
						var thatime = resultObject["details"]["day"][n];
						var timenumber = parseInt(thatime);
						timenumber += 1;
						thatime = timenumber;
						resultObject["details"]["day"][n] = thatime;
						// general save
						chrome.storage.sync.set({"analytics":analytics});
						chrome.runtime.sendMessage({name: "badgeon"});
						// timer
						refreshIntervalId = window.setInterval(setTime, 1000);
					}
				}
			});

		}
		in_dom = true;

	}else if(in_dom){
		in_dom = false;

		chrome.storage.sync.get(["analytics", "siteengagement", "seeanalytics"], function(items){
			seeanalytics = items["seeanalytics"]; if(seeanalytics == null)seeanalytics = true;
			if(seeanalytics == true){
				if(items["analytics"]){
					analytics = items["analytics"];
					resultObject = search(today, analytics);
					var over = JSON.stringify(resultObject["details"]["time"]);
					currentseconds = parseInt(over);
					currentseconds += totalSeconds;
					over = currentseconds;
					resultObject["details"]["time"] = over;
					chrome.storage.sync.set({"analytics":analytics});
				}
				if(items["siteengagement"]){
					siteengagement = items["siteengagement"];
					resultObject = search(today, siteengagement);
					var mes = JSON.stringify(resultObject["'" + window.location.href + "'"]);
					if(!mes){
						mes = 0;
					}
					currentseconds = parseInt(mes);
					currentseconds += totalSeconds;
					mes = currentseconds;
					if(mes > 0){
						resultObject["'" + window.location.href + "'"] = mes;
						chrome.storage.sync.set({"siteengagement":siteengagement});
					}
				}
				taskaddseconds = true;
				totalSeconds = 0;
			}
		});

		window.clearInterval(refreshIntervalId);
	}

});

window.addEventListener("beforeunload", function(){
	try{
		// stop the timer
		chrome.storage.sync.get(["analytics", "siteengagement", "seeanalytics"], function(items){
			seeanalytics = items["seeanalytics"]; if(seeanalytics == null)seeanalytics = true;
			if(chrome.runtime.lastError){
				/* error */
				return;
			}
			if(seeanalytics == true){
				if(items["analytics"]){
					analytics = items["analytics"];
					if(taskaddseconds == false){
						resultObject = search(today, analytics);
						var over = JSON.stringify(resultObject["details"]["time"]);
						var currentseconds = parseInt(over);
						currentseconds += totalSeconds;
						over = currentseconds;
						resultObject["details"]["time"] = over;
						chrome.storage.sync.set({"analytics":analytics});
					}
				}
				if(items["siteengagement"]){
					siteengagement = items["siteengagement"];
					resultObject = search(today, siteengagement);
					var mes;
					if(JSON.stringify(resultObject["'" + window.location.href + "'"])){
						mes = JSON.stringify(resultObject["'" + window.location.href + "'"]);
					}else{
						mes = 0;
					}
					currentseconds = parseInt(mes);
					currentseconds += totalSeconds;
					mes = currentseconds;
					if(mes > 0){
						resultObject["'" + window.location.href + "'"] = mes;
						chrome.storage.sync.set({"siteengagement":siteengagement});
					}
				}
			}
		});
		window.clearInterval(refreshIntervalId);
	}catch(e){
		// background page already reloaded, clear the interval
		// console.error(e);
		window.clearInterval(refreshIntervalId);
	}
});