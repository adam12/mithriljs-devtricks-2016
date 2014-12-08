
;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("pretty-pre", function (exports, module) {
exports.strip = function(selector) {
  var elementList = document.querySelectorAll(selector);

  for (var i = 0; i<= elementList.length; i++) {
    var element = elementList[i];

    if (typeof element === "undefined") continue;

    var stripped = element.textContent
                    .replace(/^\s+\|/mg, '')
                    .replace(/^\s+|\s+$/g, '');

    element.textContent = stripped;
  }
};

});

if (typeof exports == "object") {
  module.exports = require("pretty-pre");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("pretty-pre"); });
} else {
  this["prettyPre"] = require("pretty-pre");
}
})()
