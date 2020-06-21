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

function startinit(){
// Check for live API permissions  
navigator.permissions.query({name:'camera'})
.then(function(permissionStatus){
  permissionStatus.onchange = function(){
	if(this.state == "granted"){
		var lol = window.self;
		lol.opener = window.self;
		lol.close();
	}else{
		var lol = window.self;
		lol.opener = window.self;
		lol.close();
	}
  };
});

	navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	if(navigator.mediaDevices.getUserMedia){
		navigator.mediaDevices.getUserMedia({audio: false, video: true})
		.then(function(stream){
			//Display the video stream in the video object
			localMediaStream = stream; // Store the video stream
			video.srcObject = stream;
		 })
		 .catch(function(e){ console.log(e.name + ": " + e.message);
		});
	}
	else{
	navigator.getWebcam({audio: false, video: true}, 
		 function(stream){
			//Display the video stream in the video object
			localMediaStream = stream; // Store the video stream
			video.srcObject = stream;
		 }, 
		 function(){ console.log("Web cam is not accessible."); });
	}
}

document.addEventListener('DOMContentLoaded', function(){startinit();},false);