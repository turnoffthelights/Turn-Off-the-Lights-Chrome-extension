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
// settings
var default_opacity = null, suggestions = null, playlist = null, videoheadline = null, flash = null, head = null, infobar = null, likebutton = null, sharebutton = null, viewcount = null, addvideobutton = null, likebar = null, mousespotlighto = null, mousespotlightc = null, mousespotlighta = null, lightcolor = null, lightimagea = null, lightimage = null, interval = null, fadein = null, fadeout = null, readera = null, readerlargestyle = null, mousespotlightt = null, password = null, enterpassword = null, noflash = null, hardflash = null, dynamic = null, dynamic1 = null, dynamic2 = null, dynamic3 = null, dynamic4 = null, dynamic5 = null, dynamic6 = null, dynamic7 = null, dynamic8 = null, dynamic9 = null, dynamic10 = null, hoveroptiondyn5 = null, blur = null, cinemaontop = null, slideeffect = null, lightimagelin = null, linearsq = null, colora = null, intervallina = null, colorb = null, intervallinb = null, no360youtube = null;
// html elements used
var div = null, video = null, span = null, iframe = null, embed = null, object = null, a = null, img = null;

/////////// Option page settings
chrome.storage.local.get(['suggestions', 'playlist', 'videoheadline', 'head', 'infobar', 'likebutton', 'sharebutton', 'viewcount', 'addvideobutton', 'likebar', 'flash', 'noflash', 'hardflash','no360youtube'], function(response){
suggestions = response['suggestions'];
playlist = response['playlist'];
videoheadline = response['videoheadline'];
head = response['head'];
infobar = response['infobar'];
likebutton = response['likebutton'];
sharebutton = response['sharebutton'];
viewcount = response['viewcount'];
addvideobutton = response['addvideobutton'];
likebar = response['likebar'];
flash = response['flash'];
noflash = response['noflash'];
hardflash = response['hardflash'];
no360youtube = response['no360youtube'];

// Show all Flash objects -> Flash detection
function flashobjects(){
try{
var d=window.document,j,i,t,T,N,b,r=1,C;
for(j=0;t=['object','embed','applet','iframe'][j];++j)
{
T=d.getElementsByTagName(t);
for(i=T.length-1;(i+1)&&(N=T[i]);--i)
if(j!=3||!R((C=N.contentWindow)?C:N.contentDocument.defaultView))
{
N.style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
}
}
}catch(E){r = 0}
return r
}

if(flash == 'true'){
intelligentvideodetection();

flashobjects();
} else if(hardflash == 'true'){
intelligentvideodetection();

for(j=0;t=['object','embed','applet','iframe'][j];++j)
{
var a = document.querySelectorAll(t);
for(var i = 0; i < a.length; i++ )
{
a[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
}
}
}

// detect if not higher then z-index 1000, then make it push down
// search for the z-index, if found something give it 'auto'
// var q = document.getElementsByTagName('*');
// for(var i = 0; i < q.length; i++ ) {
// if (q[i].currentStyle){var y = q[i].currentStyle["z-Index"];}
// else if (window.getComputedStyle){var y = document.defaultView.getComputedStyle(q[i],null).getPropertyValue("z-Index");}
// if (y >= 1000){q[i].style.zIndex = 'auto';}
// }

// detect if no -webkit-transform:translateZ(0) used, if so
// remove this and place the 'none' value
var w = document.getElementsByTagName('*');
for(var i = 0; i < w.length; i++ ) {
if (w[i].currentStyle){var t = w[i].currentStyle["-webkit-transform"] ||
         w[i].currentStyle["-moz-transform"] ||
         w[i].currentStyle["-ms-transform"] ||
         w[i].currentStyle["-o-transform"] ||
         w[i].currentStyle["transform"]
}
else if (window.getComputedStyle){
var st = document.defaultView.getComputedStyle(w[i], null);
var t = st.getPropertyValue("-webkit-transform") ||
         st.getPropertyValue("-moz-transform") ||
         st.getPropertyValue("-ms-transform") ||
         st.getPropertyValue("-o-transform") ||
         st.getPropertyValue("transform")
}
if (t == "matrix(1, 0, 0, 1, 0, 0)"){ w[i].style.webkitTransform = 'none'; w[i].style.MozTransform = 'none'; w[i].style.msTransform = 'none'; w[i].style.OTransform = 'none'; w[i].style.transform = 'none';}
}

// YouTube Gaming
if (window.location.href.match(/((http:\/\/(gaming.youtube\.com\/.*))|(https:\/\/(gaming.youtube\.com\/.*)))/i)){
var ytgpersistentplayer = document.getElementsByTagName('ytg-persistent-player');
    for(var i = 0; i < ytgpersistentplayer.length; i++ ){
        if(ytgpersistentplayer[i].getAttribute('id') == "player"){
            ytgpersistentplayer[i].style.zIndex = "1001!important";
        }
    }
}

// YouTube options
if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
// Show the debug mode of YouTube
var youtubedebuginfopanel = document.querySelectorAll('div.html5-video-info-panel');
for(var i = 0; i < youtubedebuginfopanel.length; i++ ){youtubedebuginfopanel[i].style.zIndex = "1001";}
var youtubedebugpanel = document.querySelectorAll('div.ytp-dialog-holder');
for(var i = 0; i < youtubedebugpanel.length; i++ ){youtubedebugpanel[i].style.zIndex = "1001";}
// 21 august 2015
var youtubedebugcontextmenu = document.querySelectorAll('div.ytp-contextmenu');
for(var i = 0; i < youtubedebugcontextmenu.length; i++ ){youtubedebugcontextmenu[i].style.zIndex = "1001";}

// YouTube video OK
var watch7 = $('watch7');
if(watch7)$('watch7').style.zIndex = 'auto';

var watch7main = $('watch7-main');
if(watch7main)$('watch7-main').style.zIndex = 'auto';

var watch7content = $('watch7-content');
if(watch7content)$('watch7-content').style.zIndex = 'auto';

/* temp fix watch7-video */
var watch7video = $('watch7-video');
if(watch7video)$('watch7-video').style.zIndex = 'auto';

// Turn Off the Lights path detection and set to auto zindex
// this to make sure later YouTube doesn't change again the website layout
var path = [];
var el = document.getElementById('movie_player');
if(el){
do {
    var qq = path.unshift(el.nodeName);
    if (el.currentStyle) { 
        var yta = qq.currentStyle["z-Index"]; 
    }
    else {
        var yta = document.defaultView.getComputedStyle(el,null).getPropertyValue("z-Index");
    }
	if (yta == "auto"){}
	else{el.style.zIndex = 'auto';}
} while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode))
}

// Shows YouTube Suggestions
if(suggestions == 'true'){
// updated 15 january 2016    
var watch7sidebar = $('watch7-sidebar');
if(watch7sidebar){$('watch7-sidebar').style.zIndex = 1000;}
}

// Shows YouTube playlist
if(playlist == 'true'){
// updated 15 january 2016    
var watchappbarplaylist = $('watch-appbar-playlist');
if(watchappbarplaylist){$('watch-appbar-playlist').style.zIndex = 1000;}
}

// Shows video title
if(videoheadline == 'true'){
// updated 15 january 2016    
var eowtitle = $('eow-title');
if(eowtitle){$('eow-title').style.color = 'white';$('eow-title').style.zIndex = 1000;$('eow-title').style.position = 'relative';}
}

// Shows YouTube Channel name
if(head == 'true'){
// updated 15 january 2016
var watch7userheader = $('watch7-user-header');
if(watch7userheader){$('watch7-user-header').style.zIndex = 1000;$('watch7-user-header').style.position = 'relative';}

var ytuserinfoa = document.querySelector('.yt-user-info a');
if(ytuserinfoa){ytuserinfoa.style.color = 'white';}
}

// Shows Infobar
if(infobar == 'true'){
// updated 15 january 2016    
var watchdescription = $('watch-description');
if(watchdescription){$('watch-description').style.zIndex = 1000;$('watch-description').style.background = 'white';}
}

// Shows like and unlike buttons
if(likebutton == 'true'){
// updated 15 january 2016
var likebuttonrenderlike = document.querySelector('.like-button-renderer-like-button');
if(likebuttonrenderlike){likebuttonrenderlike.style.zIndex = 1000;likebuttonrenderlike.style.position = 'relative';likebuttonrenderlike.style.background = 'white';}

var likebuttonrenderdislike = document.querySelector('.like-button-renderer-dislike-button');
if(likebuttonrenderdislike){likebuttonrenderdislike.style.zIndex = 1000;likebuttonrenderdislike.style.position = 'relative';likebuttonrenderdislike.style.background = 'white';}
}

// Shows share buttons
if(sharebutton == 'true'){
// updated 15 january 2016
var actionsharepanel = document.querySelector('.action-panel-trigger-share');
if(actionsharepanel){actionsharepanel.style.zIndex = 1000;actionsharepanel.style.position = 'relative';actionsharepanel.style.background = 'white';}
}

// Shows view count
if(viewcount == 'true'){
// updated 15 january 2016
var watchviewcount = document.querySelector('.watch-view-count');
if(watchviewcount){watchviewcount.style.zIndex = 1000;watchviewcount.style.color = 'white';}
}

// Shows add button
if(addvideobutton == 'true'){
// updated 15 january 2016
var addtobutton = document.querySelector('.addto-button');
if(addtobutton){addtobutton.style.zIndex = 1000;addtobutton.style.position = 'relative';addtobutton.style.background = 'white';}
}

// Shows like/dislike bar
if(likebar == 'true'){
// updated 15 january 2016    
var videoextrasparkbars = document.querySelector('.video-extras-sparkbars');
if(videoextrasparkbars){videoextrasparkbars.style.zIndex = 1000;videoextrasparkbars.style.position = 'relative'};
}

// MAC & PC & LINUX
// HTML5

// show YouTube HTML5 annotation
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('video-annotations iv-module')) {div[i].style.zIndex = 1001;}}

// YouTube show sub title 25 february 2016
var videoannotations = document.getElementsByTagName('div');
for(var i = 0; i < videoannotations.length; i++ )
{if(videoannotations[i].className == ('video-annotations')) {videoannotations[i].style.zIndex = 1001;}}

// channel page
var c4player = $('c4-player');
if(c4player){$('c4-player').style.zIndex = 1001;$('c4-player').style.visibility = 'visible';$('c4-player').style.position = 'relative';}

// new YouTube october 2013
var mastheadpositioner = $('masthead-positioner');
if(mastheadpositioner){$('masthead-positioner').style.zIndex = '10';}

var appbarguidemenu = $('appbar-guide-menu');
if(appbarguidemenu){$('appbar-guide-menu').style.zIndex = '10';}

var appbarguideiframemask = $('appbar-guide-iframe-mask');
if(appbarguideiframemask){$('appbar-guide-iframe-mask').style.zIndex = '-1';}

// short and cleaner engine 2014
var data = [['movie_player',1000],['movie_player-html5',1000],['watch-player',1000],['html5-player',1001],['video-player',1001],['user_fullwidth_gadget',1001]];
for (var conf in data) {
        var temp = document.getElementById(data[conf][0]);
        if (temp) {
                temp.style.zIndex = data[conf][1];
                temp.style.visibility = 'visible';
                temp.style.position = 'relative';
        }
}

var divs = document.getElementsByTagName('div');
for (var div in divs) {
        var c = divs[div].className;
        if (c == 'video-controls' || c == 'html5-video-controls' || c == 'html5-video-controls ytp-block-autohide' || c == 'html5-video-controls disabled-control-seek') {
                divs[div].style.zIndex = 1001;
                divs[div].style.visibility = 'visible';
        }
}

// YouTube new player 27/04/2015 and 31/08/2015
var ytdivs = document.getElementsByTagName('div');
for (var div in ytdivs) {
        var d = ytdivs[div].className;
        if (d == 'ytp-upnext ytp-endscreen-upnext-autoplay-paused ytp-suggestion-set' || d == 'ytp-remote' || d == 'ytp-thumbnail-overlay ytp-cued-thumbnail-overlay' || d == 'ytp-spinner' || d == 'ytp-bezel' || d == 'ytp-gradient-top' || d == 'ytp-chrome-top' || d == 'ytp-gradient-bottom' || d == 'ytp-chrome-bottom' || d == 'ytp-panelpopup ytp-settings-menu' || d == 'ytp-button ytp-cards-button' || d == 'ytp-share-panel' || d == 'ytp-playlist-menu' || d == 'ytp-related-menu' || d == 'ytp-webgl-spherical-control' || d == 'ytp-storyboard enabled' || d == 'ytp-storyboard-framepreview' || d == 'ytp-ad-progress-bar-container' || d == 'ytp-popup ytp-settings-menu' || d == 'ytp-panelpopup ytp-contextmenu') {
                ytdivs[div].style.zIndex = 1001;
        }
}

// YouTube show sub title
var subtitel = document.getElementsByTagName('div');
for(var i = 0; i < subtitel.length; i++ )
{if(subtitel[i].className == ('ytp-player-content ytp-subtitles-player-content')) {subtitel[i].style.zIndex = 1001;subtitel[i].style.pointerEvents = 'none';}}

var ytbezel = document.getElementsByTagName('div');
for(var i = 0; i < ytbezel.length; i++ )
{if(ytbezel[i].className == ('html5-bezel html5-center-overlay')) {ytbezel[i].style.zIndex = 1001;}}

// YouTube still showing the skip button for the ads
var admedia = document.getElementsByTagName('div');
for(var i = 0; i < admedia.length; i++ )
{if(admedia[i].className == ('ad-container ad-container-single-media-element')) {admedia[i].style.zIndex = 1001;}}

