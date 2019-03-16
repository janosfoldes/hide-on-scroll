(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// HIDE ON SCROLL
// ==============
// Constants
// ---------
var defaultSelector = '.hide-on-scroll';
var defaultOptions = {
  delay: 2000,
  position: 0
};
var attrDelay = 'data-hide-delay';
var attrPosition = 'data-hide-position';
var classHidden = 'is-hidden-on-scroll';
var classLocked = 'is-locked';
var classNoAnim = 'no-anim';
var classTop = 'at-top'; // Static Members
// --------------

var _instanceCount = 0;
var _isScrollingUpwards = false;

var _scrollPosition = window.scrollY || window.pageYOffset; // Utility Methods
// ---------------


function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);

  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];

    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));

    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }

  return to;
}

function toggleClass(element, className, force) {
  if (force) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
} // HideOnScroll
// ------------


var HideOnScroll =
/*#__PURE__*/
function () {
  _createClass(HideOnScroll, [{
    key: "items",
    get: function get() {
      return this._items;
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    }
  }, {
    key: "selector",
    get: function get() {
      return this._selector;
    }
  }], [{
    key: "instanceCount",
    get: function get() {
      return _instanceCount;
    }
  }, {
    key: "isScrollingUpwards",
    get: function get() {
      return _isScrollingUpwards;
    }
  }, {
    key: "scrollPosition",
    get: function get() {
      return _isScrollingUpwards;
    }
  }]);

  function HideOnScroll() {
    var _this = this;

    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSelector;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, HideOnScroll);

    // Selector
    this._selector = selector; // Options

    this._options = assign({}, defaultOptions, options); // Items

    this._items = [];
    var nodeList = document.querySelectorAll(selector);

    for (var i = 0; i < nodeList.length; i++) {
      this._items.push(new HideOnScrollItem(this, nodeList[i]));
    } // On Scroll


    if (_instanceCount == 0) {
      window.addEventListener('scroll', function (e) {
        _this.refresh(e);
      });
    }

    _instanceCount++;
  }

  _createClass(HideOnScroll, [{
    key: "refresh",
    value: function refresh(e) {
      var position = window.scrollY || window.pageYOffset;
      if (position == _scrollPosition) return;
      toggleClass(document.body, classTop, position <= 0);
      _isScrollingUpwards = position < _scrollPosition || position <= 0;
      _scrollPosition = position;

      for (var i = 0; i < this._items.length; i++) {
        this._items[i].refresh();
      }
    }
  }]);

  return HideOnScroll;
}(); // HideOnScrollItem
// ----------------


exports.default = HideOnScroll;

var HideOnScrollItem =
/*#__PURE__*/
function () {
  _createClass(HideOnScrollItem, [{
    key: "element",
    get: function get() {
      return this._element;
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    }
  }, {
    key: "parent",
    get: function get() {
      return this._parent;
    }
  }]);

  function HideOnScrollItem(parent, element) {
    _classCallCheck(this, HideOnScrollItem);

    this._parent = parent;
    this._element = element;
    this._options = assign({}, parent._options);

    this._setOptionInt('delay', attrDelay);

    this._setOptionInt('position', attrPosition);
  }

  _createClass(HideOnScrollItem, [{
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    })
  }, {
    key: "hide",
    value: function hide() {
      if (_scrollPosition <= this._options.position || this._element.classList.contains(classLocked)) return;
      this._timeoutId = undefined;

      this._element.classList.add(classHidden);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var _this2 = this;

      this.clearTimeout();

      this._element.classList.remove(classNoAnim);

      var show = _isScrollingUpwards || _scrollPosition <= this._options.position || this._element.classList.contains(classLocked);

      if (show) {
        this._element.classList.remove(classHidden);

        this._timeoutId = setTimeout(function () {
          _this2.hide();
        }, this._options.delay);
      } else if (this._timeoutId == undefined) {
        this._element.classList.add(classHidden);
      }
    }
  }, {
    key: "_setOptionInt",
    value: function _setOptionInt(option, attr) {
      var value = this._element.getAttribute(attr);

      if (value) {
        this._options[option] = parseInt(value);
      }
    }
  }]);

  return HideOnScrollItem;
}(); // Globals
// -------


window.HideOnScroll = HideOnScroll;

},{}]},{},[1])

//# sourceMappingURL=../maps/hide-on-scroll.js.map
