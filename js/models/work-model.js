define(['jquery', 'underscore', 'backbone'], function() {
        var Work = Backbone.Model.extend({
            defaults: {
                id: null,
                type: "",
                title: "",
                description: "",
                date: "",
                localization: "",
                icon: "",
                bg: "",
                gallery: "",
                color: "",
                alpha: "",
                colorklapsdra: ''
            }
        })
        return Work;
    })