define(
    ['jquery', 'underscore', 'backbone', 'models/settings-section-model'],
    function($, _, Backbone, Settings){

        var SettingsCollection = Backbone.Collection.extend({
            model: Settings,
            url: '/works/settings/',

            done: function(type) {
                return this.filter(function(model){ return model.get('type') != type; });
            },

            // Filter down the list to only todo items that are still not finished.
            remaining: function(type) {
                return this.without.apply(this, this.done(type));
            }
        })

        return SettingsCollection;

    }
)