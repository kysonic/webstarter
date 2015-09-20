var riot = require('riot');
function cb(opts) {
    // Attributes
    this.cors = opts.cors=='true' || false;
    this.async = opts.async=='true' || true;
    this.json = opts.json=='true' || false;
    // Basics
    this.bodyMethods = {POST: 1,PUT: 1,PATCH: 1,DELETE: 1};
    /**
     * Create XHR with credentials or not.
     * @param method
     * @param url
     * @returns {XMLHttpRequest}
     */
    this.createXHR = (method,url)=>{
        // Create XHR
        var xhr = new XMLHttpRequest();
        // If was set Cross Origin Request option, try to use credentials
        if(this.cors) {
            if ("withCredentials" in xhr) {
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined") {
                //  IE way
                xhr = new XDomainRequest();
                xhr.open(method, url);
            }else {
                // Don't support CORS
                xhr = null;
                throw new Error('CORS not supported');
            }
        }
        return xhr;
    }
    /**
     * Create arbitrary Request
     * @param opts {url,method,params,body,async,callback,headers}
     * @returns {*} - XML Http Request
     */
    this.request = (opts)=>{
        var xhr = this.createXHR(opts.method,opts.url);
        var url = opts.url;
        var method = opts.method || 'GET';
        var params = this.toQueryString(opts.params);
        var async = opts.async || this.async;
        var headers = opts.headers || {};
        // Handle GET params
        if (params && method == 'GET') { url += (url.indexOf('?') > 0 ? '&' : '?') + params;}
        var xhrParams = this.isBodyMethod(opts.method) ? (opts.body || params) : null;
        // Open request
        xhr.open(method, url, async);
        // CORS
        if(this.cors) xhr.withCredentials = true;
        // Handle ready state like a boss
        this.makeReadyStateHandler(xhr, opts.callback);
        // Basic Headers
        headers['X-Requested-With'] = 'XMLHttpRequest';
        headers['if-none-match'] = 'no-match-for-this';
        this.setRequestHeaders(xhr, headers);
        // GO!
        xhr.send(xhrParams);
        // It's need for sync request
        if (!async) {xhr.onreadystatechange(xhr);}
        return xhr;
    }
    /**
     * GET
     * @param url - request URL
     * @param params - object, which will be remake to query string
     * @return {Promise} A++ Promise.
     */
    this.get = (url,params)=>new Promise((resolve,reject)=>{
        var headers = this.json ? {'Content-Type':'application/json'} : {};
        this.request({method:'GET',url:url,params:params,callback:(response,xhr)=>{
            if(response.status!=200) reject(response,xhr);
            var data = response.response && this.json ? JSON.parse(response.response) : response.response;
            resolve(data,response,xhr);
        }});
    });
    /**
     * POST
     * @param url - request URL
     * @param body - object with data
     * @return {Promise} A++ Promise.
     */
    this.post = (url,body)=>new Promise((resolve,reject)=>{
        var headers = this.json ? {'Content-Type':'application/json'} : {};
        this.request({method:'POST',url:url,body:JSON.stringify(body),headers:headers,callback:(response,xhr)=>{
            if(response.status!=200) reject(response,xhr);
            var data = response.response && this.json ? JSON.parse(response.response) : response.response;
            resolve(data,response,xhr);
        }});
    });
    /**
     * PUT
     * @param url - request URL
     * @param body - object with data
     * @param id  - id of possible to update element
     * @return {Promise} A++ Promise.
     */
    this.put = (url,body,id)=>new Promise((resolve,reject)=>{
        var headers = this.json ? {'Content-Type': "application/json"} : {};
        var id = id || '';
        this.request({method:'PUT',url:url+'/'+id,body:JSON.stringify(body),headers:headers,callback:(err,response,xhr)=>{
            if(response.status!=200) reject(response,xhr);
            var data = response.response && this.json ? JSON.parse(response.response) : response.response;
            resolve(data,response,xhr);
        }});
    });
    /**
     * DELETE
     * @param url - request URL
     * @param id  - id of possible to delete element
     * @return {Promise} A++ Promise.
     */
    this.delete = (url,id)=>new Promise((resolve,reject)=>{
        var headers = this.json ? {contentType: "application/json"} : {};
        var id = id || '';
        this.request({method:'PUT',url:url+"/"+id,headers:headers,callback:(err,response,xhr)=>{
            if(response.status!=200) reject(response,xhr);
            var data = response.response && this.json ? JSON.parse(response.response) : response.response;
            resolve(data,response,xhr);
        }});
    });
    /**
     * Encode params to query string
     * @return {String} - Params query string
     */
    this.toQueryString = (params)=>{
        var r = [];
        for (var n in params) {
            var v = params[n];
            n = encodeURIComponent(n);
            r.push(v == null ? n : (n + '=' + encodeURIComponent(v)));
        }
        return r.join('&');
    }
    /**
     * Check method for body spec
     * @param method - Method name {String}
     */
    this.isBodyMethod = (method)=>this.bodyMethods[(method || '').toUpperCase()];
    /**
     * Make ready state handler
     * @param xhr - XMLHTTPREQUEST
     * @param callback - callback function
     */
    this.makeReadyStateHandler = (xhr, callback)=>{
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback && callback.call(xhr.response, xhr);
            }
        };
    }
    /**
     * Set Headers
     * @param xhr - XMLHttpRequest
     * @param headers - header in object
     */
    this.setRequestHeaders=function(xhr, headers) {
        if (headers) {
            for (var name in headers) {
                xhr.setRequestHeader(name, headers[name]);
            }
        }
    }
}





