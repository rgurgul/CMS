define(['jquery', 'underscore', 'backbone'], function() {
    var News = Backbone.Model.extend({
        defaults: {
            id: null,
            title: "",
            description: ""
        }
    })
    return News;
})