var admediaanno = document.getElementsByTagName('div');
for(var i = 0; i < admediaanno.length; i++ )
{if(admediaanno[i].className == ('ad-container ad-container-single-media-element-annotations')) {admediaanno[i].style.zIndex = 1001;}}

// show HTML5 controls
var ytpprogress = document.getElementsByTagName('div');
for(var i = 0; i < ytpprogress.length; i++ )
{if(ytpprogress[i].className == ('ytp-progress-bar-container')) {ytpprogress[i].style.zIndex = 1005;}}

var playerapi = $('player-api');
if(playerapi){$('player-api').style.zIndex = 1001;}

} // end YouTube
});

/////////// leanbackplayer player support
// controls way
var lbpcontrols = $('lbp_controls');
if(lbpcontrols){$('lbp_controls').style.cssText = 'z-index:1002 !important';}

/////////// API for Website Developer
// id way
var websiteidapi = $('dont-turn-off-the-lights');
if(websiteidapi){$('dont-turn-off-the-lights').style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}

// class way
var websiteclassapi = document.getElementsByClassName('dont-turn-off-the-lights');
for(var i = 0; i < websiteclassapi.length; i++ ){websiteclassapi[i].cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';}

/////////// HTML5 video
// default html5 video detection
video = document.getElementsByTagName('video');
for(var i = 0; i < video.length; i++) {

var path = [];
var el = video[i];
do {
    var qq = path.unshift(el.nodeName);
    if (el.currentStyle) { 
        var yta = qq.currentStyle["z-Index"]; 
    }
    else {
        var yta = document.defaultView.getComputedStyle(el,null).getPropertyValue("z-Index");
    }
	if (yta == "auto"){}
	else{el.style.zIndex = 'auto';}
} while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode))

// other file then "mp3" then run this code
if (video[i].currentSrc.lastIndexOf(".mp3")==-1) {video[i].style.cssText += 'visibility:visible !important; position:relative !important; z-index:1000 !important;';}
if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
	if (no360youtube == 'true'){
		video[i].style.cssText += "display:block !important";
	} else {
	 // default the regular player
	}
}

}

// default html5 video detection inside a iframe element
/*iframe = document.getElementsByTagName("iframe");
for(var i = 0; i < iframe.length; i++) {
try {
	var innerDoc = iframe[i].contentWindow ? iframe[i].contentWindow.document : iframe[i].contentDocument ? iframe[i].contentDocument : iframe[i].document;
	if(innerDoc){
		var iframevideo = innerDoc.getElementsByTagName("video");
		for(var j = 0; j < iframevideo.length; j++) {
		iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
		}
	}
} catch(e){}
}*/

// iframe HTML5 video
// see inside injected.js

/////////// Turn Off the Lights -> on

// New intelligent video detection --------------
function intelligentvideodetection() {
if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){} // flash detection off for youtube.com
else {
// search for the z-index, if found something give it 'auto'
var x = document.getElementsByTagName('*');
for(var i = 0; i < x.length; i++ ) {
if (x[i].currentStyle){var y = x[i].currentStyle["z-Index"];}
else if (window.getComputedStyle){var y = document.defaultView.getComputedStyle(x[i],null).getPropertyValue("z-Index");}
if (y == "auto"){}
else{x[i].style.zIndex = 'auto';}
}
}
}

//-----------------------------------------------

function flexiwidthheightdetection() {
// set height and width to a fixed value
// embed iframe
var iframe = document.querySelectorAll('iframe');
for(var i = 0; i < iframe.length; i++ ){
	try{
		var iheight = iframe[i].contentDocument.body.clientHeight;
		var iwidth = iframe[i].contentDocument.body.clientWidth;
		iframe[i].style.height = iheight + "px";
		iframe[i].style.width = iwidth + "px";
	}catch(e){}
}

// var embed = document.querySelectorAll('embed');
// for(var i = 0; i < embed.length; i++ ){
	// if(document.defaultView && document.defaultView.getComputedStyle){
		// try{
		// var targetComputedStyleHeight=document.defaultView.getComputedStyle(embed[i],null).getPropertyValue("height");
		// var spar = targetComputedStyleHeight.replace("px","");embed[i].style.height = Math.round(spar) + "px";
		// var targetComputedStyleWidth=document.defaultView.getComputedStyle(embed[i],null).getPropertyValue("width");
		// var been = targetComputedStyleWidth.replace("px","");embed[i].style.width = Math.round(been) + "px"; 
		// }catch(e){}
	// }
// }
}

//-----------------------------------------------

if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){} // flash detection off for youtube.com
else {
// embed iframe
var iframe = document.querySelectorAll('iframe');
for(var i = 0; i < iframe.length; i++ ){
// video list
var insideframe = iframe[i].src;
if((insideframe.substring(0, 17) == '//www.youtube.com') || (insideframe.substring(0, 26) == '//www.youtube-nocookie.com') || (insideframe.substring(0, 22) == 'http://www.youtube.com') || (insideframe.substring(0, 23) == 'https://www.youtube.com') || (insideframe.substring(0, 31) == 'http://www.youtube-nocookie.com') || (insideframe.substring(0, 32) == 'https://www.youtube-nocookie.com') || (insideframe.substring(0, 19) == 'https://youtube.com') || (insideframe.substring(0, 18) == 'http://youtube.com')
|| (insideframe.substring(0, 16) == 'http://vimeo.com') || (insideframe.substring(0, 17) == 'https://vimeo.com') || (insideframe.substring(0, 23) == 'http://player.vimeo.com') || (insideframe.substring(0, 24) == 'https://player.vimeo.com') || (insideframe.substring(0, 29) == 'https://secure-a.vimeocdn.com') || (insideframe.substring(0, 21) == 'http://a.vimeocdn.com') || (insideframe.substring(0, 22) == 'https://a.vimeocdn.com')
|| (insideframe.substring(0, 26) == 'http://www.dailymotion.com') || (insideframe.substring(0, 27) == 'https://www.dailymotion.com') || (insideframe.substring(0, 24) == 'http://static1.dmcdn.net') || (insideframe.substring(0, 25) == 'https://static1.dmcdn.net')
|| (insideframe.substring(0, 27) == 'http://videoplayer.vevo.com') || (insideframe.substring(0, 28) == 'https://videoplayer.vevo.com')
|| (insideframe.substring(0, 29) == 'http://embed.itunes.apple.com') || (insideframe.substring(0, 30) == 'https://embed.itunes.apple.com')
|| (insideframe.substring(0, 19) == 'http://vk.com/video') || (insideframe.substring(0, 20) == 'https://vk.com/video') || (insideframe.substring(0, 17) == 'http://vk.com/swf') || (insideframe.substring(0, 18) == 'https://vk.com/swf')
|| (insideframe.substring(0, 26) == 'http://www.facebook.com/v/') || (insideframe.substring(0, 27) == 'https://www.facebook.com/v/') || (insideframe.substring(0, 26) == 'http://static.ak.fbcdn.net')  || (insideframe.substring(0, 27) == 'https://static.ak.fbcdn.net') || (insideframe.substring(0, 29) == 'http://static.ak.facebook.com') || (insideframe.substring(0, 30) == 'https://static.ak.facebook.com') || (insideframe.substring(0, 31) == 'http://s-static.ak.facebook.com') || (insideframe.substring(0, 32) == 'https://s-static.ak.facebook.com') || (insideframe.substring(0, 30) == 'http://fbstatic-a.akamaihd.net') || (insideframe.substring(0, 31) == 'https://fbstatic-a.akamaihd.net')// facebook embed video
|| (insideframe.substring(0, 30) == 'http://lads.myspace.com/videos') || (insideframe.substring(0, 31) == 'https://lads.myspace.com/videos')
|| (insideframe.substring(0, 25) == 'http://www.hulu.com/embed') || (insideframe.substring(0, 26) == 'https://www.hulu.com/embed') || (insideframe.substring(0, 32) == 'https://www.hulu.com/site-player') || (insideframe.substring(0, 31) == 'http://www.hulu.com/site-player')|| (insideframe.substring(0, 22) == 'http://player.hulu.com') || (insideframe.substring(0, 23) == 'https://player.hulu.com')
|| (insideframe.substring(0, 14) == 'http://blip.tv') || (insideframe.substring(0, 15) == 'http://blip.tv') || (insideframe.substring(0, 16) == 'http://a.blip.tv') || (insideframe.substring(0, 17) == 'https://a.blip.tv')
|| (insideframe.substring(0, 17) == 'http://l.yimg.com') || (insideframe.substring(0, 18) == 'https://l.yimg.com') // yahoo video
|| (insideframe.substring(0, 27) == 'http://videos.revision3.com') || (insideframe.substring(0, 28) == 'https://videos.revision3.com') || (insideframe.substring(0, 20) == 'http://revision3.com') || (insideframe.substring(0, 21) == 'https://revision3.com')
|| (insideframe.substring(0, 23) == 'http://www.metacafe.com') || (insideframe.substring(0, 24) == 'https://www.metacafe.com')
|| (insideframe.substring(0, 24) == 'http://www-cdn.justin.tv') || (insideframe.substring(0, 25) == 'https://www-cdn.justin.tv')
|| (insideframe.substring(0, 16) == 'http://twitch.tv') || (insideframe.substring(0, 17) == 'https://twitch.tv') || (insideframe.substring(0, 24) == 'http://www-cdn.jtvnw.net') || (insideframe.substring(0, 25) == 'https://www-cdn.jtvnw.net') || (insideframe.substring(0, 23) == 'http://player.twitch.tv')|| (insideframe.substring(0, 24) == 'https://player.twitch.tv')
|| (insideframe.substring(0, 21) == 'http://s.mcstatic.com') || (insideframe.substring(0, 22) == 'https://s.mcstatic.com') // metacafe
|| (insideframe.substring(0, 21) == 'http://is4.myvideo.de') || (insideframe.substring(0, 22) == 'https://is4.myvideo.de')
|| (insideframe.substring(0, 32) == 'http://cdn1.static.videobash.com') || (insideframe.substring(0, 33) == 'https://cdn1.static.videobash.com')
|| (insideframe.substring(0, 24) == 'http://player.ooyala.com') || (insideframe.substring(0, 25) == 'https://player.ooyala.com') // espn.com
|| (insideframe.substring(0, 19) == 'http://i.nflcdn.com') || (insideframe.substring(0, 20) == 'https://i.nflcdn.com') //nfl.com
|| (insideframe.substring(0, 22) == 'http://cfiles.5min.com') || (insideframe.substring(0, 23) == 'https://cfiles.5min.com') // aol.com
|| (insideframe.substring(0, 18) == 'http://can.cbs.com') || (insideframe.substring(0, 19) == 'https://can.cbs.com') // tv.com
|| (insideframe.substring(0, 25) == 'http://cdn.livestream.com') || (insideframe.substring(0, 26) == 'https://cdn.livestream.com')
|| (insideframe.substring(0, 29) == 'http://static-cdn1.ustream.tv') || (insideframe.substring(0, 30) == 'https://static-cdn1.ustream.tv')
|| (insideframe.substring(0, 21) == 'http://static.muzu.tv') || (insideframe.substring(0, 22) == 'https://static.muzu.tv')
|| (insideframe.substring(0, 32) == 'http://static.ak.crunchyroll.com') || (insideframe.substring(0, 33) == 'https://static.ak.crunchyroll.com')
|| (insideframe.substring(0, 20) == 'http://video.ted.com') || (insideframe.substring(0, 21) == 'https://video.ted.com') || (insideframe.substring(0, 20) == 'http://embed.ted.com') || (insideframe.substring(0, 21) == 'https://embed.ted.com')
|| (insideframe.substring(0, 19) == 'http://metatube.com') || (insideframe.substring(0, 20) == 'https://metatube.com')
|| (insideframe.substring(0, 32) == 'http://videohosting.sidereel.com') || (insideframe.substring(0, 33) == 'https://videohosting.sidereel.com')
|| (insideframe.substring(0, 28) == 'http://rutube.ru/video/embed') || (insideframe.substring(0, 29) == 'https://rutube.ru/video/embed')
/*|| (insideframe.substring(0, 19) == 'http://www.veoh.com') || (insideframe.substring(0, 20) == 'https://www.veoh.com')*/
|| (insideframe.substring(0, 16) == 'http://vine.co/v') || (insideframe.substring(0, 17) == 'https://vine.co/v')
|| (insideframe.substring(0, 22) == 'http://embed.break.com') || (insideframe.substring(0, 23) == 'https://embed.break.com') || (insideframe.substring(0, 23) == 'https://media1.break.com') || (insideframe.substring(0, 24) == 'https://media1.break.com')
|| (insideframe.substring(0, 27) == 'http://www.collegehumor.com') || (insideframe.substring(0, 28) == 'https://www.collegehumor.com') || (insideframe.substring(0, 38) == 'http://0.static.collegehumor.cvcdn.com') || (insideframe.substring(0, 39) == 'https://0.static.collegehumor.cvcdn.com')
|| (insideframe.substring(0, 24) == 'http://hub.video.msn.com') || (insideframe.substring(0, 25) == 'https://hub.video.msn.com') || (insideframe.substring(0, 34) == 'http://img.widgets.video.s-msn.com') || (insideframe.substring(0, 35) == 'https://img.widgets.video.s-msn.com') // msn bing.com
|| (insideframe.substring(0, 30) == 'http://flash.pcworld.com/video') || (insideframe.substring(0, 31) == 'https://flash.pcworld.com/video')
|| (insideframe.substring(0, 39) == 'https://safe.txmblr.com/svc/embed/iframe') || (insideframe.substring(0, 40) == 'https://safe.txmblr.com/svc/embed/iframe')
|| (insideframe.substring(0, 23) == 'http://z.cdn.turner.com') || (insideframe.substring(0, 24) == 'https://z.cdn.turner.com')
|| (insideframe.substring(0, 24) == 'http://player.ku6cdn.com') || (insideframe.substring(0, 25) == 'https://player.ku6cdn.com')
|| (insideframe.substring(0, 21) == 'http://js.tudouui.com') || (insideframe.substring(0, 22) == 'https://js.tudouui.com')
|| (insideframe.substring(0, 21) == 'http://player.cntv.cn') || (insideframe.substring(0, 22) == 'https://player.cntv.cn')
|| (insideframe.substring(0, 34) == 'http://js.kankan.xunlei.com/player') || (insideframe.substring(0, 35) == 'https://js.kankan.xunlei.com/player')
|| (insideframe.substring(0, 18) == 'http://tv.sohu.com') || (insideframe.substring(0, 19) == 'https://tv.sohu.com')
|| (insideframe.substring(0, 25) == 'http://player.letvcdn.com') || (insideframe.substring(0, 26) == 'https://player.letvcdn.com')
|| (insideframe.substring(0, 20) == 'http://www.iqiyi.com') || (insideframe.substring(0, 21) == 'https://www.iqiyi.com')
|| (insideframe.substring(0, 23) == 'http://static1.mtime.cn') || (insideframe.substring(0, 24) == 'https://static1.mtime.cn') || (insideframe.substring(0, 22) == 'http://movie.mtime.com') || (insideframe.substring(0, 23) == 'https://movie.mtime.com')
|| (insideframe.substring(0, 23) == 'http://movie.douban.com') || (insideframe.substring(0, 24) == 'https://movie.douban.com')
|| (insideframe.substring(0, 23) == 'http://static.m1905.com') || (insideframe.substring(0, 24) == 'https://static.m1905.com')
|| (insideframe.substring(0, 22) == 'http://imgcache.qq.com') || (insideframe.substring(0, 23) == 'https://imgcache.qq.com')
|| (insideframe.substring(0, 19) == 'http://s1.56img.com') || (insideframe.substring(0, 20) == 'https://s1.56img.com')
|| (insideframe.substring(0, 20) == 'http://client.joy.cn') || (insideframe.substring(0, 21) == 'https://client.joy.cn')
|| (insideframe.substring(0, 28) == 'http://player.video.qiyi.com') || (insideframe.substring(0, 29) == 'https://player.video.qiyi.com')
|| (insideframe.substring(0, 44) == 'http://ssl.acfun.tv/block-player-homura.html') || (insideframe.substring(0, 45) == 'http://ssl.acfun.tv/block-player-homura.html')
|| (insideframe.substring(0, 23) == 'http://player.youku.com') || (insideframe.substring(0, 24) == 'https://player.youku.com') || (insideframe.substring(0, 23) == 'http://static.youku.com') || (insideframe.substring(0, 24) == 'https://static.youku.com'))
{
// search for the video player, and set the previous path all to z-index "auto"
var path = [];
var el = document.getElementsByTagName("iframe")[i];
do {
    var qq = path.unshift(el.nodeName);
    if (el.currentStyle) { 
        var yta = qq.currentStyle["z-Index"];
    }
    else {
        var yta = document.defaultView.getComputedStyle(el,null).getPropertyValue("z-Index");
    }
	if (yta == "auto"){}
	else{el.style.zIndex = 'auto';}
} while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode))

// current video to front
var targetComputedStyleHeight=document.defaultView.getComputedStyle(iframe[i],null).getPropertyValue("height");var spar = targetComputedStyleHeight.replace("px","");
var targetComputedStyleWidth=document.defaultView.getComputedStyle(iframe[i],null).getPropertyValue("width");var been = targetComputedStyleWidth.replace("px","");
iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important;' + 'height:' + Math.round(spar) + 'px; width:' + Math.round(been) + 'px; display: block;';
//iframe[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
}
}

