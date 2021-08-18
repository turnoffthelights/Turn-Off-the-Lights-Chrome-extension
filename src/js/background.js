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

chrome.runtime.onMessage.addListener(function request(request, sender){
// eye protection & autoplay & shortcut
	switch(request.name){
	case"bckreload":
		installation();
		break;
	case"redirectionoptions":
		chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
			chrome.tabs.remove(tabs[0].id);
			chrome.tabs.create({url: chrome.extension.getURL("options.html"), active:true});
		});
		break;
	case"automatic":
		chrome.tabs.executeScript(sender.tab.id, {file: "js/light.js"});
		break;
	case"screenshot":
		var checkcapturewebsite = totlscreenshotpage;
		chrome.tabs.create({url: checkcapturewebsite}, function(tab){
			var currenttabid = tab.id;
			chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
				if(changeInfo.status == "complete"){
					chrome.tabs.sendMessage(currenttabid, {action: "receivescreenshot", value: request.value});
				}
			});
		});
		break;
	case"contextmenuon":
		checkcontextmenus();
		break;
	case"contextmenuoff":
		removecontexmenus();
		break;
	case"sendautoplay":
		restcontent("/js/video-player-status.js", "injectvideostatus", sender.tab.id);
		break;
	case"sendfps":
		restcontent("/js/fpsinject.js", "injectfps", sender.tab.id);
		break;
	case"sendlightcss":
		restcontent("/css/light.css", "injectlightcss", sender.tab.id);
		break;
	case"emergencyalf":
		chrome.tabs.query({}, function(tabs){
			var i, l = tabs.length;
			for(i = 0; i < l; i++){
				chrome.tabs.executeScript(tabs[i].id, {file: "js/light.js"});
			}
		}
		);
		break;
	case"eyesaveme":
		if(request.value == true){ chrome.storage.sync.set({"eyea": true, "eyen": false}); chromerefreshalltabs("gorefresheyedark"); }else{ chrome.storage.sync.set({"eyea": false, "eyen": true}); chromerefreshalltabs("gorefresheyelight"); }
		break;
	case"nmcustomvalues":
		if(request.valuex && request.valuey){ chrome.storage.sync.set({"nmcustomx": request.valuex, "nmcustomy": request.valuey}); }
		break;
	case"mastertabdark":
		if(request.value == true){
			chromerefreshalltabs("goremovelightoff");
		}else{
			chromerefreshalltabs("goaddlightoff");
		}
		break;
	case"browsertheme":
		if(request.value == "dark"){
			if(typeof browser !== "undefined"){
				var qtest = browser.theme.update;
				if(typeof qtest !== "undefined"){
					browser.theme.update({
						images: {
							theme_frame: "",
						},
						colors: {
							"frame": "black",
							"tab_background_text": "#fff",
							"toolbar": "#333333",
							"toolbar_field": "black",
							"toolbar_field_text": "white",
							"toolbar_field_border": "#505050",
							"tab_line": "#3e82f7",
							"popup": "black",
							"popup_text": "white",
							"popup_border": "gray"
						}
					});
				}
			}
			// set white icon
			chrome.tabs.query({}, function(tabs){
				var i, l = tabs.length;
				for(i = 0; i < l; i++){
					chrome.browserAction.setIcon({tabId : tabs[i].id, path : {"19": "icons/iconwhite19.png", "38": "icons/iconwhite38.png"}});
				}
			});
		}else{
			if(typeof browser !== "undefined"){
				var qtestbrowsertheme = browser.theme.update;
				if(typeof qtestbrowsertheme !== "undefined"){
					browser.theme.reset();
				}
			}
			// return default icon
			chrome.storage.sync.get(["icon"], function(items){
				if(items["icon"] == undefined){ items["icon"] = "icons/iconstick38.png"; }
				chrome.tabs.query({}, function(tabs){
					var i, l = tabs.length;
					for(i = 0; i < l; i++){
						chrome.browserAction.setIcon({tabId : tabs[i].id, path : {"19": items["icon"], "38": items["icon"]}});
					}
				});
			});
		}
		break;
	case"sendnightmodeindark":
		chrome.tabs.sendMessage(sender.tab.id, {action: "goinnightmode", value:request.value});
		break;
	case"getallpermissions":
		var result = "";
		chrome.permissions.getAll(function(permissions){
			result = permissions.permissions;
			chrome.tabs.sendMessage(sender.tab.id, {text: "receiveallpermissions", value: result});
		});
		break;
	case"pip":
		chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
			var task;
			if(request.value == 1){
				task = "gopipvideo";
			}else{
				task = "gopipvisual";
			}
			chrome.tabs.sendMessage(tabs[0].id, {action: task});
		});
		break;
	}
});

