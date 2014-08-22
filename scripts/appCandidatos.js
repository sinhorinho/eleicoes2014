var app = angular.module('candidatos', []);

var token = "0KlR7rdI7pH4";
var environment = "sandbox"; //sandbox or api
var urlApi = "http://api.transparencia.org.br/" + environment + "/v1/";


function CandidatosController($scope, $http, $location) {


    $scope.pesquisarCandidatos = function () {        
        $scope.app.carregando = true;
                
        var estado = $scope.app.estadoSelecionado;
        
        if (estado == "")
            estado = "sp";

        $http.get(urlApi + "candidatos?estado=" + estado + "&nome=" + $scope.app.nome + "&_offset=0&_limit=15",
        	{ headers: { 'App-token': token } }).success(function (data) {

        	    $scope.cargo = "Pesquisando por " + $scope.app.nome;
        	    $scope.itens = data;
        	    $scope.app.carregando = false;
        	});
    }

  

    var listarCandidatos = function () {
        
        $scope.app.carregando = true;

        var idcargo = $scope.app.cargoSelecionado;
        var estado = $scope.app.estadoSelecionado;
        
        if ($scope.app.estadoSelecionado === "df" &&  $scope.app.cargoSelecionado  == 7)
           idcargo = 8;

        $http.get(urlApi + "candidatos?estado=" + estado + "&cargo=" + idcargo + "&_offset=0&_limit=15",
        	{ headers: { 'App-token': token } }).success(function (data) {

        	    $scope.cargo = "Candidatos a " + data[0].cargo + " - " + data[0].estado;
        	    $scope.itens = data;
        	    $scope.app.carregando = false;
              });
    }


    $scope.app = {
        estadoSelecionado: "",
        cargoSelecionado: "",
        carregando : false
    };

    $scope.cargoClick = function (cargo) {
      
        $scope.app.cargoSelecionado = cargo;

       
        if (cargo == 1)
            $scope.app.estadoSelecionado = "br";

        verificaPrenchimento();
    };

    $scope.estadoClick = function (estado) {
     
        $scope.app.estadoSelecionado = estado;
    
        if ($scope.app.cargoSelecionado != 1)
            verificaPrenchimento();
    };


    var verificaPrenchimento = function () {
        if (!$scope.app.cargoSelecionado || !$scope.app.estadoSelecionado)
            return false;

        if ($scope.app.cargoSelecionado != 1 && $scope.app.estadoSelecionado == "br")
        {
            alert("Selecione um Estado");
            return false;
        }
        

        //TODO: implementar msg de erro

            listarCandidatos();
    }

}




