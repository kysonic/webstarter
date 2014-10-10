require('angular');
module.exports.services =  angular.module('services',[]);
module.exports.directives =  angular.module('directives',[]);
module.exports.filters =  angular.module('filters',[]);
module.exports.controllers = angular.module('controllers',['services']);
module.exports.app = angular.module('myApp',['controllers','services','directives','filters']);