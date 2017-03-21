// Controller for login template
app.controller('loginController',function($rootScope, $scope, $http, $location){
	
	// submit function, execute an user login
	$scope.submit = function () {
		var data = {
			email: $scope.user.email,
			password: $scope.user.password
		}
		
		// Login request to the server
		$http.post('login.php', data).then(res => {
			if (res.data.length > 0){
				$rootScope.user = res.data[0]
				alertify.success('Welcome ' + $rootScope.user.email + '!')
				
				$location.path('/')
				if ($scope.remember) { // If remember me is selected we save id and token to localStorage
					localStorage.setItem('id', $rootScope.user.email)
					localStorage.setItem('token', $rootScope.user.password)
				} else {
					localStorage.removeItem('id')
					localStorage.removeItem('token')
				}
			}else alertify.error('User not found.')
		})
	}
	
})