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

function $(id) { return document.getElementById(id); }
var default_opacity = 80;
var default_arangeblur = 70;
var default_arangespread = 20;

// Option to save current value to chrome.storage
function save_options(){
	chrome.storage.local.set({"interval": $('interval').value});
	chrome.storage.local.set({"lightcolor": $('lightcolor').value});
	if($('pageaction').checked)chrome.storage.local.set({"pageaction": 'true'});
	else chrome.storage.local.set({"pageaction": 'false'});
	if($('lampregular').checked)chrome.storage.local.set({"lampregular": 'true'});
	else chrome.storage.local.set({"lampregular": 'false'});
	if($('autoplay').checked)chrome.storage.local.set({"autoplay": 'true'});
	else chrome.storage.local.set({"autoplay": 'false'});
	if($('playlist').checked)chrome.storage.local.set({"playlist": 'true'});
	else chrome.storage.local.set({"playlist": 'false'});
	if($('flash').checked)chrome.storage.local.set({"flash": 'true'});
	else chrome.storage.local.set({"flash": 'false'});
	if($('head').checked)chrome.storage.local.set({"head": 'true'});
	else chrome.storage.local.set({"head": 'false'});
	if($('fadein').checked)chrome.storage.local.set({"fadein": 'true'});
	else chrome.storage.local.set({"fadein": 'false'});
	if($('fadeout').checked)chrome.storage.local.set({"fadeout": 'true'});
	else chrome.storage.local.set({"fadeout": 'false'});
	if($('infobar').checked)chrome.storage.local.set({"infobar": 'true'});
	else chrome.storage.local.set({"infobar": 'false'});
	if($('sharebutton').checked)chrome.storage.local.set({"sharebutton": 'true'});
	else chrome.storage.local.set({"sharebutton": 'false'});
	if($('likebutton').checked)chrome.storage.local.set({"likebutton": 'true'});
	else chrome.storage.local.set({"likebutton": 'false'});
	if($('readera').checked)chrome.storage.local.set({"readera": 'true'});
	else chrome.storage.local.set({"readera": 'false'});
	if($('readern').checked)chrome.storage.local.set({"readern": 'true'});
	else chrome.storage.local.set({"readern": 'false'});
	if($('shortcutlight').checked)chrome.storage.local.set({"shortcutlight": 'true'});
	else chrome.storage.local.set({"shortcutlight": 'false'});
	if($('eyea').checked)chrome.storage.local.set({"eyea": 'true'});
	else chrome.storage.local.set({"eyea": 'false'});
	if($('eyen').checked)chrome.storage.local.set({"eyen": 'true'});
	else chrome.storage.local.set({"eyen": 'false'});
	if($('suggestions').checked)chrome.storage.local.set({"suggestions": 'true'});
	else chrome.storage.local.set({"suggestions": 'false'});
	if($('videoheadline').checked)chrome.storage.local.set({"videoheadline": 'true'});
	else chrome.storage.local.set({"videoheadline": 'false'});
	if($('eastereggs').checked)chrome.storage.local.set({"eastereggs": 'true'});
	else chrome.storage.local.set({"eastereggs": 'false'});
	if($('contextmenus').checked)chrome.storage.local.set({"contextmenus": 'true'});
	else chrome.storage.local.set({"contextmenus": 'false'});
	if($('viewcount').checked)chrome.storage.local.set({"viewcount": 'true'});
	else chrome.storage.local.set({"viewcount": 'false'});
	chrome.storage.local.set({"lightimage": $('lightimage').value});	
	if($('lightimagea').checked)chrome.storage.local.set({"lightimagea": 'true'});
	else chrome.storage.local.set({"lightimagea": 'false'});
	if($('lightimagen').checked)chrome.storage.local.set({"lightimagen": 'true'});
	else chrome.storage.local.set({"lightimagen": 'false'});
	if($('eyealist').checked)chrome.storage.local.set({"eyealist": 'true'});
	else chrome.storage.local.set({"eyealist": 'false'});
	if($('mousespotlighto').checked)chrome.storage.local.set({"mousespotlighto": 'true'});
	else chrome.storage.local.set({"mousespotlighto": 'false'});
	if($('mousespotlighta').checked)chrome.storage.local.set({"mousespotlighta": 'true'});
	else chrome.storage.local.set({"mousespotlighta": 'false'});
	if($('mousespotlightc').checked)chrome.storage.local.set({"mousespotlightc": 'true'});
	else chrome.storage.local.set({"mousespotlightc": 'false'});
	if($('nighttime').checked)chrome.storage.local.set({"nighttime": 'true'});
	else chrome.storage.local.set({"nighttime": 'false'});
	chrome.storage.local.set({"begintime": $('begintime').value});
	chrome.storage.local.set({"endtime": $('endtime').value});
	if($('addvideobutton').checked)chrome.storage.local.set({"addvideobutton": 'true'});
	else chrome.storage.local.set({"addvideobutton": 'false'});
	if($('likebar').checked)chrome.storage.local.set({"likebar": 'true'});
	else chrome.storage.local.set({"likebar": 'false'});
	if($('ambilight').checked)chrome.storage.local.set({"ambilight": 'true'});
	else chrome.storage.local.set({"ambilight": 'false'});
	chrome.storage.local.set({"ambilightrangeblurradius": $('ambilightrangeblurradius').value});
	chrome.storage.local.set({"ambilightrangespreadradius": $('ambilightrangespreadradius').value});
	if($('mousespotlightt').checked)chrome.storage.local.set({"mousespotlightt": 'true'});
	else chrome.storage.local.set({"mousespotlightt": 'false'});
	if($('ambilightfixcolor').checked)chrome.storage.local.set({"ambilightfixcolor": 'true'});
	else chrome.storage.local.set({"ambilightfixcolor": 'false'});
	if($('ambilightvarcolor').checked)chrome.storage.local.set({"ambilightvarcolor": 'true'});
	else chrome.storage.local.set({"ambilightvarcolor": 'false'});
	chrome.storage.local.set({"ambilightcolorhex": $('ambilightcolorhex').value});
	if($('ambilight4color').checked)chrome.storage.local.set({"ambilight4color": 'true'});
	else chrome.storage.local.set({"ambilight4color": 'false'});
	chrome.storage.local.set({"ambilight1colorhex": $('ambilight1colorhex').value});
	chrome.storage.local.set({"ambilight2colorhex": $('ambilight2colorhex').value});
	chrome.storage.local.set({"ambilight3colorhex": $('ambilight3colorhex').value});
	chrome.storage.local.set({"ambilight4colorhex": $('ambilight4colorhex').value});
	if($('password').checked)chrome.storage.local.set({"password": 'true'});
	else chrome.storage.local.set({"password": 'false'});
	chrome.storage.local.set({"enterpassword": $('enterpassword').value});
	if($('noflash').checked)chrome.storage.local.set({"noflash": 'true'});
	else chrome.storage.local.set({"noflash": 'false'});
	if($('hardflash').checked)chrome.storage.local.set({"hardflash": 'true'});
	else chrome.storage.local.set({"hardflash": 'false'});
	if($('ecosaver').checked)chrome.storage.local.set({"ecosaver": 'true'});
	else chrome.storage.local.set({"ecosaver": 'false'});
	chrome.storage.local.set({"ecosavertime": $('ecosavertime').value});
	if($('dynamic').checked)chrome.storage.local.set({"dynamic": 'true'});
	else chrome.storage.local.set({"dynamic": 'false'});
	if($('dynamic1').checked)chrome.storage.local.set({"dynamic1": 'true'});
	else chrome.storage.local.set({"dynamic1": 'false'});
	if($('dynamic2').checked)chrome.storage.local.set({"dynamic2": 'true'});
	else chrome.storage.local.set({"dynamic2": 'false'});
	if($('dynamic3').checked)chrome.storage.local.set({"dynamic3": 'true'});
	else chrome.storage.local.set({"dynamic3": 'false'});
	if($('dynamic4').checked)chrome.storage.local.set({"dynamic4": 'true'});
	else chrome.storage.local.set({"dynamic4": 'false'});
	if($('dynamic5').checked)chrome.storage.local.set({"dynamic5": 'true'});
	else chrome.storage.local.set({"dynamic5": 'false'});
	if($('hoveroptiondyn5').checked)chrome.storage.local.set({"hoveroptiondyn5": 'true'});
	else chrome.storage.local.set({"hoveroptiondyn5": 'false'});
	if($('autoplayonly').checked)chrome.storage.local.set({"autoplayonly": 'true'});
	else chrome.storage.local.set({"autoplayonly": 'false'});
	if($('blur').checked)chrome.storage.local.set({"blur": 'true'});
	else chrome.storage.local.set({"blur": 'false'});
	var ytselq = document.getElementById("youtubequality");
	chrome.storage.local.set({"maxquality": ytselq.options[ytselq.selectedIndex].value});
	if($('autowidthyoutube').checked)chrome.storage.local.set({"autowidthyoutube": 'true'});
	else chrome.storage.local.set({"autowidthyoutube": 'false'});
	if($('customqualityyoutube').checked)chrome.storage.local.set({"customqualityyoutube": 'true'});
	else chrome.storage.local.set({"customqualityyoutube": 'false'});
	if($('cinemaontop').checked)chrome.storage.local.set({"cinemaontop": 'true'});
	else chrome.storage.local.set({"cinemaontop": 'false'});
	if($('alllightsoff').checked)chrome.storage.local.set({"alllightsoff": 'true'});
	else chrome.storage.local.set({"alllightsoff": 'false'});
	chrome.storage.local.set({"spotlightradius": $('spotlightradius').value});
	if($('atmosphereonly').checked)chrome.storage.local.set({"atmosphereonly": 'true'});
	else chrome.storage.local.set({"atmosphereonly": 'false'});
	if($('optionskipremember').checked)chrome.storage.local.set({"optionskipremember": 'true'});
	else chrome.storage.local.set({"optionskipremember": 'false'});
	if($('nighttheme').checked)chrome.storage.local.set({"nighttheme": 'true'});
	else chrome.storage.local.set({"nighttheme": 'false'});
	if($('nightonly').checked)chrome.storage.local.set({"nightonly": 'true'});
	else chrome.storage.local.set({"nightonly": 'false'});
	if($('nightenabletheme').checked)chrome.storage.local.set({"nightenabletheme": 'true'});
	else chrome.storage.local.set({"nightenabletheme": 'false'});
	if($('autoplaydelay').checked)chrome.storage.local.set({"autoplaydelay": 'true'});
	else chrome.storage.local.set({"autoplaydelay": 'false'});
	chrome.storage.local.set({"autoplaydelaytime": $('autoplaydelaytime').value});
	if($('motion').checked)chrome.storage.local.set({"motion": 'true'});
	else chrome.storage.local.set({"motion": 'false'});
	if($('lightimagelin').checked)chrome.storage.local.set({"lightimagelin": 'true'});
	else chrome.storage.local.set({"lightimagelin": 'false'});
	var linearsq = document.getElementById("linearsq");
	chrome.storage.local.set({"linearsq": linearsq.options[linearsq.selectedIndex].value});
	chrome.storage.local.set({"colora": $('colora').value});
	chrome.storage.local.set({"intervallina": $('intervallina').value});
	chrome.storage.local.set({"colorb": $('colorb').value});
	chrome.storage.local.set({"intervallinb": $('intervallinb').value});
	if($('speech').checked)chrome.storage.local.set({"speech": 'true'});
	else chrome.storage.local.set({"speech": 'false'});
	var webspeechlang = document.getElementById("select_language");
	if (webspeechlang.selectedIndex != -1){chrome.storage.local.set({"speechlang": webspeechlang.options[webspeechlang.selectedIndex].value});}
	var webspeechcountry = document.getElementById("select_dialect");
	if (webspeechcountry.selectedIndex != -1){chrome.storage.local.set({"speechcountry": webspeechcountry.options[webspeechcountry.selectedIndex].value});}
	if($('atmosvivid').checked)chrome.storage.local.set({"atmosvivid": 'true'});
	else chrome.storage.local.set({"atmosvivid": 'false'});
	if($('cammotiononly').checked)chrome.storage.local.set({"cammotiononly": 'true'});
	else chrome.storage.local.set({"cammotiononly": 'false'});
	if($('speechonly').checked)chrome.storage.local.set({"speechonly": 'true'});
	else chrome.storage.local.set({"speechonly": 'false'});
	if($('autoplaychecklistwhite').checked)chrome.storage.local.set({"autoplaychecklistwhite": 'true'});
	else chrome.storage.local.set({"autoplaychecklistwhite": 'false'});
	if($('autoplaychecklistblack').checked)chrome.storage.local.set({"autoplaychecklistblack": 'true'});
	else chrome.storage.local.set({"autoplaychecklistblack": 'false'});
	if($('autostop').checked)chrome.storage.local.set({"autostop": 'true'});
	else chrome.storage.local.set({"autostop": 'false'});
	if($('autostoponly').checked)chrome.storage.local.set({"autostoponly": 'true'});
	else chrome.storage.local.set({"autostoponly": 'false'});
	if($('autostopchecklistwhite').checked)chrome.storage.local.set({"autostopchecklistwhite": 'true'});
	else chrome.storage.local.set({"autostopchecklistwhite": 'false'});
	if($('autostopchecklistblack').checked)chrome.storage.local.set({"autostopchecklistblack": 'true'});
	else chrome.storage.local.set({"autostopchecklistblack": 'false'});
	if($('nighthover').checked)chrome.storage.local.set({"nighthover": 'true'});
	else chrome.storage.local.set({"nighthover": 'false'});
	if($('nightmodechecklistwhite').checked)chrome.storage.local.set({"nightmodechecklistwhite": 'true'});
	else chrome.storage.local.set({"nightmodechecklistwhite": 'false'});
	if($('nightmodechecklistblack').checked)chrome.storage.local.set({"nightmodechecklistblack": 'true'});
	else chrome.storage.local.set({"nightmodechecklistblack": 'false'});
	if($('nmtopleft').checked)chrome.storage.local.set({"nmtopleft": 'true'});
	else chrome.storage.local.set({"nmtopleft": 'false'});
	if($('nmtopright').checked)chrome.storage.local.set({"nmtopright": 'true'});
	else chrome.storage.local.set({"nmtopright": 'false'});
	if($('nmbottomright').checked)chrome.storage.local.set({"nmbottomright": 'true'});
	else chrome.storage.local.set({"nmbottomright": 'false'});
	if($('nmbottomleft').checked)chrome.storage.local.set({"nmbottomleft": 'true'});
	else chrome.storage.local.set({"nmbottomleft": 'false'});
	if($('nmcustom').checked)chrome.storage.local.set({"nmcustom": 'true'});
	else chrome.storage.local.set({"nmcustom": 'false'});
	if($('nightactivetime').checked)chrome.storage.local.set({"nightactivetime": 'true'});
	else chrome.storage.local.set({"nightactivetime": 'false'});
	chrome.storage.local.set({"nmbegintime": $('nmbegintime').value});
	chrome.storage.local.set({"nmendtime": $('nmendtime').value});
	if($('lampandnightmode').checked)chrome.storage.local.set({"lampandnightmode": 'true'});
	else chrome.storage.local.set({"lampandnightmode": 'false'});	
	if($('eyechecklistwhite').checked)chrome.storage.local.set({"eyechecklistwhite": 'true'});
	else chrome.storage.local.set({"eyechecklistwhite": 'false'});
	if($('eyechecklistblack').checked)chrome.storage.local.set({"eyechecklistblack": 'true'});
	else chrome.storage.local.set({"eyechecklistblack": 'false'});

// Excluded domains
var excludedDomainsBox = $("excludedDomainsBox");
var excludedDomains = {};
for (var i = 0; i < excludedDomainsBox.length; i++)
	excludedDomains[excludedDomainsBox.options[i].value] = true;
    chrome.storage.local.set({"excludedDomains": JSON.stringify(excludedDomains)});

// autoplay Excluded domains
var autoplayDomainsBox = $("autoplayDomainsBox");
var autoplayDomains = {};
for (var i = 0; i < autoplayDomainsBox.length; i++)
	autoplayDomains[autoplayDomainsBox.options[i].value] = true;
    chrome.storage.local.set({"autoplayDomains": JSON.stringify(autoplayDomains)});
	
// atmosphere Excluded domains
var atmosphereDomainsBox = $("atmosphereDomainsBox");
var atmosphereDomains = {};
for (var i = 0; i < atmosphereDomainsBox.length; i++)
	atmosphereDomains[atmosphereDomainsBox.options[i].value] = true;
    chrome.storage.local.set({"atmosphereDomains": JSON.stringify(atmosphereDomains)});
	
// night Excluded domains
var nightDomainsBox = $("nightDomainsBox");
var nightDomains = {};
for (var i = 0; i < nightDomainsBox.length; i++)
	nightDomains[nightDomainsBox.options[i].value] = true;
    chrome.storage.local.set({"nightDomains": JSON.stringify(nightDomains)});
	
// cammotion Excluded domains
var cammotionDomainsBox = $("cammotionDomainsBox");
var cammotionDomains = {};
for (var i = 0; i < cammotionDomainsBox.length; i++)
	cammotionDomains[cammotionDomainsBox.options[i].value] = true;
    chrome.storage.local.set({"cammotionDomains": JSON.stringify(cammotionDomains)});
	
// speech Excluded domains
var speechDomainsBox = $("speechDomainsBox");
var speechDomains = {};
for (var i = 0; i < speechDomainsBox.length; i++)
	speechDomains[speechDomainsBox.options[i].value] = true;
    chrome.storage.local.set({"speechDomains": JSON.stringify(speechDomains)});

// autostop Excluded domains
var autostopDomainsBox = $("autostopDomainsBox");
var autostopDomains = {};
for (var i = 0; i < autostopDomainsBox.length; i++)
	autostopDomains[autostopDomainsBox.options[i].value] = true;
    chrome.storage.local.set({"autostopDomains": JSON.stringify(autostopDomains)});
}

