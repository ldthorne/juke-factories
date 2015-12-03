app.controller('AlbumCtrl', function($scope, $http, $rootScope, StatsFactory, PlayerFactory) {

  PlayerFactory.getAlbum()
    .then(function(album){
      $scope.album = album;
      StatsFactory.totalTime(album)
        .then(function(time) {
          $scope.album.totalTime = time;
        })
    }).catch(console.error.bind(console));

    // main toggle
   //$scope.$on('toggle', PlayerFactory.toggle());

    $scope.toggle = function(song){
      PlayerFactory.toggle(song)
      $scope.playing = PlayerFactory.isPlaying()
      $rootScope.currentSong = PlayerFactory.getCurrentSong();
    }

    // incoming events (from Player, toggle, or skip)
    $scope.$on('pause', PlayerFactory.pause);
    $scope.$on('play', PlayerFactory.play);
    // $scope.$on('next', next);
    // $scope.$on('prev', prev);

    // functionality

    // a "true" modulo that wraps negative to the top of the range
    function mod(num, m) {
        return ((num % m) + m) % m;
    };

});
