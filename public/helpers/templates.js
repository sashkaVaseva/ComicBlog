/*globals $ */
"use strict";
import "jquery";

let handlebars = window.handlebars || window.Handlebars;

export default {
    load: function(name) {
        var url = "../app/js/templates/" + name + ".handlebars";
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                success: function(data) {
                    resolve(handlebars.compile(data));
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }
};