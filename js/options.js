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

function $(id){ return document.getElementById(id); }
var default_opacity = 80;
var default_arangeblur = 70;
var default_arangespread = 20;
var youtubeembed = "https://www.youtube.com/embed/?listType=playlist&list=PLF155F53B3D8D07CB";
var darkmode = false;

window.addEventListener("message", (event) => {
	if(event.origin == "https://www.turnoffthelights.com"){
    if(event.source == window &&
        event.data &&
        event.data.direction == "from-page-script"){
        //alert("Content script received message: \"" + event.data.message + "\"");
        var myid = chrome.runtime.id;
        var myversion = chrome.runtime.getManifest().version;
        window.postMessage({
            direction: "from-totl-script",
            message: myid,
            version: myversion
        }, "https://www.turnoffthelights.com");
    }
    }
});

// Option to save current value to chrome.storage
function save_options(){
    chrome.runtime.sendMessage({name: "getallpermissions"});

    var ytselq = document.getElementById("youtubequality");
    var html5volumesteps = document.getElementById("videovolumesteps");
    var linearsq = document.getElementById("linearsq");
    var webspeechlang = document.getElementById("select_language");
    if(webspeechlang.selectedIndex != -1){var savewebspeechlang = webspeechlang.options[webspeechlang.selectedIndex].value;}
    var webspeechcountry = document.getElementById("select_dialect");
    if(webspeechcountry.selectedIndex != -1){var savewebspeechcountry = webspeechcountry.options[webspeechcountry.selectedIndex].value;}

    // Excluded domains
    var excludedDomainsBox = $("excludedDomainsBox");
    var excludedDomains = {};
    var i;
    var l = excludedDomainsBox.length;
    for(i = 0; i < l; i++){excludedDomains[excludedDomainsBox.options[i].value] = true;}
	
    // autoplay Excluded domains
    var autoplayDomainsBox = $("autoplayDomainsBox");
    var autoplayDomains = {};
    var i;
    var l = autoplayDomainsBox.length;
    for(i = 0; i < l; i++){autoplayDomains[autoplayDomainsBox.options[i].value] = true;}
	
    // atmosphere Excluded domains
    var atmosphereDomainsBox = $("atmosphereDomainsBox");
    var atmosphereDomains = {};
    var i;
    var l = atmosphereDomainsBox.length;
    for(i = 0; i < l; i++){atmosphereDomains[atmosphereDomainsBox.options[i].value] = true;}
	
    // night Excluded domains
    var nightDomainsBox = $("nightDomainsBox");
    var nightDomains = {};
    var i;
    var l = nightDomainsBox.length;
    for(i = 0; i < l; i++){nightDomains[nightDomainsBox.options[i].value] = true;}
	
    // cammotion Excluded domains
    var cammotionDomainsBox = $("cammotionDomainsBox");
    var cammotionDomains = {};
    var i;
    var l = cammotionDomainsBox.length;
    for(i = 0; i < l; i++){cammotionDomains[cammotionDomainsBox.options[i].value] = true;}
	
    // speech Excluded domains
    var speechDomainsBox = $("speechDomainsBox");
    var speechDomains = {};
    var i;
    var l = speechDomainsBox.length;
    for(i = 0; i < l; i++){speechDomains[speechDomainsBox.options[i].value] = true;}
	
    // autostop Excluded domains
    var autostopDomainsBox = $("autostopDomainsBox");
    var autostopDomains = {};
    var i;
    var l = autostopDomainsBox.length;
    for(i = 0; i < l; i++){autostopDomains[autostopDomainsBox.options[i].value] = true;}
	
    // videotool Excluded domains
    var videotoolDomainsBox = $("videotoolDomainsBox");
    var videotoolDomains = {};
    var i;
    var l = videotoolDomainsBox.length;
    for(i = 0; i < l; i++){videotoolDomains[videotoolDomainsBox.options[i].value] = true;}

    // multiopacity Excluded domains
    var multiopacityDomainsBox = $("multiopacityDomainsBox");
    var multiopacitynumberBox = $("multiopacitynumberBox");
    var websitemulti = {};
    var i;
    var l = multiopacityDomainsBox.length;
    for(i = 0; i < l; i++){
      var getnumber = multiopacitynumberBox.options[i].text;
      websitemulti[multiopacityDomainsBox.options[i].value] = getnumber;
    }

	chrome.storage.sync.set({"interval":$('interval').value,"lightcolor":$('lightcolor').value,"autoplay":$('autoplay').checked,"playlist":$('playlist').checked,"flash":$('flash').checked,"head":$('head').checked,"fadein":$('fadein').checked,"fadeout":$('fadeout').checked,"infobar":$('infobar').checked,"sharebutton":$('sharebutton').checked,"likebutton":$('likebutton').checked,"readera":$('readera').checked,"readern":$('readern').checked,"shortcutlight":$('shortcutlight').checked,"eyea":$('eyea').checked,"eyen":$('eyen').checked,"suggestions":$('suggestions').checked,"videoheadline":$('videoheadline').checked,"eastereggs":$('eastereggs').checked,"contextmenus":$('contextmenus').checked,"viewcount":$('viewcount').checked,"lightimage":$('lightimage').value,"lightimagea":$('lightimagea').checked,"lightimagen":$('lightimagen').checked,"eyealist":$('eyealist').checked,"mousespotlighto":$('mousespotlighto').checked,"mousespotlighta":$('mousespotlighta').checked,"mousespotlightc":$('mousespotlightc').checked,"nighttime":$('nighttime').checked,"begintime":$('begintime').value,"endtime":$('endtime').value,"addvideobutton":$('addvideobutton').checked,"likebar":$('likebar').checked,"ambilight":$('ambilight').checked,"ambilightrangeblurradius":$('ambilightrangeblurradius').value,"ambilightrangespreadradius":$('ambilightrangespreadradius').value,"mousespotlightt":$('mousespotlightt').checked,"ambilightfixcolor":$('ambilightfixcolor').checked,"ambilightvarcolor":$('ambilightvarcolor').checked,"ambilightcolorhex":$('ambilightcolorhex').value,"ambilight4color":$('ambilight4color').checked,"ambilight1colorhex":$('ambilight1colorhex').value,"ambilight2colorhex":$('ambilight2colorhex').value,"ambilight3colorhex":$('ambilight3colorhex').value,"ambilight4colorhex":$('ambilight4colorhex').value,"password":$('password').checked,"enterpassword":$('enterpassword').value,"noflash":$('noflash').checked,"hardflash":$('hardflash').checked,"ecosaver":$('ecosaver').checked,"ecosavertime":$('ecosavertime').value,"dynamic":$('dynamic').checked,"dynamic1":$('dynamic1').checked,"dynamic2":$('dynamic2').checked,"dynamic3":$('dynamic3').checked,"dynamic4":$('dynamic4').checked,"dynamic5":$('dynamic5').checked,"dynamic6":$('dynamic6').checked,"dynamic7":$('dynamic7').checked,"dynamic8":$('dynamic8').checked,"dynamic9":$('dynamic9').checked,"dynamic10":$('dynamic10').checked,"hoveroptiondyn5":$('hoveroptiondyn5').checked,"autoplayonly":$('autoplayonly').checked,"blur":$('blur').checked,"maxquality":ytselq.options[ytselq.selectedIndex].value,"autowidthyoutube":$('autowidthyoutube').checked,"customqualityyoutube":$('customqualityyoutube').checked,"cinemaontop":$('cinemaontop').checked,"alllightsoff":$('alllightsoff').checked,"spotlightradius":$('spotlightradius').value,"atmosphereonly":$('atmosphereonly').checked,"optionskipremember":$('optionskipremember').checked,"nighttheme":$('nighttheme').checked,"nightonly":$('nightonly').checked,"nightenabletheme":$('nightenabletheme').checked,"autoplaydelay":$('autoplaydelay').checked,"autoplaydelaytime":$('autoplaydelaytime').value,"motion":$('motion').checked,"lightimagelin":$('lightimagelin').checked,"linearsq":linearsq.options[linearsq.selectedIndex].value,"colora":$('colora').value,"intervallina":$('intervallina').value,"colorb":$('colorb').value,"intervallinb":$('intervallinb').value,"speech":$('speech').checked,"speechlang":savewebspeechlang,"speechcountry":savewebspeechcountry,"atmosvivid":$('atmosvivid').checked,"cammotiononly":$('cammotiononly').checked,"speechonly":$('speechonly').checked,"autoplaychecklistwhite":$('autoplaychecklistwhite').checked,"autoplaychecklistblack":$('autoplaychecklistblack').checked,"autostop":$('autostop').checked,"autostoponly":$('autostoponly').checked,"autostopchecklistwhite":$('autostopchecklistwhite').checked,"autostopchecklistblack":$('autostopchecklistblack').checked,"nighthover":$('nighthover').checked,"nightmodechecklistwhite":$('nightmodechecklistwhite').checked,"nightmodechecklistblack":$('nightmodechecklistblack').checked,"nmtopleft":$('nmtopleft').checked,"nmtopright":$('nmtopright').checked,"nmbottomright":$('nmbottomright').checked,"nmbottomleft":$('nmbottomleft').checked,"nmcustom":$('nmcustom').checked,"nightactivetime":$('nightactivetime').checked,"nmbegintime":$('nmbegintime').value,"nmendtime":$('nmendtime').value,"lampandnightmode":$('lampandnightmode').checked,"eyechecklistwhite":$('eyechecklistwhite').checked,"eyechecklistblack":$('eyechecklistblack').checked,"nightmodebck":$('nightmodebck').value,"nightmodetxt":$('nightmodetxt').value,"no360youtube":$('no360youtube').checked,"videotool":$('videotool').checked,"reflection":$('reflection').checked,"reflectionamount":$('reflectionamount').value,"videotoolonly":$('videotoolonly').checked,"videotoolchecklistwhite":$('videotoolchecklistwhite').checked,"videotoolchecklistblack":$('videotoolchecklistblack').checked,"nightmodehyperlink":$('nightmodehyperlink').value,"block60fps":$('block60fps').checked,"excludedDomains":JSON.stringify(excludedDomains),"autoplayDomains":JSON.stringify(autoplayDomains),"atmosphereDomains":JSON.stringify(atmosphereDomains),"nightDomains":JSON.stringify(nightDomains),"cammotionDomains":JSON.stringify(cammotionDomains),"speechDomains":JSON.stringify(speechDomains),"autostopDomains":JSON.stringify(autostopDomains),"videotoolDomains":JSON.stringify(videotoolDomains),"videovolume":$('videovolume').checked,"videovolumecolor":$('videovolumecolor').value,"videovolumesteps":html5volumesteps.options[html5volumesteps.selectedIndex].value,"videovolumelabel":$('videovolumelabel').checked,"icon":$("btnpreview").getAttribute("data-icon"),"visopacity":$('visopacity').value,"videotoolcolor":$('videotoolcolor').value,"hovervideo":$('hovervideo').checked,"hovervideoamount":$('hovervideoamount').value,"mousespotlights":$('mousespotlights').checked,"drawatmosfps":$('drawatmosfps').value,"aplay":$('aplay').checked,"apause":$('apause').checked,"astop":$('astop').checked,"videozoom":$('videozoom').checked,"playrate":$('playrate').checked,"playrateamount":$('playrateamount').value,"speedtoolbar":$('speedtoolbar').checked,"atmosontotlmode":$('atmosontotlmode').checked,"titleinvertcolor":$('titleinvertcolor').value,"vpause":$('vpause').checked,"darkbrowsertheme":$('darkbrowsertheme').checked,"autostopred":$('autostopred').checked,"autostoptrans":$('autostoptrans').checked,"videovolumeposa":$('videovolumeposa').checked,"videovolumeposb":$('videovolumeposb').checked,"videovolumeposc":$('videovolumeposc').checked,"videovolumehold":$('videovolumehold').checked,"multiopacall":$('multiopacall').checked,"multiopacsel":$('multiopacsel').checked,"multiopacityDomains":JSON.stringify(websitemulti),"videovolumealt":$('videovolumealt').checked,"nightmodebydomain":$('nightmodebydomain').checked,"nightmodebypage":$('nightmodebypage').checked,"seeanalytics":$('seeanalytics').checked,"nightmodegesture":$('nightmodegesture').checked,"nightmodeswitchhide":$('nightmodeswitchhide').checked,"nightmodeswitchhidetime":$('nightmodeswitchhidetime').value});
}

var firstdefaultvalues = {};
// Option default value to read if there is no current value from chrome.storage AND init default value
chrome.storage.sync.get(['fadein','fadeout','readera','readern','lightimagea','lightimagen','mousespotlighta','mousespotlightc','mousespotlighto','mousespotlightt','eyea','eyen','eyealist','interval','ambilightrangeblurradius','ambilightrangespreadradius','ambilightvarcolor','ambilightfixcolor','ambilight4color','flash','noflash','noflash','dynamic1','dynamic2','dynamic3','dynamic4','dynamic5','dynamic6','dynamic7','dynamic8','dynamic9','dynamic10','hoveroptiondyn5','maxquality','autoplaychecklistwhite','autoplaychecklistblack','autostopchecklistwhite','autostopchecklistblack','videotoolchecklistwhite','videotoolchecklistblack','nightmodechecklistwhite','nightmodechecklistblack','nmtopleft','nmtopright','nmbottomright','nmbottomleft','nmcustom','eyechecklistwhite','eyechecklistblack','videovolumesteps','videovolumelabel','mousespotlights','aplay','apause','astop','autostopred','autostoptrans','videovolumeposa','videovolumeposb','videovolumeposc','multiopacall','multiopacsel','nightmodebydomain','nightmodebypage','seeanalytics'], function(items){
    // find no localstore fadein
	if(items['fadein'] == null){firstdefaultvalues['fadein'] = true;}
    // find no localstore fadeout
	if(items['fadeout'] == null){firstdefaultvalues['fadeout'] = true;}
    // find no localstore reader
	if(items['readera'] == null && items['readern'] == null){firstdefaultvalues['readern'] = true;firstdefaultvalues['readera'] = false;}
    // find no localstore lightimage
	if(items['lightimagea'] == null && items['lightimagen'] == null){firstdefaultvalues['lightimagen'] = true;firstdefaultvalues['lightimagea'] = false;}
    // find no localstore mouse
	if(items['mousespotlighta'] == null && items['mousespotlightc'] == null && items['mousespotlighto'] == null && items['mousespotlightt'] == null && items['mousespotlights'] == null ){firstdefaultvalues['mousespotlighto'] = true;firstdefaultvalues['mousespotlightc'] = false;firstdefaultvalues['mousespotlighta'] = false;firstdefaultvalues['mousespotlightt'] = false;firstdefaultvalues['mousespotlights'] = false;}
    // find no localstore eye
	if(items['eyea'] == null && items['eyen'] == null && items['eyealist'] == null){firstdefaultvalues['eyen'] = true;firstdefaultvalues['eyea'] = false;firstdefaultvalues['eyealist'] = false;}
    
    // find no default value
	if(items['interval']){default_opacity = items['interval'];}
    // find and use default ambilight blur radius
	if(items['ambilightrangeblurradius']){default_arangeblur = items['ambilightrangeblurradius'];}
    // find and use default ambilight spread radius
	if(items['ambilightrangespreadradius']){default_arangespread = items['ambilightrangespreadradius'];}
    
    // find no localstore atmos
	if(items['ambilightvarcolor'] == null && items['ambilightfixcolor'] == null && items['ambilight4color'] == null){firstdefaultvalues['ambilightfixcolor'] = true;firstdefaultvalues['ambilightvarcolor'] = false;firstdefaultvalues['ambilight4color'] = false;}
    // find no localstore flash
	if(items['flash'] == null && items['noflash'] == null && items['noflash'] == null){firstdefaultvalues['noflash'] = true;firstdefaultvalues['flash'] = false;firstdefaultvalues['hardflash'] = false;}
    // find no localstore dynamic
	if(items['dynamic1'] == null && items['dynamic2'] == null && items['dynamic3'] == null && items['dynamic4'] == null && items['dynamic5'] == null && items['dynamic6'] == null && items['dynamic7'] == null && items['dynamic8'] == null && items['dynamic9'] == null && items['dynamic10'] == null){firstdefaultvalues['dynamic1'] = true;firstdefaultvalues['dynamic2'] = false;firstdefaultvalues['dynamic3'] = false;firstdefaultvalues['dynamic4'] = false;firstdefaultvalues['dynamic5'] = false;firstdefaultvalues['dynamic6'] = false;firstdefaultvalues['dynamic7'] = false;firstdefaultvalues['dynamic8'] = false;firstdefaultvalues['dynamic9'] = false;firstdefaultvalues['dynamic10'] = false;}
    // find no localstore hoverdyn
	if(items['hoveroptiondyn5'] == null){firstdefaultvalues['hoveroptiondyn5'] = true;}
    // find no localstore maxquality
	if(items['maxquality'] == null){firstdefaultvalues['maxquality'] = 'hd1080';}
    // find no localstore autoplay whitelist
	if(items['autoplaychecklistwhite'] == null && items['autoplaychecklistblack'] == null){firstdefaultvalues['autoplaychecklistwhite'] = true;firstdefaultvalues['autoplaychecklistblack'] = false;}
    // find no localstore autostop whitelist
	if(items['autostopchecklistwhite'] == null && items['autostopchecklistblack'] == null){firstdefaultvalues['autostopchecklistwhite'] = true;firstdefaultvalues['autostopchecklistblack'] = false;}
    // find no localstore videotool whitelist
	if(items['videotoolchecklistwhite'] == null && items['videotoolchecklistblack'] == null){firstdefaultvalues['videotoolchecklistwhite'] = true;firstdefaultvalues['videotoolchecklistblack'] = false;}
    // find no localstore nightmode whitelist
	if(items['nightmodechecklistwhite'] == null && items['nightmodechecklistblack'] == null){firstdefaultvalues['nightmodechecklistwhite'] = true;firstdefaultvalues['nightmodechecklistblack'] = false;}
    // find no localstore eye
	if(items['nmtopleft'] == null && items['nmtopright'] == null && items['nmbottomright'] == null && items['nmbottomleft'] == null && items['nmcustom'] == null){firstdefaultvalues['nmtopleft'] = false;firstdefaultvalues['nmtopright'] = false;firstdefaultvalues['nmbottomright'] = false;firstdefaultvalues['nmbottomleft'] = true;firstdefaultvalues['nmcustom'] = false;}
    // find no localstore eye whitelist
	if(items['eyechecklistwhite'] == null && items['eyechecklistblack'] == null){firstdefaultvalues['eyechecklistwhite'] = true;firstdefaultvalues['eyechecklistblack'] = false;}

    // find no localstore volume steps
    if(items['videovolumesteps'] == null){firstdefaultvalues['videovolumesteps'] = 5;}
    // find no localstore volume label
    if(items['videovolumelabel'] == null){firstdefaultvalues['videovolumelabel'] = true;}

    // find no localstore a play pause and stop button
    if(items['aplay'] == null){firstdefaultvalues['aplay'] = true;}
    if(items['apause'] == null){firstdefaultvalues['apause'] = true;}
    if(items['astop'] == null){firstdefaultvalues['astop'] = true;}

    // find no localstore a autostopred
    if(items['autostopred'] == null && items['autostoptrans'] == null){firstdefaultvalues['autostopred'] = true;firstdefaultvalues['autostoptrans'] = false;}

    // find no localstore volume meter position
	if(items['videovolumeposa'] == null && items['videovolumeposb'] == null && items['videovolumeposc'] == null){firstdefaultvalues['videovolumeposa'] = true;firstdefaultvalues['videovolumeposb'] = false;firstdefaultvalues['videovolumeposc'] = false;}

    // find no localstore a multiopacity
    if(items['multiopacall'] == null && items['multiopacsel'] == null){firstdefaultvalues['multiopacall'] = true;firstdefaultvalues['multiopacsel'] = false;}

    // find no localstore a nightmodebydomain
    if(items['nightmodebydomain'] == null && items['nightmodebypage'] == null){firstdefaultvalues['nightmodebydomain'] = true;firstdefaultvalues['nightmodebypage'] = false;}

    // find no localstore a seeanalytics
    if(items['seeanalytics'] == null){firstdefaultvalues['seeanalytics'] = true;}

    // Save the init value
    chrome.storage.sync.set(firstdefaultvalues, function(){
    //console.log('Settings saved');
    });
});

function read_options(){
// speech
var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];

var i;
var l = langs.length;
for(i = 0; i < l; i++){
if($("select_language")){ $("select_language").options[i] = new Option(langs[i][0], i); }
}

