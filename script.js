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
        showNotification("Couldn't find any lyrics !");
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
      bottom: '-100%'
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

function switchClasses(obj, class1Name, class2Name) {
  obj.removeClass(class1Name);
  obj.addClass(class2Name);
}

$(".dark-mode").click(function() {
  if($(this).hasClass("bi-moon-fill")) {
    switchClasses($(this), "bi-moon-fill", "bi-sun-fill");
    
    // change button colors
    $(this).css({
      background: "black",
      color: "orange"
    })
    
    // change colors
    $("body").css({
      background: "whitesmoke"
    })
    
    $(".inner-container").css({
      background: "white"
    })
    
    $("input").css({
      background: "whitesmoke",
      color: "black"
    })
    
    $("input").addClass("black-placeholder");
    
  } else if($(this).hasClass("bi-sun-fill")) {
    switchClasses($(this), "bi-sun-fill", "bi-moon-fill");
    
    // change button colors
    $(this).css({
      background: "white",
      color: "lightblue"
    })
    
    // change colors
    $("body").css({
      background: "#1f1f1f"
    })
    
    $(".inner-container").css({
      background: "#28282a"
    })
    
    $("input").css({
      background: "#3b414a",
      color: "whitesmoke"
    })
    
    $("input").removeClass("black-placeholder");
    
  }
})