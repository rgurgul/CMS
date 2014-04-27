define(['jquery',
        'backbone',
        'utils/tpl',
        'utils/loadFile',
        'utils/Confirmer',
        'views/base-view'],
    function($, Backbone, tpl, loadFile, confirmer, BaseView) {
        var DetailView = BaseView.extend({
            tagName: 'div',
            events: {
                "submit #form": 'onSubmit',
                "click #btn-delete": "deleteWork",
                "click #add-icon": "loadIcon",
                "click #add-bg": "loadBg",
                "click #add-gallery": "loadGallery"
            },
            onSubmit: function(event) {
                event.preventDefault();
                $('#type', this.el).attr('disabled', 'disabled')
                this.saveWork();
            },
            initialize: function(options) {
                BaseView.prototype.initialize.call(this, options);
                this.template = _.template(tpl.get('work-details'))
            },
            loadIcon: function() {
                loadFile.loadFotoWin($('#icon-img'),
                    'singiel',
                    this.model.isNew() ? $('#type').val() : this.model.get('type'));
            },
            loadBg: function() {
                loadFile.loadFotoWin($('#bg-img'),
                    'singiel',
                    this.model.isNew() ? $('#type').val() : this.model.get('type'));
            },
            loadGallery: function() {
                loadFile.loadFotoWin($('#gallery'),
                    'multi',
                    this.model.isNew() ? $('#type').val() : this.model.get('type'));
            },
            render: function() {
                var div = $(this.el).html(this.template(this.model.toJSON()))
                if (this.model.isNew()) {
                    $("#what-is", this.el).html("Nowy rekord")
                    $('#type', this.el).removeAttr('disabled')
                } else {
                    $("#what-is", this.el).html("Edycja rekordu: " + this.model.get('title'))
                    $('#type option[value=' + this.model.get('type') + ']', this.el).attr('selected', 'selected');
                    $("#description", this.el).redactor({plugins: this.redactorPlugins});
                }
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
            saveWork: function() {
                this.model.set({
                    type: $('#type').val(),
                    title: $('#title').val(),
                    description: $('#description').val(),
                    date: $('#date').val(),
                    localization: $('#localization').val(),
                    icon: $('#icon-img').val(),
                    bg: $('#bg-img').val(),
                    gallery: $('#gallery').val(),
                    color: $('#nav-color').val(),
                    alpha: $('#alpha').val(),
                    colorklapsdra: $("#color-klapsdra").val()
                });
                if (this.model.isNew()) {
                    var self = this;
                    app.workCollection.create(this.model, {
                        success: function() {
                            app.navigate('work/' + self.model.id, false);
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
        return DetailView;
    })