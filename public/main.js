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
     * Routes
     */
    routes = {
        'user' :
            [
              'tags/user-form-service/user-form-service',
              'tags/web-form/web-form',
              'tags/web-input/web-input',
              'tags/web-select/web-select',
              'tags/web-datepicker/web-datepicker',
              'tags/web-textarea/web-textarea',
              'tags/web-ripple-button/web-ripple-button',
              'tags/web-chooser/web-chooser',
              'tags/web-skillz/web-skillz',
              'tags/web-education/web-education',
              'tags/web-employment/web-employment',
              'tags/web-portfolio/web-portfolio',
              'tags/web-image/web-image',
              'tags/web-tags/web-tags'
            ],
        'project': [
            'tags/project-service/project-service',
            'tags/web-form/web-form',
            'tags/web-project/web-project'
        ]
    }
    /**
     * require.js paths
     */
    requirejs.config({
        paths: {
            reflux: '/vendor/reflux/dist/reflux',
            tags: '/build/tags',
            webstarter: '/webstarter',
            riot: '/vendor/riotjs/riot.min',
            jquery: '/vendor/jquery/dist/jquery.min',
            cropper: '/vendor/cropper/dist/cropper.min',
            domReady: '/vendor/domReady/domReady',
            matchMedia: '/vendor/matchMedia/matchMedia',
            es5: '/vendor/es5-shim/es5-sham.min',
            html5: '/vendor/html5shiv/dist/html5shiv.min',
            mocha: '/vendor/mocha/mocha',
            chai: '/vendor/chai/chai',
            text: '/vendor/text/text',
            uploader: '/vendor/jquery-form/jquery.form',
            scroller: '/vendor/jquery.scrollbar/jquery.scrollbar.min',
            perfectScrollbar: '/vendor/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min',
            TweenMax : '/vendor/gsap/src/minified/TweenMax.min',
            dataset: '/vendor/polyfill/dataset',
            arrayFrom: '/vendor/polyfill/Array.from',
            promise: '/vendor/polyfill/promise',
            quill: '/vendor/quill/dist/quill.min'
        }
    });
    /**
     * App startup!
     */
    var basics = ['jquery','domReady','riot','webstarter','arrayFrom','perfectScrollbar'];
    // Show tests
    var showTests = document.querySelector('#mocha');
    if(showTests) basics = basics.concat(['chai','mocha']);
    // Require polyfils for ie9
    if(/MSIE (8|9)/i.test(window.navigator.userAgent)) {
        basics.push('matchMedia');
        basics.push('es5');
        basics.push('html5');
    }
    if(/MSIE (9|10)/i.test(window.navigator.userAgent)){
        basics.push('dataset');
    }
    if(/(MSIE|Trident)/i.test(window.navigator.userAgent)){
        basics.push('promise');
    }
    var tags = [
        'tags/content/content',
        'tags/avatar/avatar',
        'tags/header/header',
        'tags/menu-header/menu-header',
        'tags/x-l18n/x-l18n',
        'tags/core-media-query/core-media-query',
        'tags/x-media-queries/x-media-queries',
        'tags/web-slide/web-slide',
        'tags/x-snackbar/x-snackbar',
        'tags/x-hash/x-hash'
    ];
    // Define route
    var route = location.href.replace(/(http|https)\:\/\/(.*?)\//i,'').replace(/\#.*/,'').replace(/\?.*/,'').replace(/\/$/,'');
    if(routes[route] && routes[route].length) tags = tags.concat(routes[route]);
    require(basics.concat(tags),
        function($,domReady,riot,Webstarter){
            //Riot basic settings
            riot.settings.brackets = '{{ }}';
            // Setup test parameters;
            if(showTests) {
                mocha.ui('tdd');
                var tests = [];
                if($(showTests).data().globalTests) tests.push($(showTests).data().globalTests);
                if($(showTests).data().pageTests)  tests.push($(showTests).data().pageTests);
                require(tests,function(){
                    mocha.run();
                });
            }
            /**
             * When dom is ready - grab all tags and place their in globals
             */
            domReady(function(){
               Webstarter.tags = riot.mount('*');
                // Apperance
                document.body.style.opacity = 1;
                document.body.style.webkitAnimation = 'apperance cubic-bezier(1, 0.4, 0.175, 0.2) .2s 1';
                document.body.style.animation = 'apperance cubic-bezier(1, 0.4, 0.175, 0.2) .2s 1';
            });
    });
})();



