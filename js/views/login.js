define(['jquery', 'backbone', 'utils/tpl'],
    function($, Backbone, tpl){
        var Login = Backbone.View.extend({
            initialize: function(){
                this.tamplate = _.template(tpl.get('login-tpl'));
            },
            render: function(){
                return $(this.el).html(this.tamplate())
            },
            events: {
                "click .btn-success" : "checkUser"
            },
            checkUser: function(event){
                event.preventDefault();
                var test = $.post("/works/login/", {name: $("#name").val(), pass: $("#pass").val()}, this.login );
            },
            login: function(data){
                if(JSON.parse(data).name == 'admin'){
                    app.user = true;
                    app.navigate('init', true);
                }
            }
        });
        return Login;
    })