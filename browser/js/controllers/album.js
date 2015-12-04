app.controller('AlbumCtrl', function($scope, $http, $rootScope, StatsFactory, PlayerFactory) {

  PlayerFactory.getAlbum()
    .then(function(album){
      $scope.album = album;
      StatsFactory.totalTime(album)
        .then(function(time) {
          $scope.album.totalTime = time;
        })
    }).catch(console.error.bind(console));

    $rootScope.toggle = function(song){
      PlayerFactory.toggle(song)
      $rootScope.playing = PlayerFactory.isPlaying()
      $rootScope.currentSong = PlayerFactory.getCurrentSong();
    }

    // a "true" modulo that wraps negative to the top of the range
    function mod(num, m) {
        return ((num % m) + m) % m;
    };

});
