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
if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
	var sp = document.getElementById('movie_player');
	var video = document.querySelector('video');
	
	if(typeof(sp.pauseVideo) === "function"){
		sp.pauseVideo();
	}else if(typeof(video.pause) === "function"){
		video.pause();
	}
} else{
	var htmlplayer = document.getElementsByTagName("video");
	if(htmlplayer !== null){
		var j;
		var l = htmlplayer.length;
		for(j=0; j<l; j++){
	   		if(htmlplayer[0]){ htmlplayer[0].pause(); }
		}
	}
}