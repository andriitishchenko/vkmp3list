var _AnalyticsCode = 'UA-39399632-4';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);

//   var ga1 = document.createElement('script');
//   ga1.setAttribute('nonce', 'Nc3n83cnSAd3wc3Sasdfn939hc3');
//   ga1.type = 'text/javascript';
//   ga1.async = true;
//   //ga1.src = 'https://media.admob.com/api/v1/google_mobile_app_ads.js';
//   ga1.src = '../google_mobile_app_ads.js';
//   var s1 = document.getElementsByTagName('script')[0];
//   s1.parentNode.insertBefore(ga1, s1);


// document.write("<a id=\"AD\" href=\"http://andrux.info/monetize.html\"><img border=\"0\" src=\"ca-app-pub-8974053321305042/8033443213\" width=\"320\" height=\"100\"></a>");
//     var button = document.getElementById('AD');
//     button.onclick = function() {
//       admob.opener.openUrl('%%CLICK_URL_ESC%%[FULLSCREEN_UNIT]', true); 
//       return false;
//     };
})();

function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  }
});
