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

(ytCinema = {
	players: {objs: [], active: 0},
	messageEvent: new Event('ytCinemaMessage'),
	playerStateChange: function(stateId){
		var message = document.getElementById("ytCinemaMessage"),
			stateIO = "playerStateChange:".concat(stateId);
		// console.log("Debug " + message.textContent + " " +stateIO);
		if(message && message.textContent !== stateIO){
			message.textContent = stateIO;
			message.dispatchEvent(ytCinema.messageEvent);
		}
	},
	initialize: function(){
		this.messageEvent;
		window.addEventListener("load", initvideoinject, false);
        document.addEventListener("DOMContentLoaded", initvideoinject, false);
		initvideoinject();
 
 		// New Mutation Summary API Reference
 		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
 		if(MutationObserver){
 		// setup MutationSummary observer
 		var videolist = document.querySelector('body');
 		var observer = new MutationObserver(function(mutations, observer){
 		    mutations.forEach(function(mutation){
 		        if(mutation.target.tagName == "VIDEO"){
 		            if(mutation.attributeName === "src"){
 		                initvideoinject();
 		            }
 		        }
 		        if(typeof mutation.addedNodes == "VIDEO" || typeof mutation.removedNodes == "VIDEO"){
 		            initvideoinject();
 		        }
 		    });
        });
 
 		observer.observe(videolist, {
                  subtree: true,       // observe the subtree rooted at ...videolist...
                  childList: true,     // include childNode insertion/removals
                  characterData: false, // include textContent changes
                  attributes: true     // include changes to attributes within the subtree
                  });
 		}else{
 		// setup DOM event listeners
 		document.addEventListener("DOMNodeRemoved", initvideoinject, false);
 		document.addEventListener("DOMNodeInserted", initvideoinject, false);
 		}

		function initvideoinject(e){
			var youtubeplayer = document.getElementById("movie_player") || null;
			var htmlplayer = document.getElementsByTagName("video") || false;
			
			if(youtubeplayer !== null){ // YouTube video element
				var interval = window.setInterval(function(){
					if(youtubeplayer.pause || youtubeplayer.pauseVideo){
						window.clearInterval(interval);
						if(youtubeplayer.pauseVideo){youtubeplayer.addEventListener("onStateChange", "ytCinema.playerStateChange");}
					}
				}, 10);
			}
			if(htmlplayer && htmlplayer.length > 0){ // HTML5 video elements
				var setPlayerEvents = function(players){
					var j;
					var l = players.length;
					for(j=0; j<l; j++){
						(function(o, p){
							var ev = {
								pause: function(){if(!p.ended){o.players.active -= 1;}if(o.players.active < 1){o.playerStateChange(2);}},
								play: function(){o.players.active += 1;o.playerStateChange(1);},
								ended: function(){o.players.active -= 1;if(o.players.active < 1){o.playerStateChange(0);}}
							};
							p.removeEventListener("pause", ev.pause); p.removeEventListener("play", ev.play); p.removeEventListener("ended", ev.ended);
							
							p.addEventListener("pause", ev.pause);
							p.addEventListener("play", ev.play);
							p.addEventListener("ended", ev.ended);
							o.players.objs.push(p);
						}(this.ytCinema, htmlplayer[j]));
					}
				};
				
				setPlayerEvents(htmlplayer);
 
				(function(o){		
					var triggerDOMChanges = function(){
						var htmlplayer = document.getElementsByTagName("video") || null;
						
						if(htmlplayer == null || htmlplayer.length === 0){o.players.active = 0; if(o.players.active < 1){o.playerStateChange(0);} return;}
						
						o.players.active = 0;
						
						var j;
						var l = htmlplayer.length;
						for(j=0; j<l; j++){
							if(!htmlplayer[j].paused && !htmlplayer[j].ended){
								o.players.active += 1;
							}
						}
						if(o.players.active < 1){o.playerStateChange(0);}
						
						setPlayerEvents(htmlplayer);
					};				

				}(this.ytCinema));
			}
		}
	}
}).initialize();