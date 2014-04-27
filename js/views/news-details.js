define(['jquery',
        'backbone',
        'utils/tpl',
        'utils/loadFile',
        'utils/Confirmer',
        'redactor/redactor/redactor',
        'views/base-view'],
    function($, Backbone, tpl, loadFile, confirmer, redactor, BaseView) {
        var DetailViewNews = BaseView.extend({
            tagName: 'div',
            events: {
                "submit #form": 'onSubmit',
                "click #btn-delete": "deleteWork"
            },
            onSubmit: function(event) {
                event.preventDefault();
                this.saveNews();
            },
            initialize: function(options) {
                this.template = _.template(tpl.get('news-details'))
            },
            render: function() {
                var div = $(this.el).html(this.template(this.model.toJSON()))
                if (this.model.isNew()) {
                    $("#what-is", this.el).html("Nowy rekord")
                } else {
                    $("#what-is", this.el).html("Edycja rekordu: " + this.model.get('title'))
                }
                $("#description", this.el).redactor({plugins: this.redactorPlugins});
                return div;
            },
            deleteWork: function() {
                if (!conf.question("Potwierdź usunięcie obiektu")) {
                    return;
                }
                this.model.destroy({
                    success: function() {
                        alert('usunięto');
                        window.history.back();
                    }
                });
                return false;
            },
            saveNews: function() {
                this.model.set({
                    title: $('#title').val(),
                    description: $('#description').val()
                });
                if (this.model.isNew()) {
                    console.dir(this.model)
                    var self = this;
                    app.newsCollection.create(this.model, {
                        success: function() {
                            app.navigate('news/' + self.model.id, false);
                            alert('obiekt dodany')
                        }
                    });
                } else {
                    this.model.save(null, {
                        success: function() {
                            alert('obiekt zaktualizowany')
                        }
                    });
                }
                return false;
            }
        })
        return DetailViewNews;
    })