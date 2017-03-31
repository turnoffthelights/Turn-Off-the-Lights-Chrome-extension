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
var stefanvdspeechbox = $('stefanvdspeechbox');
if(!stefanvdspeechbox){
var newspeechbox = document.createElement('div');
newspeechbox.setAttribute('id','stefanvdspeechbox');
document.body.appendChild(newspeechbox);

var newspeechdiv = document.createElement('div'); 
newspeechdiv.setAttribute('class','stefanvdspeechloading');
newspeechbox.appendChild(newspeechdiv);

// icon
var newspeechimage = document.createElement('div');
newspeechimage.setAttribute('class', 'speechicon');
newspeechdiv.appendChild(newspeechimage);

var newspeechicona = document.createElement('div');
newspeechicona.setAttribute('class', '_Xu');
newspeechimage.appendChild(newspeechicona);

var newspeechiconb = document.createElement('span');
newspeechiconb.setAttribute('class', '_Kv');
newspeechicona.appendChild(newspeechiconb);

var newspeechiconc = document.createElement('div');
newspeechiconc.setAttribute('class', '_kR');
newspeechicona.appendChild(newspeechiconc);

var newspeechicond = document.createElement('span');
newspeechicond.setAttribute('class', '_lw');
newspeechiconc.appendChild(newspeechicond);

var newspeechicone = document.createElement('span');
newspeechicone.setAttribute('class', '_ew');
newspeechiconc.appendChild(newspeechicone);

//---

var newspeechbrand = document.createElement('div');
newspeechbrand.setAttribute('class','stefanvdspeechbrand');
newspeechbrand.innerText = "Turn Off the Lights™";
newspeechbox.appendChild(newspeechbrand);

var newspeechsaidtext = document.createElement('div');
newspeechsaidtext.setAttribute('id','stefanvdspeechsaidtext');
newspeechbox.appendChild(newspeechsaidtext);
}