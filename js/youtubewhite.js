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
var currenturl = window.location.protocol + '//' + window.location.host;
if((currenturl.substring(0, 23) == 'https://apis.google.com')|| (currenturl.substring(0, 27) == 'https://plus.googleapis.com')){

var stefanvdnightmode = $('stefanvdnightmode');
if(stefanvdnightmode) {document.body.removeChild(stefanvdnightmode);}

var link = document.createElement("style");
link.setAttribute("type", "text/css");
link.setAttribute("id", "stefanvdnightmode");
link.innerHTML = ".dga, .nbc.xta, .zbHZJb { background: white !important; border-color: white !important; } .Uk.vKa, .wi.we.Wva, .go, .ho, .nbc.xta {border: 0px !important; border-radius: 0px !important;} .xPa, .yPa, .d-s.L5.r0, .dP.PA, .Hma, .b-c-Ba, .zVeWr.FnlLyd, .d-k-l.b-c.b-c-R:not(.vSH9Nc), .t-Pa-mb-c-oa.t-Pa-mb-c { background: white !important; background: -moz-linear-gradient(center top , #ffffff, #ffffff) repeat scroll 0 0 #ffffff !important; background: -webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#ffffff)) !important; border: 1px #d9d9d9 solid !important; border-radius: 3px !important; } .esw.eswd.qk.Gc, .Dg.Ut, .Dt.wu, .IO, .KPc.tQb, .sk {border-color: #555 !important;} .Hma .Pga.d-A:hover, .zVeWr.FnlLyd:hover, .d-k-l.b-c.b-c-R:not(.vSH9Nc):hover, .Kza, .IO, .esw.eswd.qk.Gc, .Dg.Ut {background: #444 !important;} .KPc.tQb {background: #fff !important;} .YH.WD.d-r, .WD.d-r, .G-q, .G-q-O, .QOb, .ROb, .g-h-f-vc-B, .g-h-f-V-Lb, .zta.f4a, .ki.ve, .qac.kPa, .mac, .Oub.d-r-Gk.d-r, .Rzc, .DM .Cx.fr, .Y8b .TD, .sk, .g-h-f-p-aa, .d-r.d-r-ih {background: #222 !important;} .Nza, .Dwa.e4, .cp, .WD .d-A:hover, .vQ.ur, .g-h-f-V-Lb .d-A:hover, .d-A.d-A-yb.X, .MNn0h.UtvBtc, .aac, .IPc.nfe, .Dt.wu, .Pub.d-A:hover, .d-A.osa:hover, .Up.Dr.tw.Yt {background-color: #fff !important;} .yJa, .uPa.BJa, .Mza.mj, .DJa, .tvb {background: white !important;} .Ub {background: none !important;} .Mga, .xac {display: none !important;} .zVeWr.FnlLyd, .Ub, .M7Fqc, .vQ.ur, .d-k-l.b-c, .YGETNc:hover {color: #2793e6 !important;} .Ig.At.dn.mea, a, .Aq.DK.Bt.UR.gA, .d-s.L5.r0, .Hma, .xPa, .dP.PA, .d-k-l.d-y-r-c-ha, .d-A-B, .d-s.LEa, .Mpa, .DJa, .df, .d-s.vy, .Ct, .dga, .d-s, .YGETNc, .Y9b .Jub, .Y9b .Hub {color: #333 !important;} a:visited, a:visited font, a:visited .title, a:visited span, .zbHZJb, .d-s.nq, .d-s.mq {color: #2793e6 !important;} .uPc {color: #009614 !important;} .Kub .vwa {background: #555 !important; border-radius: 5px !important;} .swb.vac.vwa {padding-right: 10px !important;} .G-q-Ya {background: rgba(0,0,0,1) !important;}";
document.body.appendChild(link);
}