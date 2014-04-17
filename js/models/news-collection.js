define(
    ['jquery', 'underscore', 'backbone', 'models/news-model'],
    function($, _, Backbone, newsModel){

        var NewsCollection = Backbone.Collection.extend({
            model: newsModel,
            url: '/works/news/'
        })

        return NewsCollection;

    }
)