function updateCountry(){
    var i;
	for(i = $("select_dialect").options.length - 1; i >= 0; i--){
		$("select_dialect").remove(i);
	}
    var list = langs[$("select_language").selectedIndex];
    var i;
    var l = list.length;
	for(i = 1; i < l; i++){
		$("select_dialect").options.add(new Option(list[i][1], list[i][0]));
	}
	$("select_dialect").style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

// add default language for first run
// will be rewritten if there is a 'saved setting'
var webspeechlang = document.getElementById("select_language");
if(webspeechlang.selectedIndex != -1){webspeechlang.selectedIndex = "6";updateCountry();}
var webspeechcountry = document.getElementById("select_dialect");
if(webspeechcountry.selectedIndex != -1){webspeechcountry.selectedIndex = "6";}
//---

$("select_language").addEventListener('click', function(){updateCountry();},false);
$("select_language").addEventListener('change', function(){updateCountry();save_options();});
$("select_dialect").addEventListener('change', function(){save_options();});

//---
// open multi opacity
$("btnmultiopacity").addEventListener('click', function(){
    materialAlert(function(result){console.log(result)});
});

$("materialModal").addEventListener('click', function(e){
    closeMaterialAlert(e, false);
});
$("materialModalContent").addEventListener('click', function(e){
    e.stopPropagation();
});
$("materialModalButtonOK").addEventListener('click', function(e){
    closeMaterialAlert(e, true);
});
$("materialModalButtonCANCEL").addEventListener('click', function(e){
    closeMaterialAlert(e, false);
});

// rate
$("materialModalRate").addEventListener('click', function(e){
    closeMaterialRateAlert(e, false);
});
$("materialModalRateContent").addEventListener('click', function(e){
    e.stopPropagation();
});
$("materialModalRateButtonOK").addEventListener('click', function(e){
    closeMaterialRateAlert(e, true);
    window.open(writereview);$("sectionreviewbox").style.display = "none";chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version});
});
$("materialModalRateButtonCANCEL").addEventListener('click', function(e){
    closeMaterialRateAlert(e, false);
    chrome.storage.sync.set({"firstsawrate": false});
});

// introduce
$("materialModalIntroduce").addEventListener('click', function(e){
    closeMaterialIntroduceAlert(e, false);
});
$("materialModalIntroduceContent").addEventListener('click', function(e){
    e.stopPropagation();
});
$("materialModalIntroduceButtonOK").addEventListener('click', function(e){
    closeMaterialIntroduceAlert(e, true);
});
$("materialModalIntroduceButtonCANCEL").addEventListener('click', function(e){
    closeMaterialIntroduceAlert(e, false);
});

// dialog
function materialAlert(callback){
    document.getElementById('materialModalButtonCANCEL').style.display = 'none';
    document.getElementById('materialModal').className = 'show';
    document.getElementById('materialModal').setAttribute('aria-disabled', "false");
}
function closeMaterialAlert(e, result){
    e.stopPropagation();
    document.getElementById('materialModal').className = 'hide';
    document.getElementById('materialModal').setAttribute('aria-disabled', "true");
}

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

