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
            riot: 'vendor/riotjs/riot',
            jquery: 'vendor/jquery/dist/jquery.min',
            domReady: 'vendor/domReady/domReady',
            matchMedia: 'vendor/matchMedia/matchMedia'
        }
    });
    /**
     * App startup!
     */
    require(['domReady','riot','jquery'].concat([
        'tags/core-media-query/core-media-query',
        'tags/x-media-queries/x-media-queries',
        'tags/header/header'
        ]),
        function(domReady,riot,$){
        //Riot basic settings
        riot.settings.brackets = '{{ }}'
        // Require polyfills if we have a IE9
        if(/MSIE (8|9)/i.test(window.navigator.userAgent)) {
            require(['matchMedia']);
        }
        domReady(function(){
            window.tags = riot.mount('*');
            // Find tag by name
            window.tags.findTagByName = function(name){
                var searchTag = null;
                this.forEach(function(tag){
                    if(tag.root.tagName.toLowerCase()==name.toLowerCase()) searchTag = tag;
                });
                return searchTag;
            }
        });
    });
})();



