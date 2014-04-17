define(
    ['jquery', 'underscore', 'backbone', 'models/work-model'],
    function($, _, Backbone, Work){

        var WorkCollection = Backbone.Collection.extend({
            model: Work,
            url: '/works/',
            done: function(type) {
                return this.filter(function(model){ return model.get('type') != type; });
            },

            // Filter down the list to only todo items that are still not finished.
            remaining: function(type) {
                return this.without.apply(this, this.done(type));
            }
        })

        return WorkCollection;

    }
)