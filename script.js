var lyricsUrl = 'https://api.lyrics.ovh/v1/';

function findLyrics() {
  var songname = document.getElementById("song_name").value;
  var artistname = document.getElementById("artist_name").value;


  var request = new XMLHttpRequest();

  var newUrl = lyricsUrl + artistname + "/" + songname;


  request.open('GET', newUrl);

  request.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.status === 200) {
        var jsonResponse = JSON.parse(this.responseText);

        document.getElementById("lyrics-text").innerText = "\nSong Name: " + songname + "\n" + "Artist Name: " + artistname + "\n\n" + jsonResponse.lyrics;


        $("#song_name").val("");
        $("#artist_name").val("");

        $("#lyrics-container").attr('open', true);

        $("#lyrics-container").scroll();
      }
      else if (this.status === 404) {
        showNotification();
      }
    }
  };

  request.send();
}

function showNotification(text, duration = 2000) {
  $("#notify p").text(text);
  
  $("#notify").stop().animate({
    bottom: '20px'
  }, 300);

  setTimeout(function() {
    $("#notify").stop().animate({
      bottom: '-100px'
    }, 300);
  }, duration);
}

function copyLyrics() {
  var copyText = $("#lyrics-text").text();

  navigator.clipboard.writeText(copyText).then(function() {
    showNotification("Text Copied !");
  }).catch(function(error) {
    showNotification("Couldn't copy Text");
  });
}