// introduce
function materialIntroduceAlert(callback){
    document.getElementById('materialModalIntroduceButtonCANCEL').style.display = 'none';
    document.getElementById('materialModalIntroduce').className = 'show';
    document.getElementById('materialModalIntroduce').setAttribute('aria-disabled', "false");
}
function closeMaterialIntroduceAlert(e, result){
    e.stopPropagation();
    document.getElementById('materialModalIntroduce').className = 'hide';
    document.getElementById('materialModalIntroduce').setAttribute('aria-disabled', "true");
}
//---

	chrome.storage.sync.get(['firstDate','interval','lightcolor','lightimage','lightimagea','lightimagen','autoplay','playlist','flash','head','fadein','fadeout','infobar','sharebutton','likebutton','readera','readern','shortcutlight','eyea','eyen','suggestions','videoheadline','eastereggs','contextmenus','viewcount','eyealist','mousespotlighto','mousespotlightc','mousespotlighta','nighttime','begintime','endtime','addvideobutton','likebar','ambilight','ambilightrangeblurradius','ambilightrangespreadradius','mousespotlightt','ambilightfixcolor','ambilightvarcolor','ambilightcolorhex','ambilight4color','ambilight1colorhex','ambilight2colorhex','ambilight3colorhex','ambilight4colorhex','password','enterpassword','noflash','hardflash','ecosaver','ecosavertime','dynamic','dynamic1','dynamic2','dynamic3','dynamic4','dynamic5','dynamic6','dynamic7','dynamic8','dynamic9','dynamic10','hoveroptiondyn5','autoplayonly','blur','maxquality','autowidthyoutube','customqualityyoutube','cinemaontop','alllightsoff','spotlightradius','atmosphereonly','optionskipremember','nighttheme','nightonly','nightenabletheme','autoplaydelay','autoplaydelaytime','motion','lightimagelin','linearsq','colora','intervallina','colorb','intervallinb','speech','speechlang','speechcountry','atmosvivid','countremember','excludedDomains','autoplayDomains','atmosphereDomains','nightDomains','cammotiononly','speechonly','cammotionDomains','speechDomains','autoplaychecklistwhite','autoplaychecklistblack','reviewedlastonversion','applastonversion','autostop','autostoponly','autostopchecklistwhite','autostopchecklistblack','nightmodechecklistwhite','nightmodechecklistblack','autostopDomains','nighthover','nmtopleft','nmtopright','nmbottomright','nmbottomleft','nmcustom','nightactivetime','nmbegintime','nmendtime','lampandnightmode','eyechecklistblack','eyechecklistwhite','nightmodebck','nightmodetxt','mobilelastonversion','no360youtube','videotool','reflection','reflectionamount','videotoolonly','videotoolchecklistwhite','videotoolchecklistblack','videotoolDomains','nightmodehyperlink','block60fps','videovolume','videovolumecolor','videovolumesteps','videovolumelabel','icon','visopacity','videotoolcolor','hovervideo','hovervideoamount','mousespotlights','drawatmosfps','aplay','apause','astop','videozoom','playrate','playrateamount','speedtoolbar','atmosontotlmode','titleinvertcolor','vpause','darkbrowsertheme','autostopred','autostoptrans','videovolumeposa','videovolumeposb','videovolumeposc','videovolumehold','multiopacityDomains','multiopacall','multiopacsel','firstsawrate','videovolumealt','nightmodebydomain','nightmodebypage','introduce','seeanalytics','nightmodegesture','nightmodeswitchhide','nightmodeswitchhidetime'], function(items){
		if(items['interval']){$('interval').value = items['interval'];$('slider').value = items['interval'];$("interval").setAttribute('aria-valuenow',items['interval']);$("slider").setAttribute('aria-valuenow',items['interval']);$('example1').style.opacity = (items['interval']/100);$('example2').style.opacity = (items['interval']/100);}
		else{$('interval').value = 80;}
		if(items['lightcolor']){$('lightcolor').value = items['lightcolor'];}
		else{$('lightcolor').value = '#000000';}
		if(items['lightimage']){$('lightimage').value = items['lightimage'];}
		else{$('lightimage').value = "https://www.turnoffthelights.com/extension/images/theater.jpg";}
		if(items['lightimagea'] == true){$('lightimagea').checked = true;}
		if(items['lightimagen'] == true){$('lightimagen').checked = true;}
		if(items['autoplay'] == true){$('autoplay').checked = true;}
		if(items['playlist'] == true){$('playlist').checked = true;}
		if(items['flash'] == true){$('flash').checked = true;}
		if(items['head'] == true){$('head').checked = true;}
		if(items['fadein'] == true){$('fadein').checked = true;}
		if(items['fadeout'] == true){$('fadeout').checked = true;}
		if(items['infobar'] == true){$('infobar').checked = true;}
		if(items['sharebutton'] == true){$('sharebutton').checked = true;}
		if(items['likebutton'] == true){$('likebutton').checked = true;}
		if(items['readera'] == true){$('readera').checked = true;}
		if(items['readern'] == true){$('readern').checked = true;}
		if(items['shortcutlight'] == true){$('shortcutlight').checked = true;}
		if(items['eyea'] == true){$('eyea').checked = true;}
		if(items['eyen'] == true){$('eyen').checked = true;}
		if(items['suggestions'] == true){$('suggestions').checked = true;}
		if(items['videoheadline'] == true){$('videoheadline').checked = true;}
		if(items['eastereggs'] == true){$('eastereggs').checked = true;}
		if(items['contextmenus'] == true){$('contextmenus').checked = true;}
		if(items['viewcount'] == true){$('viewcount').checked = true;}
		if(items['eyealist'] == true){$('eyealist').checked = true;}
		if(items['mousespotlighto'] == true){$('mousespotlighto').checked = true;}
		if(items['mousespotlightc'] == true){$('mousespotlightc').checked = true;}
		if(items['mousespotlighta'] == true){$('mousespotlighta').checked = true;}
		if(items['nighttime'] == true){$('nighttime').checked = true;}
		if(items['begintime']){$('begintime').value = items['begintime'];}
		else{$('begintime').value = "21:00";}
		if(items['endtime']){$('endtime').value = items['endtime'];}
		else{$('endtime').value = "23:45";}
		if(items['addvideobutton'] == true){$('addvideobutton').checked = true;}
		if(items['likebar'] == true){$('likebar').checked = true;}
		if(items['ambilight'] == true){$('ambilight').checked = true;}
		if(items['ambilightrangeblurradius']){$('ambilightrangeblurradius').value = items['ambilightrangeblurradius'];$('arangeblur').value = items['ambilightrangeblurradius'];$("arangeblur").setAttribute('aria-valuenow',items['ambilightrangeblurradius']);$("arangeblur").setAttribute('aria-valuenow',items['ambilightrangeblurradius']);}
		else{$('ambilightrangeblurradius').value = 70;}
		if(items['ambilightrangespreadradius']){$('ambilightrangespreadradius').value = items['ambilightrangespreadradius'];$('arangespread').value = items['ambilightrangespreadradius'];$("ambilightrangespreadradius").setAttribute('aria-valuenow',items['ambilightrangespreadradius']);$("arangespread").setAttribute('aria-valuenow',items['ambilightrangespreadradius']);}
		else{$('ambilightrangespreadradius').value = 20;}
		if(items['mousespotlightt'] == true){$('mousespotlightt').checked = true;}
		if(items['ambilightfixcolor'] == true){$('ambilightfixcolor').checked = true;}
		if(items['ambilightvarcolor'] == true){$('ambilightvarcolor').checked = true;}
		if(items['ambilightcolorhex']){$('ambilightcolorhex').value = items['ambilightcolorhex'];}
		else{$('ambilightcolorhex').value = '#47C2FF';}
		if(items['ambilight4color'] == true){$('ambilight4color').checked = true;}
		if(items['ambilight1colorhex']){$('ambilight1colorhex').value = items['ambilight1colorhex'];}
		else{$('ambilight1colorhex').value = '#FF0000';}
		if(items['ambilight2colorhex']){$('ambilight2colorhex').value = items['ambilight2colorhex'];}
		else{$('ambilight2colorhex').value = '#FFEE00';}
		if(items['ambilight3colorhex']){$('ambilight3colorhex').value = items['ambilight3colorhex'];}
		else{$('ambilight3colorhex').value = '#00FF00';}
		if(items['ambilight4colorhex']){$('ambilight4colorhex').value = items['ambilight4colorhex'];}
		else{$('ambilight4colorhex').value = '#0000FF';}
		if(items['password'] == true){$('password').checked = true;}
		if(items['enterpassword']){$('enterpassword').value = items['enterpassword'];}
		if(items['noflash'] == true){$('noflash').checked = true;}
		if(items['hardflash'] == true){$('hardflash').checked = true;}
		if(items['ecosaver'] == true){$('ecosaver').checked = true;}
		if(items['ecosavertime']){$('ecosavertime').value = items['ecosavertime'];}
		else{$('ecosavertime').value = '60';}
		if(items['dynamic'] == true){$('dynamic').checked = true;}
		else{$('lightdynamic').disabled = true;}
		if(items['dynamic1'] == true){$('dynamic1').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicfishtank');}
		if(items['dynamic2'] == true){$('dynamic2').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicblocks');}
		if(items['dynamic3'] == true){$('dynamic3').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicraindrops');}
		if(items['dynamic4'] == true){$('dynamic4').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamiccloud');}
		if(items['dynamic5'] == true){$('dynamic5').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicspace');}
		if(items['dynamic6'] == true){$('dynamic6').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicsmoke');}
		if(items['dynamic7'] == true){$('dynamic7').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicdotscolor');}
		if(items['dynamic8'] == true){$('dynamic8').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicstorm');}
		if(items['dynamic9'] == true){$('dynamic9').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamictriangulation');}
		if(items['dynamic10'] == true){$('dynamic10').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicstars');}
		if(items['hoveroptiondyn5'] == true){$('hoveroptiondyn5').checked = true;}
		if(items['autoplayonly'] == true){$('autoplayonly').checked = true;}
		else{$('autoplayonly').checked = false;}
		if(items['blur'] == true){$('blur').checked = true;}
		if(items['maxquality']){$('youtubequality').value = items['maxquality'];}
		if(items['autowidthyoutube'] == true){$('autowidthyoutube').checked = true;}
		if(items['customqualityyoutube'] == true){$('customqualityyoutube').checked = true;}
		if(items['cinemaontop'] == true){$('cinemaontop').checked = true;}
		if(items['alllightsoff'] == true){$('alllightsoff').checked = true;}
		if(items['spotlightradius']){$('spotlightradius').value = items['spotlightradius'];}
		else{$('spotlightradius').value = 50;}
		if(items['atmosphereonly'] == true){$('atmosphereonly').checked = true;}
		else{$('atmosphereonly').checked = false;}
		if(items['optionskipremember'] == true){$('optionskipremember').checked = true;}
		if(items['nighttheme'] == true){$('nighttheme').checked = true;}
		if(items['nightonly'] == true){$('nightonly').checked = true;}
		else{$('nightonly').checked = false;}
		if(items['nightenabletheme'] == true){$('nightenabletheme').checked = true;}
		if(items['autoplaydelay'] == true){$('autoplaydelay').checked = true;}
		if(items['autoplaydelaytime']){$('autoplaydelaytime').value = items['autoplaydelaytime'];}
		else{$('autoplaydelaytime').value = 3;}
		if(items['motion'] == true){$('motion').checked = true;}
		if(items['lightimagelin'] == true){$('lightimagelin').checked = true;}
		if(items['linearsq']){$('linearsq').value = items['linearsq'];}
		else{$('linearsq').value = "top";}
		if(items['colora']){$('colora').value = items['colora'];}
		else{$('colora').value = '#000000';}
		if(items['intervallina']){$('intervallina').value = items['intervallina'];}
		else{$('intervallina').value = '0';}
		if(items['colorb']){$('colorb').value = items['colorb'];}
		else{$('colorb').value = '#858585';}
		if(items['intervallinb']){$('intervallinb').value = items['intervallinb'];}
		else{$('intervallinb').value = '100';}
		if(items['speech'] == true){$('speech').checked = true;}
		if(items['speechlang']){$("select_language").selectedIndex = items['speechlang'];updateCountry();}
		if(items['speechcountry']){$('select_dialect').value = items['speechcountry'];}
		if(items['atmosvivid'] == true){$('atmosvivid').checked = true;}
		if(items['cammotiononly'] == true){$('cammotiononly').checked = true;}
		else{$('cammotiononly').checked = false;}
		if(items['speechonly'] == true){$('speechonly').checked = true;}
		else{$('speechonly').checked = false;}
		if(items['autoplaychecklistwhite'] == true){$('autoplaychecklistwhite').checked = true;}
		if(items['autoplaychecklistblack'] == true){$('autoplaychecklistblack').checked = true;}
		if(items['applastonversion'] == chrome.runtime.getManifest().version){$("sectionauroraplayerappbox").style.display = "none";}
		if(items['autostop'] == true){$('autostop').checked = true;}
		if(items['autostoponly'] == true){$('autostoponly').checked = true;}
		else{$('autostoponly').checked = false;}
		if(items['autostopchecklistwhite'] == true){$('autostopchecklistwhite').checked = true;}
		if(items['autostopchecklistblack'] == true){$('autostopchecklistblack').checked = true;}
		if(items['nighthover'] == true){$('nighthover').checked = true;}
		if(items['nightmodechecklistwhite'] == true){$('nightmodechecklistwhite').checked = true;}
		if(items['nightmodechecklistblack'] == true){$('nightmodechecklistblack').checked = true;}
		if(items['nmtopleft'] == true){$('nmtopleft').checked = true;}
		if(items['nmtopright'] == true){$('nmtopright').checked = true;}
		if(items['nmbottomright'] == true){$('nmbottomright').checked = true;}
		if(items['nmbottomleft'] == true){$('nmbottomleft').checked = true;}
		if(items['nmcustom'] == true){$('nmcustom').checked = true;}
		if(items['nightactivetime'] == true){$('nightactivetime').checked = true;}
		if(items['nmbegintime']){$('nmbegintime').value = items['nmbegintime'];}
		else{$('nmbegintime').value = "21:00";}
		if(items['nmendtime']){$('nmendtime').value = items['nmendtime'];}
		else{$('nmendtime').value = "23:45";}
		if(items['lampandnightmode'] == true){$('lampandnightmode').checked = true;}
		else{$('lampandnightmode').checked = false;}
		if(items['eyechecklistwhite'] == true){$('eyechecklistwhite').checked = true;}
		if(items['eyechecklistblack'] == true){$('eyechecklistblack').checked = true;}
		if(items['nightmodebck']){$('nightmodebck').value = items['nightmodebck'];}
		else{$('nightmodebck').value = '#1e1e1e';}
		if(items['nightmodetxt']){$('nightmodetxt').value = items['nightmodetxt'];}
		else{$('nightmodetxt').value = '#ffffff';}
		if(items['mobilelastonversion'] == chrome.runtime.getManifest().version){$("sectionmobileappbox").style.display = "none";}
		if(items['no360youtube'] == true){$('no360youtube').checked = true;}
		if(items['videotool'] == true){$('videotool').checked = true;}
		if(items['reflection'] == true){$('reflection').checked = true;}
		if(items['reflectionamount']){$('reflectionamount').value = items['reflectionamount'];}
		else{$('reflectionamount').value = '20';}
		if(items['videotoolonly'] == true){$('videotoolonly').checked = true;}
		if(items['videotoolchecklistwhite'] == true){$('videotoolchecklistwhite').checked = true;}
		if(items['videotoolchecklistblack'] == true){$('videotoolchecklistblack').checked = true;}
		if(items['nightmodehyperlink']){$('nightmodehyperlink').value = items['nightmodehyperlink'];}
		else{$('nightmodehyperlink').value = '#ffffff';}
		if(items['block60fps'] == true){$('block60fps').checked = true;}
		if(items['videovolume'] == true){$('videovolume').checked = true;}
		if(items['videovolumecolor']){$('videovolumecolor').value = items['videovolumecolor'];}
		else{$('videovolumecolor').value = '#167ac6';}
		if(items['videovolumesteps']){$('videovolumesteps').value = items['videovolumesteps'];}
		else{$('videovolumesteps').value = 5;}
		if(items['videovolumelabel'] == true){$('videovolumelabel').checked = true;}
		if(items['icon']){$("btnpreview").src = items['icon'];$("btnpreview").setAttribute("data-icon",items['icon']);}
		if(items['visopacity']){$('visopacity').value = items['visopacity'];}
		else{$('visopacity').value = '80';}
		if(items['videotoolcolor']){$('videotoolcolor').value = items['videotoolcolor'];}
		else{$('videotoolcolor').value = '#000000';}
		if(items['hovervideo'] == true){$('hovervideo').checked = true;}
		if(items['hovervideoamount']){$('hovervideoamount').value = items['hovervideoamount'];}
		else{$('hovervideoamount').value = '3';}
		if(items['mousespotlights'] == true){$('mousespotlights').checked = true;}
		if(items['drawatmosfps']){$('drawatmosfps').value = items['drawatmosfps'];}
		else{$('drawatmosfps').value = '12';}
		if(items['aplay'] == true){$('aplay').checked = true;}
		if(items['apause'] == true){$('apause').checked = true;}
		if(items['astop'] == true){$('astop').checked = true;}
		if(items['videozoom'] == true){$('videozoom').checked = true;}
		if(items['playrate'] == true){$('playrate').checked = true;}
		if(items['playrateamount']){$('playrateamount').value = items['playrateamount'];}
		else{$('playrateamount').value = '1';}
		if(items['speedtoolbar'] == true){$('speedtoolbar').checked = true;}
		if(items['atmosontotlmode'] == true){$('atmosontotlmode').checked = true;}
		if(items['titleinvertcolor']){$('titleinvertcolor').value = items['titleinvertcolor'];}
		else{$('titleinvertcolor').value = '#ffffff';}
		if(items['vpause'] == true){$('vpause').checked = true;}
        if(items['darkbrowsertheme'] == true){$('darkbrowsertheme').checked = true;}
        if(items['autostopred'] == true){$('autostopred').checked = true;}
        if(items['autostoptrans'] == true){$('autostoptrans').checked = true;}
        if(items['videovolumeposa'] == true){$('videovolumeposa').checked = true;}
        if(items['videovolumeposb'] == true){$('videovolumeposb').checked = true;}
        if(items['videovolumeposc'] == true){$('videovolumeposc').checked = true;}
        if(items['videovolumehold'] == true){$('videovolumehold').checked = true;}
        if(items['multiopacall'] == true){$('multiopacall').checked = true;}
        if(items['multiopacsel'] == true){$('multiopacsel').checked = true;}
        if(items['videovolumealt'] == true){$('videovolumealt').checked = true;}
        if(items['nightmodebydomain'] == true){$('nightmodebydomain').checked = true;}
        if(items['nightmodebypage'] == true){$('nightmodebypage').checked = true;}
        if(items['seeanalytics'] == true){$('seeanalytics').checked = true;}
        if(items['nightmodegesture'] == true){$('nightmodegesture').checked = true;}
        if(items['nightmodeswitchhide'] == true){$('nightmodeswitchhide').checked = true;}
        if(items['nightmodeswitchhidetime']){$('nightmodeswitchhidetime').value = items['nightmodeswitchhidetime'];}
		else{$('nightmodeswitchhidetime').value = '3';}

// show introduce
if(items['introduce'] != true){
    window.setTimeout(function(){
        materialIntroduceAlert(function(result){ console.log(result) });
    }, 2500);
    chrome.storage.sync.set({"introduce": true});
}

// show remember page
var firstmonth = false;
var currentDate = new Date().getTime();
if(items['firstDate']){
    var datestart = items['firstDate'];
    var dateend = datestart + (30 * 24 * 60 * 60 * 1000);
    if(currentDate>=dateend){firstmonth = false;}
    else{firstmonth = true;}
}else{
    chrome.storage.sync.set({"firstDate": currentDate});
    firstmonth = true;
}

if(firstmonth){
// show nothing
$("sectionreviewbox").style.display = "none";
}else{
    if($('optionskipremember').checked != true){
        $("sectionreviewbox").style.display = "block"; // show now always the banner
        if(items['firstsawrate'] != true){
            window.setTimeout(function(){
                materialRateAlert(function(result){console.log(result)})
            }, 2500);
            chrome.storage.sync.set({"firstsawrate": true});
        }
        else{}
    }else{
        $("sectionreviewbox").style.display = "none";
    }
}

	// load tab div
    var tabListItems = $('navbar').childNodes;
    var i;
    var l = tabListItems.length;
	for(i = 0; i < l; i++){
		if(tabListItems[i].nodeName == 'LI'){
		var tabLink = getFirstChildWithTagName(tabListItems[i],'A');
		var id = getHash(tabLink.getAttribute('data-tab'));
		tabLinks[id] = tabLink;
		contentDivs[id] = $( id );
        }
    }

    // Assign onclick events to the tab links, and
    // highlight the first tab
    var i = 0;
    var id;
    for(id in tabLinks){
    	tabLinks[id].onclick = showTab;
		tabLinks[id].onfocus = function(){this.blur()};
		if(i == 0) tabLinks[id].className = 'navbar-item-selected';
		i++;
    }
    
    // Hide all content divs except the first
    var i = 0;
    var id;
    for(id in contentDivs){
    	if(i != 0) contentDivs[id].className = 'page hidden';
        i++;
    }

    // display version number
	var manifestData = chrome.runtime.getManifest();
	$("version_number").innerText = manifestData.version;

// Excluded domains - sort these alphabetically
var excludedDomains = items["excludedDomains"];
if(typeof excludedDomains == "undefined" || excludedDomains == null)
excludedDomains = JSON.stringify({'https://www.nytimes.com': true, 'https://www.blogger.com': true});
		
if(typeof excludedDomains == "string"){
	excludedDomains = JSON.parse(excludedDomains);
    var buf = [];
    var domain;
	for(domain in excludedDomains)
		buf.push(domain);
        buf.sort();
    var i;
    var l = buf.length;
	for(i = 0; i < l; i++)
		appendToListBox("excludedDomainsBox", buf[i]);
}

var requestId = 0;
var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function stopAnimation(e){
    window.cancelAnimationFrame(requestId);
}

// yes show time
// ambilight play detect
drawatmosfps = $("drawatmosfps").value;
startAnimating(drawatmosfps);

function startAnimating(fps){
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
	//console.log(startTime);
	animate();
}

function animate(){
    // stop
    if(stop){return;}

    // request another frame
    requestId = window.requestAnimFrame(animate);

    // calc elapsed time since last loop
    now = window.performance.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if(elapsed > fpsInterval){

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

 	try {
        if(document.visibilityState === "visible"){
            var htmlplayer = document.getElementsByTagName("video") || null;
            var playerid = null, item = null;
            var j;
            var l = htmlplayer.length;
            for(j = 0; j < l; j++){
                if(htmlplayer[j].play){playerid = htmlplayer[j];item = j + 1;drawAtmos(playerid, item);}
            }
        }
	}
	catch(err){} // I see nothing, that is good

    // TESTING...Report #seconds since start and achieved fps.
    //var sinceStart = now - startTime;
    //var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
    //console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
    }
}

// default example2 is not display
$("example2").style.opacity = 0;$("example2").style.display = 'none';
// default hide this buttons
$("wallpapershow").style.display = 'none';$("dynamicshow").style.display = 'none';

// autoplay - Excluded domains - sort these alphabetically
var autoplayDomains = items["autoplayDomains"];
if(typeof autoplayDomains == "undefined" || autoplayDomains == null)
autoplayDomains = JSON.stringify({'https://www.youtube.com': true, 'https://vimeo.com': true});

if(typeof autoplayDomains == "string"){
	autoplayDomains = JSON.parse(autoplayDomains);
    var abuf = [];
    var domain;
	for(domain in autoplayDomains)
		abuf.push(domain);
        abuf.sort();
    var i;
    var l = abuf.length;
	for(i = 0; i < l; i++)
		appendToListBox("autoplayDomainsBox", abuf[i]);
}
	
// atmosphere - Excluded domains - sort these alphabetically
var atmosphereDomains = items["atmosphereDomains"];
if(typeof atmosphereDomains == "undefined" || atmosphereDomains == null)
atmosphereDomains = JSON.stringify({'https://www.youtube.com': true, 'https://vimeo.com': true});
		
if(typeof atmosphereDomains == "string"){
	atmosphereDomains = JSON.parse(atmosphereDomains);
    var albuf = [];
    var domain;
	for(domain in atmosphereDomains)
		albuf.push(domain);
        albuf.sort();
    var i;
    var l = albuf.length;
	for(i = 0; i < l; i++)
		appendToListBox("atmosphereDomainsBox", albuf[i]);
}
	
// night - Excluded domains - sort these alphabetically
var nightDomains = items["nightDomains"];
if(typeof nightDomains == "undefined" || nightDomains == null)
nightDomains = JSON.stringify({'https://www.youtube.com': true, 'https://www.nytimes.com': true, 'http://192.168.1.1': true});

if(typeof nightDomains == "string"){
	nightDomains = JSON.parse(nightDomains);
    var nbuf = [];
    var domain;
	for(domain in nightDomains)
		nbuf.push(domain);
        nbuf.sort();
    var i;
    var l = nbuf.length;
	for(i = 0; i < l; i++)
		appendToListBox("nightDomainsBox", nbuf[i]);
}
	
// cammotion - Excluded domains - sort these alphabetically
var cammotionDomains = items["cammotionDomains"];
if(typeof cammotionDomains == "undefined" || cammotionDomains == null)
cammotionDomains = JSON.stringify({'https://www.youtube.com': true, 'https://vimeo.com': true});
		
if(typeof cammotionDomains == "string"){
	cammotionDomains = JSON.parse(cammotionDomains);
    var cmbuf = [];
    var domain;
	for(domain in cammotionDomains)
		cmbuf.push(domain);
        cmbuf.sort();
    var i;
    var l = cmbuf.length;
	for(i = 0; i < l; i++)
		appendToListBox("cammotionDomainsBox", cmbuf[i]);
}

// speech - Excluded domains - sort these alphabetically
var speechDomains = items["speechDomains"];
if(typeof speechDomains == "undefined" || speechDomains == null)
speechDomains = JSON.stringify({'https://www.youtube.com': true, 'https://vimeo.com': true});
		
if(typeof speechDomains == "string"){
	speechDomains = JSON.parse(speechDomains);
    var srbuf = [];
    var domain;
	for(domain in speechDomains)
		srbuf.push(domain);
        srbuf.sort();
    var i;
    var l = srbuf.length;
	for(i = 0; i < l; i++)
		appendToListBox("speechDomainsBox", srbuf[i]);
}
	
// autostop - Excluded domains - sort these alphabetically
var autostopDomains = items["autostopDomains"];
if(typeof autostopDomains == "undefined" || autostopDomains == null)
autostopDomains = JSON.stringify({'https://www.youtube.com': true, 'https://vimeo.com': true});

if(typeof autostopDomains == "string"){
	autostopDomains = JSON.parse(autostopDomains);
    var asbuf = [];
    var domain;
	for(domain in autostopDomains)
		asbuf.push(domain);
        asbuf.sort();
    var i;
    var l = asbuf.length;
	for(i = 0; i < l; i++)
		appendToListBox("autostopDomainsBox", asbuf[i]);
}

// video tool bar - Excluded domains - sort these alphabetically
var videotoolDomains = items["videotoolDomains"];
if(typeof videotoolDomains == "undefined" || videotoolDomains == null)
videotoolDomains = JSON.stringify({'https://www.youtube.com': true, 'https://vimeo.com': true});
		
if(typeof videotoolDomains == "string"){
	videotoolDomains = JSON.parse(videotoolDomains);
    var vtbbuf = [];
    var domain;
	for(domain in videotoolDomains)
		vtbbuf.push(domain);
        vtbbuf.sort();
    var i;
    var l = vtbbuf.length;
	for(i = 0; i < l; i++)
		appendToListBox("videotoolDomainsBox", vtbbuf[i]);
}

// multi opacity Excluded domains - sort these alphabetically
var multiopacityDomains = items['multiopacityDomains'];
if(typeof multiopacityDomains == "undefined" || multiopacityDomains == null){
    multiopacityDomains = JSON.stringify({'https://www.example.com': ["90"], 'https://www.nytimes.com': ["85"]});
}

if(typeof multiopacityDomains == "string"){
	multiopacityDomains = JSON.parse(multiopacityDomains);
    var mpbbuf = [];
    var domain;
	for(domain in multiopacityDomains)
        mpbbuf.push(domain);
        mpbbuf.sort();
    var i;
    var l = mpbbuf.length;
	for(i = 0; i < l; i++){
		multiappendToListBox("multiopacityDomainsBox", mpbbuf[i],multiopacityDomains[''+mpbbuf[i]+'']);
    }
}

    test(); // everything readed, do the "test"
    ariacheck();
	});// chrome storage end
} // end read

// animation browser engine
window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

function getPosition(el){
var xPos = 0;var yPos = 0;
while (el){xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);yPos += (el.offsetTop - el.scrollTop + el.clientTop);el = el.offsetParent;}
return{x:xPos,y:yPos};
}

var countA = 0, countB = 0, countC = 0; // start from zero (blur spread) and size (left right top under) position

// ambilight draw code
function drawAtmos(){
	var v = $("beeld");
	if(v.paused || v.ended){
	// animation go out
	countA=countA-1;if(countA <= 0){countA=0;}
	countB=countB-1;if(countB <= 0){countB=0;}
	countC=countC-1;if(countC <= 0){countC=0;}
	var textcountA = countA + "px";
	var textcountB = countB + "px";

var canvas = $("totlCanvas1");
if(canvas){
	var context = canvas.getContext('2d', {desynchronized: true});
	var imageData = context.getImageData(0, 0, 1, 1);
	var data = imageData.data;

	function rgbToHex(r, g, b){
    if(r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
	}

	var p1 = context.getImageData(0 , 0, 1, 1).data;
	var p2 = context.getImageData(1 , 0, 1, 1).data;
	var p3 = context.getImageData(2 , 0, 1, 1).data;
	var p4 = context.getImageData(3 , 0, 1, 1).data;
	var hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
	var hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
	var hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
	var hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);
}
var downhex1 = hex1; if(!hex1){ hex1 = "#000000"; } // previous value
var downhex2 = hex2; if(!hex2){ hex2 = "#000000"; } // previous value
var downhex3 = hex3; if(!hex3){ hex3 = "#000000"; } // previous value
var downhex4 = hex4; if(!hex4){ hex4 = "#000000"; } // previous value

    if($("stefanvdvivideffect1")){
    $("stefanvdvivideffect1").style.display = "none";
    }
	if($("ambilightvarcolor").checked == true){
        if($("atmosvivid").checked == true){
            if($("stefanvdvivideffect1")){
            $("stefanvdvivideffect1").style.display = "none";
            }
        }else{
	        v.style.boxShadow = "0px 0px 0px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + downhex3 + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + downhex1 + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + downhex2 + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + downhex4 + ""; 
        }
	}
	else if($("ambilightfixcolor").checked == true){
	v.style.boxShadow = "0px 0px 0px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + "";
    }
	else if($("ambilight4color").checked == true){
	v.style.boxShadow = "0px 0px 0px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + $("ambilight1colorhex").value + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + $("ambilight2colorhex").value + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilight3colorhex").value + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilight4colorhex").value + "";
	}
	// ----
	
	return false;
	}
	if($("ambilight").checked == true){
    var showtime = $("beeld");
	var getblur = $('ambilightrangeblurradius').value + "px";
	var getspread = $('ambilightrangespreadradius').value + "px";
	
	// animate out and in
	if(countA < $('ambilightrangespreadradius').value){countA=countA+1;}
	if(countB < $('ambilightrangeblurradius').value){countB=countB+1;}
	if(countC < 20){countC=countC+.5;}
	var textcountA = countA + "px";
	var textcountB = countB + "px";
	
	if($("ambilightvarcolor").checked == true){
    var sourceWidth = showtime.videoWidth;
    var sourceHeight = showtime.videoHeight;
    
var totlcheckcanvas = $("totlCanvas1");
if(totlcheckcanvas){}else{
 	var totlnewcanvas = document.createElement("canvas");
	totlnewcanvas.setAttribute('id','totlCanvas1');
	totlnewcanvas.width = "4";
	totlnewcanvas.height = "1";
	totlnewcanvas.style.display = "none";
	document.body.appendChild(totlnewcanvas);
	}

var canvas = $("totlCanvas1");
var context = canvas.getContext('2d', {desynchronized: true});
var colorlamp1X = (sourceWidth * 50) /100; // up midden
var colorlamp1Y = (sourceHeight * 95) /100;
var colorlamp2X = (sourceWidth * 95) /100; // right midden
var colorlamp2Y = (sourceHeight * 50) /100;
var colorlamp3X = (sourceWidth * 50) /100; // down midden
var colorlamp3Y = (sourceHeight * 5) /100;
var colorlamp4X = (sourceWidth * 5) /100; // left midden
var colorlamp4Y = (sourceHeight * 50) /100;
	
	context.drawImage(showtime, colorlamp1X, colorlamp1Y, 1, 1, 0, 0, 1, 1);
	context.drawImage(showtime, colorlamp2X, colorlamp2Y, 1, 1, 1, 0, 1, 1);
	context.drawImage(showtime, colorlamp3X, colorlamp3Y, 1, 1, 2, 0, 1, 1);
	context.drawImage(showtime, colorlamp4X, colorlamp4Y, 1, 1, 3, 0, 1, 1);
	
    var imageData = context.getImageData(0, 0, 1, 1);
    var data = imageData.data;

function rgbToHex(r, g, b){
    if(r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

    var p1 = context.getImageData(0 , 0, 1, 1).data; 
    var p2 = context.getImageData(1 , 0, 1, 1).data; 
    var p3 = context.getImageData(2 , 0, 1, 1).data; 
    var p4 = context.getImageData(3 , 0, 1, 1).data; 
    var hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
    var hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
    var hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
    var hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);

        if($("atmosvivid").checked == true){
				if($("stefanvdvivideffect1")){
                    showtime.style["boxShadow"] = "none";
                    var newpositionvivid = getPosition(showtime);
					var tempwidthvideo = showtime.offsetWidth;
					var tempheightvideo = showtime.offsetHeight;
					var tempvisscrollleft = window.pageXOffset || document.documentElement.scrollLeft;
					var tempvisscrolltop = window.pageYOffset || document.documentElement.scrollTop;
                    var newvivid = $("stefanvdvivideffect1");
					newvivid.style.webkitTransform = "scale("+1.1+")";
					newvivid.style.webkitFilter = "blur("+30+"px)";
                    newvivid.style.top = 0;
                    newvivid.style.bottom = 0;
                    newvivid.style.right = 0;
                    newvivid.style.left = 0;
                    newvivid.style.margin = "auto";
                    newvivid.style.width = "640px";
                    newvivid.style.height = "360px";
					newvivid.style.opacity = .88;
                    newvivid.style.display = "block";
                    newvivid.width = Math.floor(tempwidthvideo*0.08);
                    newvivid.height = Math.floor(tempheightvideo*0.08);
                    var vividctx = newvivid.getContext('2d', {desynchronized: true});var vividx = Math.floor(showtime.offsetWidth*0.08);var vividy = Math.floor(showtime.offsetHeight*0.08);
					vividctx.drawImage(showtime,0,0,vividx,vividy);
				}
        }else{
            if($("stefanvdvivideffect1")){$("stefanvdvivideffect1").style.display = "none";}
            v.style.boxShadow = "0px 0px 0px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + hex3 + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + hex1 + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + hex2 + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + hex4 + "";
        }
	}else if($("ambilightfixcolor").checked == true){
    if($("stefanvdvivideffect1")){$("stefanvdvivideffect1").style.display = "none";}
	var fixhex = $("ambilightcolorhex").value;
	if(fixhex)fixhex = fixhex;else fixhex = '#000000';
	v.style.boxShadow = "0px 0px 0px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + fixhex + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + fixhex + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + fixhex + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + fixhex + "";
	}else if($("ambilight4color").checked == true){
    if($("stefanvdvivideffect1")){$("stefanvdvivideffect1").style.display = "none";}
	var fix1hex = $("ambilight1colorhex").value;
	var fix2hex = $("ambilight2colorhex").value;
	var fix3hex = $("ambilight3colorhex").value;
	var fix4hex = $("ambilight4colorhex").value;
	if(fix1hex)fix1hex = fix1hex;else fix1hex = '#FF0000';
	if(fix2hex)fix2hex = fix2hex;else fix2hex = '#FFEE00';
	if(fix3hex)fix3hex = fix3hex;else fix3hex = '#00FF00';
	if(fix4hex)fix4hex = fix4hex;else fix4hex = '#0000FF';
	v.style.boxShadow = "0px 0px 0px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + fix1hex + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + fix2hex + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + fix3hex + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + fix4hex + "";
	}

}else{v.style.boxShadow = "";if($("stefanvdvivideffect1")){$("stefanvdvivideffect1").style.display = "none";}}
}

// Fade engine
// Variable for the fade in and out effect
var opacity = 0;

var ReducingFinished = true;
var OpacityLevelIncrement = 10;   //  Percentage value: 1-100

//  Function determines whether we show or hide the item referenced by ElementID
function fader(ActionToTake)
{
  DIVElementById = $('example2');
  if(ActionToTake == 'hide')
  { opacity = default_opacity; reduceOpacity(); }
  else if(ActionToTake == 'show')
  { increaseOpacity(); }
}

//  Makes div increase
function increaseOpacity()
{
DIVElementById.style.display = '';
  //  If opacity level is less than default_opacity, we can still increase the opacity
  if((opacity < default_opacity) && (ReducingFinished == true))
  {
	if((opacity > (default_opacity-10)) && (ReducingFinished == true)){
    ReducingFinished = true;
    opacity  += (default_opacity - opacity);
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(increaseOpacity);
	}
	else{
    ReducingFinished = true;
    opacity  += OpacityLevelIncrement;
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(increaseOpacity);
	}
  }
  else
  {
    ReducingFinished = false;
  }
}

// Makes div reduce
function reduceOpacity() 
{
  // If opacity level is greater than 0, we can still reduce the opacity
  if((opacity > 0) && (ReducingFinished == false))
  {
    ReducingFinished = false;
    opacity  -= OpacityLevelIncrement;
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(reduceOpacity);
  }
  else
  {
    ReducingFinished = true;

    // When finished, make sure the DIVElementById is set to remove element
    if(DIVElementById.style.opacity = '0')
    {DIVElementById.style.display = 'none';}
  }
}

// Add a filter string to the list box.
function appendToListBox(boxId, text){ var elt = document.createElement("option"); elt.role = "option"; elt.text = text; elt.value = text; $(boxId).add(elt, null); }

function multiappendToListBox(boxId, text, phonenumber){
    var elt = document.createElement("option");
    elt.role = "option";
    elt.text = text;
    elt.value = text;
    $(boxId).add(elt, null);
    
    var phelt = document.createElement("option");
    phelt.role = "option";
    phelt.text = phonenumber;
    phelt.value = text;
    $("multiopacitynumberBox").add(phelt, null);
}

// tabel script
    var tabLinks = new Array();
    var contentDivs = new Array();
 
    function showTab(){
      var selectedId = getHash(this.getAttribute('data-tab'));
 
      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
      var id;
      for(id in contentDivs){
        if(id == selectedId){
          tabLinks[id].className = 'navbar-item-selected';
          contentDivs[id].className = 'page';
        }else{
          tabLinks[id].className = 'navbar-item';
          contentDivs[id].className = 'page hidden';
        }
      }
 
      // Stop the browser following the link
      return false;
    }
 
    function getFirstChildWithTagName(element,tagName){
        var i;
        var l = element.childNodes.length;
        for(i = 0; i < l; i++){
            if(element.childNodes[i].nodeName == tagName) return element.childNodes[i];
        }
    }
 
    function getHash(url){
      var hashPos = url.lastIndexOf('#');
      return url.substring(hashPos + 1);
    }

// whitelist eye domain
function addWhitelistDomain(){
    var domain = $("websiteurl").value;
    appendToListBox("excludedDomainsBox", domain);
    save_options();
}

function removeSelectedExcludedDomain(){
    var excludedDomainsBox = $("excludedDomainsBox");
    var i = excludedDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(excludedDomainsBox.options[i].selected)
            excludedDomainsBox.remove(i);
    }
    save_options();
}

// whitelist autoplay domain
function autoplayaddWhitelistDomain(){
    var domain = $("autoplaywebsiteurl").value;
    appendToListBox("autoplayDomainsBox", domain);
    save_options();
}

function autoplayremoveSelectedExcludedDomain(){
    var autoplayDomainsBox = $("autoplayDomainsBox");
    var i = autoplayDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(autoplayDomainsBox.options[i].selected)
            autoplayDomainsBox.remove(i);
    }
    save_options();
}

// whitelist atmosphere domain
function atmosphereaddWhitelistDomain(){
    var domain = $("atmospherewebsiteurl").value;
    appendToListBox("atmosphereDomainsBox", domain);
    save_options();
}

function atmosphereremoveSelectedExcludedDomain(){
    var atmosphereDomainsBox = $("atmosphereDomainsBox");
    var i = atmosphereDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(atmosphereDomainsBox.options[i].selected)
            atmosphereDomainsBox.remove(i);
    }
    save_options();
}

// whitelist night domain
function nightaddWhitelistDomain(){
    var domain = $("nightwebsiteurl").value;
    appendToListBox("nightDomainsBox", domain);
    save_options();
}

function nightremoveSelectedExcludedDomain(){
    var nightDomainsBox = $("nightDomainsBox");
    var i = nightDomainsBox.length-1
    for(i; i >= 0; i--){
        if(nightDomainsBox.options[i].selected)
            nightDomainsBox.remove(i);
    }
    save_options();
}

// whitelist cam motion domain
function cammotionaddWhitelistDomain(){
    var domain = $("cammotionwebsiteurl").value;
    appendToListBox("cammotionDomainsBox", domain);
    save_options();
}

function cammotionremoveSelectedExcludedDomain(){
    var cammotionDomainsBox = $("cammotionDomainsBox");
    var i = cammotionDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(cammotionDomainsBox.options[i].selected)
            cammotionDomainsBox.remove(i);
    }
    save_options();
}

// whitelist speech domain
function speechaddWhitelistDomain(){
    var domain = $("speechwebsiteurl").value;
    appendToListBox("speechDomainsBox", domain);
    save_options();
}

function speechremoveSelectedExcludedDomain(){
    var speechDomainsBox = $("speechDomainsBox");
    var i = speechDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(speechDomainsBox.options[i].selected)
            speechDomainsBox.remove(i);
    }
    save_options();
}

// whitelist autostop domain
function autostopaddWhitelistDomain(){
    var domain = $("autostopwebsiteurl").value;
    appendToListBox("autostopDomainsBox", domain);
    save_options();
}

function autostopremoveSelectedExcludedDomain(){
    var autostopDomainsBox = $("autostopDomainsBox");
    var i = autostopDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(autostopDomainsBox.options[i].selected)
            autostopDomainsBox.remove(i);
    }
    save_options();
}

// whitelist videotool domain
function videotooladdWhitelistDomain(){
    var domain = $("videotoolwebsiteurl").value;
    appendToListBox("videotoolDomainsBox", domain);
    save_options();
}

function videotoolremoveSelectedExcludedDomain(){
    var videotoolDomainsBox = $("videotoolDomainsBox");
    var i = videotoolDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(videotoolDomainsBox.options[i].selected)
            videotoolDomainsBox.remove(i);
    }
    save_options();
}

// whitelist multiopacity domain
function multiopacitychangeurl(){
  var selwzv = $("multiopacityDomainsBox").selectedIndex;
  $("multiopacitynumberBox").selectedIndex = selwzv;
}

function multiopacitychangenumberl(){
  var selwzv = $("multiopacitynumberBox").selectedIndex;
  $("multiopacityDomainsBox").selectedIndex = selwzv;
}

function multiopacityadd(){
    var domain = $("multiopacityname").value;
    var number = $("multiopacitynumber").value;
    if(domain == ""){return;}
    if(number == ""){return;}
    multiappendToListBox("multiopacityDomainsBox", domain, number);
    save_options();
}

function multiopacityremoveSelectedExcludedDomain(){
    var multiopacityDomainsBox = $("multiopacityDomainsBox");
    var multiopacitynumberBox = $("multiopacitynumberBox");
    var i = multiopacityDomainsBox.length - 1;
    for(i; i >= 0; i--){
        if(multiopacityDomainsBox.options[i].selected){
            multiopacityDomainsBox.remove(i);
            multiopacitynumberBox.remove(i);
        }
    }
    save_options();
}

// fade effects control -> not when loaded page
function lightscontrol(){
var jump = $('interval').value;
default_opacity = jump;
if($('onoffrange').value == 0)
{
if($('fadeout').checked == true){ReducingFinished = false;fader('hide');}else{$('example2').style.opacity = 0;$('example2').style.display = 'none';}
}
else{
if($('fadein').checked == true){ReducingFinished = true;fader('show');}else{$('example2').style.opacity = jump/100;$('example2').style.display = '';}
}
}

// remove dynamic elements
function removedynamic(){
var newdynmaster = $("stefanvddynamicbackground");
var fishtanks = $('fishtanks');
if(fishtanks){newdynmaster.removeChild(fishtanks);}
var blocks = $('blocks');
if(blocks){newdynmaster.removeChild(blocks);}
var raindrops = $('raindrops');
if(raindrops){newdynmaster.removeChild(raindrops);}
var clouds = $('clouds');
if(clouds){newdynmaster.removeChild(clouds);}
var space = $('space');
if(space){newdynmaster.removeChild(space);}
var smoke = $('smoke');
if(smoke){newdynmaster.removeChild(smoke);}
var flyingdots = $('flyingdots');
if(flyingdots){newdynmaster.removeChild(flyingdots);}
var storm = $('storm');
if(storm){newdynmaster.removeChild(storm);}
var triangle = $('triangle');
if(triangle){newdynmaster.removeChild(triangle);}
var stars = $('stars');
if(stars){newdynmaster.removeChild(stars);}
}

// test general
function test(){
if($('ambilight').checked == true){
drawAtmos();
}

// show alert warning
if($('ambilightvarcolor').checked == true)
{$('showwarningambilight').style.display = '';}
else{$('showwarningambilight').style.display = 'none';}

// YouTube preview sample
if($('head').checked == true)
{$('samplechannel').style.zIndex = 100;$('samplechannel').style.position = 'relative';$('videochannel').style.zIndex = 100;$('videochannel').style.position = 'relative';}
else{$('samplechannel').style.zIndex = 1;$('samplechannel').style.position = 'relative';$('videochannel').style.zIndex = 1;$('videochannel').style.position = 'relative';}

if($('playlist').checked == true){} // not visible in the preview
else{}

if($('infobar').checked == true)
{$('sampleinforbar').style.zIndex = 100;$('sampleinforbar').style.position = 'relative';}
else{$('sampleinforbar').style.zIndex = 1;$('sampleinforbar').style.position = 'relative';}

if($('likebutton').checked == true)
{$('sampledislikebutton').style.zIndex = 100;$('sampledislikebutton').style.position = 'relative';}
else{$('sampledislikebutton').style.zIndex = 1;$('sampledislikebutton').style.position = 'relative';}

if($('sharebutton').checked == true)
{$('samplesharebutton').style.zIndex = 100;$('samplesharebutton').style.position = 'relative';}
else{$('samplesharebutton').style.zIndex = 1;$('samplesharebutton').style.position = 'relative';}

if($('suggestions').checked == true)
{$('samplesug').style.zIndex = 100;$('samplesug').style.position = 'relative';}
else{$('samplesug').style.zIndex = 1;$('samplesug').style.position = 'relative';}

if($('videoheadline').checked == true){$('sampletitle').style.zIndex = 100;$('sampletitle').style.position = 'relative';$('sampletitle').style.color = '#FFFFFF';}
else{$('sampletitle').style.zIndex = 1;$('sampletitle').style.position = 'relative';$('sampletitle').style.color = '#000000';}

if($('viewcount').checked == true)
{$('sampleview').style.zIndex = 100;$('sampleview').style.color = 'white';$('sampleview').style.position = 'relative';}
else{$('sampleview').style.zIndex = 1;$('sampleview').style.color = 'black';$('sampleview').style.position = 'relative';}

if($('addvideobutton').checked == true)
{$('sampleaddbutton').style.zIndex = 100;$('sampleaddbutton').style.position = 'relative';}
else{$('sampleaddbutton').style.zIndex = 1;$('sampleaddbutton').style.position = 'relative';}

if($('likebar').checked == true)
{$('samplelikebar').style.zIndex = 101;$('samplelikebar').style.position = 'relative';}
else{$('samplelikebar').style.zIndex = 'auto';$('samplelikebar').style.position = 'relative';}

/* --- end YouTube preview --- */
if($('ambilight').checked == true)
{$('arangespread').disabled = false;$('ambilightrangespreadradius').disabled = false;$('arangeblur').disabled = false;$('ambilightrangeblurradius').disabled = false;$('ambilightfixcolor').disabled = false;$('ambilightvarcolor').disabled = false;$('ambilightcolorhex').disabled = false;$('ambilight4color').disabled = false;$('ambilight1colorhex').disabled = false;$('ambilight2colorhex').disabled = false;$('ambilight3colorhex').disabled = false;$('ambilight4colorhex').disabled = false;$('atmosontotlmode').disabled = false;$('atmosphereonly').disabled = false;$('vpause').disabled = false;
    if($('ambilightvarcolor').checked == true){
    $('atmosvivid').disabled = false;$('drawatmosfps').disabled = false;
	}else{
    $('atmosvivid').disabled = true;$('drawatmosfps').disabled = true;
    }
}
else{$('arangespread').disabled = true;$('ambilightrangespreadradius').disabled = true;$('arangeblur').disabled = true;$('ambilightrangeblurradius').disabled = true;$('ambilightfixcolor').disabled = true;$('ambilightvarcolor').disabled = true;$('ambilightcolorhex').disabled = true;$('ambilight4color').disabled = true;$('ambilight1colorhex').disabled = true;$('ambilight2colorhex').disabled = true;$('ambilight3colorhex').disabled = true;$('ambilight4colorhex').disabled = true;$('atmosontotlmode').disabled = true;$('atmosphereonly').disabled = true;$('vpause').disabled = true;$('atmosvivid').disabled = true;$('drawatmosfps').disabled = true;
}

if($('ambilightvarcolor').checked == true)
{
    if($('ambilight').checked == true){
    $('atmosvivid').disabled = false;$('drawatmosfps').disabled = false;
    }
}
else{
    if($('ambilight').checked == true){
        $('atmosvivid').disabled = true;$('drawatmosfps').disabled = true;
    }
}

if($('lightimagea').checked == true)
{$('lightimagen').checked = false;$('example1').style.background = 'url(' + $('lightimage').value + ')';$('example1').style.backgroundSize = "100% 100%";$('example2').style.background = 'url(' + $('lightimage').value + ')';$('example2').style.backgroundSize = "100% 100%";$('lightimage').disabled = false;$('lightcolor').disabled = true;
$('mousespotlighta').disabled = true;$('mousespotlightc').disabled = true;$('mousespotlighto').checked = true;}
else if($('lightimagen').checked == true){$('lightimagen').checked = true;$('example1').style.background = $('lightcolor').value;$('example2').style.background = $('lightcolor').value;$('lightimage').disabled = true;$('lightcolor').disabled = false;
$('mousespotlighta').disabled = false;$('mousespotlightc').disabled = false;}
else if($('lightimagelin').checked == true)
{var linearsq = document.getElementById("linearsq");
$('example1').style.background = 'linear-gradient(to ' + linearsq.options[linearsq.selectedIndex].value + ', ' + $('colora').value + ' ' + $('intervallina').value + '%,' + $('colorb').value + ' ' + $('intervallinb').value + '%)';
$('example2').style.background = 'linear-gradient(to ' + linearsq.options[linearsq.selectedIndex].value + ', ' + $('colora').value + ' ' + $('intervallina').value + '%,' + $('colorb').value + ' ' + $('intervallinb').value + '%)';
$('mousespotlighta').disabled = true;$('mousespotlightc').disabled = true;
if($('mousespotlighta').checked == true || $('mousespotlightc').checked == true){$('mousespotlighto').checked = true;}
}

if($('eyen').checked == true){$('ecosaver').disabled = false;$('ecosavertime').disabled = false;$('helpeyeprotection').style.display = "none";$('excludedDomainsBox').disabled = true;$('websiteurl').disabled = true;$('autoplay').disabled = false;$('autoplaydelay').disabled = false;$('autoplaydelaytime').disabled = false;$('addbutton').disabled = true;$('removebutton').disabled = true;$('nighttime').disabled = false;$('begintime').disabled = false;$('endtime').disabled = false;$('helpautoplay').style.display = "none";$('eyechecklistwhite').disabled = true;$('eyechecklistblack').disabled = true;}
else if($('eyea').checked == true){$('ecosaver').disabled = false;$('ecosavertime').disabled = false;$('helpeyeprotection').style.display = "";$('excludedDomainsBox').disabled = true;$('websiteurl').disabled = true;$('autoplay').checked = false;$('autoplaydelay').disabled = true;$('autoplaydelaytime').disabled = true;$('addbutton').disabled = true;$('removebutton').disabled = true;$('nighttime').disabled = false;$('begintime').disabled = false;$('endtime').disabled = false;$('helpautoplay').style.display = "";$('eyechecklistwhite').disabled = true;$('eyechecklistblack').disabled = true;}
else if($('eyealist').checked == true){$('ecosaver').disabled = false;$('ecosavertime').disabled = false;$('helpeyeprotection').style.display = "";$('excludedDomainsBox').disabled = false;$('websiteurl').disabled = false;$('autoplay').checked = false;$('autoplaydelay').disabled = true;$('autoplaydelaytime').disabled = true;$('addbutton').disabled = false;$('removebutton').disabled = false;$('nighttime').disabled = false;$('begintime').disabled = false;$('endtime').disabled = false;$('helpautoplay').style.display = "";$('eyechecklistwhite').disabled = false;$('eyechecklistblack').disabled = false;}

if($('mousespotlighto').checked == true)
{$('eastereggs').disabled = false;} // eastereggs OFF
else{$('eastereggs').disabled = true;$('eastereggs').checked = false;} // active box eastereggs

if($('mousespotlighta').checked == true){$('spotlightradius').disabled = false;}
else{$('spotlightradius').disabled = true;}

if($('nighttime').checked == true)
{}
else{$('begintime').disabled = true;$('endtime').disabled = true;}

if($('password').checked == true)
{$('enterpassword').disabled = false;$('confirmpassword').disabled = false;}
else{$('enterpassword').disabled = true;$('confirmpassword').disabled = true;}

if($('ecosaver').checked == true)
{$('ecosavertime').disabled = false;$('nighttime').disabled = false;
	if($('eyen').checked == true){
	$('begintime').disabled = false;$('endtime').disabled = false;
	}
}
else{$('ecosavertime').disabled = true;
	if($('eyen').checked == true){
	$('nighttime').disabled = true;$('begintime').disabled = true;$('endtime').disabled = true;
	}
}

if($('autoplayonly').checked == true)
{$('autoplayonly').checked = true;$('autoplayDomainsBox').disabled = false;$('autoplaywebsiteurl').disabled = false;$('autoplayaddbutton').disabled = false;$('autoplayremovebutton').disabled = false;$('autoplaychecklistwhite').disabled = false;$('autoplaychecklistblack').disabled = false;}
else{$('autoplayonly').checked = false;$('autoplayDomainsBox').disabled = true;$('autoplaywebsiteurl').disabled = true;$('autoplayaddbutton').disabled = true;$('autoplayremovebutton').disabled = true;$('autoplaychecklistwhite').disabled = true;$('autoplaychecklistblack').disabled = true;}

if($('atmosphereonly').checked == true)
{$('atmosphereonly').checked = true;$('atmosphereDomainsBox').disabled = false;$('atmospherewebsiteurl').disabled = false;$('atmosphereaddbutton').disabled = false;$('atmosphereremovebutton').disabled = false;}
else{$('atmosphereonly').checked = false;$('atmosphereDomainsBox').disabled = true;$('atmospherewebsiteurl').disabled = true;$('atmosphereaddbutton').disabled = true;$('atmosphereremovebutton').disabled = true;}

if($('nightonly').checked == true)
{$('nightonly').checked = true;$('nightDomainsBox').disabled = false;$('nightwebsiteurl').disabled = false;$('nightaddbutton').disabled = false;$('nightremovebutton').disabled = false;$('nightmodechecklistwhite').disabled = false;$('nightmodechecklistblack').disabled = false;}
else{$('nightonly').checked = false;$('nightDomainsBox').disabled = true;$('nightwebsiteurl').disabled = true;$('nightaddbutton').disabled = true;$('nightremovebutton').disabled = true;$('nightmodechecklistwhite').disabled = true;$('nightmodechecklistblack').disabled = true;}

if($('autoplay').checked == true)
{
    $('aplay').disabled = false;$('apause').disabled = false;$('astop').disabled = false;$('eyen').checked = true;$('excludedDomainsBox').disabled = true;$('websiteurl').disabled = true;$('autoplaydelay').disabled = false;
    if($('autoplaydelay').checked == true)
    {$('autoplaydelaytime').disabled = false;}
    else{$('autoplaydelaytime').disabled = true;}
}
else{$('aplay').disabled = true;$('apause').disabled = true;$('astop').disabled = true;$('autoplaydelay').disabled = true;
    if($('autoplaydelay').checked == true)
    {$('autoplaydelaytime').disabled = false;}
    else{$('autoplaydelaytime').disabled = true;}
}

if($('videovolume').checked == true){$('videovolumealt').disabled = false;}
else{$('videovolumealt').disabled = true;}

if($('motion').checked == true){
    cameramotionlights();
    $('cammotiononly').disabled = false;
    if($('cammotiononly').checked == true)
    {$('cammotiononly').checked = true;$('cammotionDomainsBox').disabled = false;$('cammotionwebsiteurl').disabled = false;$('cammotionaddbutton').disabled = false;$('cammotionremovebutton').disabled = false;}
    else{$('cammotionDomainsBox').disabled = true;$('cammotionwebsiteurl').disabled = true;$('cammotionaddbutton').disabled = true;$('cammotionremovebutton').disabled = true;}
}
else{
    cameramotionlights();
    $('cammotiononly').disabled = true;$('cammotionDomainsBox').disabled = true;$('cammotionwebsiteurl').disabled = true;$('cammotionaddbutton').disabled = true;$('cammotionremovebutton').disabled = true;
}

if($('speech').checked == true){
    $('select_language').disabled = false;$('select_dialect').disabled = false;
    $('speechonly').disabled = false;
    if($('speechonly').checked == true){$('speechDomainsBox').disabled = false;$('speechwebsiteurl').disabled = false;$('speechaddbutton').disabled = false;$('speechremovebutton').disabled = false;}
    else{$('speechDomainsBox').disabled = true;$('speechwebsiteurl').disabled = true;$('speechaddbutton').disabled = true;$('speechremovebutton').disabled = true;}
}
else{
    $('select_language').disabled = true;$('select_dialect').disabled = true;
    $('speechonly').disabled = true;$('speechDomainsBox').disabled = true;$('speechwebsiteurl').disabled = true;$('speechaddbutton').disabled = true;$('speechremovebutton').disabled = true;
}

if($('nightactivetime').checked == true){$('nmbegintime').disabled = false;$('nmendtime').disabled = false;}
else{$('nmbegintime').disabled = true;$('nmendtime').disabled = true;}

if($('nighttheme').checked == true){$('lampandnightmode').disabled = false;$('nightmodeswitchhide').disabled = false;$('nightmodeswitchhidetime').disabled = false;}
else{$('lampandnightmode').disabled = true;$('nightmodeswitchhide').disabled = true;$('nightmodeswitchhidetime').disabled = true;}

if($('autostop').checked == true){$('autostopred').disabled = false;$('autostoptrans').disabled = false;}
else{$('autostopred').disabled = true;$('autostoptrans').disabled = true;}

if($('autostoponly').checked == true){$('autostopchecklistwhite').disabled = false;$('autostopchecklistblack').disabled = false;$('autostopDomainsBox').disabled = false;$('autostopwebsiteurl').disabled = false;$('autostopaddbutton').disabled = false;$('autostopremovebutton').disabled = false;}
else{$('autostopchecklistwhite').disabled = true;$('autostopchecklistblack').disabled = true;$('autostopDomainsBox').disabled = true;$('autostopwebsiteurl').disabled = true;$('autostopaddbutton').disabled = true;$('autostopremovebutton').disabled = true;}

if($('videotoolonly').checked == true){$('videotoolchecklistwhite').disabled = false;$('videotoolchecklistblack').disabled = false;$('videotoolDomainsBox').disabled = false;$('videotoolwebsiteurl').disabled = false;$('videotooladdbutton').disabled = false;$('videotoolremovebutton').disabled = false;}
else{$('videotoolchecklistwhite').disabled = true;$('videotoolchecklistblack').disabled = true;$('videotoolDomainsBox').disabled = true;$('videotoolwebsiteurl').disabled = true;$('videotooladdbutton').disabled = true;$('videotoolremovebutton').disabled = true;}

if($('reflection').checked == true){$('reflectionamount').disabled = false;$('beeld').style.webkitBoxReflect = "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(black),color-stop("+(100-$('reflectionamount').value)/100+", transparent))";}
else{$('reflectionamount').disabled = true;$('beeld').style.webkitBoxReflect = "";}

if($('multiopacall').checked == true){$('multiopacityname').disabled = true;$('multiopacitynumber').disabled = true;$('multiopacityDomainsBox').disabled = true;$('multiopacitynumberBox').disabled = true;$('multiopacityremovebutton').disabled = true;$('multiopacityaddbutton').disabled = true;}
else{$('multiopacityname').disabled = false;$('multiopacitynumber').disabled = false;$('multiopacityDomainsBox').disabled = false;$('multiopacitynumberBox').disabled = false;$('multiopacityremovebutton').disabled = false;$('multiopacityaddbutton').disabled = false;}

if($('hovervideo').checked == true){$('hovervideoamount').disabled = false;}
else{$('hovervideoamount').disabled = true;}

if($('playrate').checked == true){$('playrateamount').disabled = false;}
else{$('playrateamount').disabled = true;}

if($('customqualityyoutube').checked == true){$('youtubequality').disabled = false;$('block60fps').disabled = false;}
else{$('youtubequality').disabled = true;$('block60fps').disabled = true;}

if($('seeanalytics').checked == true){
    $('seeanalparta').style.display = "";
    $('seeanalpartb').style.display = "";
    $('seeanalpartc').style.display = "";
    $('seeanalpartd').style.display = "";
    $('seeanalparte').style.display = "";
    $('seeanalpartf').style.display = "";
    $('seeanalreset').style.display = "";
}
else{
    $('seeanalparta').style.display = "none";
    $('seeanalpartb').style.display = "none";
    $('seeanalpartc').style.display = "none";
    $('seeanalpartd').style.display = "none";
    $('seeanalparte').style.display = "none";
    $('seeanalpartf').style.display = "none";
    $('seeanalreset').style.display = "none";
    
    // reset the analytics
    chrome.storage.sync.set({"analytics":null,"siteengagement":null});
}

// done with reading
// run now the dynamic background if enabled
dynamictest();

// wizard user profile
$('ska').style.background = $('profileAcolor').value;
$('ska').style.opacity = $('profileAopacity').value/100;
$('ska').style.opacity = $('profileAopacity').value/100;
if($('profileAmouse').checked == true){
    $('ska').style.pointerEvents = "none";
}else{
   $('ska').style.pointerEvents = "";
}
$('profileB').style.background = $('profileBnightback').value;
$('profileB').style.color = $('profileBnighttext').value;
$('profileBlink').style.color = $('profileBnightlink').value;
$('skc').style.background = $('profileCcolor').value;
$('skc').style.opacity = $('profileCopacity').value/100;
// end wizard ---

// function available
if(typeof browser !== 'undefined'){
    var qtest = browser.theme.update;
    if(typeof qtest !== 'undefined'|| qtest != null){
    $('brotheme').style.display = "block";
    }else{
    $('brotheme').style.display = "none";
    }
}else{
    $('brotheme').style.display = "none";
}
}

function ariacheck(){
    var inputs = document.querySelectorAll('input');
    var i;
    var l = inputs.length;
    for(i = 0; i < l; i++){
        if(inputs[i].getAttribute("role") == "radio" || inputs[i].getAttribute("role") == "checkbox"){
            if(inputs[i].checked == true){
                inputs[i].setAttribute("aria-checked", true);
            }else{
                inputs[i].setAttribute("aria-checked", false);
            }
        }
    }
}

function dynamictest(){
if($("dynamic").checked == true){
    if($("dynamic5").checked == true){$('hoveroptiondyn5').disabled = false;}
    else{$('hoveroptiondyn5').disabled = true;}
}else{
    $('hoveroptiondyn5').disabled = true;
}

var newdynmaster = $("stefanvddynamicbackground");
if($("dynamic").checked == true){
if($("dynamic1").checked == true){
removedynamic();
	var fishtanks = document.createElement("div");fishtanks.setAttribute('id','fishtanks');newdynmaster.appendChild(fishtanks);

    var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundbubbleleft');fishtanks.appendChild(newdynleft);
    var i;
	for(i = 0; i < 5; i++){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynleft.appendChild(newdyn);}
	var newdynmid = document.createElement("div");newdynmid.setAttribute('class','stefanvddynamicbackgroundbubblemid');fishtanks.appendChild(newdynmid);
    var i;
    for(i = 6; i < 10; i++){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynmid.appendChild(newdyn);}			
	var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundbubbleright');fishtanks.appendChild(newdynright);	
    var i;
    for(i = 11; i < 16; i++){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynright.appendChild(newdyn);}
}
else if($("dynamic2").checked == true){
removedynamic();
	var blocks = document.createElement("div");blocks.setAttribute('id','blocks');newdynmaster.appendChild(blocks);

    var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');blocks.appendChild(newdynleft);
    var i;
	for(i = 1; i < 21; i++){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundblocks stefanvddynamicblocks'+i+'');newdynleft.appendChild(newdyn);}
}
else if($("dynamic3").checked == true){
removedynamic();
	var raindrops = document.createElement("div");raindrops.setAttribute('id','raindrops');newdynmaster.appendChild(raindrops);

	var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');raindrops.appendChild(newdynleft);
    var i;
    for(i = 0; i < 15; i++){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundraindrups b'+i+'');newdynleft.appendChild(newdyn);}
}
else if($("dynamic4").checked == true){
removedynamic();
	var clouds = document.createElement("div");clouds.setAttribute('id','clouds');newdynmaster.appendChild(clouds);
	var newdynworld = document.createElement("div");newdynworld.setAttribute('id','stefanvdworld');clouds.appendChild(newdynworld);			
(function(){
		var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        var x;
        var lvendor = vendors.length;
		for(x = 0; x < lvendor && !window.requestAnimationFrame; ++x){
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelRequestAnimationFrame = window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if(!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element){
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function(){ callback(currTime + timeToCall); }, 
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if(!window.cancelAnimationFrame)window.cancelAnimationFrame = function(id){window.clearTimeout(id);};
	}())

	var layers = [],objects = [],world = document.getElementById('stefanvdworld'),viewport = document.getElementById('stefanvddynamicbackground'),	
	d = 0,p = 400,worldXAngle = 0,worldYAngle = 0;
	
	viewport.style.webkitPerspective = p;viewport.style.MozPerspective = p;viewport.style.oPerspective = p;
	generate();
	
	function createCloud(){
		var div = document.createElement( 'div'  );
		div.className = 'stefanvdcloudBase';
		var x = 256 - ( Math.random() * 512 );
		var y = 256 - ( Math.random() * 512 );
		var z = 256 - ( Math.random() * 512 );
		var t = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px)';
		div.style.webkitTransform = t;div.style.MozTransform = t;div.style.oTransform = t;
		world.appendChild(div);
        
        var j;
        var l = 5 + Math.round( Math.random() * 10 );
		for(j = 0; j < l; j++){
			var cloud = document.createElement('div');
			cloud.style.opacity = 0;
			cloud.style.opacity = .8;
			cloud.className = 'stefanvdcloudLayer';
			var x = 256 - ( Math.random() * 512 );
			var y = 256 - ( Math.random() * 512 );
			var z = 100 - ( Math.random() * 200 );
			var a = Math.random() * 360;;
			var s = .25 + Math.random();
			x *= .2; y *= .2;
			cloud.data = {x: x,y: y,z: z,a: a,s: s,speed: .1 * Math.random()};
			var t = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px) rotateZ(' + a + 'deg) scale(' + s + ')';
			cloud.style.webkitTransform = t;cloud.style.MozTransform = t;cloud.style.oTransform = t;
			div.appendChild(cloud);
			layers.push(cloud);
		}
		return div;
	}
	
	function generate(){
		objects = [];
		if(world.hasChildNodes()){
			while ( world.childNodes.length >= 1 ){world.removeChild(world.firstChild);} 
        }
        var j;
		for(j = 0; j < 5; j++){objects.push(createCloud());}
	}
	
	function updateView(){
		var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
		world.style.webkitTransform = t;world.style.MozTransform = t;world.style.oTransform = t;}
	
	function update(){
        var j;
        var l = layers.length;
		for(j = 0; j < l; j++){
			var layer = layers[j];
			layer.data.a += layer.data.speed;
			var t = 'translateX(' + layer.data.x + 'px) translateY(' + layer.data.y + 'px) translateZ(' + layer.data.z + 'px) rotateY(' + ( - worldYAngle ) + 'deg) rotateX(' + ( - worldXAngle ) + 'deg) rotateZ(' + layer.data.a + 'deg) scale(' + layer.data.s + ')';
			layer.style.webkitTransform = t;layer.style.MozTransform = t;layer.style.oTransform = t;
		}
		requestAnimationFrame(update);
	}
	update();


}
else if($("dynamic5").checked == true){
removedynamic();
if($("hoveroptiondyn5").checked == true){
	var space = document.createElement("div");space.setAttribute('id','space');newdynmaster.appendChild(space);

	var newdynspaceworld = document.createElement("div");newdynspaceworld.setAttribute('id','stefanvddynamicspace');space.appendChild(newdynspaceworld);			
    var j;
    for(j = 1; j < 17; j++){
	if(j <= 9){j="0"+j}
		var newdynpart1 = document.createElement("div");
        newdynpart1.setAttribute('id','p'+ j);newdynspaceworld.appendChild(newdynpart1);
        var i;
		for(i = 1; i < 31; i++){
		if(i <= 9){i="0"+i}
		var newdynlow = document.createElement("b");newdynlow.setAttribute('class','s0'+i+'');newdynpart1.appendChild(newdynlow);
		}
	}
}else{
	var space = document.createElement("div");space.setAttribute('id','space');newdynmaster.appendChild(space);

    var newdynspaceworld = document.createElement("div");newdynspaceworld.setAttribute('id','stefanvddynamicspacenoflying');space.appendChild(newdynspaceworld);
    var j;
	for(j = 1; j < 17; j++){
	if(j <= 9){j="0"+j}
		var newdynpart1 = document.createElement("div");
        newdynpart1.setAttribute('id','np'+ j);newdynspaceworld.appendChild(newdynpart1);
        var i;
		for(i = 1; i < 31; i++){
		if(i <= 9){i="0"+i}
		var newdynlow = document.createElement("b");newdynlow.setAttribute('class','ns0'+i+'');newdynpart1.appendChild(newdynlow);
		}
	}
}

}else if($("dynamic6").checked == true){
removedynamic();
var smoke = document.createElement("div");smoke.setAttribute('id','smoke');smoke.style.width = "100%";smoke.style.height = "100%";newdynmaster.appendChild(smoke);
var newsmokecanvas = document.createElement("canvas");newsmokecanvas.setAttribute('id','stefanvddynamicsmoke');newsmokecanvas.style.width = "100%";newsmokecanvas.style.height = "100%";smoke.appendChild(newsmokecanvas);	

// Create an array to store our particles
var particles = [];

// The amount of particles to render
var particleCount = 30;

// The maximum velocity in each direction
var maxVelocity = 2;

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 20;

// Set the dimensions of the canvas as variables so they can be used.
var canvasWidth = 400;
var canvasHeight = 400;

// Create an image object (only need one instance)
var imageObj = new Image();

// Once the image has been downloaded then set the image on all of the particles
imageObj.onload = function(){
    particles.forEach(function(particle){
            particle.setImage(imageObj);
    });
};

// Once the callback is arranged then set the source of the image
imageObj.src = "images/Smoke10.png";

// A function to create a particle object.
function Particle(context){

    // Set the initial x and y positions
    this.x = 0;
    this.y = 0;

    // Set the initial velocity
    this.xVelocity = 0;
    this.yVelocity = 0;

    // Set the radius
    this.radius = 5;

    // Store the context which will be used to draw the particle
    this.context = context;

    // The function to draw the particle on the canvas.
    this.draw = function(){
        
        // If an image is set draw it
        if(this.image){
            this.context.drawImage(this.image, this.x-128, this.y-128);         
            // If the image is being rendered do not draw the circle so break out of the draw function                
            return;
        }
        // Draw the circle as before, with the addition of using the position and the radius from this object.
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba(88, 88, 88, 1)";
        this.context.fill();
        this.context.closePath();
    };

    // Update the particle.
    this.update = function(){
        // Update the position of the particle with the addition of the velocity.
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Check if has crossed the right edge
        if(this.x >= canvasWidth){
            this.xVelocity = -this.xVelocity;
            this.x = canvasWidth;
        }
        // Check if has crossed the left edge
        else if(this.x <= 0){
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if(this.y >= canvasHeight){
            this.yVelocity = -this.yVelocity;
            this.y = canvasHeight;
        }
        
        // Check if has crossed the top edge
        else if(this.y <= 0){
            this.yVelocity = -this.yVelocity;
            this.y = 0;
        }
    };

    // A function to set the position of the particle.
    this.setPosition = function(x, y){
        this.x = x;
        this.y = y;
    };

    // Function to set the velocity.
    this.setVelocity = function(x, y){
        this.xVelocity = x;
        this.yVelocity = y;
    };
    
    this.setImage = function(image){
        this.image = image;
    }
}

// A function to generate a random number between 2 values
function generateRandom(min, max){return Math.random() * (max - min) + min;}

var context;
// Initialise the scene and set the context if possible
function runsmoke(){
    var canvas = document.getElementById('stefanvddynamicsmoke');
    if(canvas.getContext){
        // Set the context variable so it can be re-used
        context = canvas.getContext('2d', {desynchronized: true});
        // Create the particles and set their initial positions and velocities
        var i;
        for(i = 0; i < particleCount; ++i){
            var particle = new Particle(context);
            
            // Set the position to be inside the canvas bounds
            particle.setPosition(generateRandom(0, canvasWidth), generateRandom(0, canvasHeight));
            
            // Set the initial velocity to be either random and either negative or positive
            particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
            particles.push(particle);            
        }
    }
}

// The function to draw the scene
function draw(){
    // Clear the drawing surface and fill it with a black background
    context.fillStyle = "rgba(0, 0, 0, 0.0)";
    context.fillRect(0, 0, 400, 400);

    // Go through all of the particles and draw them.
    particles.forEach(function(particle){
        particle.draw();
    });
}

// Update the scene
function smokeupdate(){
    particles.forEach(function(particle){
        particle.update();
    });
}

// Initialize the scene
runsmoke();

// If the context is set then we can draw the scene (if not then the browser does not support canvas)
if(context){
    if(document.visibilityState === "visible"){
    window.setInterval(function(){
        // Update the scene before drawing
        smokeupdate();

        // Draw the scene
        draw();
    }, 1000 / targetFPS);
    }
}

}else if($("dynamic7").checked == true){
removedynamic();
var flyingdots = document.createElement("div");flyingdots.setAttribute('id','flyingdots');newdynmaster.appendChild(flyingdots);
    var newdyndotsworld = document.createElement("div");newdyndotsworld.setAttribute('id','stefanvddynamicdots');flyingdots.appendChild(newdyndotsworld);
    var j;
	for(j = 1; j < 100; j++){
		var newminic = document.createElement("div");
		newminic.className = "c";
		newdyndotsworld.appendChild(newminic);
	}
}else if($("dynamic8").checked == true){
removedynamic();
var storm = document.createElement("div");storm.setAttribute('id','storm');newdynmaster.appendChild(storm);
var newstormcanvas = document.createElement("canvas");newstormcanvas.setAttribute('id','stefanvddynamicstorm');newstormcanvas.style.width = "100%";newstormcanvas.style.height = "100%";storm.appendChild(newstormcanvas);	

var stormcanvas = document.getElementById('stefanvddynamicstorm');
var sky = stormcanvas.getContext('2d', {desynchronized: true});

var window_width = window.innerWidth * 1.5;
var window_height = window.innerHeight * 1.5;

var fall_speed = 0.7;
var wind_speed = 5;

var rain_weight = 0.11;
var rain_color = '255,255,255';

var drop_count;
var drops = [];

function randomFrom(min, max){
  return (Math.random() * (max - min) + min);
}

function resizer(){
  window_width = window.innerWidth * 1.5;
  window_height = window.innerHeight * 1.5;
  drop_count = window_width * rain_weight;
  
  stormcanvas.setAttribute('width', window_width);
  stormcanvas.setAttribute('height', window_height);
}

window.addEventListener('resize', resizer, false);

function paintSky(){
    if(document.visibilityState === "visible"){
        var i;
        for(i = 0; i < drop_count; i++){
            drops[i] = new drop();
            drops[i].reset();
        }
  
        rain();
    }
}

function rain(){
  sky.clearRect(0, 0, window_width, window_height);

  var drops_length = drops.length;

  var i;
  for(i = 0; i < drops_length; i++){
    var drop = drops[i];
    drop.fall();
    drop.draw();
  }

  window.requestAnimFrame(rain);
}

function drop(){
  this.reset = function(){
    this.r = randomFrom(0.8, 1.6);
    this.l = (this.r * 250);
    this.x = randomFrom((window_width * -0.25), (window_width * 1.125));
    this.y = randomFrom((window_height * -0.25), (window_height * -1));
    this.dx = randomFrom((wind_speed - 3), (wind_speed + 3));
    this.dy = (this.r * (100 * fall_speed));
    this.offset = (this.l * (this.dx / this.dy));
    this.opacity = (this.r * randomFrom(0.2, 0.6));
    this.drip = this.render();
  };
  
  this.render = function(){
    var canv = document.createElement('canvas');
    var ctx = canv.getContext('2d', {desynchronized: true});
    canv.setAttribute('width', Math.abs(this.offset) + this.r);
    canv.setAttribute('height', this.l);
    
    ctx.beginPath();
    
    var drip = ctx.createLinearGradient(0, 0, 0, this.l);
    drip.addColorStop(0, 'rgba(' + rain_color + ', 0)');
    drip.addColorStop(1, 'rgba(' + rain_color + ', ' + this.opacity + ')');
    ctx.fillStyle = drip;
        
    //sky.rect(this.x, this.y, this.r, this.l);
    var startX = (this.offset >= 0) ? 0 : Math.abs(this.offset);
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX + this.r, 0);
    ctx.lineTo(startX + this.r + this.offset, this.l);
    ctx.lineTo(startX + this.offset, this.l);

    ctx.closePath();
    ctx.fill();
    
    return canv;
  };
  
  this.draw = function(){
    sky.drawImage(this.drip, this.x, this.y);
  };
  
  this.fall = function(){
    this.x += this.dx;
    this.y += this.dy;
    
    if(this.y > (window_height * 1.25)){
      this.reset();
    }
  };
}

resizer();
paintSky();

}else if($("dynamic9").checked == true){
removedynamic();
var triangle = document.createElement("div");triangle.setAttribute('id','triangle');newdynmaster.appendChild(triangle);
	
var refreshDuration = 10000;
var refreshTimeout;
var numPointsX;
var numPointsY;
var unitWidth;
var unitHeight;
var points;

function trianglerun(){
    var triasvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    triasvg.setAttribute('width',window.innerWidth);
    triasvg.setAttribute('height',window.innerHeight);
    document.getElementById('triangle').appendChild(triasvg);

    var unitSize = (window.innerWidth+window.innerHeight)/20;
    numPointsX = Math.ceil(window.innerWidth/unitSize)+1;
    numPointsY = Math.ceil(window.innerHeight/unitSize)+1;
    unitWidth = Math.ceil(window.innerWidth/(numPointsX-1));
    unitHeight = Math.ceil(window.innerHeight/(numPointsY-1));

    points = [];

    var y;
    for(y = 0; y < numPointsY; y++){
        var x;
        for(x = 0; x < numPointsX; x++){
            points.push({x:unitWidth*x, y:unitHeight*y, originX:unitWidth*x, originY:unitHeight*y});
        }
    }

    randomize();

    var i;
    var l = points.length;
    for(i = 0; i < l; i++){
        if(points[i].originX != unitWidth*(numPointsX-1) && points[i].originY != unitHeight*(numPointsY-1)){
            var topLeftX = points[i].x;
            var topLeftY = points[i].y;
            var topRightX = points[i+1].x;
            var topRightY = points[i+1].y;
            var bottomLeftX = points[i+numPointsX].x;
            var bottomLeftY = points[i+numPointsX].y;
            var bottomRightX = points[i+numPointsX+1].x;
            var bottomRightY = points[i+numPointsX+1].y;

            var rando = Math.floor(Math.random()*2);

            var n;
            for(n = 0; n < 2; n++){
                var polygon = document.createElementNS(triasvg.namespaceURI, 'polygon');

                if(rando==0){
                    if(n==0){
                        polygon.point1 = i;
                        polygon.point2 = i+numPointsX;
                        polygon.point3 = i+numPointsX+1;
                        polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+bottomRightX+','+bottomRightY);
                    }else if(n==1){
                        polygon.point1 = i;
                        polygon.point2 = i+1;
                        polygon.point3 = i+numPointsX+1;
                        polygon.setAttribute('points',topLeftX+','+topLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                    }
                }else if(rando==1){
                    if(n==0){
                        polygon.point1 = i;
                        polygon.point2 = i+numPointsX;
                        polygon.point3 = i+1;
                        polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY);
                    }else if(n==1){
                        polygon.point1 = i+numPointsX;
                        polygon.point2 = i+1;
                        polygon.point3 = i+numPointsX+1;
                        polygon.setAttribute('points',bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                    }
                }
                polygon.setAttribute('fill','rgba(0,0,0,'+(Math.random()/3)+')');
                var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
                animate.setAttribute('fill','freeze');
                animate.setAttribute('attributeName','points');
                animate.setAttribute('dur',refreshDuration+'ms');
                animate.setAttribute('calcMode','linear');
                polygon.appendChild(animate);
                triasvg.appendChild(polygon);
            }
        }
    }
    refresh();
}

function randomize(){
    var i;
    var l = points.length;
    for(i = 0; i < l; i++){
        if(points[i].originX != 0 && points[i].originX != unitWidth*(numPointsX-1)){
            points[i].x = points[i].originX + Math.random()*unitWidth-unitWidth/2;
        }
        if(points[i].originY != 0 && points[i].originY != unitHeight*(numPointsY-1)){
            points[i].y = points[i].originY + Math.random()*unitHeight-unitHeight/2;
        }
    }
}

function refresh(){
    if(document.visibilityState === "visible"){
    randomize();
    var i;
    var l = document.querySelector('#triangle svg').childNodes.length;
    for(i = 0; i < l; i++){
        var polygon = document.querySelector('#triangle svg').childNodes[i];
        var animate = polygon.childNodes[0];
        if(animate.getAttribute('to')){
            animate.setAttribute('from',animate.getAttribute('to'));
        }
        animate.setAttribute('to',points[polygon.point1].x+','+points[polygon.point1].y+' '+points[polygon.point2].x+','+points[polygon.point2].y+' '+points[polygon.point3].x+','+points[polygon.point3].y);
        animate.beginElement();
    }
    refreshTimeout = window.setTimeout(function(){refresh();}, refreshDuration);
    }
}

trianglerun();

function onResize(){
document.querySelector('#triangle svg').remove();
window.clearTimeout(refreshTimeout);
trianglerun();
}

window.onresize = onResize;

}else if($("dynamic10").checked == true){
removedynamic();
var stars = document.createElement("div");stars.setAttribute('id','stars');newdynmaster.appendChild(stars);
var j;
	for(j = 1; j < 3; j++){
		var newmstar = document.createElement("div");
		newmstar.id = "mstars"+[j];
		stars.appendChild(newmstar);
	}
}

}
}

// Cam Motion
var localMediaStream = null;

var width; var height;
var huemin; var huemax; var satmin; var satmax; var valmin; var valmax;
var last; var thresh; var down; var wasdown;
var movethresh; var brightthresh; var overthresh;
var avg;
var state;
var intervalID;
var draw;
var skin_filter;
var r; var g; var b; var a;
var hsv;
var delt;

window.URL = window.URL || window.webkitURL;

if(window.location.href != totloptionspage){
    document.addEventListener('DOMContentLoaded', cameradomcontentloaded);
}else{
    cameradomcontentloaded();
}

function cameradomcontentloaded(){
var video = document.getElementById('motionvideo');
var canvas = document.getElementById('motioncanvas');
var canvasgetcont = canvas.getContext('2d', {desynchronized: true});
var ccanvas = document.getElementById('motioncomp');
var ccgetcont = ccanvas.getContext('2d', {desynchronized: true});

// document.getElementById('motionvideo').addEventListener('timeupdate', function(){ dump(); });
document.getElementById('motionvideo').addEventListener('play', function(){ intervalID = window.setInterval(dump,1000/25); });

var compression = 5;
width = height = 0;

        function dump(){
            if(localMediaStream){
                if(canvas.width != video.videoWidth){
                    width = Math.floor(video.videoWidth / compression);
                    height = Math.floor(video.videoHeight / compression);
                    canvas.width = ccanvas.width = width;
                    canvas.height = ccanvas.height = height;
                }
                if(width != 0){
                    canvasgetcont.drawImage(video, width, 0, -width, height);
                    draw = canvasgetcont.getImageData(0, 0, width, height);
                    //ccgetcont.putImageData(draw,0,0);
                    skinfilter();
                    camtest();
                }
            }
        }

huemin = 0.0; huemax = 0.10; satmin = 0.0; satmax = 1.0; valmin = 0.4; valmax = 1.0;
        function skinfilter(){
            skin_filter = canvasgetcont.getImageData(0, 0, width, height)
            var total_pixels = skin_filter.width * skin_filter.height
            var index_value = total_pixels * 4

            var count_data_big_array = 0;
            var y;
            for(y = 0 ; y < height ; y++){
                var x;
                for(x = 0 ; x < width ; x++){
                    index_value = x + y * width
                    r = draw.data[count_data_big_array]
                    g = draw.data[count_data_big_array + 1]
                    b = draw.data[count_data_big_array + 2]
                    a = draw.data[count_data_big_array + 3]

                    hsv = rgb2Hsv(r, g, b);
                    //When the hand is too lose (hsv[0] > 0.59 && hsv[0] < 1.0)
                    //Skin Range on HSV values
                    if(((hsv[0] > huemin && hsv[0] < huemax) || (hsv[0] > 0.59 && hsv[0] < 1.0)) && (hsv[1] > satmin && hsv[1] < satmax) && (hsv[2] > valmin && hsv[2] < valmax)){
                        skin_filter[count_data_big_array] = r
                        skin_filter[count_data_big_array + 1] = g
                        skin_filter[count_data_big_array + 2] = b
                        skin_filter[count_data_big_array + 3] = a
                    } else{
                        skin_filter.data[count_data_big_array] =
                        skin_filter.data[count_data_big_array + 1] =
                        skin_filter.data[count_data_big_array + 2] = 0
                        skin_filter.data[count_data_big_array + 3] = 0
                    }

                    count_data_big_array = index_value * 4;
                }
            }
            draw = skin_filter
        }

        function rgb2Hsv(r, g, b){

            r = r / 255
            g = g / 255
            b = b / 255;

            var max = Math.max(r, g, b)
            var min = Math.min(r, g, b);

            var h, s, v = max;

            var d = max - min;

            s = max == 0 ? 0 : d / max;

            if(max == min){
                h = 0; // achromatic
            }else{

                switch (max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [h, s, v];
        }

        last = false; thresh = 150; down = false; wasdown = false;
        function camtest(){
            delt = canvasgetcont.createImageData(width, height)
            if(last !== false){
                var totalx = 0, totaly = 0, totald = 0, totaln = delt.width * delt.height
                , dscl = 0
                , pix = totaln * 4; while (pix -= 4){
                    var d = Math.abs(
                            draw.data[pix] - last.data[pix]
                    ) + Math.abs(
                            draw.data[pix + 1] - last.data[pix + 1]
                    ) + Math.abs(
                            draw.data[pix + 2] - last.data[pix + 2]
                    )
                    if(d > thresh){
                        delt.data[pix] = 160
                        delt.data[pix + 1] = 255
                        delt.data[pix + 2] =
                delt.data[pix + 3] = 255
                        totald += 1
                        totalx += ((pix / 4) % width)
                        totaly += (Math.floor((pix / 4) / delt.height))
                    }
                    else{
                        delt.data[pix] =
                                delt.data[pix + 1] =
                                delt.data[pix + 2] = 0
                        delt.data[pix + 3] = 0
                    }
                }
            }
            //slide.setAttribute('style','display:initial')
            //slide.value=(totalx/totald)/width
            if(totald){
                down = {
                    x: totalx / totald,
                    y: totaly / totald,
                    d: totald
                }
                handledown()
            }
            //console.log(totald)
            last = draw
            ccgetcont.putImageData(delt, 0, 0)
        }
        movethresh = 2; brightthresh = 300; overthresh = 1000;
        function calibrate(){
            wasdown = {
                x: down.x,
                y: down.y,
                d: down.d
            }
        }
        avg = 0;
        state = 0;//States: 0 waiting for gesture, 1 waiting for next move after gesture, 2 waiting for gesture to end
        function handledown(){
        avg = 0.9 * avg + 0.1 * down.d;
            var davg = down.d - avg, good = davg > brightthresh;
            //console.log(davg)
            switch (state){
                case 0:
                    if(good){//Found a gesture, waiting for next move
                        state = 1
                        calibrate()
                    }
                    break
                case 2://Wait for gesture to end
                    if(!good){//Gesture ended
                        state = 0
                    }
                    break;
                case 1://Got next move, do something based on direction
                    var dx = down.x - wasdown.x, dy = down.y - wasdown.y
                    var dirx = Math.abs(dy) < Math.abs(dx)//(dx,dy) is on a bowtie
                    //console.log(good,davg)
                    if(dx < -movethresh && dirx){
                        //console.log('right')
                    }
                    else if(dx > movethresh && dirx){
                        //console.log('left')
                    }
                    if(dy > movethresh && !dirx){
                        if(davg > overthresh){
                            //console.log('over up');
							writeinlog("over up");
                        }
                        else{
                            //console.log('up')
							writeinlog("up");
                        }
                    }
                    else if(dy < -movethresh && !dirx){
                        if(davg > overthresh){
							//console.log('over down')
							//writeinlog("over down");
                        }
                        else{
							//console.log('down')
							//writeinlog("down");
                        }
                    }
                    state = 2
                    break
            }
        }

function writeinlog(text){
var currentdate = new Date();
var datetime = "Last Action: " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
var para = document.createElement("p");para.textContent = datetime + " " + text;
var container = document.getElementById('stefanmotion');container.insertBefore(para, container.firstChild);
}

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

function cameramotionlights(){
if($('motion').checked == true){

// Check for live API permissions  
navigator.permissions.query({name:'camera'})
.then(function(permissionStatus){
  if(permissionStatus.state == 'granted'){
    runcamerasettings();
  }
  permissionStatus.onchange = function(){
	if(this.state == "granted"){
        runcamerasettings();
	}
  };
});

var video = document.getElementById('motionvideo');
var canvas = document.getElementById('motioncanvas');
var canvasgetcont = canvas.getContext('2d', {desynchronized: true});
var ccanvas = document.getElementById('motioncomp');
var ccgetcont = ccanvas.getContext('2d', {desynchronized: true});

function runcamerasettings(){
// reset everything
if(localMediaStream){
document.getElementById('motionvideo').pause();
document.getElementById('motionvideo').src = "";
localMediaStream.getTracks().forEach(track => track.stop());
localMediaStream = null;
document.getElementById('motionvideo').load();
canvas = document.getElementById('motioncanvas');
canvasgetcont = canvas.getContext('2d', {desynchronized: true});
canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
ccanvas = document.getElementById('motioncomp');
ccgetcont = ccanvas.getContext('2d', {desynchronized: true});
ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
}

if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then(function(stream){
        //Display the video stream in the video object
        localMediaStream = stream; // Store the video stream
        video.srcObject = stream;
     })
     .catch(function(e){
          //console.log(e.name + ": " + e.message);
    });
}
}

}else{
	// remove everything
	document.getElementById('stefanmotion').textContent = "";

	if(localMediaStream){
		if($("motionvideo")){
			document.getElementById('motionvideo').pause();
			document.getElementById('motionvideo').src = "";
		}
		localMediaStream.getTracks().forEach(track => track.stop());
		localMediaStream = null;
		document.getElementById('motionvideo').load();
		canvas = document.getElementById('motioncanvas');
		canvasgetcont = canvas.getContext('2d', {desynchronized: true});
		canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
		canvas.width = 0;
		canvas.height = 0;
		ccanvas = document.getElementById('motioncomp');
		ccgetcont = ccanvas.getContext('2d', {desynchronized: true});
		ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
		ccanvas.width = 0;
		ccanvas.height = 0;
		window.clearInterval(intervalID);
	}
	
}
}

// Current year
function yearnow(){
var today = new Date(); var y0 = today.getFullYear();$("yearnow").innerText = y0;
}

function checkdarkmode(){
    chrome.storage.sync.get(['darkmode'], function(items){
        darkmode = items['darkmode'];if(darkmode == null)darkmode = false; // default darkmode false

        // dark mode
        if(darkmode == true){
            $('currentdarkmode').innerText = chrome.i18n.getMessage("titledarkmodeon");
            document.body.className = 'dark';
            $('headlamp').style.webkitFilter = "invert(1) brightness(2)";
            $('headlamp').style.filter = "invert(1) brightness(2)";
            $('loadinglamp').style.webkitFilter = "invert(1) brightness(2)";
            $('loadinglamp').style.filter = "invert(1) brightness(2)";
        } else{
            $('currentdarkmode').innerText = chrome.i18n.getMessage("titledarkmodeoff");
            document.body.className = 'light';
            $('headlamp').style.webkitFilter = "invert(0)";
            $('headlamp').style.filter = "invert(0)";
            $('loadinglamp').style.webkitFilter = "invert(0)";
            $('loadinglamp').style.filter = "invert(0)";
        }
    });
}

// Listen for messages
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    // If the received message has the expected format...
    if(msg.text === 'receiveallpermissions'){
    // empty ul first
    if($("permullist")){
        var lis = document.querySelectorAll('#permullist li');
        var i;
        var li;
        for(i = 0; li = lis[i]; i++){
            li.parentNode.removeChild(li);
        }
    }
    var perm = msg.value;
    perm.forEach(function(x){
        if($("permissionlist")){
            if($("permullist")){}else{
                var newpermtitle = document.createElement('h4');
                newpermtitle.textContent = chrome.i18n.getMessage("permissionrequired");
                $("permissionlist").appendChild(newpermtitle);

                var newpermul = document.createElement('ul');
                newpermul.setAttribute('id','permullist');
                $("permissionlist").appendChild(newpermul);
            }

            var newperm = document.createElement('li');
            $("permullist").appendChild(newperm);

            var newpermspan = document.createElement('span');
            newpermspan.textContent = x + ": ";
            newperm.appendChild(newpermspan);
            
            var textperm = "";
            var newpermspandes = document.createElement('span');
            if(x == "activeTab"){textperm = chrome.i18n.getMessage("permissionactivetab");}
            else if(x == "contextMenus"){textperm = chrome.i18n.getMessage("permissioncontextmenu");}
            else if(x == "storage"){textperm = chrome.i18n.getMessage("permissionstorage");}
            else if(x == "tabs"){textperm = chrome.i18n.getMessage("permissiontabs");}
            else if(x == "theme"){textperm = chrome.i18n.getMessage("permissiontheme");}
            else if(x == "<all_urls>"){textperm = chrome.i18n.getMessage("permissionallurl");}
            newpermspandes.textContent = textperm;
            newpermspandes.className = "item";
            newperm.appendChild(newpermspandes);            
        }
    });
    }
});

/* Option page body action */
// Read current value settings
window.addEventListener('load', function(){
    // remove loading screen
    $('loading').style.display = "none";
});

if(window.location.href != totloptionspage){
    document.addEventListener('DOMContentLoaded', domcontentloaded);
}else{
    domcontentloaded();
}

function domcontentloaded(){
checkdarkmode();

if((window.location.href != totloptionspage) && devmode == false){

    var condition = navigator.onLine ? "online" : "offline";
    if(condition == "online"){
        fetch(developerwebsite).then(function(response){
            if(response.status === 200){
                // website is online
                // redirect to there
                window.location.href = totloptionspage;
            }
            else{
                throw new Error(response.statusText);
            }

        }).catch(e=>{
        // is not there
        // use offline page
        // Add the YouTube player
        $("dont-turn-off-the-lights").src = youtubeembed;
        read_options();
        yearnow();
        });
    }else{
        // Add the YouTube player
        $("dont-turn-off-the-lights").src = youtubeembed;
        read_options();
        yearnow();
    }

}else{
    // Add the YouTube player
    $("dont-turn-off-the-lights").src = youtubeembed;
    read_options();
    yearnow();
}

// browser check
var nAgt = navigator.userAgent;
var browserName;
var urlbrowservendor = window.navigator.vendor;
if((nAgt.indexOf("OPR/"))!=-1){browserName = "Opera";}
else if(urlbrowservendor.search("Safari") >= 0){browserName = "Safari";}
else if(urlbrowservendor.search("Yandex") >= 0){browserName = "Yandex";}
else if(urlbrowservendor.search("Google") >= 0){browserName = "Google Chrome";}
else if(navigator.appCodeName == "Mozilla"){browserName = "Firefox";}
else if((nAgt.indexOf("Maxthon/"))!=-1){browserName = "Maxthon";}

// browser check
if(browserName == "Opera"){
	// feature check speech and camera
	// no support
	$("helpcameramotion").style.display = "";
	$("helpspeech").style.display = "";
	$("speech").disabled = true;
	$("select_language").disabled = true;
	$("select_dialect").disabled = true;
	$("speechonly").disabled = true;
	$("motion").disabled = true;
	$("cammotiononly").disabled = true;
}else if(browserName == "Google Chrome"){
	// feature check speech and camera
	// support
	$("helpcameramotion").style.display = "none";
	$("helpspeech").style.display = "none";
}else if(browserName == "Firefox"){
	// feature check speech and camera
	// no support
	$("helpcameramotion").style.display = "";
	$("helpspeech").style.display = "";
	$("speech").disabled = true;
	$("select_language").disabled = true;
	$("select_dialect").disabled = true;
	$("speechonly").disabled = true;
	$("motion").disabled = true;
	$("cammotiononly").disabled = true;
}else{
	// feature check speech and camera
	// support
	$("helpcameramotion").style.display = "none";
	$("helpspeech").style.display = "none";
}

// Remove remember
var sharetext = chrome.i18n.getMessage("sharetextd");
var stefanvdurl = turnoffthelightsproduct;
var stefanvdaacodeurl = encodeURIComponent(stefanvdurl);

if($("shareboxyoutube")){
    $("shareboxyoutube").addEventListener("click", function(){window.open(linkyoutube,"_blank");});
}
if($("shareboxfacebook")){
    $("shareboxfacebook").addEventListener("click", function(){window.open("https://www.facebook.com/sharer.php?u="+ stefanvdurl + "&t=" + sharetext + "", 'Share to Facebook','width=600,height=460,menubar=no,location=no,status=no');});
}
if($("shareboxtwitter")){
    $("shareboxtwitter").addEventListener("click", function(){window.open("https://twitter.com/share?url=" + stefanvdaacodeurl + "&text=" + sharetext + "", 'Share to Twitter','width=600,height=460,menubar=no,location=no,status=no');});
}

var isMenuClick = false;
var menu = document.getElementById('dotmenu');
document.addEventListener('click',()=>{
    if(!isMenuClick){
       //Hide the menu here
       $('dropmenu').className = "hide";
    }
    //Reset isMenuClick 
    isMenuClick = false;
});
menu.addEventListener('click',()=>{
    isMenuClick = true;
});

$("dotmenu").addEventListener('click', function(){
    if($('dropmenu').className == "show"){
        $('dropmenu').className = "hide";
    }else{
        $('dropmenu').className = "show";
    }
});

$("darkpanel").addEventListener('click', function(){
    $('menuToggle').click();
});

$("titleex").addEventListener('click', function(){
    window.open(developerwebsite);
});

$("btnsupport").addEventListener('click', function(){
    window.open(linksupport);$('dropmenu').className = "hide";
});

$("btnactivedarkmode").addEventListener('click', function(){
    chrome.storage.sync.get(['darkmode'], function(items){
        darkmode = items['darkmode'];if(darkmode == null)darkmode = false; // default darkmode false
        // dark mode
        if(darkmode == true){
            $('currentdarkmode').innerText = chrome.i18n.getMessage("titledarkmodeoff");
            $('dropmenu').className = "hide";
            document.body.className = 'light';
            $('headlamp').style.webkitFilter = "invert(0)";
            $('headlamp').style.filter = "invert(0)";
            $('loadinglamp').style.webkitFilter = "invert(0)";
            $('loadinglamp').style.filter = "invert(0)";
            chrome.storage.sync.set({"darkmode":false});
        } else{
            $('currentdarkmode').innerText = chrome.i18n.getMessage("titledarkmodeon");
            $('dropmenu').className = "hide";
            document.body.className = 'dark';
            $('headlamp').style.webkitFilter = "invert(1) brightness(2)";
            $('headlamp').style.filter = "invert(1) brightness(2)";
            $('loadinglamp').style.webkitFilter = "invert(1) brightness(2)";
            $('loadinglamp').style.filter = "invert(1) brightness(2)";
            chrome.storage.sync.set({"darkmode":true});
        }
    });
});

// Detect click / change to save the page and test it.
var inputs = document.querySelectorAll('input');
var i;
var l = inputs.length;
for(i = 0; i < l; i++){inputs[i].addEventListener('change', test);inputs[i].addEventListener('change', ariacheck);inputs[i].addEventListener('change', save_options);}

// show all the active permissions in a list
chrome.runtime.sendMessage({name: "getallpermissions"});

// Detect lightcolor change
$("lightcolor").addEventListener('change', function(){$('lightimagen').checked = true;$('example1').style.background = this.value;$('example2').style.background = this.value;save_options();});

// Detect image change
$("lightimage").addEventListener('change', function(){
function getImage(url){
    var bkimage = new Image();
    bkimage.onload = function(){
	$('lightimagea').checked = true;
	$('example1').style.background = 'url(' + this.value + ')';
	$('example2').style.background = 'url(' + this.value + ')';
	save_options();
	};
    bkimage.onerror = function(){
	var optionwrongimg = chrome.i18n.getMessage('optionwrongimg');window.alert(optionwrongimg);
	$('lightimagea').checked = true;
	$('lightimage').value = 'https://www.turnoffthelights.com/extension/images/theater.jpg';
	$('example1').style.background = 'url(https://www.turnoffthelights.com/extension/images/theater.jpg)';
	$('example2').style.background = 'url(https://www.turnoffthelights.com/extension/images/theater.jpg)';
	save_options();	
	};
	bkimage.src = url;
}
getImage(this.value);
});

$('slider').value = default_opacity;$('example1').style.opacity = (default_opacity/100);$('example2').style.opacity = (default_opacity/100);
$('arangeblur').value = default_arangeblur;
$('arangespread').value = default_arangespread;
function showValue(newValue){$('interval').value = newValue;$('slider').value = newValue;$("interval").setAttribute('aria-valuenow',newValue);$("slider").setAttribute('aria-valuenow',newValue);$('example1').style.opacity = (newValue/100);$('example2').style.opacity = (newValue/100);}
function showambilightblurValue(newValue){$('ambilightrangeblurradius').value = newValue;$('arangeblur').value = newValue;$("ambilightrangeblurradius").setAttribute('aria-valuenow',newValue);$("arangeblur").setAttribute('aria-valuenow',newValue);}
function showambilightspreadValue(newValue){$('ambilightrangespreadradius').value = newValue;$('arangespread').value = newValue;$("ambilightrangespreadradius").setAttribute('aria-valuenow',newValue);$("arangespread").setAttribute('aria-valuenow',newValue);}

// Close yellow bar
$("managed-prefs-text-close").addEventListener('click', function(){$("managed-prefs-banner").style.display = "none";});

// Slider
$("slider").addEventListener('change', function(){showValue(this.value);save_options();});
$("slider").addEventListener('input', function(){showValue(this.value);save_options();}, false); 

// Interval
$("interval").addEventListener('change', function(){showValue(this.value);save_options();});

// Light switch
$("onoffrange").addEventListener('change', function(){lightscontrol();});

// Arangeblur
$("arangeblur").addEventListener('change', function(){showambilightblurValue(this.value);save_options();});
$("arangeblur").addEventListener('input', function(){showambilightblurValue(this.value);save_options();}, false); 
$("ambilightrangeblurradius").addEventListener('change', function(){showambilightblurValue(this.value);save_options();});

// Arangespread
$("arangespread").addEventListener('change', function(){showambilightspreadValue(this.value);save_options();});
$("arangespread").addEventListener('input', function(){showambilightspreadValue(this.value);save_options();}, false); 
$("ambilightrangespreadradius").addEventListener('change', function(){showambilightspreadValue(this.value);save_options();});

// Add website
document.getElementById('formeyeprotection').addEventListener("submit", function(e){e.preventDefault();addWhitelistDomain();});

// Remove website
$("removebutton").addEventListener('click', function(){removeSelectedExcludedDomain();});

// Save password
$("confirmpassword").addEventListener('click', function(){save_options();var optionpastemp = chrome.i18n.getMessage('optionpasswordsaved');window.alert(optionpastemp);});

var guidekb = true;
function memguide(){
    if(guidekb == true){
        // already visible
    }else{
        $("managed-prefs-banner").style.display = "";
    }
}

function mobilecheck(){
    if(window.innerWidth < 480){$('menuToggle').click();}
}

// Save KB download
$("tabbasic").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();OFFworkaroundbugfromsafari();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});
$("tabvisual").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});
$("tabadvan").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();OFFworkaroundbugpreview();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});
$("tabnight").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();OFFworkaroundnight();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});
$("tabmotion").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();OFFworkaroundmotion();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});
$("tabspeech").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();OFFworkaroundspeech();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});
$("tabguide").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();$('welcomeguide').src = linkguide;$("managed-prefs-banner").style.display = "none";guidekb = false;mobilecheck();});
$("tabanalytics").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});
$("tabhelp").addEventListener('click', function(){Scrolltotop();ONworkaroundbugpreview();$('welcomeguide').src = "";memguide();guidekb = true;mobilecheck();});