// embed object
var object = document.querySelectorAll('object');
for(var i = 0; i < object.length; i++ ){
// video list
var insideframe = object[i].data;
if((insideframe.substring(0, 17) == '//www.youtube.com') || (insideframe.substring(0, 26) == '//www.youtube-nocookie.com') || (insideframe.substring(0, 22) == 'http://www.youtube.com') || (insideframe.substring(0, 23) == 'https://www.youtube.com') || (insideframe.substring(0, 31) == 'http://www.youtube-nocookie.com') || (insideframe.substring(0, 32) == 'https://www.youtube-nocookie.com') || (insideframe.substring(0, 19) == 'https://youtube.com') || (insideframe.substring(0, 18) == 'http://youtube.com')
|| (insideframe.substring(0, 16) == 'http://vimeo.com') || (insideframe.substring(0, 17) == 'https://vimeo.com') || (insideframe.substring(0, 23) == 'http://player.vimeo.com') || (insideframe.substring(0, 24) == 'https://player.vimeo.com') || (insideframe.substring(0, 29) == 'https://secure-a.vimeocdn.com') || (insideframe.substring(0, 21) == 'http://a.vimeocdn.com') || (insideframe.substring(0, 22) == 'https://a.vimeocdn.com')
|| (insideframe.substring(0, 26) == 'http://www.dailymotion.com') || (insideframe.substring(0, 27) == 'https://www.dailymotion.com') || (insideframe.substring(0, 24) == 'http://static1.dmcdn.net') || (insideframe.substring(0, 25) == 'https://static1.dmcdn.net')
|| (insideframe.substring(0, 27) == 'http://videoplayer.vevo.com') || (insideframe.substring(0, 28) == 'https://videoplayer.vevo.com')
|| (insideframe.substring(0, 29) == 'http://embed.itunes.apple.com') || (insideframe.substring(0, 30) == 'https://embed.itunes.apple.com')
|| (insideframe.substring(0, 19) == 'http://vk.com/video') || (insideframe.substring(0, 20) == 'https://vk.com/video') || (insideframe.substring(0, 17) == 'http://vk.com/swf') || (insideframe.substring(0, 18) == 'https://vk.com/swf')
|| (insideframe.substring(0, 26) == 'http://www.facebook.com/v/') || (insideframe.substring(0, 27) == 'https://www.facebook.com/v/') || (insideframe.substring(0, 26) == 'http://static.ak.fbcdn.net')  || (insideframe.substring(0, 27) == 'https://static.ak.fbcdn.net') || (insideframe.substring(0, 29) == 'http://static.ak.facebook.com') || (insideframe.substring(0, 30) == 'https://static.ak.facebook.com') || (insideframe.substring(0, 31) == 'http://s-static.ak.facebook.com') || (insideframe.substring(0, 32) == 'https://s-static.ak.facebook.com') || (insideframe.substring(0, 30) == 'http://fbstatic-a.akamaihd.net') || (insideframe.substring(0, 31) == 'https://fbstatic-a.akamaihd.net')// facebook embed video
|| (insideframe.substring(0, 30) == 'http://lads.myspace.com/videos') || (insideframe.substring(0, 31) == 'https://lads.myspace.com/videos')
|| (insideframe.substring(0, 25) == 'http://www.hulu.com/embed') || (insideframe.substring(0, 26) == 'https://www.hulu.com/embed') || (insideframe.substring(0, 32) == 'https://www.hulu.com/site-player') || (insideframe.substring(0, 31) == 'http://www.hulu.com/site-player')|| (insideframe.substring(0, 22) == 'http://player.hulu.com') || (insideframe.substring(0, 23) == 'https://player.hulu.com')
|| (insideframe.substring(0, 14) == 'http://blip.tv') || (insideframe.substring(0, 15) == 'http://blip.tv') || (insideframe.substring(0, 16) == 'http://a.blip.tv') || (insideframe.substring(0, 17) == 'https://a.blip.tv')
|| (insideframe.substring(0, 17) == 'http://l.yimg.com') || (insideframe.substring(0, 18) == 'https://l.yimg.com') // yahoo video
|| (insideframe.substring(0, 27) == 'http://videos.revision3.com') || (insideframe.substring(0, 28) == 'https://videos.revision3.com') || (insideframe.substring(0, 20) == 'http://revision3.com') || (insideframe.substring(0, 21) == 'https://revision3.com')
|| (insideframe.substring(0, 23) == 'http://www.metacafe.com') || (insideframe.substring(0, 24) == 'https://www.metacafe.com')
|| (insideframe.substring(0, 24) == 'http://www-cdn.justin.tv') || (insideframe.substring(0, 25) == 'https://www-cdn.justin.tv')
|| (insideframe.substring(0, 16) == 'http://twitch.tv') || (insideframe.substring(0, 17) == 'https://twitch.tv') || (insideframe.substring(0, 24) == 'http://www-cdn.jtvnw.net') || (insideframe.substring(0, 25) == 'https://www-cdn.jtvnw.net') || (insideframe.substring(0, 23) == 'http://player.twitch.tv')|| (insideframe.substring(0, 24) == 'https://player.twitch.tv')
|| (insideframe.substring(0, 21) == 'http://s.mcstatic.com') || (insideframe.substring(0, 22) == 'https://s.mcstatic.com') // metacafe
|| (insideframe.substring(0, 21) == 'http://is4.myvideo.de') || (insideframe.substring(0, 22) == 'https://is4.myvideo.de')
|| (insideframe.substring(0, 32) == 'http://cdn1.static.videobash.com') || (insideframe.substring(0, 33) == 'https://cdn1.static.videobash.com')
|| (insideframe.substring(0, 24) == 'http://player.ooyala.com') || (insideframe.substring(0, 25) == 'https://player.ooyala.com') // espn.com
|| (insideframe.substring(0, 19) == 'http://i.nflcdn.com') || (insideframe.substring(0, 20) == 'https://i.nflcdn.com') //nfl.com
|| (insideframe.substring(0, 22) == 'http://cfiles.5min.com') || (insideframe.substring(0, 23) == 'https://cfiles.5min.com') // aol.com
|| (insideframe.substring(0, 18) == 'http://can.cbs.com') || (insideframe.substring(0, 19) == 'https://can.cbs.com') // tv.com
|| (insideframe.substring(0, 25) == 'http://cdn.livestream.com') || (insideframe.substring(0, 26) == 'https://cdn.livestream.com')
|| (insideframe.substring(0, 29) == 'http://static-cdn1.ustream.tv') || (insideframe.substring(0, 30) == 'https://static-cdn1.ustream.tv')
|| (insideframe.substring(0, 21) == 'http://static.muzu.tv') || (insideframe.substring(0, 22) == 'https://static.muzu.tv')
|| (insideframe.substring(0, 32) == 'http://static.ak.crunchyroll.com') || (insideframe.substring(0, 33) == 'https://static.ak.crunchyroll.com')
|| (insideframe.substring(0, 20) == 'http://video.ted.com') || (insideframe.substring(0, 21) == 'https://video.ted.com') || (insideframe.substring(0, 20) == 'http://embed.ted.com') || (insideframe.substring(0, 21) == 'https://embed.ted.com')
|| (insideframe.substring(0, 19) == 'http://metatube.com') || (insideframe.substring(0, 20) == 'https://metatube.com')
|| (insideframe.substring(0, 32) == 'http://videohosting.sidereel.com') || (insideframe.substring(0, 33) == 'https://videohosting.sidereel.com')
|| (insideframe.substring(0, 28) == 'http://rutube.ru/video/embed') || (insideframe.substring(0, 29) == 'https://rutube.ru/video/embed')
/*|| (insideframe.substring(0, 19) == 'http://www.veoh.com') || (insideframe.substring(0, 20) == 'https://www.veoh.com')*/
|| (insideframe.substring(0, 16) == 'http://vine.co/v') || (insideframe.substring(0, 17) == 'https://vine.co/v')
|| (insideframe.substring(0, 22) == 'http://embed.break.com') || (insideframe.substring(0, 23) == 'https://embed.break.com') || (insideframe.substring(0, 23) == 'http://media1.break.com') || (insideframe.substring(0, 24) == 'https://media1.break.com')
|| (insideframe.substring(0, 27) == 'http://www.collegehumor.com') || (insideframe.substring(0, 28) == 'https://www.collegehumor.com') || (insideframe.substring(0, 38) == 'http://0.static.collegehumor.cvcdn.com') || (insideframe.substring(0, 39) == 'https://0.static.collegehumor.cvcdn.com')
|| (insideframe.substring(0, 24) == 'http://hub.video.msn.com') || (insideframe.substring(0, 25) == 'https://hub.video.msn.com') || (insideframe.substring(0, 34) == 'http://img.widgets.video.s-msn.com') || (insideframe.substring(0, 35) == 'https://img.widgets.video.s-msn.com') // msn bing.com
|| (insideframe.substring(0, 30) == 'http://flash.pcworld.com/video') || (insideframe.substring(0, 31) == 'https://flash.pcworld.com/video')
|| (insideframe.substring(0, 39) == 'https://safe.txmblr.com/svc/embed/iframe') || (insideframe.substring(0, 40) == 'https://safe.txmblr.com/svc/embed/iframe')
|| (insideframe.substring(0, 23) == 'http://z.cdn.turner.com') || (insideframe.substring(0, 24) == 'https://z.cdn.turner.com')
|| (insideframe.substring(0, 24) == 'http://player.ku6cdn.com') || (insideframe.substring(0, 25) == 'https://player.ku6cdn.com')
|| (insideframe.substring(0, 21) == 'http://js.tudouui.com') || (insideframe.substring(0, 22) == 'https://js.tudouui.com')
|| (insideframe.substring(0, 21) == 'http://player.cntv.cn') || (insideframe.substring(0, 22) == 'https://player.cntv.cn')
|| (insideframe.substring(0, 34) == 'http://js.kankan.xunlei.com/player') || (insideframe.substring(0, 35) == 'https://js.kankan.xunlei.com/player')
|| (insideframe.substring(0, 18) == 'http://tv.sohu.com') || (insideframe.substring(0, 19) == 'https://tv.sohu.com')
|| (insideframe.substring(0, 25) == 'http://player.letvcdn.com') || (insideframe.substring(0, 26) == 'https://player.letvcdn.com')
|| (insideframe.substring(0, 20) == 'http://www.iqiyi.com') || (insideframe.substring(0, 21) == 'https://www.iqiyi.com')
|| (insideframe.substring(0, 23) == 'http://static1.mtime.cn') || (insideframe.substring(0, 24) == 'https://static1.mtime.cn') || (insideframe.substring(0, 22) == 'http://movie.mtime.com') || (insideframe.substring(0, 23) == 'https://movie.mtime.com')
|| (insideframe.substring(0, 23) == 'http://movie.douban.com') || (insideframe.substring(0, 24) == 'https://movie.douban.com')
|| (insideframe.substring(0, 23) == 'http://static.m1905.com') || (insideframe.substring(0, 24) == 'https://static.m1905.com')
|| (insideframe.substring(0, 22) == 'http://imgcache.qq.com') || (insideframe.substring(0, 23) == 'https://imgcache.qq.com')
|| (insideframe.substring(0, 19) == 'http://s1.56img.com') || (insideframe.substring(0, 20) == 'https://s1.56img.com')
|| (insideframe.substring(0, 20) == 'http://client.joy.cn') || (insideframe.substring(0, 21) == 'https://client.joy.cn')
|| (insideframe.substring(0, 28) == 'http://player.video.qiyi.com') || (insideframe.substring(0, 29) == 'https://player.video.qiyi.com')
|| (insideframe.substring(0, 44) == 'http://ssl.acfun.tv/block-player-homura.html') || (insideframe.substring(0, 45) == 'http://ssl.acfun.tv/block-player-homura.html')
|| (insideframe.substring(0, 23) == 'http://player.youku.com') || (insideframe.substring(0, 24) == 'https://player.youku.com') || (insideframe.substring(0, 23) == 'http://static.youku.com') || (insideframe.substring(0, 24) == 'https://static.youku.com'))
{
// search for the video player, and set the previous path all to z-index "auto"
var path = [];
var el = document.getElementsByTagName("object")[i];
do {
    var qq = path.unshift(el.nodeName);
    if (el.currentStyle) { 
        var yta = qq.currentStyle["z-Index"];
    }
    else {
        var yta = document.defaultView.getComputedStyle(el,null).getPropertyValue("z-Index");
    }
	if (yta == "auto"){}
	else{el.style.zIndex = 'auto';}
} while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode))

