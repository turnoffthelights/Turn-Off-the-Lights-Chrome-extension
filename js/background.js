//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the videos as if you were in the cinema.
Copyright (C) 2015 Stefan vd
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

// control
// security check
// my users must have the official extension
var a = chrome.i18n.getMessage("@@extension_id");
var b = "bfbmjmiodbnnpllbbbfblcplfjjepjdn"
if (a != b){
var manifestData = chrome.runtime.getManifest();
chrome.tabs.create({url: "http://www.turnoffthelights.com/extension/baduser.html"+"?totl=" + manifestData.version + "", selected:true});
} else {

chrome.extension.onMessage.addListener(function request(request,sender,sendResponse){
// eye protection & autoplay & shortcut
if (request.name == "automatic") {chrome.tabs.executeScript(sender.tab.id, {file: "js/light.js"});}
// contextmenu
else if (request.name == "contextmenuon") {checkcontextmenus();}
else if (request.name == "contextmenuoff") {removecontexmenus();}
else if (request.name == 'currenttabforblur') {
        chrome.tabs.captureVisibleTab(null, {format: "jpeg", quality: 50}, function(dataUrl) {
            sendResponse({ screenshotUrl: dataUrl });
        });
}
else if (request.name == "emergencyalf") {
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/light.js"});
            }
        }
    );
}
else if (request.name == "eyesavemeOFF") {
if(request.value == 'true'){chrome.storage.local.set({"eyea": 'true'});chrome.storage.local.set({"eyen": 'false'});}
else{chrome.storage.local.set({"eyea": 'false'});chrome.storage.local.set({"eyen": 'true'});}
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/removelight.js"});
            }
        }
    );
}
else if (request.name == "eyesavemeON") {
if(request.value == 'true'){chrome.storage.local.set({"eyea": 'true'});chrome.storage.local.set({"eyen": 'false'});}
else{chrome.storage.local.set({"eyea": 'false'});chrome.storage.local.set({"eyen": 'true'});}
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/reloadlight.js"});
            }
        }
    );
}
else if (request.name == "adddarkyoutube") {
chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(sender.tab.id, {allFrames: true, file: "js/youtubedark.js"});
        }
    );
}
else if (request.name == "addnormalyoutube") {
chrome.tabs.query({}, function (tabs) {
        chrome.tabs.executeScript(sender.tab.id, {allFrames: true, file: "js/youtubewhite.js"});
        }
    );
}
else if (request.name == "nmcustomx") {
if(request.value){chrome.storage.local.set({"nmcustomx": request.value});}
}
else if (request.name == "nmcustomy") {
if(request.value){chrome.storage.local.set({"nmcustomy": request.value});}
}
else if (request.name == "mastertabdark") {
if(request.value == 'true'){
	chrome.tabs.query({}, function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.executeScript(tabs[i].id, {file: "js/removelight.js"});
				}
			}
		);
}
else{
	chrome.tabs.query({}, function (tabs) {
				for (var i = 0; i < tabs.length; i++) {
					chrome.tabs.executeScript(tabs[i].id, {file: "js/golight.js"});
				}
			}
		);
}
}
return true;
});

}
// end control

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		chrome.storage.local.get(['pageaction'], function(chromeset){
			if ((tab.url.match(/^http/i)) && (chromeset["pageaction"] != "true") && (chromeset["pageaction"] != true)) {
					if(tabId){
					// fix Chrome bug, can't show icon on HDPI screen
					// chrome.pageAction.setIcon({tabId: tab.id, path: {'19': 'icons/icon1.png', '38':'icons/icon1@2x.png'}});
					// https://code.google.com/p/chromium/issues/detail?id=381383
					chrome.pageAction.show(tabId);
					}
			}
		});
});

chrome.pageAction.onClicked.addListener(function(tabs) {
chrome.storage.local.get(['alllightsoff'], function(chromeset){
if ((chromeset["alllightsoff"]!="true") && (chromeset["alllightsoff"]!=true)){
chrome.tabs.executeScript(tabs.id, {file: "js/light.js"}, function() {if (chrome.runtime.lastError) {console.error(chrome.runtime.lastError.message);}});
} else {
chrome.tabs.executeScript(tabs.id, {file: "js/mastertab.js"}, function() {if (chrome.runtime.lastError) {console.error(chrome.runtime.lastError.message);}});
}
});
});

