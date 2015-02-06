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

  var ga1 = document.createElement('script');
  ga1.type = 'text/javascript';
  ga1.async = true;
  ga1.src = 'https://media.admob.com/api/v1/google_mobile_app_ads.js';
  var s1 = document.getElementsByTagName('script')[0];
  s1.parentNode.insertBefore(ga1, s1);


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
