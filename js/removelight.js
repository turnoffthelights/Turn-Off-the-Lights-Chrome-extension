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

function $(id) { return document.getElementById(id); }
var div = null, fadein = null, fadeout = null, readera = null, dynamic = null;

/////////// Option page settings
chrome.storage.sync.get(['fadein','fadeout','readera','dynamic'], function(response){
fadein = response['fadein'];
fadeout = response['fadeout'];
readera = response['readera'];
dynamic = response['dynamic'];

	// Black div on
	var blackon = $('stefanvdlightareoff1');

	function reader() {
		// save the current reader bar settings, before remove it
		if(readera == true){
		var readerontext;
		var readeronrange;
		var readerlargestyle;
		var readerlargeimgclick;
		var readerlargetitleclick;

		readerontext = $('totlgammaVal');
		readeronrange = $('totlrange');
		if (readerontext != null && readeronrange != null) {
			chrome.storage.sync.set({"interval": readerontext.value});
		}
	
		readerlargestyle = $('__totl-tidbit-box');
		readerlargeimgclick = $('__totl-min');
		readerlargetitleclick = $('__totl-box-info');
		if (readerlargestyle != null && readerlargeimgclick != null && readerlargetitleclick != null) {
			if(readerlargestyle.style.width == '24px'){chrome.storage.sync.set({"readerlargestyle": false});}
			else{chrome.storage.sync.set({"readerlargestyle": true});}
		}	
		}
	
		var totlreaderbar = $('totlreaderbar');
		if(totlreaderbar) {document.body.removeChild(totlreaderbar);}
		
		// remove help div
		var stefanvdlightareoffcustom = $('stefanvdlightareoffcustom');
		if(stefanvdlightareoffcustom) {
		document.body.removeChild(stefanvdlightareoffcustom);
		document.body.style.cursor = "default";
		}
		window.onmousemove = null;
		
        // Set everything back to the default YouTube theme
        if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
            // update YouTube material 21 march 2017
            var ytmaterialinfo = document.querySelector("ytd-video-secondary-info-renderer");
            if(ytmaterialinfo){ytmaterialinfo.style.background = "";}

            // update YouTube material 21 march 2017
            var ytmateriallikebutton = document.querySelectorAll('ytd-toggle-button-renderer');
            for(var i = 0; i < ytmateriallikebutton.length; i++ ){
            var ytgetobject = ytmateriallikebutton[i].querySelector("paper-icon-button");
            if(ytgetobject != null){var ytgetstring = ytgetobject.getAttribute("aria-label");
            if(ytgetstring != null){
            if(ytgetstring.substring(0, 7) == "dislike"){ytmateriallikebutton[i].style.background = "";}
            else if(ytgetstring.substring(0, 4) == "like"){ytmateriallikebutton[i].style.background = "";}
            }}}

            // update YouTube material 21 march 2017
            var ytmaterialsharebutton = document.querySelectorAll('ytd-button-renderer');
            for(var i = 0; i < ytmaterialsharebutton.length; i++ ){
            var ytgetobject = ytmaterialsharebutton[i].querySelector("paper-icon-button");
            if(ytgetobject != null){var ytgetstring = ytgetobject.getAttribute("aria-label");
            if(ytgetstring != null){
            if(ytgetstring.substring(0, 5) == "Share"){ytmaterialsharebutton[i].style.background = "";}
            }}}
		
            // update YouTube material 21 march 2017
            var ytmaterialsharebutton = document.querySelectorAll('ytd-button-renderer');
            for(var i = 0; i < ytmaterialsharebutton.length; i++ ){
            var ytgetobject = ytmaterialsharebutton[i].querySelector("paper-icon-button");
            if(ytgetobject != null){var ytgetstring = ytgetobject.getAttribute("aria-label");
            if(ytgetstring != null){
            if(ytgetstring.substring(0, 6) == "Add to"){ytmaterialsharebutton[i].style.background = "";}
            }}}
          
            // update YouTube material 21 march 2017
            var ytmaterialhead = document.querySelector("ytd-video-owner-renderer");
            if(ytmaterialhead){ytmaterialhead.style.background = "";}

            // update YouTube material 21 march 2017
            var ytmaterialsuggestions = document.querySelector("ytd-watch-next-secondary-results-renderer");
            if(ytmaterialsuggestions){ytmaterialsuggestions.style.background = "";}

            // update YouTube material 21 march 2017
            var ytmaterialvideotitle = document.querySelector("ytd-video-primary-info-renderer");
            if(ytmaterialvideotitle){
            var ytgeth = ytmaterialvideotitle.querySelector("h1");
            if(ytgeth != null){ytgeth.style.color = "";}
            }

            // update YouTube material 21 march 2017
            var ytmaterialviewcount = document.querySelector("yt-view-count-renderer");
            if(ytmaterialviewcount){ytmaterialviewcount.style.color = '';}

            // update YouTube material 21 march 2017
            var ytmaterialviewcount = document.querySelector("yt-view-count-renderer");
            if(ytmaterialviewcount){
            var ytgetformat = ytmaterialviewcount.querySelector("yt-formatted-string");
            if(ytgetformat != null){ytgetformat.style.color = '';}
            }
            
            // old YouTube -----
            // YouTube video suggestions (set back to default)
            var watch7sidebar = $('watch7-sidebar');
            if(watch7sidebar){watch7sidebar.style.zIndex = 'auto';}

            // YouTube playlist (set back to default)
            var watchappbarplaylist = $('watch-appbar-playlist');
            if(watchappbarplaylist){watchappbarplaylist.style.zIndex = '3';}

            // YouTube video title (set back to default)
            var eowtitle = $('eow-title');
            if(eowtitle){eowtitle.style.color = '#222';eowtitle.style.zIndex = 'auto';eowtitle.style.position = 'relative';}
		
            // YouTube video channel link back black (set back to default)
            var watch7userheader = $('watch7-user-header');
            if(watch7userheader){watch7userheader.style.zIndex = 'auto';watch7userheader.style.position = 'relative';}

            var ytuserinfoa = document.querySelector('.yt-user-info a');
            if(ytuserinfoa){ytuserinfoa.style.color = '#333';}
            
            // YouTube infobar (set back to default)
            var watchdescription = $('watch-description');
            if(watchdescription){watchdescription.style.zIndex = 'auto';watchdescription.style.background = 'transparent';}
            
            // YouTube infobar (set back to default)
            var likebuttonrenderlike = document.querySelector('.like-button-renderer-like-button');
            if(likebuttonrenderlike){likebuttonrenderlike.style.zIndex = 'auto';likebuttonrenderlike.style.position = 'relative';likebuttonrenderlike.style.background = 'transparent';}

            var likebuttonrenderdislike = document.querySelector('.like-button-renderer-dislike-button');
            if(likebuttonrenderdislike){likebuttonrenderdislike.style.zIndex = 'auto';likebuttonrenderdislike.style.position = 'relative';likebuttonrenderdislike.style.background = 'transparent';}

            // YouTube share buttons (set back to default)
            var actionsharepanel = document.querySelector('.action-panel-trigger-share');
            if(actionsharepanel){actionsharepanel.style.zIndex = 'auto';actionsharepanel.style.position = 'relative';actionsharepanel.style.background = 'transparent';}

            // YouTube video view count (set back to default)
            var watchviewcount = document.querySelector('.watch-view-count');
            if(watchviewcount){watchviewcount.style.zIndex = 'auto';watchviewcount.style.color = '#333';}
            
            // YouTube video view count (set back to default)
            var addtobutton = document.querySelector('.addto-button');
            if(addtobutton){addtobutton.style.zIndex = 'auto';addtobutton.style.position = 'relative';addtobutton.style.background = 'transparent';}
    
            // YouTube like bar (set back to default)
            var videoextrasparkbars = document.querySelector('.video-extras-sparkbars');
            if(videoextrasparkbars){videoextrasparkbars.style.zIndex = 'auto';videoextrasparkbars.style.position = 'relative';}
       }
	}
	
	function removenewframe() {
		var stefanvdlightareoff1 = $('stefanvdlightareoff1');
		var stefanvdlightareoff2 = $('stefanvdlightareoff2');
		var stefanvdlightareoff3 = $('stefanvdlightareoff3');
		var stefanvdlightareoff4 = $('stefanvdlightareoff4');
		if(stefanvdlightareoff1) {document.body.removeChild(stefanvdlightareoff1);}
		if(stefanvdlightareoff2) {document.body.removeChild(stefanvdlightareoff2);}
		if(stefanvdlightareoff3) {document.body.removeChild(stefanvdlightareoff3);}
		if(stefanvdlightareoff4) {document.body.removeChild(stefanvdlightareoff4);}
		
		var stefanvdeastereggs = $('stefanvdtheater');
		if(stefanvdeastereggs) {document.body.removeChild(stefanvdeastereggs);}

		var stefanvdblurimage = $('stefanvdblurimage');
		if(stefanvdblurimage) {document.body.removeChild(stefanvdblurimage);}

		var stefanvdlightcorner = $('stefanvdlightcorner');
		if(stefanvdlightcorner) {document.body.removeChild(stefanvdlightcorner);}

		// remove video player on top
		var div = document.querySelectorAll('.stefanvdvideotop');
		for (var i = 0; i < div.length; i++) { div[i].classList.remove("stefanvdvideotop"); }
		var div = document.querySelectorAll('.stefanvditemtop');
		for (var i = 0; i < div.length; i++) { div[i].classList.remove("stefanvditemtop"); }
		var div = document.querySelectorAll('.stefanvdvideoauto');
		for (var i = 0; i < div.length; i++) { div[i].classList.remove("stefanvdvideoauto"); }
		var div = document.querySelectorAll('.stefanvdotherdown');
		for (var i = 0; i < div.length; i++) { div[i].classList.remove("stefanvdotherdown"); }
		var div = document.querySelectorAll('.stefanvdcontainauto');
		for (var i = 0; i < div.length; i++) { div[i].classList.remove("stefanvdcontainauto"); }
		var div = document.querySelectorAll('.stefanvdvideocontrolsitem');
		for (var i = 0; i < div.length; i++) { div[i].classList.remove("stefanvdvideocontrolsitem"); }
		var div = document.querySelectorAll('.stefanvdvideocontrolstop');
		for (var i = 0; i < div.length; i++) { div[i].classList.remove("stefanvdvideocontrolstop"); }
	
		// inside the root
		var q = document.getElementsByTagName('*');
		for(var i = 0; i < q.length; i++ ) {
			if(q[i].shadowRoot){
				if(q[i].shadowRoot.querySelector('#rootstefan')){q[i].shadowRoot.removeChild(q[i].shadowRoot.querySelector('#rootstefan'));}

				var rootdiv = q[i].shadowRoot.querySelectorAll('.stefanvdotherdown');
				for(var k = 0; k < rootdiv.length; k++){rootdiv[k].classList.remove("stefanvdotherdown");}
			}
		}
	}
	
	function removenewdynamic() {
		var stefanvddynamicbackground = $('stefanvddynamicbackground');
		if(stefanvddynamicbackground) {document.body.removeChild(stefanvddynamicbackground);}
	}
	
	if(blackon) {
		if(dynamic == true){
			removenewdynamic();
		}
		if(fadeout == true){ReducingFinished = false;fader('hide');reader();} 
		else {removenewframe();reader();}
	}
});


///////////

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

// Fade engine
//  Variable for the fade in and out effect
var opacity = 0;

var ReducingFinished = true;
var OpacityLevelIncrement = 10;   //  Percentage value: 1-100

//  Function determines whether we show or hide the item referenced by ElementID
function fader(ActionToTake)
{
  DIVElementById = $('stefanvdlightareoff1');
  if (ActionToTake == 'hide')
  { opacity = default_opacity; reduceOpacity(); }
  else if (ActionToTake == 'show')
  { increaseOpacity(); }
}

//  Makes div increase
function increaseOpacity()
{
try {
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
//control opacity for all <div>
var div = document.querySelectorAll('div.stefanvdlightareoff');
for(var i = 0; i < div.length; i++ ){div[i].style.opacity = opacity/100;}
} catch(e){}
}

//  Makes div reduce
function reduceOpacity() 
{
try {
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
    {document.body.removeChild(DIVElementById);removenewframe();}
  }
//control opacity for all <div>
var div = document.querySelectorAll('div.stefanvdlightareoff');
for(var i = 0; i < div.length; i++ ){div[i].style.opacity = opacity/100;}
} catch(e){}
}