// Night Mode inject before displaying the website
chrome.webNavigation.onCommitted.addListener(({tabId, frameId}) => {
	// Filter out non main window events.
	if(frameId !== 0)return;
	injectScriptsTo(tabId);
});

const injectScriptsTo = (tabId) => {
	chrome.tabs.executeScript(tabId, {
		file: "js/nightmode.js",
		runAt: "document_start"
	}, () => void chrome.runtime.lastError);
};
//---

function restcontent(path, name, sendertab){
	var cssoReq = new XMLHttpRequest();
	cssoReq.onreadystatechange = function(){ if(cssoReq.readyState == 4){ chrome.tabs.sendMessage(sendertab, {name: name, message: cssoReq.responseText}); } };
	cssoReq.open("GET", path, true); cssoReq.send();
}

chrome.tabs.onActivated.addListener(function(activeInfo){
	chrome.tabs.get(activeInfo.tabId, function(){
		chrome.storage.sync.get(["icon"], function(items){
			if(items["icon"] == undefined){ items["icon"] = "icons/iconstick38.png"; }
			chrome.browserAction.setIcon({tabId : activeInfo.tabId, path : {"19": items["icon"], "38": items["icon"]}});
		});
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
	// tab loaded, recheck all the video players on the current web page
	if(changeInfo.status == "complete"){
		chrome.tabs.query({}, function(tabs){
			tabs.forEach(function(tab){
				chrome.tabs.sendMessage(tab.id, {action: "gorefreshvideonumber"});
			});
		});
	}

	chrome.storage.sync.get(["icon"], function(chromeset){
		if(chromeset["icon"] == undefined){ chromeset["icon"] = "icons/iconstick38.png"; }
		chrome.browserAction.setIcon({tabId : tabId, path : {"19": chromeset["icon"], "38": chromeset["icon"]}});
	});
});

// Set click to false at beginning
var alreadyClicked = false;
// Declare a timer variable
var timer;
chrome.browserAction.onClicked.addListener(function(tabs){
	if(tabs.url.match(/^http/i) || tabs.url.match(/^file/i)){
		if(tabs.url == totloptionspage || (new URL(tabs.url)).origin == browserstore || tabs.url == browsernewtab){
			chrome.browserAction.setPopup({tabId: tabs.id, popup:"popup.html"});
		}else{

			// Check for previous click
			if(alreadyClicked){
				// console.log("Doubleclick");
				// Yes, Previous Click Detected
				// Clear timer already set in earlier Click
				window.clearTimeout(timer);
				// Show the popup window
				// Clear all Clicks
				alreadyClicked = false;
				chrome.browserAction.setPopup({tabId: tabs.id, popup:""});
				return;
			}

			// Set Click to  true
			alreadyClicked = true;
			chrome.browserAction.setPopup({tabId: tabs.id, popup:"palette.html"});

			// Add a timer to detect next click to a sample of 250
			timer = window.setTimeout(function(){
				// console.log("Singelclick");
				var popups = chrome.extension.getViews({type: "popup"});
				if(popups.length != 0){ // popup exist

				}else{ // not exist
					chrome.storage.sync.get(["alllightsoff", "mousespotlights"], function(chromeset){
						if((chromeset["mousespotlights"] != true)){ // regular lamp
							if((chromeset["alllightsoff"] != true)){
								chrome.tabs.executeScript(tabs.id, {file: "js/light.js"}, function(){
									if(chrome.runtime.lastError){
									// console.error(chrome.runtime.lastError.message);
									}
								});
							}else{
								chrome.tabs.sendMessage(tabs.id, {action: "masterclick"});
							}
						}else{ // all tabs
							chrome.tabs.sendMessage(tabs.id, {action: "masterclick"});
						}
					});
				}

				// Clear all timers
				window.clearTimeout(timer);
				// Ignore clicks
				alreadyClicked = false;
				chrome.browserAction.setPopup({tabId: tabs.id, popup:""});
			}, 250);

		}
	}else{
		chrome.browserAction.setPopup({tabId: tabs.id, popup:"popup.html"});
	}
});

chrome.commands.onCommand.addListener(function(command){
	if(command == "toggle-feature-nightmode"){
		chrome.tabs.executeScript(null, {code:"if(document.getElementById('stefanvdnightthemecheckbox')){document.getElementById('stefanvdnightthemecheckbox').click();}"});
	}
});

// contextMenus
function onClickHandler(info, tab){
	var str = info.menuItemId;
	switch(true){
	case(str.includes("totlvideo") || str.includes("totlpage")): chrome.tabs.executeScript(tab.id, {file: "js/light.js"});
		break;
	case(str.includes("totlguideemenu")): chrome.tabs.create({url: linkguide, active:true});
		break;
	case(str.includes("totldevelopmenu")): chrome.tabs.create({url: donatewebsite, active:true});
		break;
	case(str.includes("totlratemen")): chrome.tabs.create({url: writereview, active:true});
		break;
	case(str.includes("totlshareemail")): var sturnoffthelightemail = "mailto:your@email.com?subject=" + chrome.i18n.getMessage("sharetexta") + "&body=" + chrome.i18n.getMessage("sharetextb") + " " + turnoffthelightsproduct; chrome.tabs.create({url: sturnoffthelightemail, active:true});
		break;
	case(str.includes("totlsharetwitter")): var sturnoffthelightsproductcodeurl = encodeURIComponent(chrome.i18n.getMessage("sharetextc") + " " + turnoffthelightsproduct); chrome.tabs.create({url: "https://twitter.com/home?status=" + sturnoffthelightsproductcodeurl, active:true});
		break;
	case(str.includes("totlsharefacebook")): chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u=" + turnoffthelightsproduct, active:true});
		break;
	case(str.includes("totlsubscribe")): chrome.tabs.create({url: linkyoutube, active:true});
		break;
	}
}

// check to remove all contextmenus
if(chrome.contextMenus){
	chrome.contextMenus.removeAll(function(){
	// console.log("contextMenus.removeAll callback");
	});
}

var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");
var sharemenusubscribetitle = chrome.i18n.getMessage("desremyoutube");

function browsercontext(a, b, c, d){
	var item = {"title": a, "type": "normal", "id": b, "contexts": contexts};
	var newitem;
	if(d != ""){
		item = Object.assign({}, item, {parentId: d});
	}
	if(c != ""){
		newitem = Object.assign({}, item, {icons: c});
	}
	try{
		// try show web browsers that do support "icons"
		// Firefox, Opera, Microsoft Edge
		return chrome.contextMenus.create(newitem);
	}catch(e){
		// catch web browsers that do NOT show the icon
		// Google Chrome
		return chrome.contextMenus.create(item);
	}
}

if(chrome.contextMenus){
	var contexts = ["browser_action"];
	browsercontext(sharemenuwelcomeguidetitle, "totlguideemenu", {"16": "images/IconGuide.png", "32": "images/IconGuide@2x.png"});
	browsercontext(sharemenudonatetitle, "totldevelopmenu", {"16": "images/IconDonate.png", "32": "images/IconDonate@2x.png"});
	browsercontext(sharemenuratetitle, "totlratemenu", {"16": "images/IconStar.png", "32": "images/IconStar@2x.png"});

	// Create a parent item and two children.
	var parent = null;
	parent = browsercontext(sharemenusharetitle, "totlsharemenu", {"16": "images/IconShare.png", "32": "images/IconShare@2x.png"});
	browsercontext(sharemenutellafriend, "totlshareemail", {"16": "images/IconEmail.png", "32": "images/IconEmail@2x.png"}, parent);
	chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartorshare", "contexts": contexts, "parentId": parent});
	browsercontext(sharemenusendatweet, "totlsharetwitter", {"16": "images/IconTwitter.png", "32": "images/IconTwitter@2x.png"}, parent);
	browsercontext(sharemenupostonfacebook, "totlsharefacebook", {"16": "images/IconFacebook.png", "32": "images/IconFacebook@2x.png"}, parent);

	chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartor", "contexts": contexts});
	browsercontext(sharemenusubscribetitle, "totlsubscribe", {"16": "images/IconYouTube.png", "32": "images/IconYouTube@2x.png"});

	chrome.contextMenus.onClicked.addListener(onClickHandler);
}

// context menu for page and video
var menuitems = null;
var contextmenuadded = false;
var contextarrayvideo = [];
var contextarraypage = [];

function addwebpagecontext(a, b, c, d){
	var k;
	var addvideolength = b.length;
	for(k = 0; k < addvideolength; k++){
		var contextvideo = b[k];
		menuitems = chrome.contextMenus.create({"title": a, "type":"normal", "id": d + k, "contexts":[contextvideo]});
		c.push(menuitems);
	}
}

function checkcontextmenus(){
	if(chrome.contextMenus){
		if(contextmenuadded == false){
			contextmenuadded = true;
			// video
			var videotitle = chrome.i18n.getMessage("videotitle");
			var contextsvideo = ["video"];
			addwebpagecontext(videotitle, contextsvideo, contextarrayvideo, "totlvideo");
			// page
			var pagetitle = chrome.i18n.getMessage("pagetitle");
			var contexts = ["page", "selection", "link", "editable", "image", "audio"];
			addwebpagecontext(pagetitle, contexts, contextarraypage, "totlpage");
		}
	}
}

function cleanrightclickmenu(menu){
	if(menu.length > 0){
		menu.forEach(function(item){
			if(item != undefined){ chrome.contextMenus.remove(item); }
		});
	}
	menu.length = 0;
}

function removecontexmenus(){
	if(chrome.contextMenus){
		cleanrightclickmenu(contextarrayvideo);
		cleanrightclickmenu(contextarraypage);
		contextmenuadded = false;
	}
}

function checkreturnpolicyvalues(a, b, c){
	if(a[b] && Object.prototype.hasOwnProperty.call(policygrouparray, c)){
		if(a[b].newValue != policygrouparray[c]){
			chrome.storage.sync.set({b: policygrouparray[c]});
		}
	}
}

function onchangestorage(a, b, c, d){
	if(a[b]){
		if(a[b].newValue == true){ c(); }else{ d(); }
	}
}

var key;
chrome.storage.onChanged.addListener(function(changes){
	for(key in changes){
		onchangestorage(changes, "contextmenus", checkcontextmenus, removecontexmenus);
		if(changes["icon"]){
			if(changes["icon"].newValue){
				chrome.tabs.query({}, function(tabs){
					var i, l = tabs.length;
					for(i = 0; i < l; i++){
						chrome.browserAction.setIcon({tabId : tabs[i].id,
							path : {
								"19": changes["icon"].newValue,
								"38": changes["icon"].newValue
							}
						});
					}
				}
				);
			}
		}
		if(changes["ecosaver"]){
			if(changes["ecosaver"].newValue){
				chromerefreshalltabs("gorefresheyelight");
			}
		}

		var changenameautoplay = ["autoplay", "mousespotlights", "autoplayDomains", "autoplaychecklistwhite", "autoplaychecklistblack", "autoplayonly", "aplay", "apause", "astop", "autoplaydelay", "autoplaydelaytime"];
		if(changenameautoplay.includes(key)){
			chromerefreshalltabs("gorefreshautoplay");
		}

		var changenamevideotoolbar = ["videotool", "videotoolonly", "videotoolDomains", "videotoolchecklistwhite", "videotoolchecklistblack", "speedtoolbar", "videozoom", "visopacity", "videotoolcolor"];
		if(changenamevideotoolbar.includes(key)){
			chromerefreshalltabs("gorefreshvideotoolbar");
		}

		var changenamevolume = ["videovolume", "videovolumealt", "videovolumehold", "videovolumeposa", "videovolumeposb", "videovolumeposc", "videovolumecolor", "videovolumelabel", "videovolumesteps", "videovolumeonly", "videovolumeDomains", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose"];
		if(changenamevolume.includes(key)){
			chromerefreshalltabs("gorefreshmousescroll");
		}

		var changenameatmos = ["ambilight", "ambilightfixcolor", "ambilight4color", "ambilightvarcolor", "atmosvivid", "vpause", "atmosfpsauto", "atmosfpsmanual", "drawatmosfps", "ambilightcolorhex", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "ambilightrangeblurradius", "ambilightrangespreadradius", "atmosontotlmode", "atmosphereonly", "atmosphereDomains"];
		if(changenameatmos.includes(key)){
			chromerefreshalltabs("goenableatmos");
		}

		if(changes["reflection"] || changes["reflectionamount"]){
			chromerefreshalltabs("gorefreshreflection");
		}
		if(changes["hovervideo"] || changes["hovervideoamount"]){
			chromerefreshalltabs("gorefreshhovervideo");
		}
		if(changes["playrate"] || changes["playrateamount"]){
			chromerefreshalltabs("gorefreshplayrate");
		}
		if(changes["nightmodebck"] || changes["nightmodetxt"] || changes["nightmodehyperlink"] || changes["nightmodebutton"]){
			chromerefreshalltabs("gonightmodecolors");
		}

		var changenamenight = ["nighttheme", "lampandnightmode", "nightmodeswitchhide", "nightmodeswitchhidetime", "nightonly", "nightmodechecklistwhite", "nightmodechecklistblack", "nightDomains", "nightmodebydomain", "nightmodebypage", "nightactivetime", "nmbegintime", "nmendtime", "nightenabletheme", "nighthover", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nightmodegesture", "nightmodeos"];
		if(changenamenight.includes(key)){
			chromerefreshalltabs("goenablenightmode");
		}

		if(changes["nightmodegesture"]){
			chromerefreshalltabs("gorefreshnightmodegesture");
		}
		if(changes["ecosaver"] || changes["ecosavertime"]){
			chromerefreshalltabs("gorefresheyesaver");
		}
		if(changes["nighttime"] || changes["begintime"] || changes["endtime"]){
			chromerefreshalltabs("gorefreshnighttime");
		}
		if(changes["pipvisualtype"]){
			chromerefreshalltabs("gorefreshpipvisualtype");
		}

		var changenamegamepad = ["gamepad", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo"];
		if(changenamegamepad.includes(key)){
			chromerefreshalltabs("gorefreshgamepad");
		}

		// Group Policy
		// check the values with group policy, if different values. Then change it back
		checkreturnpolicyvalues(changes, "autoplay", "AutoPlay");
		checkreturnpolicyvalues(changes, "autostop", "AutoStop");
		checkreturnpolicyvalues(changes, "customqualityyoutube", "AutoHD");
		checkreturnpolicyvalues(changes, "maxquality", "AutoHDQuality");
		checkreturnpolicyvalues(changes, "block60fps", "Block60FPS");
		checkreturnpolicyvalues(changes, "nighttheme", "NightModeSwitch");
		checkreturnpolicyvalues(changes, "videovolume", "MouseVolumeScroll");
		checkreturnpolicyvalues(changes, "videotool", "VideoToolbar");
	}
});

function chromerefreshalltabs(name){
	chrome.tabs.query({}, function(tabs){
		var i, l = tabs.length;
		for(i = 0; i < l; i++){
			var protocol = tabs[i].url.split(":")[0];
			if(protocol == "http" || protocol == "https"){
				if(tabs[i].url != totloptionspage){
					chrome.tabs.sendMessage(tabs[i].id, {action: name});
				}
			}
		}
	});
}

// omnibox
var i18nomninightmode = chrome.i18n.getMessage("omninightmode").toLowerCase();
var i18nomnidaymode = chrome.i18n.getMessage("omnidaymode").toLowerCase();
var i18nomnilightoff = chrome.i18n.getMessage("omnilightoff").toLowerCase();
var i18nomnilighton = chrome.i18n.getMessage("omnilighton").toLowerCase();
var i18nomnihelp = chrome.i18n.getMessage("omnihelp").toLowerCase();
if(typeof chrome.omnibox !== "undefined"){
	chrome.omnibox.onInputChanged.addListener(
		function(text, suggest){
			var suggtext;
			if(text == ""){ suggtext = "Turn Off the Lights"; }else{ suggtext = text; }
			chrome.omnibox.setDefaultSuggestion({description: suggtext});
			suggest([
				{content: i18nomninightmode, description: "night mode"},
				{content: i18nomnidaymode, description: "day mode"},
				{content: i18nomnilightoff, description: "light off"},
				{content: i18nomnilighton, description: "light on"}
			]);
		});

	chrome.omnibox.onInputEntered.addListener(
		function(text){
			var onmniresult = text.toLowerCase();
			if(onmniresult == i18nomninightmode){
				omnidaynightmode(1);
			}else if(onmniresult == i18nomnidaymode){
				omnidaynightmode(0);
			}else if(onmniresult == i18nomnilightoff || text == i18nomnilighton){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					var tab = tabs[0];
					chrome.tabs.executeScript(tab.id, {file: "js/light.js"});
				});
			}else if(onmniresult == i18nomnihelp){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					var tab = tabs[0];
					chrome.tabs.update(tab.id, {url: linksupport});
				});
			}
		});
}

function omnidaynightmode(a){
	var result = "";
	if(a == 0){ result = "day"; }else{ result = "night"; }
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		var tab = tabs[0];
		chrome.tabs.sendMessage(tab.id, {action: "goinnightmode", value:result});
	});
}

