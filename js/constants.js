function $(id){ return document.getElementById(id); }
// Install on www.stefanvd.net
// Install on www.turnoffthelights.com
if(window.location.href.match(/^http(s)?:\/\/(www\.)?stefanvd.net/i) || window.location.href.match(/^http(s)?:\/\/(www\.)?turnoffthelights.com/i)){
	if($("turnoffthelights-chrome-install-button")){
		$("turnoffthelights-chrome-install-button").style.display = "none";
		$("turnoffthelights-chrome-thanks-button").style.display = "block";
	}
}
export const totlscreenshotpage = "https://www.turnoffthelights.com/extension/capture-screenshot-of-video.html";
export const developerwebsite = "https://www.turnoffthelights.com";
export const totloptionspage = "https://www.turnoffthelights.com/extension/options.html";
export const ambientaureaproduct = "https://chrome.google.com/webstore/detail/ambient-aurea/pkaglmndhfgdaiaccjglghcbnfinfffa";
export const datetodayproduct = "https://chrome.google.com/webstore/detail/date-today/mhgknbehalhkedjgfhiaindklahhkccc";
export const turnoffthelightsproduct = "https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn";
export const financetoolbarproduct = "https://chrome.google.com/webstore/detail/finance-toolbar/cichbngoomgnobmmjpagmbkimbamigie";
export const propermenubarproduct = "https://chrome.google.com/webstore/detail/proper-menubar/egclcjdpndeoioimlbbbmdhcaopnedkp";
export const fullscreenproduct = "https://chrome.google.com/webstore/detail/full-screen/gmimocjjppdelmhpcmpkhekmpoddgima";
export const zoomproduct = "https://chrome.google.com/webstore/detail/zoom/lajondecmobodlejlcjllhojikagldgd";
export const donatewebsite = "https://www.turnoffthelights.com/donate.html";
export const writereview = "https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn/reviews";
export const linkchangelog = "https://www.turnoffthelights.com/extension/chromechangelog.html";
export const linktranslate = "https://www.turnoffthelights.com/extension/translate.html";
export const linksupport = "https://www.turnoffthelights.com/support/";
export const linkwelcomepage = "https://www.turnoffthelights.com/extension/chromewelcome.html";
export const linkuninstall = "https://www.turnoffthelights.com/extension/chromeuninstalled.html";
export const linkguide = "https://www.turnoffthelights.com/extension/chromeguide.html";
export const linkshare = "https://www.turnoffthelights.com/shareextension.html";
export const linkthemedownload = "https://www.turnoffthelights.com/browser/theme.html";
export const browsernewtab = "chrome://newtab/";
export const browserstore = "https://chrome.google.com";
export const linkyoutube = "https://www.youtube.com/c/turnoffthelights?sub_confirmation=1";
export const linkauroraplayerapp = "https://www.stefanvd.net/project/aurora-player/";
export const linktotlmobileapp = "https://www.turnoffthelights.com/mobile.html";
export const devmode = false;