$("buttonreportissue").addEventListener('click', function(){window.open(linksupport);});
$("buttonchangelog").addEventListener('click', function(){window.open(linkchangelog);});
$("buttontranslateme").addEventListener('click', function(){window.open(linktranslate);});

// scroll to top
function Scrolltotop(){$("mainview").scrollTop = 0;}

// remove all videos
function ONworkaroundbugpreview(){$("dont-turn-off-the-lights").src = "";$("videopreviewA").src = "";$("videopreviewB").src = "";$("videopreviewC").src = "";$("videopreviewnight").src = "";$("videopreviewmotion").src = "";$("videopreviewspeech").src = "";}

// add a video
function OFFworkaroundbugfromsafari(){
    $("dont-turn-off-the-lights").src = youtubeembed;
}

function OFFworkaroundbugpreview(){
    $("videopreviewA").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdBDJATUnIE3koQ-63Ld-4OX&amp;showinfo=0";
    $("videopreviewB").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdCGQd-Ftbhw73gyGA-hN71C&amp;showinfo=0";
    $("videopreviewC").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdCDL6HzWwYmTg2Xkp9AIP5F&amp;showinfo=0";
}

function OFFworkaroundnight(){
    $("videopreviewnight").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdC0jpbT-SOLhoRWcTZhIHcu&rel=0";
}

