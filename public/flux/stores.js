define(['reflux','flux/actions','jquery'],function(Reflux,Actions,$){
    return Reflux.createStore({
        listenables: [Actions],
        init: function(){

        }
    });
});
