app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){

  // initialize audio player
  
  PlayerFactory.getAudio().addEventListener('ended', function () {
    $scope.next();
  });
  PlayerFactory.getAudio().addEventListener('timeupdate', function () {
    $scope.progress = 100 * PlayerFactory.getAudio().currentTime / PlayerFactory.getAudio().duration;
    $scope.$digest();
  });

  // state variables
  $scope.currentSong;
  $scope.$on("play", function(){
    $scope.currentSong = PlayerFactory.getCurrentSong;
  });
  // $scope.playing = PlayerFactory.isPlaying();

  // main toggle
  $scope.$on("toggle", PlayerFactory.toggle)

  // incoming events (from Album or toggle)
  $scope.$on('pause', PlayerFactory.pause);
  $scope.$on('play', PlayerFactory.play);

  

  // outgoing events (to Album)
  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.prev;

});
