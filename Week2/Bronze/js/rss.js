$(document).ready(function () {
  $('#rssFeed').rssfeed('http://feeds.reuters.com/reuters/oddlyEnoughNews', {
    limit: 20
  });
});