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

chrome.runtime.onMessage.addListener(function request(request,sender,sendResponse){
// eye protection & autoplay & shortcut
if(request.name == "automatic"){chrome.tabs.executeScript(sender.tab.id, {file: "js/light.js"});}
else if(request.name == "screenshot"){
var checkcapturewebsite = totlscreenshotpage;
chrome.tabs.create({url: checkcapturewebsite}, function(tab){
    var tabId = tab.id;
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        if(changeInfo.status == 'complete'){
            chrome.tabs.sendMessage(tabId, {action: "receivescreenshot", value: request.value});
        }
    });
});
}
// contextmenu
else if(request.name == "contextmenuon"){checkcontextmenus();}
else if(request.name == "contextmenuoff"){removecontexmenus();}
else if(request.name == "sendautoplay"){

	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(e){ if(oReq.readyState == 4){chrome.tabs.sendMessage(sender.tab.id, {name: "injectvideostatus",message: oReq.responseText});} };
	oReq.open("GET","/js/video-player-status.js",true);oReq.send();

}
else if(request.name == "sendfps"){

	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(e){ if(oReq.readyState == 4){chrome.tabs.sendMessage(sender.tab.id, {name: "injectfps",message: oReq.responseText});} };
	oReq.open("GET","/js/fpsinject.js",true);oReq.send();

}
else if(request.name == "sendlightcss"){

	var oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function(e){ if(oReq.readyState == 4){chrome.tabs.sendMessage(sender.tab.id, {name: "injectlightcss",message: oReq.responseText});} };
	oReq.open("GET","/css/light.css",true);oReq.send();

}
else if(request.name == "emergencyalf"){
chrome.tabs.query({}, function(tabs){
            var i;
            var l = tabs.length;
            for(i = 0; i < l; i++){
                chrome.tabs.executeScript(tabs[i].id, {file: "js/light.js"});
            }
        }
    );
}
else if(request.name == "eyesavemeOFF"){
if(request.value == true){chrome.storage.sync.set({"eyea": true});chrome.storage.sync.set({"eyen": false});}
else{chrome.storage.sync.set({"eyea": false});chrome.storage.sync.set({"eyen": true});}
chrome.tabs.query({}, function(tabs){
            var i;
            var l = tabs.length;
            for(i = 0; i < l; i++){
                chrome.tabs.sendMessage(tabs[i].id, { action: "gorefresheyelight" });
            }
        }
    );
}
else if(request.name == "eyesavemeON"){
if(request.value == true){chrome.storage.sync.set({"eyea": true});chrome.storage.sync.set({"eyen": false});}
else{chrome.storage.sync.set({"eyea": false});chrome.storage.sync.set({"eyen": true});}
chrome.tabs.query({}, function(tabs){
            var i;
            var l = tabs.length;
            for(i = 0; i < l; i++){
                if(tabs[i].url != totloptionspage){
                    chrome.tabs.sendMessage(tabs[i].id, { action: "gorefresheyedark" });
                }
            }
        }
    );
}
else if(request.name == "nmcustomx"){
if(request.value){chrome.storage.sync.set({"nmcustomx": request.value});}
}
else if(request.name == "nmcustomy"){
if(request.value){chrome.storage.sync.set({"nmcustomy": request.value});}
}
else if(request.name == "mastertabdark"){
if(request.value == true){
	chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
				for(i = 0; i < l; i++){
                    chrome.tabs.sendMessage(tabs[i].id, { action: "goremovelightoff" });
				}
			}
		);
}
else{
	chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
				for(i = 0; i < l; i++){
                    chrome.tabs.sendMessage(tabs[i].id, { action: "goaddlightoff" });
				}
			}
		);
}
}
else if(request.name == "browsertheme"){
if(request.value == "dark"){
    if(typeof browser !== 'undefined'){
    var qtest = browser.theme.update;
    if(typeof qtest !== 'undefined'){
		browser.theme.update({
			images: {
                theme_frame: '',
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
    var i;
    var l = tabs.length;
    for(i = 0; i < l; i++){
    chrome.browserAction.setIcon({tabId : tabs[i].id, path : {"19": "icons/iconwhite19.png","38": "icons/iconwhite38.png"}});
    }
});
}
else{
    if(typeof browser !== 'undefined'){
    var qtest = browser.theme.update;
    if(typeof qtest !== 'undefined'){
        browser.theme.reset();
    }
    }
// return default icon
chrome.storage.sync.get(['icon'], function(items){
if(items["icon"] == undefined){items["icon"] = "icons/iconstick38.png";}
chrome.tabs.query({}, function(tabs){
    var i;
    var l = tabs.length;
    for(i = 0; i < l; i++){
        chrome.browserAction.setIcon({tabId : tabs[i].id, path : {"19": items["icon"],"38": items["icon"]}});
    }
});
});// chrome storage end
}
}
else if(request.name == "badgeon"){checkbadge();}
else if(request.name == "sendnightmodeindark"){
    chrome.tabs.sendMessage(sender.tab.id, {action: "goinnightmode", value:request.value});
}
else if(request.name == "getallpermissions"){
    var result = "";
    chrome.permissions.getAll(function(permissions){
       result = permissions.permissions;
       chrome.tabs.sendMessage(sender.tab.id,{text: 'receiveallpermissions', value: result});
    });   
}
return true;
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        chrome.storage.sync.get(['icon'], function(items){
            if(items["icon"] == undefined){items["icon"] = "icons/iconstick38.png";}
            chrome.browserAction.setIcon({tabId : activeInfo.tabId, path : {"19": items["icon"],"38": items["icon"]}});
        });
        // for all tabs
        // update the badge value
        checkbadge();
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    // tab loaded, recheck all the video players on the current web page
    if(changeInfo.status == 'complete'){
        chrome.tabs.query({},function(tabs){
            tabs.forEach(function(tab){
              chrome.tabs.sendMessage(tab.id, { action: "gorefreshvideonumber" });
            });
        });
    }

    chrome.storage.sync.get(['icon'], function(chromeset){
        if(chromeset["icon"] == undefined){chromeset["icon"] = "icons/iconstick38.png";}
        chrome.browserAction.setIcon({tabId : tabId, path : {"19": chromeset["icon"],"38": chromeset["icon"]}});
    });
    // for all tabs
    // update the badge value
    checkbadge();
});

chrome.tabs.onHighlighted.addListener(function(o){ tabId = o.tabIds[0];
    chrome.tabs.get(tabId, function(tab){
        // for highlighted tab
        // update the badge value
        checkbadge();
    });
});


// Set click to false at beginning
var alreadyClicked = false;
// Declare a timer variable
var timer;
var popupcreated = false;
chrome.browserAction.onClicked.addListener(function(tabs){
    if(tabs.url.match(/^http/i)||tabs.url.match(/^file/i)){
        if(tabs.url==totloptionspage||(new URL(tabs.url)).origin==browserstore||tabs.url==browsernewtab){
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


        //Set Click to  true
        alreadyClicked = true;
        chrome.browserAction.setPopup({tabId: tabs.id, popup:"palette.html"});

        // Add a timer to detect next click to a sample of 250
        timer = window.setTimeout(function(){
            // console.log("Singelclick");
            var popups = chrome.extension.getViews({type: "popup"});
            if(popups.length != 0){ // popup exist

            }else{ // not exist
            chrome.storage.sync.get(['alllightsoff','mousespotlights'], function(chromeset){
            if((chromeset["mousespotlights"]!=true)){ // regular lamp
                if((chromeset["alllightsoff"]!=true)){
                    chrome.tabs.executeScript(tabs.id, {file: "js/light.js"}, function(){if(chrome.runtime.lastError){
                    // console.error(chrome.runtime.lastError.message);
                    }});
                }else{
                    chrome.tabs.sendMessage(tabs.id, { action: "masterclick" });
                }
            }else{ // all tabs
                    chrome.tabs.sendMessage(tabs.id, { action: "masterclick" });
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
    } else{
        chrome.browserAction.setPopup({tabId: tabs.id, popup:"popup.html"});
    }
});

chrome.commands.onCommand.addListener(function(command){
if(command == "toggle-feature-nightmode"){
    chrome.tabs.executeScript(null,{code:"if(document.getElementById('stefanvdnightthemecheckbox')){document.getElementById('stefanvdnightthemecheckbox').click();}"});
}
});

// contextMenus
function onClickHandler(info, tab){
var str = info.menuItemId;var resvideo = str.substring(0, 9);var respage = str.substring(0, 8);
if(resvideo == "totlvideo" || respage == "totlpage"){chrome.tabs.executeScript(tab.id, {file: "js/light.js"});}
else if(info.menuItemId == "totlguideemenu"){chrome.tabs.create({url: linkguide, active:true})}
else if(info.menuItemId == "totldevelopmenu"){chrome.tabs.create({url: donatewebsite, active:true})}
else if(info.menuItemId == "totlratemenu"){chrome.tabs.create({url: writereview, active:true})}
else if(info.menuItemId == "totlsharemenu"){chrome.tabs.create({url: linkshare, active:true})}
else if(info.menuItemId == "totlshareemail"){var sturnoffthelightemail = "mailto:your@email.com?subject="+chrome.i18n.getMessage("sharetexta")+"&body="+chrome.i18n.getMessage("sharetextb")+" "+turnoffthelightsproduct;chrome.tabs.create({url: sturnoffthelightemail, active:true})}
else if(info.menuItemId == "totlsharetwitter"){var sturnoffthelightsproductcodeurl = encodeURIComponent(chrome.i18n.getMessage("sharetextc")+" "+turnoffthelightsproduct);chrome.tabs.create({url: "https://twitter.com/home?status="+sturnoffthelightsproductcodeurl, active:true})}
else if(info.menuItemId == "totlsharefacebook"){chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u="+turnoffthelightsproduct, active:true})}
else if(info.menuItemId == "totlsubscribe"){chrome.tabs.create({url: linkyoutube, active:true})}
}

// check to remove all contextmenus
chrome.contextMenus.removeAll(function(){
//console.log("contextMenus.removeAll callback");
});

var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");
var sharemenusubscribetitle = chrome.i18n.getMessage("desremyoutube");

var contexts = ["browser_action"];
try{
    // try show web browsers that do support "icons"
    // Firefox, Opera, Microsoft Edge
    chrome.contextMenus.create({"title": sharemenuwelcomeguidetitle, "type":"normal", "id": "totlguideemenu", "contexts": contexts, "icons": {"16": "images/IconGuide.png","32": "images/IconGuide@2x.png"}});
    chrome.contextMenus.create({"title": sharemenudonatetitle, "type":"normal", "id": "totldevelopmenu", "contexts": contexts, "icons": {"16": "images/IconDonate.png","32": "images/IconDonate@2x.png"}});
    chrome.contextMenus.create({"title": sharemenuratetitle, "type":"normal", "id": "totlratemenu", "contexts": contexts, "icons": {"16": "images/IconStar.png","32": "images/IconStar@2x.png"}});
}
catch(e){
    // catch web browsers that do NOT show the icon
    // Google Chrome
    chrome.contextMenus.create({"title": sharemenuwelcomeguidetitle, "type":"normal", "id": "totlguideemenu", "contexts": contexts});
    chrome.contextMenus.create({"title": sharemenudonatetitle, "type":"normal", "id": "totldevelopmenu", "contexts": contexts});
    chrome.contextMenus.create({"title": sharemenuratetitle, "type":"normal", "id": "totlratemenu", "contexts": contexts});
}

// Create a parent item and two children.
try{
    // try show web browsers that do support "icons"
    // Firefox, Opera, Microsoft Edge
    var parent = chrome.contextMenus.create({"title": sharemenusharetitle, "id": "totlsharemenu", "contexts": contexts, "icons": {"16": "images/IconShare.png","32": "images/IconShare@2x.png"}});
    var child1 = chrome.contextMenus.create({"title": sharemenutellafriend, "id": "totlshareemail", "contexts": contexts, "parentId": parent, "icons": {"16": "images/IconEmail.png","32": "images/IconEmail@2x.png"}});
    chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartorshare", "contexts": contexts, "parentId": parent});
    var child2 = chrome.contextMenus.create({"title": sharemenusendatweet, "id": "totlsharetwitter", "contexts": contexts, "parentId": parent, "icons": {"16": "images/IconTwitter.png","32": "images/IconTwitter@2x.png"}});
    var child3 = chrome.contextMenus.create({"title": sharemenupostonfacebook, "id": "totlsharefacebook", "contexts": contexts, "parentId": parent, "icons": {"16": "images/IconFacebook.png","32": "images/IconFacebook@2x.png"}});
}
catch(e){
    // catch web browsers that do NOT show the icon
    // Google Chrome
    var parent = chrome.contextMenus.create({"title": sharemenusharetitle, "id": "totlsharemenu", "contexts": contexts});
    var child1 = chrome.contextMenus.create({"title": sharemenutellafriend, "id": "totlshareemail", "contexts": contexts, "parentId": parent});
    chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartorshare", "contexts": contexts, "parentId": parent});
    var child2 = chrome.contextMenus.create({"title": sharemenusendatweet, "id": "totlsharetwitter", "contexts": contexts, "parentId": parent});
    var child3 = chrome.contextMenus.create({"title": sharemenupostonfacebook, "id": "totlsharefacebook", "contexts": contexts, "parentId": parent});
}

chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartor", "contexts": contexts});
try{
    // try show web browsers that do support "icons"
    // Firefox, Opera, Microsoft Edge
    chrome.contextMenus.create({"title": sharemenusubscribetitle, "type":"normal", "id": "totlsubscribe", "contexts":contexts, "icons": {"16": "images/IconYouTube.png","32": "images/IconYouTube@2x.png"}});
}
catch(e){
    // catch web browsers that do NOT show the icon
    // Google Chrome
    chrome.contextMenus.create({"title": sharemenusubscribetitle, "type":"normal", "id": "totlsubscribe", "contexts":contexts});
}

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
    var i;
    var l = contexts.length;
    for(i = 0; i < l; i++){
    var context = contexts[i];
    var videotitle = chrome.i18n.getMessage("videotitle");
    menuvideo = chrome.contextMenus.create({"title": videotitle, "type":"normal", "id": "totlvideo"+i, "contexts":[context]});
    contextarrayvideo.push(menuvideo);
    }

    // page
    var contexts = ["page","selection","link","editable","image","audio"];
    var i;
    var l = contexts.length;
    for(i = 0; i < l; i++){
    var context = contexts[i];
    var pagetitle = chrome.i18n.getMessage("pagetitle");
    menupage = chrome.contextMenus.create({"title": pagetitle, "type":"normal", "id": "totlpage"+i, "contexts":[context]});
    contextarraypage.push(menupage);
    }
    
    }
}

function removecontexmenus(){
    if(contextarrayvideo.length > 0){
        var i;
        var l = contextarrayvideo.length;
        for(i = 0; i < l; i++){
            if(contextarrayvideo[i] === undefined || contextarrayvideo[i] === null){}else{
            chrome.contextMenus.remove(contextarrayvideo[i]);
            }
        }
    }
    if(contextarraypage.length > 0){
        var i;
        var l = contextarraypage.length;
        for(i = 0; i < l; i++){
            if(contextarraypage[i] === undefined || contextarraypage[i] === null){}else{
            chrome.contextMenus.remove(contextarraypage[i]);
            }
        }
    }
    contextarrayvideo = [];
    contextarraypage = [];
    contextmenuadded = false;
}

chrome.storage.onChanged.addListener(function(changes, namespace){
        if(changes['contextmenus']){if(changes['contextmenus'].newValue == true){checkcontextmenus()}else{removecontexmenus()}}
        if(changes['icon']){if(changes['icon'].newValue){
            chrome.tabs.query({}, function(tabs){
            var i;
            var l = tabs.length;
                for(i = 0; i < l; i++){
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
            if(changes['ecosaver'].newValue){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefresheyelight" });
                        }
                    }
                }
            });
            }
        }
        if(changes['badge']){
            if(changes['badge'].newValue == true){checkbadge()}else{checkbadge()}
        }
        if(changes['autoplay'] || changes['mousespotlights'] || changes['autoplayDomains'] || changes['autoplaychecklistwhite'] || changes['autoplaychecklistblack'] || changes['autoplayonly'] || changes['aplay'] || changes['apause'] || changes['astop'] || changes['autoplaydelay'] || changes['autoplaydelaytime']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshautoplay" });
                        }
                    }
                }
            });
        }
        if(changes['videotool'] || changes['videotoolonly'] || changes['videotoolDomains'] || changes['videotoolchecklistwhite'] || changes['videotoolchecklistblack'] || changes['speedtoolbar'] || changes['videozoom'] || changes['visopacity'] || changes['videotoolcolor']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshvideotoolbar" });
                        }
                    }
                }
            });
        }
        if(changes['videovolume'] || changes['videovolumealt'] || changes['videovolumehold'] || changes['videovolumeposa'] || changes['videovolumeposb'] || changes['videovolumeposc'] || changes['videovolumecolor'] || changes['videovolumelabel'] || changes['videovolumesteps']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshmousescroll" });
                        }
                    }
                }
            });
        }
        if(changes['ambilight'] || changes['ambilightfixcolor'] || changes['ambilight4color'] || changes['ambilightvarcolor'] || changes['atmosvivid'] || changes['vpause'] || changes['atmosfpsauto'] || changes['atmosfpsmanual'] || changes['drawatmosfps'] || changes['ambilightcolorhex'] || changes['ambilight1colorhex'] || changes['ambilight2colorhex'] || changes['ambilight3colorhex'] || changes['ambilight4colorhex'] || changes['ambilightrangeblurradius'] || changes['ambilightrangespreadradius'] || changes['atmosontotlmode'] || changes['atmosphereonly'] || changes['atmosphereDomains']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "goenableatmos" });
                        }
                    }
                }
            });
        }
        if(changes['reflection'] || changes['reflectionamount']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshreflection" });
                        }
                    }
                }
            });
        }
        if(changes['hovervideo'] || changes['hovervideoamount']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshhovervideo" });
                        }
                    }
                }
            });
        }
        if(changes['playrate'] || changes['playrateamount']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshplayrate" });
                        }
                    }
                }
            });
        }
        if(changes['nightmodebck'] || changes['nightmodetxt'] || changes['nightmodehyperlink']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gonightmodecolors" });
                        }
                    }
                }
            });
        }
        if(changes['nighttheme'] || changes['lampandnightmode'] || changes['nightmodeswitchhide'] || changes['nightmodeswitchhidetime'] || changes['nightonly'] || changes['nightmodechecklistwhite'] || changes['nightmodechecklistblack'] || changes['nightDomains'] || changes['nightmodebydomain'] || changes['nightmodebypage'] || changes['nightactivetime'] || changes['nmbegintime'] || changes['nmendtime'] || changes['nightenabletheme'] || changes['nighthover'] || changes['nmtopleft'] || changes['nmtopright'] || changes['nmbottomright'] || changes['nmbottomleft'] || changes['nmcustom']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "goenablenightmode" });
                        }
                    }
                }
            });
        }
        if(changes['nightmodegesture']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshnightmodegesture" });
                        }
                    }
                }
            });
        }
        if(changes['ecosaver'] || changes['ecosavertime']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefresheyesaver" });
                        }
                    }
                }
            });
        }
        if(changes['nighttime'] || changes['begintime'] || changes['endtime']){
            chrome.tabs.query({}, function(tabs){
                var i;
                var l = tabs.length;
                for(i = 0; i < l; i++){
                    var protocol = tabs[i].url.split(":")[0];
                    if(protocol == "http" || protocol == "https"){
                        if(tabs[i].url != totloptionspage){
                            chrome.tabs.sendMessage(tabs[i].id, { action: "gorefreshnighttime" });
                        }
                    }
                }
            });
        }

        // Group Policy
        // check the values with group policy, if different values. Then change it back
        if(changes['autoplay']){
            if(policygrouparray.hasOwnProperty('AutoPlay')){
                if(changes['autoplay'].newValue != policygrouparray["AutoPlay"]){
                    chrome.storage.sync.set({ "autoplay": policygrouparray["AutoPlay"] });
                }
            }
        }
        if(changes['autostop']){
            if(policygrouparray.hasOwnProperty('AutoStop')){
                if(changes['autostop'].newValue != policygrouparray["AutoStop"]){
                chrome.storage.sync.set({ "autostop": policygrouparray["AutoStop"] });
                }
            }
        }
        if(changes['customqualityyoutube']){
            if(policygrouparray.hasOwnProperty('AutoHD')){
                if(changes['customqualityyoutube'].newValue != policygrouparray["AutoHD"]){
                chrome.storage.sync.set({ "customqualityyoutube": policygrouparray["AutoHD"] });
                }
            }
        }
        if(changes['maxquality']){
            if(policygrouparray.hasOwnProperty('AutoHDQuality')){
                if(changes['maxquality'].newValue != policygrouparray["AutoHDQuality"]){
                    chrome.storage.sync.set({ "maxquality": policygrouparray["AutoHDQuality"] });
                }
            }
        }
        if(changes['block60fps']){
            if(policygrouparray.hasOwnProperty('Block60FPS')){
                if(changes['block60fps'].newValue != policygrouparray["Block60FPS"]){
                chrome.storage.sync.set({ "block60fps": policygrouparray["Block60FPS"] });
                }
            }
        }
        if(changes['nighttheme']){
            if(policygrouparray.hasOwnProperty('NightModeSwitch')){
                if(changes['nighttheme'].newValue != policygrouparray["NightModeSwitch"]){
                chrome.storage.sync.set({ "nighttheme": policygrouparray["NightModeSwitch"] });
                }
            }
        }
        if(changes['videovolume']){
            if(policygrouparray.hasOwnProperty('MouseVolumeScroll')){
                if(changes['videovolume'].newValue != policygrouparray["MouseVolumeScroll"]){
                chrome.storage.sync.set({ "videovolume": policygrouparray["MouseVolumeScroll"] });
                }
            }
        }
        if(changes['videotool']){
            if(policygrouparray.hasOwnProperty('VideoToolbar')){
                if(changes['videotool'].newValue != policygrouparray["VideoToolbar"]){
                chrome.storage.sync.set({ "videotool": policygrouparray["VideoToolbar"] });
                }
            }
        }
});

