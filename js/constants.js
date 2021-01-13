function $(id) { return document.getElementById(id); }
// Install on www.stefanvd.net
// Install on www.turnoffthelights.com
if(window.location.href.match(/^http(s)?:\/\/(www\.)?stefanvd.net/i)||window.location.href.match(/^http(s)?:\/\/(www\.)?turnoffthelights.com/i)){
	if($('turnoffthelights-chrome-install-button')){
		$('turnoffthelights-chrome-install-button').style.display = 'none';
		$('turnoffthelights-chrome-thanks-button').style.display = 'block';
	}
}
let totlscreenshotpage = "https://www.turnoffthelights.com/extension/capture-screenshot-of-video.html";
let developerwebsite = "https://www.turnoffthelights.com";
let totloptionspage = "https://www.turnoffthelights.com/extension/options.html";
let ambientaureaproduct = "https://chrome.google.com/webstore/detail/ambient-aurea/pkaglmndhfgdaiaccjglghcbnfinfffa";
let datetodayproduct = "https://chrome.google.com/webstore/detail/date-today/mhgknbehalhkedjgfhiaindklahhkccc";
let turnoffthelightsproduct = "https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn";
let financetoolbarproduct = "https://chrome.google.com/webstore/detail/finance-toolbar/cichbngoomgnobmmjpagmbkimbamigie";
let propermenubarproduct = "https://chrome.google.com/webstore/detail/proper-menubar/egclcjdpndeoioimlbbbmdhcaopnedkp";
let fullscreenproduct = "https://chrome.google.com/webstore/detail/full-screen/gmimocjjppdelmhpcmpkhekmpoddgima";
let zoomproduct = "https://chrome.google.com/webstore/detail/zoom/lajondecmobodlejlcjllhojikagldgd";
let donatewebsite = "https://www.turnoffthelights.com/donate.html";
let writereview = "https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn/reviews";
let linkchangelog = "https://www.turnoffthelights.com/extension/chromechangelog.html";
let linktranslate = "https://www.turnoffthelights.com/extension/translate.html";
let linksupport = "https://www.turnoffthelights.com/support/";
let linkwelcomepage = "https://www.turnoffthelights.com/extension/chromewelcome.html";
let linkuninstall = "https://www.turnoffthelights.com/extension/chromeuninstalled.html";
let linkguide = "https://www.turnoffthelights.com/extension/chromeguide.html";
let linkshare = "https://www.turnoffthelights.com/shareextension.html";
let linkthemedownload = "https://www.turnoffthelights.com/browser/theme.html";
let browsernewtab = "chrome://newtab/";
let browserstore = "https://chrome.google.com";
let linkyoutube = "https://www.youtube.com/c/turnoffthelights?sub_confirmation=1";
let linkauroraplayerapp = "https://www.stefanvd.net/project/aurora-player/";
let linktotlmobileapp = "https://www.turnoffthelights.com/mobile.html";
let devmode = false;