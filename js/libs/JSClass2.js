(function () {

    /** Shared empty constructor function to aid in prototype-chain creation.
     * @private
     */

        console.log('jsclas2')
    var ctor = function () {
    };

    /** Helper function to correctly set up the prototype chain, for subclasses.
     * Similar to `goog.inherits`, but uses a hash of prototype properties and
     * class properties to be extended.
     * @private
     */


    var inherits = function (parent, protoProps, staticProps) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                parent.apply(this, arguments);
            };
        }

        // Inherit class (static) properties from parent.
        _.extend(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) {
            _.extend(child.prototype, protoProps);
        }

        // Add static properties to the constructor function, if supplied.
        if (staticProps) {
            _.extend(child, staticProps);
        }

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;

        return child;
    };

    /** Helper function to aid in prototype-chain creation.
     * @private
     * @example Backstage.ModuleLoader = Backstage.Plugin.extend({ ...properties... });
     */

    var extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };

    /**
     * Javascript class with extend function
     * @class
     * @constructor
     */
    var JSClass = function (options) {
        options = options || {};
        if (options) {
            _.extend(this.options, options);
        }
        if (this.initialize) {
            this.initialize.call(this, options);
        }
    };

    JSClass.prototype = /**
     * @lends JSClass
     */
    {
        initialize: function (/**Object*/ options) {
        }
    };
    /**
     * @memberOf JSClass
     * @type {Function}
     */
    JSClass.extend = extend;

    //Module export
    return JSClass;
})()