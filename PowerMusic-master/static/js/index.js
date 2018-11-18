// var firebaseApp = firebase.initializeApp({ ... })

// var itemsRef = new Firebase("https://taquitos-chat.firebaseio.com/items/");

Vue.use(VueResource);

var player;

function onYouTubeIframeAPIReady(id) {
  player = new YT.Player('track', {
    height: '390',
    width: '640',
    videoId: 'id',
    playerVars: {
      'autoplay': 1,
      'controls': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

}


//    after the API code downloads.


var playerReady = false;
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log('e');
  playerReady = true;
  window.firstVideo();
}


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          var state = player.getPlayerState();
          done = true;
        }
        if(state == 1){
          var current_volume = player.getVolume();
          // Volume Slider
          $(function() {
            $( "#slider_vertical" ).slider({
              orientation: "vertical",
              range: "min",
              min: 0,
              max: 100,
              value: 50,
              slide: function( event, ui ) {
                $( "#volume" ).val( ui.value );
                player.setVolume(ui.value);
              }
            });
          });
          $('#slider_vertical').find(".ui-slider-range").css('height', current_volume+'%');
          // call the function every 250 milisecond.
          setInterval(displTime,250);  // PUT THIS STATEMENT JUST AFTER THE PLAYER HAS BEEN CREATED. 
        }
      }

      
      function displTime() {
        
        var mind = player.getCurrentTime();   // returns elapsed time in seconds 
        var m = Math.floor(mind / 60);
        var secd = mind % 60;
        var s = Math.ceil(secd)

        var dur = player.getDuration();       // returns duration time in seconds

        var dm = Math.floor(dur / 60);
        var dsecd = dur % 60;
        var ds = Math.ceil(dsecd)

        var playbackPercent = mind/dur;
        var sliderValue = playbackPercent * 100;
        var state = player.getPlayerState();

        var getVolume = player.getVolume();

        $("#time").html("Current: " + m + ":" + n(s) + " | Duration: " + dm + ":" + n(ds) + " | PlayerState: " + state + " | Volume: " + getVolume + " | Slider Value: " + sliderValue);  // Using the JQUERY library to write to body
        $( "#slider_timeline" ).slider({ 
          range: "min",
          min:0,
          value: sliderValue });
        
        
        // adds a 0 to the seconds when the time is less than 9 seconds
        function n(n){
          return n > 9 ? "" + n: "0" + n;
        }

        // set player value
        if(state == 1){
          $("#player_control_button").removeClass('ui-icon-play').addClass('ui-icon-pause').click(function(){player.pauseVideo();});
        }else if(state == 2){
          $("#player_control_button").removeClass('ui-icon-pause').addClass('ui-icon-play').click(function(){player.playVideo();});
        }else if(state == 0){
          $("#player_control_button").removeClass('ui-icon-pause').addClass('ui-icon-arrowrefresh-1-e').click(function(){player.playVideo();});
        }else{
          var donothing;
        }

        // set play mute icons
        if(getVolume != 0){
          $('#player_mute_button').removeClass('ui-icon-volume-off').addClass('ui-icon-volume-on').click(function(){player.mute();});
        }else{
          $('#player_mute_button').removeClass('ui-icon-volume-on').addClass('ui-icon-volume-off').click(function(){player.unMute();});
        }
      }
      
      
      


function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
  }
}

window.changeVideo = function (id) {
  player.loadVideoById(id, 0, "default");



};


var config = {
    apiKey: "AIzaSyApTCfgJ9qh3wsJFdraS-8uR-l_Y_ryRb8",
    authDomain: "powermusic-a0624.firebaseapp.com",
    databaseURL: "https://powermusic-a0624.firebaseio.com",
    projectId: "powermusic-a0624",
    storageBucket: "powermusic-a0624.appspot.com",
    messagingSenderId: "328544197766"
  };
 


firebase.initializeApp(config);


// var itemsRef = firebase.database().ref('chat/');
var allMusicForPlay = firebase.database().ref("users/" + "DWHbaVEahcMzPUfcxnh0C5eei5r2/random");
var allMusic = firebase.database().ref("users/" + "DWHbaVEahcMzPUfcxnh0C5eei5r2/music");
var allCategories = firebase.database().ref("users/" + "DWHbaVEahcMzPUfcxnh0C5eei5r2/category");

// var db = firebaseApp.database()

function googleApiClientReady(){
  gapi.client.setApiKey("AIzaSyApTCfgJ9qh3wsJFdraS-8uR-l_Y_ryRb8");
  gapi.client.load("youtube", "v3", function() {
    // yt api is ready
  });
}


