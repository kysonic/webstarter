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
            reflux: 'vendor/reflux/dist/reflux',
            tags: 'build/tags/',
            webstarter: 'webstarter',
            riot: 'vendor/riotjs/riot',
            jquery: 'vendor/jquery/dist/jquery.min',
            domReady: 'vendor/domReady/domReady',
            matchMedia: 'vendor/matchMedia/matchMedia',
            text: 'vendor/text/text'
        }
    });
    /**
     * App startup!
     */
    var basics = ['domReady','riot','jquery','webstarter'];
    // Require polyffils for ie
    if(/MSIE (8|9)/i.test(window.navigator.userAgent)) basics.push('matchMedia');
    require(basics.concat([
            'tags/content/content',
            'tags/header/header',
            'tags/x-l18n/x-l18n',
            'tags/core-media-query/core-media-query',
            'tags/x-media-queries/x-media-queries',
            'tags/todo/todo'
        ]),
        function(domReady,riot,$,Webstarter){
            //Riot basic settings
            riot.settings.brackets = '{{ }}'
            /**
             * When dom is ready - grab all tags and place their in globals
             */
            domReady(function(){
                Webstarter.tags = riot.mount('*');
            });
    });
})();



