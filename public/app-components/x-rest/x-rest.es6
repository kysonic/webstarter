define(['jquery'],$);
function cb(opts) {
    // Api URL
    this.api = opts.api || './';
    /**
     * Read
     * @param id - object id or null
     */
    this.get = (id)=> new Promise((resolve,reject)=>{
        $.get(this.api+(id || ''))
            .done((data)=>resolve(data))
            .fail((err)=>reject(err))
    });
    /**
     * Update
     * @param id - object id or null
     * @param params - params for document update
     */
    this.put = (id,params)=> new Promise((resolve,reject)=>{
        $.ajax({url: this.api+(id || ''),data:JSON.stringify(params),contentType: "application/json",type:'PUT',dataType:'json'})
            .done((data)=>resolve(data))
            .fail((err)=>reject(err))
    });
    /**
     * Create
     * @param id - object id or null
     * @param params - params for document update
     */
    this.post = (params)=> new Promise((resolve,reject)=>{
        $.ajax({url: this.api,data:JSON.stringify(params),contentType: "application/json",type:'POST',dataType:'json'})
            .done((data)=>resolve(data))
            .fail((err)=>reject(err))
    });
    /**
     * Delete
     * @param id - object id or null
     */
    this.delete = (id)=> new Promise((resolve,reject)=>{
        $.ajax({url: this.api+(id || ''),contentType: "application/json",type:'DELETE',dataType:'json'})
            .done((data)=>resolve(data))
            .fail((err)=>reject(err))
    });
    /**
     * Query - get documents of this query. Example - this.User.query({email:'soooyc@gmail.com'});
     * @param id - object id or null
     */
    this.query = (query)=> new Promise((resolve,reject)=>{
        $.ajax({url: this.api,data:query,contentType: "application/json",type:'GET',dataType:'json'})
            .done((data)=>resolve(data))
            .fail((err)=>reject(err))
    });

    /**
     * Custom query for api url.
     * @param params - send data
     * @param method - xhr method
     */
    this.custom = (method,params,uri)=> new Promise((resolve,reject)=>{
        var prms = {url: this.api+'/'+uri,contentType: "application/json",type:method,dataType:'json'};
        if(Object.keys(params).length!==0) prms['data'] = JSON.stringify(params);
        $.ajax(prms)
            .done((data)=>resolve(data))
            .fail((err)=>reject(err))
    });
}





