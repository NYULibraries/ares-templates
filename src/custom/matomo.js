// Matomo analytics (site 21): production only.
// TestWeb pages are served from the same host, so skip any /testweb/ path.
if (window.location.hostname === 'ares.library.nyu.edu' && window.location.pathname.toLowerCase().indexOf('/testweb/') === -1) {
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u = "https://nyulib.matomo.cloud/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '21']);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true; g.src = '//cdn.matomo.cloud/nyulib.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g, s);
  })();
}