// current video to front
object[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important;';
}
}

// embed embed
var embed = document.querySelectorAll('embed');
for(var i = 0; i < embed.length; i++ ){
// video list
var insideframe = embed[i].src;
if((insideframe.substring(0, 17) == '//www.youtube.com') || (insideframe.substring(0, 26) == '//www.youtube-nocookie.com') || (insideframe.substring(0, 22) == 'http://www.youtube.com') || (insideframe.substring(0, 23) == 'https://www.youtube.com') || (insideframe.substring(0, 31) == 'http://www.youtube-nocookie.com') || (insideframe.substring(0, 32) == 'https://www.youtube-nocookie.com') || (insideframe.substring(0, 19) == 'https://youtube.com') || (insideframe.substring(0, 18) == 'http://youtube.com')
|| (insideframe.substring(0, 16) == 'http://vimeo.com') || (insideframe.substring(0, 17) == 'https://vimeo.com') || (insideframe.substring(0, 23) == 'http://player.vimeo.com') || (insideframe.substring(0, 24) == 'https://player.vimeo.com') || (insideframe.substring(0, 29) == 'https://secure-a.vimeocdn.com') || (insideframe.substring(0, 21) == 'http://a.vimeocdn.com') || (insideframe.substring(0, 22) == 'https://a.vimeocdn.com')
|| (insideframe.substring(0, 26) == 'http://www.dailymotion.com') || (insideframe.substring(0, 27) == 'https://www.dailymotion.com') || (insideframe.substring(0, 24) == 'http://static1.dmcdn.net') || (insideframe.substring(0, 25) == 'https://static1.dmcdn.net')
|| (insideframe.substring(0, 27) == 'http://videoplayer.vevo.com') || (insideframe.substring(0, 28) == 'https://videoplayer.vevo.com')
|| (insideframe.substring(0, 29) == 'http://embed.itunes.apple.com') || (insideframe.substring(0, 30) == 'https://embed.itunes.apple.com')
|| (insideframe.substring(0, 19) == 'http://vk.com/video') || (insideframe.substring(0, 20) == 'https://vk.com/video') || (insideframe.substring(0, 17) == 'http://vk.com/swf') || (insideframe.substring(0, 18) == 'https://vk.com/swf')
|| (insideframe.substring(0, 26) == 'http://www.facebook.com/v/') || (insideframe.substring(0, 27) == 'https://www.facebook.com/v/') || (insideframe.substring(0, 26) == 'http://static.ak.fbcdn.net')  || (insideframe.substring(0, 27) == 'https://static.ak.fbcdn.net') || (insideframe.substring(0, 29) == 'http://static.ak.facebook.com') || (insideframe.substring(0, 30) == 'https://static.ak.facebook.com') || (insideframe.substring(0, 31) == 'http://s-static.ak.facebook.com') || (insideframe.substring(0, 32) == 'https://s-static.ak.facebook.com') || (insideframe.substring(0, 30) == 'http://fbstatic-a.akamaihd.net') || (insideframe.substring(0, 31) == 'https://fbstatic-a.akamaihd.net')// facebook embed video
|| (insideframe.substring(0, 30) == 'http://lads.myspace.com/videos') || (insideframe.substring(0, 31) == 'https://lads.myspace.com/videos')
|| (insideframe.substring(0, 25) == 'http://www.hulu.com/embed') || (insideframe.substring(0, 26) == 'https://www.hulu.com/embed') || (insideframe.substring(0, 32) == 'https://www.hulu.com/site-player') || (insideframe.substring(0, 31) == 'http://www.hulu.com/site-player')|| (insideframe.substring(0, 22) == 'http://player.hulu.com') || (insideframe.substring(0, 23) == 'https://player.hulu.com') 
|| (insideframe.substring(0, 14) == 'http://blip.tv') || (insideframe.substring(0, 15) == 'http://blip.tv') || (insideframe.substring(0, 16) == 'http://a.blip.tv') || (insideframe.substring(0, 17) == 'https://a.blip.tv')
|| (insideframe.substring(0, 17) == 'http://l.yimg.com') || (insideframe.substring(0, 18) == 'https://l.yimg.com') // yahoo video
|| (insideframe.substring(0, 27) == 'http://videos.revision3.com') || (insideframe.substring(0, 28) == 'https://videos.revision3.com') || (insideframe.substring(0, 20) == 'http://revision3.com') || (insideframe.substring(0, 21) == 'https://revision3.com')
|| (insideframe.substring(0, 23) == 'http://www.metacafe.com') || (insideframe.substring(0, 24) == 'https://www.metacafe.com')
|| (insideframe.substring(0, 24) == 'http://www-cdn.justin.tv') || (insideframe.substring(0, 25) == 'https://www-cdn.justin.tv')
|| (insideframe.substring(0, 16) == 'http://twitch.tv') || (insideframe.substring(0, 17) == 'https://twitch.tv') || (insideframe.substring(0, 24) == 'http://www-cdn.jtvnw.net') || (insideframe.substring(0, 25) == 'https://www-cdn.jtvnw.net') || (insideframe.substring(0, 23) == 'http://player.twitch.tv')|| (insideframe.substring(0, 24) == 'https://player.twitch.tv')
|| (insideframe.substring(0, 21) == 'http://s.mcstatic.com') || (insideframe.substring(0, 22) == 'https://s.mcstatic.com') // metacafe
|| (insideframe.substring(0, 21) == 'http://is4.myvideo.de') || (insideframe.substring(0, 22) == 'https://is4.myvideo.de')
|| (insideframe.substring(0, 32) == 'http://cdn1.static.videobash.com') || (insideframe.substring(0, 33) == 'https://cdn1.static.videobash.com')
|| (insideframe.substring(0, 24) == 'http://player.ooyala.com') || (insideframe.substring(0, 25) == 'https://player.ooyala.com') // espn.com
|| (insideframe.substring(0, 19) == 'http://i.nflcdn.com') || (insideframe.substring(0, 20) == 'https://i.nflcdn.com') //nfl.com
|| (insideframe.substring(0, 22) == 'http://cfiles.5min.com') || (insideframe.substring(0, 23) == 'https://cfiles.5min.com') // aol.com
|| (insideframe.substring(0, 18) == 'http://can.cbs.com') || (insideframe.substring(0, 19) == 'https://can.cbs.com') // tv.com
|| (insideframe.substring(0, 25) == 'http://cdn.livestream.com') || (insideframe.substring(0, 26) == 'https://cdn.livestream.com')
|| (insideframe.substring(0, 29) == 'http://static-cdn1.ustream.tv') || (insideframe.substring(0, 30) == 'https://static-cdn1.ustream.tv')
|| (insideframe.substring(0, 21) == 'http://static.muzu.tv') || (insideframe.substring(0, 22) == 'https://static.muzu.tv')
|| (insideframe.substring(0, 32) == 'http://static.ak.crunchyroll.com') || (insideframe.substring(0, 33) == 'https://static.ak.crunchyroll.com')
|| (insideframe.substring(0, 20) == 'http://video.ted.com') || (insideframe.substring(0, 21) == 'https://video.ted.com') || (insideframe.substring(0, 20) == 'http://embed.ted.com') || (insideframe.substring(0, 21) == 'https://embed.ted.com')
|| (insideframe.substring(0, 19) == 'http://metatube.com') || (insideframe.substring(0, 20) == 'https://metatube.com')
|| (insideframe.substring(0, 32) == 'http://videohosting.sidereel.com') || (insideframe.substring(0, 33) == 'https://videohosting.sidereel.com')
|| (insideframe.substring(0, 28) == 'http://rutube.ru/video/embed') || (insideframe.substring(0, 29) == 'https://rutube.ru/video/embed')
/*|| (insideframe.substring(0, 19) == 'http://www.veoh.com') || (insideframe.substring(0, 20) == 'https://www.veoh.com')*/
|| (insideframe.substring(0, 16) == 'http://vine.co/v') || (insideframe.substring(0, 17) == 'https://vine.co/v')
|| (insideframe.substring(0, 22) == 'http://embed.break.com') || (insideframe.substring(0, 23) == 'https://embed.break.com') || (insideframe.substring(0, 23) == 'https://media1.break.com') || (insideframe.substring(0, 24) == 'https://media1.break.com')
|| (insideframe.substring(0, 27) == 'http://www.collegehumor.com') || (insideframe.substring(0, 28) == 'https://www.collegehumor.com') || (insideframe.substring(0, 38) == 'http://0.static.collegehumor.cvcdn.com') || (insideframe.substring(0, 39) == 'https://0.static.collegehumor.cvcdn.com')
|| (insideframe.substring(0, 24) == 'http://hub.video.msn.com') || (insideframe.substring(0, 25) == 'https://hub.video.msn.com') || (insideframe.substring(0, 34) == 'http://img.widgets.video.s-msn.com') || (insideframe.substring(0, 35) == 'https://img.widgets.video.s-msn.com') // msn bing.com
|| (insideframe.substring(0, 30) == 'http://flash.pcworld.com/video') || (insideframe.substring(0, 31) == 'https://flash.pcworld.com/video')
|| (insideframe.substring(0, 39) == 'https://safe.txmblr.com/svc/embed/iframe') || (insideframe.substring(0, 40) == 'https://safe.txmblr.com/svc/embed/iframe')
|| (insideframe.substring(0, 23) == 'http://z.cdn.turner.com') || (insideframe.substring(0, 24) == 'https://z.cdn.turner.com')
|| (insideframe.substring(0, 24) == 'http://player.ku6cdn.com') || (insideframe.substring(0, 25) == 'https://player.ku6cdn.com')
|| (insideframe.substring(0, 21) == 'http://js.tudouui.com') || (insideframe.substring(0, 22) == 'https://js.tudouui.com')
|| (insideframe.substring(0, 21) == 'http://player.cntv.cn') || (insideframe.substring(0, 22) == 'https://player.cntv.cn')
|| (insideframe.substring(0, 34) == 'http://js.kankan.xunlei.com/player') || (insideframe.substring(0, 35) == 'https://js.kankan.xunlei.com/player')
|| (insideframe.substring(0, 18) == 'http://tv.sohu.com') || (insideframe.substring(0, 19) == 'https://tv.sohu.com')
|| (insideframe.substring(0, 25) == 'http://player.letvcdn.com') || (insideframe.substring(0, 26) == 'https://player.letvcdn.com')
|| (insideframe.substring(0, 20) == 'http://www.iqiyi.com') || (insideframe.substring(0, 21) == 'https://www.iqiyi.com')
|| (insideframe.substring(0, 23) == 'http://static1.mtime.cn') || (insideframe.substring(0, 24) == 'https://static1.mtime.cn') || (insideframe.substring(0, 22) == 'http://movie.mtime.com') || (insideframe.substring(0, 23) == 'https://movie.mtime.com')
|| (insideframe.substring(0, 23) == 'http://movie.douban.com') || (insideframe.substring(0, 24) == 'https://movie.douban.com')
|| (insideframe.substring(0, 23) == 'http://static.m1905.com') || (insideframe.substring(0, 24) == 'https://static.m1905.com')
|| (insideframe.substring(0, 22) == 'http://imgcache.qq.com') || (insideframe.substring(0, 23) == 'https://imgcache.qq.com')
|| (insideframe.substring(0, 19) == 'http://s1.56img.com') || (insideframe.substring(0, 20) == 'https://s1.56img.com')
|| (insideframe.substring(0, 20) == 'http://client.joy.cn') || (insideframe.substring(0, 21) == 'https://client.joy.cn')
|| (insideframe.substring(0, 28) == 'http://player.video.qiyi.com') || (insideframe.substring(0, 29) == 'https://player.video.qiyi.com')
|| (insideframe.substring(0, 44) == 'http://ssl.acfun.tv/block-player-homura.html') || (insideframe.substring(0, 45) == 'http://ssl.acfun.tv/block-player-homura.html')
|| (insideframe.substring(0, 23) == 'http://player.youku.com') || (insideframe.substring(0, 24) == 'https://player.youku.com') || (insideframe.substring(0, 23) == 'http://static.youku.com') || (insideframe.substring(0, 24) == 'https://static.youku.com'))
{
// search for the video player, and set the previous path all to z-index "auto"
var path = [];
var el = document.getElementsByTagName("embed")[i];
if (window.location.href.match(/http:\/\/(vk\.com\/.*|vk\.com\/.*)/i)){} //blacklist
else{
do {
    var qq = path.unshift(el.nodeName);
    if (el.currentStyle) { 
        var yta = qq.currentStyle["z-Index"];
    }
    else {
        var yta = document.defaultView.getComputedStyle(el,null).getPropertyValue("z-Index");
    }
	if (yta == "auto"){}
	else{el.style.zIndex = 'auto';}
} while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode))
}

