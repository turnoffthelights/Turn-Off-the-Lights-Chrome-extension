//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the videos as if you were in the cinema.
Copyright (C) 2016 Stefan vd
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
chrome.storage.local.get(['fadein','fadeout','readera','dynamic'], function(response){
fadein = response['fadein'];
fadeout = response['fadeout'];
readera = response['readera'];
dynamic = response['dynamic'];

	// Black div on
	var blackon = $('stefanvdlightareoff1');

	function reader() {
		// save the current reader bar settings, before remove it
		if(readera == 'true'){
		var readerontext;
		var readeronrange;
		var readerlargestyle;
		var readerlargeimgclick;
		var readerlargetitleclick;

		readerontext = $('totlgammaVal');
		readeronrange = $('totlrange');
		if (readerontext != null && readeronrange != null) {
			chrome.storage.local.set({"interval": readerontext.value});
		}
	
		readerlargestyle = $('__totl-tidbit-box');
		readerlargeimgclick = $('__totl-min');
		readerlargetitleclick = $('__totl-box-info');
		if (readerlargestyle != null && readerlargeimgclick != null && readerlargetitleclick != null) {
			if(readerlargestyle.style.width == '24px'){chrome.storage.local.set({"readerlargestyle": "false"});}
			else{chrome.storage.local.set({"readerlargestyle": "true"});}
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
        // YouTube video suggestions (set back to default)
        var watch7sidebar = $('watch7-sidebar');
        if(watch7sidebar){$('watch7-sidebar').style.zIndex = 'auto';}

        // YouTube playlist (set back to default)
        var watchappbarplaylist = $('watch-appbar-playlist');
        if(watchappbarplaylist){$('watch-appbar-playlist').style.zIndex = '3';}

		// YouTube video title (set back to default)
		var eowtitle = $('eow-title');
		if(eowtitle){$('eow-title').style.color = '#222';$('eow-title').style.zIndex = 'auto';$('eow-title').style.position = 'relative';}
		
        // YouTube video channel link back black (set back to default)
        var watch7userheader = $('watch7-user-header');
        if(watch7userheader){$('watch7-user-header').style.zIndex = 'auto';$('watch7-user-header').style.position = 'relative';}

        var ytuserinfoa = document.querySelector('.yt-user-info a');
        ytuserinfoa.style.color = '#333';
        
        // YouTube infobar (set back to default)
        var watchdescription = $('watch-description');
        if(watchdescription){$('watch-description').style.zIndex = 'auto';$('watch-description').style.background = 'transparent';}
        
        // YouTube infobar (set back to default)
        var likebuttonrenderlike = document.querySelector('.like-button-renderer-like-button');
        likebuttonrenderlike.style.zIndex = 'auto';likebuttonrenderlike.style.position = 'relative';likebuttonrenderlike.style.background = 'transparent';

        var likebuttonrenderdislike = document.querySelector('.like-button-renderer-dislike-button');
        likebuttonrenderdislike.style.zIndex = 'auto';likebuttonrenderdislike.style.position = 'relative';likebuttonrenderdislike.style.background = 'transparent';

        // YouTube share buttons (set back to default)
        var actionsharepanel = document.querySelector('.action-panel-trigger-share');
        actionsharepanel.style.zIndex = 'auto';actionsharepanel.style.position = 'relative';actionsharepanel.style.background = 'transparent';

        // YouTube video view count (set back to default)
        var watchviewcount = document.querySelector('.watch-view-count');
        watchviewcount.style.zIndex = 'auto';watchviewcount.style.color = '#333';
        
        // YouTube video view count (set back to default)
        var addtobutton = document.querySelector('.addto-button');
        addtobutton.style.zIndex = 'auto';addtobutton.style.position = 'relative';addtobutton.style.background = 'transparent';
 
        // YouTube like bar (set back to default)
        var videoextrasparkbars = document.querySelector('.video-extras-sparkbars');
        videoextrasparkbars.style.zIndex = 'auto';videoextrasparkbars.style.position = 'relative';
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
		
		var stefanvdblurimage = $('stefanvdblurimage');
		if(stefanvdblurimage) {document.body.removeChild(stefanvdblurimage);}

		var stefanvdlightcorner = $('stefanvdlightcorner');
		if(stefanvdlightcorner) {document.body.removeChild(stefanvdlightcorner);}
	}
	
	function removenewdynamic() {
		var stefanvddynamicbackground = $('stefanvddynamicbackground');
		if(stefanvddynamicbackground) {document.body.removeChild(stefanvddynamicbackground);}
	}
	
	if(blackon) {
		if(dynamic == 'true'){
			removenewdynamic();
		}
		if(fadeout == 'true'){ReducingFinished = false;fader('hide');reader();} 
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