// Option to read current value from chrome.storage
chrome.storage.local.get(['fadein'], function(items){ // find no localstore fadein
	if(!items['fadein']) chrome.storage.local.set({"fadein": 'true'}); // then default true
});

chrome.storage.local.get(['fadeout'], function(items){ // find no localstore fadeout
	if(!items['fadeout']) chrome.storage.local.set({"fadeout": 'true'}); // then default true
});

chrome.storage.local.get(['readera', 'readern'], function(items){ // find no localstore reader
	if(!items['readera']&&!items['readern']){
	chrome.storage.local.set({"readern": 'true'}); // then default true
	chrome.storage.local.set({"readera": 'false'}); // then default false
	}
});

chrome.storage.local.get(['lightimagea', 'lightimagen'], function(items){ // find no localstore lightimage
	if(!items['lightimagea']&&!items['lightimagen']){
	chrome.storage.local.set({"lightimagen": 'true'}); // then default true
	chrome.storage.local.set({"lightimagea": 'false'}); // then default false
	}
});

chrome.storage.local.get(['mousespotlighta', 'mousespotlightc', 'mousespotlighto', 'mousespotlightt'], function(items){ // find no localstore mouse
	if(!items['mousespotlighta']&&!items['mousespotlightc']&&!items['mousespotlighto']&&!items['mousespotlightt']){
	chrome.storage.local.set({"mousespotlighto": 'true'}); // then default true, off
	chrome.storage.local.set({"mousespotlightc": 'false'}); // then default false, custom
	chrome.storage.local.set({"mousespotlighta": 'false'}); // then default false, auto
	chrome.storage.local.set({"mousespotlightt": 'false'}); // then default false, auto
	}
});

chrome.storage.local.get(['eyea', 'eyen', 'eyealist'], function(items){ // find no localstore eye
	if(!items['eyea']&&!items['eyen']&&!items['eyealist']){
	chrome.storage.local.set({"eyen": 'true'}); // then default true
	chrome.storage.local.set({"eyea": 'false'}); // then default false
	chrome.storage.local.set({"eyealist": 'false'}); // then default false
	}
});

chrome.storage.local.get(['interval'], function(items){
	if(items['interval']) default_opacity = items['interval'];
});

chrome.storage.local.get(['ambilightrangeblurradius'], function(items){
	if(items['ambilightrangeblurradius']) default_arangeblur = items['ambilightrangeblurradius'];
});

chrome.storage.local.get(['ambilightrangespreadradius'], function(items){
	if(items['ambilightrangespreadradius']) default_arangespread = items['ambilightrangespreadradius'];
});

chrome.storage.local.get(['ambilightvarcolor', 'ambilightfixcolor', 'ambilight4color'], function(items){ // find no localstore atmos
	if(!items['ambilightvarcolor']&&!items['ambilightfixcolor']&&!items['ambilight4color']){
	chrome.storage.local.set({"ambilightfixcolor": 'true'}); // then default true
	chrome.storage.local.set({"ambilightvarcolor": 'false'}); // then default false
	chrome.storage.local.set({"ambilight4color": 'false'}); // then default false
	}
});

chrome.storage.local.get(['flash', 'noflash', 'noflash'], function(items){ // find no localstore flash
	if(!items['flash']&&!items['noflash']&&!items['noflash']){
	chrome.storage.local.set({"noflash": 'true'}); // then default false
	chrome.storage.local.set({"flash": 'false'}); // then default true
	chrome.storage.local.set({"hardflash": 'false'}); // then default false
	}
});

chrome.storage.local.get(['dynamic1', 'dynamic2', 'dynamic3', 'dynamic4', 'dynamic5'], function(items){ // find no localstore flash
	if(!items['dynamic1']&&!items['dynamic2']&&!items['dynamic3']&&!items['dynamic4']&&!items['dynamic5']){
	chrome.storage.local.set({"dynamic1": 'true'}); // then default true
	chrome.storage.local.set({"dynamic2": 'false'}); // then default false
	chrome.storage.local.set({"dynamic3": 'false'}); // then default false
	chrome.storage.local.set({"dynamic4": 'false'}); // then default false
	chrome.storage.local.set({"dynamic5": 'false'}); // then default false
	}
});

chrome.storage.local.get(['hoveroptiondyn5'], function(items){ // find no localstore hoverdyn
	if(!items['hoveroptiondyn5']) chrome.storage.local.set({"hoveroptiondyn5": 'true'}); // then default true
});

chrome.storage.local.get(['maxquality'], function(items){ // find no localstore maxquality
	if(!items['maxquality']) chrome.storage.local.set({"maxquality": 'hd1080'}); // then default hd1080
});

chrome.storage.local.get(['pageaction', 'lampregular'], function(items){ // find no localstore lamp
	if(!items['pageaction']&&!items['lampregular']){
	chrome.storage.local.set({"lampregular": 'true'}); // then default true
	chrome.storage.local.set({"pageaction": 'false'}); // then default false
	}
});

chrome.storage.local.get(['autoplaychecklistwhite', 'autoplaychecklistblack'], function(items){ // find no localstore autoplay whitelist
	if(!items['autoplaychecklistwhite']&&!items['autoplaychecklistblack']){
	chrome.storage.local.set({"autoplaychecklistwhite": 'true'}); // then default true
	chrome.storage.local.set({"autoplaychecklistblack": 'false'}); // then default false
	}
});

chrome.storage.local.get(['autostopchecklistwhite', 'autostopchecklistblack'], function(items){ // find no localstore autostop whitelist
	if(!items['autostopchecklistwhite']&&!items['autostopchecklistblack']){
	chrome.storage.local.set({"autostopchecklistwhite": 'true'}); // then default true
	chrome.storage.local.set({"autostopchecklistblack": 'false'}); // then default false
	}
});

chrome.storage.local.get(['nightmodechecklistwhite', 'nightmodechecklistblack'], function(items){ // find no localstore nightmode whitelist
	if(!items['nightmodechecklistwhite']&&!items['nightmodechecklistblack']){
	chrome.storage.local.set({"nightmodechecklistwhite": 'true'}); // then default true
	chrome.storage.local.set({"nightmodechecklistblack": 'false'}); // then default false
	}
});

chrome.storage.local.get(['nmtopleft', 'nmtopright', 'nmbottomright','nmbottomleft','nmcustom'], function(items){ // find no localstore eye
	if(!items['nmtopleft']&&!items['nmtopright']&&!items['nmbottomright']&&!items['nmbottomleft']&&!items['nmcustom']){
	chrome.storage.local.set({"nmtopleft": 'false'}); // then default false
	chrome.storage.local.set({"nmtopright": 'false'}); // then default false
	chrome.storage.local.set({"nmbottomright": 'false'}); // then default false
	chrome.storage.local.set({"nmbottomleft": 'true'}); // then default true
	chrome.storage.local.set({"nmcustom": 'false'}); // then default false
	}
});