// current video to front
embed[i].style.cssText = 'visibility:visible !important; position:relative !important; z-index:1000 !important';
}
}

}

/////////// Video
// Vimeo, fixed show video
if (window.location.href.match(/((http:\/\/(.*vimeo\.com\/.*|.*vimeo\.com\/.*\/b\/.*|.*vimeo\.com\/.*\/w\/.*))|(https:\/\/(.*vimeo\.com\/.*|.*vimeo\.com\/.*\/b\/.*|.*vimeo\.com\/.*\/w\/.*)))/i)){
// 30/03/2014 show the controls
var elems = document.getElementsByTagName('div'), i;
for (i in elems) {if((' ' + elems[i].className + ' ').indexOf('controls') > -1) {elems[i].style.zIndex = 1001;}}

var elems = document.getElementsByTagName('div'), i;
for (i in elems) {if((' ' + elems[i].className + ' ').indexOf('sidedock') > -1) {elems[i].style.zIndex = 1001;}}

var elems = document.getElementsByTagName('div'), i;
for (i in elems) {if((' ' + elems[i].className + ' ').indexOf('title') > -1) {elems[i].style.zIndex = 1001;}}

//fixed 16/01/2015
var elems = document.getElementsByTagName('div'), i;
for (i in elems) {if((' ' + elems[i].className + ' ').indexOf('target') > -1) {elems[i].style.zIndex = 1001;}}

var elems = document.getElementsByTagName('div'), i;
for (i in elems) {if((' ' + elems[i].className + ' ').indexOf('video') > -1) {elems[i].style.zIndex = 1001;}}
}

// Dailymotion, fixed show video
else if (window.location.href.match(/http:\/\/(.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*)/i)){
// intelligentvideodetection(); // disabled on 24 July 2015

div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('dmpi_video_playerv4 span-8')) {div[i].style.zIndex = 1000;div[i].style.position = 'relative';}}

// HTML5 video
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('controls_container')) {div[i].style.zIndex = 1000;}}

// hide top blue bar
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('sd_header')) {div[i].style.zIndex = 998;}}

// player controls below
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('dmp_ControlBar dmp_will-transition')) {div[i].style.zIndex = 1001;}}

// player top
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('dmp_Dock dmp_will-transition')) {div[i].style.zIndex = 1001;}}

// hd tooltip
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('dmp_Tooltip dmp_is-hidden')) {div[i].style.zIndex = 1001;}}

// menu
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('dmp_Menu')) {div[i].style.zIndex = 1001;}}

// share panel
var dmpSharePane = $('dmp_SharePane');
if(dmpSharePane){$('dmp_SharePane').style.zIndex = 1001;}
}

// vk.com, fixed show video
else if (window.location.href.match(/http:\/\/(vk\.com\/.*|vk\.com\/.*)/i)){
var videoplayer = $('video_player');
if(videoplayer){$('video_player').style.zIndex = 1001;$('video_player').style.position = 'relative';}

var mvlayerwrap = $('mv_layer_wrap');
if(mvlayerwrap){$('mv_layer_wrap').style.zIndex = 1001;}
}

// ted.com, fixed show video
else if (window.location.href.match(/http:\/\/(.*\.ted\.com\/.*)/i)){
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ )
{if(div[i].className == ('')) {div[i].style.zIndex = 1001;}}
}

// 1tv.ru, fixed show video
else if (window.location.href.match(/http:\/\/(.*\.1tv\.ru\/.*)/i)){
var flashvideoportal1 = $('flashvideoportal_1');
if(flashvideoportal1){$('flashvideoportal_1').style.zIndex = 1001;$('flashvideoportal_1').style.position = 'relative';}
}

// steampowered.com, fixed show control
else if (window.location.href.match(/((http:\/\/.*steampowered\.com\/.*)|(https:\/\/.*steampowered\.com\/.*))/i)){
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{if(div[i].className == ('html5_video_overlay')) {div[i].style.zIndex = 1000;}}
}

// twich.tv
// fixed 15 january 2016
else if (window.location.href.match(/((http:\/\/.*twitch\.tv\/.*)|(https:\/\/.*twitch\.tv\/.*))/i)){
div = document.getElementsByTagName('div'); 
for(var i = 0; i < div.length; i++ ) 
{
    if(div[i].className == ('player-video')) {div[i].style.height = '100%';}
}

var elems = document.querySelectorAll(".player-hover");
[].forEach.call(elems, function (el) {
el.style.zIndex = '1001';
});
}

// facebook.com - show the video player control
// fixed 21 january 2016
else if (window.location.href.match(/((http:\/\/.*facebook\.com\/.*)|(https:\/\/.*facebook\.com\/.*))/i)){
// separate video page
var videoStage = document.getElementsByClassName("videoStage");
for(var i = 0; i < videoStage.length; i++){
    videoStage[i].style.zIndex = 1001; 
        div = videoStage[i].getElementsByTagName('div'); 
        for(var i = 0; i < div.length; i++ ) 
        {
            // all div get a higher level
            div[i].style.zIndex = 1001;
            //if(div[i].hasAttribute('data-reactroot')) {div[i].style.zIndex = 1001;}
        }
}

// main facebook video control
var i5q = document.getElementsByClassName(" _i5q");
for(var i = 0; i < i5q.length; i++){
    i5q[i].style.zIndex = 1001; 
        div = i5q[i].getElementsByTagName('div'); 
        for(var j = 0; j < div.length; j++ ) 
        {
            div[j].style.zIndex = 1001;
        }
}
}

//Flash games
//Windows Media Player
//Silverlight
//Quicktime
// -> object,embed,applet,iframe
// -> turn on the flash detection

///////////

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
        if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
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
            if(ytuserinfoa){ytuserinfoa.style.color = '#333';}
            
            // YouTube infobar (set back to default)
            var watchdescription = $('watch-description');
            if(watchdescription){$('watch-description').style.zIndex = 'auto';$('watch-description').style.background = 'transparent';}
            
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
		
		var stefanvdblurimage = $('stefanvdblurimage');
		if(stefanvdblurimage) {document.body.removeChild(stefanvdblurimage);}

		var stefanvdlightcorner = $('stefanvdlightcorner');
		if(stefanvdlightcorner) {document.body.removeChild(stefanvdlightcorner);}
	}
	
	function removenewdynamic() {
		var stefanvddynamicbackground = $('stefanvddynamicbackground');
		if(stefanvddynamicbackground) {document.body.removeChild(stefanvddynamicbackground);}
	}
	
