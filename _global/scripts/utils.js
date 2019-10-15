var app = {}, appData = {}, appUtils = {};



appUtils['onDocReady'] = function (ready) {
  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    ready();
  } else {
    document.addEventListener('DOMContentLoaded', ready);
  }
}

