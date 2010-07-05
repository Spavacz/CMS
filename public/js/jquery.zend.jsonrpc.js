/*
 * jquery.zend.jsonrpc.js 1.0
 * 
 * Copyright (c) 2009 Tanabicom, LLC
 * http://www.tanabi.com
 *
 * Released under the MIT license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* USAGE
 *
 * var json_client = jQuery.Zend.jsonrpc(options)
 *
 * Returns a json_client object that implements all the methods provided
 * by the Zend JSON RPC server.  Options is an object which may contain the
 * following parameters:
 *
 * url                  - The URL of the JSON-RPC server.
 * version              - Version of JSON-RPC to implement (default: detect)
 * async                - Use async requests (boolean, default false)
 */
if(!jQuery.Zend){
    jQuery.Zend = { };
}

jQuery.Zend.jsonrpc = function(options) {
    /* Create an object that can be used to make JSON RPC calls. */
    return new (function(options){
        /* Self reference variable to be used all over the place */
        var self = this;
        
        /* Merge selected options in with default options. */
        this.options = jQuery.extend({
                                        url: '',
                                        version: '',
                                        async: false
        },options);
        
        /* Keep track of our ID sequence */
        this.sequence = 1;
        
        /* See if we're in an error condition. */
        this.error = false;
        
        /* Do an ajax request to the server and build our object. */
        jQuery.ajax({
            async: self.options.async,
            contentType: 'application/json',
            type: 'get',
            processData: false,
            dataType: 'json',
            url: self.options.url,
            cache: false,
            error: function(req,stat,err){
            /* This is a somewhat lame error handling -- maybe we should
             * come up with something better?
             */
                self.error = true;
                self.error_message = stat;
                self.error_request = req;
            },
            success: function(data){
                /* Set version if we don't have it yet. */
                if(!self.options.version){
                    if(data.envelope == "JSON-RPC-1.0"){
                        self.options.version = 1;
                    }else{
                        self.options.version = 2;
                    }
                }
                
                /* On success, let's build some callback methods. */
                jQuery.each(data.methods,function(key,val){
                    self[key] = function(){
                        var params = new Array();
                        for(var i = 0; i < arguments.length; i++){
                            params.push(arguments[i]);
                        }
                        
                        var id = (self.sequence++);
                        var reply = [];
                        
                        /* We're going to build the request array based upon
                         * version.
                         */
                        if(self.options.version == 1){
                            var tosend = {method: key,params: params,id: id};
                        }else{
                            var tosend = {jsonrpc: '2.0',method: key,params: params,id: id};
                        }
                        
                        /* AJAX away! */
                        jQuery.ajax({
                            async: self.options.async,
                            contentType: 'application/json',
                            type: data.transport,
                            processData: false,
                            dataType: 'json',
                            url: self.options.url,
                            cache: false,
                            data: JSON.stringify(tosend),
                            error: function(req,stat,err){
                                self.error = true;
                                self.error_message = stat;
                                self.error_request = req;
                            },
                            success: function(inp){
                            	if(inp.error){
                            		self.error = true;
                            		self.error_message = inp.error.message;
                            	}else{
                            		self.error = false;
                            		reply = inp.result;
                            	}
                            }
                        });
                        
                        return reply;
                    }
                });
            }
        });
        
        return this;
    })(options);
};