chrome.storage.local.get(['eyechecklistwhite', 'eyechecklistblack'], function(items){ // find no localstore eye whitelist
	if(!items['eyechecklistwhite']&&!items['eyechecklistblack']){
	chrome.storage.local.set({"eyechecklistwhite": 'true'}); // then default true
	chrome.storage.local.set({"eyechecklistblack": 'false'}); // then default false
	}
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

for (var i = 0; i < langs.length; i++) {
if($("select_language")){ $("select_language").options[i] = new Option(langs[i][0], i); }
}

function updateCountry() {
	for (var i = $("select_dialect").options.length - 1; i >= 0; i--) {
		$("select_dialect").remove(i);
	}
	var list = langs[select_language.selectedIndex];
	for (var i = 1; i < list.length; i++) {
		$("select_dialect").options.add(new Option(list[i][1], list[i][0]));
	}
	$("select_dialect").style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

$("select_language").addEventListener('click', function () {updateCountry();},false);
$("select_language").addEventListener('change', function() {updateCountry();save_options();});
$("select_dialect").addEventListener('change', function() {save_options();});

	chrome.storage.local.get(['interval', 'lightcolor', 'lightimage', 'lightimagea', 'lightimagen', 'pageaction', 'lampregular', 'autoplay', 'playlist', 'flash', 'head', 'fadein', 'fadeout', 'infobar', 'sharebutton', 'likebutton', 'readera', 'readern', 'shortcutlight', 'eyea', 'eyen', 'suggestions', 'videoheadline', 'eastereggs', 'contextmenus', 'viewcount', 'eyealist', 'mousespotlighto', 'mousespotlightc', 'mousespotlighta', 'nighttime', 'begintime', 'endtime', 'addvideobutton', 'likebar', 'ambilight', 'ambilightrangeblurradius', 'ambilightrangespreadradius', 'mousespotlightt', 'ambilightfixcolor', 'ambilightvarcolor', 'ambilightcolorhex', 'ambilight4color', 'ambilight1colorhex', 'ambilight2colorhex', 'ambilight3colorhex', 'ambilight4colorhex', 'password', 'enterpassword', 'noflash', 'hardflash', 'ecosaver', 'ecosavertime', 'dynamic', 'dynamic1', 'dynamic2', 'dynamic3', 'dynamic4', 'dynamic5', 'hoveroptiondyn5', 'autoplayonly', 'blur', 'maxquality', 'autowidthyoutube', 'customqualityyoutube', 'cinemaontop', 'alllightsoff', 'spotlightradius', 'atmosphereonly', 'optionskipremember', 'nighttheme', 'nightonly', 'nightenabletheme', 'autoplaydelay', 'autoplaydelaytime', 'motion', 'lightimagelin', 'linearsq', 'colora', 'intervallina', 'colorb', 'intervallinb', 'speech', 'speechlang', 'speechcountry', 'atmosvivid', 'countremember', 'excludedDomains', 'autoplayDomains', 'atmosphereDomains', 'nightDomains', 'cammotiononly', 'speechonly', 'cammotionDomains', 'speechDomains','autoplaychecklistwhite','autoplaychecklistblack','reviewedlastonversion','applastonversion','autostop','autostoponly','autostopchecklistwhite','autostopchecklistblack','nightmodechecklistwhite','nightmodechecklistblack','autostopDomains','nighthover','nmtopleft','nmtopright','nmbottomright','nmbottomleft','nmcustom','nightactivetime','nmbegintime','nmendtime','lampandnightmode','eyechecklistblack','eyechecklistwhite'], function(items){
		if(items['interval']){$('interval').value = items['interval'];$('slider').value = items['interval'];}	
		else $('interval').value = 80;
		if(items['lightcolor']){$('lightcolor').value = items['lightcolor'];}
		else {$('lightcolor').value = '#000000';}
		if(items['lightimage']){$('lightimage').value = items['lightimage'];}
		else {$('lightimage').value = "http://www.turnoffthelights.com/extension/images/theater.jpg";}
		if(items['lightimagea'] == 'true')$('lightimagea').checked = true;
		if(items['lightimagen'] == 'true')$('lightimagen').checked = true;
		if(items['pageaction'] == 'true')$('pageaction').checked = true;
		if(items['lampregular'] == 'true')$('lampregular').checked = true;
		if(items['autoplay'] == 'true')$('autoplay').checked = true;
		if(items['playlist'] == 'true')$('playlist').checked = true;
		if(items['flash'] == 'true')$('flash').checked = true;
		if(items['head'] == 'true')$('head').checked = true;
		if(items['fadein'] == 'true')$('fadein').checked = true;
		if(items['fadeout'] == 'true')$('fadeout').checked = true;
		if(items['infobar'] == 'true')$('infobar').checked = true;
		if(items['sharebutton'] == 'true')$('sharebutton').checked = true;
		if(items['likebutton'] == 'true')$('likebutton').checked = true;
		if(items['readera'] == 'true')$('readera').checked = true;
		if(items['readern'] == 'true')$('readern').checked = true;
		if(items['shortcutlight'] == 'true')$('shortcutlight').checked = true;
		if(items['eyea'] == 'true')$('eyea').checked = true;
		if(items['eyen'] == 'true')$('eyen').checked = true;
		if(items['suggestions'] == 'true')$('suggestions').checked = true;
		if(items['videoheadline'] == 'true')$('videoheadline').checked = true;
		if(items['eastereggs'] == 'true')$('eastereggs').checked = true;
		if(items['contextmenus'] == 'true')$('contextmenus').checked = true;
		if(items['viewcount'] == 'true')$('viewcount').checked = true;
		if(items['eyealist'] == 'true')$('eyealist').checked = true;
		if(items['mousespotlighto'] == 'true')$('mousespotlighto').checked = true;
		if(items['mousespotlightc'] == 'true')$('mousespotlightc').checked = true;
		if(items['mousespotlighta'] == 'true')$('mousespotlighta').checked = true;
		if(items['nighttime'] == 'true')$('nighttime').checked = true;
		if(items['begintime']){$('begintime').value = items['begintime'];}
		else {$('begintime').value = "21:00";}
		if(items['endtime']){$('endtime').value = items['endtime'];}
		else {$('endtime').value = "23:45";}
		if(items['addvideobutton'] == 'true')$('addvideobutton').checked = true;
		if(items['likebar'] == 'true')$('likebar').checked = true;
		if(items['ambilight'] == 'true')$('ambilight').checked = true;
		if(items['ambilightrangeblurradius']){$('ambilightrangeblurradius').value = items['ambilightrangeblurradius'];$('arangeblur').value = items['ambilightrangeblurradius'];}
		else{$('ambilightrangeblurradius').value = 70;}
		if(items['ambilightrangespreadradius']){$('ambilightrangespreadradius').value = items['ambilightrangespreadradius'];$('arangespread').value = items['ambilightrangespreadradius'];}
		else{$('ambilightrangespreadradius').value = 20;}
		if(items['mousespotlightt'] == 'true')$('mousespotlightt').checked = true;
		if(items['ambilightfixcolor'] == 'true')$('ambilightfixcolor').checked = true;
		if(items['ambilightvarcolor'] == 'true')$('ambilightvarcolor').checked = true;
		if(items['ambilightcolorhex'])$('ambilightcolorhex').value = items['ambilightcolorhex'];
		else $('ambilightcolorhex').value = '#47C2FF';
		if(items['ambilight4color'] == 'true')$('ambilight4color').checked = true;
		if(items['ambilight1colorhex'])$('ambilight1colorhex').value = items['ambilight1colorhex'];
		else $('ambilight1colorhex').value = '#FF0000';
		if(items['ambilight2colorhex'])$('ambilight2colorhex').value = items['ambilight2colorhex'];
		else $('ambilight2colorhex').value = '#FFEE00';
		if(items['ambilight3colorhex'])$('ambilight3colorhex').value = items['ambilight3colorhex'];
		else $('ambilight3colorhex').value = '#00FF00';
		if(items['ambilight4colorhex'])$('ambilight4colorhex').value = items['ambilight4colorhex'];
		else $('ambilight4colorhex').value = '#0000FF';
		if(items['password'] == 'true')$('password').checked = true;
		if(items['enterpassword'])$('enterpassword').value = items['enterpassword'];
		if(items['noflash'] == 'true')$('noflash').checked = true;
		if(items['hardflash'] == 'true')$('hardflash').checked = true;
		if(items['ecosaver'] == 'true')$('ecosaver').checked = true;
		if(items['ecosavertime'])$('ecosavertime').value = items['ecosavertime'];
		else $('ecosavertime').value = '60';
		if(items['dynamic'] == 'true')$('dynamic').checked = true;
		else $('lightdynamic').disabled = true;
		if(items['dynamic1'] == 'true'){$('dynamic1').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicfishtank');}
		if(items['dynamic2'] == 'true'){$('dynamic2').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicblocks');}
		if(items['dynamic3'] == 'true'){$('dynamic3').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicraindrops');}
		if(items['dynamic4'] == 'true'){$('dynamic4').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamiccloud');}
		if(items['dynamic5'] == 'true'){$('dynamic5').checked = true;$("lightdynamic").value = chrome.i18n.getMessage('desdynamicspace');}
		if(items['hoveroptiondyn5'] == 'true')$('hoveroptiondyn5').checked = true;
		if(items['autoplayonly'] == 'true'){$('autoplayonly').checked = true;}
		else{$('autoplayonly').checked = false;}
		if(items['blur'] == 'true')$('blur').checked = true;
		if(items['maxquality'])$('youtubequality').value = items['maxquality'];
		if(items['autowidthyoutube'] == 'true')$('autowidthyoutube').checked = true;
		if(items['customqualityyoutube'] == 'true')$('customqualityyoutube').checked = true;
		if(items['cinemaontop'] == 'true')$('cinemaontop').checked = true;
		if(items['alllightsoff'] == 'true')$('alllightsoff').checked = true;
		if(items['spotlightradius'])$('spotlightradius').value = items['spotlightradius'];
		else $('spotlightradius').value = 50;
		if(items['atmosphereonly'] == 'true'){$('atmosphereonly').checked = true;}
		else{$('atmosphereonly').checked = false;}
		if(items['optionskipremember'] == 'true'){$('optionskipremember').checked = true;$('firstcheckboxskipremember').checked = true;}
		if(items['nighttheme'] == 'true')$('nighttheme').checked = true;
		if(items['nightonly'] == 'true'){$('nightonly').checked = true;}
		else{$('nightonly').checked = false;}
		if(items['nightenabletheme'] == 'true')$('nightenabletheme').checked = true;
		if(items['autoplaydelay'] == 'true')$('autoplaydelay').checked = true;
		if(items['autoplaydelaytime'])$('autoplaydelaytime').value = items['autoplaydelaytime'];
		else $('autoplaydelaytime').value = 3;
		if(items['motion'] == 'true')$('motion').checked = true;
		if(items['lightimagelin'] == 'true')$('lightimagelin').checked = true;
		if(items['linearsq'])$('linearsq').value = items['linearsq'];
		else $('linearsq').value = "top";
		if(items['colora']){$('colora').value = items['colora'];}
		else {$('colora').value = '#000000';}
		if(items['intervallina']){$('intervallina').value = items['intervallina'];}
		else {$('intervallina').value = '0';}
		if(items['colorb']){$('colorb').value = items['colorb'];}
		else {$('colorb').value = '#858585';}
		if(items['intervallinb']){$('intervallinb').value = items['intervallinb'];}
		else {$('intervallinb').value = '100';}
		if(items['speech'] == 'true')$('speech').checked = true;
		if(items['speechlang']){$("select_language").selectedIndex = items['speechlang'];updateCountry();}
		if(items['speechcountry'])$('select_dialect').value = items['speechcountry'];
		if(items['atmosvivid'] == 'true')$('atmosvivid').checked = true;
		if(items['cammotiononly'] == 'true'){$('cammotiononly').checked = true;}
		else{$('cammotiononly').checked = false;}
		if(items['speechonly'] == 'true'){$('speechonly').checked = true;}
		else{$('speechonly').checked = false;}
		if(items['autoplaychecklistwhite'] == 'true'){$('autoplaychecklistwhite').checked = true;}
		if(items['autoplaychecklistblack'] == 'true'){$('autoplaychecklistblack').checked = true;}
		if(items['reviewedlastonversion'] == chrome.runtime.getManifest().version){$("sectionreviewbox").style.display = "none";}
		if(items['applastonversion'] == chrome.runtime.getManifest().version){$("sectionauroraplayerappbox").style.display = "none";}
		if(items['autostop'] == 'true')$('autostop').checked = true;
		if(items['autostoponly'] == 'true'){$('autostoponly').checked = true;}
		else{$('autostoponly').checked = false;}
		if(items['autostopchecklistwhite'] == 'true'){$('autostopchecklistwhite').checked = true;}
		if(items['autostopchecklistblack'] == 'true'){$('autostopchecklistblack').checked = true;}
		if(items['nighthover'] == 'true'){$('nighthover').checked = true;}
		if(items['nightmodechecklistwhite'] == 'true'){$('nightmodechecklistwhite').checked = true;}
		if(items['nightmodechecklistblack'] == 'true'){$('nightmodechecklistblack').checked = true;}
		if(items['nmtopleft'] == 'true'){$('nmtopleft').checked = true;}
		if(items['nmtopright'] == 'true'){$('nmtopright').checked = true;}
		if(items['nmbottomright'] == 'true'){$('nmbottomright').checked = true;}
		if(items['nmbottomleft'] == 'true'){$('nmbottomleft').checked = true;}
		if(items['nmcustom'] == 'true'){$('nmcustom').checked = true;}
		if(items['nightactivetime'] == 'true'){$('nightactivetime').checked = true;}
		if(items['nmbegintime']){$('nmbegintime').value = items['nmbegintime'];}
		else {$('nmbegintime').value = "21:00";}
		if(items['nmendtime']){$('nmendtime').value = items['nmendtime'];}
		else {$('nmendtime').value = "23:45";}
		if(items['lampandnightmode'] == 'true'){$('lampandnightmode').checked = true;}
		else{$('lampandnightmode').checked = false;}
		if(items['eyechecklistwhite'] == 'true'){$('eyechecklistwhite').checked = true;}
		if(items['eyechecklistblack'] == 'true'){$('eyechecklistblack').checked = true;}

// show remember page
var countremember = items['countremember'];
if(!countremember){countremember = 0;}
countremember = parseInt(countremember) + 1;
if($('optionskipremember').checked != true){
	if(countremember >= 5) {$('remembershare').style.display = "";countremember = 0;}
	else {$('remembershare').style.display = "none";}
} else {$('remembershare').style.display = "none";}
chrome.storage.local.set({"countremember": countremember});

	// load tab div
	var tabListItems = $('navbar').childNodes;
	for ( var i = 0; i < tabListItems.length; i++ ) {
		if ( tabListItems[i].nodeName == 'LI' ) {
		var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
		var id = getHash( tabLink.getAttribute('data-tab') );
		tabLinks[id] = tabLink;
		contentDivs[id] = $( id );
        }
    }
    
    // Assign onclick events to the tab links, and
    // highlight the first tab
    var i = 0;
 
    for ( var id in tabLinks ) {
    	tabLinks[id].onclick = showTab;
		tabLinks[id].onfocus = function() { this.blur() };
		if ( i == 0 ) tabLinks[id].className = 'navbar-item-selected';
		i++;
    }
    
    // Hide all content divs except the first
    var i = 0;
 
    for ( var id in contentDivs ) {
    	if ( i != 0 ) contentDivs[id].className = 'page hidden';
        i++;
    }

    // display version number
	var manifestData = chrome.runtime.getManifest();
	$("version_number").innerText = manifestData.version;

// Excluded domains - sort these alphabetically
var excludedDomains = items["excludedDomains"];
if(typeof excludedDomains == "undefined")
excludedDomains = JSON.stringify({'http://www.nytimes.com': true, 'http://www.blogger.com': true});
		
if(typeof excludedDomains == "string") {
	excludedDomains = JSON.parse(excludedDomains);
	var buf = [];
	for(var domain in excludedDomains)
		buf.push(domain);
        buf.sort();
	for(var i = 0; i < buf.length; i++)
		appendToListBox("excludedDomainsBox", buf[i]);
    }

// ambilight play detect
		var startambilight = setInterval(function () {
		try {
		var htmlplayer = document.getElementsByTagName("video") || null;
		var playerid = null, item = null;
		for(var j=0; j<htmlplayer.length; j++) {
			if (htmlplayer[j].play){playerid = htmlplayer[j]; item = j + 1; drawImage(playerid, item);}
		}
		}
		catch(err) {} // i see nothing, that is good
		},20); // 20 refreshing it

// default example2 is not display
example2.style.opacity = 0;example2.style.display = 'none';
// default hide this buttons
wallpapershow.style.display = 'none';dynamicshow.style.display = 'none';

// autoplay - Excluded domains - sort these alphabetically
var autoplayDomains = items["autoplayDomains"];
if(typeof autoplayDomains == "undefined")
autoplayDomains = JSON.stringify({'http://www.youtube.com': true, 'https://www.youtube.com': true, 'http://www.vimeo.com': true});

if(typeof autoplayDomains == "string") {
	autoplayDomains = JSON.parse(autoplayDomains);
	var abuf = [];
	for(var domain in autoplayDomains)
		abuf.push(domain);
        abuf.sort();
	for(var i = 0; i < abuf.length; i++)
		appendToListBox("autoplayDomainsBox", abuf[i]);
    }
	
// atmosphere - Excluded domains - sort these alphabetically
var atmosphereDomains = items["atmosphereDomains"];
if(typeof atmosphereDomains == "undefined")
atmosphereDomains = JSON.stringify({'http://www.youtube.com': true, 'https://www.youtube.com': true, 'http://www.vimeo.com': true});
		
if(typeof atmosphereDomains == "string") {
	atmosphereDomains = JSON.parse(atmosphereDomains);
	var albuf = [];
	for(var domain in atmosphereDomains)
		albuf.push(domain);
        albuf.sort();
	for(var i = 0; i < albuf.length; i++)
		appendToListBox("atmosphereDomainsBox", albuf[i]);
    }
	
// night - Excluded domains - sort these alphabetically
var nightDomains = items["nightDomains"];
if(typeof nightDomains == "undefined")
nightDomains = JSON.stringify({'http://www.youtube.com': true, 'https://www.youtube.com': true, 'http://www.nytimes.com': true});

if(typeof nightDomains == "string") {
	nightDomains = JSON.parse(nightDomains);
	var nbuf = [];
	for(var domain in nightDomains)
		nbuf.push(domain);
        nbuf.sort();
	for(var i = 0; i < nbuf.length; i++)
		appendToListBox("nightDomainsBox", nbuf[i]);
    }
	
// cammotion - Excluded domains - sort these alphabetically
var cammotionDomains = items["cammotionDomains"];
if(typeof cammotionDomains == "undefined")
cammotionDomains = JSON.stringify({'http://www.youtube.com': true, 'https://www.youtube.com': true, 'http://www.vimeo.com': true});
		
if(typeof cammotionDomains == "string") {
	cammotionDomains = JSON.parse(cammotionDomains);
	var cmbuf = [];
	for(var domain in cammotionDomains)
		cmbuf.push(domain);
        cmbuf.sort();
	for(var i = 0; i < cmbuf.length; i++)
		appendToListBox("cammotionDomainsBox", cmbuf[i]);
    }

// speech - Excluded domains - sort these alphabetically
var speechDomains = items["speechDomains"];
if(typeof speechDomains == "undefined")
speechDomains = JSON.stringify({'http://www.youtube.com': true, 'https://www.youtube.com': true, 'http://www.vimeo.com': true});
		
if(typeof speechDomains == "string") {
	speechDomains = JSON.parse(speechDomains);
	var srbuf = [];
	for(var domain in speechDomains)
		srbuf.push(domain);
        srbuf.sort();
	for(var i = 0; i < srbuf.length; i++)
		appendToListBox("speechDomainsBox", srbuf[i]);
    }
	
// autostop - Excluded domains - sort these alphabetically
var autostopDomains = items["autostopDomains"];
if(typeof autostopDomains == "undefined")
autostopDomains = JSON.stringify({'http://www.youtube.com': true, 'https://www.youtube.com': true, 'http://www.vimeo.com': true});
		
if(typeof autostopDomains == "string") {
	autostopDomains = JSON.parse(autostopDomains);
	var asbuf = [];
	for(var domain in autostopDomains)
		asbuf.push(domain);
        asbuf.sort();
	for(var i = 0; i < asbuf.length; i++)
		appendToListBox("autostopDomainsBox", asbuf[i]);
    }
	
	test(); // everything readed, do the "test"
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

var countA = 0, countB = 0, countC = 0; // start from zero (blur spread) and size (left right top under) position

// ambilight draw code
function drawImage(){
	var v = $("beeld");
	if(v.paused || v.ended){
	// v.style.webkitBoxShadow = "";

	// animation go out
	countA=countA-1;if (countA <= 0){countA=0;}
	countB=countB-1;if (countB <= 0){countB=0;}
	countC=countC-1;if (countC <= 0){countC=0;}
	var textcountA = countA + "px";
	var textcountB = countB + "px";

var canvas = $("totlCanvas1");
if(canvas){
	var context = canvas.getContext('2d');
	var imageData = context.getImageData(0, 0, 1, 1);
	var data = imageData.data;

	function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
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

	if(ambilightvarcolor.checked == true){
	v.style.webkitBoxShadow = "0px 0px 5px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + downhex3 + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + downhex1 + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + downhex2 + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + downhex4 + ""; 
	}
	else if(ambilightfixcolor.checked == true){
	v.style.webkitBoxShadow = "0px 0px 5px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilightcolorhex").value + "";
	}
	else if(ambilight4color.checked == true){
	v.style.webkitBoxShadow = "0px 0px 5px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + $("ambilight1colorhex").value + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + $("ambilight2colorhex").value + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilight3colorhex").value + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + $("ambilight4colorhex").value + "";
	}
	// ----
	
	return false;
	}
	if(ambilight.checked == true){
    var showtime = $("beeld");
	var getblur = $('ambilightrangeblurradius').value + "px";
	var getspread = $('ambilightrangespreadradius').value + "px";
	
	// animate out and in
	if (countA < $('ambilightrangespreadradius').value){countA=countA+1;}
	if (countB < $('ambilightrangeblurradius').value){countB=countB+1;}
	if (countC < 20){countC=countC+.5;}
	var textcountA = countA + "px";
	var textcountB = countB + "px";
	
	if(ambilightvarcolor.checked == true){
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
var context = canvas.getContext("2d");
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

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
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

	v.style.webkitBoxShadow = "0px 0px 5px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + hex3 + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + hex1 + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + hex2 + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + hex4 + "";
	} else if(ambilightfixcolor.checked == true){
	var fixhex = $("ambilightcolorhex").value;
	if(fixhex)fixhex = fixhex;else fixhex = '#000000';
	v.style.webkitBoxShadow = "0px 0px 5px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + fixhex + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + fixhex + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + fixhex + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + fixhex + "";
	} else if(ambilight4color.checked == true){
	var fix1hex = $("ambilight1colorhex").value;
	var fix2hex = $("ambilight2colorhex").value;
	var fix3hex = $("ambilight3colorhex").value;
	var fix4hex = $("ambilight4colorhex").value;
	if(fix1hex)fix1hex = fix1hex;else fix1hex = '#FF0000';
	if(fix2hex)fix2hex = fix2hex;else fix2hex = '#FFEE00';
	if(fix3hex)fix3hex = fix3hex;else fix3hex = '#00FF00';
	if(fix4hex)fix4hex = fix4hex;else fix4hex = '#0000FF';
	v.style.webkitBoxShadow = "0px 0px 5px black , 0px -" + countC + "px " + textcountB + " " + textcountA + " " + fix1hex + ", 0px " + countC + "px " + textcountB + " " + textcountA + " " + fix2hex + ", " + countC + "px 0px " + textcountB + " " + textcountA + " " + fix3hex + ", -" + countC + "px 0px " + textcountB + " " + textcountA + " " + fix4hex + "";
	}
	
	window.requestAnimFrame(drawImage);	
}else{v.style.webkitBoxShadow = "";}
}

// Fade engine
//  Variable for the fade in and out effect
var opacity = 0;

var ReducingFinished = true;
var OpacityLevelIncrement = 10;   //  Percentage value: 1-100

//  Function determines whether we show or hide the item referenced by ElementID
function fader(ActionToTake)
{
  DIVElementById = $('example2');
  if (ActionToTake == 'hide')
  { opacity = default_opacity; reduceOpacity(); }
  else if (ActionToTake == 'show')
  { increaseOpacity(); }
}

//  Makes div increase
function increaseOpacity()
{
DIVElementById.style.display = '';
  //  If opacity level is less than default_opacity, we can still increase the opacity
  if ((opacity < default_opacity) && (ReducingFinished == true))
  {
	if ((opacity > (default_opacity-10)) && (ReducingFinished == true)){
    ReducingFinished = true;
    opacity  += (default_opacity - opacity);
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(increaseOpacity);
	}
	else {
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

//  Makes div reduce
function reduceOpacity() 
{
  //  If opacity level is greater than 0, we can still reduce the opacity
  if ((opacity > 0) && (ReducingFinished == false))
  {
    ReducingFinished = false;
    opacity  -= OpacityLevelIncrement;
    DIVElementById.style.opacity = opacity/100;
	window.requestAnimFrame(reduceOpacity);
  }
  else
  {
    ReducingFinished = true;

    //  When finished, make sure the DIVElementById is set to remove element
    if (DIVElementById.style.opacity = '0')
    {DIVElementById.style.display = 'none';}
  }
}

// Add a filter string to the list box.
function appendToListBox(boxId, text) { var elt = document.createElement("option"); elt.text = text; elt.value = text; $(boxId).add(elt, null); }

// tabel script
    var tabLinks = new Array();
    var contentDivs = new Array();
 
    function showTab() {
      var selectedId = getHash( this.getAttribute('data-tab') );
 
      // Highlight the selected tab, and dim all others.
      // Also show the selected content div, and hide all others.
      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'navbar-item-selected';
          contentDivs[id].className = 'page';
        } else {
          tabLinks[id].className = 'navbar-item';
          contentDivs[id].className = 'page hidden';
        }
      }
 
      // Stop the browser following the link
      return false;
    }
 
    function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
    }
 
    function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
    }

// whitelist eye domain
function addWhitelistDomain() {
    var domain = $("websiteurl").value;
    appendToListBox("excludedDomainsBox", domain);
    save_options();
}

function removeSelectedExcludedDomain() {
    var excludedDomainsBox = $("excludedDomainsBox");
    for (var i = excludedDomainsBox.length-1; i >= 0; i--) {
        if (excludedDomainsBox.options[i].selected)
            excludedDomainsBox.remove(i);
    }
    save_options();
}

// whitelist autoplay domain
function autoplayaddWhitelistDomain() {
    var domain = $("autoplaywebsiteurl").value;
    appendToListBox("autoplayDomainsBox", domain);
    save_options();
}

function autoplayremoveSelectedExcludedDomain() {
    var autoplayDomainsBox = $("autoplayDomainsBox");
    for (var i = autoplayDomainsBox.length-1; i >= 0; i--) {
        if (autoplayDomainsBox.options[i].selected)
            autoplayDomainsBox.remove(i);
    }
    save_options();
}

// whitelist atmosphere domain
function atmosphereaddWhitelistDomain() {
    var domain = $("atmospherewebsiteurl").value;
    appendToListBox("atmosphereDomainsBox", domain);
    save_options();
}

function atmosphereremoveSelectedExcludedDomain() {
    var atmosphereDomainsBox = $("atmosphereDomainsBox");
    for (var i = atmosphereDomainsBox.length-1; i >= 0; i--) {
        if (atmosphereDomainsBox.options[i].selected)
            atmosphereDomainsBox.remove(i);
    }
    save_options();
}

// whitelist night domain
function nightaddWhitelistDomain() {
    var domain = $("nightwebsiteurl").value;
    appendToListBox("nightDomainsBox", domain);
    save_options();
}

function nightremoveSelectedExcludedDomain() {
    var nightDomainsBox = $("nightDomainsBox");
    for (var i = nightDomainsBox.length-1; i >= 0; i--) {
        if (nightDomainsBox.options[i].selected)
            nightDomainsBox.remove(i);
    }
    save_options();
}

// whitelist cam motion domain
function cammotionaddWhitelistDomain() {
    var domain = $("cammotionwebsiteurl").value;
    appendToListBox("cammotionDomainsBox", domain);
    save_options();
}

function cammotionremoveSelectedExcludedDomain() {
    var cammotionDomainsBox = $("cammotionDomainsBox");
    for (var i = cammotionDomainsBox.length-1; i >= 0; i--) {
        if (cammotionDomainsBox.options[i].selected)
            cammotionDomainsBox.remove(i);
    }
    save_options();
}

// whitelist speech domain
function speechaddWhitelistDomain() {
    var domain = $("speechwebsiteurl").value;
    appendToListBox("speechDomainsBox", domain);
    save_options();
}

function speechremoveSelectedExcludedDomain() {
    var speechDomainsBox = $("speechDomainsBox");
    for (var i = speechDomainsBox.length-1; i >= 0; i--) {
        if (speechDomainsBox.options[i].selected)
            speechDomainsBox.remove(i);
    }
    save_options();
}

// whitelist autostop domain
function autostopaddWhitelistDomain() {
    var domain = $("autostopwebsiteurl").value;
    appendToListBox("autostopDomainsBox", domain);
    save_options();
}

function autostopremoveSelectedExcludedDomain() {
    var autostopDomainsBox = $("autostopDomainsBox");
    for (var i = autostopDomainsBox.length-1; i >= 0; i--) {
        if (autostopDomainsBox.options[i].selected)
            autostopDomainsBox.remove(i);
    }
    save_options();
}

// fade effects control -> not when loaded page
function lightscontrol() {
var jump = $('interval').value;
default_opacity = jump;
if(onoffrange.value == 0)
{
if(fadeout.checked == true){ReducingFinished = false;fader('hide');}else{example2.style.opacity = 0;example2.style.display = 'none';}
}
else{
if(fadein.checked == true){ReducingFinished = true;fader('show');}else{example2.style.opacity = jump/100;example2.style.display = '';}
}
}

// remove dynamic elements
function removedynamic(){
var newdynmaster = $("stefanvddynamicbackground");
var fishtanks = $('fishtanks');
if(fishtanks) {newdynmaster.removeChild(fishtanks);}
var blocks = $('blocks');
if(blocks) {newdynmaster.removeChild(blocks);}
var raindrops = $('raindrops');
if(raindrops) {newdynmaster.removeChild(raindrops);}
var clouds = $('clouds');
if(clouds) {newdynmaster.removeChild(clouds);}
var space = $('space');
if(space) {newdynmaster.removeChild(space);}
}

// test general
function test() {
if(ambilight.checked == true){
drawImage();
}

// show alert warning
if(ambilightvarcolor.checked == true)
{$('showwarningambilight').style.display = '';}
else{$('showwarningambilight').style.display = 'none';}

// YouTube preview sample
if(head.checked == true)
{$('samplechannel').style.zIndex = 100;$('samplechannel').style.position = 'relative';$('videochannel').style.zIndex = 100;$('videochannel').style.position = 'relative';}
else{$('samplechannel').style.zIndex = 1;$('samplechannel').style.position = 'relative';$('videochannel').style.zIndex = 1;$('videochannel').style.position = 'relative';}

if(playlist.checked == true){} // not visible in the preview
else{}

if(infobar.checked == true)
{$('sampleinforbar').style.zIndex = 100;$('sampleinforbar').style.position = 'relative';}
else{$('sampleinforbar').style.zIndex = 1;$('sampleinforbar').style.position = 'relative';}

if(likebutton.checked == true)
{$('sampledislikebutton').style.zIndex = 100;$('sampledislikebutton').style.position = 'relative';}
else{$('sampledislikebutton').style.zIndex = 1;$('sampledislikebutton').style.position = 'relative';}

if(sharebutton.checked == true)
{$('samplesharebutton').style.zIndex = 100;$('samplesharebutton').style.position = 'relative';}
else{$('samplesharebutton').style.zIndex = 1;$('samplesharebutton').style.position = 'relative';}

if(suggestions.checked == true)
{$('samplesug').style.zIndex = 100;$('samplesug').style.position = 'relative';}
else {$('samplesug').style.zIndex = 1;$('samplesug').style.position = 'relative';}

if(videoheadline.checked == true){$('sampletitle').style.zIndex = 100;$('sampletitle').style.position = 'relative';$('sampletitle').style.color = '#FFFFFF';}
else {$('sampletitle').style.zIndex = 1;$('sampletitle').style.position = 'relative';$('sampletitle').style.color = '#000000';}

if(viewcount.checked == true)
{$('sampleview').style.zIndex = 100;$('sampleview').style.color = 'white';$('sampleview').style.position = 'relative';}
else{$('sampleview').style.zIndex = 1;$('sampleview').style.color = 'black';$('sampleview').style.position = 'relative';}

if(addvideobutton.checked == true)
{$('sampleaddbutton').style.zIndex = 100;$('sampleaddbutton').style.position = 'relative';}
else{$('sampleaddbutton').style.zIndex = 1;$('sampleaddbutton').style.position = 'relative';}

if(likebar.checked == true)
{$('samplelikebar').style.zIndex = 101;$('samplelikebar').style.position = 'relative';}
else{$('samplelikebar').style.zIndex = 'auto';$('samplelikebar').style.position = 'relative';}

/* --- end YouTube preview --- */
if(ambilight.checked == true)
{$('arangespread').disabled = false;$('ambilightrangespreadradius').disabled = false;$('arangeblur').disabled = false;$('ambilightrangeblurradius').disabled = false;$('ambilightfixcolor').disabled = false;$('ambilightvarcolor').disabled = false;$('ambilightcolorhex').disabled = false;$('ambilight4color').disabled = false;$('ambilight1colorhex').disabled = false;$('ambilight2colorhex').disabled = false;$('ambilight3colorhex').disabled = false;$('ambilight4colorhex').disabled = false;$('atmosvivid').disabled = false;}
else {$('arangespread').disabled = true;$('ambilightrangespreadradius').disabled = true;$('arangeblur').disabled = true;$('ambilightrangeblurradius').disabled = true;$('ambilightfixcolor').disabled = true;$('ambilightvarcolor').disabled = true;$('ambilightcolorhex').disabled = true;$('ambilight4color').disabled = true;$('ambilight1colorhex').disabled = true;$('ambilight2colorhex').disabled = true;$('ambilight3colorhex').disabled = true;$('ambilight4colorhex').disabled = true;$('atmosvivid').disabled = true;}

if(lightimagea.checked == true)
{$('lightimagen').checked = false;$('example1').style.background = 'url(' + $('lightimage').value + ')';$('example1').style.backgroundSize = "100% 100%";$('example2').style.background = 'url(' + $('lightimage').value + ')';$('example2').style.backgroundSize = "100% 100%";$('lightimage').disabled = false;$('lightcolor').disabled = true;
$('mousespotlighta').disabled = true;$('mousespotlightc').disabled = true;$('mousespotlighto').checked = true;}
else if(lightimagen.checked == true){$('lightimagen').checked = true;$('example1').style.background = $('lightcolor').value;$('example2').style.background = $('lightcolor').value;$('lightimage').disabled = true;$('lightcolor').disabled = false;
$('mousespotlighta').disabled = false;$('mousespotlightc').disabled = false;}
else if(lightimagelin.checked == true)
{var linearsq = document.getElementById("linearsq");
$('example1').style.background = 'linear-gradient(to ' + linearsq.options[linearsq.selectedIndex].value + ', ' + $('colora').value + ' ' + $('intervallina').value + '%,' + $('colorb').value + ' ' + $('intervallinb').value + '%)';
$('example2').style.background = 'linear-gradient(to ' + linearsq.options[linearsq.selectedIndex].value + ', ' + $('colora').value + ' ' + $('intervallina').value + '%,' + $('colorb').value + ' ' + $('intervallinb').value + '%)';
$('mousespotlighta').disabled = true;$('mousespotlightc').disabled = true;$('mousespotlighto').checked = true;
}

if(eyen.checked == true){$('ecosaver').disabled = false;$('ecosavertime').disabled = false;$('confirmtimesaver').disabled = false;$('helpeyeprotection').style.display = "none";$('excludedDomainsBox').disabled = true;$('websiteurl').disabled = true;$('autoplay').disabled = false;$('autoplaydelay').disabled = false;$('autoplaydelaytime').disabled = false;$('addbutton').disabled = true;$('removebutton').disabled = true;$('nighttime').disabled = false;$('begintime').disabled = false;$('endtime').disabled = false;$('confirmtime').disabled = false;$('helpautoplay').style.display = "none";$('eyechecklistwhite').disabled = true;$('eyechecklistblack').disabled = true;}
else if(eyea.checked == true){$('ecosaver').disabled = false;$('ecosavertime').disabled = false;$('confirmtimesaver').disabled = false;$('helpeyeprotection').style.display = "";$('excludedDomainsBox').disabled = true;$('websiteurl').disabled = true;$('autoplay').checked = false;$('autoplaydelay').disabled = true;$('autoplaydelaytime').disabled = true;$('addbutton').disabled = true;$('removebutton').disabled = true;$('nighttime').disabled = false;$('begintime').disabled = false;$('endtime').disabled = false;$('confirmtime').disabled = false;$('helpautoplay').style.display = "";$('eyechecklistwhite').disabled = true;$('eyechecklistblack').disabled = true;}
else if(eyealist.checked == true){$('ecosaver').disabled = false;$('ecosavertime').disabled = false;$('confirmtimesaver').disabled = false;$('helpeyeprotection').style.display = "";$('excludedDomainsBox').disabled = false;$('websiteurl').disabled = false;$('autoplay').checked = false;$('autoplaydelay').disabled = true;$('autoplaydelaytime').disabled = true;$('addbutton').disabled = false;$('removebutton').disabled = false;$('nighttime').disabled = false;$('begintime').disabled = false;$('endtime').disabled = false;$('confirmtime').disabled = false;$('helpautoplay').style.display = "";$('eyechecklistwhite').disabled = false;$('eyechecklistblack').disabled = false;}

if(mousespotlighto.checked == true)
{$('eastereggs').disabled = false;} // eastereggs OFF
else{$('eastereggs').disabled = true;$('eastereggs').checked = false;} // active box eastereggs

if(nighttime.checked == true)
{}
else{$('begintime').disabled = true;$('endtime').disabled = true;$('confirmtime').disabled = true;}

if(password.checked == true)
{$('enterpassword').disabled = false;$('confirmpassword').disabled = false;}
else{$('enterpassword').disabled = true;$('confirmpassword').disabled = true;}

if(ecosaver.checked == true)
{$('ecosavertime').disabled = false;$('confirmtimesaver').disabled = false;$('nighttime').disabled = false;
	if(eyen.checked == true){
	$('begintime').disabled = false;$('endtime').disabled = false;$('confirmtime').disabled = false;
	}
}
else{$('ecosavertime').disabled = true;$('confirmtimesaver').disabled = true;
	if(eyen.checked == true){
	$('nighttime').disabled = true;$('begintime').disabled = true;$('endtime').disabled = true;$('confirmtime').disabled = true;
	}
}

if(autoplayonly.checked == true)
{$('autoplayonly').checked = true;$('autoplayDomainsBox').disabled = false;$('autoplaywebsiteurl').disabled = false;$('autoplayaddbutton').disabled = false;$('autoplayremovebutton').disabled = false;$('autoplaychecklistwhite').disabled = false;$('autoplaychecklistblack').disabled = false;}
else{$('autoplayonly').checked = false;$('autoplayDomainsBox').disabled = true;$('autoplaywebsiteurl').disabled = true;$('autoplayaddbutton').disabled = true;$('autoplayremovebutton').disabled = true;$('autoplaychecklistwhite').disabled = true;$('autoplaychecklistblack').disabled = true;}

if(atmosphereonly.checked == true)
{$('atmosphereonly').checked = true;$('atmosphereDomainsBox').disabled = false;$('atmospherewebsiteurl').disabled = false;$('atmosphereaddbutton').disabled = false;$('atmosphereremovebutton').disabled = false;}
else{$('atmosphereonly').checked = false;$('atmosphereDomainsBox').disabled = true;$('atmospherewebsiteurl').disabled = true;$('atmosphereaddbutton').disabled = true;$('atmosphereremovebutton').disabled = true;}

if(nightonly.checked == true)
{$('nightonly').checked = true;$('nightDomainsBox').disabled = false;$('nightwebsiteurl').disabled = false;$('nightaddbutton').disabled = false;$('nightremovebutton').disabled = false;$('nightmodechecklistwhite').disabled = false;$('nightmodechecklistblack').disabled = false;}
else{$('nightonly').checked = false;$('nightDomainsBox').disabled = true;$('nightwebsiteurl').disabled = true;$('nightaddbutton').disabled = true;$('nightremovebutton').disabled = true;$('nightmodechecklistwhite').disabled = true;$('nightmodechecklistblack').disabled = true;}

if(autoplay.checked == true)
{$('eyen').checked = true;$('excludedDomainsBox').disabled = true;$('websiteurl').disabled = true;$('autoplaydelay').disabled = false;$('autoplaydelaytime').disabled = false;}
else {$('autoplaydelay').disabled = true;$('autoplaydelaytime').disabled = true;}

if(motion.checked == true)
{cameramotionlights();}
else{cameramotionlights();}

if(speech.checked == true)
{speechrecognition();}
else{speechrecognition();}

if(cammotiononly.checked == true)
{$('cammotiononly').checked = true;$('cammotionDomainsBox').disabled = false;$('cammotionwebsiteurl').disabled = false;$('cammotionaddbutton').disabled = false;$('cammotionremovebutton').disabled = false;}
else{$('cammotiononly').checked = false;$('cammotionDomainsBox').disabled = true;$('cammotionwebsiteurl').disabled = true;$('cammotionaddbutton').disabled = true;$('cammotionremovebutton').disabled = true;}

if(speechonly.checked == true)
{$('speechonly').checked = true;$('speechDomainsBox').disabled = false;$('speechwebsiteurl').disabled = false;$('speechaddbutton').disabled = false;$('speechremovebutton').disabled = false;}
else{$('speechonly').checked = false;$('speechDomainsBox').disabled = true;$('speechwebsiteurl').disabled = true;$('speechaddbutton').disabled = true;$('speechremovebutton').disabled = true;}

if(nightactivetime.checked == true){$('nmbegintime').disabled = false;$('nmendtime').disabled = false;$('nmconfirmtime').disabled = false;}
else{$('nmbegintime').disabled = true;$('nmendtime').disabled = true;$('nmconfirmtime').disabled = true;}

if(nighttheme.checked == true){$('lampandnightmode').disabled = false;}
else{$('lampandnightmode').disabled = true;}

if(autostoponly.checked == true){$('autostopchecklistwhite').disabled = false;$('autostopchecklistblack').disabled = false;}
else{$('autostopchecklistwhite').disabled = true;$('autostopchecklistblack').disabled = true;}
}

function dynamictest(){
var newdynmaster = $("stefanvddynamicbackground");
if(dynamic.checked == true){
if(dynamic1.checked == true){
removedynamic();
	var fishtanks = document.createElement("div");fishtanks.setAttribute('id','fishtanks');newdynmaster.appendChild(fishtanks);

	var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundbubbleleft');fishtanks.appendChild(newdynleft);
	for(var i = 0; i < 5; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynleft.appendChild(newdyn);}
	var newdynmid = document.createElement("div");newdynmid.setAttribute('class','stefanvddynamicbackgroundbubblemid');fishtanks.appendChild(newdynmid);
	for(var i = 6; i < 10; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynmid.appendChild(newdyn);}			
	var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundbubbleright');fishtanks.appendChild(newdynright);	
	for(var i = 11; i < 16; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynright.appendChild(newdyn);}					
}
else if(dynamic2.checked == true){
removedynamic();
	var blocks = document.createElement("div");blocks.setAttribute('id','blocks');newdynmaster.appendChild(blocks);

	var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');blocks.appendChild(newdynleft);
	for(var i = 1; i < 21; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundblocks stefanvddynamicblocks'+i+'');newdynleft.appendChild(newdyn);}
}
else if(dynamic3.checked == true){
removedynamic();
	var raindrops = document.createElement("div");raindrops.setAttribute('id','raindrops');newdynmaster.appendChild(raindrops);

	var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');raindrops.appendChild(newdynleft);
	for(var i = 0; i < 15; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundraindrups b'+i+'');newdynleft.appendChild(newdyn);}
}
else if(dynamic4.checked == true){
removedynamic();
	var clouds = document.createElement("div");clouds.setAttribute('id','clouds');newdynmaster.appendChild(clouds);
	var newdynworld = document.createElement("div");newdynworld.setAttribute('id','stefanvdworld');clouds.appendChild(newdynworld);			
(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelRequestAnimationFrame = window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)window.cancelAnimationFrame = function(id) {clearTimeout(id);};
	}())

	var layers = [],objects = [],world = document.getElementById('stefanvdworld'),viewport = document.getElementById('stefanvddynamicbackground'),	
	d = 0,p = 400,worldXAngle = 0,worldYAngle = 0;
	
	viewport.style.webkitPerspective = p;viewport.style.MozPerspective = p;viewport.style.oPerspective = p;
	generate();
	
	function createCloud() {
		var div = document.createElement( 'div'  );
		div.className = 'stefanvdcloudBase';
		var x = 256 - ( Math.random() * 512 );
		var y = 256 - ( Math.random() * 512 );
		var z = 256 - ( Math.random() * 512 );
		var t = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(' + z + 'px)';
		div.style.webkitTransform = t;div.style.MozTransform = t;div.style.oTransform = t;
		world.appendChild(div);
		
		for( var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++ ) {
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
	
	function generate() {
		objects = [];
		if (world.hasChildNodes()) {
			while ( world.childNodes.length >= 1 ) {world.removeChild(world.firstChild);} 
		}
		for(var j = 0; j < 5; j++) {objects.push(createCloud());}
	}
	
	function updateView(){
		var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
		world.style.webkitTransform = t;world.style.MozTransform = t;world.style.oTransform = t;}
	
	function update (){
		for( var j = 0; j < layers.length; j++ ) {
			var layer = layers[ j ];
			layer.data.a += layer.data.speed;
			var t = 'translateX(' + layer.data.x + 'px) translateY(' + layer.data.y + 'px) translateZ(' + layer.data.z + 'px) rotateY(' + ( - worldYAngle ) + 'deg) rotateX(' + ( - worldXAngle ) + 'deg) rotateZ(' + layer.data.a + 'deg) scale(' + layer.data.s + ')';
			layer.style.webkitTransform = t;layer.style.MozTransform = t;layer.style.oTransform = t;
		}
		requestAnimationFrame(update);
	}
	update();


}
else if(dynamic5.checked == true){

removedynamic();
if(hoveroptiondyn5.checked == true){
	var space = document.createElement("div");space.setAttribute('id','space');newdynmaster.appendChild(space);

	var newdynspaceworld = document.createElement("div");newdynspaceworld.setAttribute('id','stefanvddynamicspace');space.appendChild(newdynspaceworld);			
	for(var j = 1; j < 17; j++ ){
	if(j<=9){j="0"+j}
		var newdynpart1 = document.createElement("div");
		newdynpart1.setAttribute('id','p'+ j);newdynspaceworld.appendChild(newdynpart1);
		for(var i = 1; i < 31; i++ ){
		if(i<=9){i="0"+i}
		var newdynlow = document.createElement("b");newdynlow.setAttribute('class','s0'+i+'');newdynpart1.appendChild(newdynlow);
		}
	}
}else{
	var space = document.createElement("div");space.setAttribute('id','space');newdynmaster.appendChild(space);

	var newdynspaceworld = document.createElement("div");newdynspaceworld.setAttribute('id','stefanvddynamicspacenoflying');space.appendChild(newdynspaceworld);			
	for(var j = 1; j < 17; j++ ){
	if(j<=9){j="0"+j}
		var newdynpart1 = document.createElement("div");
		newdynpart1.setAttribute('id','np'+ j);newdynspaceworld.appendChild(newdynpart1);
		for(var i = 1; i < 31; i++ ){
		if(i<=9){i="0"+i}
		var newdynlow = document.createElement("b");newdynlow.setAttribute('class','ns0'+i+'');newdynpart1.appendChild(newdynlow);
		}
	}
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
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

document.addEventListener("DOMContentLoaded", function(event) {
var video = document.getElementById('motionvideo');
var canvas = document.getElementById('motioncanvas');
var canvasgetcont = canvas.getContext('2d');
var ccanvas = document.getElementById('motioncomp');
var ccgetcont = ccanvas.getContext('2d');

// document.getElementById('motionvideo').addEventListener('timeupdate', function(){ dump(); });
document.getElementById('motionvideo').addEventListener('play', function(){ intervalID = window.setInterval(dump,1000/25); });

var compression = 5;
width = height = 0;

        function dump() {
            if (localMediaStream) {
                if (canvas.width != video.videoWidth) {
                    width = Math.floor(video.videoWidth / compression);
                    height = Math.floor(video.videoHeight / compression);
                    canvas.width = ccanvas.width = width;
                    canvas.height = ccanvas.height = height;
                }
                if (width != 0) {
                    canvasgetcont.drawImage(video, width, 0, -width, height);
                    draw = canvasgetcont.getImageData(0, 0, width, height);
                    //ccgetcont.putImageData(draw,0,0);
                    skinfilter();
                    camtest();
                }
            }
        }

huemin = 0.0; huemax = 0.10; satmin = 0.0; satmax = 1.0; valmin = 0.4; valmax = 1.0;
        function skinfilter() {
            skin_filter = canvasgetcont.getImageData(0, 0, width, height)
            var total_pixels = skin_filter.width * skin_filter.height
            var index_value = total_pixels * 4

            var count_data_big_array = 0;
            for (var y = 0 ; y < height ; y++) {
                for (var x = 0 ; x < width ; x++) {
                    index_value = x + y * width
                    r = draw.data[count_data_big_array]
                    g = draw.data[count_data_big_array + 1]
                    b = draw.data[count_data_big_array + 2]
                    a = draw.data[count_data_big_array + 3]

                    hsv = rgb2Hsv(r, g, b);
                    //When the hand is too lose (hsv[0] > 0.59 && hsv[0] < 1.0)
                    //Skin Range on HSV values
                    if (((hsv[0] > huemin && hsv[0] < huemax) || (hsv[0] > 0.59 && hsv[0] < 1.0)) && (hsv[1] > satmin && hsv[1] < satmax) && (hsv[2] > valmin && hsv[2] < valmax)) {

                        skin_filter[count_data_big_array] = r
                        skin_filter[count_data_big_array + 1] = g
                        skin_filter[count_data_big_array + 2] = b
                        skin_filter[count_data_big_array + 3] = a
                    } else {

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

        function rgb2Hsv(r, g, b) {

            r = r / 255
            g = g / 255
            b = b / 255;

            var max = Math.max(r, g, b)
            var min = Math.min(r, g, b);

            var h, s, v = max;

            var d = max - min;

            s = max == 0 ? 0 : d / max;

            if (max == min) {
                h = 0; // achromatic
            } else {

                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return [h, s, v];
        }

        last = false; thresh = 150; down = false; wasdown = false;
        function camtest() {
            delt = canvasgetcont.createImageData(width, height)
            if (last !== false) {
                var totalx = 0, totaly = 0, totald = 0, totaln = delt.width * delt.height
                , dscl = 0
                , pix = totaln * 4; while (pix -= 4) {
                    var d = Math.abs(
                            draw.data[pix] - last.data[pix]
                    ) + Math.abs(
                            draw.data[pix + 1] - last.data[pix + 1]
                    ) + Math.abs(
                            draw.data[pix + 2] - last.data[pix + 2]
                    )
                    if (d > thresh) {
                        delt.data[pix] = 160
                        delt.data[pix + 1] = 255
                        delt.data[pix + 2] =
                delt.data[pix + 3] = 255
                        totald += 1
                        totalx += ((pix / 4) % width)
                        totaly += (Math.floor((pix / 4) / delt.height))
                    }
                    else {
                        delt.data[pix] =
                                delt.data[pix + 1] =
                                delt.data[pix + 2] = 0
                        delt.data[pix + 3] = 0
                    }
                }
            }
            //slide.setAttribute('style','display:initial')
            //slide.value=(totalx/totald)/width
            if (totald) {
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
        function calibrate() {
            wasdown = {
                x: down.x,
                y: down.y,
                d: down.d
            }
        }
        avg = 0;
        state = 0;//States: 0 waiting for gesture, 1 waiting for next move after gesture, 2 waiting for gesture to end
        function handledown() {
        avg = 0.9 * avg + 0.1 * down.d;
            var davg = down.d - avg, good = davg > brightthresh;
            //console.log(davg)
            switch (state) {
                case 0:
                    if (good) {//Found a gesture, waiting for next move
                        state = 1
                        calibrate()
                    }
                    break
                case 2://Wait for gesture to end
                    if (!good) {//Gesture ended
                        state = 0
                    }
                    break;
                case 1://Got next move, do something based on direction
                    var dx = down.x - wasdown.x, dy = down.y - wasdown.y
                    var dirx = Math.abs(dy) < Math.abs(dx)//(dx,dy) is on a bowtie
                    //console.log(good,davg)
                    if (dx < -movethresh && dirx) {
                        //console.log('right')
                    }
                    else if (dx > movethresh && dirx) {
                        //console.log('left')
                    }
                    if (dy > movethresh && !dirx) {
                        if (davg > overthresh) {
                            //console.log('over up');
							writeinlog("over up");
                        }
                        else{
                            //console.log('up')
							writeinlog("up");
                        }
                    }
                    else if (dy < -movethresh && !dirx) {
                        if (davg > overthresh) {
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

});

function cameramotionlights(){
if(document.getElementById('motion').checked == true){
var video = document.getElementById('motionvideo');
var canvas = document.getElementById('motioncanvas');
var canvasgetcont = canvas.getContext('2d');
var ccanvas = document.getElementById('motioncomp');
var ccgetcont = ccanvas.getContext('2d');

// reset everything
if(localMediaStream){
document.getElementById('motionvideo').pause();
document.getElementById('motionvideo').src = "";
localMediaStream.stop();
localMediaStream = null;
document.getElementById('motionvideo').load();
canvas = document.getElementById('motioncanvas');
canvasgetcont = canvas.getContext('2d');
canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
ccanvas = document.getElementById('motioncomp');
ccgetcont = ccanvas.getContext('2d');
ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
}

navigator.getUserMedia({audio:false,video:true},function(stream){
        localMediaStream = stream; // Store the video stream
        video.src = window.URL.createObjectURL(stream);
        // video.addEventListener('play', function(){ intervalID = window.setInterval(dump,1000/25); console.log("RUN A"); });
       
},function(){
//console.log('Something is wrong here! Check your camera!');
})

} else {
	// remove everything
	document.getElementById('stefanmotion').textContent = "";

	if(localMediaStream){
		if($("motionvideo")){
			document.getElementById('motionvideo').pause();
			document.getElementById('motionvideo').src = "";
		}
		localMediaStream.stop();
		localMediaStream = null;
		document.getElementById('motionvideo').load();
		canvas = document.getElementById('motioncanvas');
		canvasgetcont = canvas.getContext('2d');
		canvasgetcont.clearRect(0,0,canvas.width,canvas.height);
		ccanvas = document.getElementById('motioncomp');
		ccgetcont = ccanvas.getContext('2d');
		ccgetcont.clearRect(0,0,ccanvas.width,ccanvas.height);
		window.clearInterval(intervalID);
	}
}
}

// Speech engine sample
// Simple function that checks existence of s in str
var userSaid = function(str, s) {
	return str.indexOf(s) > -1;
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
		recognizing = false;
		// think you are ending, start it back up
			//startButton();
			//location.reload(true);
			// if(document.getElementById('speech').checked == true){
			//recognition.start();
			// }
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
		if (event.results[i].isFinal) {
			final_transcript = event.results[i][0].transcript;
			if($("stefanvdspeechsaidtext")){$("stefanvdspeechsaidtext").textContent = final_transcript;}
			//console.log(final_transcript);
				if (userSaid(final_transcript, i18nldesspeech1command)) {
				// console.log("yes: lights off");
				}
				else if (userSaid(final_transcript, i18nldesspeech2command)) {
				// console.log("yes: lights on");
				}
				// Play the video
				else if (userSaid(final_transcript, i18nldesspeech3command)) {
				}
				// Stop the video
				else if (userSaid(final_transcript, i18nldesspeech4command)) {
				}
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
	chrome.storage.local.get(['speechcountry'], function(response){
		var speechcountry = response['speechcountry'];if(!speechcountry)speechcountry = 'en-US';
		try{ recognition.lang = speechcountry; } catch(e){}
	});
	try{ recognition.start(); } catch(e){}
	ignore_onend = false;
	try{ start_timestamp = event.timeStamp; } catch(e){}
}

function speechrecognition(){
if(document.getElementById('speech').checked == true){
// show icon
$("speechicon").style.display = "";

// start automatic up
if (!recognizing) {
	startButton(event);
}
} else {
try{
	// hide icon
	$("speechicon").style.display = "none";
	if (recognizing) {recognition.stop(); recognition.abort(); recognizing = false;}
	$("stefanvdspeechsaidtext").textContent = "";
}
catch(e){}
}
}

function lookup(id, value)
{
    var ret = undefined;
    if(document.getElementById(id) != undefined)
    {
        var options = document.getElementById(id).childNodes;
        for(i = 0; i < options.length; i++)
        {
            if(options[i].value == value)
            {
                // ret = options[i];
				ret = [i];
                break;
            }
        }
    }
    return ret;
}

// Current year
function yearnow() {
var today = new Date(); var y0 = today.getFullYear();$("yearnow").innerText = y0;
}

/* Option page body action */
// Read current value settings
window.addEventListener('load', function() {
read_options();
dynamictest();
yearnow();
// Add the YouTube player
$("dont-turn-off-the-lights").src = "http://www.youtube.com/embed/?listType=playlist&list=PLF155F53B3D8D07CB";
// remove loading screen
$('loading').style.display = "none";
});

document.addEventListener('DOMContentLoaded', function () {
// Remove remember
$("skipremember").addEventListener('click', function() {$('remembershare').style.display = "none";});
$("firstcheckboxskipremember").addEventListener('click', function() {if(firstcheckboxskipremember.checked == true){$('optionskipremember').checked = true;}save_options();});
var sharetext = "I highly recommended Turn Off the Lights. Download and try it yourself! www.turnoffthelights.com ";
var stefanvdurl = "https://chrome.google.com/webstore/detail/bfbmjmiodbnnpllbbbfblcplfjjepjdn";var stefanvdaacodeurl = encodeURIComponent(stefanvdurl);
$("rememberboxgoogle").addEventListener("click", function() {window.open('https://plus.google.com/share?ur\l=' + stefanvdaacodeurl + '', 'Share to Google+','width=600,height=460,menubar=no,location=no,status=no');});
$("rememberboxfacebook").addEventListener("click", function() {window.open("https://www.facebook.com/sharer.php?u="+ stefanvdurl + "[URL]&t=" + sharetext + "", "_blank");});
$("rememberboxtwitter").addEventListener("click", function() {window.open("https://twitter.com/share?url=" + stefanvdaacodeurl + "&text=" + sharetext + " @turnoffthelight", 'Share to Twitter','width=600,height=460,menubar=no,location=no,status=no');});

$("shareboxgoogle").addEventListener("click", function() {window.open('https://plus.google.com/share?ur\l=' + stefanvdaacodeurl + '', 'Share to Google+','width=600,height=460,menubar=no,location=no,status=no');});
$("shareboxfacebook").addEventListener("click", function() {window.open("https://www.facebook.com/sharer.php?u="+ stefanvdurl + "[URL]&t=" + sharetext + "", "_blank");});
$("shareboxtwitter").addEventListener("click", function() {window.open("https://twitter.com/share?url=" + stefanvdaacodeurl + "&text=" + sharetext + "@turnoffthelight", 'Share to Twitter','width=600,height=460,menubar=no,location=no,status=no');});

// Detect click / change to save the page and test it.
var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {inputs[i].addEventListener('change', test);inputs[i].addEventListener('change', save_options);}

// Detect lightcolor change
$("lightcolor").addEventListener('change', function() {$('lightimagen').checked = true;$('example1').style.background = this.value;$('example2').style.background = this.value;save_options();});

// Detect image change
$("lightimage").addEventListener('change', function() {
function getImage(url) {
    var bkimage = new Image();
    bkimage.onload = function() {
	$('lightimagea').checked = true;
	$('example1').style.background = 'url(' + this.value + ')';
	$('example2').style.background = 'url(' + this.value + ')';
	save_options();
	};
    bkimage.onerror = function() {
	var optionwrongimg = chrome.i18n.getMessage('optionwrongimg');window.alert(optionwrongimg);
	$('lightimagea').checked = true;
	$('lightimage').value = 'http://www.turnoffthelights.com/extension/images/theater.jpg';
	$('example1').style.background = 'url(http://www.turnoffthelights.com/extension/images/theater.jpg)';
	$('example2').style.background = 'url(http://www.turnoffthelights.com/extension/images/theater.jpg)';
	save_options();	
	};
	bkimage.src = url;
}
getImage(this.value);
});

// Close yellow bar
$("managed-prefs-text-close").addEventListener('click', function() {$("managed-prefs-banner").style.display = "none";});

// Slider
$("slider").addEventListener('change', function() {showValue(this.value);save_options();});

// Interval
$("interval").addEventListener('change', function() {showValue(this.value);save_options();});

// Light switch
$("onoffrange").addEventListener('change', function() {lightscontrol();});

// Arangeblur
$("arangeblur").addEventListener('change', function() {showambilightblurValue(this.value);save_options();});
$("ambilightrangeblurradius").addEventListener('change', function() {showambilightblurValue(this.value);save_options();});

// Arangespread
$("arangespread").addEventListener('change', function() {showambilightspreadValue(this.value);save_options();});
$("ambilightrangespreadradius").addEventListener('change', function() {showambilightspreadValue(this.value);save_options();});

// Add website
$("addbutton").addEventListener('click', function() {addWhitelistDomain();});

// Remove website
$("removebutton").addEventListener('click', function() {removeSelectedExcludedDomain();});

// Save time
$("confirmtime").addEventListener('click', function() {save_options();var optiontimetemp = chrome.i18n.getMessage('optiontimesaved');window.alert(optiontimetemp);});

// Save password
$("confirmpassword").addEventListener('click', function() {save_options();var optionpastemp = chrome.i18n.getMessage('optionpasswordsaved');window.alert(optionpastemp);});

// Save time
$("nmconfirmtime").addEventListener('click', function() {save_options();var optiontimetemp = chrome.i18n.getMessage('optiontimesaved');window.alert(optiontimetemp);});

// Save KB download
$("tabbasic").addEventListener('click', function() {OFFworkaroundbugfromsafari();$('welcomeguide').src = "";$('welcomeshare').src = "";$("managed-prefs-banner").style.display = "";});
$("tabvisual").addEventListener('click', function() {ONworkaroundbugfromsafari();$('welcomeguide').src = "";$('welcomeshare').src = "";$("managed-prefs-banner").style.display = "";});
$("tabadvan").addEventListener('click', function() {ONworkaroundbugfromsafari();$('welcomeguide').src = "";$('welcomeshare').src = "";$("managed-prefs-banner").style.display = "";});
$("tabnight").addEventListener('click', function() {ONworkaroundbugfromsafari();$('welcomeguide').src = "";$('welcomeshare').src = "";$("managed-prefs-banner").style.display = "";});
$("tabmotion").addEventListener('click', function() {ONworkaroundbugfromsafari();$('welcomeguide').src = "";$('welcomeshare').src = "";$("managed-prefs-banner").style.display = "";});
$("tabspeech").addEventListener('click', function() {ONworkaroundbugfromsafari();$('welcomeguide').src = "";$('welcomeshare').src = "";$("managed-prefs-banner").style.display = "";});
$("tabguide").addEventListener('click', function() {ONworkaroundbugfromsafari();$('welcomeguide').src = "http://www.turnoffthelights.com/extension/chromeguide.html";$('welcomeshare').src = "";$("managed-prefs-banner").style.display = "none";});
$("tabshare").addEventListener('click', function() {ONworkaroundbugfromsafari();$('welcomeguide').src = "";$('welcomeshare').src = "http://www.turnoffthelights.com/extension/fan.html";$("managed-prefs-banner").style.display = "none";});

$("buttonreportissue").addEventListener('click', function() {window.open("http://www.turnoffthelights.com/support");});
$("buttonchangelog").addEventListener('click', function() {window.open("http://www.turnoffthelights.com/extension/chromechangelog.html");});
$("buttonreportlist").addEventListener('click', function() {window.open("http://www.turnoffthelights.com/extension/issueslist.html");});
$("buttontranslateme").addEventListener('click', function() {window.open("http://www.turnoffthelights.com/extension/translate.html");});

function ONworkaroundbugfromsafari(){$("dont-turn-off-the-lights").src = "";}
function OFFworkaroundbugfromsafari(){$("dont-turn-off-the-lights").src = "https://www.youtube.com/embed/?listType=playlist&list=PLF155F53B3D8D07CB";}

// Download Upgrade
$("fndownload").addEventListener('click', function() {window.open("https://chrome.google.com/webstore/detail/finance-toolbar/cichbngoomgnobmmjpagmbkimbamigie");});
$("ppdownload").addEventListener('click', function() {window.open("https://chrome.google.com/webstore/detail/proper-menubar/egclcjdpndeoioimlbbbmdhcaopnedkp");});
$("zodownload").addEventListener('click', function() {window.open("https://chrome.google.com/webstore/detail/zoom/lajondecmobodlejlcjllhojikagldgd");});
$("aadownload").addEventListener('click', function() {window.open("https://chrome.google.com/webstore/detail/pkaglmndhfgdaiaccjglghcbnfinfffa");});

$("themedownload").addEventListener('click', function() {window.open("https://chrome.google.com/webstore/detail/fpddgembdeaikopmbfiokjolihbamcca");});

// Save password
$("confirmtimesaver").addEventListener('click', function() {save_options();var optionpastemp = chrome.i18n.getMessage('optionecosaversaved');window.alert(optionpastemp);});

// Check screenshot
$("wallpaperhide").addEventListener('click', function() {$("imagegallery").style.display = "";$("wallpapershow").style.display = "";$("wallpaperhide").style.display = "none";});
$("wallpapershow").addEventListener('click', function() {$("imagegallery").style.display = "none";$("wallpapershow").style.display = "none";$("wallpaperhide").style.display = "";});
$("totlswallpaper5").addEventListener('click', function() {$("lightimage").value = "http://www.turnoffthelights.com/extension/images/totls5.jpg";test();save_options();});
$("totlswallpaper4").addEventListener('click', function() {$("lightimage").value = "http://www.turnoffthelights.com/extension/images/totls4.jpg";test();save_options();});
$("totlswallpaper3").addEventListener('click', function() {$("lightimage").value = "http://www.turnoffthelights.com/extension/images/totls3.jpg";test();save_options();});
$("totlswallpaper2").addEventListener('click', function() {$("lightimage").value = "http://www.turnoffthelights.com/extension/images/totls2.jpg";test();save_options();});
$("totlswallpaper1").addEventListener('click', function() {$("lightimage").value = "http://www.turnoffthelights.com/extension/images/theater.jpg";test();save_options();});

// dynamic test
$("dynamic").addEventListener('click', function() {if(dynamic.checked == true){dynamictest();$('lightdynamic').disabled = false;}else{removedynamic();$('lightdynamic').disabled = true;}});

// Check dynamic
$("dynamichide").addEventListener('click', function() {$("dynamicgallery").style.display = "";$("dynamicshow").style.display = "";$("dynamichide").style.display = "none";});
$("dynamicshow").addEventListener('click', function() {$("dynamicgallery").style.display = "none";$("dynamicshow").style.display = "none";$("dynamichide").style.display = "";});
$("totldynpaper5").addEventListener('click', function() {$("lightdynamic").value = chrome.i18n.getMessage('desdynamicspace');$('dynamic5').checked = true;dynamictest();save_options();});
$("totldynpaper4").addEventListener('click', function() {$("lightdynamic").value = chrome.i18n.getMessage('desdynamiccloud');$('dynamic4').checked = true;dynamictest();save_options();});
$("totldynpaper3").addEventListener('click', function() {$("lightdynamic").value = chrome.i18n.getMessage('desdynamicraindrops');$('dynamic3').checked = true;dynamictest();save_options();});
$("totldynpaper2").addEventListener('click', function() {$("lightdynamic").value = chrome.i18n.getMessage('desdynamicblocks');$('dynamic2').checked = true;dynamictest();save_options();});
$("totldynpaper1").addEventListener('click', function() {$("lightdynamic").value = chrome.i18n.getMessage('desdynamicfishtank');$('dynamic1').checked = true;dynamictest();save_options();});
$("hoveroptiondyn5").addEventListener('click', function() {$('dynamic5').checked = true;dynamictest();save_options();});

// autoplay Add website
$("autoplayaddbutton").addEventListener('click', function() {autoplayaddWhitelistDomain();});

// autoplay Remove website
$("autoplayremovebutton").addEventListener('click', function() {autoplayremoveSelectedExcludedDomain();});

// YouTube quality
$("youtubequality").addEventListener('click', function() {save_options();});

// atmosphere Add website
$("atmosphereaddbutton").addEventListener('click', function() {atmosphereaddWhitelistDomain();});

// atmosphere Remove website
$("atmosphereremovebutton").addEventListener('click', function() {atmosphereremoveSelectedExcludedDomain();});

// night Add website
$("nightaddbutton").addEventListener('click', function() {nightaddWhitelistDomain();});

// night Remove website
$("nightremovebutton").addEventListener('click', function() {nightremoveSelectedExcludedDomain();});

// cam motion Add website
$("cammotionaddbutton").addEventListener('click', function() {cammotionaddWhitelistDomain();});

// cam motion Remove website
$("cammotionremovebutton").addEventListener('click', function() {cammotionremoveSelectedExcludedDomain();});

// speech Add website
$("speechaddbutton").addEventListener('click', function() {speechaddWhitelistDomain();});

// speech Remove website
$("speechremovebutton").addEventListener('click', function() {speechremoveSelectedExcludedDomain();});

// autostop Add website
$("autostopaddbutton").addEventListener('click', function() {autostopaddWhitelistDomain();});

// autostop Remove website
$("autostopremovebutton").addEventListener('click', function() {autostopremoveSelectedExcludedDomain();});

// Reset settings
$("resettotl").addEventListener('click', function() {chrome.storage.local.clear();location.reload();});

// linearsq
$("linearsq").addEventListener('click', function() {test();save_options();});

// Review box
$("war").addEventListener('click', function() {window.open("https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn/reviews", "_blank");$("sectionreviewbox").style.display = "none";chrome.storage.local.set({"reviewedlastonversion": chrome.runtime.getManifest().version});});
$("nt").addEventListener('click', function() {$("sectionreviewbox").style.display = "none";chrome.storage.local.set({"reviewedlastonversion": chrome.runtime.getManifest().version});});

// Aurora Player app box
$("apgetapp").addEventListener('click', function() {window.open("http://www.stefanvd.net/project/auroraplayer.htm", "_blank");$("sectionauroraplayerappbox").style.display = "none";chrome.storage.local.set({"applastonversion": chrome.runtime.getManifest().version});});
$("apnt").addEventListener('click', function() {$("sectionauroraplayerappbox").style.display = "none";chrome.storage.local.set({"applastonversion": chrome.runtime.getManifest().version});});

// retina check
if(window.devicePixelRatio >= 2) {
$("loadinglamp").src = "icons/icon16@2x.png";$("loadinglamp").style.width = "16px"; $("loadinglamp").style.height = "16px";
$("welcomelamp").src = "icons/icon16@2x.png";$("welcomelamp").style.width = "16px"; $("welcomelamp").style.height = "16px";
$("rememberlamp").src = "icons/icon16@2x.png";$("rememberlamp").style.width = "16px"; $("rememberlamp").style.height = "16px";
$("auroraplayericon").src = "images/aurora-player_32x32@2x.png";
}

// browser check
var browservendor = window.navigator.vendor
if (browservendor.search("Opera") >= 0) {
	// feature check speech and camera
	$("helpcameramotion").style.display = "";
	$("helpspeech").style.display = "";
	$("speech").disabled = true;
	$("select_language").disabled = true;
	$("select_dialect").disabled = true;
	$("speechonly").disabled = true;
	$("motion").disabled = true;
	$("cammotiononly").disabled = true;
} else if (browservendor.search("Google") >= 0) {
	// feature check speech and camera
	$("helpcameramotion").style.display = "none";
	$("helpspeech").style.display = "none";
} else {
	// feature check speech and camera
	$("helpcameramotion").style.display = "none";
	$("helpspeech").style.display = "none";
}

});