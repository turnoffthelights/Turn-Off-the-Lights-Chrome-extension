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

chrome.storage.sync.get(['block60fps'], function(response){
var block60fps = response['block60fps'];
if(block60fps == true){
try{
chrome.runtime.sendMessage({name: 'sendfps'});
chrome.runtime.onMessage.addListener(
function(request, sender){
    if(request.name == "injectfps"){var script = document.createElement("script");script.type = "text/javascript";script.textContent = request.message;script.onload = function(){this.parentNode.removeChild(this);};document.getElementsByTagName("head")[0].appendChild(script);}
});
}catch(e){}
}});