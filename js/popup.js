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

var darkmode;

document.addEventListener('DOMContentLoaded', function(){
    chrome.storage.sync.get(['darkmode'], function(items){
        darkmode = items['darkmode'];if(darkmode == null)darkmode = false; // default darkmode false

        // dark mode
        if(darkmode == true){
            document.body.className = 'dark';
        }else{
            document.body.className = 'light';
        }
    });
$("opendonate").addEventListener('click', function(){chrome.tabs.create({url: donatewebsite, active:true})});
$("openrate").addEventListener('click', function(){chrome.tabs.create({url: writereview, active:true})});
$("openoptions").addEventListener('click', function(){chrome.tabs.create({url: chrome.extension.getURL('options.html'), active:true})});

$("opensupport").addEventListener('click', function(){chrome.tabs.create({url: linksupport, active:true})});
$("openwelcomeguide").addEventListener('click', function(){chrome.tabs.create({url: linkguide, active:true})});
$("openyoutube").addEventListener('click', function(){chrome.tabs.create({url: linkyoutube, active:true})});

$("openemail").addEventListener('click', function(){var sturnoffthelightemail = "mailto:your@email.com?subject="+chrome.i18n.getMessage("sharetexta")+"&body="+chrome.i18n.getMessage("sharetextb")+" "+turnoffthelightsproduct;chrome.tabs.create({url: sturnoffthelightemail, active:true})});
$("openfacebook").addEventListener('click', function(){chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u="+turnoffthelightsproduct, active:true})});
$("opentwitter").addEventListener('click', function(){var sturnoffthelightsproductcodeurl = encodeURIComponent(chrome.i18n.getMessage("sharetextc")+" "+turnoffthelightsproduct);chrome.tabs.create({url: "https://twitter.com/home?status="+sturnoffthelightsproductcodeurl, active:true})});
});