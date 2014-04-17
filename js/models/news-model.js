define(
    ['jquery', 'underscore', 'backbone'],
    function(){

        var News = Backbone.Model.extend({

            defaults: {
                id: null,
                title: "ttt",
                description: "ddd"
            }
        })

        return News;

    })