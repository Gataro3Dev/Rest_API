app.controller('authCtrl', function ($scope) {
  $scope.usuario = {username:'', password:''};
  $scope.error_mensaje = '';

  $scope.login = function(){
    $scope.error_mensaje = 'solicitud de login para' + $scope.usuario.username;
  };

  $scope.registro = function(){
    $scope.error_mensaje = 'solicitud de registro para' + $scope.usuario.username;
  }
})