chrome.storage.local.get(['mousespotlighto', 'mousespotlightc', 'mousespotlighta', 'lightcolor', 'lightimagea', 'lightimage', 'interval', 'fadein', 'fadeout', 'readera', 'readerlargestyle', 'mousespotlightt', 'enterpassword', 'password', 'dynamic', 'dynamic1', "dynamic2", 'dynamic3', 'dynamic4', 'dynamic5', 'dynamic6', 'dynamic7', 'dynamic8', 'dynamic9', 'dynamic10', 'hoveroptiondyn5', 'blur', 'cinemaontop', 'spotlightradius', 'slideeffect', 'lightimagelin', 'linearsq', 'colora', 'intervallina', 'colorb', 'intervallinb'], function(response){
mousespotlighto = response['mousespotlighto'];if(!mousespotlighto)mousespotlighto = 'true'; // default mousespotlight true
mousespotlightc = response['mousespotlightc'];if(!mousespotlightc)mousespotlightc = 'false'; // default mousespotlight false
mousespotlighta = response['mousespotlighta'];if(!mousespotlighta)mousespotlighta = 'false'; // default mousespotlight false
lightcolor = response['lightcolor'];if(lightcolor)lightcolor = response['lightcolor'];else lightcolor = '#000000'; // default color black
lightimagea = response['lightimagea'];
lightimage = response['lightimage'];
interval = response['interval'];if(!interval)interval = 80; default_opacity = interval; // default interval 80%
fadein = response['fadein'];if(!fadein)fadein = 'true'; // default fadein true
fadeout = response['fadeout'];if(!fadeout)fadeout = 'true'; // default fadeout true
readera = response['readera'];if(!readera)readera = 'false'; // default readera false
readerlargestyle = response['readerlargestyle'];if(!readerlargestyle)readerlargestyle = 'true'; // default large style
mousespotlightt = response['mousespotlightt'];if(!mousespotlightt)mousespotlightt = 'false'; // default mousespotlight false
enterpassword = response['enterpassword'];
password = response['password'];if(!password)password = 'false';
dynamic = response['dynamic'];if(!dynamic)dynamic = 'false'; // default dynamic false
dynamic1 = response['dynamic1'];
dynamic2 = response['dynamic2'];
dynamic3 = response['dynamic3'];
dynamic4 = response['dynamic4'];
dynamic5 = response['dynamic5'];
dynamic6 = response['dynamic6'];
dynamic7 = response['dynamic7'];
dynamic8 = response['dynamic8'];
dynamic9 = response['dynamic9'];
dynamic10 = response['dynamic10'];
hoveroptiondyn5 = response['hoveroptiondyn5'];
blur = response['blur'];
cinemaontop = response['cinemaontop'];if(!cinemaontop)cinemaontop = 'false'; // default cinemaontop false
spotlightradius = response['spotlightradius'];if(!spotlightradius)spotlightradius = 50; // default spotlightradius 50
slideeffect = response['slideeffect'];if(!slideeffect)slideeffect = 'false'; // default slideeffect false
lightimagelin = response['lightimagelin'];if(!lightimagelin)lightimagelin = 'false'; // default lightimagelin false
linearsq = response['linearsq'];
colora = response['colora'];
intervallina = response['intervallina'];
colorb = response['colorb'];
intervallinb = response['intervallinb'];

// Password in document
// taart make it remove or not
var i18nlockentername = chrome.i18n.getMessage("lockentername");
var i18nlockwrongpassword = chrome.i18n.getMessage("lockwrongpassword");

function taart(){
var pwon2 = $('stefanvdlightareoffpw');
	if(pwon2){
		var entername = window.prompt(i18nlockentername,'');
		if(enterpassword == entername){
		document.body.removeChild(pwon2);
		if(fadeout == 'true'){ReducingFinished = false;fader('hide');reader();} 
		else {removenewframe();reader();}
		} else {window.alert(i18nlockwrongpassword);}	
	} else {
		if(fadeout == 'true'){ReducingFinished = false;fader('hide');reader();}
		else {removenewframe();reader();}
	}
	removenewdynamic();
}

// Password enable
var pwon = $('stefanvdlightareoffpw');
if(password == 'true'){
	if(pwon){
		var entername = window.prompt(i18nlockentername,'');
		if(enterpassword == entername){document.body.removeChild(pwon);lightsgoonoroff();} else {window.alert(i18nlockwrongpassword);}	
	} else {
		lightsgoonoroff();
	    var newpw = document.createElement("div");
	    newpw.setAttribute('id','stefanvdlightareoffpw');
        newpw.style.display = 'none';
	    document.body.appendChild(newpw);
	}
} else {
lightsgoonoroff();
}

function lightsgoonoroff() {
	if(blackon) {
		if(dynamic == 'true'){
			removenewdynamic();
		}
		if((mousespotlightc == 'true') || (mousespotlighta == 'true')){
			// fade out effect
			if(fadeout == 'true'){taart();}
			else{taart();}
		}
		else {
		// fade out effect
		if(fadeout == 'true'){taart();}
		else{taart();}
		}
	}
	else {	
		default_opacity = interval;

	    if(mousespotlighta == 'true'){
	    var newframe1 = document.createElement("div");
	    newframe1.setAttribute('id','stefanvdlightareoff1');
	    newframe1.setAttribute('class','stefanvdlightareoff');
		var fullspotlightsize = spotlightradius;
		var borderspotlightsize = spotlightradius-8;
		var mousespotlightstyle = '-webkit-gradient(radial, -50 -50, '+fullspotlightsize+', -50 -50, '+borderspotlightsize+', from(' + lightcolor + '), to(rgba(0,0,0,0)))';
		
		newframe1.style.backgroundImage = mousespotlightstyle;
		newframe1.style.pointerEvents = 'none'; // make it possible to click on a link 
        newframe1.style.opacity = 0;
        newframe1.style.zIndex = 999;
	    document.body.appendChild(newframe1);
		
	    // fade out effect
		// no click posible

        // fade in effect
		if(fadein == 'true'){fader('show');}
        else{newframe1.style.opacity = default_opacity/100;} // no fade effect	
		
		var spot = $('stefanvdlightareoff1');
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		
		var oldspotx = 0;
		var oldspoty = 0;
		function moveSpot(e){
		var x = 0; var y = 0;
		if (!e) var e = window.event;
		if (e.clientX || e.clientY)
		{
			x = e.clientX; y = e.clientY;
			oldspotx = x; oldspoty = y;
		}
		
		var style = '-webkit-gradient(radial, '+x+' '+y+', '+fullspotlightsize+', '+x+' '+y+', '+borderspotlightsize+', from(' + lightcolor + '), to(rgba(0,0,0,0)))';
		spot.style.opacity = default_opacity/100;
		spot.style.backgroundImage = style;
		}
		window.onmousemove = moveSpot;
		
		// increase size by pressing
		var presstimer;
		var countupsizetimer;
		var mathfullsizeup = fullspotlightsize;
		var mathbordersizeup = borderspotlightsize;
		function spotmousedown() {
			presstimer = window.setTimeout(function(){ 

			countupsizetimer = window.setInterval(function(){
				mathfullsizeup = Math.abs(mathfullsizeup) + Math.abs(1);
				mathbordersizeup = Math.abs(mathbordersizeup) + Math.abs(1);
				x = oldspotx;y = oldspoty;
				style = '-webkit-gradient(radial, '+x+' '+y+', '+mathfullsizeup+', '+x+' '+y+', '+mathbordersizeup+', from(' + lightcolor + '), to(rgba(0,0,0,0)))';
				spot.style.backgroundImage = style;
			}, 5);
			
		}, 1500);}
		function spotmouseup() {
			window.clearInterval(countupsizetimer);window.clearTimeout(presstimer);
			style = '-webkit-gradient(radial, '+x+' '+y+', '+fullspotlightsize+', '+x+' '+y+', '+borderspotlightsize+', from(' + lightcolor + '), to(rgba(0,0,0,0)))';
			spot.style.backgroundImage = style;
			mathfullsizeup = fullspotlightsize;
			mathbordersizeup = borderspotlightsize;
		}
		document.addEventListener("mousedown", function() {spotmousedown();});
		document.addEventListener("mouseup", function() {spotmouseup();});
		}
		else if(mousespotlightc == 'true'){
		var beginxcordinate = null;var beginycordinate = null;var endxcordinate = null;var endycordinate = null;
		var customview;var posx;var posy;var initx = false;var inity = false;
		
		// change size corner
var rect;var stretchable = false;var resizable = false;
var width, height, xpos, ypos;
var mouseX, mouseY, drawnX, drawnY, rX, rY;
var rand = 20;

function watchMouse(e) {
width = parseInt(rect.style.width); height = parseInt(rect.style.height);
xpos = parseInt(rect.style.left); ypos = parseInt(rect.style.top);

// Include possible scroll values
var sx = window.scrollX || document.documentElement.scrollLeft|| 0;
var sy = window.scrollY || document.documentElement.scrollTop|| 0;

if(!e) e = window.event;

var mouseX = e.clientX + sx;
var mouseY = e.clientY + sy;

/* Direction of mouse movement
  deltaX: -1 for left, 1 for right
  deltaY: -1 for up, 1 for down
*/
var deltaX = mouseX - rX;
var deltaY = mouseY - rY;
// Store difference in global variables
rX = mouseX;
rY = mouseY;
 

// left
if(mouseX <= xpos + rand && mouseX > xpos) { dragBorder("left", deltaX); document.body.style.cursor = "w-resize"; }
// right
else if(mouseX >= xpos + width +rand && mouseX < xpos + width + 2*rand ) { dragBorder("right", deltaX); document.body.style.cursor = "e-resize"; }
// top
else if(mouseY <= ypos + rand && mouseY > ypos) { dragBorder("top", deltaY); document.body.style.cursor = "n-resize"; }
// bottom
else if(mouseY >= ypos + height +rand && mouseY < ypos + height + 2*rand )  { dragBorder("bottom", deltaY); document.body.style.cursor = "s-resize"; }
// normal use
else { document.body.style.cursor = "auto"; }
}

function dragBorder(arg, delta) {
if(stretchable)  {
	if(arg == "right") { rect.style.width = (width + delta) + "px";
	$("stefanvdlightareoff3").style.width = (parseInt($("stefanvdlightareoff3").style.width) + delta) + "px";$("stefanvdlightareoff3").style.left = (parseInt($("stefanvdlightareoff3").style.left) + delta) + "px";
	}
	else if(arg == "left") { rect.style.width = (width - delta) + "px"; rect.style.left = (parseInt(rect.style.left) + delta) + "px";
	$("stefanvdlightareoff2").style.width = (parseInt($("stefanvdlightareoff2").style.width) + delta) + "px";
	}
	else if(arg == "bottom") { rect.style.height = (height + delta) + "px";
	$("stefanvdlightareoff4").style.height = (parseInt($("stefanvdlightareoff4").style.height) - delta) + "px";$("stefanvdlightareoff4").style.top = (parseInt($("stefanvdlightareoff4").style.top) + delta) + "px";
	$("stefanvdlightareoff2").style.height = (parseInt($("stefanvdlightareoff2").style.height) + delta) + "px";
	$("stefanvdlightareoff3").style.height = (parseInt($("stefanvdlightareoff3").style.height) + delta) + "px";
	}
	else if(arg == "top") { rect.style.height = (height - delta) + "px"; rect.style.top = (parseInt(rect.style.top) + delta) + "px";
	$("stefanvdlightareoff1").style.height = (parseInt($("stefanvdlightareoff1").style.height) + delta) + "px";
	$("stefanvdlightareoff2").style.height = (parseInt($("stefanvdlightareoff2").style.height) - delta) + "px";$("stefanvdlightareoff2").style.top = (parseInt($("stefanvdlightareoff2").style.top) + delta) + "px";
	$("stefanvdlightareoff3").style.height = (parseInt($("stefanvdlightareoff3").style.height) - delta) + "px";$("stefanvdlightareoff3").style.top = (parseInt($("stefanvdlightareoff3").style.top) + delta) + "px";
	}
}
}
//----		
		
		function getMouse(obj,e){
		posx = 0;posy = 0;
		var ev = (!e)?window.event:e;
		if (ev.clientX){
			posx = ev.clientX;
			posy = ev.clientY;
		}
		else{return 0}

		obj.addEventListener("mousedown", function(){
		initx = posx; inity = posy;
		beginxcordinate = posx;beginycordinate = posy;
		try {
			customview = $('stefanvdlightareoffcustom');
			customview.style.left = initx + 'px';customview.style.top = inity + 'px';
			document.body.appendChild(customview);
		}
		catch(err){}
		});
		obj.addEventListener("mouseup", function(){initx = false;inity = false;});
		if(initx){
		customview.style.width = Math.abs(posx - initx) + 'px';customview.style.height = Math.abs(posy - inity) + 'px';
		customview.style.left = posx - initx < 0 ?posx + 'px':initx + 'px';
		customview.style.top = posy - inity < 0 ?posy + 'px':inity + 'px';
		
		endxcordinate = posx;endycordinate = posy;
		// remove help div
		var stefanvdlightareoffcustom = $('stefanvdlightareoffcustom');
		if(stefanvdlightareoffcustom) {document.body.removeChild(stefanvdlightareoffcustom);}
		document.body.style.cursor = "default";
		
		// create corner
		var cornerison = $("stefanvdlightcorner");
		if(cornerison){}
		else {
			var newcornerdiv = document.createElement('div'); 
			newcornerdiv.setAttribute('id','stefanvdlightcorner');
			document.body.appendChild(newcornerdiv);
		}
		
		rect = $("stefanvdlightcorner");rect.onmousemove = watchMouse; 
		$("stefanvdlightcorner").addEventListener("mousedown", function(){ stretchable = true; }, false);
		$("stefanvdlightcorner").addEventListener("mouseup", function(){ stretchable = false; document.body.style.cursor = "auto"; }, false);
		$("stefanvdlightcorner").addEventListener("mouseout", function(){ stretchable = false; document.body.style.cursor = "auto"; }, false);

		$("stefanvdlightcorner").style.top = parseInt(document.getElementById("stefanvdlightareoff1").style.height) - 10 + "px";
		$("stefanvdlightcorner").style.height = parseInt(document.getElementById("stefanvdlightareoff2").style.height) - 20 + "px";
		$("stefanvdlightcorner").style.left = parseInt(document.getElementById("stefanvdlightareoff2").style.width) - 10 + "px";
		$("stefanvdlightcorner").style.width = parseInt(document.getElementById("stefanvdlightareoff3").style.left) - parseInt(document.getElementById("stefanvdlightareoff2").style.width) - 20 + "px";
		}
		
		else{return false}
		var viewpartwidth = customview.style.width;
		var viewpartheight = customview.style.height;
		
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
		view1.style.width = '100%';view1.style.height = beginycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);
		
		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = beginycordinate + 'px';
		view2.style.width = beginxcordinate + 'px';view2.style.height = viewpartheight;
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3awidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = endxcordinate + 'px';view3.style.top = beginycordinate + 'px';
		view3.style.width = viewcall3awidth + 'px';view3.style.height = viewpartheight;
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);
		
		var view4 = $('stefanvdlightareoff4');
		var viewcall4aheight = window.innerHeight - endycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = endycordinate + 'px';
		view4.style.width='100%';view4.style.height = viewcall4aheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);
		
		var calcpartx = endxcordinate - beginxcordinate;
		var calcparty = endycordinate - beginycordinate;
	if((calcpartx < 0) &&! (calcparty < 0)){ // X as automatic change view
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
		view1.style.width = '100%';view1.style.height = beginycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);	
	
		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = beginycordinate + 'px';
		view2.style.width = endxcordinate + 'px';view2.style.height = viewpartheight;
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3bwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = beginxcordinate + 'px';view3.style.top = beginycordinate + 'px';
		view3.style.width = viewcall3bwidth + 'px';view3.style.height = viewpartheight;
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);
		
		var view4 = $('stefanvdlightareoff4');
		var viewcall4bheight = window.innerHeight - endycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = endycordinate + 'px';
		view4.style.width='100%';view4.style.height = viewcall4bheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);
	}
	else if((calcparty < 0) &&! (calcpartx < 0)){ // Y as automatic change view
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
			if(endycordinate < 0){endycordinate = 0;}
		view1.style.width = '100%';view1.style.height = endycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);

		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = endycordinate + 'px';
		view2.style.width = beginxcordinate + 'px';
			if(endycordinate == 0){view2.style.height = beginycordinate + 'px';}else{view2.style.height = viewpartheight;}
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3cwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = endxcordinate + 'px';view3.style.top = endycordinate + 'px';
		view3.style.width = viewcall3cwidth + 'px';
			if(endycordinate == 0){view3.style.height = beginycordinate + 'px';}else{view3.style.height = viewpartheight;}
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);

		var view4 = $('stefanvdlightareoff4');
		var viewcall4cheight = window.innerHeight - endycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = beginycordinate + 'px';
		view4.style.width='100%';view4.style.height = viewcall4cheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);	
	}
	else if((calcpartx < 0) && (calcparty < 0)){ // X en Y as automatic change view
		var view1 = $('stefanvdlightareoff1');
		view1.className = 'stefanvdlightareoff';
		view1.style.left = 0 + 'px';view1.style.top = 0 + 'px';
			if(endycordinate < 0){endycordinate = 0;}
		view1.style.width = '100%';view1.style.height = endycordinate + 'px';
		view1.style.visibility = 'visible';
		document.body.appendChild(view1);
		
		var view2 = $('stefanvdlightareoff2');
		view2.className = 'stefanvdlightareoff';
		view2.style.left = 0 + 'px';view2.style.top = endycordinate + 'px';
		view2.style.width = endxcordinate + 'px';
			if(endycordinate == 0){view2.style.height = beginycordinate + 'px';}else{view2.style.height = viewpartheight;}
		view2.style.visibility = 'visible';
		document.body.appendChild(view2);
		
		var view3 = $('stefanvdlightareoff3');
		var viewcall3dwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = 'stefanvdlightareoff';
		view3.style.left = beginxcordinate + 'px';view3.style.top = endycordinate + 'px';
		view3.style.width = viewcall3dwidth + 'px';
			if(endycordinate == 0){view3.style.height = beginycordinate + 'px';}else{view3.style.height = viewpartheight;}
		view3.style.visibility = 'visible';
		document.body.appendChild(view3);		
		
		var view4 = $('stefanvdlightareoff4');
		var viewcall4dheight = window.innerHeight - beginycordinate; // calc height
		view4.className = 'stefanvdlightareoff';
		view4.style.left = 0 + 'px';view4.style.top = beginycordinate + 'px';
		view4.style.width = '100%';view4.style.height = viewcall4dheight + 'px';
		view4.style.visibility = 'visible';
		document.body.appendChild(view4);
	}
		}
		
		window.onmousemove = function(event){try {getMouse(window,event);}catch(err){}};
		
	    var newframe1 = document.createElement("div");
	    var newframe2 = document.createElement("div");
	    var newframe3 = document.createElement("div");
	    var newframe4 = document.createElement("div");
		var newframe5 = document.createElement("div");
	    newframe1.setAttribute('id','stefanvdlightareoff1');
	    newframe2.setAttribute('id','stefanvdlightareoff2');
	    newframe3.setAttribute('id','stefanvdlightareoff3');
	    newframe4.setAttribute('id','stefanvdlightareoff4');
	    newframe1.setAttribute('class','stefanvdlightareoff');
	    newframe2.setAttribute('class','stefanvdlightareoff');
	    newframe3.setAttribute('class','stefanvdlightareoff');
	    newframe4.setAttribute('class','stefanvdlightareoff');
		newframe5.setAttribute('id','stefanvdlightareoffcustom');
		newframe1.style.background = lightcolor;
		newframe2.style.background = lightcolor;
		newframe3.style.background = lightcolor;
		newframe4.style.background = lightcolor;
	    newframe2.style.visibility = 'hidden';
	    newframe3.style.visibility = 'hidden';
	    newframe4.style.visibility = 'hidden';
	    document.body.appendChild(newframe1);
	    document.body.appendChild(newframe2);
	    document.body.appendChild(newframe3);
	    document.body.appendChild(newframe4);
		document.body.appendChild(newframe5);
		document.body.style.cursor = 'crosshair'; // show cursor
		
	    // fade out effect      
		if(fadeout == 'true'){
		newframe1.addEventListener("click", function() {taart();});
		newframe2.addEventListener("click", function() {taart();});
		newframe3.addEventListener("click", function() {taart();});
		newframe4.addEventListener("click", function() {taart();});
		}
        else{
		newframe1.addEventListener("click", function() {taart();});
		newframe2.addEventListener("click", function() {taart();});
		newframe3.addEventListener("click", function() {taart();});
		newframe4.addEventListener("click", function() {taart();});
		}

        // fade in effect      
		if(fadein == 'true'){fader('show');}
        else{newframe1.style.opacity = default_opacity/100;newframe2.style.opacity = default_opacity/100;newframe3.style.opacity = default_opacity/100;newframe4.style.opacity = default_opacity/100;} // no fade effect
		}
		else if(mousespotlightt == 'true'){
		var newdiv = document.createElement('div'); 
        newdiv.setAttribute('id','stefanvdlightareoff1');
        newdiv.setAttribute('class','stefanvdlightareoff');
		newdiv.style.width = '100%'; 
        newdiv.style.height = '100%'; 
        newdiv.style.left = 0; 
        newdiv.style.top = 0; 
        newdiv.style.position = 'fixed';
		newdiv.style.pointerEvents = 'none'; // make it possible to click on a link 
		/* if image background, load it then */
			if (lightimagea == 'true'){newdiv.style.background = "url('"+lightimage+"')";newdiv.style.backgroundSize = "100% 100%";}
			else if(lightimagelin == 'true'){newdiv.style.background = 'linear-gradient(to ' + linearsq + ', ' + colora + ' ' + intervallina + '%,' + colorb + ' ' + intervallinb + '%)';}
			else {newdiv.style.background = lightcolor;}
		/*-------------*/    
        newdiv.style.opacity = 0;
        newdiv.style.zIndex = 999;
		
        document.body.appendChild(newdiv);
	  
	    // fade out effect      
		if(fadeout == 'true'){newdiv.addEventListener("click", function() {taart();})}
        else{newdiv.addEventListener("click", function() {taart();})}

        // fade in effect      
		if(fadein == 'true'){fader('show');}
        else{newdiv.style.opacity = default_opacity/100;} // no fade effect		
		}
		else { // Begin normal lights off		 
		var newdiv = document.createElement('div'); 
        newdiv.setAttribute('id','stefanvdlightareoff1');
        newdiv.setAttribute('class','stefanvdlightareoff');
		newdiv.style.width = '100%'; 
        newdiv.style.height = '100%'; 
        newdiv.style.left = 0; 
        newdiv.style.top = 0;
		if(cinemaontop == 'true'){
        newdiv.style.position = 'absolute';
		
		if(window.innerHeight > 870){ // height cinema
		newdiv.style.height = '100%';
		}else{
		newdiv.style.height = '870px';
		}		
		
		} else {
		newdiv.style.position = 'fixed';
		}
		/* if image background, load it then */
			if (lightimagea == 'true'){newdiv.style.background = "url('"+lightimage+"')";newdiv.style.backgroundSize = "100% 100%";}
			else if(lightimagelin == 'true'){newdiv.style.background = 'linear-gradient(to ' + linearsq + ', ' + colora + ' ' + intervallina + '%,' + colorb + ' ' + intervallinb + '%)';}
			else {newdiv.style.background = lightcolor;}
		/*-------------*/    
        newdiv.style.opacity = 0;
        newdiv.style.zIndex = 999;
		
		// Motion fall down effect
		if (slideeffect == 'true'){
		// -webkit-animation: totlbounceInDown 1.5s 0.0s linear 1;
		newdiv.style.WebkitAnimation = "totlbounceInDown 1.5s 0.0s linear 1";
		slideeffect = 'false';
		chrome.storage.local.set({"slideeffect": "false"});
		}
        document.body.appendChild(newdiv);

	    // fade out effect      
		if(fadeout == 'true'){newdiv.addEventListener("click", function() {taart();})}
        else{newdiv.addEventListener("click", function() {taart();})}

        // fade in effect      
		if(fadein == 'true'){fader('show');}
        else{newdiv.style.opacity = default_opacity/100;} // no fade effect
		}
		
		// blur effect
		if(blur == 'true'){
			// disable for on YouTube website
			if (window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){}
			else{
			/*chrome.extension.sendMessage({name: 'currenttabforblur'}, function(response) {
				var img = response.screenshotUrl;
				var newblur = document.createElement('img');
				newblur.setAttribute('id','stefanvdblurimage');
				newblur.setAttribute('src','' + img + '');
				newblur.style.width = '100%';
				newblur.style.height = '100%';
				newblur.style.left = 0;
				newblur.style.top = 0;
				newblur.style.position = 'absolute';
				newblur.style.zIndex = 998;
				document.body.appendChild(newblur);

				for (var bcount=0; bcount<4; bcount++) {
				newblur.style.webkitFilter = 'blur(' + bcount + 'px)';
				}
			});
			*/
				
			(function(exports){function urlsToAbsolute(nodeList){if(!nodeList.length){return[];}
var attrName='href';if(nodeList[0].__proto__===HTMLImageElement.prototype||nodeList[0].__proto__===HTMLScriptElement.prototype){attrName='src';}
nodeList=[].map.call(nodeList,function(el,i){var attr=el.getAttribute(attrName);if(!attr){return;}
var absURL=/^(https?|data):/i.test(attr);if(absURL){return el;}else{return el;}});return nodeList;}
function screenshotPage(){urlsToAbsolute(document.images);urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));var screenshot=document.documentElement.cloneNode(true);var b=document.createElement('base');b.href=document.location.protocol+'//'+location.host;var head=screenshot.querySelector('head');head.insertBefore(b,head.firstChild);screenshot.style.pointerEvents='none';screenshot.style.overflow='hidden';screenshot.style.webkitUserSelect='none';screenshot.style.mozUserSelect='none';screenshot.style.msUserSelect='none';screenshot.style.oUserSelect='none';screenshot.style.userSelect='none';screenshot.dataset.scrollX=window.scrollX;screenshot.dataset.scrollY=window.scrollY;var script=document.createElement('script');script.textContent='('+addOnPageLoad_.toString()+')();';screenshot.querySelector('body').appendChild(script);var blob=new Blob([screenshot.outerHTML],{type:'text/html'});return blob;}
function addOnPageLoad_(){window.addEventListener('DOMContentLoaded',function(e){var scrollX=document.documentElement.dataset.scrollX||0;var scrollY=document.documentElement.dataset.scrollY||0;window.scrollTo(scrollX,scrollY);});}
function doScreenshot(){window.URL=window.URL||window.webkitURL;

var B = document.body, H = document.documentElement, blurheight;
if(document.height !== undefined) {
    blurheight = document.height // For webkit browsers
} else {
    blurheight = Math.max( B.scrollHeight, B.offsetHeight,H.clientHeight, H.scrollHeight, H.offsetHeight );
}

				var newiframeblur = document.createElement('iframe');
				newiframeblur.setAttribute('id','stefanvdblurimage');
				newiframeblur.setAttribute('src','' + window.URL.createObjectURL(screenshotPage()) + '');
				newiframeblur.style.width = '100%'; 
				newiframeblur.style.height = blurheight + 'px'; 
				newiframeblur.style.left = 0; 
				newiframeblur.style.top = 0;
				newiframeblur.style.position = 'absolute';
				newiframeblur.style.zIndex = 998;
                newiframeblur.style.border = '0px';
				document.body.appendChild(newiframeblur);

				for (var bcount=0; bcount<4; bcount++) {
				newiframeblur.style.webkitFilter = 'blur(' + bcount + 'px)';
				}
}
exports.screenshotPage=screenshotPage;exports.doScreenshot=doScreenshot;})(window);
doScreenshot();
			}
		}

