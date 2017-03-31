function $(id) { return document.getElementById(id); }
// Install on www.stefanvd.net
// Install on www.turnoffthelights.com
if (window.location.href.match(/http:\/\/(.*stefanvd\.net\/.*|www\.stefanvd\.net\/.*\/.*)/i)|| window.location.href.match(/http:\/\/(.*turnoffthelights\.com\/.*|www\.turnoffthelights\.com\/.*\/.*)/i)){
	if ($('turnoffthelights-chrome-install-button')) {
		$('turnoffthelights-chrome-install-button').style.display = 'none';
		$('turnoffthelights-chrome-thanks-button').style.display = '';
	}
}
var ambientaureaproduct = "https://chrome.google.com/webstore/detail/ambient-aurea/pkaglmndhfgdaiaccjglghcbnfinfffa";
var datetodayproduct = "https://chrome.google.com/webstore/detail/date-today/mhgknbehalhkedjgfhiaindklahhkccc";
var turnoffthelightsproduct = "https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn";
var financetoolbarproduct = "https://chrome.google.com/webstore/detail/finance-toolbar/cichbngoomgnobmmjpagmbkimbamigie";
var propermenubarproduct = "https://chrome.google.com/webstore/detail/proper-menubar/egclcjdpndeoioimlbbbmdhcaopnedkp";
var fullscreenproduct = "https://chrome.google.com/webstore/detail/full-screen/gmimocjjppdelmhpcmpkhekmpoddgima";
var zoomproduct = "https://chrome.google.com/webstore/detail/zoom/lajondecmobodlejlcjllhojikagldgd";
var donatewebsite = "https://www.turnoffthelights.com/donate.html";
var writereview = "https://chrome.google.com/webstore/detail/turn-off-the-lights/bfbmjmiodbnnpllbbbfblcplfjjepjdn/reviews";
var linkchangelog = "https://www.turnoffthelights.com/extension/chromechangelog.html";
var linktranslate = "https://www.turnoffthelights.com/extension/translate.html";
var linksupport = "https://www.turnoffthelights.com/support/";
var linkwelcomepage = "https://www.turnoffthelights.com/extension/chromewelcome.html";
var linkuninstall = "https://www.turnoffthelights.com/extension/chromeuninstalled.html";
var linkguide = "https://www.turnoffthelights.com/extension/chromeguide.html";
var linkshare = "https://www.turnoffthelights.com/shareextension.html";
var linkthemedownload = "https://www.turnoffthelights.com/browser/theme.html";
var browsernewtab = "chrome://newtab/";
var browserstore = "https://chrome.google.com";
var linkyoutube = "https://www.youtube.com/c/turnoffthelights?sub_confirmation=1";