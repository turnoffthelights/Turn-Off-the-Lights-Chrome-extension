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

chrome.runtime.onMessage.addListener(function request(request,sender,sendResponse){
// eye protection & autoplay & shortcut
if (request.name == "automatic") {chrome.tabs.executeScript(sender.tab.id, {file: "js/light.js"});}
else if (request.name == "screenshot") {
var checkcapturewebsite = "https://www.turnoffthelights.com/extension/capture-screenshot-of-video.html";
var capturewebsiteisopen = false;
    chrome.tabs.query({}, function(tabs) {
		for (var i = 0, tab; tab = tabs[i]; i++) {
        if(tab.url == checkcapturewebsite){
            capturewebsiteisopen = true;
            chrome.tabs.remove(tab.id, function() { chrome.tabs.create({url: checkcapturewebsite});});
        }
	}
if(capturewebsiteisopen == false){chrome.tabs.create({url: checkcapturewebsite});}
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
   if (changeInfo.status == 'complete') {   
          chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {action: "receivescreenshot", value: request.value}, function(response) {});  
            }
        }
    );
   }
});    
}
// contextmenu
else if (request.name == "contextmenuon") {checkcontextmenus();}
else if (request.name == "contextmenuoff") {removecontexmenus();}
else if (request.name == 'currenttabforblur') {
        chrome.tabs.captureVisibleTab(null, {format: "jpeg", quality: 50}, function(dataUrl) {
            sendResponse({ screenshotUrl: dataUrl });
        });
}
else if (request.name == "sendautoplay") {

	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function (e) { if (oReq.readyState == 4) {chrome.tabs.sendMessage(sender.tab.id, {name: "injectvideostatus",message: oReq.responseText});} };
	oReq.open("GET","/js/video-player-status.js",true);oReq.send();
    
}
else if (request.name == "sendfps") {

	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function (e) { if (oReq.readyState == 4) {chrome.tabs.sendMessage(sender.tab.id, {name: "injectfps",message: oReq.responseText});} };
	oReq.open("GET","/js/fpsinject.js",true);oReq.send();
    
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
if(request.value == true){chrome.storage.sync.set({"eyea": true});chrome.storage.sync.set({"eyen": false});}
else{chrome.storage.sync.set({"eyea": false});chrome.storage.sync.set({"eyen": true});}
chrome.tabs.query({}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.executeScript(tabs[i].id, {file: "js/removelight.js"});
            }
        }
    );
}
else if (request.name == "eyesavemeON") {
if(request.value == true){chrome.storage.sync.set({"eyea": true});chrome.storage.sync.set({"eyen": false});}
else{chrome.storage.sync.set({"eyea": false});chrome.storage.sync.set({"eyen": true});}
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
if(request.value){chrome.storage.sync.set({"nmcustomx": request.value});}
}
else if (request.name == "nmcustomy") {
if(request.value){chrome.storage.sync.set({"nmcustomy": request.value});}
}
else if (request.name == "mastertabdark") {
if(request.value == true){
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

chrome.tabs.onActivated.addListener(function (activeInfo){
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        chrome.storage.sync.get(['icon'], function(items){
            if(items["icon"] == undefined){items["icon"] = "icons/iconstick19@2x.png";}
            chrome.browserAction.setIcon({tabId : activeInfo.tabId, path : {"19": items["icon"],"38": items["icon"]}});
        });// chrome storage end
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		chrome.storage.sync.get(['icon'], function(chromeset){
            if(chromeset["icon"] == undefined){chromeset["icon"] = "icons/iconstick19@2x.png";}
            chrome.browserAction.setIcon({tabId : tabId, path : {"19": chromeset["icon"],"38": chromeset["icon"]}});

			if((tab.url.match(/^http/i)||tab.url.match(/^file/i)||tab.url==browsernewtab)) {
                chrome.browserAction.setPopup({tabId : tabId, popup:''});
				if(tabId != null){
                    if((new URL(tab.url)).origin==browserstore){
                        chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
                    }
				}
			}else{
                if(tabId != null){
                chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
				}
            }
		});
});

chrome.tabs.onHighlighted.addListener(function(o) { tabId = o.tabIds[0];
    chrome.tabs.get(tabId, function(tab) {
			if((tab.url.match(/^http/i)||tab.url.match(/^file/i)||tab.url==browsernewtab)) {
				chrome.browserAction.setPopup({tabId : tabId, popup:''});
                if(tabId != null){
                    if((new URL(tab.url)).origin==browserstore){
                        chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
                    }
				}
			}else{
                if(tabId != null){
                chrome.browserAction.setPopup({tabId : tabId, popup:'popup.html'});
				}
            }
    });
});

chrome.browserAction.onClicked.addListener(function(tabs) {
    chrome.storage.sync.get(['alllightsoff','mousespotlights'], function(chromeset){
        if((chromeset["mousespotlights"]!=true)){ // regular lamp
            if((chromeset["alllightsoff"]!=true)){
                chrome.tabs.executeScript(tabs.id, {file: "js/light.js"}, function() {if (chrome.runtime.lastError) {
                // console.error(chrome.runtime.lastError.message);
                }});
            }else{
                chrome.tabs.executeScript(tabs.id, {file: "js/mastertab.js"}, function() {if (chrome.runtime.lastError) {
                // console.error(chrome.runtime.lastError.message);
                }});
            }
        }else{ // all tabs
                chrome.tabs.executeScript(tabs.id, {file: "js/mastertab.js"}, function() {if (chrome.runtime.lastError) {
                // console.error(chrome.runtime.lastError.message);
                }});
        }
    });
});

chrome.commands.onCommand.addListener(function(command) {
if(command == "toggle-feature-nightmode"){
    chrome.tabs.executeScript(null,{code:"if(document.getElementById('stefanvdnightthemecheckbox')){document.getElementById('stefanvdnightthemecheckbox').click();}"});
}
});

// contextMenus
function onClickHandler(info, tab) {
var str = info.menuItemId;var resvideo = str.substring(0, 9);var respage = str.substring(0, 8);
if (resvideo == "totlvideo" || respage == "totlpage") {chrome.tabs.executeScript(tab.id, {file: "js/light.js"});}
else if (info.menuItemId == "totlguideemenu") {chrome.tabs.create({url: linkguide, active:true})}
else if (info.menuItemId == "totldevelopmenu") {chrome.tabs.create({url: donatewebsite, active:true})}
else if (info.menuItemId == "totlratemenu") {chrome.tabs.create({url: writereview, active:true})}
else if (info.menuItemId == "totlsharemenu") {chrome.tabs.create({url: linkshare, active:true})}
else if (info.menuItemId == "totlshareemail") {var sturnoffthelightemail = "mailto:your@email.com?subject="+chrome.i18n.getMessage("sharetexta")+"&body="+chrome.i18n.getMessage("sharetextb")+" "+turnoffthelightsproduct;chrome.tabs.create({url: sturnoffthelightemail, active:true})}
else if (info.menuItemId == "totlsharetwitter") {var sturnoffthelightsproductcodeurl = encodeURIComponent(chrome.i18n.getMessage("sharetextc")+" "+turnoffthelightsproduct);chrome.tabs.create({url: "https://twitter.com/home?status="+sturnoffthelightsproductcodeurl, active:true})}
else if (info.menuItemId == "totlsharefacebook") {chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u="+turnoffthelightsproduct, active:true})}
else if (info.menuItemId == "totlsharegoogleplus") {chrome.tabs.create({url: "https://plus.google.com/share?url="+turnoffthelightsproduct, active:true})}
}

// check to remove all contextmenus
chrome.contextMenus.removeAll(function() {
//console.log("contextMenus.removeAll callback");
});

var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenupostongoogleplus = chrome.i18n.getMessage("sharemenupostongoogleplus");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");

var contexts = ["browser_action"];
chrome.contextMenus.create({"title": sharemenuwelcomeguidetitle, "type":"normal", "id": "totlguideemenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenudonatetitle, "type":"normal", "id": "totldevelopmenu", "contexts":contexts});
chrome.contextMenus.create({"title": sharemenuratetitle, "type":"normal", "id": "totlratemenu", "contexts":contexts});

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": sharemenusharetitle, "id": "totlsharemenu", "contexts":contexts});
var child1 = chrome.contextMenus.create({"title": sharemenutellafriend, "id": "totlshareemail", "contexts": contexts, "parentId": parent});
var child2 = chrome.contextMenus.create({"title": sharemenusendatweet, "id": "totlsharetwitter", "contexts": contexts, "parentId": parent});
var child3 = chrome.contextMenus.create({"title": sharemenupostonfacebook, "id": "totlsharefacebook", "contexts": contexts, "parentId": parent});
var child4 = chrome.contextMenus.create({"title": sharemenupostongoogleplus, "id": "totlsharegoogleplus", "contexts": contexts, "parentId": parent});

chrome.contextMenus.onClicked.addListener(onClickHandler);

// context menu for page and video
var menupage = null;
var menuvideo = null;
var contextmenuadded = false;
var contextarrayvideo = [];
var contextarraypage = [];
function checkcontextmenus(){
    if(contextmenuadded == false){
    contextmenuadded = true;

    // video
    var contexts = ["video"];
    for (var i = 0; i < contexts.length; i++){
    var context = contexts[i];
    var videotitle = chrome.i18n.getMessage("videotitle");
    menuvideo = chrome.contextMenus.create({"title": videotitle, "type":"normal", "id": "totlvideo"+i, "contexts":[context]});
    contextarrayvideo.push(menuvideo);
    }

    // page
    var contexts = ["page","selection","link","editable","image","audio"];
    for (var i = 0; i < contexts.length; i++){
    var context = contexts[i];
    var pagetitle = chrome.i18n.getMessage("pagetitle");
    menupage = chrome.contextMenus.create({"title": pagetitle, "type":"normal", "id": "totlpage"+i, "contexts":[context]});
    contextarraypage.push(menupage);
    }
    
    }
}

function removecontexmenus(){
    if (contextarrayvideo.length > 0) {
        for (var i=0;i<contextarrayvideo.length;i++) {
            if (contextarrayvideo[i] === undefined || contextarrayvideo[i] === null){}else{
            chrome.contextMenus.remove(contextarrayvideo[i]);
            }
        }
    }
    if (contextarraypage.length > 0) {
        for (var i=0;i<contextarraypage.length;i++) {
            if (contextarraypage[i] === undefined || contextarraypage[i] === null){}else{
            chrome.contextMenus.remove(contextarraypage[i]);
            }
        }
    }
    contextarrayvideo = [];
    contextarraypage = [];
    contextmenuadded = false;
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
   for (key in changes) {
        var storageChange = changes[key];
        if(changes['contextmenus']){if(changes['contextmenus'].newValue == true){checkcontextmenus()}else{removecontexmenus()}}
        if(changes['icon']){if(changes['icon'].newValue){
            chrome.tabs.query({}, function (tabs) {
                        for (var i = 0; i < tabs.length; i++) {
                            chrome.browserAction.setIcon({tabId : tabs[i].id,
                                path : {
                                    "19": changes['icon'].newValue,
                                    "38": changes['icon'].newValue
                                }
                            });

                        }
                    }
            );
            }
        }
        if(changes['ecosaver']){
            chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                    chrome.tabs.executeScript(tabs[i].id, {file: "js/reloadlight.js"});
                    }
                }
            });
        }
    }
})

