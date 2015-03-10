(function(){
    /**
     * Pure Load Css
     * @param url
     */
    window.loadCss=function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    /**
     * require.js paths
     */
    requirejs.config({
        paths: {
            components: 'app-components/',
            tags: 'build/tags/',
            riot: 'vendor/riotjs/riot.min',
            jquery: 'vendor/jquery/dist/jquery.min',
            domReady: 'vendor/domReady/domReady'
        }
    });
    /**
     * App startup!
     */
    require(['domReady','riot','jquery'].concat(['tags/todo/todo','tags/header/header']),function(domReady,riot,$){
        domReady(function(){
            riot.mount('header',{logoText: 'Plex'});
            riot.mount('todo',{title:'Todo',items:[{title:'First',done:true}]});
        });
    });
})();



