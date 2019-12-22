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

function $(id) { return document.getElementById(id); }

var darkmode; var interval; var nighttheme; var lampandnightmode; var ambilight; var ambilightfixcolor; var ambilight4color; var ambilightvarcolor; var atmosvivid; var nightmodetxt; var nightmodebck; var nightmodehyperlink; var multiopacall; var multiopacsel; var multiopacityDomains; var firstDate; var optionskipremember; var firstsawrate;

function save_options(){
	chrome.storage.sync.set({"nighttheme":$('nighttheme').checked,"lampandnightmode":$('lampandnightmode').checked,"ambilight":$('ambilight').checked,"ambilightfixcolor":$('ambilightfixcolor').checked,"ambilight4color":$('ambilight4color').checked,"ambilightvarcolor":$('ambilightvarcolor').checked,"atmosvivid":$('atmosvivid').checked,"badge":$('badge').checked});
}

document.addEventListener('DOMContentLoaded', function(){
    chrome.storage.sync.get(['darkmode','interval','nighttheme','lampandnightmode','ambilight','ambilightfixcolor','ambilight4color','ambilightvarcolor','atmosvivid','nightmodebck','nightmodetxt','nightmodehyperlink','badge','multiopacall','multiopacsel','multiopacityDomains','firstDate','optionskipremember','firstsawrate'], function(items){
        darkmode = items['darkmode'];if(darkmode == null)darkmode = false; // default false
        interval = items['interval'];if(interval == null)interval = 80; // default 80%
        ambilight = items['ambilight'];if(ambilight == null)ambilight = false; // default false
        ambilightfixcolor = items['ambilightfixcolor'];if(ambilightfixcolor == null)ambilightfixcolor = true; // default true
        ambilight4color = items['ambilight4color'];if(ambilight4color == null)ambilight4color = false; // default false
        ambilightvarcolor = items['ambilightvarcolor'];if(ambilightvarcolor == null)ambilightvarcolor = false; // default false
        atmosvivid = items['atmosvivid'];if(atmosvivid == null)atmosvivid = false; // default false

        multiopacall = items['multiopacall'];if(multiopacall == null)multiopacall = true; // default true
        multiopacsel = items['multiopacsel'];if(multiopacsel == null)multiopacsel = false; // default false
        multiopacityDomains = items['multiopacityDomains'];
        if(typeof multiopacityDomains == "undefined" || multiopacityDomains == null){
            multiopacityDomains = JSON.stringify({'https://www.example.com': ["90"], 'https://www.nytimes.com': ["85"]});
        }
        multiopacityDomains = JSON.parse(multiopacityDomains);

        nighttheme = items['nighttheme'];if(nighttheme == null)nighttheme = false; // default false
        lampandnightmode = items['lampandnightmode'];if(lampandnightmode == null)lampandnightmode = false; // default false
        nightmodebck = items['nightmodebck'];if(nightmodebck == null)nightmodebck = "#1e1e1e"; // default #1e1e1e
        nightmodetxt = items['nightmodetxt'];if(nightmodetxt == null)nightmodetxt = "#ffffff"; // default #ffffff
        nightmodehyperlink = items['nightmodehyperlink'];if(nightmodehyperlink == null)nightmodehyperlink = "#ffffff"; // default #ffffff

        badge = items['badge'];if(badge == null)badge = false; // default false

        // dark mode
        if(darkmode == true){
            document.body.className = 'dark';
        } else{
            document.body.className = 'light';
        }

        var editzoom = interval;
        var editdone = false;
        if(multiopacall == true){
            // to nothing - regular thing
            if($("oslider")){$("oslider").value = interval;}
            if($("otext")){$("otext").innerText = interval;}
        }
        else{
            // multi opacity
            chrome.tabs.query({ active: true, currentWindow: true},
            function(tabs){
                var job = tabs[0].url;
                var currentURL = job.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];
                    var atbbuf = [];
                    var domain;
                    for(domain in multiopacityDomains){atbbuf.push(domain);atbbuf.sort();}
                    var i;
                    var l = atbbuf.length;
                    for(i = 0; i < l; i++){
                        if(atbbuf[i] == currentURL){
                            editzoom = multiopacityDomains[atbbuf[i]];
                            if($("oslider")){$("oslider").value = editzoom;}
                            if($("otext")){$("otext").innerText = editzoom;}
                            editdone = true;
                        }
                        if(i == atbbuf.length - 1){
                            if(editdone == false){
                                if($("oslider")){$("oslider").value = editzoom;}
                                if($("otext")){$("otext").innerText = editzoom;}
                            }
                        }
                    }
            });
        }

        if(nighttheme == true)$('nighttheme').checked = true;
        if(lampandnightmode == true)$('lampandnightmode').checked = true;
        if(ambilight == true)$('ambilight').checked = true;
        if(ambilightfixcolor == true)$('ambilightfixcolor').checked = true;
        if(ambilight4color == true)$('ambilight4color').checked = true;
		if(ambilightvarcolor == true)$('ambilightvarcolor').checked = true;
        if(atmosvivid == true)$('atmosvivid').checked = true;
        
        if(nightmodebck){nightmodebck = items['nightmodebck'];}
		else{nightmodebck = '#1e1e1e';}
		if(nightmodetxt){nightmodetxt = items['nightmodetxt'];}
		else{nightmodetxt = '#ffffff';}
		if(nightmodehyperlink){nightmodehyperlink = items['nightmodehyperlink'];}
        else{nightmodehyperlink = '#ffffff';}

        if(badge == true)$('badge').checked = true;

        if(optionskipremember){optionskipremember = items['optionskipremember'];}
        if(firstDate){firstDate = items['firstDate'];}
        if(firstsawrate){firstsawrate = items['firstsawrate'];}

        // final
        test();

        // show remember page
        var firstmonth = false;
        var currentDate = new Date().getTime();
        if(firstDate){
            var datestart = firstDate;
            var dateend = datestart + (30 * 24 * 60 * 60 * 1000);
            if(currentDate>=dateend){firstmonth = false;}
            else{firstmonth = true;}
        }else{
            chrome.storage.sync.set({"firstDate": currentDate});
            firstmonth = true;
        }

        if(firstmonth){
        // show nothing
        }else{
            if(optionskipremember != true){
                if(firstsawrate != true){
                    materialRateAlert(function(result){console.log(result)})
                    chrome.storage.sync.set({"firstsawrate": true});
                }
            }
        }
    });

    // Detect click / change to save the page and test it.
    var inputs = document.querySelectorAll('input');
    var i;
    var l = inputs.length;
    for(i = 0; i < l; i++){inputs[i].addEventListener('change', test);inputs[i].addEventListener('change', save_options);}

    $("tab1").addEventListener('click', function(){
        $("basicspanel").className = "";
        $("morepanel").className = "hidden";
        $("atmospanel").className = "hidden";
        $("analyticspanel").className = "hidden";

        $("tab1").className = "tabbutton tabhighlight";
        $("tab2").className = "tabbutton";
        $("tab3").className = "tabbutton";
        $("tab4").className = "tabbutton";
    },false);

    $("tab2").addEventListener('click', function(){
        $("basicspanel").className = "hidden";
        $("morepanel").className = "";
        $("atmospanel").className = "hidden";
        $("analyticspanel").className = "hidden";

        $("tab1").className = "tabbutton";
        $("tab2").className = "tabbutton tabhighlight";
        $("tab3").className = "tabbutton";
        $("tab4").className = "tabbutton";
    },false);

    $("tab3").addEventListener('click', function(){
        $("basicspanel").className = "hidden";
        $("morepanel").className = "hidden";
        $("atmospanel").className = "";
        $("analyticspanel").className = "hidden";

        $("tab1").className = "tabbutton";
        $("tab2").className = "tabbutton";
        $("tab3").className = "tabbutton tabhighlight";
        $("tab4").className = "tabbutton";
    },false);

    $("tab4").addEventListener('click', function(){
        $("basicspanel").className = "hidden";
        $("morepanel").className = "hidden";
        $("atmospanel").className = "hidden";
        $("analyticspanel").className = "";

        $("tab1").className = "tabbutton";
        $("tab2").className = "tabbutton"
        $("tab3").className = "tabbutton";
        $("tab4").className = "tabbutton tabhighlight";
    },false);

    var tempcurrentpopup = "";
    function handle(delta){
        tempcurrentpopup = document.getElementById("oslider").value;
        if(delta < 0){
            if(tempcurrentpopup != 0){ tempcurrentpopup -= Number(1); document.getElementById("oslider").value = tempcurrentpopup; }
	    }
	    else{
		    if(tempcurrentpopup <= 100){ tempcurrentpopup = Number(tempcurrentpopup) + Number(1);document.getElementById("oslider").value = tempcurrentpopup; }
        }
        opacitychange();
    }

    function wheel(event){
    var delta = 0;
    delta = event.deltaY;
    if(delta){ handle(delta); } // do the UP and DOWN job
    // prevent the mouse default actions using scroll
    if(event.preventDefault){ event.preventDefault(); }
	event.returnValue = false;
    }

    // mouse scroll
    $("oslider").addEventListener('wheel', wheel); // for modern
    $("oslider").addEventListener('change', opacitychange, false);
    $("oslider").addEventListener('input', opacitychange, false);

    $("color1a").addEventListener('click', colorchange);
    $("color1b").addEventListener('click', colorchange);
    $("color1c").addEventListener('click', colorchange);
    $("color1d").addEventListener('click', colorchange);
    $("color1e").addEventListener('click', colorchange);
    $("color1f").addEventListener('click', colorchange);
    $("color1g").addEventListener('click', colorchange);
    $("color1h").addEventListener('click', colorchange);

    $("color2a").addEventListener('click', colorchange);
    $("color2b").addEventListener('click', colorchange);
    $("color2c").addEventListener('click', colorchange);
    $("color2d").addEventListener('click', colorchange);
    $("color2e").addEventListener('click', colorchange);
    $("color2f").addEventListener('click', colorchange);
    $("color2g").addEventListener('click', colorchange);
    $("color2h").addEventListener('click', colorchange);

    $("color3a").addEventListener('click', colorchange);
    $("color3b").addEventListener('click', colorchange);
    $("color3c").addEventListener('click', colorchange);
    $("color3d").addEventListener('click', colorchange);
    $("color3e").addEventListener('click', colorchange);
    $("color3f").addEventListener('click', colorchange);
    $("color3g").addEventListener('click', colorchange);
    $("color3h").addEventListener('click', colorchange);

    $("color4a").addEventListener('click', colorchange);
    $("color4b").addEventListener('click', colorchange);
    $("color4c").addEventListener('click', colorchange);
    $("color4d").addEventListener('click', colorchange);
    $("color4e").addEventListener('click', colorchange);
    $("color4f").addEventListener('click', colorchange);
    $("color4g").addEventListener('click', colorchange);
    $("color4h").addEventListener('click', colorchange);

    $("color5a").addEventListener('click', colorchange);
    $("color5b").addEventListener('click', colorchange);
    $("color5c").addEventListener('click', colorchange);
    $("color5d").addEventListener('click', colorchange);
    $("color5e").addEventListener('click', colorchange);
    $("color5f").addEventListener('click', colorchange);
    $("color5g").addEventListener('click', colorchange);
    $("color5h").addEventListener('click', colorchange);

    $("color6a").addEventListener('click', colorchange);
    $("color6b").addEventListener('click', colorchange);
    $("color6c").addEventListener('click', colorchange);
    $("color6d").addEventListener('click', colorchange);
    $("color6e").addEventListener('click', colorchange);
    $("color6f").addEventListener('click', colorchange);
    $("color6g").addEventListener('click', colorchange);
    $("color6h").addEventListener('click', colorchange);

    $("btnlights").addEventListener('click', function(){
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tab){
            chrome.tabs.executeScript(tab.id, {file: "js/light.js"});
        });
    });

    $("colornightmodebck1").addEventListener('click', nightmodebckcolorchange);
    $("colornightmodebck2").addEventListener('click', nightmodebckcolorchange);
    $("colornightmodebck3").addEventListener('click', nightmodebckcolorchange);
    $("colornightmodebck4").addEventListener('click', nightmodebckcolorchange);
    $("colornightmodebck5").addEventListener('click', nightmodebckcolorchange);
    $("colornightmodebck6").addEventListener('click', nightmodebckcolorchange);
    $("colornightmodebck7").addEventListener('click', nightmodebckcolorchange);
    $("colornightmodebck8").addEventListener('click', nightmodebckcolorchange);

    $("colortitelnightmodetxt1").addEventListener('click', nightmodetextcolorchange);
    $("colortitelnightmodetxt2").addEventListener('click', nightmodetextcolorchange);
    $("colortitelnightmodetxt3").addEventListener('click', nightmodetextcolorchange);
    $("colortitelnightmodetxt4").addEventListener('click', nightmodetextcolorchange);
    $("colortitelnightmodetxt5").addEventListener('click', nightmodetextcolorchange);
    $("colortitelnightmodetxt6").addEventListener('click', nightmodetextcolorchange);
    $("colortitelnightmodetxt7").addEventListener('click', nightmodetextcolorchange);
    $("colortitelnightmodetxt8").addEventListener('click', nightmodetextcolorchange);

    $("colortitelnightmodehyperlink1").addEventListener('click', nightmodelinkcolorchange);
    $("colortitelnightmodehyperlink2").addEventListener('click', nightmodelinkcolorchange);
    $("colortitelnightmodehyperlink3").addEventListener('click', nightmodelinkcolorchange);
    $("colortitelnightmodehyperlink4").addEventListener('click', nightmodelinkcolorchange);
    $("colortitelnightmodehyperlink5").addEventListener('click', nightmodelinkcolorchange);
    $("colortitelnightmodehyperlink6").addEventListener('click', nightmodelinkcolorchange);
    $("colortitelnightmodehyperlink7").addEventListener('click', nightmodelinkcolorchange);
    $("colortitelnightmodehyperlink8").addEventListener('click', nightmodelinkcolorchange);

    $("btngonight").addEventListener('click', function(){
        chrome.tabs.executeScript(null,{code:"if(document.getElementById('stefanvdnightthemecheckbox')){document.getElementById('stefanvdnightthemecheckbox').click();}"});
    });
    $("btnoptions").addEventListener('click', function(){chrome.tabs.create({url: chrome.extension.getURL('options.html'), active:true})});
    $("btndonate").addEventListener('click', function(){chrome.tabs.create({url: donatewebsite, active:true})});
    $("btnauroraplayer").addEventListener('click', function(){chrome.tabs.create({url: linkauroraplayerapp, active:true})});
    $("analclick").addEventListener('click', function(){chrome.tabs.create({url: chrome.extension.getURL('options.html'), active:true})});
    $("analtotal").addEventListener('click', function(){chrome.tabs.create({url: chrome.extension.getURL('options.html'), active:true})});

    var stefanvdurl = developerwebsite;
    var stefanvdaacodeurl = encodeURIComponent(stefanvdurl);

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

    var analytics;
    var sharetext;
    chrome.storage.sync.get("analytics", function(items){
      if(items["analytics"]){
        analytics = items["analytics"];
        var resultObject = search(today, analytics);
        var rest = JSON.stringify(resultObject["details"]["active"]);
        if($("analclicktoday")){
        $("analclicktoday").innerText = rest;
        }

        var timeeverything = analytics.map(function(a){
            return a.details.time; // in minutes
        });
        var currentimeseconds = timeeverything.reduce(add, 0);
        function add(a,b){return a + b;}
        // current time
        var currenttimeinhours = currentimeseconds/3600;
        // default laptop 65W
        var kwhwithdark = currenttimeinhours * (65 * 0.6)/1000; // factor: power lower to 40%
        var kwhwithregu = currenttimeinhours * (65 * 1)/1000;
        var currentkwh = (kwhwithregu - kwhwithdark).toFixed(5);
        if($("analtotalsavedkwh")){
            var showwatt;
            if(currentkwh<0.01){
                currentkwh = currentkwh * 1000;
                currentkwh = parseFloat(Math.round(currentkwh * 100) / 100).toFixed(2);
                showwatt = currentkwh+"Wh";
            }
            else{
                showwatt = currentkwh+"kWh";
            }
        $("analtotalsavedkwh").innerText = showwatt;
        }
        sharetext = chrome.i18n.getMessage("shareanalyticenergy", ""+currentkwh+"");

        //kWh/hr
        var resultcomparedenergy;
        var x = currentkwh;
        switch(true){
            case (x < 0.01):
            resultcomparedenergy = chrome.i18n.getMessage('econothingthisyear');
                break;
            case (x >= 0.01 && x < 0.02):
            resultcomparedenergy = chrome.i18n.getMessage('ecothirtyminutes');
                break;
            case (x >= 0.02 && x < 0.04):
            resultcomparedenergy = chrome.i18n.getMessage('ecowatchtvfortwo'); // 2 hours of television on a 49” LCD screen
                break;
            case (x >= 0.04 && x < 0.06):
            resultcomparedenergy = chrome.i18n.getMessage('ecotoastermaking');
                break;
            case (x >= 0.06 && x < 0.12):
            resultcomparedenergy = chrome.i18n.getMessage('ecochargeiphone');// iPhone 6 up to 4 times
                break;
            case (x >= 0.12 && x < 0.15):
            resultcomparedenergy = chrome.i18n.getMessage('ecobrewsomecoffee');
                break;
            case (x >= 0.15 && x < 0.19):
            resultcomparedenergy = chrome.i18n.getMessage('ecoplayingxbox'); // One hour of gaming gaming
                break;
            case (x >= 0.19 && x < 0.25):
            resultcomparedenergy = chrome.i18n.getMessage('ecovacuumingfor');
                break;
            case (x >= 0.25 && x < 0.3):
            resultcomparedenergy = chrome.i18n.getMessage('ecoblowdrying');
                break;
            case (x >= 0.3 && x < 0.48):
            resultcomparedenergy = chrome.i18n.getMessage('ecowashingclothes');
                break;
            case (x >= 0.48 && x < 0.5):
            resultcomparedenergy = chrome.i18n.getMessage('ecowififoraday'); // over a 24h
                break;
            case (x >= 0.5 && x < 0.55):
            resultcomparedenergy = chrome.i18n.getMessage('ecorunningdishwasher');
                break;
            case (x >= 0.55 && x < 0.6):
            resultcomparedenergy = chrome.i18n.getMessage('ecochargelaptop'); // up to 2 times
                break;
            case (x >= 0.6 && x < 1.53):
            resultcomparedenergy = chrome.i18n.getMessage('ecokeeplightonforsix'); // Six hours of 10 LED indoor light bulbs at 10 watts
                break;
            case (x >= 1.53 && x < 2.5):
            resultcomparedenergy = chrome.i18n.getMessage('ecokeepfridgeday'); // a medium size
                break;
            case (x >= 2.5 && x < 3):
            resultcomparedenergy = chrome.i18n.getMessage('ecoloadlaundry');
                break;
            case (x >= 3 && x < 18):
            resultcomparedenergy = chrome.i18n.getMessage('ecoheatingtenshower');
                break;
            case (x >= 18 && x < 7.6):
            resultcomparedenergy = chrome.i18n.getMessage('ecotwentyfourghome'); // over a 24h
                break;
            case (x >= 7.6 && x < 85):
            resultcomparedenergy = chrome.i18n.getMessage('ecochargeteslacar'); // Top off your EV 7.6 kWh will fuel approximately 20 miles of driving in a Model S
                break;
            case (x >= 85 && x < 255):
            resultcomparedenergy = chrome.i18n.getMessage('ecochargeteslacarhundred'); // tesla Model S 85 KWh
                break;
            case (x >= 255 && x < 515):
            resultcomparedenergy = chrome.i18n.getMessage('ecochargeteslathreetimes'); // tesla Model S 85 KWh
                break;
            case (x >= 515 && x < 602):
            resultcomparedenergy = chrome.i18n.getMessage('ecopowerhawaiimonth'); // Hawaii – 515 kWh Per Month
                break;
            case (x >= 602  && x < 813):
            resultcomparedenergy = chrome.i18n.getMessage('ecopowernwymonth'); // New York – 602 kWh Per Month
                break;
            case (x >= 557 && x < 813):
            resultcomparedenergy = chrome.i18n.getMessage('ecopowercamonth'); // California – 557 kWh Per Month
                break;
            case (x >= 813 && x < 1589):
            resultcomparedenergy = chrome.i18n.getMessage('ecopowerbaseballgame'); // 813 kWh
                break;
            case (x >= 1589 && x < 6714):
            resultcomparedenergy = chrome.i18n.getMessage('ecopowereiffeltower');
                break;
            case (x >= 6714 && x < 8856):
            resultcomparedenergy = chrome.i18n.getMessage('ecopowereurostar'); // Eurostar Brussels to London 373km with 18kWh/km = 6714kWh total length
                break;
            case (x >= 8856 && x < 580000):
            resultcomparedenergy = chrome.i18n.getMessage('ecopowereurostarparis'); // Eurostar Paris to London 492 km with 18kWh/km = 8856 total length
                break;
            case (x >= 580000 && x < 5759190781):
            resultcomparedenergy = chrome.i18n.getMessage('ecoeiffeltoweryear'); // 580000 KWh/year
                break;
            case (x >= 5759190781 && x < 69614488162):
            resultcomparedenergy = chrome.i18n.getMessage('ecosfoyear'); // SFO 5759190781 KWh/year in 2016
                break;
            case (x >= 69614488162 && x < 70000000000):
            resultcomparedenergy = chrome.i18n.getMessage('ecolayear'); // LA 69614488162 KWh/year in 2016
                break;
            default:
            resultcomparedenergy = chrome.i18n.getMessage('ecoplanetearth');
                break;
        }

        $("energycompared").innerText = resultcomparedenergy;
      }
    });

    $("shareboxfacebook").addEventListener("click", function(){window.open("https://www.facebook.com/sharer.php?u="+ stefanvdurl + "&t=" + sharetext + "", 'Share to Facebook','width=600,height=460,menubar=no,location=no,status=no');});
    $("shareboxtwitter").addEventListener("click", function(){window.open("https://twitter.com/share?url=" + stefanvdaacodeurl + "&text=" + sharetext + "&via=turnoffthelight", 'Share to Twitter','width=600,height=460,menubar=no,location=no,status=no');});
    
    $("energybox").addEventListener('click', function(){chrome.tabs.create({url: chrome.extension.getURL('options.html'), active:true})});

    // rate
    function materialRateAlert(callback){
        document.getElementById('materialModalRate').className = 'show';
        document.getElementById('materialModalRate').setAttribute('aria-disabled', "false");   
    }
    function closeMaterialRateAlert(e, result){
        e.stopPropagation();
        document.getElementById('materialModalRate').className = 'hide';
        document.getElementById('materialModalRate').setAttribute('aria-disabled', "true");   
    }

    $("materialModalRateButtonOK").addEventListener('click', function(e){
        closeMaterialRateAlert(e, true);
        window.open(writereview);chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version});
    });
    $("materialModalRateButtonCANCEL").addEventListener('click', function(e){
        closeMaterialRateAlert(e, false);
        chrome.storage.sync.set({"firstsawrate": false});
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace){
        if(changes['nighttheme']){
            if(changes['nighttheme'].newValue == true){
                $('btngonight').disabled = false;
                $('lampandnightmode').disabled = false;
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenablenightmode" });
                    });
                });
            }else{
                $('btngonight').disabled = true;
                $('lampandnightmode').disabled = true;
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenablenightmode" });
                    });
                });
            }
        }
        if(changes['lampandnightmode']){
            if(changes['lampandnightmode'].newValue == true){
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenablenightmode" });
                    });
                });
            }else{
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenablenightmode" });
                    });
                });
            }
        }

        if(changes['ambilight']){
            if(changes['ambilight'].newValue == true){
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }else{
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }
        }
        if(changes['ambilightfixcolor']){
            if(changes['ambilightfixcolor'].newValue == true){
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }else{
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }
        }
        if(changes['ambilight4color']){
            if(changes['ambilight4color'].newValue == true){
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }else{
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }
        }
        if(changes['ambilightvarcolor']){
            if(changes['ambilightvarcolor'].newValue == true){
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }else{
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }
        }
        if(changes['atmosvivid']){
            if(changes['atmosvivid'].newValue == true){
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }else{
                chrome.tabs.query({},function(tabs){
                    tabs.forEach(function(tab){
                      chrome.tabs.sendMessage(tab.id, { action: "goenableatmos" });
                    });
                });
            }
        }
 })

