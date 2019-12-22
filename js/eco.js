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

// date today
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd;}
if(mm<10){mm='0'+mm;}
var today = dd+'/'+mm+'/'+yyyy;

function search(nameKey, myArray){
  var i;
  var l = myArray.length;
  for(i = 0; i < l; i++){
      if(myArray[i].name === nameKey){
          return myArray[i];
      }
  }
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
chrome.storage.sync.get(['analytics','siteengagement','seeanalytics'], function(items){
  seeanalytics = items['seeanalytics'];if(seeanalytics == null)seeanalytics = true;
  if(seeanalytics == true){
  if(items["analytics"]){
    analytics = items["analytics"];

    try{
      chrome.storage.sync.getBytesInUse(['analytics'], logbytesanalytics);
    }catch(e){
      // web browsers that do not support the bytes in use size
      if(analytics.length > 30){
        autoanalyticscleanup();
      }
    }

    // search if today date is there
    var myJSON = JSON.stringify(analytics);
    var resultObject = search(today, analytics);
    if(typeof resultObject === "undefined"){
      var array = [
        { name:today, details:{active:0, time:0, day:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0} }}
      ];
      var finalarray = analytics.concat(array);

      chrome.storage.sync.set({"analytics":finalarray}, function(){
        if(chrome.runtime.lastError){
          if(chrome.runtime.lastError == "QUOTA_BYTES"){
            autoanalyticscleanup();
          }else if(chrome.runtime.lastError == "QUOTA_BYTES_PER_ITEM"){
            autoanalyticscleanup();
          }if(chrome.runtime.lastError == "MAX_ITEMS"){
            autoanalyticscleanup();
          }
        }
      });

    }
  }else{
    // if empty, create this empty day
    var array = [
      { name:today, details:{active:0, time:0, day:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0} }}
    ];
    chrome.storage.sync.set({"analytics":array});
  }
  if(items["siteengagement"]){
    siteengagement = items["siteengagement"];

    try{
      chrome.storage.sync.getBytesInUse(['siteengagement'], logbytessiteengagement);
    }catch(e){
      // web browsers that do not support the bytes in use size
      if(siteengagement.length > 30){
        autositeengagementcleanup();
      }
    }

    // search if today date is there
    var myJSON = JSON.stringify(siteengagement);
    var resultObject = search(today, siteengagement);
    if(typeof resultObject === "undefined"){
      var site = [
        { name:today }
      ];
      var finalsite = siteengagement.concat(site);

      chrome.storage.sync.set({"siteengagement":finalsite}, function(){
        if(chrome.runtime.lastError){
          if(chrome.runtime.lastError == "QUOTA_BYTES"){
            autositeengagementcleanup();
          }else if(chrome.runtime.lastError == "QUOTA_BYTES_PER_ITEM"){
            autositeengagementcleanup();
          }if(chrome.runtime.lastError == "MAX_ITEMS"){
            autositeengagementcleanup();
          }
        }
      });

    }
  }else{
    var site = [
      { name:today }
    ];
    chrome.storage.sync.set({"siteengagement":site});
  }
  }
});

// observeDOM - dynamic check
var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
      eventListenerSupported = window.addEventListener;

  return function(obj, callback){
      if( MutationObserver ){
          // define a new observer
          var obs = new MutationObserver(function(mutations, observer){
              if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                  callback();
          });
          // have the observer observe foo for changes in children
          obs.observe( obj, { childList:true, subtree:true });
      }
      else if( eventListenerSupported ){
          obj.addEventListener('DOMNodeInserted', callback, false);
          obj.addEventListener('DOMNodeRemoved', callback, false);
      }
  }
})();

var element = document.querySelector('#stefanvdlightareoff1');
var in_dom = document.body.contains(element);
if(document.body.contains(element)){
  in_dom = true;
}else if(in_dom){
  in_dom = false;
}
var totalSeconds = 0;
var refreshIntervalId;
var taskaddseconds = false; // default false, when refresh the web page it save correct the value
observeDOM(document.body,function(){

if(document.getElementById('stefanvdlightareoff1')){
    if(!in_dom){
      taskaddseconds = false;

      try{
      chrome.storage.sync.get(['analytics','seeanalytics'], function(items){
        seeanalytics = items['seeanalytics'];if(seeanalytics == null)seeanalytics = true;
        if(seeanalytics == true){
        if(items["analytics"]){
          analytics = items["analytics"];
          var myJSON = JSON.stringify(analytics);
          var resultObject = search(today, analytics);
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
          chrome.runtime.sendMessage({name: 'badgeon'});
          // timer
          refreshIntervalId = window.setInterval(setTime, 1000);
          function setTime(){
            if(document.visibilityState === "visible"){
              ++totalSeconds;
            }
          }
        }
        }
      });
      }catch{
      }

    }
    in_dom = true;

}else if(in_dom){
  in_dom = false;

  try{
  chrome.storage.sync.get(['analytics','siteengagement','seeanalytics'], function(items){
    seeanalytics = items['seeanalytics'];if(seeanalytics == null)seeanalytics = true;
    if(seeanalytics == true){
    if(items["analytics"]){
      analytics = items["analytics"];
      var myJSON = JSON.stringify(analytics);
      var resultObject = search(today, analytics);
      var over = JSON.stringify(resultObject["details"]["time"]);
      var currentseconds = parseInt(over);
      currentseconds += totalSeconds;
      over = currentseconds;
      resultObject["details"]["time"] = over;
      chrome.storage.sync.set({"analytics":analytics});
    }
    if(items["siteengagement"]){
      siteengagement = items["siteengagement"];
      var myJSON = JSON.stringify(siteengagement);
      var resultObject = search(today, siteengagement);
      if(JSON.stringify(resultObject["'"+window.location.href+"'"])){
          var mes = JSON.stringify(resultObject["'"+window.location.href+"'"]);
      }else{
        var mes = 0;
      }
      var currentseconds = parseInt(mes);
      currentseconds += totalSeconds;
      mes = currentseconds;
      if(mes > 0){
      resultObject["'"+window.location.href+"'"] = mes;
      chrome.storage.sync.set({"siteengagement":siteengagement});
      }
    }
    taskaddseconds = true;
    totalSeconds = 0;
    }
  });
  }catch{
  }

  window.clearInterval(refreshIntervalId);
}

});

window.addEventListener("beforeunload", function(e){
try{
// stop the timer
chrome.storage.sync.get(['analytics','siteengagement','seeanalytics'], function(items){
  seeanalytics = items['seeanalytics'];if(seeanalytics == null)seeanalytics = true;
  if(chrome.runtime.lastError){
      /* error */
      return;
  }
  if(seeanalytics == true){
  if(items["analytics"]){
    analytics = items["analytics"];
    if(taskaddseconds == false){
    var myJSON = JSON.stringify(analytics);
    var resultObject = search(today, analytics);
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
    var myJSON = JSON.stringify(siteengagement);
    var resultObject = search(today, siteengagement);
    if(JSON.stringify(resultObject["'"+window.location.href+"'"])){
      var mes = JSON.stringify(resultObject["'"+window.location.href+"'"]);
    }else{
      var mes = 0;
    }
    var currentseconds = parseInt(mes);
    currentseconds += totalSeconds;
    mes = currentseconds;
    if(mes > 0){
    resultObject["'"+window.location.href+"'"] = mes;
    chrome.storage.sync.set({"siteengagement":siteengagement});
    }
  }
  }
});
window.clearInterval(refreshIntervalId);
}catch(e){}
});