define(
    ['jquery', 'backbone', 'utils/tpl', 'models/work-model'],
    function($, Backbone, tpl, workModel){
        var MenuView = Backbone.View.extend({
            tagName: 'ul',
            initialize: function(){
                //this.template = _.template(tpl.get('work-list-item'));
                //this.model.bind("add", this.appendNewWork, this);
                $(this.el).addClass('dropdown-menu');
            },
            render: function(type){
                //this.$el.html('')
                this.type = type;
                $(this.el).append('<li><a href="/adm/#settings/' + type + '">Ustawienia sekcji</a></li>');//dodanie linku do ustawien
                _.each(this.model.remaining(type), function(work) {
                    $(this.el).append(new LiView({model: work}).render())
                    //alert(work.attributes.title)
                }, this);
                //alert(this.model.remaining(3));
                return this.el;
            },
            appendNewWork: function(work) {
                var w = new workModel(work)
                if(this.type != w.get('type')) return

                this.$el.append(new LiView({
                    model: w
                }).render());
            },
            removeWork: function(work){
                $('.work-' + work.attributes.id, this.$el).remove();
            }
        })

        var LiView = Backbone.View.extend({
            tagName: "li",
            initialize: function(){
                this.template = _.template(tpl.get('work-list-item'))
                this.model.bind("destroy", this.close, this);
                this.model.bind("change", function(){
                    //app.workCollection.resetownia()
                }, this);
            },
            render: function(){
                $(this.el).addClass('work-' + this.model.get('id'));
                return this.$el.html(this.template(this.model.toJSON()))
            }
        })
        return MenuView;
    }
)