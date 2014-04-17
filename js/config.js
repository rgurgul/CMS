// Original concepts provided by Backbone Boilerplate project: https://github.com/tbranyen/backbone-boilerplate
require.config({
    // Initialize the application with the main application file
    deps: ["main"],

    baseUrl: "js",

    paths: {
        // Libraries
        jquery: "libs/jquery.min",
        underscore: "libs/underscore",
        backbone: "libs/backbone",
        routefilter: "libs/backbone.routefilter.min",
        brick: 'libs/brick'
    },

    shim: {
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        routefilter: {
            deps: ["backbone"],
            exports: "Routefilter"
        },

        /*brick: {
            deps: ['jquery'],
            exports: 'Brick'
        }*/
        brick: ["jquery"]
    }
});
