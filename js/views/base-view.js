define(['jquery', 'backbone', 'redactor/redactor/fontsize'], function($, Backbone) {
        var baseView = Backbone.View.extend({
            redactorPlugins: ['fontsize'],
            initialize: function(options) {
                //Backbone.View.prototype.initialize.call(this, options);
            }
        })
        return baseView;
    })