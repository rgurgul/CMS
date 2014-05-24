require(['jquery',
         'backbone',
         'utils/tpl',
         "router"],
    function($, Backbone, tpl, AppRouter) {
        Backbone.View.prototype.close = function() {
            console.log('Closing view ' + this);
            if (this.beforeClose) {
                this.beforeClose();
            }
            this.remove();
            this.unbind();
        };
        tpl.loadTemplates(['login-tpl',
                           'body',
                           'work-list-item',
                           'work-details',
                           'section-settings',
                           'news-details',
                           'news-list-item'
            ],
            function() {
                app = new AppRouter();
                Backbone.history.start();
            })
    })