function test(){
    if($('nighttheme').checked == true){
        $('btngonight').disabled = false;
        $('lampandnightmode').disabled = false;
    }
    else{
        $('btngonight').disabled = true;
        $('lampandnightmode').disabled = true;
    }

    if($('ambilight').checked == true){
        $('ambilightfixcolor').disabled = false;
        $('ambilight4color').disabled = false;
        $('ambilightvarcolor').disabled = false;
        if($('ambilightvarcolor').checked){$('atmosvivid').disabled = false;}
        else{$('atmosvivid').disabled = true;}
    }else{
        $('ambilightfixcolor').disabled = true;
        $('ambilight4color').disabled = true;
        $('ambilightvarcolor').disabled = true;
        if($('ambilightvarcolor').checked){$('atmosvivid').disabled = true;}
        else{$('atmosvivid').disabled = true;}
    }
}

function colorchange(){
    var elem = this;
    var bckbutton = window.getComputedStyle(elem, null).getPropertyValue("background-color");
    chrome.storage.sync.set({"lightcolor": rgb2hex(bckbutton), "lightimagea": false, "lightimagen": true, "lightimagelin": false});
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tab){
        chrome.tabs.executeScript(tab.id,{code:"var div = document.getElementsByTagName('div');var i;var l = div.length;for(i = 0; i < l; i++){if(div[i].className == ('stefanvdlightareoff')){div[i].style.background = '"+bckbutton+"';}}"});
    });
}

