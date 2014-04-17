define(['jquery', 'backbone', 'utils/tpl', 'utils/loadFile', 'utils/Confirmer',
       'redactor/redactor/fontsize', 'libs/brick'],
    function($, Backbone, tpl, confirmer) {
        var TestExtend = Backbone.View.extend({
            redactorPlugins: ['fontsize'],
            initialize: function(options){
//                Backbone.View.prototype.initialize.call(this, options);
                //console.log(redactor)
            }
        })
        return TestExtend;
    })