// omnibox
var i18nomninightmode = chrome.i18n.getMessage("omninightmode").toLowerCase();
var i18nomnidaymode = chrome.i18n.getMessage("omnidaymode").toLowerCase();
var i18nomnilightoff = chrome.i18n.getMessage("omnilightoff").toLowerCase();
var i18nomnilighton = chrome.i18n.getMessage("omnilighton").toLowerCase();
var i18nomnihelp = chrome.i18n.getMessage("omnihelp").toLowerCase();
if(typeof chrome.omnibox !== 'undefined'){
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest){
        var suggtext;
        if(text == ""){suggtext="Turn Off the Lights"}else{suggtext=text}
        chrome.omnibox.setDefaultSuggestion({ description: suggtext });
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
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                var tab = tabs[0];
                chrome.tabs.sendMessage(tab.id, {action: "goinnightmode", value:"night"});
            });
        }else if(onmniresult == i18nomnidaymode){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                var tab = tabs[0];
                chrome.tabs.sendMessage(tab.id, {action: "goinnightmode", value:"day"});
            });
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

var analytics;var rest;
function checkbadge(){
    chrome.storage.sync.get(['analytics','badge'], function(items){
        if(items["analytics"]){
            analytics = items["analytics"];
            var resultObject = search(today, analytics);
            if(typeof resultObject === "undefined"){
                rest = "";
            }else{
                rest = JSON.stringify(resultObject["details"]["active"]);
            }
            if(items["badge"] == true){chrome.browserAction.setBadgeText({ text: rest }) }else{chrome.browserAction.setBadgeText({ text: "" })}
            chrome.browserAction.setBadgeBackgroundColor({ color: "#43A047"});
        }else{chrome.browserAction.setBadgeText({ text: "" })} // no data found, automatically clean this
    })
}