function OFFworkaroundmotion(){
    $("videopreviewmotion").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdAUBYAjj8ZE-RZzStwUqFJm&rel=0";
}
function OFFworkaroundspeech(){
    $("videopreviewspeech").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdBRi5tDACN0R1a3uYWNBsU_&rel=0";
}

// wizard profile
$("submitbuttonA").addEventListener('click', function(){
    if($("profileAmouse").checked == true){
    $("mousespotlightt").checked = true;
    }else{
    $("mousespotlighto").checked = true;
    }
    $("lightcolor").value = $("profileAcolor").value;
    $("interval").value = $("profileAopacity").value; $("slider").value = $("profileAopacity").value; showValue($("profileAopacity").value);
    $("lampandnightmode").checked = false;
var profilesave = chrome.i18n.getMessage('optionprofilesaved');window.alert(profilesave);
save_options();test();ariacheck();
});
$("submitbuttonB").addEventListener('click', function(){
    $("nightmodebck").value = $("profileBnightback").value;
    $("nightmodetxt").value = $("profileBnighttext").value;
    $("nightmodehyperlink").value = $("profileBnightlink").value;
    $("interval").value = 0; $("slider").value = 0; showValue(0);
    $("mousespotlightt").checked = true;
    $("lampandnightmode").checked = true;
var profilesave = chrome.i18n.getMessage('optionprofilesaved');window.alert(profilesave);
save_options();test();ariacheck();
});
$("submitbuttonC").addEventListener('click', function(){
    $("lightcolor").value = $("profileCcolor").value;
    $("interval").value = $("profileCopacity").value; $("slider").value = $("profileCopacity").value; showValue($("profileCopacity").value);
    $("lampandnightmode").checked = false;
    $("mousespotlights").checked = true;
var profilesave = chrome.i18n.getMessage('optionprofilesaved');window.alert(profilesave);
save_options();test();ariacheck();
});

