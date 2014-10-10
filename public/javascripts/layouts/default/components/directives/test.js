var app = require('app')();
app.directive("test", function() {
    return function(scope, element, attrs) {
        console.log(element)
    }
})