chrome.runtime.setUninstallURL(linkuninstall);

function initwelcome(){
chrome.storage.sync.get(['firstRun'], function(chromeset){
if((chromeset["firstRun"]!="false") && (chromeset["firstRun"]!=false)){
    chrome.tabs.create({url: linkwelcomepage, active:true});
    chrome.tabs.create({url: linkguide, active:false});
    var crrinstall = new Date().getTime();
    chrome.storage.sync.set({"firstRun": false, "version": "2.4", "firstDate": crrinstall});
    console.log("YES welcome page showed");
}else{
    console.log("NOTHING show up welcome page");
}
});
}

var policygrouparray = {};
chrome.runtime.onInstalled.addListener(function(details){
    if(chrome.storage.managed){
        new Promise((resolve, reject) => {
            console.log('Initial');

            chrome.storage.managed.get("SuppressWelcomePage", function(value) {
                if(value.SuppressWelcomePage === true){
                    console.log("de init SuppressWelcomePage TRUE");
                }else{
                    console.log("de init SuppressWelcomePage FALSE");
                }
            });
            
            chrome.storage.managed.get(function(items) {
                if (Object.keys(items).length == 0) {
                    console.log("No managed policy found. Consumer mode");
                    console.log("the object are: "+JSON.stringify(items));
                } else {
                    console.log("Managed policy found. Enterprise mode");
                    // save in memory
                    Object.keys(items).forEach(function(policyName){
                        policygrouparray[policyName] = items[policyName];
                    });
            
                    // saving group policy values
                    var savinggroup = {};
            
                    console.log("Managed policy items are=", items);
                    console.log("Managed policy suppress page=", items.SuppressWelcomePage);
                    if(items.SuppressWelcomePage == true){
                        var crrinstall = new Date().getTime();
                        savinggroup["firstRun"] = false;
                        savinggroup["firstDate"] = "2.4";
                        savinggroup["firstDate"] = crrinstall;
                    }
            
                    if(items.AutoPlay == true){savinggroup["autoplay"] = true;}
                    else if(items.AutoPlay == false){savinggroup["autoplay"] = false;}
            
                    if(items.AutoStop == true){savinggroup["autostop"] = true;}
                    else if(items.AutoStop == false){savinggroup["autostop"] = false;}
            
                    if(items.AutoHD == true){savinggroup["customqualityyoutube"] = true;}
                    else if(items.AutoHD == false){savinggroup["customqualityyoutube"] = false;}
            
                    if(items.AutoHDQuality != ""){savinggroup["maxquality"] = items.AutoHDQuality;}
            
                    if(items.Block60FPS == true){savinggroup["block60fps"] = true;}
                    else if(items.Block60FPS == false){savinggroup["block60fps"] = false;}
            
                    if(items.NightModeSwitch == true){savinggroup["nighttheme"] = true;}
                    else if(items.NightModeSwitch == false){savinggroup["nighttheme"] = false;}
            
                    if(items.MouseVolumeScroll == true){savinggroup["videovolume"] = true;}
                    else if(items.MouseVolumeScroll == false){savinggroup["videovolume"] = false;}
            
                    if(items.VideoToolbar == true){savinggroup["videotool"] = true;}
                    else if(items.VideoToolbar == false){savinggroup["videotool"] = false;}
            
                    // save total group policy
                    chrome.storage.sync.set(savinggroup, function(){
                        
                    });
                }
                resolve();
            });
        
        })
        .then(() => {
            // delay for GPO. Because after 2,5 seconds check if it need to show the welcome page
            console.log("delay check after 2.5s");
            window.setTimeout(function() {
                console.log("Check if it need to show the welcome page");
                initwelcome();
            }, 2500);
        })


        chrome.storage.managed.onChanged.addListener(function(changes, namespace){
            // save in memory
            Object.keys(changes).forEach(function(policyName){
                policygrouparray[policyName] = changes[policyName].newValue;
            });
    
            console.log("policy managed onchanged="+JSON.stringify(changes));
            // update saving group policy values
            var updatesavinggroup = {};
    
            if(changes['SuppressWelcomePage']){
                if(changes['SuppressWelcomePage'].newValue == true){
                    var crrinstall = new Date().getTime();
                    updatesavinggroup["firstRun"] = false;
                    updatesavinggroup["firstDate"] = "2.4";
                    updatesavinggroup["firstDate"] = crrinstall;
                }
            }
    
            if(changes['AutoPlay']){
                updatesavinggroup["autoplay"] = changes['AutoPlay'].newValue;
            }
            if(changes['AutoStop']){
                updatesavinggroup["autostop"] = changes['AutoStop'].newValue;
            }
            if(changes['AutoHD']){
                updatesavinggroup["customqualityyoutube"] = changes['AutoHD'].newValue;
            }
            if(changes['AutoHDQuality']){
                updatesavinggroup["maxquality"] = changes['AutoHDQuality'].newValue;
            }
            if(changes['Block60FPS']){
                updatesavinggroup["block60fps"] = changes['Block60FPS'].newValue;
            }
            if(changes['NightModeSwitch']){
                updatesavinggroup["nighttheme"] = changes['NightModeSwitch'].newValue;
            }
            if(changes['MouseVolumeScroll']){
                updatesavinggroup["videovolume"] = changes['MouseVolumeScroll'].newValue;
            }
            if(changes['VideoToolbar']){
                updatesavinggroup["videotool"] = changes['VideoToolbar'].newValue;
            }
    
            // update save total group policy
            chrome.storage.sync.set(updatesavinggroup);
        });
    }else{
        // browser with no support for chrome storage managed
        initwelcome();
    }
    checkbadge();
});
// first run - check the badge new value for this day
chrome.runtime.onStartup.addListener(checkbadge);

checkbadge();