function opacitychange(e){
    var thatvalue = $("oslider").value;
    $("otext").innerText = thatvalue;
    chrome.storage.sync.set({"interval": thatvalue});
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tab){
        chrome.tabs.executeScript(tab.id,{code:"var div = document.getElementsByTagName('div');var i;var l = div.length;for(i = 0; i < l; i++){if(div[i].className == ('stefanvdlightareoff')){div[i].style.opacity = ("+thatvalue+"/100);}}"});
    });
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function nightmodebckcolorchange(){
    var elem = this;
    nightmodebck = window.getComputedStyle(elem, null).getPropertyValue("background-color");

    chrome.storage.sync.set({"nightmodebck": rgb2hex(nightmodebck)});
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tab){
        chrome.tabs.executeScript(tab.id,{code:"if(document.getElementById('totlnightmodestyle')){document.getElementById('totlnightmodestyle').innerText = '.stefanvdnightbck{background:"+nightmodebck+"!important;background-color:"+nightmodebck+"!important;}.stefanvdnight{color:"+nightmodetxt+"!important;}.stefanvdnight a{color:"+nightmodehyperlink+"!important}.stefanvdnight a *{color:"+nightmodehyperlink+"!important}';};"});
    });

    // if something change
    // update the Night Mode colors to content.js script
    chrome.tabs.query({},function(tabs){
        tabs.forEach(function(tab){
          chrome.tabs.sendMessage(tab.id, { action: "gonewnightmode" });
        });
    });
}