var app = new Vue({
  el: '#app',
  data: {
    viewMenu: false,
    top: '0px',
    left: '0px',

    searchingSong: true,
    apiKeyYT: 'AIzaSyApTCfgJ9qh3wsJFdraS-8uR-l_Y_ryRb8',
    message: 'You loaded this page on ' + new Date(),
    searchInput: '',
    videos: [],
    userName: null,
    messages: "",
    newMessage: '',
    currentVideo: '',
    currentImage: '',
    songsForPlay: [],
    showAddCat: false,
    sendVideoMenu: {
      id: '',
      name: '',
      image: '',
     },
  },

  firebase: {
    // simple syntax, bind as an array by default
    // items: itemsRef.limitToLast(25),
    allMusic: allMusic,
    lastMusic: allMusic.limitToLast(1),
    categories: allCategories
  },

  mounted: function () {
    
    var self = this;
    window.firstVideo = function () {
      console.log('eee');
      allMusicForPlay.limitToLast(1).on('child_added', function(snapshot) {
        // console.log(snapshot.val().videoId);
        // 
        console.log(snapshot.val().id);

        self.currentVideo = snapshot.val().name;
        self.currentImage = snapshot.val().image;

        window.changeVideo(snapshot.val().id);
      });
    };


    /*
    itemsRef.limitToLast(1).on('child_added', function() {
      var ulist = document.getElementById('chatContainer')
      ulist.scrollTop = 10000000000;
    });
    */
    // var ulist = document.getElementById('chatContainer')
    // ulist.scrollTop = 10000000000;

    
  },

  methods: {

    addOnCategory(category) {
      
      this.viewMenu = false;
      
      allMusic.push({
        id: this.sendVideoMenu.id,
        name: this.sendVideoMenu.name,
        image: this.sendVideoMenu.image,
        category: category
      });

   
    },

    removeOnCategory(random) {
      
      this.viewMenu = false;
      
      

      allMusicForPlay.pop({
        id: this.sendVideoMenu.id,
        name: this.sendVideoMenu.name,
        image: this.sendVideoMenu.image,
        random: random
      });




    },
    
    playMusic(id, name, image) {
      console.log('eee', id);
      allMusicForPlay.push({
        id: id,
        name: name,
        image: image,
        category: 'all'
      });
    },

    setMenu(top, left) {
      // largestHeight = window.innerHeight - this.$refs.right.offsetHeight - 25;
      // largestWidth = window.innerWidth - this.$refs.right.offsetWidth - 25;

      // if (top > largestHeight) top = largestHeight;

      // if (left > largestWidth) left = largestWidth;

      this.top = top + 'px';
      this.left = left + 'px';
    },

    insertCat() {
      this.showAddCat = true;
      setTimeout(function() {
        document.getElementById("input_for_category").focus();
      },200)
      
    },

    addNewCategory(e) {

      this.showAddCat = false;

      allCategories.push({
        id: e.target.value,
        name: e.target.value
      });
      
    },

    openMenu(e, id, name, image) {

      this.sendVideoMenu.id = id;
      this.sendVideoMenu.name = name;
      this.sendVideoMenu.image = image;

      this.viewMenu = true;

      Vue.nextTick(function() {
          // this.$$.right.focus();
          this.setMenu(e.y, e.x)
      }.bind(this));
      e.preventDefault();
    },

    closeMenu() {
      this.viewMenu = false;
    },

    showSong(id) {
      console.log(id);
      this.searchingSong = false;
      this.songsForPlay = this.allMusic.filter(x => x.category === id);
    },

    searchVideo() {
      this.searchingSong = true;
      var self = this;

      var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        order: "relevance",
        videoEmbeddable: "true",
        videoSyndicated: "true",
        q: encodeURIComponent(this.searchInput).replace(/%20/g, "+"),
        maxResults: 20,
      }); 

      request.execute(function(response) {
        self.videos = response.result.items;
      });


      this.$http.get('https://api.spotify.com/v1/search', {params: { q: this.searchInput, type: 'album'} })
      .then(response => {
        
        if (response.status === 200 && response.data.albums.total) {
          console.log(response.data.albums.items)
          // this.$set('showError', false);
          // this.$dispatch('broadcastResults', response.data.albums.items);
        } else {
          // this.$set('showError', true);
          console.log('error', response);
        }
      });


      if(window.innerWidth <= 500) {
        document.getElementsByClassName('listResult')[0].style.display = 'block';
      }

    },

    sendVideo: function (id, name, image) {
      
      allMusicForPlay.push({
        id: id,
        name: name,
        image: image,
        category: 'all'
      });

      if(window.innerWidth <= 500) {
        document.getElementsByClassName('listResult')[0].style.display = 'none';
      } 
    }

  }
})



/*
$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});
*/ 