/////////// Turn Off the Lights reader slider
	// Show always option
	if(readera == 'true'){
	// script readerbar
	function showValue(newValue){$("totlgammaVal").value = newValue;$("totlrange").value = newValue;div = document.getElementsByTagName("div");
	for(var i = 0; i < div.length; i++ ){if(div[i].className == ("stefanvdlightareoff")) {div[i].style.opacity = (newValue/100);}}}

	function toggle_small() {
	var totlreader = $("__totl-tidbit-box");var totlreadermin = $("__totl-min");
	if ( totlreader.style.width != "24px" ) {totlreader.style.width = "24px";totlreader.style.height = "24px";totlreadermin.style.opacity = "0";}
	else {totlreader.style.width = "";totlreader.style.height = "";totlreadermin.style.opacity = "100";}}

	// Injected js to page
	var totlreaderbar = document.createElement('div');
	totlreaderbar.setAttribute('id','totlreaderbar');
	document.body.appendChild(totlreaderbar);
	var totlreaderbardiv1 = document.createElement('div');
	totlreaderbardiv1.setAttribute('id','__totl-tidbit-box');

	// if false then use small view
	if(readerlargestyle == 'false'){totlreaderbardiv1.style.width = "24px";totlreaderbardiv1.style.height = "24px";}

	totlreaderbar.appendChild(totlreaderbardiv1);
	var totlreaderbardiv2 = document.createElement('div');
	totlreaderbardiv2.setAttribute('id','__totl-wrapper');
	totlreaderbardiv1.appendChild(totlreaderbardiv2);
	var totlreaderbarimg1 = document.createElement('img');
	totlreaderbarimg1.setAttribute('id','__totl-min');
	totlreaderbarimg1.setAttribute('src',''+chrome.extension.getURL("/images/minimize.png")+'');
	totlreaderbarimg1.addEventListener('click', function (e) {toggle_small()}, true);
	totlreaderbarimg1.addEventListener("mouseover", function (e) {totlreaderbarimg1.setAttribute('src',''+chrome.extension.getURL("/images/minimize_on.png")+'');}, false);
	totlreaderbarimg1.addEventListener("mouseout", function (e) {totlreaderbarimg1.setAttribute('src',''+chrome.extension.getURL("/images/minimize.png")+'');}, false);

	// if false then use small view
	if(readerlargestyle == 'false'){totlreaderbarimg1.style.opacity = "0";}

	totlreaderbardiv2.appendChild(totlreaderbarimg1);
	var totlreaderbardiv3 = document.createElement('div');
	totlreaderbardiv3.setAttribute('id','__totl-box-info');
	totlreaderbardiv3.className = '__totl-box-title';
	totlreaderbardiv3.addEventListener('click', function (e) {toggle_small()}, true);
	totlreaderbardiv2.appendChild(totlreaderbardiv3);
	var totlreaderbarimagelogo = document.createElement('img');
	totlreaderbarimagelogo.className = '__totl-icon';
	if(window.devicePixelRatio >= 2){totlreaderbarimagelogo.src = chrome.extension.getURL("/icons/icon16@2x.png");}
	else {totlreaderbarimagelogo.src = chrome.extension.getURL("/icons/icon16.png");}
	totlreaderbardiv3.appendChild(totlreaderbarimagelogo);
	var totlreaderbarspan1 = document.createElement('span');
	totlreaderbarspan1.className = '__totl-nowrap';
	totlreaderbardiv3.appendChild(totlreaderbarspan1);
	var totlreaderbartxt1 = document.createTextNode('Turn Off the Lights');
	totlreaderbarspan1.appendChild(totlreaderbartxt1);
	var totlreaderbardiv4 = document.createElement('div');
	totlreaderbardiv4.setAttribute('id','__totl-box-tidbits');
	totlreaderbardiv2.appendChild(totlreaderbardiv4);
	var totlreaderbardiv5 = document.createElement('div');
	totlreaderbardiv5.className = '__totl-box-msg';
	totlreaderbardiv4.appendChild(totlreaderbardiv5);
	var totlreaderbartable1 = document.createElement('table');
	totlreaderbardiv5.appendChild(totlreaderbartable1);
	var totlreaderbartbody1 = document.createElement('tbody');
	totlreaderbartable1.appendChild(totlreaderbartbody1);
	var totlreaderbartr1 = document.createElement('tr');
	totlreaderbartbody1.appendChild(totlreaderbartr1);
	var totlreaderbartd1 = document.createElement('td');
	totlreaderbartr1.appendChild(totlreaderbartd1);
	var totlreaderbarinput1 = document.createElement('input');
	totlreaderbarinput1.setAttribute('type','range');
	totlreaderbarinput1.setAttribute('id','totlrange');
	totlreaderbarinput1.setAttribute('min','0');
	totlreaderbarinput1.setAttribute('max','100');
	totlreaderbarinput1.setAttribute('step','1');
	totlreaderbarinput1.setAttribute('value','0');
	totlreaderbarinput1.addEventListener('change', function (e) {showValue(this.value)}, true);
	totlreaderbartd1.appendChild(totlreaderbarinput1);
	var totlreaderbartd2 = document.createElement('td');
	totlreaderbartr1.appendChild(totlreaderbartd2);
	var totlreaderbarinput2 = document.createElement('input');
	totlreaderbarinput2.setAttribute('id','totlgammaVal');
	totlreaderbarinput2.setAttribute('maxlength','3');
	totlreaderbarinput2.setAttribute('size','3');
	totlreaderbarinput2.setAttribute('type','text');
	totlreaderbarinput2.setAttribute('value','0');
	totlreaderbarinput2.addEventListener('change', function (e) {showValue(this.value)}, true);
	totlreaderbartd2.appendChild(totlreaderbarinput2);

// settings reader slider
	$('totlgammaVal').value = interval;
	$('totlrange').value = interval;
} //End option always