chrome.runtime.setUninstallURL(linkuninstall);

function initwelcome(){
	chrome.storage.sync.get(["firstRun"], function(chromeset){
		if((chromeset["firstRun"] != "false") && (chromeset["firstRun"] != false)){
			chrome.tabs.create({url: linkwelcomepage, active:true});
			chrome.tabs.create({url: linkguide, active:false});
			var crrinstall = new Date().getTime();
			chrome.storage.sync.set({"firstRun": false, "version": "2.4", "firstDate": crrinstall});
		}
	});
}

// saving group policy values
var savinggroup = {};
function setsavegroup(a, b){
	if(a == true){ savinggroup[b] = true; }else if(a == false){ savinggroup[b] = false; }
}

function readgrouppolicy(items){
	if(chrome.runtime.lastError){
		// console.error("managed error: " + chrome.runtime.lastError.message);
	}else{
		// console.log("items", items);
		if(items.SuppressWelcomePage == true){
			var crrinstall = new Date().getTime();
			chrome.storage.sync.set({"firstRun": false, "version": "2.4", "firstDate": crrinstall});
		}else{
			// no value, then show the page
			initwelcome();
		}

		setsavegroup(items.AutoPlay, "autoplay");
		setsavegroup(items.AutoStop, "autostop");
		setsavegroup(items.AutoHD, "customqualityyoutube");

		if(items.AutoHDQuality != ""){ savinggroup["maxquality"] = items.AutoHDQuality; }

		setsavegroup(items.Block60FPS, "block60fps");
		setsavegroup(items.NightModeSwitch, "nighttheme");
		setsavegroup(items.MouseVolumeScroll, "videovolume");
		setsavegroup(items.VideoToolbar, "videotool");

		// save total group policy
		chrome.storage.sync.set(savinggroup);
	}
}

