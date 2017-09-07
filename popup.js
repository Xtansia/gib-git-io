document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://git.io/create', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var textBox = document.getElementById('git-io-url');
        if (xhr.status === 200) {
          textBox.value = 'https://git.io/' + xhr.responseText;
          textBox.select();
          if (!document.execCommand('copy')) {
            console.error('Couldn\'t copy short URL to clipboard');
          }
        } else {
          textBox.value = 'Failed to gib short URL';
        }
      }
    }
    xhr.send('url=' + encodeURIComponent(tabs[0].url));
  });
});