// Check screenshot
$("wallpaperhide").addEventListener('click', function(){
    $("imagegallery").style.display = "";$("wallpapershow").style.display = "";$("wallpaperhide").style.display = "none";

    $("bckimage1").setAttribute('src','images/totlminis1.png');$("bckimage1").setAttribute('src','images/totlminis1@2x.png');
    $("bckimage2").setAttribute('src','images/totlminis2.png');$("bckimage2").setAttribute('src','images/totlminis2@2x.png');
    $("bckimage3").setAttribute('src','images/totlminis3.png');$("bckimage3").setAttribute('src','images/totlminis3@2x.png');
    $("bckimage4").setAttribute('src','images/totlminis4.png');$("bckimage4").setAttribute('src','images/totlminis4@2x.png');
    $("bckimage5").setAttribute('src','images/totlminis5.png');$("bckimage5").setAttribute('src','images/totlminis5@2x.png');
});
$("wallpapershow").addEventListener('click', function(){
    $("imagegallery").style.display = "none";$("wallpapershow").style.display = "none";$("wallpaperhide").style.display = "";

    $("bckimage1").setAttribute('src','');$("bckimage1").setAttribute('srcset','');
    $("bckimage2").setAttribute('src','');$("bckimage2").setAttribute('srcset','');
    $("bckimage3").setAttribute('src','');$("bckimage3").setAttribute('srcset','');
    $("bckimage4").setAttribute('src','');$("bckimage4").setAttribute('srcset','');
    $("bckimage5").setAttribute('src','');$("bckimage5").setAttribute('srcset','');
});
$("totlswallpaper5").addEventListener('click', function(){$("lightimage").value = "https://www.turnoffthelights.com/extension/images/totls5.jpg";test();ariacheck();save_options();});
$("totlswallpaper4").addEventListener('click', function(){$("lightimage").value = "https://www.turnoffthelights.com/extension/images/totls4.jpg";test();ariacheck();save_options();});
$("totlswallpaper3").addEventListener('click', function(){$("lightimage").value = "https://www.turnoffthelights.com/extension/images/totls3.jpg";test();ariacheck();save_options();});
$("totlswallpaper2").addEventListener('click', function(){$("lightimage").value = "https://www.turnoffthelights.com/extension/images/totls2.jpg";test();ariacheck();save_options();});
$("totlswallpaper1").addEventListener('click', function(){$("lightimage").value = "https://www.turnoffthelights.com/extension/images/theater.jpg";test();ariacheck();save_options();});

