app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){

  // initialize audio player
  
  PlayerFactory.getAudio().addEventListener('ended', function () {
    $scope.next();
    $rootScope.$digest(); 
  });

  PlayerFactory.getAudio().addEventListener('timeupdate', function () {
    $scope.progress = 100 * PlayerFactory.getAudio().currentTime / PlayerFactory.getAudio().duration;
    $scope.$digest();
  });

  // state variables
  $scope.currentSong;

  // outgoing events (to Album)
  $scope.next = function(){
    PlayerFactory.next();
    $rootScope.currentSong = PlayerFactory.getCurrentSong();
  };

  $scope.prev = function(){
    PlayerFactory.prev();
    $rootScope.currentSong = PlayerFactory.getCurrentSong();
  };

});
