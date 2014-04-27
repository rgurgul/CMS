define(['backbone'], function(Backbone) {
        var SectionSettingsModel = Backbone.Model.extend({
            defaults: {
                bg: '',
                color: '',
                description: '',
                colorklapsdra: '',
                alpha: ''
            }
        })
        return SectionSettingsModel;
    })