// dynamic test
$("dynamic").addEventListener('click', function(){if($('dynamic').checked == true){dynamictest();$('lightdynamic').disabled = false;}else{removedynamic();$('lightdynamic').disabled = true;}});

// Check dynamic
$("dynamichide").addEventListener('click', function(){
$("dynamicgallery").style.display = "";$("dynamicshow").style.display = "";$("dynamichide").style.display = "none";
    $("bckdyn1").setAttribute('src','images/totldyn1.png');$("bckdyn1").setAttribute('srcset','images/totldyn1@2x.png');
    $("bckdyn2").setAttribute('src','images/totldyn2.png');$("bckdyn2").setAttribute('srcset','images/totldyn2@2x.png');
    $("bckdyn3").setAttribute('src','images/totldyn3.png');$("bckdyn3").setAttribute('srcset','images/totldyn3@2x.png');
    $("bckdyn4").setAttribute('src','images/totldyn4.png');$("bckdyn4").setAttribute('srcset','images/totldyn4@2x.png');
    $("bckdyn5").setAttribute('src','images/totldyn5.png');$("bckdyn5").setAttribute('srcset','images/totldyn5@2x.png');
    $("bckdyn6").setAttribute('src','images/totldyn6.png');$("bckdyn6").setAttribute('srcset','images/totldyn6@2x.png');
    $("bckdyn7").setAttribute('src','images/totldyn7.png');$("bckdyn7").setAttribute('srcset','images/totldyn7@2x.png');
    $("bckdyn8").setAttribute('src','images/totldyn8.png');$("bckdyn8").setAttribute('srcset','images/totldyn8@2x.png');
    $("bckdyn9").setAttribute('src','images/totldyn9.png');$("bckdyn9").setAttribute('srcset','images/totldyn9@2x.png');
    $("bckdyn10").setAttribute('src','images/totldyn10.png');$("bckdyn10").setAttribute('srcset','images/totldyn10@2x.png');
});
$("dynamicshow").addEventListener('click', function(){
$("dynamicgallery").style.display = "none";$("dynamicshow").style.display = "none";$("dynamichide").style.display = "";
    $("bckdyn1").setAttribute('src','');$("bckdyn1").setAttribute('srcset','');
    $("bckdyn2").setAttribute('src','');$("bckdyn2").setAttribute('srcset','');
    $("bckdyn3").setAttribute('src','');$("bckdyn3").setAttribute('srcset','');
    $("bckdyn4").setAttribute('src','');$("bckdyn4").setAttribute('srcset','');
    $("bckdyn5").setAttribute('src','');$("bckdyn5").setAttribute('srcset','');
    $("bckdyn6").setAttribute('src','');$("bckdyn6").setAttribute('srcset','');
    $("bckdyn7").setAttribute('src','');$("bckdyn7").setAttribute('srcset','');
    $("bckdyn8").setAttribute('src','');$("bckdyn8").setAttribute('srcset','');
    $("bckdyn9").setAttribute('src','');$("bckdyn9").setAttribute('srcset','');
    $("bckdyn10").setAttribute('src','');$("bckdyn10").setAttribute('srcset','');
});
$("totldynpaper10").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicstars');$('dynamic10').checked = true;dynamictest();save_options();});
$("totldynpaper9").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamictriangulation');$('dynamic9').checked = true;dynamictest();save_options();});
$("totldynpaper8").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicstorm');$('dynamic8').checked = true;dynamictest();save_options();});
$("totldynpaper7").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicdotscolor');$('dynamic7').checked = true;dynamictest();save_options();});
$("totldynpaper6").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicsmoke');$('dynamic6').checked = true;dynamictest();save_options();});
$("totldynpaper5").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicspace');$('dynamic5').checked = true;dynamictest();save_options();});
$("totldynpaper4").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamiccloud');$('dynamic4').checked = true;dynamictest();save_options();});
$("totldynpaper3").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicraindrops');$('dynamic3').checked = true;dynamictest();save_options();});
$("totldynpaper2").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicblocks');$('dynamic2').checked = true;dynamictest();save_options();});
$("totldynpaper1").addEventListener('click', function(){$("lightdynamic").value = chrome.i18n.getMessage('desdynamicfishtank');$('dynamic1').checked = true;dynamictest();save_options();});
$("hoveroptiondyn5").addEventListener('click', function(){$('dynamic5').checked = true;dynamictest();save_options();});

// autoplay Add website
document.getElementById('formautoplay').addEventListener("submit", function(e){e.preventDefault();autoplayaddWhitelistDomain();});

// autoplay Remove website
$("autoplayremovebutton").addEventListener('click', function(){autoplayremoveSelectedExcludedDomain();});

// YouTube quality
$("youtubequality").addEventListener('click', function(){save_options();});
$("youtubequality").addEventListener('change', function(){save_options();});

// HTML5 video volume steps
$("videovolumesteps").addEventListener('click', function(){save_options();});
$("videovolumesteps").addEventListener('change', function(){save_options();});

// atmosphere Add website
document.getElementById('formatmospherelighting').addEventListener("submit", function(e){e.preventDefault();atmosphereaddWhitelistDomain();});

// atmosphere Remove website
$("atmosphereremovebutton").addEventListener('click', function(){atmosphereremoveSelectedExcludedDomain();});

// night Add website
document.getElementById('formnightmode').addEventListener("submit", function(e){e.preventDefault();nightaddWhitelistDomain();});

// night Remove website
$("nightremovebutton").addEventListener('click', function(){nightremoveSelectedExcludedDomain();});

// cam motion Add website
document.getElementById('formcameramotion').addEventListener("submit", function(e){e.preventDefault();cammotionaddWhitelistDomain();});

// cam motion Remove website
$("cammotionremovebutton").addEventListener('click', function(){cammotionremoveSelectedExcludedDomain();});

// speech Add website
document.getElementById('formspeech').addEventListener("submit", function(e){e.preventDefault();speechaddWhitelistDomain();});

// speech Remove website
$("speechremovebutton").addEventListener('click', function(){speechremoveSelectedExcludedDomain();});

// autostop Add website
document.getElementById('formautostop').addEventListener("submit", function(e){e.preventDefault();autostopaddWhitelistDomain();});

// autostop Remove website
$("autostopremovebutton").addEventListener('click', function(){autostopremoveSelectedExcludedDomain();});

// video Add website
document.getElementById('formvideotoolbar').addEventListener("submit", function(e){e.preventDefault();videotooladdWhitelistDomain();});

// video Remove website
$("videotoolremovebutton").addEventListener('click', function(){videotoolremoveSelectedExcludedDomain();});

// multi opacity Change
$("multiopacityDomainsBox").addEventListener('click', function(){multiopacitychangeurl()});
$("multiopacitynumberBox").addEventListener('click', function(){multiopacitychangenumberl()});

// multi opacity Add
document.getElementById('formmultiopacity').addEventListener("submit", function(e){e.preventDefault();multiopacityadd();});

// multi opacity Remove
$("multiopacityremovebutton").addEventListener('click', function(){multiopacityremoveSelectedExcludedDomain()});

// Reset settings
$("resettotl").addEventListener('click', function(){chrome.storage.sync.clear();location.reload();});

// linearsq
$("linearsq").addEventListener('click', function(){test();ariacheck();save_options();});
$("linearsq").addEventListener('change', function(){test();ariacheck();save_options();});

// Review box
$("war").addEventListener('click', function(){window.open(writereview);$("sectionreviewbox").style.display = "none";chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version});});
$("nt").addEventListener('click', function(){$("sectionreviewbox").style.display = "none";chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version});});

// Aurora Player app box
$("apgetapp").addEventListener('click', function(){window.open(linkauroraplayerapp);$("sectionauroraplayerappbox").style.display = "none";chrome.storage.sync.set({"applastonversion": chrome.runtime.getManifest().version});});
$("apnt").addEventListener('click', function(){$("sectionauroraplayerappbox").style.display = "none";chrome.storage.sync.set({"applastonversion": chrome.runtime.getManifest().version});});

// Mobile app box
$("magetapp").addEventListener('click', function(){window.open(linktotlmobileapp);$("sectionmobileappbox").style.display = "none";chrome.storage.sync.set({"mobilelastonversion": chrome.runtime.getManifest().version});});
$("mant").addEventListener('click', function(){$("sectionmobileappbox").style.display = "none";chrome.storage.sync.set({"mobilelastonversion": chrome.runtime.getManifest().version});});

