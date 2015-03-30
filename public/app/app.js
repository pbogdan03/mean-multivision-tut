(function() {
  'use strict';

  angular
    .module('app')
    .controller('mainCtrl', mainCtrl);

  function mainCtrl() {
    var vm = this;
    vm.myVar = "Hello Angular";
  }

})();