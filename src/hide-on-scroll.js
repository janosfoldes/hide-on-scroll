// HIDE ON SCROLL
// ==============

// Constants
// ---------

const defaultSelector = '.hide-on-scroll';
const defaultOptions  = {
    delay: 2000,
    position: 0
};

const attrDelay       = 'data-hide-delay';
const attrPosition    = 'data-hide-position';

const classHidden     = 'is-hidden-on-scroll';
const classLocked     = 'is-locked';
const classNoAnim     = 'no-anim';
const classTop        = 'at-top';

// Static Members
// --------------

let _instanceCount = 0;
let _isScrollingUpwards = false;
let _scrollPosition = window.scrollY || window.pageYOffset;

// Utility Methods
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
}

// HideOnScroll
// ------------

export default class HideOnScroll {

    static get instanceCount() { return _instanceCount; }
    static get isScrollingUpwards() { return _isScrollingUpwards; }
    static get scrollPosition() { return _isScrollingUpwards; }

    get items() { return this._items; }
    get options() { return this._options; }
    get selector() { return this._selector; }

    constructor (selector = defaultSelector, options = {}) {
        // Selector
        this._selector = selector;
        // Options
        this._options = assign({}, defaultOptions, options);
        // Items
        this._items = [];
        let nodeList = document.querySelectorAll(selector);
        for (let i = 0; i < nodeList.length; i++) {
            this._items.push(new HideOnScrollItem(this, nodeList[i]));
        }
        // On Scroll
        if (_instanceCount == 0) {
            window.addEventListener('scroll', (e) => {
                this.refresh(e);
            });
        }
        _instanceCount++;
    }

    refresh(e) {
        let position = window.scrollY || window.pageYOffset;
        if (position == _scrollPosition) return;
        toggleClass(document.body, classTop, (position <= 0));
        _isScrollingUpwards = (position < _scrollPosition || position <= 0)
        _scrollPosition = position;
        for (let i = 0; i < this._items.length; i++) this._items[i].refresh();
    }

}

// HideOnScrollItem
// ----------------

class HideOnScrollItem {

    get element() { return this._element; }
    get options() { return this._options; }
    get parent() { return this._parent; }

    constructor(parent, element) {
        this._parent = parent;
        this._element = element;
        this._options = assign({}, parent._options);
        this._setOptionInt('delay', attrDelay);
        this._setOptionInt('position', attrPosition);
    }

    clearTimeout() {
        clearTimeout(this._timeoutId);
        this._timeoutId = undefined;
    }

    hide() {
        if (_scrollPosition <= this._options.position || this._element.classList.contains(classLocked)) return;
        this._timeoutId = undefined;
        this._element.classList.add(classHidden);
    }

    refresh() {
        this.clearTimeout();
        this._element.classList.remove(classNoAnim);
        let show = (_isScrollingUpwards || _scrollPosition <= this._options.position || this._element.classList.contains(classLocked));
        if (show) {
            this._element.classList.remove(classHidden);
            this._timeoutId = setTimeout(() => { this.hide() }, this._options.delay);
        } else if (this._timeoutId == undefined) {
            this._element.classList.add(classHidden);
        }
    }

    _setOptionInt(option, attr) {
        let value = this._element.getAttribute(attr);
        if (value) {
            this._options[option] = parseInt(value);
        }
    }

}

// Globals
// -------

window.HideOnScroll = HideOnScroll;