// Lamp Icons
$("p1").addEventListener('click', function(){document.images['btnpreview'].setAttribute("data-icon","icons/iconstick38.png");document.images['btnpreview'].src="icons/iconstick38.png";save_options()});
$("p2").addEventListener('click', function(){document.images['btnpreview'].setAttribute("data-icon","icons/icongold38.png");document.images['btnpreview'].src="icons/icongold38.png";save_options()});
$("p3").addEventListener('click', function(){document.images['btnpreview'].setAttribute("data-icon","icons/iconrose38.png");document.images['btnpreview'].src="icons/iconrose38.png";save_options()});
$("p4").addEventListener('click', function(){document.images['btnpreview'].setAttribute("data-icon","icons/iconrainbow38.png");document.images['btnpreview'].src="icons/iconrainbow38.png";save_options()});
$("p5").addEventListener('click', function(){document.images['btnpreview'].setAttribute("data-icon","icons/iconwhite38.png");document.images['btnpreview'].src="icons/iconwhite38.png";save_options()});

// get permission
$("darkbrowsertheme").addEventListener('click', function(event){
    if($("darkbrowsertheme").checked == true){

        // Permissions must be requested from inside a user gesture, like a button's
        // click handler.
        chrome.permissions.request({
          permissions: ['theme']
        }, function(granted){
          // The callback argument will be true if the user granted the permissions.
          if(granted){
            saveindarktheme();
          }else{
            removeindarktheme();
            $("darkbrowsertheme").checked = false; // disable it back
            save_options();
          }
        });

    }else{
        removeindarktheme();
    }
});

function saveindarktheme(){
    chrome.permissions.contains({
        permissions: ['theme']
      }, function(result){
        if(result){
          // The extension has the permissions.
        }else{
          // The extension doesn't have the permissions.
        }
      });
}

function removeindarktheme(){
chrome.permissions.remove({
        permissions: ['theme']
      }, function(removed){
        if(removed){
          // The permissions have been removed.
        }else{
          // The permissions have not been removed (e.g., you tried to remove
          // required permissions).
        }
      });
}

$("sub1").addEventListener('click', function(){
    $("colorpanel").className = "";
    $("gradientpanel").className = "hidden";
    $("imagepanel").className = "hidden";
    $("dynamicpanel").className = "hidden";
    $("blurpanel").className = "hidden";

    $("sub1").className = "tabbutton tabhighlight";
    $("sub2").className = "tabbutton";
    $("sub3").className = "tabbutton";
    $("sub4").className = "tabbutton";
    $("sub5").className = "tabbutton";
});
$("sub2").addEventListener('click', function(){
    $("colorpanel").className = "hidden";
    $("gradientpanel").className = "";
    $("imagepanel").className = "hidden";
    $("dynamicpanel").className = "hidden";
    $("blurpanel").className = "hidden";

    $("sub1").className = "tabbutton";
    $("sub2").className = "tabbutton tabhighlight";
    $("sub3").className = "tabbutton";
    $("sub4").className = "tabbutton";
    $("sub5").className = "tabbutton";
});
$("sub3").addEventListener('click', function(){
    $("colorpanel").className = "hidden";
    $("gradientpanel").className = "hidden";
    $("imagepanel").className = "";
    $("dynamicpanel").className = "hidden";
    $("blurpanel").className = "hidden";

    $("sub1").className = "tabbutton";
    $("sub2").className = "tabbutton";
    $("sub3").className = "tabbutton tabhighlight";
    $("sub4").className = "tabbutton";
    $("sub5").className = "tabbutton";
});
$("sub4").addEventListener('click', function(){
    $("colorpanel").className = "hidden";
    $("gradientpanel").className = "hidden";
    $("imagepanel").className = "hidden";
    $("dynamicpanel").className = "";
    $("blurpanel").className = "hidden";

    $("sub1").className = "tabbutton";
    $("sub2").className = "tabbutton";
    $("sub3").className = "tabbutton";
    $("sub4").className = "tabbutton tabhighlight";
    $("sub5").className = "tabbutton";
});
$("sub5").addEventListener('click', function(){
    $("colorpanel").className = "hidden";
    $("gradientpanel").className = "hidden";
    $("imagepanel").className = "hidden";
    $("dynamicpanel").className = "hidden";
    $("blurpanel").className = "";

    $("sub1").className = "tabbutton";
    $("sub2").className = "tabbutton";
    $("sub3").className = "tabbutton";
    $("sub4").className = "tabbutton";
    $("sub5").className = "tabbutton tabhighlight";
});

/* atmos */
$("tv1").addEventListener('click', function(){
    $("atmospanel").className = "";
    $("atmosonepanel").className = "hidden";
    $("atmosfourpanel").className = "hidden";
    $("atmosvividpanel").className = "hidden";
    $("atmossettingspanel").className = "hidden";

    $("tv1").className = "tabbutton tabhighlight";
    $("tv2").className = "tabbutton";
    $("tv3").className = "tabbutton";
    $("tv4").className = "tabbutton";
    $("tv5").className = "tabbutton";
});
$("tv2").addEventListener('click', function(){
    $("atmospanel").className = "hidden";
    $("atmosonepanel").className = "";
    $("atmosfourpanel").className = "hidden";
    $("atmosvividpanel").className = "hidden";
    $("atmossettingspanel").className = "hidden";

    $("tv1").className = "tabbutton";
    $("tv2").className = "tabbutton tabhighlight";
    $("tv3").className = "tabbutton";
    $("tv4").className = "tabbutton";
    $("tv5").className = "tabbutton";
});
$("tv3").addEventListener('click', function(){
    $("atmospanel").className = "hidden";
    $("atmosonepanel").className = "hidden";
    $("atmosfourpanel").className = "";
    $("atmosvividpanel").className = "hidden";
    $("atmossettingspanel").className = "hidden";

    $("tv1").className = "tabbutton";
    $("tv2").className = "tabbutton";
    $("tv3").className = "tabbutton tabhighlight";
    $("tv4").className = "tabbutton";
    $("tv5").className = "tabbutton";
});
$("tv4").addEventListener('click', function(){
    $("atmospanel").className = "hidden";
    $("atmosonepanel").className = "hidden";
    $("atmosfourpanel").className = "hidden";
    $("atmosvividpanel").className = "";
    $("atmossettingspanel").className = "hidden";

    $("tv1").className = "tabbutton";
    $("tv2").className = "tabbutton";
    $("tv3").className = "tabbutton";
    $("tv4").className = "tabbutton tabhighlight";
    $("tv5").className = "tabbutton";
});
$("tv5").addEventListener('click', function(){
    $("atmospanel").className = "hidden";
    $("atmosonepanel").className = "hidden";
    $("atmosfourpanel").className = "hidden";
    $("atmosvividpanel").className = "hidden";
    $("atmossettingspanel").className = "";

    $("tv1").className = "tabbutton";
    $("tv2").className = "tabbutton";
    $("tv3").className = "tabbutton";
    $("tv4").className = "tabbutton";
    $("tv5").className = "tabbutton tabhighlight";
});

// easter egg game - playground
var myGameArea;
var myGamePiece;
var myObstacles = [];
var myScore;
var myHighScore;
var myGameOver;
var previoushigh = 0;
var levels = [250,500,750,1000,1500,2000,5000,10000];

function restartGame(){
    document.getElementById("stefanvdbtnplaygroundfilter").style.display = "none";
    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    myObstacles = [];
    myScore = {};
    document.getElementById("stefanvdplayground").innerHTML = "";
    startGame();
}

function startGame(){
    myGameArea = new gamearea();
    myGamePiece = new component(16, 30, "images/party-balloon@2x.png", 15, 30,"image");
    myGamePiece.gravity = 0.05;
    myScore = new component("15px", "Verdana", "black", 330, 25, "text");
    myHighScore = new component("15px", "Verdana", "black", 330, 45, "text");
    myGameArea.start();
}

function gamearea(){
    this.refreshSpeed = 25;
    this.canvas = document.createElement("canvas");
    document.body.addEventListener("keydown", function(){
        const key = event.key;
        if(key == "ArrowUp"){
            accelerate(-0.2);
        }
    },false);
    document.body.addEventListener("keyup", function(){
        const key = event.key;
        if(key == "ArrowUp"){
            accelerate(0.05);
        }
    },false);

    this.canvas.addEventListener("touchstart", function(){accelerate(0.05)},false);
    this.canvas.addEventListener("touchend", function(){accelerate(-0.2)},false);
    this.canvas.addEventListener("mouseup", function(){accelerate(0.05)},false);
    this.canvas.addEventListener("mousedown", function(){accelerate(-0.2)},false);

    document.getElementById("stefanvdplayground").appendChild(this.canvas);
    this.context = this.canvas.getContext('2d', {desynchronized: true});

    // retina support
    this.canvas.width = 480*2;
    this.canvas.height = 270*2;
    //this.canvas.style.width = "480px";
    //this.canvas.style.height = "270px";
    this.context.scale(2, 2);
    //---

    this.pause = false;
    this.frameNo = 0;
    this.start = function(){
        this.stopped = false;
        updateGameArea();
    }
    this.stop = function(){
        this.pause = true;
		this.stopped = true;
    }
    this.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type){
    this.type = type;
    if(type == "image"){
        this.image = new Image();
        this.image.width = 16;
        this.image.height = 30;
        this.image.src = color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function(){
        ctx = myGameArea.context;
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 1;
            ctx.shadowColor = "rgba(255,255,255,1)";
            ctx.fillText(this.text, this.x, this.y);
        } 
        else if(type == "image"){
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
        else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function(){
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function(){
        var rockbottom = myGameArea.canvas.height/2 - this.height;
        if(this.y > rockbottom){
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
            crash = false;
        }
        if(this.y < 0){crash = true;}
        return crash;
    }
}

var AudioContext = window.AudioContext || window.webkitAudioContext;
var gameaudiocontext;
function updateGameArea(){
    if(myGameArea.stopped){ return; }
    var x, height, gap, minHeight, maxHeight, minGap, maxGap, i;
    for(i = 0; i < myObstacles.length; i += 1){
        if(myGamePiece.crashWith(myObstacles[i])){
            if(myGameArea.frameNo > previoushigh){
                previoushigh = myGameArea.frameNo;
            }
            myGameArea.stop();
            myGameOver = new component("15px", "Verdana", "black", 195, 110, "text");
            myGameOver.text = "Game Over";
            myGameOver.update();
            if(document.getElementById("stefanvdbtnplaygroundfilter")){
                document.getElementById("stefanvdbtnplaygroundfilter").style.display = "flex";
            }
            return;
        }
    }
    if(myGameArea.pause == false){
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myScore.score +=1; 
    if(myGameArea.frameNo == 1 || everyinterval(150)){
        x = myGameArea.canvas.width/2;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "#666666", x, 0));
        myObstacles.push(new component(10, x - height - gap, "#666666", x, height + gap));
    }
    var i;
    var l = myObstacles.length;
    for(i = 0; i < l; i += 1){
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    myScore.text = "SCORE: " + myScore.score;
    if(myScore.score % 100 == 0){
        var FREQUENCY = 440;
        var INTERVAL = 250;
        var RAMP_VALUE = 0.00001;
        var RAMP_DURATION = 1;

        var frequency = FREQUENCY;
        var interval = INTERVAL;
      
        var play = function(){
          gameaudiocontext.resume().then(() => {
          //console.log('Playback resumed successfully');
          });
          var currentTime = gameaudiocontext.currentTime;
          var osc = gameaudiocontext.createOscillator();
          var gain = gameaudiocontext.createGain();
      
          osc.connect(gain);
          gain.connect(gameaudiocontext.destination);
      
          gain.gain.setValueAtTime(gain.gain.value, currentTime);
          gain.gain.exponentialRampToValueAtTime(RAMP_VALUE, currentTime + RAMP_DURATION);
      
          osc.onended = function(){
            gain.disconnect(gameaudiocontext.destination);
            osc.disconnect(gain);
          }
      
          osc.type = 'sine';
          osc.frequency.value = frequency;
          osc.start(currentTime);
          osc.stop(currentTime + RAMP_DURATION);
        }
      
        var beep = function(times){
          if(!times) times = 1;(function loop (i){
            play();
            if(++i < times) window.setTimeout(loop, interval, i)
          })(0);
        }
      
        beep.destroy = function(){
          if(!options.context) context.close()
        }
        beep();
        // blink text
        myScore.color = "rgb(0,0,0,.2)";
        myScore.update();
        window.setTimeout(function(){ 
            myScore.color = "rgb(0,0,0,1)";
            myScore.update();
        }, 100);
        window.setTimeout(function(){ 
            myScore.color = "rgb(0,0,0,.2)";
            myScore.update();
        }, 200);
        window.setTimeout(function(){ 
            myScore.color = "rgb(0,0,0,1)";
            myScore.update();
        }, 300);
        window.setTimeout(function(){ 
            myScore.color = "rgb(0,0,0,.2)";
            myScore.update();
        }, 400);
        window.setTimeout(function(){ 
            myScore.color = "rgb(0,0,0,1)";
            myScore.update();
        }, 500);
    }

    if(levels.indexOf(myScore.score) != -1){
        myGameArea.refreshSpeed -= 2;
        //console.log( 'level '+levels.indexOf(myScore.score) + '; refreshRate: '+ myGameArea.refreshSpeed);
    }
    myScore.update();
    if(previoushigh > 0){
        myHighScore.text = "HI: " + previoushigh;
        myHighScore.update();
    }
    myGamePiece.newPos();
    myGamePiece.update();

    window.setTimeout(updateGameArea, myGameArea.refreshSpeed);
    }
}

function everyinterval(n){
    if((myGameArea.frameNo / n) % 1 == 0){return true;}
    return false;
}

function accelerate(n){
    myGamePiece.gravity = n;
}

// search
var pageinsearch = false;
function OnSearch(input){
  if(input.value == ""){
    pageinsearch = false;
    input.blur();

    var sections = document.getElementsByTagName("section");
    var x;
    var l = sections.length;
    for(x = 0; x < l; x++){
      var section = sections[x];
      section.classList.remove("searchfoundnothing");
    }

    // set view back to the current selected tab
    // and hide back all videos
    var y = document.getElementsByClassName('navbar-item-selected');
    y[0].click();

    // hide preview toolbar tabs
    document.getElementsByClassName('tabbar')[0].classList.remove("hidden");
    $("colorpanel").className = "";
    $("gradientpanel").className = "hidden";
    $("imagepanel").className = "hidden";
    $("dynamicpanel").className = "hidden";
    $("blurpanel").className = "hidden";

    document.getElementsByClassName('tabbar')[1].classList.remove("hidden");
    $("atmospanel").className = "";
    $("atmosonepanel").className = "hidden";
    $("atmosfourpanel").className = "hidden";
    $("atmosvividpanel").className = "hidden";
    $("atmossettingspanel").className = "hidden";

    if($("stefanvdbtnplaygroundfilter")){
        var playgroundfilter = document.getElementById("stefanvdbtnplaygroundfilter");
        playgroundfilter.parentNode.removeChild(playgroundfilter);
    }

    if($("stefanvdplayground")){
        var playground = document.getElementById("stefanvdplayground");
        playground.parentNode.removeChild(playground);
    }
  }
  else{
    if(pageinsearch == false){
        pageinsearch = true;
        // load all the videos
        OFFworkaroundbugfromsafari();
        OFFworkaroundbugpreview();
        OFFworkaroundnight();
        OFFworkaroundmotion();
        OFFworkaroundspeech();

        document.getElementsByClassName('tabbar')[0].classList.add("hidden");
        $("colorpanel").className = "";
        $("gradientpanel").className = "";
        $("imagepanel").className = "";
        $("dynamicpanel").className = "";
        $("blurpanel").className = "";

        document.getElementsByClassName('tabbar')[1].classList.add("hidden");
        $("atmospanel").className = "";
        $("atmosonepanel").className = "";
        $("atmosfourpanel").className = "";
        $("atmosvividpanel").className = "";
        $("atmossettingspanel").className = "";
    }

    // receive the total tab pages
    var tabListItems = $('navbar').childNodes;
    var i;
    var l = tabListItems.length;
    for(i = 0; i < l; i++){
        if(tabListItems[i].nodeName == 'LI'){
        var tabLink = getFirstChildWithTagName(tabListItems[i],'A');
        var id = getHash(tabLink.getAttribute('data-tab'));
        contentDivs[id] = $(id);
        }
    }

    // show all tab pages
    var i = 0;
    var id;
    for(id in contentDivs){
        if(id != "tab4"){
        contentDivs[id].className = 'page';
        }
        i++;
    }
    //---
    var searchword = input.value;
    if(searchword == "balloon"){
        // easteregg Party Balloon
        if(!$("stefanvdplayground")){
        // user gesture activate the game audio ping
        gameaudiocontext = new AudioContext();

        var newplaygroundfilter = document.createElement('div');
        newplaygroundfilter.setAttribute('id','stefanvdbtnplaygroundfilter');
        newplaygroundfilter.style.zIndex = 200;
        newplaygroundfilter.style.position = "absolute";
        newplaygroundfilter.style.width = "calc(100% - 46px)";
        newplaygroundfilter.style.height = "calc(100% - 3px)";
        newplaygroundfilter.style.background = "rgba(0,0,0,.6)";
        newplaygroundfilter.style.display = "none";
        newplaygroundfilter.style.alignItems = "center";
        newplaygroundfilter.style.justifyContent = "center";
        $("mainview-content").appendChild(newplaygroundfilter);

        var newplayground = document.createElement('div'); 
		newplayground.setAttribute('id','stefanvdplayground');
        $("mainview-content").appendChild(newplayground);

        var newbtnplaygroundrestart = document.createElement('button'); 
        newbtnplaygroundrestart.setAttribute('id','stefanvdbtnplaygroundrestart');
        newbtnplaygroundrestart.addEventListener("click", function(){restartGame()},false);
        newbtnplaygroundrestart.innerText = "Restart";
        newplaygroundfilter.appendChild(newbtnplaygroundrestart);

        var newbtnplaygroundfb = document.createElement('div'); 
        newbtnplaygroundfb.setAttribute('id','stefanvdbtnplaygroundfacebook');
        newbtnplaygroundfb.addEventListener("click", function(){chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u="+turnoffthelightsproduct, active:true})},false);
        newplaygroundfilter.appendChild(newbtnplaygroundfb);

        var newbtnplaygroundtw = document.createElement('div'); 
        newbtnplaygroundtw.setAttribute('id','stefanvdbtnplaygroundtwitter');
        newbtnplaygroundtw.addEventListener("click", function(){var stringgame = chrome.i18n.getMessage("shareanalyticenergy", ""+previoushigh+""); var sturnoffthelightsproductcodeurl = encodeURIComponent(stringgame+" "+turnoffthelightsproduct+"@turnoffthelight #chromeextension #firefoxextension #operaextension");chrome.tabs.create({url: "https://twitter.com/home?status="+sturnoffthelightsproductcodeurl, active:true})},false);
        newplaygroundfilter.appendChild(newbtnplaygroundtw);

        startGame();
        }
    }else{
        if($("stefanvdplayground")){
            var playground = document.getElementById("stefanvdplayground");
            playground.parentNode.removeChild(playground);
        }
    }

    var sections = document.getElementsByTagName("section");
    var x;
    var l = sections.length;
    for(x = 0; x < l; x++){
        var section = sections[x];
        var content = section.innerHTML;

        // remove first the help message, because not a feature
        var i18nhelpautoplay = chrome.i18n.getMessage("helpautoplay");
        content = content.replace(i18nhelpautoplay, "");
        var i18nhelpeyeprotection = chrome.i18n.getMessage("helpeyeprotection");
        content = content.replace(i18nhelpeyeprotection, "");

        if(content.search(new RegExp(searchword, "i")) < 1){
            section.classList.add("searchfoundnothing");
        }else{
            section.classList.remove("searchfoundnothing");
        }
    }

    // hide the h2 if there is no sections visible
    var pages = document.getElementsByClassName("page");
    var z;
    var l = pages.length;
    for(z = 0; z < l; z++){
      var sections = pages[z].getElementsByTagName("section");
      var countnothingcheck = 0;
      var x;
      var q = sections.length;
      for(x = 0; x < q; x++){
        var section = sections[x];

        if(section.classList.contains('searchfoundnothing')){
          countnothingcheck += 1;
        }

      }
      if(countnothingcheck == sections.length){
        // total sections with nothing inside is the same as all the section -> hide the page
        pages[z].classList.add("searchfoundnothing");
      }
      else{
        pages[z].classList.remove("searchfoundnothing");
      }
   }


  }
}

if(document.getElementById("appsearch")){
    document.getElementById("appsearch").addEventListener("search", function(){OnSearch(this);}, false);
    document.getElementById("appsearch").addEventListener("input", function(){OnSearch(this);}, false);
    document.getElementById("btnsearchicon").addEventListener("input", function(){OnSearch(this);}, false);
    document.getElementById("appsearch").placeholder = chrome.i18n.getMessage("searchplaceholder");
}

}