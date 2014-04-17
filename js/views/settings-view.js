define(['jquery', 'backbone', 'utils/tpl', 'utils/loadFile', 'redactor/redactor/redactor', 'views/TestExtend'],
    function($, Backbone, tpl, loadFile, redactor, TestExtend){
    var SettingsSectionView = TestExtend.extend({
        tagName: 'div',
        initialize: function () {
            this.template = _.template(tpl.get('section-settings'))
        },
        events: {
            "click #add-bg" : "loadBg",
            "click #btn-save" : "save"
        },
        render: function () {
            var tmp = $(this.el).html(this.template(this.model.toJSON()));
            $("#what-is", this.el).html("Ustawienia sekcji : " + this.model.get('nazwa'));
            $("#description", this.el).redactor({plugins: this.redactorPlugins});
            return tmp;
        },
        save: function(event){
            event.preventDefault();
            this.model.set({
                bg: $("#bg-section").val(),
                color: $("#color-section").val(),
                description: $("#description").val(),
                colorklapsdra: $("#color-klapsdra").val(),
                alpha: $("#alpha").val()

            })
            this.model.save(null,{
                success: function(){
                    alert('ustawiania zaktualizowane');
                }
            })
        },
        loadBg: function(){
            loadFile. loadFotoWin($('#bg-section'), 'singiel', this.model.get('id'));
        }
    })

    return SettingsSectionView;
})