// contextMenus
function onClickHandler(info, tab) {
if (info.menuItemId == "totlvideo" || info.menuItemId == "totlpage") {chrome.tabs.executeScript(tab.id, {file: "js/light.js"});}
else if (info.menuItemId == "totlguideemenu") {window.open("http://www.turnoffthelights.com/extension/chromeguide.html", "_blank");}
else if (info.menuItemId == "totldevelopmenu") {window.open("http://www.turnoffthelights.com/donate.html", "_blank");}
else if (info.menuItemId == "totlratemenu") {window.open("https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn/reviews", "_blank");}
else if (info.menuItemId == "totlsharemenu") {window.open("http://www.turnoffthelights.com/shareextension.html", "_blank");}
else if (info.menuItemId == "totlshareemail") {window.open("mailto:youremail?subject=Turn Off the Lights Chrome extension&body=Hé, This is amazing. I just tried today this Turn Off the Lights Chrome extension https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
else if (info.menuItemId == "totlsharetwitter") {window.open("http://twitter.com/home?status=Try%20self%20this%20amazing%20Turn%20Off%20the%20Lights%20Chrome%20extension%20chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
else if (info.menuItemId == "totlsharefacebook") {window.open("https://www.facebook.com/sharer/sharer.php?u=chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
else if (info.menuItemId == "totlsharegoogleplus") {window.open("https://plus.google.com/share?url=chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn", "_blank");}
}

// pageaction
var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenupostongoogleplus = chrome.i18n.getMessage("sharemenupostongoogleplus");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");

var contexts = ["page_action", "browser_action"];
chrome.contextMenus.create({"title": sharemenuwelcomeguidetitle, "type":"normal", "id": "totlguideemenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenudonatetitle, "type":"normal", "id": "totldevelopmenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenuratetitle, "type":"normal", "id": "totlratemenu", "contexts":contexts});

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": sharemenusharetitle, "id": "totlsharemenu", "contexts":contexts});
var child1 = chrome.contextMenus.create({"title": sharemenutellafriend, "id": "totlshareemail", "parentId": parent, "onclick": onClickHandler});
var child2 = chrome.contextMenus.create({"title": sharemenusendatweet, "id": "totlsharetwitter", "parentId": parent, "onclick": onClickHandler});
var child2 = chrome.contextMenus.create({"title": sharemenupostonfacebook, "id": "totlsharefacebook", "parentId": parent, "onclick": onClickHandler});
var child2 = chrome.contextMenus.create({"title": sharemenupostongoogleplus, "id": "totlsharegoogleplus", "parentId": parent, "onclick": onClickHandler});

chrome.contextMenus.onClicked.addListener(onClickHandler);

// context menu for page and video
var menupage;
var menuvideo;
function checkcontextmenus(){
// video
var contexts = ["video"];
for (var i = 0; i < contexts.length; i++){
  var context = contexts[i];
  var videotitle = chrome.i18n.getMessage("videotitle");
  menuvideo = chrome.contextMenus.create({"title": videotitle, "type":"normal", "id": "totlvideo", "contexts":[context]});
}

// page
var contexts = ["page","selection","link","editable","image","audio"];
for (var i = 0; i < contexts.length; i++){
  var context = contexts[i];
  var pagetitle = chrome.i18n.getMessage("pagetitle");
  menupage = chrome.contextMenus.create({"title": pagetitle, "type":"normal", "id": "totlpage", "contexts":[context]});
}
}

function removecontexmenus(){
chrome.contextMenus.remove(menuvideo);
chrome.contextMenus.remove(menupage);
}

try{ chrome.runtime.setUninstallUrl("http://www.turnoffthelights.com/extension/chromeuninstalled.html"); }
catch(e){}

// Fired when an update is available
chrome.runtime.onUpdateAvailable.addListener(function() {chrome.runtime.reload();});

// convert from old storage to new
if(localStorage["firstRun"] == "false"){ chrome.storage.local.set({"firstRun": "false"}); }
if(localStorage["version"] == "2.1"){ chrome.storage.local.set({"version": "2.1"}); }
if(localStorage["version"] == "2.0.0.81"){ chrome.storage.local.set({"version": "2.0.0.81"}); }

chrome.storage.local.get(['firstRun'], function(chromeset){
if ((chromeset["firstRun"]!="false") && (chromeset["firstRun"]!=false)){
  chrome.tabs.create({url: "http://www.turnoffthelights.com/extension/chromewelcome.html", selected:true})
  chrome.tabs.create({url: "http://www.turnoffthelights.com/extension/chromeguide.html", selected:false})
  chrome.storage.local.set({"firstRun": "false"});
  chrome.storage.local.set({"version": "2.4"});
}
});