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
$('slider').value = default_opacity;$('example1').style.opacity = (default_opacity/100);$('example2').style.opacity = (default_opacity/100);
$('arangeblur').value = default_arangeblur;
$('arangespread').value = default_arangespread;
function showValue(newValue){$('interval').value = newValue;$('slider').value = newValue;$('example1').style.opacity = (newValue/100);$('example2').style.opacity = (newValue/100);}
function showambilightblurValue(newValue){$('ambilightrangeblurradius').value = newValue;$('arangeblur').value = newValue;}
function showambilightspreadValue(newValue){$('ambilightrangespreadradius').value = newValue;$('arangespread').value = newValue;}