function nightmodetextcolorchange(){
    var elem = this;
    nightmodetxt = window.getComputedStyle(elem, null).getPropertyValue("background-color");

    chrome.storage.sync.set({"nightmodetxt": rgb2hex(nightmodetxt)});
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tab){
        chrome.tabs.executeScript(tab.id,{code:"if(document.getElementById('totlnightmodestyle')){document.getElementById('totlnightmodestyle').innerText = '.stefanvdnightbck{background:"+nightmodebck+"!important;background-color:"+nightmodebck+"!important;}.stefanvdnight{color:"+nightmodetxt+"!important;}.stefanvdnight a{color:"+nightmodehyperlink+"!important}.stefanvdnight a *{color:"+nightmodehyperlink+"!important}';};"});
    });

    // if something change
    // update the Night Mode colors to content.js script
    chrome.tabs.query({},function(tabs){
        tabs.forEach(function(tab){
          chrome.tabs.sendMessage(tab.id, { action: "gonewnightmode" });
        });
    });
}

function nightmodelinkcolorchange(){
    var elem = this;
    nightmodehyperlink = window.getComputedStyle(elem, null).getPropertyValue("background-color");

    chrome.storage.sync.set({"nightmodehyperlink": rgb2hex(nightmodehyperlink)});
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tab){
        chrome.tabs.executeScript(tab.id,{code:"if(document.getElementById('totlnightmodestyle')){document.getElementById('totlnightmodestyle').innerText = '.stefanvdnightbck{background:"+nightmodebck+"!important;background-color:"+nightmodebck+"!important;}.stefanvdnight{color:"+nightmodetxt+"!important;}.stefanvdnight a{color:"+nightmodehyperlink+"!important}.stefanvdnight a *{color:"+nightmodehyperlink+"!important}';};"});
    });

    // if something change
    // update the Night Mode colors to content.js script
    chrome.tabs.query({},function(tabs){
        tabs.forEach(function(tab){
          chrome.tabs.sendMessage(tab.id, { action: "gonewnightmode" });
        });
    });
}