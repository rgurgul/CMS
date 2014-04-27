require.config({
    deps: ["main"],
    baseUrl: "js",
    paths: {
        // Libraries
        jquery: "libs/jquery.min",
        underscore: "libs/underscore",
        backbone: "libs/backbone",
        routefilter: "libs/backbone.routefilter.min"
    },
    shim: {
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        routefilter: {
            deps: ["backbone"],
            exports: "Routefilter"
        }
    }
});