// start dynamic
		if(dynamic == 'true'){
			var newdynmaster = document.createElement("div");newdynmaster.setAttribute('id','stefanvddynamicbackground');document.body.appendChild(newdynmaster);
			if(dynamic1 == 'true'){
				var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundbubbleleft');newdynmaster.appendChild(newdynleft);
				for(var i = 0; i < 5; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynleft.appendChild(newdyn);}
				var newdynmid = document.createElement("div");newdynmid.setAttribute('class','stefanvddynamicbackgroundbubblemid');newdynmaster.appendChild(newdynmid);
				for(var i = 6; i < 10; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynmid.appendChild(newdyn);}
				var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundbubbleright');newdynmaster.appendChild(newdynright);	
				for(var i = 11; i < 16; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundbubbles stefanvddynamicbubbles'+i+'');newdynright.appendChild(newdyn);}				
			}
			else if(dynamic2 == 'true'){
				var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');newdynmaster.appendChild(newdynleft);
				for(var i = 1; i < 21; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundblocks stefanvddynamicblocks'+i+'');newdynleft.appendChild(newdyn);}
				var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundblockright');newdynmaster.appendChild(newdynright);
				for(var i = 22; i < 42; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundblocks stefanvddynamicblocks'+i+'');newdynright.appendChild(newdyn);}
			}
			else if(dynamic3 == 'true'){
				var newdynleft = document.createElement("div");newdynleft.setAttribute('class','stefanvddynamicbackgroundblockleft');newdynmaster.appendChild(newdynleft);
				for(var i = 0; i < 15; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundraindrups b'+i+'');newdynleft.appendChild(newdyn);}
				var newdynright = document.createElement("div");newdynright.setAttribute('class','stefanvddynamicbackgroundblockright');newdynmaster.appendChild(newdynright);
				for(var i = 16; i < 31; i++ ){var newdyn = document.createElement("div");newdyn.setAttribute('class','stefanvddynamicbackgroundraindrups b'+i+'');newdynright.appendChild(newdyn);}
			}
			else if(dynamic4 == 'true'){
				var newdynworld = document.createElement("div");newdynworld.setAttribute('id','stefanvdworld');newdynmaster.appendChild(newdynworld);			
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
	
	function update(){
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
			else if(dynamic5 == 'true'){
			
			if(hoveroptiondyn5 == 'true'){
				var newdynspaceworld = document.createElement("div");newdynspaceworld.setAttribute('id','stefanvddynamicspace');newdynmaster.appendChild(newdynspaceworld);			
				for(var j = 1; j < 17; j++ ){
				if(j<=9){j="0"+j}
					var newdynpart1 = document.createElement("div");
					newdynpart1.setAttribute('id','p'+ j);newdynspaceworld.appendChild(newdynpart1);
					for(var i = 1; i < 31; i++ ){
					if(i<=9){i="0"+i}
					var newdynlow = document.createElement("b");newdynlow.setAttribute('class','s0'+i+'');newdynpart1.appendChild(newdynlow);
					}
				}
			} else {
				var newdynspaceworld = document.createElement("div");newdynspaceworld.setAttribute('id','stefanvddynamicspacenoflying');newdynmaster.appendChild(newdynspaceworld);			
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
				
			}else if(dynamic6 == 'true'){
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
			var canvasHeight = 200;

			// Create an image object (only need one instance)
			var imageObj = new Image();

			// Once the image has been downloaded then set the image on all of the particles
			imageObj.onload = function() {
				particles.forEach(function(particle) {
						particle.setImage(imageObj);
				});
			};

			// Once the callback is arranged then set the source of the image
			imageObj.src = chrome.extension.getURL("/images/Smoke10.png");

			// A function to create a particle object.
			function Particle(context) {

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
				this.draw = function() {
					
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
				this.update = function() {
					// Update the position of the particle with the addition of the velocity.
					this.x += this.xVelocity;
					this.y += this.yVelocity;

					// Check if has crossed the right edge
					if (this.x >= canvasWidth) {
						this.xVelocity = -this.xVelocity;
						this.x = canvasWidth;
					}
					// Check if has crossed the left edge
					else if (this.x <= 0) {
						this.xVelocity = -this.xVelocity;
						this.x = 0;
					}

					// Check if has crossed the bottom edge
					if (this.y >= canvasHeight) {
						this.yVelocity = -this.yVelocity;
						this.y = canvasHeight;
					}
					
					// Check if has crossed the top edge
					else if (this.y <= 0) {
						this.yVelocity = -this.yVelocity;
						this.y = 0;
					}
				};

				// A function to set the position of the particle.
				this.setPosition = function(x, y) {
					this.x = x;
					this.y = y;
				};

				// Function to set the velocity.
				this.setVelocity = function(x, y) {
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
			function runsmoke() {
				var canvas = document.getElementById('stefanvddynamicsmoke');
				if (canvas.getContext) {
					// Set the context variable so it can be re-used
					context = canvas.getContext('2d');
					// Create the particles and set their initial positions and velocities
					for(var i=0; i < particleCount; ++i){
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
			function draw() {
				// Clear the drawing surface and fill it with a black background
				context.fillStyle = "rgba(0, 0, 0, 0.0)";
				context.fillRect(0, 0, 400, 400);

				// Go through all of the particles and draw them.
				particles.forEach(function(particle) {
					particle.draw();
				});
			}

			// Update the scene
			function update() {
				particles.forEach(function(particle) {
					particle.update();
				});
			}

			// Initialize the scene
			runsmoke();

			// If the context is set then we can draw the scene (if not then the browser does not support canvas)
			if (context) {
				setInterval(function() {
					// Update the scene before drawing
					update();

					// Draw the scene
					draw();
				}, 1000 / targetFPS);
			}

			}else if(dynamic7 == 'true'){
			var flyingdots = document.createElement("div");flyingdots.setAttribute('id','flyingdots');newdynmaster.appendChild(flyingdots);
			var newdyndotsworld = document.createElement("div");newdyndotsworld.setAttribute('id','stefanvddynamicdots');flyingdots.appendChild(newdyndotsworld);			
				for(var j = 1; j < 100; j++ ){
					var newminic = document.createElement("div");
					newminic.className = "c";
					newdyndotsworld.appendChild(newminic);
				}
			}else if(dynamic8 == 'true'){
			var storm = document.createElement("div");storm.setAttribute('id','storm');newdynmaster.appendChild(storm);
			var newstormcanvas = document.createElement("canvas");newstormcanvas.setAttribute('id','stefanvddynamicstorm');newstormcanvas.style.width = "100%";newstormcanvas.style.height = "100%";storm.appendChild(newstormcanvas);	

			var stormcanvas = document.getElementById('stefanvddynamicstorm');
			var sky = stormcanvas.getContext('2d');

			var window_width = window.innerWidth * 1.5;
			var window_height = window.innerHeight * 1.5;

			var fall_speed = 0.7;
			var wind_speed = 5;

			var rain_weight = 0.11;
			var rain_color = '255,255,255';

			var drop_count;
			var drops = [];

			function randomFrom(min, max) {
			  return (Math.random() * (max - min) + min);
			}

			function resizer() {
			  window_width = window.innerWidth * 1.5;
			  window_height = window.innerHeight * 1.5;
			  drop_count = window_width * rain_weight;
			  
			  stormcanvas.setAttribute('width', window_width);
			  stormcanvas.setAttribute('height', window_height);
			}

			window.addEventListener('resize', resizer, false);

			function paintSky() {
			  for (var i = 0; i < drop_count; i++) {
				drops[i] = new drop();
				drops[i].reset();
			  }
			  
			  rain();
			}

			function rain() {
			  sky.clearRect(0, 0, window_width, window_height);

			  var drops_length = drops.length;

			  for (var i = 0; i < drops_length; i++) {
				var drop = drops[i];
				drop.fall();
				drop.draw();
			  }

			  window.requestAnimFrame(rain);
			}

			function drop() {
			  this.reset = function() {
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
			  
			  this.render = function() {
				var canv = document.createElement('canvas');
				var ctx = canv.getContext('2d');
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
			  
			  this.draw = function() {
				sky.drawImage(this.drip, this.x, this.y);
			  };
			  
			  this.fall = function() {
				this.x += this.dx;
				this.y += this.dy;
				
				if (this.y > (window_height * 1.25)) {
				  this.reset();
				}
			  };
			}

			resizer();
			paintSky();
			}else if(dynamic9 == 'true'){
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

				for(var y = 0; y < numPointsY; y++) {
					for(var x = 0; x < numPointsX; x++) {
						points.push({x:unitWidth*x, y:unitHeight*y, originX:unitWidth*x, originY:unitHeight*y});
					}
				}

				randomize();

				for(var i = 0; i < points.length; i++) {
					if(points[i].originX != unitWidth*(numPointsX-1) && points[i].originY != unitHeight*(numPointsY-1)) {
						var topLeftX = points[i].x;
						var topLeftY = points[i].y;
						var topRightX = points[i+1].x;
						var topRightY = points[i+1].y;
						var bottomLeftX = points[i+numPointsX].x;
						var bottomLeftY = points[i+numPointsX].y;
						var bottomRightX = points[i+numPointsX+1].x;
						var bottomRightY = points[i+numPointsX+1].y;

						var rando = Math.floor(Math.random()*2);

						for(var n = 0; n < 2; n++) {
							var polygon = document.createElementNS(triasvg.namespaceURI, 'polygon');

							if(rando==0) {
								if(n==0) {
									polygon.point1 = i;
									polygon.point2 = i+numPointsX;
									polygon.point3 = i+numPointsX+1;
									polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+bottomRightX+','+bottomRightY);
								} else if(n==1) {
									polygon.point1 = i;
									polygon.point2 = i+1;
									polygon.point3 = i+numPointsX+1;
									polygon.setAttribute('points',topLeftX+','+topLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
								}
							} else if(rando==1) {
								if(n==0) {
									polygon.point1 = i;
									polygon.point2 = i+numPointsX;
									polygon.point3 = i+1;
									polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY);
								} else if(n==1) {
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

			function randomize() {
				for(var i = 0; i < points.length; i++) {
					if(points[i].originX != 0 && points[i].originX != unitWidth*(numPointsX-1)) {
						points[i].x = points[i].originX + Math.random()*unitWidth-unitWidth/2;
					}
					if(points[i].originY != 0 && points[i].originY != unitHeight*(numPointsY-1)) {
						points[i].y = points[i].originY + Math.random()*unitHeight-unitHeight/2;
					}
				}
			}

			function refresh() {
				randomize();
				for(var i = 0; i < document.querySelector('#triangle svg').childNodes.length; i++) {
					var polygon = document.querySelector('#triangle svg').childNodes[i];
					var animate = polygon.childNodes[0];
					if(animate.getAttribute('to')) {
						animate.setAttribute('from',animate.getAttribute('to'));
					}
					animate.setAttribute('to',points[polygon.point1].x+','+points[polygon.point1].y+' '+points[polygon.point2].x+','+points[polygon.point2].y+' '+points[polygon.point3].x+','+points[polygon.point3].y);
					animate.beginElement();
				}
				refreshTimeout = window.setTimeout(function() {refresh();}, refreshDuration);
			}

			trianglerun();
			
			function onResize() {
			document.querySelector('#triangle svg').remove();
			window.clearTimeout(refreshTimeout);
			trianglerun();
			}

			window.onresize = onResize;
			}else if(dynamic10 == 'true'){
			var stars = document.createElement("div");stars.setAttribute('id','stars');newdynmaster.appendChild(stars);
				for(var j = 1; j < 3; j++ ){
					var newmstar = document.createElement("div");
					newmstar.id = "mstars"+[j];
					stars.appendChild(newmstar);
				}
			}
		} // end dynamic
	}
	
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
    if (DIVElementById.style.opacity <= 0)
    {document.body.removeChild(DIVElementById);removenewframe();}
  }
//control opacity for all <div>
var div = document.querySelectorAll('div.stefanvdlightareoff');
for(var i = 0; i < div.length; i++ ){div[i].style.opacity = opacity/100;}
} catch(e){}
}