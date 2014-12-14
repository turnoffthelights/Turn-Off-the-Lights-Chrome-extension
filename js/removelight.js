//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2014 Stefan vd
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
var div = null, fadein = null, fadeout = null;

/////////// Option page settings
chrome.extension.sendMessage({comando:'totlrequest'}, function(response){
fadein = response.fadein;
fadeout = response.fadeout;
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

		function saveSetting(name, value) {chrome.extension.sendMessage({'name' : name, 'value' : value});}
		function textChanged() {saveSetting('readersaveme', readerontext.value);}
		function savereaderstyle(){
			if(readerlargestyle.style.width == '24px'){chrome.extension.sendMessage({'name' : 'readerlargestyle', 'value' : "false"});}
			else{chrome.extension.sendMessage({'name' : 'readerlargestyle', 'value' : "true"});}
		}

		readerontext = $('totlgammaVal');
		readeronrange = $('totlrange');
		if (readerontext != null && readeronrange != null) {
			textChanged();
		}
	
		readerlargestyle = $('__totl-tidbit-box');
		readerlargeimgclick = $('__totl-min');
		readerlargetitleclick = $('__totl-box-info');
		if (readerlargestyle != null && readerlargeimgclick != null && readerlargetitleclick != null) {
			savereaderstyle();
		}	
		}
	
		var totlreaderbar = $('totlreaderbar');
		if(totlreaderbar) {document.body.removeChild(totlreaderbar);}
		
		var totlcloud = $('stefanvdlightcloud');
		if(totlcloud) {document.body.removeChild(totlcloud);}
		
		// remove help div
		var stefanvdlightareoffcustom = $('stefanvdlightareoffcustom');
		if(stefanvdlightareoffcustom) {
		document.body.removeChild(stefanvdlightareoffcustom);
		document.body.style.cursor = "default";
		}
		window.onmousemove = null;
		
		// YouTube video title (set back to default)
		var eowtitle = $('eow-title');
		if(eowtitle){$('eow-title').style.color = '#333';$('eow-title').style.zIndex = 'auto';$('eow-title').style.position = 'relative';}
		
		var watchheadlinetitle = $('watch-headline-title');  // new youtube watch7
		if(watchheadlinetitle){$('watch-headline-title').style.zIndex = 'auto';$('watch-headline-title').style.position = 'relative';}
		
		span = document.getElementsByTagName('span');  // new youtube watch7
		for(var i = 0; i < span.length; i++ ) 
		{if(span[i].className == (' yt-uix-expander-head') ) {span[i].style.color = 'black';}}	
		// YouTube video view count (set back to default)
		var eowtitle = $('eow-title');
		if(eowtitle){$('eow-title').style.color = '#333';$('eow-title').style.zIndex = 'auto';$('eow-title').style.position = 'relative';}
		span = document.getElementsByTagName('span'); 
		for(var i = 0; i < span.length; i++ )
		{if(span[i].className == ('watch-view-count')) {span[i].style.color = '#333';span[i].style.zIndex = 'auto';span[i].style.position = 'relative';}}
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
    {document.body.removeChild(DIVElementById);removenewframe();
	document.location.reload(true); // reload current web page
	}
  }
//control opacity for all <div>
var div = document.querySelectorAll('div.stefanvdlightareoff');
for(var i = 0; i < div.length; i++ ){div[i].style.opacity = opacity/100;}
} catch(e){}
}