chrome.runtime.setUninstallURL(linkuninstall);

// convert from old storage to new
if(localStorage["firstRun"] == "false"){ chrome.storage.sync.set({"firstRun": false}); }
if(localStorage["version"] == "2.1"){ chrome.storage.sync.set({"version": "2.1"}); }
if(localStorage["version"] == "2.0.0.81"){ chrome.storage.sync.set({"version": "2.0.0.81"}); }

// convert string bool to real bool
function testbool(a){
    if(a == "true" || a == 'true'){return true}
    else{return false}
}

// convert from the chrome.local to chrome.sync
chrome.storage.local.get(['firstRun','version',"interval","lightcolor","autoplay","playlist","flash","head","fadein","fadeout","infobar","sharebutton","likebutton","readera","readern","shortcutlight","eyea","eyen","suggestions","videoheadline","eastereggs","contextmenus","viewcount","lightimage","lightimagea","lightimagen","eyealist","mousespotlighto","mousespotlighta","mousespotlightc","nighttime","begintime","endtime","addvideobutton","likebar","ambilight","ambilightrangeblurradius","ambilightrangespreadradius","mousespotlightt","ambilightfixcolor","ambilightvarcolor","ambilightcolorhex","ambilight4color","ambilight1colorhex","ambilight2colorhex","ambilight3colorhex","ambilight4colorhex","password","enterpassword","noflash","hardflash","ecosaver","ecosavertime","dynamic","dynamic1","dynamic2","dynamic3","dynamic4","dynamic5","dynamic6","dynamic7","dynamic8","dynamic9","dynamic10","hoveroptiondyn5","autoplayonly","blur","maxquality","autowidthyoutube","customqualityyoutube","cinemaontop","alllightsoff","spotlightradius","atmosphereonly","optionskipremember","nighttheme","nightonly","nightenabletheme","autoplaydelay","autoplaydelaytime","motion","lightimagelin","linearsq","colora","intervallina","colorb","intervallinb","speech","speechlang","speechcountry","atmosvivid","cammotiononly","speechonly","autoplaychecklistwhite","autoplaychecklistblack","autostop","autostoponly","autostopchecklistwhite","autostopchecklistblack","nighthover","nightmodechecklistwhite","nightmodechecklistblack","nmtopleft","nmtopright","nmbottomright","nmbottomleft","nmcustom","nightactivetime","nmbegintime","nmendtime","lampandnightmode","eyechecklistwhite","eyechecklistblack","nightmodebck","nightmodetxt","no360youtube","videotool","reflection","reflectionamount","videotoolonly","videotoolchecklistwhite","videotoolchecklistblack","excludedDomains","autoplayDomains","atmosphereDomains","nightDomains","cammotionDomains","speechDomains","autostopDomains","videotoolDomains"], function(chromeset){
    // if yes, it use the chrome.local setting
    if (chromeset["firstRun"] == "false"){
        // move all settings from the local to sync
        if(chromeset["firstRun"] == "false"){ chrome.storage.sync.set({"firstRun": false}); }
        if(chromeset["version"] == "2.1"){ chrome.storage.sync.set({"version": "2.1"}); }
        if(chromeset["version"] == "2.0.0.81"){ chrome.storage.sync.set({"version": "2.0.0.81"}); }
        if(chromeset["version"] == "2.4"){ chrome.storage.sync.set({"version": "2.4"}); }
        
        // testbool text -> is the true or false
        // no testbool tex -> is text or number or json
        chrome.storage.sync.set({"interval": chromeset["interval"], "lightcolor": chromeset["lightcolor"], "autoplay": testbool(chromeset["autoplay"]), "playlist": testbool(chromeset["playlist"]), "flash": testbool(chromeset["flash"]), "head": testbool(chromeset["head"]), "fadein": testbool(chromeset["fadein"]), "fadeout": testbool(chromeset["fadeout"]), "infobar": testbool(chromeset["infobar"]), "sharebutton": testbool(chromeset["sharebutton"]), "likebutton": testbool(chromeset["likebutton"]), "readera": testbool(chromeset["readera"]), "readern": testbool(chromeset["readern"]), "shortcutlight": testbool(chromeset["shortcutlight"]), "eyea": testbool(chromeset["eyea"]), "eyen": testbool(chromeset["eyen"]), "suggestions": testbool(chromeset["suggestions"]), "videoheadline": testbool(chromeset["videoheadline"]), "eastereggs": testbool(chromeset["eastereggs"]), "contextmenus": testbool(chromeset["contextmenus"]), "viewcount": testbool(chromeset["viewcount"]), "lightimage": chromeset["lightimage"], "lightimagea": testbool(chromeset["lightimagea"]), "lightimagen": testbool(chromeset["lightimagen"]), "eyealist": testbool(chromeset["eyealist"]), "mousespotlighto": testbool(chromeset["mousespotlighto"]), "mousespotlighta": testbool(chromeset["mousespotlighta"]), "mousespotlightc": testbool(chromeset["mousespotlightc"]), "nighttime": testbool(chromeset["nighttime"]), "begintime": chromeset["begintime"], "endtime": chromeset["endtime"], "addvideobutton": testbool(chromeset["addvideobutton"]), "likebar": testbool(chromeset["likebar"]), "ambilight": testbool(chromeset["ambilight"]), "ambilightrangeblurradius": chromeset["ambilightrangeblurradius"], "ambilightrangespreadradius": chromeset["ambilightrangespreadradius"], "mousespotlightt": testbool(chromeset["mousespotlightt"]), "ambilightfixcolor": testbool(chromeset["ambilightfixcolor"]), "ambilightvarcolor": testbool(chromeset["ambilightvarcolor"]), "ambilightcolorhex": chromeset["ambilightcolorhex"], "ambilight4color": testbool(chromeset["ambilight4color"]), "ambilight1colorhex": chromeset["ambilight1colorhex"], "ambilight2colorhex": chromeset["ambilight2colorhex"], "ambilight3colorhex": chromeset["ambilight3colorhex"], "ambilight4colorhex": chromeset["ambilight4colorhex"], "password": testbool(chromeset["password"]), "enterpassword": chromeset["enterpassword"], "noflash": testbool(chromeset["noflash"]), "hardflash": testbool(chromeset["hardflash"]), "ecosaver": testbool(chromeset["ecosaver"]), "ecosavertime": chromeset["ecosavertime"], "dynamic": testbool(chromeset["dynamic"]), "dynamic1": testbool(chromeset["dynamic1"]), "dynamic2": testbool(chromeset["dynamic2"]), "dynamic3": testbool(chromeset["dynamic3"]), "dynamic4": testbool(chromeset["dynamic4"]), "dynamic5": testbool(chromeset["dynamic5"]), "dynamic6": testbool(chromeset["dynamic6"]), "dynamic7": testbool(chromeset["dynamic7"]), "dynamic8": testbool(chromeset["dynamic8"]), "dynamic9": testbool(chromeset["dynamic9"]), "dynamic10": testbool(chromeset["dynamic10"]), "hoveroptiondyn5": testbool(chromeset["hoveroptiondyn5"]), "autoplayonly": testbool(chromeset["autoplayonly"]), "blur": testbool(chromeset["blur"]), "maxquality": chromeset["maxquality"], "autowidthyoutube": testbool(chromeset["autowidthyoutube"]), "customqualityyoutube": testbool(chromeset["customqualityyoutube"]), "cinemaontop": testbool(chromeset["cinemaontop"]), "alllightsoff": testbool(chromeset["alllightsoff"]), "spotlightradius": chromeset["spotlightradius"], "atmosphereonly": testbool(chromeset["atmosphereonly"]), "optionskipremember": testbool(chromeset["optionskipremember"]), "nighttheme": testbool(chromeset["nighttheme"]), "nightonly": testbool(chromeset["nightonly"]), "nightenabletheme": testbool(chromeset["nightenabletheme"]), "autoplaydelay": testbool(chromeset["autoplaydelay"]), "autoplaydelaytime": chromeset["autoplaydelaytime"], "motion": testbool(chromeset["motion"]), "lightimagelin": testbool(chromeset["lightimagelin"]), "linearsq": chromeset["linearsq"], "colora": chromeset["colora"], "intervallina": chromeset["intervallina"], "colorb": chromeset["colorb"], "intervallinb": chromeset["intervallinb"], "speech": testbool(chromeset["speech"]), "speechlang": chromeset["speechlang"], "speechcountry": chromeset["speechcountry"], "atmosvivid": testbool(chromeset["atmosvivid"]), "cammotiononly": testbool(chromeset["cammotiononly"]), "speechonly": testbool(chromeset["speechonly"]), "autoplaychecklistwhite": testbool(chromeset["autoplaychecklistwhite"]), "autoplaychecklistblack": testbool(chromeset["autoplaychecklistblack"]), "autostop": testbool(chromeset["autostop"]), "autostoponly": testbool(chromeset["autostoponly"]), "autostopchecklistwhite": testbool(chromeset["autostopchecklistwhite"]), "autostopchecklistblack": testbool(chromeset["autostopchecklistblack"]), "nighthover": testbool(chromeset["nighthover"]), "nightmodechecklistwhite": testbool(chromeset["nightmodechecklistwhite"]), "nightmodechecklistblack": testbool(chromeset["nightmodechecklistblack"]), "nmtopleft": testbool(chromeset["nmtopleft"]), "nmtopright": testbool(chromeset["nmtopright"]), "nmbottomright": testbool(chromeset["nmbottomright"]), "nmbottomleft": testbool(chromeset["nmbottomleft"]), "nmcustom": testbool(chromeset["nmcustom"]), "nightactivetime": testbool(chromeset["nightactivetime"]), "nmbegintime": chromeset["nmbegintime"], "nmendtime": chromeset["nmendtime"], "lampandnightmode": testbool(chromeset["lampandnightmode"]), "eyechecklistwhite": testbool(chromeset["eyechecklistwhite"]), "eyechecklistblack": testbool(chromeset["eyechecklistblack"]), "nightmodebck": chromeset["nightmodebck"], "nightmodetxt": chromeset["nightmodetxt"], "no360youtube": testbool(chromeset["no360youtube"]), "videotool": testbool(chromeset["videotool"]), "reflection": testbool(chromeset["reflection"]), "reflectionamount": chromeset["reflectionamount"], "videotoolonly": testbool(chromeset["videotoolonly"]), "videotoolchecklistwhite": testbool(chromeset["videotoolchecklistwhite"]), "videotoolchecklistblack": testbool(chromeset["videotoolchecklistblack"]), "excludedDomains": chromeset["excludedDomains"], "autoplayDomains": chromeset["autoplayDomains"], "atmosphereDomains": chromeset["atmosphereDomains"], "nightDomains": chromeset["nightDomains"], "cammotionDomains": chromeset["cammotionDomains"], "speechDomains": chromeset["speechDomains"], "autostopDomains": chromeset["autostopDomains"], "videotoolDomains": chromeset["videotoolDomains"]});
            
        // when done, clear the local
        chrome.storage.local.clear();
    } else {
        // already done converting the 'firstrun' (from chrome.local to chrome.sync) to false
        // or no firstrun found in chrome.local (empty value), then do the 'welcome page'
        initwelcome();
    }
});

function initwelcome(){
chrome.storage.sync.get(['firstRun'], function(chromeset){
if ((chromeset["firstRun"]!="false") && (chromeset["firstRun"]!=false)){
  chrome.tabs.create({url: linkwelcomepage, active:true})
  chrome.tabs.create({url: linkguide, active:false})
  var crrinstall = new Date().getTime();
  chrome.storage.sync.set({"firstRun": false, "version": "2.4", "firstDate": crrinstall});
}
});
}