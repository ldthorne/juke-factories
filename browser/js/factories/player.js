app.factory("PlayerFactory", function($http, StatsFactory) {
    var currentSong;
    var playing = false;
    var audio = document.createElement('audio');
    var currentAlbum;

    var player = {
        getAlbum: function() {
            // load our initial data
            return $http.get('/api/albums/')
                .then(res => $http.get('/api/albums/' + res.data[1]._id))
                .then(res => res.data)
                .then(album => {
                    album.imageUrl = '/api/albums/' + album._id + '.image';
                    album.songs.forEach(function(song, index) {
                        song.audioUrl = '/api/songs/' + song._id + '.audio';
                        song.trackNum = index;
                    });
                    currentAlbum = album; 
                    return album;
               	}).catch(console.error.bind(console));
        },
        getAudio: function() {
            return audio;
        },
        getCurrentSong: function() {
            return currentSong;
        },
        setCurrentSong: function(song) {
            currentSong = song;
        },
        isPlaying: function() {
            return playing;
        },
        setPlaying: function(shouldPlay) {
            playing = arguments[0] ? shouldPlay : !playing;
        },
        play: function(event, song) {
            player.pause();
            playing = true;
            // resume current song
            if (song === currentSong) return audio.play();
            // enable loading new song
            currentSong = song;
            audio.src = song.audioUrl;
            audio.load();
            audio.play();
        },
        pause: function() {
            audio.pause();
            playing = false;
        },
        toggle: function(song) {
            if (playing) {
                player.pause();
                // playing = !playing;

            } else {

                player.play(null, song);
                //playing = !playing
            }
        },
        // skip: function(val) {
        //     if (!currentSong) return;
        //     var idx = album.songs.indexOf(currentSong);
        //     idx = mod((idx + (val || 1)), album.songs.length);
        // },
        next: function() {
            if (currentSong.trackNum + 1 === currentAlbum.songs.length) {
                player.play(null, currentAlbum.songs[0]);
            } else {
                player.play(null, currentAlbum.songs[currentSong.trackNum + 1]);
            }
        },
        prev: function() {
            if (currentSong.trackNum === 0) {
                player.play(null, currentAlbum.songs[currentAlbum.songs.length -1]);
            } else {
                player.play(null, currentAlbum.songs[currentSong.trackNum - 1]);
            }
        }

    };
    return player;
})
