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

if (typeof safari !== "undefined") {
  chrome = {
    i18n: {
      getMessage: function(messageID, args) {
        var i;
        if (typeof chrome.i18n.strings === "undefined") {
          var languages = [navigator.language.replace('-', '_')];
          if (navigator.language.length > 2) {
            languages.push(navigator.language.substring(0, 2));
          }
          if (navigator.language !== "en") {
            languages.push("en");
          }
          chrome.i18n.strings = {};

          // Translation
          var fetchAndParse = function(locale) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", safari.extension.baseURI + "_locales/" + locale + "/messages.json", false);
            xhr.onreadystatechange = function() {
              if (this.readyState === 4 && this.responseText) {
                var parsed = JSON.parse(this.responseText);
                var string;
                for (string in parsed) {
                  if (!chrome.i18n.strings[string]) {
                    var result = parsed[string].message;
                    // Parse placeholders
                    var ph = parsed[string].placeholders;
                    if (ph) {
                      var phID;
                      for (phID in ph) {
                        var rgx = new RegExp("\\$" + phID + "\\$");
                        result = result.replace(rgx, ph[phID].content);
                      }
                    }
                    chrome.i18n.strings[string] = result;
                  }
                }
              }
            };
            try {
              xhr.send();
            } catch (ex) {}
          };
          for (i=0; i < languages.length; i++) {
            fetchAndParse(languages[i]);
          }
        }

        if (typeof args === "string") {
          args = [args];
        } else if (!args) {
          args = [];
        }
        var edited = chrome.i18n.strings[messageID].replace(/\$\$/g, "@@@@"); // $$ shouldn't get escaped
        for (i=0; i<args.length; i++) {
          var rgx = new RegExp("(?!\\$\\$)\\$" + (i+1), "g");
          edited = edited.replace(rgx, args[i]);
        }
        return edited.replace(/\@\@\@\@/g, "$$");
      }
    }
  };

}

// Search for data and translate it to current use language
items = document.querySelectorAll("[data-i18n]");
for (i=0; i<items.length; i++) {
  var translation = chrome.i18n.getMessage(items[i].getAttribute("data-i18n"));
  if (items[i].value === "i18n") {
    items[i].value = translation;
  } else {
    items[i].innerText = translation;
  }
}