define(
    ['jquery', 'backbone', 'utils/tpl'],
    function($, Backbone, tpl){
        var MenuNews = Backbone.View.extend({
            tagName: 'ul',
            initialize: function(){
                $(this.el).addClass('dropdown-menu');
            },
            render: function(){
                //console.dir(this.model.models)
                $(this.el).append('<li><a href="/adm/#settings/5">Ustawienia sekcji</a></li>');//dodanie linku do ustawien
                _.each(this.model.models, function(news){
                    $(this.el).append( new NewsLi({model: news}).render() )
                }, this)
                return this.el
            }
        })

        var NewsLi = Backbone.View.extend({
            tagName: "li",
            initialize: function(){
                this.template = _.template(tpl.get('news-list-item'));
                this.model.bind("destroy", this.close, this);
            },
            render: function(){
                return this.$el.html(this.template(this.model.toJSON()))
            }
        })

        return MenuNews;
    })