var policygrouparray = {};
if(chrome.storage.managed){
	chrome.storage.managed.onChanged.addListener(function(changes){
		// save in memory
		Object.keys(changes).forEach(function(policyName){
			policygrouparray[policyName] = changes[policyName].newValue;
		});

		// update saving group policy values
		var updatesavinggroup = {};

		if(changes["AutoPlay"]){
			updatesavinggroup["autoplay"] = changes["AutoPlay"].newValue;
		}
		if(changes["AutoStop"]){
			updatesavinggroup["autostop"] = changes["AutoStop"].newValue;
		}
		if(changes["AutoHD"]){
			updatesavinggroup["customqualityyoutube"] = changes["AutoHD"].newValue;
		}
		if(changes["AutoHDQuality"]){
			updatesavinggroup["maxquality"] = changes["AutoHDQuality"].newValue;
		}
		if(changes["Block60FPS"]){
			updatesavinggroup["block60fps"] = changes["Block60FPS"].newValue;
		}
		if(changes["NightModeSwitch"]){
			updatesavinggroup["nighttheme"] = changes["NightModeSwitch"].newValue;
		}
		if(changes["MouseVolumeScroll"]){
			updatesavinggroup["videovolume"] = changes["MouseVolumeScroll"].newValue;
		}
		if(changes["VideoToolbar"]){
			updatesavinggroup["videotool"] = changes["VideoToolbar"].newValue;
		}

		// update save total group policy
		chrome.storage.sync.set(updatesavinggroup);
	});
}

function installation(){
	if(chrome.storage.managed){
		chrome.storage.managed.get(function(items){
			readgrouppolicy(items);
			// save in memory
			Object.keys(items).forEach(function(policyName){
				policygrouparray[policyName] = items[policyName];
			});
		});
	}else{
		initwelcome();
	}
}

chrome.runtime.onInstalled.addListener(function(){
	installation();
});