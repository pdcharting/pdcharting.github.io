/*!
 * Docsify v5.0.0-rc.3
 * https://docsify.js.org
 * (c) 2017-2025
 * MIT license
 */
(function() {
    "use strict";
    function _mergeNamespaces(n, m) {
        m.forEach((function(e) {
            e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach((function(k) {
                if (k !== "default" && !(k in n)) {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function() {
                            return e[k];
                        }
                    });
                }
            }));
        }));
        return Object.freeze(n);
    }
    function cached$1(fn) {
        const cache = Object.create(null);
        return function(str) {
            const key = isPrimitive(str) ? str : JSON.stringify(str);
            const hit = cache[key];
            return hit || (cache[key] = fn(str));
        };
    }
    const hyphenate = cached$1((str => str.replace(/([A-Z])/g, (m => "-" + m.toLowerCase()))));
    function isPrimitive(value) {
        return typeof value === "string" || typeof value === "number";
    }
    function noop() {}
    function isFn(obj) {
        return typeof obj === "function";
    }
    function isExternal(url) {
        const match = url.match(/^([^:/?#]+:)?(?:\/{2,}([^/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
        if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) {
            return true;
        }
        if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {
            "http:": 80,
            "https:": 443
        }[location.protocol] + ")?$"), "") !== location.host) {
            return true;
        }
        if (/^\/\\/.test(url)) {
            return true;
        }
        return false;
    }
    const cacheNode = {};
    function getNode(el, noCache = false) {
        if (typeof el === "string") {
            if (typeof window.Vue !== "undefined") {
                return find(el);
            }
            el = noCache ? find(el) : cacheNode[el] || (cacheNode[el] = find(el));
        }
        return el;
    }
    function setHTML(el, content, replace) {
        const node = getNode(el);
        if (node) {
            node[replace ? "outerHTML" : "innerHTML"] = content;
        }
    }
    const $$1 = document;
    const body = $$1.body;
    const head = $$1.head;
    function find(el, query = ":is()") {
        return typeof el !== "string" ? el.querySelector(query) : $$1.querySelector(el);
    }
    function findAll(el, query = ":is()") {
        return Array.from(typeof el !== "string" ? el.querySelectorAll(query) : $$1.querySelectorAll(el));
    }
    function create(node, tpl) {
        const element = $$1.createElement(node);
        if (tpl) {
            element.innerHTML = tpl;
        }
        return element;
    }
    function appendTo(target, el) {
        return target.appendChild(el);
    }
    function before(target, el) {
        return target.insertBefore(el, target.children[0]);
    }
    function on(el, type, handler) {
        isFn(type) ? window.addEventListener(el, type) : el.addEventListener(type, handler);
    }
    function off(el, type, handler) {
        isFn(type) ? window.removeEventListener(el, type) : el.removeEventListener(type, handler);
    }
    function style(content) {
        appendTo(head, create("style", content));
    }
    function documentReady(callback, doc = document) {
        const state = doc.readyState;
        if (state === "complete" || state === "interactive") {
            return setTimeout(callback, 0);
        }
        doc.addEventListener("DOMContentLoaded", callback);
    }
    var dom = Object.freeze({
        __proto__: null,
        $: $$1,
        appendTo: appendTo,
        before: before,
        body: body,
        create: create,
        documentReady: documentReady,
        find: find,
        findAll: findAll,
        getNode: getNode,
        head: head,
        off: off,
        on: on,
        setHTML: setHTML,
        style: style
    });
    var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
    }
    var prism$2 = {
        exports: {}
    };
    var hasRequiredPrism;
    function requirePrism() {
        if (hasRequiredPrism) return prism$2.exports;
        hasRequiredPrism = 1;
        (function(module) {
            var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
            var Prism = function(_self) {
                var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
                var uniqueId = 0;
                var plainTextGrammar = {};
                var _ = {
                    manual: _self.Prism && _self.Prism.manual,
                    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
                    util: {
                        encode: function encode(tokens) {
                            if (tokens instanceof Token) {
                                return new Token(tokens.type, encode(tokens.content), tokens.alias);
                            } else if (Array.isArray(tokens)) {
                                return tokens.map(encode);
                            } else {
                                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
                            }
                        },
                        type: function(o) {
                            return Object.prototype.toString.call(o).slice(8, -1);
                        },
                        objId: function(obj) {
                            if (!obj["__id"]) {
                                Object.defineProperty(obj, "__id", {
                                    value: ++uniqueId
                                });
                            }
                            return obj["__id"];
                        },
                        clone: function deepClone(o, visited) {
                            visited = visited || {};
                            var clone;
                            var id;
                            switch (_.util.type(o)) {
                              case "Object":
                                id = _.util.objId(o);
                                if (visited[id]) {
                                    return visited[id];
                                }
                                clone = {};
                                visited[id] = clone;
                                for (var key in o) {
                                    if (o.hasOwnProperty(key)) {
                                        clone[key] = deepClone(o[key], visited);
                                    }
                                }
                                return clone;

                              case "Array":
                                id = _.util.objId(o);
                                if (visited[id]) {
                                    return visited[id];
                                }
                                clone = [];
                                visited[id] = clone;
                                o.forEach((function(v, i) {
                                    clone[i] = deepClone(v, visited);
                                }));
                                return clone;

                              default:
                                return o;
                            }
                        },
                        getLanguage: function(element) {
                            while (element) {
                                var m = lang.exec(element.className);
                                if (m) {
                                    return m[1].toLowerCase();
                                }
                                element = element.parentElement;
                            }
                            return "none";
                        },
                        setLanguage: function(element, language) {
                            element.className = element.className.replace(RegExp(lang, "gi"), "");
                            element.classList.add("language-" + language);
                        },
                        currentScript: function() {
                            if (typeof document === "undefined") {
                                return null;
                            }
                            if (document.currentScript && document.currentScript.tagName === "SCRIPT" && 1 < 2) {
                                return document.currentScript;
                            }
                            try {
                                throw new Error;
                            } catch (err) {
                                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                                if (src) {
                                    var scripts = document.getElementsByTagName("script");
                                    for (var i in scripts) {
                                        if (scripts[i].src == src) {
                                            return scripts[i];
                                        }
                                    }
                                }
                                return null;
                            }
                        },
                        isActive: function(element, className, defaultActivation) {
                            var no = "no-" + className;
                            while (element) {
                                var classList = element.classList;
                                if (classList.contains(className)) {
                                    return true;
                                }
                                if (classList.contains(no)) {
                                    return false;
                                }
                                element = element.parentElement;
                            }
                            return !!defaultActivation;
                        }
                    },
                    languages: {
                        plain: plainTextGrammar,
                        plaintext: plainTextGrammar,
                        text: plainTextGrammar,
                        txt: plainTextGrammar,
                        extend: function(id, redef) {
                            var lang = _.util.clone(_.languages[id]);
                            for (var key in redef) {
                                lang[key] = redef[key];
                            }
                            return lang;
                        },
                        insertBefore: function(inside, before, insert, root) {
                            root = root || _.languages;
                            var grammar = root[inside];
                            var ret = {};
                            for (var token in grammar) {
                                if (grammar.hasOwnProperty(token)) {
                                    if (token == before) {
                                        for (var newToken in insert) {
                                            if (insert.hasOwnProperty(newToken)) {
                                                ret[newToken] = insert[newToken];
                                            }
                                        }
                                    }
                                    if (!insert.hasOwnProperty(token)) {
                                        ret[token] = grammar[token];
                                    }
                                }
                            }
                            var old = root[inside];
                            root[inside] = ret;
                            _.languages.DFS(_.languages, (function(key, value) {
                                if (value === old && key != inside) {
                                    this[key] = ret;
                                }
                            }));
                            return ret;
                        },
                        DFS: function DFS(o, callback, type, visited) {
                            visited = visited || {};
                            var objId = _.util.objId;
                            for (var i in o) {
                                if (o.hasOwnProperty(i)) {
                                    callback.call(o, i, o[i], type || i);
                                    var property = o[i];
                                    var propertyType = _.util.type(property);
                                    if (propertyType === "Object" && !visited[objId(property)]) {
                                        visited[objId(property)] = true;
                                        DFS(property, callback, null, visited);
                                    } else if (propertyType === "Array" && !visited[objId(property)]) {
                                        visited[objId(property)] = true;
                                        DFS(property, callback, i, visited);
                                    }
                                }
                            }
                        }
                    },
                    plugins: {},
                    highlightAll: function(async, callback) {
                        _.highlightAllUnder(document, async, callback);
                    },
                    highlightAllUnder: function(container, async, callback) {
                        var env = {
                            callback: callback,
                            container: container,
                            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                        };
                        _.hooks.run("before-highlightall", env);
                        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
                        _.hooks.run("before-all-elements-highlight", env);
                        for (var i = 0, element; element = env.elements[i++]; ) {
                            _.highlightElement(element, async === true, env.callback);
                        }
                    },
                    highlightElement: function(element, async, callback) {
                        var language = _.util.getLanguage(element);
                        var grammar = _.languages[language];
                        _.util.setLanguage(element, language);
                        var parent = element.parentElement;
                        if (parent && parent.nodeName.toLowerCase() === "pre") {
                            _.util.setLanguage(parent, language);
                        }
                        var code = element.textContent;
                        var env = {
                            element: element,
                            language: language,
                            grammar: grammar,
                            code: code
                        };
                        function insertHighlightedCode(highlightedCode) {
                            env.highlightedCode = highlightedCode;
                            _.hooks.run("before-insert", env);
                            env.element.innerHTML = env.highlightedCode;
                            _.hooks.run("after-highlight", env);
                            _.hooks.run("complete", env);
                            callback && callback.call(env.element);
                        }
                        _.hooks.run("before-sanity-check", env);
                        parent = env.element.parentElement;
                        if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
                            parent.setAttribute("tabindex", "0");
                        }
                        if (!env.code) {
                            _.hooks.run("complete", env);
                            callback && callback.call(env.element);
                            return;
                        }
                        _.hooks.run("before-highlight", env);
                        if (!env.grammar) {
                            insertHighlightedCode(_.util.encode(env.code));
                            return;
                        }
                        if (async && _self.Worker) {
                            var worker = new Worker(_.filename);
                            worker.onmessage = function(evt) {
                                insertHighlightedCode(evt.data);
                            };
                            worker.postMessage(JSON.stringify({
                                language: env.language,
                                code: env.code,
                                immediateClose: true
                            }));
                        } else {
                            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
                        }
                    },
                    highlight: function(text, grammar, language) {
                        var env = {
                            code: text,
                            grammar: grammar,
                            language: language
                        };
                        _.hooks.run("before-tokenize", env);
                        if (!env.grammar) {
                            throw new Error('The language "' + env.language + '" has no grammar.');
                        }
                        env.tokens = _.tokenize(env.code, env.grammar);
                        _.hooks.run("after-tokenize", env);
                        return Token.stringify(_.util.encode(env.tokens), env.language);
                    },
                    tokenize: function(text, grammar) {
                        var rest = grammar.rest;
                        if (rest) {
                            for (var token in rest) {
                                grammar[token] = rest[token];
                            }
                            delete grammar.rest;
                        }
                        var tokenList = new LinkedList;
                        addAfter(tokenList, tokenList.head, text);
                        matchGrammar(text, tokenList, grammar, tokenList.head, 0);
                        return toArray(tokenList);
                    },
                    hooks: {
                        all: {},
                        add: function(name, callback) {
                            var hooks = _.hooks.all;
                            hooks[name] = hooks[name] || [];
                            hooks[name].push(callback);
                        },
                        run: function(name, env) {
                            var callbacks = _.hooks.all[name];
                            if (!callbacks || !callbacks.length) {
                                return;
                            }
                            for (var i = 0, callback; callback = callbacks[i++]; ) {
                                callback(env);
                            }
                        }
                    },
                    Token: Token
                };
                _self.Prism = _;
                function Token(type, content, alias, matchedStr) {
                    this.type = type;
                    this.content = content;
                    this.alias = alias;
                    this.length = (matchedStr || "").length | 0;
                }
                Token.stringify = function stringify(o, language) {
                    if (typeof o == "string") {
                        return o;
                    }
                    if (Array.isArray(o)) {
                        var s = "";
                        o.forEach((function(e) {
                            s += stringify(e, language);
                        }));
                        return s;
                    }
                    var env = {
                        type: o.type,
                        content: stringify(o.content, language),
                        tag: "span",
                        classes: [ "token", o.type ],
                        attributes: {},
                        language: language
                    };
                    var aliases = o.alias;
                    if (aliases) {
                        if (Array.isArray(aliases)) {
                            Array.prototype.push.apply(env.classes, aliases);
                        } else {
                            env.classes.push(aliases);
                        }
                    }
                    _.hooks.run("wrap", env);
                    var attributes = "";
                    for (var name in env.attributes) {
                        attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
                    }
                    return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
                };
                function matchPattern(pattern, pos, text, lookbehind) {
                    pattern.lastIndex = pos;
                    var match = pattern.exec(text);
                    if (match && lookbehind && match[1]) {
                        var lookbehindLength = match[1].length;
                        match.index += lookbehindLength;
                        match[0] = match[0].slice(lookbehindLength);
                    }
                    return match;
                }
                function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
                    for (var token in grammar) {
                        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                            continue;
                        }
                        var patterns = grammar[token];
                        patterns = Array.isArray(patterns) ? patterns : [ patterns ];
                        for (var j = 0; j < patterns.length; ++j) {
                            if (rematch && rematch.cause == token + "," + j) {
                                return;
                            }
                            var patternObj = patterns[j];
                            var inside = patternObj.inside;
                            var lookbehind = !!patternObj.lookbehind;
                            var greedy = !!patternObj.greedy;
                            var alias = patternObj.alias;
                            if (greedy && !patternObj.pattern.global) {
                                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
                            }
                            var pattern = patternObj.pattern || patternObj;
                            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, 
                            currentNode = currentNode.next) {
                                if (rematch && pos >= rematch.reach) {
                                    break;
                                }
                                var str = currentNode.value;
                                if (tokenList.length > text.length) {
                                    return;
                                }
                                if (str instanceof Token) {
                                    continue;
                                }
                                var removeCount = 1;
                                var match;
                                if (greedy) {
                                    match = matchPattern(pattern, pos, text, lookbehind);
                                    if (!match || match.index >= text.length) {
                                        break;
                                    }
                                    var from = match.index;
                                    var to = match.index + match[0].length;
                                    var p = pos;
                                    p += currentNode.value.length;
                                    while (from >= p) {
                                        currentNode = currentNode.next;
                                        p += currentNode.value.length;
                                    }
                                    p -= currentNode.value.length;
                                    pos = p;
                                    if (currentNode.value instanceof Token) {
                                        continue;
                                    }
                                    for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                                        removeCount++;
                                        p += k.value.length;
                                    }
                                    removeCount--;
                                    str = text.slice(pos, p);
                                    match.index -= pos;
                                } else {
                                    match = matchPattern(pattern, 0, str, lookbehind);
                                    if (!match) {
                                        continue;
                                    }
                                }
                                var from = match.index;
                                var matchStr = match[0];
                                var before = str.slice(0, from);
                                var after = str.slice(from + matchStr.length);
                                var reach = pos + str.length;
                                if (rematch && reach > rematch.reach) {
                                    rematch.reach = reach;
                                }
                                var removeFrom = currentNode.prev;
                                if (before) {
                                    removeFrom = addAfter(tokenList, removeFrom, before);
                                    pos += before.length;
                                }
                                removeRange(tokenList, removeFrom, removeCount);
                                var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                                currentNode = addAfter(tokenList, removeFrom, wrapped);
                                if (after) {
                                    addAfter(tokenList, currentNode, after);
                                }
                                if (removeCount > 1) {
                                    var nestedRematch = {
                                        cause: token + "," + j,
                                        reach: reach
                                    };
                                    matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                                    if (rematch && nestedRematch.reach > rematch.reach) {
                                        rematch.reach = nestedRematch.reach;
                                    }
                                }
                            }
                        }
                    }
                }
                function LinkedList() {
                    var head = {
                        value: null,
                        prev: null,
                        next: null
                    };
                    var tail = {
                        value: null,
                        prev: head,
                        next: null
                    };
                    head.next = tail;
                    this.head = head;
                    this.tail = tail;
                    this.length = 0;
                }
                function addAfter(list, node, value) {
                    var next = node.next;
                    var newNode = {
                        value: value,
                        prev: node,
                        next: next
                    };
                    node.next = newNode;
                    next.prev = newNode;
                    list.length++;
                    return newNode;
                }
                function removeRange(list, node, count) {
                    var next = node.next;
                    for (var i = 0; i < count && next !== list.tail; i++) {
                        next = next.next;
                    }
                    node.next = next;
                    next.prev = node;
                    list.length -= i;
                }
                function toArray(list) {
                    var array = [];
                    var node = list.head.next;
                    while (node !== list.tail) {
                        array.push(node.value);
                        node = node.next;
                    }
                    return array;
                }
                if (!_self.document) {
                    if (!_self.addEventListener) {
                        return _;
                    }
                    if (!_.disableWorkerMessageHandler) {
                        _self.addEventListener("message", (function(evt) {
                            var message = JSON.parse(evt.data);
                            var lang = message.language;
                            var code = message.code;
                            var immediateClose = message.immediateClose;
                            _self.postMessage(_.highlight(code, _.languages[lang], lang));
                            if (immediateClose) {
                                _self.close();
                            }
                        }), false);
                    }
                    return _;
                }
                var script = _.util.currentScript();
                if (script) {
                    _.filename = script.src;
                    if (script.hasAttribute("data-manual")) {
                        _.manual = true;
                    }
                }
                function highlightAutomaticallyCallback() {
                    if (!_.manual) {
                        _.highlightAll();
                    }
                }
                if (!_.manual) {
                    var readyState = document.readyState;
                    if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
                        document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
                    } else {
                        if (window.requestAnimationFrame) {
                            window.requestAnimationFrame(highlightAutomaticallyCallback);
                        } else {
                            window.setTimeout(highlightAutomaticallyCallback, 16);
                        }
                    }
                }
                return _;
            }(_self);
            if (module.exports) {
                module.exports = Prism;
            }
            if (typeof commonjsGlobal !== "undefined") {
                commonjsGlobal.Prism = Prism;
            }
            Prism.languages.markup = {
                comment: {
                    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
                    greedy: true
                },
                prolog: {
                    pattern: /<\?[\s\S]+?\?>/,
                    greedy: true
                },
                doctype: {
                    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
                    greedy: true,
                    inside: {
                        "internal-subset": {
                            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                            lookbehind: true,
                            greedy: true,
                            inside: null
                        },
                        string: {
                            pattern: /"[^"]*"|'[^']*'/,
                            greedy: true
                        },
                        punctuation: /^<!|>$|[[\]]/,
                        "doctype-tag": /^DOCTYPE/i,
                        name: /[^\s<>'"]+/
                    }
                },
                cdata: {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    greedy: true
                },
                tag: {
                    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
                    greedy: true,
                    inside: {
                        tag: {
                            pattern: /^<\/?[^\s>\/]+/,
                            inside: {
                                punctuation: /^<\/?/,
                                namespace: /^[^\s>\/:]+:/
                            }
                        },
                        "special-attr": [],
                        "attr-value": {
                            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                            inside: {
                                punctuation: [ {
                                    pattern: /^=/,
                                    alias: "attr-equals"
                                }, {
                                    pattern: /^(\s*)["']|["']$/,
                                    lookbehind: true
                                } ]
                            }
                        },
                        punctuation: /\/?>/,
                        "attr-name": {
                            pattern: /[^\s>\/]+/,
                            inside: {
                                namespace: /^[^\s>\/:]+:/
                            }
                        }
                    }
                },
                entity: [ {
                    pattern: /&[\da-z]{1,8};/i,
                    alias: "named-entity"
                }, /&#x?[\da-f]{1,8};/i ]
            };
            Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
            Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
            Prism.hooks.add("wrap", (function(env) {
                if (env.type === "entity") {
                    env.attributes["title"] = env.content.replace(/&amp;/, "&");
                }
            }));
            Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
                value: function addInlined(tagName, lang) {
                    var includedCdataInside = {};
                    includedCdataInside["language-" + lang] = {
                        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                        lookbehind: true,
                        inside: Prism.languages[lang]
                    };
                    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
                    var inside = {
                        "included-cdata": {
                            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                            inside: includedCdataInside
                        }
                    };
                    inside["language-" + lang] = {
                        pattern: /[\s\S]+/,
                        inside: Prism.languages[lang]
                    };
                    var def = {};
                    def[tagName] = {
                        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, (function() {
                            return tagName;
                        })), "i"),
                        lookbehind: true,
                        greedy: true,
                        inside: inside
                    };
                    Prism.languages.insertBefore("markup", "cdata", def);
                }
            });
            Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
                value: function(attrName, lang) {
                    Prism.languages.markup.tag.inside["special-attr"].push({
                        pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
                        lookbehind: true,
                        inside: {
                            "attr-name": /^[^\s=]+/,
                            "attr-value": {
                                pattern: /=[\s\S]+/,
                                inside: {
                                    value: {
                                        pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                        lookbehind: true,
                                        alias: [ lang, "language-" + lang ],
                                        inside: Prism.languages[lang]
                                    },
                                    punctuation: [ {
                                        pattern: /^=/,
                                        alias: "attr-equals"
                                    }, /"|'/ ]
                                }
                            }
                        }
                    });
                }
            });
            Prism.languages.html = Prism.languages.markup;
            Prism.languages.mathml = Prism.languages.markup;
            Prism.languages.svg = Prism.languages.markup;
            Prism.languages.xml = Prism.languages.extend("markup", {});
            Prism.languages.ssml = Prism.languages.xml;
            Prism.languages.atom = Prism.languages.xml;
            Prism.languages.rss = Prism.languages.xml;
            (function(Prism) {
                var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
                Prism.languages.css = {
                    comment: /\/\*[\s\S]*?\*\//,
                    atrule: {
                        pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
                        inside: {
                            rule: /^@[\w-]+/,
                            "selector-function-argument": {
                                pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                                lookbehind: true,
                                alias: "selector"
                            },
                            keyword: {
                                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                                lookbehind: true
                            }
                        }
                    },
                    url: {
                        pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
                        greedy: true,
                        inside: {
                            function: /^url/i,
                            punctuation: /^\(|\)$/,
                            string: {
                                pattern: RegExp("^" + string.source + "$"),
                                alias: "url"
                            }
                        }
                    },
                    selector: {
                        pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + string.source + ")*(?=\\s*\\{)"),
                        lookbehind: true
                    },
                    string: {
                        pattern: string,
                        greedy: true
                    },
                    property: {
                        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
                        lookbehind: true
                    },
                    important: /!important\b/i,
                    function: {
                        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
                        lookbehind: true
                    },
                    punctuation: /[(){};:,]/
                };
                Prism.languages.css["atrule"].inside.rest = Prism.languages.css;
                var markup = Prism.languages.markup;
                if (markup) {
                    markup.tag.addInlined("style", "css");
                    markup.tag.addAttribute("style", "css");
                }
            })(Prism);
            Prism.languages.clike = {
                comment: [ {
                    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                    lookbehind: true,
                    greedy: true
                }, {
                    pattern: /(^|[^\\:])\/\/.*/,
                    lookbehind: true,
                    greedy: true
                } ],
                string: {
                    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                    greedy: true
                },
                "class-name": {
                    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
                    lookbehind: true,
                    inside: {
                        punctuation: /[.\\]/
                    }
                },
                keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
                boolean: /\b(?:false|true)\b/,
                function: /\b\w+(?=\()/,
                number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
                operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
                punctuation: /[{}[\];(),.:]/
            };
            Prism.languages.javascript = Prism.languages.extend("clike", {
                "class-name": [ Prism.languages.clike["class-name"], {
                    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
                    lookbehind: true
                } ],
                keyword: [ {
                    pattern: /((?:^|\})\s*)catch\b/,
                    lookbehind: true
                }, {
                    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
                    lookbehind: true
                } ],
                function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
                number: {
                    pattern: RegExp(/(^|[^\w$])/.source + "(?:" + (/NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source),
                    lookbehind: true
                },
                operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
            });
            Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
            Prism.languages.insertBefore("javascript", "keyword", {
                regex: {
                    pattern: RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
                    lookbehind: true,
                    greedy: true,
                    inside: {
                        "regex-source": {
                            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                            lookbehind: true,
                            alias: "language-regex",
                            inside: Prism.languages.regex
                        },
                        "regex-delimiter": /^\/|\/$/,
                        "regex-flags": /^[a-z]+$/
                    }
                },
                "function-variable": {
                    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
                    alias: "function"
                },
                parameter: [ {
                    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                }, {
                    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                }, {
                    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                }, {
                    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                    lookbehind: true,
                    inside: Prism.languages.javascript
                } ],
                constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
            });
            Prism.languages.insertBefore("javascript", "string", {
                hashbang: {
                    pattern: /^#!.*/,
                    greedy: true,
                    alias: "comment"
                },
                "template-string": {
                    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
                    greedy: true,
                    inside: {
                        "template-punctuation": {
                            pattern: /^`|`$/,
                            alias: "string"
                        },
                        interpolation: {
                            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                            lookbehind: true,
                            inside: {
                                "interpolation-punctuation": {
                                    pattern: /^\$\{|\}$/,
                                    alias: "punctuation"
                                },
                                rest: Prism.languages.javascript
                            }
                        },
                        string: /[\s\S]+/
                    }
                },
                "string-property": {
                    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
                    lookbehind: true,
                    greedy: true,
                    alias: "property"
                }
            });
            Prism.languages.insertBefore("javascript", "operator", {
                "literal-property": {
                    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
                    lookbehind: true,
                    alias: "property"
                }
            });
            if (Prism.languages.markup) {
                Prism.languages.markup.tag.addInlined("script", "javascript");
                Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
            }
            Prism.languages.js = Prism.languages.javascript;
            (function() {
                if (typeof Prism === "undefined" || typeof document === "undefined") {
                    return;
                }
                if (!Element.prototype.matches) {
                    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
                }
                var LOADING_MESSAGE = "Loading…";
                var FAILURE_MESSAGE = function(status, message) {
                    return "✖ Error " + status + " while fetching file: " + message;
                };
                var FAILURE_EMPTY_MESSAGE = "✖ Error: File does not exist or is empty";
                var EXTENSIONS = {
                    js: "javascript",
                    py: "python",
                    rb: "ruby",
                    ps1: "powershell",
                    psm1: "powershell",
                    sh: "bash",
                    bat: "batch",
                    h: "c",
                    tex: "latex"
                };
                var STATUS_ATTR = "data-src-status";
                var STATUS_LOADING = "loading";
                var STATUS_LOADED = "loaded";
                var STATUS_FAILED = "failed";
                var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"])' + ":not([" + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
                function loadFile(src, success, error) {
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", src, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.status < 400 && xhr.responseText) {
                                success(xhr.responseText);
                            } else {
                                if (xhr.status >= 400) {
                                    error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                                } else {
                                    error(FAILURE_EMPTY_MESSAGE);
                                }
                            }
                        }
                    };
                    xhr.send(null);
                }
                function parseRange(range) {
                    var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
                    if (m) {
                        var start = Number(m[1]);
                        var comma = m[2];
                        var end = m[3];
                        if (!comma) {
                            return [ start, start ];
                        }
                        if (!end) {
                            return [ start, undefined ];
                        }
                        return [ start, Number(end) ];
                    }
                    return undefined;
                }
                Prism.hooks.add("before-highlightall", (function(env) {
                    env.selector += ", " + SELECTOR;
                }));
                Prism.hooks.add("before-sanity-check", (function(env) {
                    var pre = env.element;
                    if (pre.matches(SELECTOR)) {
                        env.code = "";
                        pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
                        var code = pre.appendChild(document.createElement("CODE"));
                        code.textContent = LOADING_MESSAGE;
                        var src = pre.getAttribute("data-src");
                        var language = env.language;
                        if (language === "none") {
                            var extension = (/\.(\w+)$/.exec(src) || [ , "none" ])[1];
                            language = EXTENSIONS[extension] || extension;
                        }
                        Prism.util.setLanguage(code, language);
                        Prism.util.setLanguage(pre, language);
                        var autoloader = Prism.plugins.autoloader;
                        if (autoloader) {
                            autoloader.loadLanguages(language);
                        }
                        loadFile(src, (function(text) {
                            pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                            var range = parseRange(pre.getAttribute("data-range"));
                            if (range) {
                                var lines = text.split(/\r\n?|\n/g);
                                var start = range[0];
                                var end = range[1] == null ? lines.length : range[1];
                                if (start < 0) {
                                    start += lines.length;
                                }
                                start = Math.max(0, Math.min(start - 1, lines.length));
                                if (end < 0) {
                                    end += lines.length;
                                }
                                end = Math.max(0, Math.min(end, lines.length));
                                text = lines.slice(start, end).join("\n");
                                if (!pre.hasAttribute("data-start")) {
                                    pre.setAttribute("data-start", String(start + 1));
                                }
                            }
                            code.textContent = text;
                            Prism.highlightElement(code);
                        }), (function(error) {
                            pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                            code.textContent = error;
                        }));
                    }
                }));
                Prism.plugins.fileHighlight = {
                    highlight: function highlight(container) {
                        var elements = (container || document).querySelectorAll(SELECTOR);
                        for (var i = 0, element; element = elements[i++]; ) {
                            Prism.highlightElement(element);
                        }
                    }
                };
                var logged = false;
                Prism.fileHighlight = function() {
                    if (!logged) {
                        console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
                        logged = true;
                    }
                    Prism.plugins.fileHighlight.highlight.apply(this, arguments);
                };
            })();
        })(prism$2);
        return prism$2.exports;
    }
    var prismExports = requirePrism();
    var prism = getDefaultExportFromCjs(prismExports);
    var prism$1 = _mergeNamespaces({
        __proto__: null,
        default: prism
    }, [ prismExports ]);
    const decode = decodeURIComponent;
    const encode = encodeURIComponent;
    function parseQuery(query) {
        const res = {};
        query = query.trim().replace(/^(\?|#|&)/, "");
        if (!query) {
            return res;
        }
        query.split("&").forEach((param => {
            const parts = param.replace(/\+/g, " ").split("=");
            res[parts[0]] = parts[1] && decode(parts[1]);
        }));
        return res;
    }
    function stringifyQuery(obj, ignores = []) {
        const qs = [];
        for (const key in obj) {
            if (ignores.indexOf(key) > -1) {
                continue;
            }
            qs.push(obj[key] ? `${encode(key)}=${encode(obj[key])}`.toLowerCase() : encode(key));
        }
        return qs.length ? `?${qs.join("&")}` : "";
    }
    function stripUrlExceptId(str) {
        const [path, queryString] = str.split("?");
        if (!queryString) {
            return str;
        }
        const params = new URLSearchParams(queryString);
        const id = params.get("id");
        if (id !== null) {
            return `${path}?id=${id}`;
        }
        return path;
    }
    const isAbsolutePath = cached$1((path => /(:|(\/{2}))/g.test(path)));
    const removeParams = cached$1((path => path.split(/[?#]/)[0]));
    const getParentPath = cached$1((path => {
        if (/\/$/g.test(path)) {
            return path;
        }
        const matchingParts = path.match(/(\S*\/)[^/]+$/);
        return matchingParts ? matchingParts[1] : "";
    }));
    const cleanPath = cached$1((path => path.replace(/^\/+/, "/").replace(/([^:])\/{2,}/g, "$1/")));
    const resolvePath = cached$1((path => {
        const segments = path.replace(/^\//, "").split("/");
        const resolved = [];
        for (const segment of segments) {
            if (segment === "..") {
                resolved.pop();
            } else if (segment !== ".") {
                resolved.push(segment);
            }
        }
        return "/" + resolved.join("/");
    }));
    function normaliseFragment(path) {
        return path.split("/").filter((p => p.indexOf("#") === -1)).join("/");
    }
    function getPath(...args) {
        return cleanPath(args.map(normaliseFragment).join("/"));
    }
    const replaceSlug = cached$1((path => path.replace("#", "?id=")));
    class History {
        #cached={};
        constructor(config) {
            this.config = config;
        }
        #getAlias(path, alias, last) {
            const match = Object.keys(alias).filter((key => {
                const re = this.#cached[key] || (this.#cached[key] = new RegExp(`^${key}$`));
                return re.test(path) && path !== last;
            }))[0];
            return match ? this.#getAlias(path.replace(this.#cached[match], alias[match]), alias, path) : path;
        }
        #getFileName(path, ext) {
            const [basePath, query] = path.split("?");
            const hasValidExt = new RegExp(`\\.(${ext.replace(/^\./, "")}|html)$`).test(basePath);
            const updatedPath = hasValidExt ? basePath : /\/$/g.test(basePath) ? `${basePath}README${ext}` : `${basePath}${ext}`;
            return query ? `${updatedPath}?${query}` : updatedPath;
        }
        getBasePath() {
            return this.config.basePath;
        }
        getFile(path = this.getCurrentPath(), isRelative = false) {
            const {config: config} = this;
            const base = this.getBasePath();
            const ext = typeof config.ext === "string" ? config.ext : ".md";
            path = config.alias ? this.#getAlias(path, config.alias) : path;
            path = this.#getFileName(path, ext);
            path = path === `/README${ext}` ? config.homepage || path : path;
            path = isAbsolutePath(path) ? path : getPath(base, path);
            if (isRelative) {
                path = path.replace(new RegExp(`^${base}`), "");
            }
            return path;
        }
        onchange(cb = noop) {
            cb();
        }
        getCurrentPath() {
            throw new Error("Subclass should implement");
        }
        normalize() {
            throw new Error("Subclass should implement");
        }
        parse(path) {
            throw new Error("Subclass should implement");
        }
        toURL(path, params, currentRoute) {
            const local = currentRoute && path[0] === "#";
            const route = this.parse(replaceSlug(path));
            route.query = {
                ...route.query,
                ...params
            };
            path = route.path + stringifyQuery(route.query);
            path = path.replace(/\.md(\?)|\.md$/, "$1");
            if (local) {
                const idIndex = currentRoute.indexOf("?");
                path = (idIndex > 0 ? currentRoute.substring(0, idIndex) : currentRoute) + path;
            }
            if (this.config.relativePath && path.indexOf("/") !== 0) {
                const currentDir = currentRoute.substring(0, currentRoute.lastIndexOf("/") + 1);
                return cleanPath(resolvePath(currentDir + path));
            }
            return cleanPath("/" + path);
        }
    }
    function replaceHash(path) {
        const i = location.href.indexOf("#");
        location.replace(location.href.slice(0, i >= 0 ? i : 0) + "#" + path);
    }
    class HashHistory extends History {
        mode="hash";
        getBasePath() {
            const path = window.location.pathname || "";
            const base = this.config.basePath;
            const basePath = path.endsWith(".html") ? path + "#/" + base : path + "/" + base;
            return /^(\/|https?:)/g.test(base) ? base : cleanPath(basePath);
        }
        getCurrentPath() {
            const href = location.href;
            const index = href.indexOf("#");
            return index === -1 ? "" : href.slice(index + 1);
        }
        onchange(cb = noop) {
            let navigating = false;
            on("click", (e => {
                const el = e.target.tagName === "A" ? e.target : e.target.parentNode;
                if (el && el.tagName === "A" && !isExternal(el.href)) {
                    navigating = true;
                    if ([ "app-name-link", "page-link" ].includes(el.className)) {
                        return;
                    }
                    if (el.hash === location.hash) {
                        cb({
                            event: e,
                            source: "navigate"
                        });
                    }
                }
            }));
            on("hashchange", (e => {
                const source = navigating ? "navigate" : "history";
                navigating = false;
                cb({
                    event: e,
                    source: source
                });
            }));
        }
        normalize() {
            let path = this.getCurrentPath();
            path = replaceSlug(path);
            if (path.charAt(0) === "/") {
                return replaceHash(path);
            }
            replaceHash("/" + path);
        }
        parse(path = location.href) {
            let query = "";
            const hashIndex = path.indexOf("#");
            if (hashIndex >= 0) {
                path = path.slice(hashIndex + 1);
            }
            const queryIndex = path.indexOf("?");
            if (queryIndex >= 0) {
                query = path.slice(queryIndex + 1);
                path = path.slice(0, queryIndex);
            }
            return {
                path: path,
                file: this.getFile(path, true),
                query: parseQuery(query),
                response: {}
            };
        }
        toURL(path, params, currentRoute) {
            return "#" + super.toURL(path, params, currentRoute);
        }
    }
    class HTML5History extends History {
        mode="history";
        getCurrentPath() {
            const base = this.getBasePath();
            let path = window.location.pathname;
            if (base && path.indexOf(base) === 0) {
                path = path.slice(base.length);
            }
            return (path || "/") + window.location.search + window.location.hash;
        }
        onchange(cb = noop) {
            on("click", (e => {
                const el = e.target.tagName === "A" ? e.target : e.target.parentNode;
                if (el && el.tagName === "A" && !isExternal(el.href)) {
                    e.preventDefault();
                    const url = el.href;
                    window.history.pushState({
                        key: url
                    }, "", url);
                    cb({
                        event: e,
                        source: "navigate"
                    });
                }
            }));
            on("popstate", (e => {
                cb({
                    event: e,
                    source: "history"
                });
            }));
        }
        parse(path = location.href) {
            let query = "";
            const queryIndex = path.indexOf("?");
            if (queryIndex >= 0) {
                query = path.slice(queryIndex + 1);
                path = path.slice(0, queryIndex);
            }
            const base = getPath(location.origin);
            const baseIndex = path.indexOf(base);
            if (baseIndex > -1) {
                path = path.slice(baseIndex + base.length);
            }
            return {
                path: path,
                file: this.getFile(path),
                query: parseQuery(query),
                response: {}
            };
        }
    }
    let lastRoute = {};
    function Router(Base) {
        return class Router extends Base {
            route={};
            updateRender() {
                this.router?.normalize();
                this.route = this.router?.parse() ?? {};
                body.setAttribute("data-page", this.route.file ?? "");
            }
            initRouter() {
                const config = this.config;
                const mode = config.routerMode || "hash";
                let router;
                if (mode === "history") {
                    router = new HTML5History(config);
                } else {
                    router = new HashHistory(config);
                }
                this.router = router;
                this.updateRender();
                lastRoute = this.route;
                router.onchange((params => {
                    this.updateRender();
                    this._updateRender();
                    if (lastRoute.path === this.route.path) {
                        this.onNavigate(params.source);
                        return;
                    }
                    this.$fetch(noop, this.onNavigate.bind(this, params.source));
                    lastRoute = this.route;
                }));
            }
        };
    }
    var RGX = /([^{]*?)\w(?=\})/g;
    var MAP = {
        YYYY: "getFullYear",
        YY: "getYear",
        MM: function(d) {
            return d.getMonth() + 1;
        },
        DD: "getDate",
        HH: "getHours",
        mm: "getMinutes",
        ss: "getSeconds",
        fff: "getMilliseconds"
    };
    function tinydate(str, custom) {
        var parts = [], offset = 0;
        str.replace(RGX, (function(key, _, idx) {
            parts.push(str.substring(offset, idx - 1));
            offset = idx += key.length + 1;
            parts.push((function(d) {
                return ("00" + (typeof MAP[key] === "string" ? d[MAP[key]]() : MAP[key](d))).slice(-key.length);
            }));
        }));
        if (offset !== str.length) {
            parts.push(str.substring(offset));
        }
        return function(arg) {
            var out = "", i = 0, d = arg || new Date;
            for (;i < parts.length; i++) {
                out += typeof parts[i] === "string" ? parts[i] : parts[i](d);
            }
            return out;
        };
    }
    const computedStyle = getComputedStyle(document.documentElement, null);
    const mobileBreakpoint = computedStyle.getPropertyValue("--_mobile-breakpoint");
    function isMobile() {
        return window?.matchMedia?.(`(max-width: ${mobileBreakpoint})`)?.matches;
    }
    function L() {
        return {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null
        };
    }
    var T = L();
    function Z(u) {
        T = u;
    }
    var C = {
        exec: () => null
    };
    function k(u, e = "") {
        let t = typeof u == "string" ? u : u.source, n = {
            replace: (r, i) => {
                let s = typeof i == "string" ? i : i.source;
                return s = s.replace(m.caret, "$1"), t = t.replace(r, s), n;
            },
            getRegex: () => new RegExp(t, e)
        };
        return n;
    }
    var me = (() => {
        try {
            return !!new RegExp("(?<=1)(?<!1)");
        } catch {
            return !1;
        }
    })(), m = {
        codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
        outputLinkReplace: /\\([\[\]])/g,
        indentCodeCompensation: /^(\s+)(?:```)/,
        beginningSpace: /^\s+/,
        endingHash: /#$/,
        startingSpaceChar: /^ /,
        endingSpaceChar: / $/,
        nonSpaceChar: /[^ ]/,
        newLineCharGlobal: /\n/g,
        tabCharGlobal: /\t/g,
        multipleSpaceGlobal: /\s+/g,
        blankLine: /^[ \t]*$/,
        doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
        blockquoteStart: /^ {0,3}>/,
        blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
        blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
        listReplaceTabs: /^\t+/,
        listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
        listIsTask: /^\[[ xX]\] +\S/,
        listReplaceTask: /^\[[ xX]\] +/,
        listTaskCheckbox: /\[[ xX]\]/,
        anyLine: /\n.*\n/,
        hrefBrackets: /^<(.*)>$/,
        tableDelimiter: /[:|]/,
        tableAlignChars: /^\||\| *$/g,
        tableRowBlankLine: /\n[ \t]*$/,
        tableAlignRight: /^ *-+: *$/,
        tableAlignCenter: /^ *:-+: *$/,
        tableAlignLeft: /^ *:-+ *$/,
        startATag: /^<a /i,
        endATag: /^<\/a>/i,
        startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
        endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
        startAngleBracket: /^</,
        endAngleBracket: />$/,
        pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
        unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
        escapeTest: /[&<>"']/,
        escapeReplace: /[&<>"']/g,
        escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
        unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
        caret: /(^|[^\[])\^/g,
        percentDecode: /%25/g,
        findPipe: /\|/g,
        splitPipe: / \|/,
        slashPipe: /\\\|/g,
        carriageReturn: /\r\n|\r/g,
        spaceLine: /^ +$/gm,
        notSpaceStart: /^\S*/,
        endingNewline: /\n$/,
        listItemRegex: u => new RegExp(`^( {0,3}${u})((?:[\t ][^\\n]*)?(?:\\n|$))`),
        nextBulletRegex: u => new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
        hrRegex: u => new RegExp(`^ {0,${Math.min(3, u - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
        fencesBeginRegex: u => new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:\`\`\`|~~~)`),
        headingBeginRegex: u => new RegExp(`^ {0,${Math.min(3, u - 1)}}#`),
        htmlBeginRegex: u => new RegExp(`^ {0,${Math.min(3, u - 1)}}<(?:[a-z].*>|!--)`, "i")
    }, xe = /^(?:[ \t]*(?:\n|$))+/, be = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Re = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, I = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Te = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, N = /(?:[*+-]|\d{1,9}[.)])/, re$1 = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, se = k(re$1).replace(/bull/g, N).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Oe = k(re$1).replace(/bull/g, N).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Q = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, we = /^[^\n]+/, F = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, ye = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", F).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Pe = k(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, N).getRegex(), v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", j = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Se = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))", "i").replace("comment", j).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ie = k(Q).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex(), $e = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ie).getRegex(), U = {
        blockquote: $e,
        code: be,
        def: ye,
        fences: Re,
        heading: Te,
        hr: I,
        html: Se,
        lheading: se,
        list: Pe,
        newline: xe,
        paragraph: ie,
        table: C,
        text: we
    }, te = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}\t)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex(), _e = {
        ...U,
        lheading: Oe,
        table: te,
        paragraph: k(Q).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", te).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex()
    }, Le = {
        ...U,
        html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", j).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: C,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: k(Q).replace("hr", I).replace("heading", ` *#{1,6} *[^\n]`).replace("lheading", se).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
    }, Me = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ze = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, oe = /^( {2,}|\\)\n(?!\s*$)/, Ae = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, D = /[\p{P}\p{S}]/u, K = /[\s\p{P}\p{S}]/u, ae = /[^\s\p{P}\p{S}]/u, Ce = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, K).getRegex(), le = /(?!~)[\p{P}\p{S}]/u, Ie = /(?!~)[\s\p{P}\p{S}]/u, Ee = /(?:[^\s\p{P}\p{S}]|~)/u, Be = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", me ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), ue = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, qe = k(ue, "u").replace(/punct/g, D).getRegex(), ve = k(ue, "u").replace(/punct/g, le).getRegex(), pe = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", De = k(pe, "gu").replace(/notPunctSpace/g, ae).replace(/punctSpace/g, K).replace(/punct/g, D).getRegex(), He = k(pe, "gu").replace(/notPunctSpace/g, Ee).replace(/punctSpace/g, Ie).replace(/punct/g, le).getRegex(), Ze = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ae).replace(/punctSpace/g, K).replace(/punct/g, D).getRegex(), Ge = k(/\\(punct)/, "gu").replace(/punct/g, D).getRegex(), Ne = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Qe = k(j).replace("(?:--\x3e|$)", "--\x3e").getRegex(), Fe = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Qe).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, je = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), ce = k(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", F).getRegex(), he = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", F).getRegex(), Ue = k("reflink|nolink(?!\\()", "g").replace("reflink", ce).replace("nolink", he).getRegex(), ne = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, W = {
        _backpedal: C,
        anyPunctuation: Ge,
        autolink: Ne,
        blockSkip: Be,
        br: oe,
        code: ze,
        del: C,
        emStrongLDelim: qe,
        emStrongRDelimAst: De,
        emStrongRDelimUnd: Ze,
        escape: Me,
        link: je,
        nolink: he,
        punctuation: Ce,
        reflink: ce,
        reflinkSearch: Ue,
        tag: Fe,
        text: Ae,
        url: C
    }, Ke = {
        ...W,
        link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(),
        reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex()
    }, G = {
        ...W,
        emStrongRDelimAst: He,
        emStrongLDelim: ve,
        url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ne).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
        text: k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ne).getRegex()
    }, We = {
        ...G,
        br: k(oe).replace("{2,}", "*").getRegex(),
        text: k(G.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    }, E = {
        normal: U,
        gfm: _e,
        pedantic: Le
    }, M = {
        normal: W,
        gfm: G,
        breaks: We,
        pedantic: Ke
    };
    var Xe = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, ke = u => Xe[u];
    function w(u, e) {
        if (e) {
            if (m.escapeTest.test(u)) return u.replace(m.escapeReplace, ke);
        } else if (m.escapeTestNoEncode.test(u)) return u.replace(m.escapeReplaceNoEncode, ke);
        return u;
    }
    function X(u) {
        try {
            u = encodeURI(u).replace(m.percentDecode, "%");
        } catch {
            return null;
        }
        return u;
    }
    function J(u, e) {
        let t = u.replace(m.findPipe, ((i, s, a) => {
            let o = !1, l = s;
            for (;--l >= 0 && a[l] === "\\"; ) o = !o;
            return o ? "|" : " |";
        })), n = t.split(m.splitPipe), r = 0;
        if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e); else for (;n.length < e; ) n.push("");
        for (;r < n.length; r++) n[r] = n[r].trim().replace(m.slashPipe, "|");
        return n;
    }
    function z(u, e, t) {
        let n = u.length;
        if (n === 0) return "";
        let r = 0;
        for (;r < n; ) {
            let i = u.charAt(n - r - 1);
            if (i === e && !t) r++; else if (i !== e && t) r++; else break;
        }
        return u.slice(0, n - r);
    }
    function de(u, e) {
        if (u.indexOf(e[1]) === -1) return -1;
        let t = 0;
        for (let n = 0; n < u.length; n++) if (u[n] === "\\") n++; else if (u[n] === e[0]) t++; else if (u[n] === e[1] && (t--, 
        t < 0)) return n;
        return t > 0 ? -2 : -1;
    }
    function ge(u, e, t, n, r) {
        let i = e.href, s = e.title || null, a = u[1].replace(r.other.outputLinkReplace, "$1");
        n.state.inLink = !0;
        let o = {
            type: u[0].charAt(0) === "!" ? "image" : "link",
            raw: t,
            href: i,
            title: s,
            text: a,
            tokens: n.inlineTokens(a)
        };
        return n.state.inLink = !1, o;
    }
    function Je(u, e, t) {
        let n = u.match(t.other.indentCodeCompensation);
        if (n === null) return e;
        let r = n[1];
        return e.split(`\n`).map((i => {
            let s = i.match(t.other.beginningSpace);
            if (s === null) return i;
            let [a] = s;
            return a.length >= r.length ? i.slice(r.length) : i;
        })).join(`\n`);
    }
    var y = class {
        options;
        rules;
        lexer;
        constructor(e) {
            this.options = e || T;
        }
        space(e) {
            let t = this.rules.block.newline.exec(e);
            if (t && t[0].length > 0) return {
                type: "space",
                raw: t[0]
            };
        }
        code(e) {
            let t = this.rules.block.code.exec(e);
            if (t) {
                let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
                return {
                    type: "code",
                    raw: t[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? n : z(n, `\n`)
                };
            }
        }
        fences(e) {
            let t = this.rules.block.fences.exec(e);
            if (t) {
                let n = t[0], r = Je(n, t[3] || "", this.rules);
                return {
                    type: "code",
                    raw: n,
                    lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
                    text: r
                };
            }
        }
        heading(e) {
            let t = this.rules.block.heading.exec(e);
            if (t) {
                let n = t[2].trim();
                if (this.rules.other.endingHash.test(n)) {
                    let r = z(n, "#");
                    (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
                }
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: n,
                    tokens: this.lexer.inline(n)
                };
            }
        }
        hr(e) {
            let t = this.rules.block.hr.exec(e);
            if (t) return {
                type: "hr",
                raw: z(t[0], `\n`)
            };
        }
        blockquote(e) {
            let t = this.rules.block.blockquote.exec(e);
            if (t) {
                let n = z(t[0], `\n`).split(`\n`), r = "", i = "", s = [];
                for (;n.length > 0; ) {
                    let a = !1, o = [], l;
                    for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) o.push(n[l]), 
                    a = !0; else if (!a) o.push(n[l]); else break;
                    n = n.slice(l);
                    let p = o.join(`\n`), c = p.replace(this.rules.other.blockquoteSetextReplace, `\n    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
                    r = r ? `${r}\n${p}` : p, i = i ? `${i}\n${c}` : c;
                    let g = this.lexer.state.top;
                    if (this.lexer.state.top = !0, this.lexer.blockTokens(c, s, !0), this.lexer.state.top = g, 
                    n.length === 0) break;
                    let h = s.at(-1);
                    if (h?.type === "code") break;
                    if (h?.type === "blockquote") {
                        let R = h, f = R.raw + `\n` + n.join(`\n`), O = this.blockquote(f);
                        s[s.length - 1] = O, r = r.substring(0, r.length - R.raw.length) + O.raw, i = i.substring(0, i.length - R.text.length) + O.text;
                        break;
                    } else if (h?.type === "list") {
                        let R = h, f = R.raw + `\n` + n.join(`\n`), O = this.list(f);
                        s[s.length - 1] = O, r = r.substring(0, r.length - h.raw.length) + O.raw, i = i.substring(0, i.length - R.raw.length) + O.raw, 
                        n = f.substring(s.at(-1).raw.length).split(`\n`);
                        continue;
                    }
                }
                return {
                    type: "blockquote",
                    raw: r,
                    tokens: s,
                    text: i
                };
            }
        }
        list(e) {
            let t = this.rules.block.list.exec(e);
            if (t) {
                let n = t[1].trim(), r = n.length > 1, i = {
                    type: "list",
                    raw: "",
                    ordered: r,
                    start: r ? +n.slice(0, -1) : "",
                    loose: !1,
                    items: []
                };
                n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
                let s = this.rules.other.listItemRegex(n), a = !1;
                for (;e; ) {
                    let l = !1, p = "", c = "";
                    if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
                    p = t[0], e = e.substring(p.length);
                    let g = t[2].split(`\n`, 1)[0].replace(this.rules.other.listReplaceTabs, (O => " ".repeat(3 * O.length))), h = e.split(`\n`, 1)[0], R = !g.trim(), f = 0;
                    if (this.options.pedantic ? (f = 2, c = g.trimStart()) : R ? f = t[1].length + 1 : (f = t[2].search(this.rules.other.nonSpaceChar), 
                    f = f > 4 ? 1 : f, c = g.slice(f), f += t[1].length), R && this.rules.other.blankLine.test(h) && (p += h + `\n`, 
                    e = e.substring(h.length + 1), l = !0), !l) {
                        let O = this.rules.other.nextBulletRegex(f), V = this.rules.other.hrRegex(f), Y = this.rules.other.fencesBeginRegex(f), ee = this.rules.other.headingBeginRegex(f), fe = this.rules.other.htmlBeginRegex(f);
                        for (;e; ) {
                            let H = e.split(`\n`, 1)[0], A;
                            if (h = H, this.options.pedantic ? (h = h.replace(this.rules.other.listReplaceNesting, "  "), 
                            A = h) : A = h.replace(this.rules.other.tabCharGlobal, "    "), Y.test(h) || ee.test(h) || fe.test(h) || O.test(h) || V.test(h)) break;
                            if (A.search(this.rules.other.nonSpaceChar) >= f || !h.trim()) c += `\n` + A.slice(f); else {
                                if (R || g.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || Y.test(g) || ee.test(g) || V.test(g)) break;
                                c += `\n` + h;
                            }
                            !R && !h.trim() && (R = !0), p += H + `\n`, e = e.substring(H.length + 1), g = A.slice(f);
                        }
                    }
                    i.loose || (a ? i.loose = !0 : this.rules.other.doubleBlankLine.test(p) && (a = !0)), 
                    i.items.push({
                        type: "list_item",
                        raw: p,
                        task: !!this.options.gfm && this.rules.other.listIsTask.test(c),
                        loose: !1,
                        text: c,
                        tokens: []
                    }), i.raw += p;
                }
                let o = i.items.at(-1);
                if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd(); else return;
                i.raw = i.raw.trimEnd();
                for (let l of i.items) {
                    if (this.lexer.state.top = !1, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
                        if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
                            l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), 
                            l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
                            for (let c = this.lexer.inlineQueue.length - 1; c >= 0; c--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)) {
                                this.lexer.inlineQueue[c].src = this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask, "");
                                break;
                            }
                        }
                        let p = this.rules.other.listTaskCheckbox.exec(l.raw);
                        if (p) {
                            let c = {
                                type: "checkbox",
                                raw: p[0] + " ",
                                checked: p[0] !== "[ ]"
                            };
                            l.checked = c.checked, i.loose ? l.tokens[0] && [ "paragraph", "text" ].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, 
                            l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({
                                type: "paragraph",
                                raw: c.raw,
                                text: c.raw,
                                tokens: [ c ]
                            }) : l.tokens.unshift(c);
                        }
                    }
                    if (!i.loose) {
                        let p = l.tokens.filter((g => g.type === "space")), c = p.length > 0 && p.some((g => this.rules.other.anyLine.test(g.raw)));
                        i.loose = c;
                    }
                }
                if (i.loose) for (let l of i.items) {
                    l.loose = !0;
                    for (let p of l.tokens) p.type === "text" && (p.type = "paragraph");
                }
                return i;
            }
        }
        html(e) {
            let t = this.rules.block.html.exec(e);
            if (t) return {
                type: "html",
                block: !0,
                raw: t[0],
                pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
                text: t[0]
            };
        }
        def(e) {
            let t = this.rules.block.def.exec(e);
            if (t) {
                let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
                return {
                    type: "def",
                    tag: n,
                    raw: t[0],
                    href: r,
                    title: i
                };
            }
        }
        table(e) {
            let t = this.rules.block.table.exec(e);
            if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
            let n = J(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`\n`) : [], s = {
                type: "table",
                raw: t[0],
                header: [],
                align: [],
                rows: []
            };
            if (n.length === r.length) {
                for (let a of r) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
                for (let a = 0; a < n.length; a++) s.header.push({
                    text: n[a],
                    tokens: this.lexer.inline(n[a]),
                    header: !0,
                    align: s.align[a]
                });
                for (let a of i) s.rows.push(J(a, s.header.length).map(((o, l) => ({
                    text: o,
                    tokens: this.lexer.inline(o),
                    header: !1,
                    align: s.align[l]
                }))));
                return s;
            }
        }
        lheading(e) {
            let t = this.rules.block.lheading.exec(e);
            if (t) return {
                type: "heading",
                raw: t[0],
                depth: t[2].charAt(0) === "=" ? 1 : 2,
                text: t[1],
                tokens: this.lexer.inline(t[1])
            };
        }
        paragraph(e) {
            let t = this.rules.block.paragraph.exec(e);
            if (t) {
                let n = t[1].charAt(t[1].length - 1) === `\n` ? t[1].slice(0, -1) : t[1];
                return {
                    type: "paragraph",
                    raw: t[0],
                    text: n,
                    tokens: this.lexer.inline(n)
                };
            }
        }
        text(e) {
            let t = this.rules.block.text.exec(e);
            if (t) return {
                type: "text",
                raw: t[0],
                text: t[0],
                tokens: this.lexer.inline(t[0])
            };
        }
        escape(e) {
            let t = this.rules.inline.escape.exec(e);
            if (t) return {
                type: "escape",
                raw: t[0],
                text: t[1]
            };
        }
        tag(e) {
            let t = this.rules.inline.tag.exec(e);
            if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), 
            !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), 
            {
                type: "html",
                raw: t[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: !1,
                text: t[0]
            };
        }
        link(e) {
            let t = this.rules.inline.link.exec(e);
            if (t) {
                let n = t[2].trim();
                if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
                    if (!this.rules.other.endAngleBracket.test(n)) return;
                    let s = z(n.slice(0, -1), "\\");
                    if ((n.length - s.length) % 2 === 0) return;
                } else {
                    let s = de(t[2], "()");
                    if (s === -2) return;
                    if (s > -1) {
                        let o = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
                        t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, o).trim(), t[3] = "";
                    }
                }
                let r = t[2], i = "";
                if (this.options.pedantic) {
                    let s = this.rules.other.pedanticHrefTitle.exec(r);
                    s && (r = s[1], i = s[3]);
                } else i = t[3] ? t[3].slice(1, -1) : "";
                return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), 
                ge(t, {
                    href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
                    title: i && i.replace(this.rules.inline.anyPunctuation, "$1")
                }, t[0], this.lexer, this.rules);
            }
        }
        reflink(e, t) {
            let n;
            if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
                let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[r.toLowerCase()];
                if (!i) {
                    let s = n[0].charAt(0);
                    return {
                        type: "text",
                        raw: s,
                        text: s
                    };
                }
                return ge(n, i, n[0], this.lexer, this.rules);
            }
        }
        emStrong(e, t, n = "") {
            let r = this.rules.inline.emStrongLDelim.exec(e);
            if (!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
            if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
                let s = [ ...r[0] ].length - 1, a, o, l = s, p = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
                for (c.lastIndex = 0, t = t.slice(-1 * e.length + s); (r = c.exec(t)) != null; ) {
                    if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
                    if (o = [ ...a ].length, r[3] || r[4]) {
                        l += o;
                        continue;
                    } else if ((r[5] || r[6]) && s % 3 && !((s + o) % 3)) {
                        p += o;
                        continue;
                    }
                    if (l -= o, l > 0) continue;
                    o = Math.min(o, o + l + p);
                    let g = [ ...r[0] ][0].length, h = e.slice(0, s + r.index + g + o);
                    if (Math.min(s, o) % 2) {
                        let f = h.slice(1, -1);
                        return {
                            type: "em",
                            raw: h,
                            text: f,
                            tokens: this.lexer.inlineTokens(f)
                        };
                    }
                    let R = h.slice(2, -2);
                    return {
                        type: "strong",
                        raw: h,
                        text: R,
                        tokens: this.lexer.inlineTokens(R)
                    };
                }
            }
        }
        codespan(e) {
            let t = this.rules.inline.code.exec(e);
            if (t) {
                let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
                return r && i && (n = n.substring(1, n.length - 1)), {
                    type: "codespan",
                    raw: t[0],
                    text: n
                };
            }
        }
        br(e) {
            let t = this.rules.inline.br.exec(e);
            if (t) return {
                type: "br",
                raw: t[0]
            };
        }
        del(e) {
            let t = this.rules.inline.del.exec(e);
            if (t) return {
                type: "del",
                raw: t[0],
                text: t[2],
                tokens: this.lexer.inlineTokens(t[2])
            };
        }
        autolink(e) {
            let t = this.rules.inline.autolink.exec(e);
            if (t) {
                let n, r;
                return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), {
                    type: "link",
                    raw: t[0],
                    text: n,
                    href: r,
                    tokens: [ {
                        type: "text",
                        raw: n,
                        text: n
                    } ]
                };
            }
        }
        url(e) {
            let t;
            if (t = this.rules.inline.url.exec(e)) {
                let n, r;
                if (t[2] === "@") n = t[0], r = "mailto:" + n; else {
                    let i;
                    do {
                        i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
                    } while (i !== t[0]);
                    n = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
                }
                return {
                    type: "link",
                    raw: t[0],
                    text: n,
                    href: r,
                    tokens: [ {
                        type: "text",
                        raw: n,
                        text: n
                    } ]
                };
            }
        }
        inlineText(e) {
            let t = this.rules.inline.text.exec(e);
            if (t) {
                let n = this.lexer.state.inRawBlock;
                return {
                    type: "text",
                    raw: t[0],
                    text: t[0],
                    escaped: n
                };
            }
        }
    };
    var x = class u {
        tokens;
        options;
        state;
        inlineQueue;
        tokenizer;
        constructor(e) {
            this.tokens = [], this.tokens.links = Object.create(null), this.options = e || T, 
            this.options.tokenizer = this.options.tokenizer || new y, this.tokenizer = this.options.tokenizer, 
            this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], 
            this.state = {
                inLink: !1,
                inRawBlock: !1,
                top: !0
            };
            let t = {
                other: m,
                block: E.normal,
                inline: M.normal
            };
            this.options.pedantic ? (t.block = E.pedantic, t.inline = M.pedantic) : this.options.gfm && (t.block = E.gfm, 
            this.options.breaks ? t.inline = M.breaks : t.inline = M.gfm), this.tokenizer.rules = t;
        }
        static get rules() {
            return {
                block: E,
                inline: M
            };
        }
        static lex(e, t) {
            return new u(t).lex(e);
        }
        static lexInline(e, t) {
            return new u(t).inlineTokens(e);
        }
        lex(e) {
            e = e.replace(m.carriageReturn, `\n`), this.blockTokens(e, this.tokens);
            for (let t = 0; t < this.inlineQueue.length; t++) {
                let n = this.inlineQueue[t];
                this.inlineTokens(n.src, n.tokens);
            }
            return this.inlineQueue = [], this.tokens;
        }
        blockTokens(e, t = [], n = !1) {
            for (this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, "")); e; ) {
                let r;
                if (this.options.extensions?.block?.some((s => (r = s.call({
                    lexer: this
                }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1))) continue;
                if (r = this.tokenizer.space(e)) {
                    e = e.substring(r.raw.length);
                    let s = t.at(-1);
                    r.raw.length === 1 && s !== void 0 ? s.raw += `\n` : t.push(r);
                    continue;
                }
                if (r = this.tokenizer.code(e)) {
                    e = e.substring(r.raw.length);
                    let s = t.at(-1);
                    s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`\n`) ? "" : `\n`) + r.raw, 
                    s.text += `\n` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
                    continue;
                }
                if (r = this.tokenizer.fences(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                if (r = this.tokenizer.heading(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                if (r = this.tokenizer.hr(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                if (r = this.tokenizer.blockquote(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                if (r = this.tokenizer.list(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                if (r = this.tokenizer.html(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                if (r = this.tokenizer.def(e)) {
                    e = e.substring(r.raw.length);
                    let s = t.at(-1);
                    s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`\n`) ? "" : `\n`) + r.raw, 
                    s.text += `\n` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
                        href: r.href,
                        title: r.title
                    }, t.push(r));
                    continue;
                }
                if (r = this.tokenizer.table(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                if (r = this.tokenizer.lheading(e)) {
                    e = e.substring(r.raw.length), t.push(r);
                    continue;
                }
                let i = e;
                if (this.options.extensions?.startBlock) {
                    let s = 1 / 0, a = e.slice(1), o;
                    this.options.extensions.startBlock.forEach((l => {
                        o = l.call({
                            lexer: this
                        }, a), typeof o == "number" && o >= 0 && (s = Math.min(s, o));
                    })), s < 1 / 0 && s >= 0 && (i = e.substring(0, s + 1));
                }
                if (this.state.top && (r = this.tokenizer.paragraph(i))) {
                    let s = t.at(-1);
                    n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`\n`) ? "" : `\n`) + r.raw, 
                    s.text += `\n` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), 
                    n = i.length !== e.length, e = e.substring(r.raw.length);
                    continue;
                }
                if (r = this.tokenizer.text(e)) {
                    e = e.substring(r.raw.length);
                    let s = t.at(-1);
                    s?.type === "text" ? (s.raw += (s.raw.endsWith(`\n`) ? "" : `\n`) + r.raw, s.text += `\n` + r.text, 
                    this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
                    continue;
                }
                if (e) {
                    let s = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(s);
                        break;
                    } else throw new Error(s);
                }
            }
            return this.state.top = !0, t;
        }
        inline(e, t = []) {
            return this.inlineQueue.push({
                src: e,
                tokens: t
            }), t;
        }
        inlineTokens(e, t = []) {
            let n = e, r = null;
            if (this.tokens.links) {
                let o = Object.keys(this.tokens.links);
                if (o.length > 0) for (;(r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) o.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
            }
            for (;(r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
            let i;
            for (;(r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) i = r[2] ? r[2].length : 0, 
            n = n.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            n = this.options.hooks?.emStrongMask?.call({
                lexer: this
            }, n) ?? n;
            let s = !1, a = "";
            for (;e; ) {
                s || (a = ""), s = !1;
                let o;
                if (this.options.extensions?.inline?.some((p => (o = p.call({
                    lexer: this
                }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1))) continue;
                if (o = this.tokenizer.escape(e)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (o = this.tokenizer.tag(e)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (o = this.tokenizer.link(e)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (o = this.tokenizer.reflink(e, this.tokens.links)) {
                    e = e.substring(o.raw.length);
                    let p = t.at(-1);
                    o.type === "text" && p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : t.push(o);
                    continue;
                }
                if (o = this.tokenizer.emStrong(e, n, a)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (o = this.tokenizer.codespan(e)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (o = this.tokenizer.br(e)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (o = this.tokenizer.del(e)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (o = this.tokenizer.autolink(e)) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                if (!this.state.inLink && (o = this.tokenizer.url(e))) {
                    e = e.substring(o.raw.length), t.push(o);
                    continue;
                }
                let l = e;
                if (this.options.extensions?.startInline) {
                    let p = 1 / 0, c = e.slice(1), g;
                    this.options.extensions.startInline.forEach((h => {
                        g = h.call({
                            lexer: this
                        }, c), typeof g == "number" && g >= 0 && (p = Math.min(p, g));
                    })), p < 1 / 0 && p >= 0 && (l = e.substring(0, p + 1));
                }
                if (o = this.tokenizer.inlineText(l)) {
                    e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (a = o.raw.slice(-1)), 
                    s = !0;
                    let p = t.at(-1);
                    p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : t.push(o);
                    continue;
                }
                if (e) {
                    let p = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(p);
                        break;
                    } else throw new Error(p);
                }
            }
            return t;
        }
    };
    var P = class {
        options;
        parser;
        constructor(e) {
            this.options = e || T;
        }
        space(e) {
            return "";
        }
        code({text: e, lang: t, escaped: n}) {
            let r = (t || "").match(m.notSpaceStart)?.[0], i = e.replace(m.endingNewline, "") + `\n`;
            return r ? '<pre><code class="language-' + w(r) + '">' + (n ? i : w(i, !0)) + `</code></pre>\n` : "<pre><code>" + (n ? i : w(i, !0)) + `</code></pre>\n`;
        }
        blockquote({tokens: e}) {
            return `<blockquote>\n${this.parser.parse(e)}</blockquote>\n`;
        }
        html({text: e}) {
            return e;
        }
        def(e) {
            return "";
        }
        heading({tokens: e, depth: t}) {
            return `<h${t}>${this.parser.parseInline(e)}</h${t}>\n`;
        }
        hr(e) {
            return `<hr>\n`;
        }
        list(e) {
            let t = e.ordered, n = e.start, r = "";
            for (let a = 0; a < e.items.length; a++) {
                let o = e.items[a];
                r += this.listitem(o);
            }
            let i = t ? "ol" : "ul", s = t && n !== 1 ? ' start="' + n + '"' : "";
            return "<" + i + s + `>\n` + r + "</" + i + `>\n`;
        }
        listitem(e) {
            return `<li>${this.parser.parse(e.tokens)}</li>\n`;
        }
        checkbox({checked: e}) {
            return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
        }
        paragraph({tokens: e}) {
            return `<p>${this.parser.parseInline(e)}</p>\n`;
        }
        table(e) {
            let t = "", n = "";
            for (let i = 0; i < e.header.length; i++) n += this.tablecell(e.header[i]);
            t += this.tablerow({
                text: n
            });
            let r = "";
            for (let i = 0; i < e.rows.length; i++) {
                let s = e.rows[i];
                n = "";
                for (let a = 0; a < s.length; a++) n += this.tablecell(s[a]);
                r += this.tablerow({
                    text: n
                });
            }
            return r && (r = `<tbody>${r}</tbody>`), `<table>\n<thead>\n` + t + `</thead>\n` + r + `</table>\n`;
        }
        tablerow({text: e}) {
            return `<tr>\n${e}</tr>\n`;
        }
        tablecell(e) {
            let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
            return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>\n`;
        }
        strong({tokens: e}) {
            return `<strong>${this.parser.parseInline(e)}</strong>`;
        }
        em({tokens: e}) {
            return `<em>${this.parser.parseInline(e)}</em>`;
        }
        codespan({text: e}) {
            return `<code>${w(e, !0)}</code>`;
        }
        br(e) {
            return "<br>";
        }
        del({tokens: e}) {
            return `<del>${this.parser.parseInline(e)}</del>`;
        }
        link({href: e, title: t, tokens: n}) {
            let r = this.parser.parseInline(n), i = X(e);
            if (i === null) return r;
            e = i;
            let s = '<a href="' + e + '"';
            return t && (s += ' title="' + w(t) + '"'), s += ">" + r + "</a>", s;
        }
        image({href: e, title: t, text: n, tokens: r}) {
            r && (n = this.parser.parseInline(r, this.parser.textRenderer));
            let i = X(e);
            if (i === null) return w(n);
            e = i;
            let s = `<img src="${e}" alt="${n}"`;
            return t && (s += ` title="${w(t)}"`), s += ">", s;
        }
        text(e) {
            return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : w(e.text);
        }
    };
    var $ = class {
        strong({text: e}) {
            return e;
        }
        em({text: e}) {
            return e;
        }
        codespan({text: e}) {
            return e;
        }
        del({text: e}) {
            return e;
        }
        html({text: e}) {
            return e;
        }
        text({text: e}) {
            return e;
        }
        link({text: e}) {
            return "" + e;
        }
        image({text: e}) {
            return "" + e;
        }
        br() {
            return "";
        }
        checkbox({raw: e}) {
            return e;
        }
    };
    var b = class u {
        options;
        renderer;
        textRenderer;
        constructor(e) {
            this.options = e || T, this.options.renderer = this.options.renderer || new P, this.renderer = this.options.renderer, 
            this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $;
        }
        static parse(e, t) {
            return new u(t).parse(e);
        }
        static parseInline(e, t) {
            return new u(t).parseInline(e);
        }
        parse(e) {
            let t = "";
            for (let n = 0; n < e.length; n++) {
                let r = e[n];
                if (this.options.extensions?.renderers?.[r.type]) {
                    let s = r, a = this.options.extensions.renderers[s.type].call({
                        parser: this
                    }, s);
                    if (a !== !1 || ![ "space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text" ].includes(s.type)) {
                        t += a || "";
                        continue;
                    }
                }
                let i = r;
                switch (i.type) {
                  case "space":
                    {
                        t += this.renderer.space(i);
                        break;
                    }

                  case "hr":
                    {
                        t += this.renderer.hr(i);
                        break;
                    }

                  case "heading":
                    {
                        t += this.renderer.heading(i);
                        break;
                    }

                  case "code":
                    {
                        t += this.renderer.code(i);
                        break;
                    }

                  case "table":
                    {
                        t += this.renderer.table(i);
                        break;
                    }

                  case "blockquote":
                    {
                        t += this.renderer.blockquote(i);
                        break;
                    }

                  case "list":
                    {
                        t += this.renderer.list(i);
                        break;
                    }

                  case "checkbox":
                    {
                        t += this.renderer.checkbox(i);
                        break;
                    }

                  case "html":
                    {
                        t += this.renderer.html(i);
                        break;
                    }

                  case "def":
                    {
                        t += this.renderer.def(i);
                        break;
                    }

                  case "paragraph":
                    {
                        t += this.renderer.paragraph(i);
                        break;
                    }

                  case "text":
                    {
                        t += this.renderer.text(i);
                        break;
                    }

                  default:
                    {
                        let s = 'Token with "' + i.type + '" type was not found.';
                        if (this.options.silent) return console.error(s), "";
                        throw new Error(s);
                    }
                }
            }
            return t;
        }
        parseInline(e, t = this.renderer) {
            let n = "";
            for (let r = 0; r < e.length; r++) {
                let i = e[r];
                if (this.options.extensions?.renderers?.[i.type]) {
                    let a = this.options.extensions.renderers[i.type].call({
                        parser: this
                    }, i);
                    if (a !== !1 || ![ "escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text" ].includes(i.type)) {
                        n += a || "";
                        continue;
                    }
                }
                let s = i;
                switch (s.type) {
                  case "escape":
                    {
                        n += t.text(s);
                        break;
                    }

                  case "html":
                    {
                        n += t.html(s);
                        break;
                    }

                  case "link":
                    {
                        n += t.link(s);
                        break;
                    }

                  case "image":
                    {
                        n += t.image(s);
                        break;
                    }

                  case "checkbox":
                    {
                        n += t.checkbox(s);
                        break;
                    }

                  case "strong":
                    {
                        n += t.strong(s);
                        break;
                    }

                  case "em":
                    {
                        n += t.em(s);
                        break;
                    }

                  case "codespan":
                    {
                        n += t.codespan(s);
                        break;
                    }

                  case "br":
                    {
                        n += t.br(s);
                        break;
                    }

                  case "del":
                    {
                        n += t.del(s);
                        break;
                    }

                  case "text":
                    {
                        n += t.text(s);
                        break;
                    }

                  default:
                    {
                        let a = 'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent) return console.error(a), "";
                        throw new Error(a);
                    }
                }
            }
            return n;
        }
    };
    var S = class {
        options;
        block;
        constructor(e) {
            this.options = e || T;
        }
        static passThroughHooks=new Set([ "preprocess", "postprocess", "processAllTokens", "emStrongMask" ]);
        static passThroughHooksRespectAsync=new Set([ "preprocess", "postprocess", "processAllTokens" ]);
        preprocess(e) {
            return e;
        }
        postprocess(e) {
            return e;
        }
        processAllTokens(e) {
            return e;
        }
        emStrongMask(e) {
            return e;
        }
        provideLexer() {
            return this.block ? x.lex : x.lexInline;
        }
        provideParser() {
            return this.block ? b.parse : b.parseInline;
        }
    };
    var B = class {
        defaults=L();
        options=this.setOptions;
        parse=this.parseMarkdown(!0);
        parseInline=this.parseMarkdown(!1);
        Parser=b;
        Renderer=P;
        TextRenderer=$;
        Lexer=x;
        Tokenizer=y;
        Hooks=S;
        constructor(...e) {
            this.use(...e);
        }
        walkTokens(e, t) {
            let n = [];
            for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
              case "table":
                {
                    let i = r;
                    for (let s of i.header) n = n.concat(this.walkTokens(s.tokens, t));
                    for (let s of i.rows) for (let a of s) n = n.concat(this.walkTokens(a.tokens, t));
                    break;
                }

              case "list":
                {
                    let i = r;
                    n = n.concat(this.walkTokens(i.items, t));
                    break;
                }

              default:
                {
                    let i = r;
                    this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((s => {
                        let a = i[s].flat(1 / 0);
                        n = n.concat(this.walkTokens(a, t));
                    })) : i.tokens && (n = n.concat(this.walkTokens(i.tokens, t)));
                }
            }
            return n;
        }
        use(...e) {
            let t = this.defaults.extensions || {
                renderers: {},
                childTokens: {}
            };
            return e.forEach((n => {
                let r = {
                    ...n
                };
                if (r.async = this.defaults.async || r.async || !1, n.extensions && (n.extensions.forEach((i => {
                    if (!i.name) throw new Error("extension name required");
                    if ("renderer" in i) {
                        let s = t.renderers[i.name];
                        s ? t.renderers[i.name] = function(...a) {
                            let o = i.renderer.apply(this, a);
                            return o === !1 && (o = s.apply(this, a)), o;
                        } : t.renderers[i.name] = i.renderer;
                    }
                    if ("tokenizer" in i) {
                        if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
                        let s = t[i.level];
                        s ? s.unshift(i.tokenizer) : t[i.level] = [ i.tokenizer ], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [ i.start ] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [ i.start ]));
                    }
                    "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
                })), r.extensions = t), n.renderer) {
                    let i = this.defaults.renderer || new P(this.defaults);
                    for (let s in n.renderer) {
                        if (!(s in i)) throw new Error(`renderer '${s}' does not exist`);
                        if ([ "options", "parser" ].includes(s)) continue;
                        let a = s, o = n.renderer[a], l = i[a];
                        i[a] = (...p) => {
                            let c = o.apply(i, p);
                            return c === !1 && (c = l.apply(i, p)), c || "";
                        };
                    }
                    r.renderer = i;
                }
                if (n.tokenizer) {
                    let i = this.defaults.tokenizer || new y(this.defaults);
                    for (let s in n.tokenizer) {
                        if (!(s in i)) throw new Error(`tokenizer '${s}' does not exist`);
                        if ([ "options", "rules", "lexer" ].includes(s)) continue;
                        let a = s, o = n.tokenizer[a], l = i[a];
                        i[a] = (...p) => {
                            let c = o.apply(i, p);
                            return c === !1 && (c = l.apply(i, p)), c;
                        };
                    }
                    r.tokenizer = i;
                }
                if (n.hooks) {
                    let i = this.defaults.hooks || new S;
                    for (let s in n.hooks) {
                        if (!(s in i)) throw new Error(`hook '${s}' does not exist`);
                        if ([ "options", "block" ].includes(s)) continue;
                        let a = s, o = n.hooks[a], l = i[a];
                        S.passThroughHooks.has(s) ? i[a] = p => {
                            if (this.defaults.async && S.passThroughHooksRespectAsync.has(s)) return (async () => {
                                let g = await o.call(i, p);
                                return l.call(i, g);
                            })();
                            let c = o.call(i, p);
                            return l.call(i, c);
                        } : i[a] = (...p) => {
                            if (this.defaults.async) return (async () => {
                                let g = await o.apply(i, p);
                                return g === !1 && (g = await l.apply(i, p)), g;
                            })();
                            let c = o.apply(i, p);
                            return c === !1 && (c = l.apply(i, p)), c;
                        };
                    }
                    r.hooks = i;
                }
                if (n.walkTokens) {
                    let i = this.defaults.walkTokens, s = n.walkTokens;
                    r.walkTokens = function(a) {
                        let o = [];
                        return o.push(s.call(this, a)), i && (o = o.concat(i.call(this, a))), o;
                    };
                }
                this.defaults = {
                    ...this.defaults,
                    ...r
                };
            })), this;
        }
        setOptions(e) {
            return this.defaults = {
                ...this.defaults,
                ...e
            }, this;
        }
        lexer(e, t) {
            return x.lex(e, t ?? this.defaults);
        }
        parser(e, t) {
            return b.parse(e, t ?? this.defaults);
        }
        parseMarkdown(e) {
            return (n, r) => {
                let i = {
                    ...r
                }, s = {
                    ...this.defaults,
                    ...i
                }, a = this.onError(!!s.silent, !!s.async);
                if (this.defaults.async === !0 && i.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
                if (typeof n > "u" || n === null) return a(new Error("marked(): input parameter is undefined or null"));
                if (typeof n != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
                if (s.hooks && (s.hooks.options = s, s.hooks.block = e), s.async) return (async () => {
                    let o = s.hooks ? await s.hooks.preprocess(n) : n, p = await (s.hooks ? await s.hooks.provideLexer() : e ? x.lex : x.lexInline)(o, s), c = s.hooks ? await s.hooks.processAllTokens(p) : p;
                    s.walkTokens && await Promise.all(this.walkTokens(c, s.walkTokens));
                    let h = await (s.hooks ? await s.hooks.provideParser() : e ? b.parse : b.parseInline)(c, s);
                    return s.hooks ? await s.hooks.postprocess(h) : h;
                })().catch(a);
                try {
                    s.hooks && (n = s.hooks.preprocess(n));
                    let l = (s.hooks ? s.hooks.provideLexer() : e ? x.lex : x.lexInline)(n, s);
                    s.hooks && (l = s.hooks.processAllTokens(l)), s.walkTokens && this.walkTokens(l, s.walkTokens);
                    let c = (s.hooks ? s.hooks.provideParser() : e ? b.parse : b.parseInline)(l, s);
                    return s.hooks && (c = s.hooks.postprocess(c)), c;
                } catch (o) {
                    return a(o);
                }
            };
        }
        onError(e, t) {
            return n => {
                if (n.message += `\nPlease report this to https://github.com/markedjs/marked.`, 
                e) {
                    let r = "<p>An error occurred:</p><pre>" + w(n.message + "", !0) + "</pre>";
                    return t ? Promise.resolve(r) : r;
                }
                if (t) return Promise.reject(n);
                throw n;
            };
        }
    };
    var _ = new B;
    function d(u, e) {
        return _.parse(u, e);
    }
    d.options = d.setOptions = function(u) {
        return _.setOptions(u), d.defaults = _.defaults, Z(d.defaults), d;
    };
    d.getDefaults = L;
    d.defaults = T;
    d.use = function(...u) {
        return _.use(...u), d.defaults = _.defaults, Z(d.defaults), d;
    };
    d.walkTokens = function(u, e) {
        return _.walkTokens(u, e);
    };
    d.parseInline = _.parseInline;
    d.Parser = b;
    d.parser = b.parse;
    d.Renderer = P;
    d.TextRenderer = $;
    d.Lexer = x;
    d.lexer = x.lex;
    d.Tokenizer = y;
    d.Hooks = S;
    d.parse = d;
    d.options;
    d.setOptions;
    d.use;
    d.walkTokens;
    d.parseInline;
    b.parse;
    x.lex;
    function corner(data, cornerExternalLinkTarget) {
        if (!data) {
            return "";
        }
        if (!/\/\//.test(data)) {
            data = "https://github.com/" + data;
        }
        data = data.replace(/^git\+/, "");
        cornerExternalLinkTarget = cornerExternalLinkTarget || "_blank";
        return `\n    <a href="${data}" target="${cornerExternalLinkTarget}" class="github-corner" aria-label="View source on GitHub">\n      <svg viewBox="0 0 250 250" aria-hidden="true">\n        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>\n        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>\n        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>\n      </svg>\n    </a>\n  `;
    }
    function main(config) {
        const {hideSidebar: hideSidebar, name: name} = config;
        const aside = hideSidebar ? "" : `\n    <button class="sidebar-toggle" tabindex="-1" title="Press \\ to toggle">\n      <div class="sidebar-toggle-button" tabindex="0" aria-label="Hide primary navigation" aria-keyshortcuts="Use shortcut key \\" aria-controls="__sidebar" role="button">\n        <span></span><span></span><span></span>\n      </div>\n    </button>\n    <aside id="__sidebar" class="sidebar${!isMobile() ? " show" : ""}" tabindex="-1" role="none">\n      ${config.name ? `\n            <h1 class="app-name"><a class="app-name-link" data-nosearch>${config.logo ? `<img alt="${name}" src=${config.logo} />` : name}</a></h1>\n          ` : ""}\n      <div class="sidebar-nav" role="navigation" aria-label="primary">\x3c!--sidebar--\x3e</div>\n    </aside>\n  `;
        return `\n    <main role="presentation">\n      ${aside}\n      <section class="content">\n        <article id="main" class="markdown-section" role="main" tabindex="-1">\x3c!--main--\x3e</article>\n      </section>\n    </main>\n  `;
    }
    function cover() {
        return `\n    <section class="cover show" role="complementary" aria-label="cover">\n      <div class="mask"></div>\n      <div class="cover-main">\x3c!--cover--\x3e</div>\n    </section>\n  `;
    }
    function tree(toc, tpl = '<ul class="app-sub-sidebar">{inner}</ul>') {
        if (!toc || !toc.length) {
            return "";
        }
        let innerHTML = "";
        toc.forEach((node => {
            const title = node.title.replace(/(<([^>]+)>)/g, "");
            let current = `<li><a class="section-link" href="${node.slug}" title="${title}">${node.title}</a></li>`;
            if (node.children) {
                const children = tree(node.children, "<ul>{inner}</ul>");
                current = `<li><a class="section-link" href="${node.slug}" title="${title}">${node.title}</a>${children}</li>`;
            }
            innerHTML += current;
        }));
        return tpl.replace("{inner}", innerHTML);
    }
    function helper(className, content) {
        return `<p class="${className}">${content.slice(5).trim()}</p>`;
    }
    function theme(color) {
        return `<style>:root{--theme-color: ${color};}</style>`;
    }
    function genTree(toc, maxLevel) {
        const headlines = [];
        const last = {};
        toc.forEach((headline => {
            const level = headline.depth || 1;
            const len = level - 1;
            if (level > maxLevel) {
                return;
            }
            if (last[len]) {
                last[len].children = [ ...last[len].children || [], headline ];
            } else {
                headlines.push(headline);
            }
            last[level] = headline;
        }));
        return headlines;
    }
    let cache$1 = {};
    const re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
    function lower(string) {
        return string.toLowerCase();
    }
    function slugify(str) {
        if (typeof str !== "string") {
            return "";
        }
        let slug = str.trim().normalize("NFC").replace(/\uFE0F/g, "").replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "").replace(/[A-Z]+/g, lower).replace(/<[^>]+>/g, "").replace(re, "").replace(/\s/g, "-").replace(/^(\d)/, "_$1");
        let count = cache$1[slug];
        count = Object.keys(cache$1).includes(slug) ? count + 1 : 0;
        cache$1[slug] = count;
        if (count) {
            slug = slug + "-" + count;
        }
        return slug;
    }
    slugify.clear = function() {
        cache$1 = {};
    };
    var emojiData = {
        baseURL: "https://github.githubassets.com/images/icons/emoji/",
        data: {
            100: "unicode/1f4af.png?v8",
            1234: "unicode/1f522.png?v8",
            "+1": "unicode/1f44d.png?v8",
            "-1": "unicode/1f44e.png?v8",
            "1st_place_medal": "unicode/1f947.png?v8",
            "2nd_place_medal": "unicode/1f948.png?v8",
            "3rd_place_medal": "unicode/1f949.png?v8",
            "8ball": "unicode/1f3b1.png?v8",
            a: "unicode/1f170.png?v8",
            ab: "unicode/1f18e.png?v8",
            abacus: "unicode/1f9ee.png?v8",
            abc: "unicode/1f524.png?v8",
            abcd: "unicode/1f521.png?v8",
            accept: "unicode/1f251.png?v8",
            accessibility: "accessibility.png?v8",
            accordion: "unicode/1fa97.png?v8",
            adhesive_bandage: "unicode/1fa79.png?v8",
            adult: "unicode/1f9d1.png?v8",
            aerial_tramway: "unicode/1f6a1.png?v8",
            afghanistan: "unicode/1f1e6-1f1eb.png?v8",
            airplane: "unicode/2708.png?v8",
            aland_islands: "unicode/1f1e6-1f1fd.png?v8",
            alarm_clock: "unicode/23f0.png?v8",
            albania: "unicode/1f1e6-1f1f1.png?v8",
            alembic: "unicode/2697.png?v8",
            algeria: "unicode/1f1e9-1f1ff.png?v8",
            alien: "unicode/1f47d.png?v8",
            ambulance: "unicode/1f691.png?v8",
            american_samoa: "unicode/1f1e6-1f1f8.png?v8",
            amphora: "unicode/1f3fa.png?v8",
            anatomical_heart: "unicode/1fac0.png?v8",
            anchor: "unicode/2693.png?v8",
            andorra: "unicode/1f1e6-1f1e9.png?v8",
            angel: "unicode/1f47c.png?v8",
            anger: "unicode/1f4a2.png?v8",
            angola: "unicode/1f1e6-1f1f4.png?v8",
            angry: "unicode/1f620.png?v8",
            anguilla: "unicode/1f1e6-1f1ee.png?v8",
            anguished: "unicode/1f627.png?v8",
            ant: "unicode/1f41c.png?v8",
            antarctica: "unicode/1f1e6-1f1f6.png?v8",
            antigua_barbuda: "unicode/1f1e6-1f1ec.png?v8",
            apple: "unicode/1f34e.png?v8",
            aquarius: "unicode/2652.png?v8",
            argentina: "unicode/1f1e6-1f1f7.png?v8",
            aries: "unicode/2648.png?v8",
            armenia: "unicode/1f1e6-1f1f2.png?v8",
            arrow_backward: "unicode/25c0.png?v8",
            arrow_double_down: "unicode/23ec.png?v8",
            arrow_double_up: "unicode/23eb.png?v8",
            arrow_down: "unicode/2b07.png?v8",
            arrow_down_small: "unicode/1f53d.png?v8",
            arrow_forward: "unicode/25b6.png?v8",
            arrow_heading_down: "unicode/2935.png?v8",
            arrow_heading_up: "unicode/2934.png?v8",
            arrow_left: "unicode/2b05.png?v8",
            arrow_lower_left: "unicode/2199.png?v8",
            arrow_lower_right: "unicode/2198.png?v8",
            arrow_right: "unicode/27a1.png?v8",
            arrow_right_hook: "unicode/21aa.png?v8",
            arrow_up: "unicode/2b06.png?v8",
            arrow_up_down: "unicode/2195.png?v8",
            arrow_up_small: "unicode/1f53c.png?v8",
            arrow_upper_left: "unicode/2196.png?v8",
            arrow_upper_right: "unicode/2197.png?v8",
            arrows_clockwise: "unicode/1f503.png?v8",
            arrows_counterclockwise: "unicode/1f504.png?v8",
            art: "unicode/1f3a8.png?v8",
            articulated_lorry: "unicode/1f69b.png?v8",
            artificial_satellite: "unicode/1f6f0.png?v8",
            artist: "unicode/1f9d1-1f3a8.png?v8",
            aruba: "unicode/1f1e6-1f1fc.png?v8",
            ascension_island: "unicode/1f1e6-1f1e8.png?v8",
            asterisk: "unicode/002a-20e3.png?v8",
            astonished: "unicode/1f632.png?v8",
            astronaut: "unicode/1f9d1-1f680.png?v8",
            athletic_shoe: "unicode/1f45f.png?v8",
            atm: "unicode/1f3e7.png?v8",
            atom: "atom.png?v8",
            atom_symbol: "unicode/269b.png?v8",
            australia: "unicode/1f1e6-1f1fa.png?v8",
            austria: "unicode/1f1e6-1f1f9.png?v8",
            auto_rickshaw: "unicode/1f6fa.png?v8",
            avocado: "unicode/1f951.png?v8",
            axe: "unicode/1fa93.png?v8",
            azerbaijan: "unicode/1f1e6-1f1ff.png?v8",
            b: "unicode/1f171.png?v8",
            baby: "unicode/1f476.png?v8",
            baby_bottle: "unicode/1f37c.png?v8",
            baby_chick: "unicode/1f424.png?v8",
            baby_symbol: "unicode/1f6bc.png?v8",
            back: "unicode/1f519.png?v8",
            bacon: "unicode/1f953.png?v8",
            badger: "unicode/1f9a1.png?v8",
            badminton: "unicode/1f3f8.png?v8",
            bagel: "unicode/1f96f.png?v8",
            baggage_claim: "unicode/1f6c4.png?v8",
            baguette_bread: "unicode/1f956.png?v8",
            bahamas: "unicode/1f1e7-1f1f8.png?v8",
            bahrain: "unicode/1f1e7-1f1ed.png?v8",
            balance_scale: "unicode/2696.png?v8",
            bald_man: "unicode/1f468-1f9b2.png?v8",
            bald_woman: "unicode/1f469-1f9b2.png?v8",
            ballet_shoes: "unicode/1fa70.png?v8",
            balloon: "unicode/1f388.png?v8",
            ballot_box: "unicode/1f5f3.png?v8",
            ballot_box_with_check: "unicode/2611.png?v8",
            bamboo: "unicode/1f38d.png?v8",
            banana: "unicode/1f34c.png?v8",
            bangbang: "unicode/203c.png?v8",
            bangladesh: "unicode/1f1e7-1f1e9.png?v8",
            banjo: "unicode/1fa95.png?v8",
            bank: "unicode/1f3e6.png?v8",
            bar_chart: "unicode/1f4ca.png?v8",
            barbados: "unicode/1f1e7-1f1e7.png?v8",
            barber: "unicode/1f488.png?v8",
            baseball: "unicode/26be.png?v8",
            basecamp: "basecamp.png?v8",
            basecampy: "basecampy.png?v8",
            basket: "unicode/1f9fa.png?v8",
            basketball: "unicode/1f3c0.png?v8",
            basketball_man: "unicode/26f9-2642.png?v8",
            basketball_woman: "unicode/26f9-2640.png?v8",
            bat: "unicode/1f987.png?v8",
            bath: "unicode/1f6c0.png?v8",
            bathtub: "unicode/1f6c1.png?v8",
            battery: "unicode/1f50b.png?v8",
            beach_umbrella: "unicode/1f3d6.png?v8",
            beans: "unicode/1fad8.png?v8",
            bear: "unicode/1f43b.png?v8",
            bearded_person: "unicode/1f9d4.png?v8",
            beaver: "unicode/1f9ab.png?v8",
            bed: "unicode/1f6cf.png?v8",
            bee: "unicode/1f41d.png?v8",
            beer: "unicode/1f37a.png?v8",
            beers: "unicode/1f37b.png?v8",
            beetle: "unicode/1fab2.png?v8",
            beginner: "unicode/1f530.png?v8",
            belarus: "unicode/1f1e7-1f1fe.png?v8",
            belgium: "unicode/1f1e7-1f1ea.png?v8",
            belize: "unicode/1f1e7-1f1ff.png?v8",
            bell: "unicode/1f514.png?v8",
            bell_pepper: "unicode/1fad1.png?v8",
            bellhop_bell: "unicode/1f6ce.png?v8",
            benin: "unicode/1f1e7-1f1ef.png?v8",
            bento: "unicode/1f371.png?v8",
            bermuda: "unicode/1f1e7-1f1f2.png?v8",
            beverage_box: "unicode/1f9c3.png?v8",
            bhutan: "unicode/1f1e7-1f1f9.png?v8",
            bicyclist: "unicode/1f6b4.png?v8",
            bike: "unicode/1f6b2.png?v8",
            biking_man: "unicode/1f6b4-2642.png?v8",
            biking_woman: "unicode/1f6b4-2640.png?v8",
            bikini: "unicode/1f459.png?v8",
            billed_cap: "unicode/1f9e2.png?v8",
            biohazard: "unicode/2623.png?v8",
            bird: "unicode/1f426.png?v8",
            birthday: "unicode/1f382.png?v8",
            bison: "unicode/1f9ac.png?v8",
            biting_lip: "unicode/1fae6.png?v8",
            black_bird: "unicode/1f426-2b1b.png?v8",
            black_cat: "unicode/1f408-2b1b.png?v8",
            black_circle: "unicode/26ab.png?v8",
            black_flag: "unicode/1f3f4.png?v8",
            black_heart: "unicode/1f5a4.png?v8",
            black_joker: "unicode/1f0cf.png?v8",
            black_large_square: "unicode/2b1b.png?v8",
            black_medium_small_square: "unicode/25fe.png?v8",
            black_medium_square: "unicode/25fc.png?v8",
            black_nib: "unicode/2712.png?v8",
            black_small_square: "unicode/25aa.png?v8",
            black_square_button: "unicode/1f532.png?v8",
            blond_haired_man: "unicode/1f471-2642.png?v8",
            blond_haired_person: "unicode/1f471.png?v8",
            blond_haired_woman: "unicode/1f471-2640.png?v8",
            blonde_woman: "unicode/1f471-2640.png?v8",
            blossom: "unicode/1f33c.png?v8",
            blowfish: "unicode/1f421.png?v8",
            blue_book: "unicode/1f4d8.png?v8",
            blue_car: "unicode/1f699.png?v8",
            blue_heart: "unicode/1f499.png?v8",
            blue_square: "unicode/1f7e6.png?v8",
            blueberries: "unicode/1fad0.png?v8",
            blush: "unicode/1f60a.png?v8",
            boar: "unicode/1f417.png?v8",
            boat: "unicode/26f5.png?v8",
            bolivia: "unicode/1f1e7-1f1f4.png?v8",
            bomb: "unicode/1f4a3.png?v8",
            bone: "unicode/1f9b4.png?v8",
            book: "unicode/1f4d6.png?v8",
            bookmark: "unicode/1f516.png?v8",
            bookmark_tabs: "unicode/1f4d1.png?v8",
            books: "unicode/1f4da.png?v8",
            boom: "unicode/1f4a5.png?v8",
            boomerang: "unicode/1fa83.png?v8",
            boot: "unicode/1f462.png?v8",
            bosnia_herzegovina: "unicode/1f1e7-1f1e6.png?v8",
            botswana: "unicode/1f1e7-1f1fc.png?v8",
            bouncing_ball_man: "unicode/26f9-2642.png?v8",
            bouncing_ball_person: "unicode/26f9.png?v8",
            bouncing_ball_woman: "unicode/26f9-2640.png?v8",
            bouquet: "unicode/1f490.png?v8",
            bouvet_island: "unicode/1f1e7-1f1fb.png?v8",
            bow: "unicode/1f647.png?v8",
            bow_and_arrow: "unicode/1f3f9.png?v8",
            bowing_man: "unicode/1f647-2642.png?v8",
            bowing_woman: "unicode/1f647-2640.png?v8",
            bowl_with_spoon: "unicode/1f963.png?v8",
            bowling: "unicode/1f3b3.png?v8",
            bowtie: "bowtie.png?v8",
            boxing_glove: "unicode/1f94a.png?v8",
            boy: "unicode/1f466.png?v8",
            brain: "unicode/1f9e0.png?v8",
            brazil: "unicode/1f1e7-1f1f7.png?v8",
            bread: "unicode/1f35e.png?v8",
            breast_feeding: "unicode/1f931.png?v8",
            bricks: "unicode/1f9f1.png?v8",
            bride_with_veil: "unicode/1f470-2640.png?v8",
            bridge_at_night: "unicode/1f309.png?v8",
            briefcase: "unicode/1f4bc.png?v8",
            british_indian_ocean_territory: "unicode/1f1ee-1f1f4.png?v8",
            british_virgin_islands: "unicode/1f1fb-1f1ec.png?v8",
            broccoli: "unicode/1f966.png?v8",
            broken_heart: "unicode/1f494.png?v8",
            broom: "unicode/1f9f9.png?v8",
            brown_circle: "unicode/1f7e4.png?v8",
            brown_heart: "unicode/1f90e.png?v8",
            brown_square: "unicode/1f7eb.png?v8",
            brunei: "unicode/1f1e7-1f1f3.png?v8",
            bubble_tea: "unicode/1f9cb.png?v8",
            bubbles: "unicode/1fae7.png?v8",
            bucket: "unicode/1faa3.png?v8",
            bug: "unicode/1f41b.png?v8",
            building_construction: "unicode/1f3d7.png?v8",
            bulb: "unicode/1f4a1.png?v8",
            bulgaria: "unicode/1f1e7-1f1ec.png?v8",
            bullettrain_front: "unicode/1f685.png?v8",
            bullettrain_side: "unicode/1f684.png?v8",
            burkina_faso: "unicode/1f1e7-1f1eb.png?v8",
            burrito: "unicode/1f32f.png?v8",
            burundi: "unicode/1f1e7-1f1ee.png?v8",
            bus: "unicode/1f68c.png?v8",
            business_suit_levitating: "unicode/1f574.png?v8",
            busstop: "unicode/1f68f.png?v8",
            bust_in_silhouette: "unicode/1f464.png?v8",
            busts_in_silhouette: "unicode/1f465.png?v8",
            butter: "unicode/1f9c8.png?v8",
            butterfly: "unicode/1f98b.png?v8",
            cactus: "unicode/1f335.png?v8",
            cake: "unicode/1f370.png?v8",
            calendar: "unicode/1f4c6.png?v8",
            call_me_hand: "unicode/1f919.png?v8",
            calling: "unicode/1f4f2.png?v8",
            cambodia: "unicode/1f1f0-1f1ed.png?v8",
            camel: "unicode/1f42b.png?v8",
            camera: "unicode/1f4f7.png?v8",
            camera_flash: "unicode/1f4f8.png?v8",
            cameroon: "unicode/1f1e8-1f1f2.png?v8",
            camping: "unicode/1f3d5.png?v8",
            canada: "unicode/1f1e8-1f1e6.png?v8",
            canary_islands: "unicode/1f1ee-1f1e8.png?v8",
            cancer: "unicode/264b.png?v8",
            candle: "unicode/1f56f.png?v8",
            candy: "unicode/1f36c.png?v8",
            canned_food: "unicode/1f96b.png?v8",
            canoe: "unicode/1f6f6.png?v8",
            cape_verde: "unicode/1f1e8-1f1fb.png?v8",
            capital_abcd: "unicode/1f520.png?v8",
            capricorn: "unicode/2651.png?v8",
            car: "unicode/1f697.png?v8",
            card_file_box: "unicode/1f5c3.png?v8",
            card_index: "unicode/1f4c7.png?v8",
            card_index_dividers: "unicode/1f5c2.png?v8",
            caribbean_netherlands: "unicode/1f1e7-1f1f6.png?v8",
            carousel_horse: "unicode/1f3a0.png?v8",
            carpentry_saw: "unicode/1fa9a.png?v8",
            carrot: "unicode/1f955.png?v8",
            cartwheeling: "unicode/1f938.png?v8",
            cat: "unicode/1f431.png?v8",
            cat2: "unicode/1f408.png?v8",
            cayman_islands: "unicode/1f1f0-1f1fe.png?v8",
            cd: "unicode/1f4bf.png?v8",
            central_african_republic: "unicode/1f1e8-1f1eb.png?v8",
            ceuta_melilla: "unicode/1f1ea-1f1e6.png?v8",
            chad: "unicode/1f1f9-1f1e9.png?v8",
            chains: "unicode/26d3.png?v8",
            chair: "unicode/1fa91.png?v8",
            champagne: "unicode/1f37e.png?v8",
            chart: "unicode/1f4b9.png?v8",
            chart_with_downwards_trend: "unicode/1f4c9.png?v8",
            chart_with_upwards_trend: "unicode/1f4c8.png?v8",
            checkered_flag: "unicode/1f3c1.png?v8",
            cheese: "unicode/1f9c0.png?v8",
            cherries: "unicode/1f352.png?v8",
            cherry_blossom: "unicode/1f338.png?v8",
            chess_pawn: "unicode/265f.png?v8",
            chestnut: "unicode/1f330.png?v8",
            chicken: "unicode/1f414.png?v8",
            child: "unicode/1f9d2.png?v8",
            children_crossing: "unicode/1f6b8.png?v8",
            chile: "unicode/1f1e8-1f1f1.png?v8",
            chipmunk: "unicode/1f43f.png?v8",
            chocolate_bar: "unicode/1f36b.png?v8",
            chopsticks: "unicode/1f962.png?v8",
            christmas_island: "unicode/1f1e8-1f1fd.png?v8",
            christmas_tree: "unicode/1f384.png?v8",
            church: "unicode/26ea.png?v8",
            cinema: "unicode/1f3a6.png?v8",
            circus_tent: "unicode/1f3aa.png?v8",
            city_sunrise: "unicode/1f307.png?v8",
            city_sunset: "unicode/1f306.png?v8",
            cityscape: "unicode/1f3d9.png?v8",
            cl: "unicode/1f191.png?v8",
            clamp: "unicode/1f5dc.png?v8",
            clap: "unicode/1f44f.png?v8",
            clapper: "unicode/1f3ac.png?v8",
            classical_building: "unicode/1f3db.png?v8",
            climbing: "unicode/1f9d7.png?v8",
            climbing_man: "unicode/1f9d7-2642.png?v8",
            climbing_woman: "unicode/1f9d7-2640.png?v8",
            clinking_glasses: "unicode/1f942.png?v8",
            clipboard: "unicode/1f4cb.png?v8",
            clipperton_island: "unicode/1f1e8-1f1f5.png?v8",
            clock1: "unicode/1f550.png?v8",
            clock10: "unicode/1f559.png?v8",
            clock1030: "unicode/1f565.png?v8",
            clock11: "unicode/1f55a.png?v8",
            clock1130: "unicode/1f566.png?v8",
            clock12: "unicode/1f55b.png?v8",
            clock1230: "unicode/1f567.png?v8",
            clock130: "unicode/1f55c.png?v8",
            clock2: "unicode/1f551.png?v8",
            clock230: "unicode/1f55d.png?v8",
            clock3: "unicode/1f552.png?v8",
            clock330: "unicode/1f55e.png?v8",
            clock4: "unicode/1f553.png?v8",
            clock430: "unicode/1f55f.png?v8",
            clock5: "unicode/1f554.png?v8",
            clock530: "unicode/1f560.png?v8",
            clock6: "unicode/1f555.png?v8",
            clock630: "unicode/1f561.png?v8",
            clock7: "unicode/1f556.png?v8",
            clock730: "unicode/1f562.png?v8",
            clock8: "unicode/1f557.png?v8",
            clock830: "unicode/1f563.png?v8",
            clock9: "unicode/1f558.png?v8",
            clock930: "unicode/1f564.png?v8",
            closed_book: "unicode/1f4d5.png?v8",
            closed_lock_with_key: "unicode/1f510.png?v8",
            closed_umbrella: "unicode/1f302.png?v8",
            cloud: "unicode/2601.png?v8",
            cloud_with_lightning: "unicode/1f329.png?v8",
            cloud_with_lightning_and_rain: "unicode/26c8.png?v8",
            cloud_with_rain: "unicode/1f327.png?v8",
            cloud_with_snow: "unicode/1f328.png?v8",
            clown_face: "unicode/1f921.png?v8",
            clubs: "unicode/2663.png?v8",
            cn: "unicode/1f1e8-1f1f3.png?v8",
            coat: "unicode/1f9e5.png?v8",
            cockroach: "unicode/1fab3.png?v8",
            cocktail: "unicode/1f378.png?v8",
            coconut: "unicode/1f965.png?v8",
            cocos_islands: "unicode/1f1e8-1f1e8.png?v8",
            coffee: "unicode/2615.png?v8",
            coffin: "unicode/26b0.png?v8",
            coin: "unicode/1fa99.png?v8",
            cold_face: "unicode/1f976.png?v8",
            cold_sweat: "unicode/1f630.png?v8",
            collision: "unicode/1f4a5.png?v8",
            colombia: "unicode/1f1e8-1f1f4.png?v8",
            comet: "unicode/2604.png?v8",
            comoros: "unicode/1f1f0-1f1f2.png?v8",
            compass: "unicode/1f9ed.png?v8",
            computer: "unicode/1f4bb.png?v8",
            computer_mouse: "unicode/1f5b1.png?v8",
            confetti_ball: "unicode/1f38a.png?v8",
            confounded: "unicode/1f616.png?v8",
            confused: "unicode/1f615.png?v8",
            congo_brazzaville: "unicode/1f1e8-1f1ec.png?v8",
            congo_kinshasa: "unicode/1f1e8-1f1e9.png?v8",
            congratulations: "unicode/3297.png?v8",
            construction: "unicode/1f6a7.png?v8",
            construction_worker: "unicode/1f477.png?v8",
            construction_worker_man: "unicode/1f477-2642.png?v8",
            construction_worker_woman: "unicode/1f477-2640.png?v8",
            control_knobs: "unicode/1f39b.png?v8",
            convenience_store: "unicode/1f3ea.png?v8",
            cook: "unicode/1f9d1-1f373.png?v8",
            cook_islands: "unicode/1f1e8-1f1f0.png?v8",
            cookie: "unicode/1f36a.png?v8",
            cool: "unicode/1f192.png?v8",
            cop: "unicode/1f46e.png?v8",
            copilot: "copilot.png?v8",
            copyright: "unicode/00a9.png?v8",
            coral: "unicode/1fab8.png?v8",
            corn: "unicode/1f33d.png?v8",
            costa_rica: "unicode/1f1e8-1f1f7.png?v8",
            cote_divoire: "unicode/1f1e8-1f1ee.png?v8",
            couch_and_lamp: "unicode/1f6cb.png?v8",
            couple: "unicode/1f46b.png?v8",
            couple_with_heart: "unicode/1f491.png?v8",
            couple_with_heart_man_man: "unicode/1f468-2764-1f468.png?v8",
            couple_with_heart_woman_man: "unicode/1f469-2764-1f468.png?v8",
            couple_with_heart_woman_woman: "unicode/1f469-2764-1f469.png?v8",
            couplekiss: "unicode/1f48f.png?v8",
            couplekiss_man_man: "unicode/1f468-2764-1f48b-1f468.png?v8",
            couplekiss_man_woman: "unicode/1f469-2764-1f48b-1f468.png?v8",
            couplekiss_woman_woman: "unicode/1f469-2764-1f48b-1f469.png?v8",
            cow: "unicode/1f42e.png?v8",
            cow2: "unicode/1f404.png?v8",
            cowboy_hat_face: "unicode/1f920.png?v8",
            crab: "unicode/1f980.png?v8",
            crayon: "unicode/1f58d.png?v8",
            credit_card: "unicode/1f4b3.png?v8",
            crescent_moon: "unicode/1f319.png?v8",
            cricket: "unicode/1f997.png?v8",
            cricket_game: "unicode/1f3cf.png?v8",
            croatia: "unicode/1f1ed-1f1f7.png?v8",
            crocodile: "unicode/1f40a.png?v8",
            croissant: "unicode/1f950.png?v8",
            crossed_fingers: "unicode/1f91e.png?v8",
            crossed_flags: "unicode/1f38c.png?v8",
            crossed_swords: "unicode/2694.png?v8",
            crown: "unicode/1f451.png?v8",
            crutch: "unicode/1fa7c.png?v8",
            cry: "unicode/1f622.png?v8",
            crying_cat_face: "unicode/1f63f.png?v8",
            crystal_ball: "unicode/1f52e.png?v8",
            cuba: "unicode/1f1e8-1f1fa.png?v8",
            cucumber: "unicode/1f952.png?v8",
            cup_with_straw: "unicode/1f964.png?v8",
            cupcake: "unicode/1f9c1.png?v8",
            cupid: "unicode/1f498.png?v8",
            curacao: "unicode/1f1e8-1f1fc.png?v8",
            curling_stone: "unicode/1f94c.png?v8",
            curly_haired_man: "unicode/1f468-1f9b1.png?v8",
            curly_haired_woman: "unicode/1f469-1f9b1.png?v8",
            curly_loop: "unicode/27b0.png?v8",
            currency_exchange: "unicode/1f4b1.png?v8",
            curry: "unicode/1f35b.png?v8",
            cursing_face: "unicode/1f92c.png?v8",
            custard: "unicode/1f36e.png?v8",
            customs: "unicode/1f6c3.png?v8",
            cut_of_meat: "unicode/1f969.png?v8",
            cyclone: "unicode/1f300.png?v8",
            cyprus: "unicode/1f1e8-1f1fe.png?v8",
            czech_republic: "unicode/1f1e8-1f1ff.png?v8",
            dagger: "unicode/1f5e1.png?v8",
            dancer: "unicode/1f483.png?v8",
            dancers: "unicode/1f46f.png?v8",
            dancing_men: "unicode/1f46f-2642.png?v8",
            dancing_women: "unicode/1f46f-2640.png?v8",
            dango: "unicode/1f361.png?v8",
            dark_sunglasses: "unicode/1f576.png?v8",
            dart: "unicode/1f3af.png?v8",
            dash: "unicode/1f4a8.png?v8",
            date: "unicode/1f4c5.png?v8",
            de: "unicode/1f1e9-1f1ea.png?v8",
            deaf_man: "unicode/1f9cf-2642.png?v8",
            deaf_person: "unicode/1f9cf.png?v8",
            deaf_woman: "unicode/1f9cf-2640.png?v8",
            deciduous_tree: "unicode/1f333.png?v8",
            deer: "unicode/1f98c.png?v8",
            denmark: "unicode/1f1e9-1f1f0.png?v8",
            department_store: "unicode/1f3ec.png?v8",
            dependabot: "dependabot.png?v8",
            derelict_house: "unicode/1f3da.png?v8",
            desert: "unicode/1f3dc.png?v8",
            desert_island: "unicode/1f3dd.png?v8",
            desktop_computer: "unicode/1f5a5.png?v8",
            detective: "unicode/1f575.png?v8",
            diamond_shape_with_a_dot_inside: "unicode/1f4a0.png?v8",
            diamonds: "unicode/2666.png?v8",
            diego_garcia: "unicode/1f1e9-1f1ec.png?v8",
            disappointed: "unicode/1f61e.png?v8",
            disappointed_relieved: "unicode/1f625.png?v8",
            disguised_face: "unicode/1f978.png?v8",
            diving_mask: "unicode/1f93f.png?v8",
            diya_lamp: "unicode/1fa94.png?v8",
            dizzy: "unicode/1f4ab.png?v8",
            dizzy_face: "unicode/1f635.png?v8",
            djibouti: "unicode/1f1e9-1f1ef.png?v8",
            dna: "unicode/1f9ec.png?v8",
            do_not_litter: "unicode/1f6af.png?v8",
            dodo: "unicode/1f9a4.png?v8",
            dog: "unicode/1f436.png?v8",
            dog2: "unicode/1f415.png?v8",
            dollar: "unicode/1f4b5.png?v8",
            dolls: "unicode/1f38e.png?v8",
            dolphin: "unicode/1f42c.png?v8",
            dominica: "unicode/1f1e9-1f1f2.png?v8",
            dominican_republic: "unicode/1f1e9-1f1f4.png?v8",
            donkey: "unicode/1facf.png?v8",
            door: "unicode/1f6aa.png?v8",
            dotted_line_face: "unicode/1fae5.png?v8",
            doughnut: "unicode/1f369.png?v8",
            dove: "unicode/1f54a.png?v8",
            dragon: "unicode/1f409.png?v8",
            dragon_face: "unicode/1f432.png?v8",
            dress: "unicode/1f457.png?v8",
            dromedary_camel: "unicode/1f42a.png?v8",
            drooling_face: "unicode/1f924.png?v8",
            drop_of_blood: "unicode/1fa78.png?v8",
            droplet: "unicode/1f4a7.png?v8",
            drum: "unicode/1f941.png?v8",
            duck: "unicode/1f986.png?v8",
            dumpling: "unicode/1f95f.png?v8",
            dvd: "unicode/1f4c0.png?v8",
            "e-mail": "unicode/1f4e7.png?v8",
            eagle: "unicode/1f985.png?v8",
            ear: "unicode/1f442.png?v8",
            ear_of_rice: "unicode/1f33e.png?v8",
            ear_with_hearing_aid: "unicode/1f9bb.png?v8",
            earth_africa: "unicode/1f30d.png?v8",
            earth_americas: "unicode/1f30e.png?v8",
            earth_asia: "unicode/1f30f.png?v8",
            ecuador: "unicode/1f1ea-1f1e8.png?v8",
            egg: "unicode/1f95a.png?v8",
            eggplant: "unicode/1f346.png?v8",
            egypt: "unicode/1f1ea-1f1ec.png?v8",
            eight: "unicode/0038-20e3.png?v8",
            eight_pointed_black_star: "unicode/2734.png?v8",
            eight_spoked_asterisk: "unicode/2733.png?v8",
            eject_button: "unicode/23cf.png?v8",
            el_salvador: "unicode/1f1f8-1f1fb.png?v8",
            electric_plug: "unicode/1f50c.png?v8",
            electron: "electron.png?v8",
            elephant: "unicode/1f418.png?v8",
            elevator: "unicode/1f6d7.png?v8",
            elf: "unicode/1f9dd.png?v8",
            elf_man: "unicode/1f9dd-2642.png?v8",
            elf_woman: "unicode/1f9dd-2640.png?v8",
            email: "unicode/1f4e7.png?v8",
            empty_nest: "unicode/1fab9.png?v8",
            end: "unicode/1f51a.png?v8",
            england: "unicode/1f3f4-e0067-e0062-e0065-e006e-e0067-e007f.png?v8",
            envelope: "unicode/2709.png?v8",
            envelope_with_arrow: "unicode/1f4e9.png?v8",
            equatorial_guinea: "unicode/1f1ec-1f1f6.png?v8",
            eritrea: "unicode/1f1ea-1f1f7.png?v8",
            es: "unicode/1f1ea-1f1f8.png?v8",
            estonia: "unicode/1f1ea-1f1ea.png?v8",
            ethiopia: "unicode/1f1ea-1f1f9.png?v8",
            eu: "unicode/1f1ea-1f1fa.png?v8",
            euro: "unicode/1f4b6.png?v8",
            european_castle: "unicode/1f3f0.png?v8",
            european_post_office: "unicode/1f3e4.png?v8",
            european_union: "unicode/1f1ea-1f1fa.png?v8",
            evergreen_tree: "unicode/1f332.png?v8",
            exclamation: "unicode/2757.png?v8",
            exploding_head: "unicode/1f92f.png?v8",
            expressionless: "unicode/1f611.png?v8",
            eye: "unicode/1f441.png?v8",
            eye_speech_bubble: "unicode/1f441-1f5e8.png?v8",
            eyeglasses: "unicode/1f453.png?v8",
            eyes: "unicode/1f440.png?v8",
            face_exhaling: "unicode/1f62e-1f4a8.png?v8",
            face_holding_back_tears: "unicode/1f979.png?v8",
            face_in_clouds: "unicode/1f636-1f32b.png?v8",
            face_with_diagonal_mouth: "unicode/1fae4.png?v8",
            face_with_head_bandage: "unicode/1f915.png?v8",
            face_with_open_eyes_and_hand_over_mouth: "unicode/1fae2.png?v8",
            face_with_peeking_eye: "unicode/1fae3.png?v8",
            face_with_spiral_eyes: "unicode/1f635-1f4ab.png?v8",
            face_with_thermometer: "unicode/1f912.png?v8",
            facepalm: "unicode/1f926.png?v8",
            facepunch: "unicode/1f44a.png?v8",
            factory: "unicode/1f3ed.png?v8",
            factory_worker: "unicode/1f9d1-1f3ed.png?v8",
            fairy: "unicode/1f9da.png?v8",
            fairy_man: "unicode/1f9da-2642.png?v8",
            fairy_woman: "unicode/1f9da-2640.png?v8",
            falafel: "unicode/1f9c6.png?v8",
            falkland_islands: "unicode/1f1eb-1f1f0.png?v8",
            fallen_leaf: "unicode/1f342.png?v8",
            family: "unicode/1f46a.png?v8",
            family_man_boy: "unicode/1f468-1f466.png?v8",
            family_man_boy_boy: "unicode/1f468-1f466-1f466.png?v8",
            family_man_girl: "unicode/1f468-1f467.png?v8",
            family_man_girl_boy: "unicode/1f468-1f467-1f466.png?v8",
            family_man_girl_girl: "unicode/1f468-1f467-1f467.png?v8",
            family_man_man_boy: "unicode/1f468-1f468-1f466.png?v8",
            family_man_man_boy_boy: "unicode/1f468-1f468-1f466-1f466.png?v8",
            family_man_man_girl: "unicode/1f468-1f468-1f467.png?v8",
            family_man_man_girl_boy: "unicode/1f468-1f468-1f467-1f466.png?v8",
            family_man_man_girl_girl: "unicode/1f468-1f468-1f467-1f467.png?v8",
            family_man_woman_boy: "unicode/1f468-1f469-1f466.png?v8",
            family_man_woman_boy_boy: "unicode/1f468-1f469-1f466-1f466.png?v8",
            family_man_woman_girl: "unicode/1f468-1f469-1f467.png?v8",
            family_man_woman_girl_boy: "unicode/1f468-1f469-1f467-1f466.png?v8",
            family_man_woman_girl_girl: "unicode/1f468-1f469-1f467-1f467.png?v8",
            family_woman_boy: "unicode/1f469-1f466.png?v8",
            family_woman_boy_boy: "unicode/1f469-1f466-1f466.png?v8",
            family_woman_girl: "unicode/1f469-1f467.png?v8",
            family_woman_girl_boy: "unicode/1f469-1f467-1f466.png?v8",
            family_woman_girl_girl: "unicode/1f469-1f467-1f467.png?v8",
            family_woman_woman_boy: "unicode/1f469-1f469-1f466.png?v8",
            family_woman_woman_boy_boy: "unicode/1f469-1f469-1f466-1f466.png?v8",
            family_woman_woman_girl: "unicode/1f469-1f469-1f467.png?v8",
            family_woman_woman_girl_boy: "unicode/1f469-1f469-1f467-1f466.png?v8",
            family_woman_woman_girl_girl: "unicode/1f469-1f469-1f467-1f467.png?v8",
            farmer: "unicode/1f9d1-1f33e.png?v8",
            faroe_islands: "unicode/1f1eb-1f1f4.png?v8",
            fast_forward: "unicode/23e9.png?v8",
            fax: "unicode/1f4e0.png?v8",
            fearful: "unicode/1f628.png?v8",
            feather: "unicode/1fab6.png?v8",
            feelsgood: "feelsgood.png?v8",
            feet: "unicode/1f43e.png?v8",
            female_detective: "unicode/1f575-2640.png?v8",
            female_sign: "unicode/2640.png?v8",
            ferris_wheel: "unicode/1f3a1.png?v8",
            ferry: "unicode/26f4.png?v8",
            field_hockey: "unicode/1f3d1.png?v8",
            fiji: "unicode/1f1eb-1f1ef.png?v8",
            file_cabinet: "unicode/1f5c4.png?v8",
            file_folder: "unicode/1f4c1.png?v8",
            film_projector: "unicode/1f4fd.png?v8",
            film_strip: "unicode/1f39e.png?v8",
            finland: "unicode/1f1eb-1f1ee.png?v8",
            finnadie: "finnadie.png?v8",
            fire: "unicode/1f525.png?v8",
            fire_engine: "unicode/1f692.png?v8",
            fire_extinguisher: "unicode/1f9ef.png?v8",
            firecracker: "unicode/1f9e8.png?v8",
            firefighter: "unicode/1f9d1-1f692.png?v8",
            fireworks: "unicode/1f386.png?v8",
            first_quarter_moon: "unicode/1f313.png?v8",
            first_quarter_moon_with_face: "unicode/1f31b.png?v8",
            fish: "unicode/1f41f.png?v8",
            fish_cake: "unicode/1f365.png?v8",
            fishing_pole_and_fish: "unicode/1f3a3.png?v8",
            fishsticks: "fishsticks.png?v8",
            fist: "unicode/270a.png?v8",
            fist_left: "unicode/1f91b.png?v8",
            fist_oncoming: "unicode/1f44a.png?v8",
            fist_raised: "unicode/270a.png?v8",
            fist_right: "unicode/1f91c.png?v8",
            five: "unicode/0035-20e3.png?v8",
            flags: "unicode/1f38f.png?v8",
            flamingo: "unicode/1f9a9.png?v8",
            flashlight: "unicode/1f526.png?v8",
            flat_shoe: "unicode/1f97f.png?v8",
            flatbread: "unicode/1fad3.png?v8",
            fleur_de_lis: "unicode/269c.png?v8",
            flight_arrival: "unicode/1f6ec.png?v8",
            flight_departure: "unicode/1f6eb.png?v8",
            flipper: "unicode/1f42c.png?v8",
            floppy_disk: "unicode/1f4be.png?v8",
            flower_playing_cards: "unicode/1f3b4.png?v8",
            flushed: "unicode/1f633.png?v8",
            flute: "unicode/1fa88.png?v8",
            fly: "unicode/1fab0.png?v8",
            flying_disc: "unicode/1f94f.png?v8",
            flying_saucer: "unicode/1f6f8.png?v8",
            fog: "unicode/1f32b.png?v8",
            foggy: "unicode/1f301.png?v8",
            folding_hand_fan: "unicode/1faad.png?v8",
            fondue: "unicode/1fad5.png?v8",
            foot: "unicode/1f9b6.png?v8",
            football: "unicode/1f3c8.png?v8",
            footprints: "unicode/1f463.png?v8",
            fork_and_knife: "unicode/1f374.png?v8",
            fortune_cookie: "unicode/1f960.png?v8",
            fountain: "unicode/26f2.png?v8",
            fountain_pen: "unicode/1f58b.png?v8",
            four: "unicode/0034-20e3.png?v8",
            four_leaf_clover: "unicode/1f340.png?v8",
            fox_face: "unicode/1f98a.png?v8",
            fr: "unicode/1f1eb-1f1f7.png?v8",
            framed_picture: "unicode/1f5bc.png?v8",
            free: "unicode/1f193.png?v8",
            french_guiana: "unicode/1f1ec-1f1eb.png?v8",
            french_polynesia: "unicode/1f1f5-1f1eb.png?v8",
            french_southern_territories: "unicode/1f1f9-1f1eb.png?v8",
            fried_egg: "unicode/1f373.png?v8",
            fried_shrimp: "unicode/1f364.png?v8",
            fries: "unicode/1f35f.png?v8",
            frog: "unicode/1f438.png?v8",
            frowning: "unicode/1f626.png?v8",
            frowning_face: "unicode/2639.png?v8",
            frowning_man: "unicode/1f64d-2642.png?v8",
            frowning_person: "unicode/1f64d.png?v8",
            frowning_woman: "unicode/1f64d-2640.png?v8",
            fu: "unicode/1f595.png?v8",
            fuelpump: "unicode/26fd.png?v8",
            full_moon: "unicode/1f315.png?v8",
            full_moon_with_face: "unicode/1f31d.png?v8",
            funeral_urn: "unicode/26b1.png?v8",
            gabon: "unicode/1f1ec-1f1e6.png?v8",
            gambia: "unicode/1f1ec-1f1f2.png?v8",
            game_die: "unicode/1f3b2.png?v8",
            garlic: "unicode/1f9c4.png?v8",
            gb: "unicode/1f1ec-1f1e7.png?v8",
            gear: "unicode/2699.png?v8",
            gem: "unicode/1f48e.png?v8",
            gemini: "unicode/264a.png?v8",
            genie: "unicode/1f9de.png?v8",
            genie_man: "unicode/1f9de-2642.png?v8",
            genie_woman: "unicode/1f9de-2640.png?v8",
            georgia: "unicode/1f1ec-1f1ea.png?v8",
            ghana: "unicode/1f1ec-1f1ed.png?v8",
            ghost: "unicode/1f47b.png?v8",
            gibraltar: "unicode/1f1ec-1f1ee.png?v8",
            gift: "unicode/1f381.png?v8",
            gift_heart: "unicode/1f49d.png?v8",
            ginger_root: "unicode/1fada.png?v8",
            giraffe: "unicode/1f992.png?v8",
            girl: "unicode/1f467.png?v8",
            globe_with_meridians: "unicode/1f310.png?v8",
            gloves: "unicode/1f9e4.png?v8",
            goal_net: "unicode/1f945.png?v8",
            goat: "unicode/1f410.png?v8",
            goberserk: "goberserk.png?v8",
            godmode: "godmode.png?v8",
            goggles: "unicode/1f97d.png?v8",
            golf: "unicode/26f3.png?v8",
            golfing: "unicode/1f3cc.png?v8",
            golfing_man: "unicode/1f3cc-2642.png?v8",
            golfing_woman: "unicode/1f3cc-2640.png?v8",
            goose: "unicode/1fabf.png?v8",
            gorilla: "unicode/1f98d.png?v8",
            grapes: "unicode/1f347.png?v8",
            greece: "unicode/1f1ec-1f1f7.png?v8",
            green_apple: "unicode/1f34f.png?v8",
            green_book: "unicode/1f4d7.png?v8",
            green_circle: "unicode/1f7e2.png?v8",
            green_heart: "unicode/1f49a.png?v8",
            green_salad: "unicode/1f957.png?v8",
            green_square: "unicode/1f7e9.png?v8",
            greenland: "unicode/1f1ec-1f1f1.png?v8",
            grenada: "unicode/1f1ec-1f1e9.png?v8",
            grey_exclamation: "unicode/2755.png?v8",
            grey_heart: "unicode/1fa76.png?v8",
            grey_question: "unicode/2754.png?v8",
            grimacing: "unicode/1f62c.png?v8",
            grin: "unicode/1f601.png?v8",
            grinning: "unicode/1f600.png?v8",
            guadeloupe: "unicode/1f1ec-1f1f5.png?v8",
            guam: "unicode/1f1ec-1f1fa.png?v8",
            guard: "unicode/1f482.png?v8",
            guardsman: "unicode/1f482-2642.png?v8",
            guardswoman: "unicode/1f482-2640.png?v8",
            guatemala: "unicode/1f1ec-1f1f9.png?v8",
            guernsey: "unicode/1f1ec-1f1ec.png?v8",
            guide_dog: "unicode/1f9ae.png?v8",
            guinea: "unicode/1f1ec-1f1f3.png?v8",
            guinea_bissau: "unicode/1f1ec-1f1fc.png?v8",
            guitar: "unicode/1f3b8.png?v8",
            gun: "unicode/1f52b.png?v8",
            guyana: "unicode/1f1ec-1f1fe.png?v8",
            hair_pick: "unicode/1faae.png?v8",
            haircut: "unicode/1f487.png?v8",
            haircut_man: "unicode/1f487-2642.png?v8",
            haircut_woman: "unicode/1f487-2640.png?v8",
            haiti: "unicode/1f1ed-1f1f9.png?v8",
            hamburger: "unicode/1f354.png?v8",
            hammer: "unicode/1f528.png?v8",
            hammer_and_pick: "unicode/2692.png?v8",
            hammer_and_wrench: "unicode/1f6e0.png?v8",
            hamsa: "unicode/1faac.png?v8",
            hamster: "unicode/1f439.png?v8",
            hand: "unicode/270b.png?v8",
            hand_over_mouth: "unicode/1f92d.png?v8",
            hand_with_index_finger_and_thumb_crossed: "unicode/1faf0.png?v8",
            handbag: "unicode/1f45c.png?v8",
            handball_person: "unicode/1f93e.png?v8",
            handshake: "unicode/1f91d.png?v8",
            hankey: "unicode/1f4a9.png?v8",
            hash: "unicode/0023-20e3.png?v8",
            hatched_chick: "unicode/1f425.png?v8",
            hatching_chick: "unicode/1f423.png?v8",
            headphones: "unicode/1f3a7.png?v8",
            headstone: "unicode/1faa6.png?v8",
            health_worker: "unicode/1f9d1-2695.png?v8",
            hear_no_evil: "unicode/1f649.png?v8",
            heard_mcdonald_islands: "unicode/1f1ed-1f1f2.png?v8",
            heart: "unicode/2764.png?v8",
            heart_decoration: "unicode/1f49f.png?v8",
            heart_eyes: "unicode/1f60d.png?v8",
            heart_eyes_cat: "unicode/1f63b.png?v8",
            heart_hands: "unicode/1faf6.png?v8",
            heart_on_fire: "unicode/2764-1f525.png?v8",
            heartbeat: "unicode/1f493.png?v8",
            heartpulse: "unicode/1f497.png?v8",
            hearts: "unicode/2665.png?v8",
            heavy_check_mark: "unicode/2714.png?v8",
            heavy_division_sign: "unicode/2797.png?v8",
            heavy_dollar_sign: "unicode/1f4b2.png?v8",
            heavy_equals_sign: "unicode/1f7f0.png?v8",
            heavy_exclamation_mark: "unicode/2757.png?v8",
            heavy_heart_exclamation: "unicode/2763.png?v8",
            heavy_minus_sign: "unicode/2796.png?v8",
            heavy_multiplication_x: "unicode/2716.png?v8",
            heavy_plus_sign: "unicode/2795.png?v8",
            hedgehog: "unicode/1f994.png?v8",
            helicopter: "unicode/1f681.png?v8",
            herb: "unicode/1f33f.png?v8",
            hibiscus: "unicode/1f33a.png?v8",
            high_brightness: "unicode/1f506.png?v8",
            high_heel: "unicode/1f460.png?v8",
            hiking_boot: "unicode/1f97e.png?v8",
            hindu_temple: "unicode/1f6d5.png?v8",
            hippopotamus: "unicode/1f99b.png?v8",
            hocho: "unicode/1f52a.png?v8",
            hole: "unicode/1f573.png?v8",
            honduras: "unicode/1f1ed-1f1f3.png?v8",
            honey_pot: "unicode/1f36f.png?v8",
            honeybee: "unicode/1f41d.png?v8",
            hong_kong: "unicode/1f1ed-1f1f0.png?v8",
            hook: "unicode/1fa9d.png?v8",
            horse: "unicode/1f434.png?v8",
            horse_racing: "unicode/1f3c7.png?v8",
            hospital: "unicode/1f3e5.png?v8",
            hot_face: "unicode/1f975.png?v8",
            hot_pepper: "unicode/1f336.png?v8",
            hotdog: "unicode/1f32d.png?v8",
            hotel: "unicode/1f3e8.png?v8",
            hotsprings: "unicode/2668.png?v8",
            hourglass: "unicode/231b.png?v8",
            hourglass_flowing_sand: "unicode/23f3.png?v8",
            house: "unicode/1f3e0.png?v8",
            house_with_garden: "unicode/1f3e1.png?v8",
            houses: "unicode/1f3d8.png?v8",
            hugs: "unicode/1f917.png?v8",
            hungary: "unicode/1f1ed-1f1fa.png?v8",
            hurtrealbad: "hurtrealbad.png?v8",
            hushed: "unicode/1f62f.png?v8",
            hut: "unicode/1f6d6.png?v8",
            hyacinth: "unicode/1fabb.png?v8",
            ice_cream: "unicode/1f368.png?v8",
            ice_cube: "unicode/1f9ca.png?v8",
            ice_hockey: "unicode/1f3d2.png?v8",
            ice_skate: "unicode/26f8.png?v8",
            icecream: "unicode/1f366.png?v8",
            iceland: "unicode/1f1ee-1f1f8.png?v8",
            id: "unicode/1f194.png?v8",
            identification_card: "unicode/1faaa.png?v8",
            ideograph_advantage: "unicode/1f250.png?v8",
            imp: "unicode/1f47f.png?v8",
            inbox_tray: "unicode/1f4e5.png?v8",
            incoming_envelope: "unicode/1f4e8.png?v8",
            index_pointing_at_the_viewer: "unicode/1faf5.png?v8",
            india: "unicode/1f1ee-1f1f3.png?v8",
            indonesia: "unicode/1f1ee-1f1e9.png?v8",
            infinity: "unicode/267e.png?v8",
            information_desk_person: "unicode/1f481.png?v8",
            information_source: "unicode/2139.png?v8",
            innocent: "unicode/1f607.png?v8",
            interrobang: "unicode/2049.png?v8",
            iphone: "unicode/1f4f1.png?v8",
            iran: "unicode/1f1ee-1f1f7.png?v8",
            iraq: "unicode/1f1ee-1f1f6.png?v8",
            ireland: "unicode/1f1ee-1f1ea.png?v8",
            isle_of_man: "unicode/1f1ee-1f1f2.png?v8",
            israel: "unicode/1f1ee-1f1f1.png?v8",
            it: "unicode/1f1ee-1f1f9.png?v8",
            izakaya_lantern: "unicode/1f3ee.png?v8",
            jack_o_lantern: "unicode/1f383.png?v8",
            jamaica: "unicode/1f1ef-1f1f2.png?v8",
            japan: "unicode/1f5fe.png?v8",
            japanese_castle: "unicode/1f3ef.png?v8",
            japanese_goblin: "unicode/1f47a.png?v8",
            japanese_ogre: "unicode/1f479.png?v8",
            jar: "unicode/1fad9.png?v8",
            jeans: "unicode/1f456.png?v8",
            jellyfish: "unicode/1fabc.png?v8",
            jersey: "unicode/1f1ef-1f1ea.png?v8",
            jigsaw: "unicode/1f9e9.png?v8",
            jordan: "unicode/1f1ef-1f1f4.png?v8",
            joy: "unicode/1f602.png?v8",
            joy_cat: "unicode/1f639.png?v8",
            joystick: "unicode/1f579.png?v8",
            jp: "unicode/1f1ef-1f1f5.png?v8",
            judge: "unicode/1f9d1-2696.png?v8",
            juggling_person: "unicode/1f939.png?v8",
            kaaba: "unicode/1f54b.png?v8",
            kangaroo: "unicode/1f998.png?v8",
            kazakhstan: "unicode/1f1f0-1f1ff.png?v8",
            kenya: "unicode/1f1f0-1f1ea.png?v8",
            key: "unicode/1f511.png?v8",
            keyboard: "unicode/2328.png?v8",
            keycap_ten: "unicode/1f51f.png?v8",
            khanda: "unicode/1faaf.png?v8",
            kick_scooter: "unicode/1f6f4.png?v8",
            kimono: "unicode/1f458.png?v8",
            kiribati: "unicode/1f1f0-1f1ee.png?v8",
            kiss: "unicode/1f48b.png?v8",
            kissing: "unicode/1f617.png?v8",
            kissing_cat: "unicode/1f63d.png?v8",
            kissing_closed_eyes: "unicode/1f61a.png?v8",
            kissing_heart: "unicode/1f618.png?v8",
            kissing_smiling_eyes: "unicode/1f619.png?v8",
            kite: "unicode/1fa81.png?v8",
            kiwi_fruit: "unicode/1f95d.png?v8",
            kneeling_man: "unicode/1f9ce-2642.png?v8",
            kneeling_person: "unicode/1f9ce.png?v8",
            kneeling_woman: "unicode/1f9ce-2640.png?v8",
            knife: "unicode/1f52a.png?v8",
            knot: "unicode/1faa2.png?v8",
            koala: "unicode/1f428.png?v8",
            koko: "unicode/1f201.png?v8",
            kosovo: "unicode/1f1fd-1f1f0.png?v8",
            kr: "unicode/1f1f0-1f1f7.png?v8",
            kuwait: "unicode/1f1f0-1f1fc.png?v8",
            kyrgyzstan: "unicode/1f1f0-1f1ec.png?v8",
            lab_coat: "unicode/1f97c.png?v8",
            label: "unicode/1f3f7.png?v8",
            lacrosse: "unicode/1f94d.png?v8",
            ladder: "unicode/1fa9c.png?v8",
            lady_beetle: "unicode/1f41e.png?v8",
            lantern: "unicode/1f3ee.png?v8",
            laos: "unicode/1f1f1-1f1e6.png?v8",
            large_blue_circle: "unicode/1f535.png?v8",
            large_blue_diamond: "unicode/1f537.png?v8",
            large_orange_diamond: "unicode/1f536.png?v8",
            last_quarter_moon: "unicode/1f317.png?v8",
            last_quarter_moon_with_face: "unicode/1f31c.png?v8",
            latin_cross: "unicode/271d.png?v8",
            latvia: "unicode/1f1f1-1f1fb.png?v8",
            laughing: "unicode/1f606.png?v8",
            leafy_green: "unicode/1f96c.png?v8",
            leaves: "unicode/1f343.png?v8",
            lebanon: "unicode/1f1f1-1f1e7.png?v8",
            ledger: "unicode/1f4d2.png?v8",
            left_luggage: "unicode/1f6c5.png?v8",
            left_right_arrow: "unicode/2194.png?v8",
            left_speech_bubble: "unicode/1f5e8.png?v8",
            leftwards_arrow_with_hook: "unicode/21a9.png?v8",
            leftwards_hand: "unicode/1faf2.png?v8",
            leftwards_pushing_hand: "unicode/1faf7.png?v8",
            leg: "unicode/1f9b5.png?v8",
            lemon: "unicode/1f34b.png?v8",
            leo: "unicode/264c.png?v8",
            leopard: "unicode/1f406.png?v8",
            lesotho: "unicode/1f1f1-1f1f8.png?v8",
            level_slider: "unicode/1f39a.png?v8",
            liberia: "unicode/1f1f1-1f1f7.png?v8",
            libra: "unicode/264e.png?v8",
            libya: "unicode/1f1f1-1f1fe.png?v8",
            liechtenstein: "unicode/1f1f1-1f1ee.png?v8",
            light_blue_heart: "unicode/1fa75.png?v8",
            light_rail: "unicode/1f688.png?v8",
            link: "unicode/1f517.png?v8",
            lion: "unicode/1f981.png?v8",
            lips: "unicode/1f444.png?v8",
            lipstick: "unicode/1f484.png?v8",
            lithuania: "unicode/1f1f1-1f1f9.png?v8",
            lizard: "unicode/1f98e.png?v8",
            llama: "unicode/1f999.png?v8",
            lobster: "unicode/1f99e.png?v8",
            lock: "unicode/1f512.png?v8",
            lock_with_ink_pen: "unicode/1f50f.png?v8",
            lollipop: "unicode/1f36d.png?v8",
            long_drum: "unicode/1fa98.png?v8",
            loop: "unicode/27bf.png?v8",
            lotion_bottle: "unicode/1f9f4.png?v8",
            lotus: "unicode/1fab7.png?v8",
            lotus_position: "unicode/1f9d8.png?v8",
            lotus_position_man: "unicode/1f9d8-2642.png?v8",
            lotus_position_woman: "unicode/1f9d8-2640.png?v8",
            loud_sound: "unicode/1f50a.png?v8",
            loudspeaker: "unicode/1f4e2.png?v8",
            love_hotel: "unicode/1f3e9.png?v8",
            love_letter: "unicode/1f48c.png?v8",
            love_you_gesture: "unicode/1f91f.png?v8",
            low_battery: "unicode/1faab.png?v8",
            low_brightness: "unicode/1f505.png?v8",
            luggage: "unicode/1f9f3.png?v8",
            lungs: "unicode/1fac1.png?v8",
            luxembourg: "unicode/1f1f1-1f1fa.png?v8",
            lying_face: "unicode/1f925.png?v8",
            m: "unicode/24c2.png?v8",
            macau: "unicode/1f1f2-1f1f4.png?v8",
            macedonia: "unicode/1f1f2-1f1f0.png?v8",
            madagascar: "unicode/1f1f2-1f1ec.png?v8",
            mag: "unicode/1f50d.png?v8",
            mag_right: "unicode/1f50e.png?v8",
            mage: "unicode/1f9d9.png?v8",
            mage_man: "unicode/1f9d9-2642.png?v8",
            mage_woman: "unicode/1f9d9-2640.png?v8",
            magic_wand: "unicode/1fa84.png?v8",
            magnet: "unicode/1f9f2.png?v8",
            mahjong: "unicode/1f004.png?v8",
            mailbox: "unicode/1f4eb.png?v8",
            mailbox_closed: "unicode/1f4ea.png?v8",
            mailbox_with_mail: "unicode/1f4ec.png?v8",
            mailbox_with_no_mail: "unicode/1f4ed.png?v8",
            malawi: "unicode/1f1f2-1f1fc.png?v8",
            malaysia: "unicode/1f1f2-1f1fe.png?v8",
            maldives: "unicode/1f1f2-1f1fb.png?v8",
            male_detective: "unicode/1f575-2642.png?v8",
            male_sign: "unicode/2642.png?v8",
            mali: "unicode/1f1f2-1f1f1.png?v8",
            malta: "unicode/1f1f2-1f1f9.png?v8",
            mammoth: "unicode/1f9a3.png?v8",
            man: "unicode/1f468.png?v8",
            man_artist: "unicode/1f468-1f3a8.png?v8",
            man_astronaut: "unicode/1f468-1f680.png?v8",
            man_beard: "unicode/1f9d4-2642.png?v8",
            man_cartwheeling: "unicode/1f938-2642.png?v8",
            man_cook: "unicode/1f468-1f373.png?v8",
            man_dancing: "unicode/1f57a.png?v8",
            man_facepalming: "unicode/1f926-2642.png?v8",
            man_factory_worker: "unicode/1f468-1f3ed.png?v8",
            man_farmer: "unicode/1f468-1f33e.png?v8",
            man_feeding_baby: "unicode/1f468-1f37c.png?v8",
            man_firefighter: "unicode/1f468-1f692.png?v8",
            man_health_worker: "unicode/1f468-2695.png?v8",
            man_in_manual_wheelchair: "unicode/1f468-1f9bd.png?v8",
            man_in_motorized_wheelchair: "unicode/1f468-1f9bc.png?v8",
            man_in_tuxedo: "unicode/1f935-2642.png?v8",
            man_judge: "unicode/1f468-2696.png?v8",
            man_juggling: "unicode/1f939-2642.png?v8",
            man_mechanic: "unicode/1f468-1f527.png?v8",
            man_office_worker: "unicode/1f468-1f4bc.png?v8",
            man_pilot: "unicode/1f468-2708.png?v8",
            man_playing_handball: "unicode/1f93e-2642.png?v8",
            man_playing_water_polo: "unicode/1f93d-2642.png?v8",
            man_scientist: "unicode/1f468-1f52c.png?v8",
            man_shrugging: "unicode/1f937-2642.png?v8",
            man_singer: "unicode/1f468-1f3a4.png?v8",
            man_student: "unicode/1f468-1f393.png?v8",
            man_teacher: "unicode/1f468-1f3eb.png?v8",
            man_technologist: "unicode/1f468-1f4bb.png?v8",
            man_with_gua_pi_mao: "unicode/1f472.png?v8",
            man_with_probing_cane: "unicode/1f468-1f9af.png?v8",
            man_with_turban: "unicode/1f473-2642.png?v8",
            man_with_veil: "unicode/1f470-2642.png?v8",
            mandarin: "unicode/1f34a.png?v8",
            mango: "unicode/1f96d.png?v8",
            mans_shoe: "unicode/1f45e.png?v8",
            mantelpiece_clock: "unicode/1f570.png?v8",
            manual_wheelchair: "unicode/1f9bd.png?v8",
            maple_leaf: "unicode/1f341.png?v8",
            maracas: "unicode/1fa87.png?v8",
            marshall_islands: "unicode/1f1f2-1f1ed.png?v8",
            martial_arts_uniform: "unicode/1f94b.png?v8",
            martinique: "unicode/1f1f2-1f1f6.png?v8",
            mask: "unicode/1f637.png?v8",
            massage: "unicode/1f486.png?v8",
            massage_man: "unicode/1f486-2642.png?v8",
            massage_woman: "unicode/1f486-2640.png?v8",
            mate: "unicode/1f9c9.png?v8",
            mauritania: "unicode/1f1f2-1f1f7.png?v8",
            mauritius: "unicode/1f1f2-1f1fa.png?v8",
            mayotte: "unicode/1f1fe-1f1f9.png?v8",
            meat_on_bone: "unicode/1f356.png?v8",
            mechanic: "unicode/1f9d1-1f527.png?v8",
            mechanical_arm: "unicode/1f9be.png?v8",
            mechanical_leg: "unicode/1f9bf.png?v8",
            medal_military: "unicode/1f396.png?v8",
            medal_sports: "unicode/1f3c5.png?v8",
            medical_symbol: "unicode/2695.png?v8",
            mega: "unicode/1f4e3.png?v8",
            melon: "unicode/1f348.png?v8",
            melting_face: "unicode/1fae0.png?v8",
            memo: "unicode/1f4dd.png?v8",
            men_wrestling: "unicode/1f93c-2642.png?v8",
            mending_heart: "unicode/2764-1fa79.png?v8",
            menorah: "unicode/1f54e.png?v8",
            mens: "unicode/1f6b9.png?v8",
            mermaid: "unicode/1f9dc-2640.png?v8",
            merman: "unicode/1f9dc-2642.png?v8",
            merperson: "unicode/1f9dc.png?v8",
            metal: "unicode/1f918.png?v8",
            metro: "unicode/1f687.png?v8",
            mexico: "unicode/1f1f2-1f1fd.png?v8",
            microbe: "unicode/1f9a0.png?v8",
            micronesia: "unicode/1f1eb-1f1f2.png?v8",
            microphone: "unicode/1f3a4.png?v8",
            microscope: "unicode/1f52c.png?v8",
            middle_finger: "unicode/1f595.png?v8",
            military_helmet: "unicode/1fa96.png?v8",
            milk_glass: "unicode/1f95b.png?v8",
            milky_way: "unicode/1f30c.png?v8",
            minibus: "unicode/1f690.png?v8",
            minidisc: "unicode/1f4bd.png?v8",
            mirror: "unicode/1fa9e.png?v8",
            mirror_ball: "unicode/1faa9.png?v8",
            mobile_phone_off: "unicode/1f4f4.png?v8",
            moldova: "unicode/1f1f2-1f1e9.png?v8",
            monaco: "unicode/1f1f2-1f1e8.png?v8",
            money_mouth_face: "unicode/1f911.png?v8",
            money_with_wings: "unicode/1f4b8.png?v8",
            moneybag: "unicode/1f4b0.png?v8",
            mongolia: "unicode/1f1f2-1f1f3.png?v8",
            monkey: "unicode/1f412.png?v8",
            monkey_face: "unicode/1f435.png?v8",
            monocle_face: "unicode/1f9d0.png?v8",
            monorail: "unicode/1f69d.png?v8",
            montenegro: "unicode/1f1f2-1f1ea.png?v8",
            montserrat: "unicode/1f1f2-1f1f8.png?v8",
            moon: "unicode/1f314.png?v8",
            moon_cake: "unicode/1f96e.png?v8",
            moose: "unicode/1face.png?v8",
            morocco: "unicode/1f1f2-1f1e6.png?v8",
            mortar_board: "unicode/1f393.png?v8",
            mosque: "unicode/1f54c.png?v8",
            mosquito: "unicode/1f99f.png?v8",
            motor_boat: "unicode/1f6e5.png?v8",
            motor_scooter: "unicode/1f6f5.png?v8",
            motorcycle: "unicode/1f3cd.png?v8",
            motorized_wheelchair: "unicode/1f9bc.png?v8",
            motorway: "unicode/1f6e3.png?v8",
            mount_fuji: "unicode/1f5fb.png?v8",
            mountain: "unicode/26f0.png?v8",
            mountain_bicyclist: "unicode/1f6b5.png?v8",
            mountain_biking_man: "unicode/1f6b5-2642.png?v8",
            mountain_biking_woman: "unicode/1f6b5-2640.png?v8",
            mountain_cableway: "unicode/1f6a0.png?v8",
            mountain_railway: "unicode/1f69e.png?v8",
            mountain_snow: "unicode/1f3d4.png?v8",
            mouse: "unicode/1f42d.png?v8",
            mouse2: "unicode/1f401.png?v8",
            mouse_trap: "unicode/1faa4.png?v8",
            movie_camera: "unicode/1f3a5.png?v8",
            moyai: "unicode/1f5ff.png?v8",
            mozambique: "unicode/1f1f2-1f1ff.png?v8",
            mrs_claus: "unicode/1f936.png?v8",
            muscle: "unicode/1f4aa.png?v8",
            mushroom: "unicode/1f344.png?v8",
            musical_keyboard: "unicode/1f3b9.png?v8",
            musical_note: "unicode/1f3b5.png?v8",
            musical_score: "unicode/1f3bc.png?v8",
            mute: "unicode/1f507.png?v8",
            mx_claus: "unicode/1f9d1-1f384.png?v8",
            myanmar: "unicode/1f1f2-1f1f2.png?v8",
            nail_care: "unicode/1f485.png?v8",
            name_badge: "unicode/1f4db.png?v8",
            namibia: "unicode/1f1f3-1f1e6.png?v8",
            national_park: "unicode/1f3de.png?v8",
            nauru: "unicode/1f1f3-1f1f7.png?v8",
            nauseated_face: "unicode/1f922.png?v8",
            nazar_amulet: "unicode/1f9ff.png?v8",
            neckbeard: "neckbeard.png?v8",
            necktie: "unicode/1f454.png?v8",
            negative_squared_cross_mark: "unicode/274e.png?v8",
            nepal: "unicode/1f1f3-1f1f5.png?v8",
            nerd_face: "unicode/1f913.png?v8",
            nest_with_eggs: "unicode/1faba.png?v8",
            nesting_dolls: "unicode/1fa86.png?v8",
            netherlands: "unicode/1f1f3-1f1f1.png?v8",
            neutral_face: "unicode/1f610.png?v8",
            new: "unicode/1f195.png?v8",
            new_caledonia: "unicode/1f1f3-1f1e8.png?v8",
            new_moon: "unicode/1f311.png?v8",
            new_moon_with_face: "unicode/1f31a.png?v8",
            new_zealand: "unicode/1f1f3-1f1ff.png?v8",
            newspaper: "unicode/1f4f0.png?v8",
            newspaper_roll: "unicode/1f5de.png?v8",
            next_track_button: "unicode/23ed.png?v8",
            ng: "unicode/1f196.png?v8",
            ng_man: "unicode/1f645-2642.png?v8",
            ng_woman: "unicode/1f645-2640.png?v8",
            nicaragua: "unicode/1f1f3-1f1ee.png?v8",
            niger: "unicode/1f1f3-1f1ea.png?v8",
            nigeria: "unicode/1f1f3-1f1ec.png?v8",
            night_with_stars: "unicode/1f303.png?v8",
            nine: "unicode/0039-20e3.png?v8",
            ninja: "unicode/1f977.png?v8",
            niue: "unicode/1f1f3-1f1fa.png?v8",
            no_bell: "unicode/1f515.png?v8",
            no_bicycles: "unicode/1f6b3.png?v8",
            no_entry: "unicode/26d4.png?v8",
            no_entry_sign: "unicode/1f6ab.png?v8",
            no_good: "unicode/1f645.png?v8",
            no_good_man: "unicode/1f645-2642.png?v8",
            no_good_woman: "unicode/1f645-2640.png?v8",
            no_mobile_phones: "unicode/1f4f5.png?v8",
            no_mouth: "unicode/1f636.png?v8",
            no_pedestrians: "unicode/1f6b7.png?v8",
            no_smoking: "unicode/1f6ad.png?v8",
            "non-potable_water": "unicode/1f6b1.png?v8",
            norfolk_island: "unicode/1f1f3-1f1eb.png?v8",
            north_korea: "unicode/1f1f0-1f1f5.png?v8",
            northern_mariana_islands: "unicode/1f1f2-1f1f5.png?v8",
            norway: "unicode/1f1f3-1f1f4.png?v8",
            nose: "unicode/1f443.png?v8",
            notebook: "unicode/1f4d3.png?v8",
            notebook_with_decorative_cover: "unicode/1f4d4.png?v8",
            notes: "unicode/1f3b6.png?v8",
            nut_and_bolt: "unicode/1f529.png?v8",
            o: "unicode/2b55.png?v8",
            o2: "unicode/1f17e.png?v8",
            ocean: "unicode/1f30a.png?v8",
            octocat: "octocat.png?v8",
            octopus: "unicode/1f419.png?v8",
            oden: "unicode/1f362.png?v8",
            office: "unicode/1f3e2.png?v8",
            office_worker: "unicode/1f9d1-1f4bc.png?v8",
            oil_drum: "unicode/1f6e2.png?v8",
            ok: "unicode/1f197.png?v8",
            ok_hand: "unicode/1f44c.png?v8",
            ok_man: "unicode/1f646-2642.png?v8",
            ok_person: "unicode/1f646.png?v8",
            ok_woman: "unicode/1f646-2640.png?v8",
            old_key: "unicode/1f5dd.png?v8",
            older_adult: "unicode/1f9d3.png?v8",
            older_man: "unicode/1f474.png?v8",
            older_woman: "unicode/1f475.png?v8",
            olive: "unicode/1fad2.png?v8",
            om: "unicode/1f549.png?v8",
            oman: "unicode/1f1f4-1f1f2.png?v8",
            on: "unicode/1f51b.png?v8",
            oncoming_automobile: "unicode/1f698.png?v8",
            oncoming_bus: "unicode/1f68d.png?v8",
            oncoming_police_car: "unicode/1f694.png?v8",
            oncoming_taxi: "unicode/1f696.png?v8",
            one: "unicode/0031-20e3.png?v8",
            one_piece_swimsuit: "unicode/1fa71.png?v8",
            onion: "unicode/1f9c5.png?v8",
            open_book: "unicode/1f4d6.png?v8",
            open_file_folder: "unicode/1f4c2.png?v8",
            open_hands: "unicode/1f450.png?v8",
            open_mouth: "unicode/1f62e.png?v8",
            open_umbrella: "unicode/2602.png?v8",
            ophiuchus: "unicode/26ce.png?v8",
            orange: "unicode/1f34a.png?v8",
            orange_book: "unicode/1f4d9.png?v8",
            orange_circle: "unicode/1f7e0.png?v8",
            orange_heart: "unicode/1f9e1.png?v8",
            orange_square: "unicode/1f7e7.png?v8",
            orangutan: "unicode/1f9a7.png?v8",
            orthodox_cross: "unicode/2626.png?v8",
            otter: "unicode/1f9a6.png?v8",
            outbox_tray: "unicode/1f4e4.png?v8",
            owl: "unicode/1f989.png?v8",
            ox: "unicode/1f402.png?v8",
            oyster: "unicode/1f9aa.png?v8",
            package: "unicode/1f4e6.png?v8",
            page_facing_up: "unicode/1f4c4.png?v8",
            page_with_curl: "unicode/1f4c3.png?v8",
            pager: "unicode/1f4df.png?v8",
            paintbrush: "unicode/1f58c.png?v8",
            pakistan: "unicode/1f1f5-1f1f0.png?v8",
            palau: "unicode/1f1f5-1f1fc.png?v8",
            palestinian_territories: "unicode/1f1f5-1f1f8.png?v8",
            palm_down_hand: "unicode/1faf3.png?v8",
            palm_tree: "unicode/1f334.png?v8",
            palm_up_hand: "unicode/1faf4.png?v8",
            palms_up_together: "unicode/1f932.png?v8",
            panama: "unicode/1f1f5-1f1e6.png?v8",
            pancakes: "unicode/1f95e.png?v8",
            panda_face: "unicode/1f43c.png?v8",
            paperclip: "unicode/1f4ce.png?v8",
            paperclips: "unicode/1f587.png?v8",
            papua_new_guinea: "unicode/1f1f5-1f1ec.png?v8",
            parachute: "unicode/1fa82.png?v8",
            paraguay: "unicode/1f1f5-1f1fe.png?v8",
            parasol_on_ground: "unicode/26f1.png?v8",
            parking: "unicode/1f17f.png?v8",
            parrot: "unicode/1f99c.png?v8",
            part_alternation_mark: "unicode/303d.png?v8",
            partly_sunny: "unicode/26c5.png?v8",
            partying_face: "unicode/1f973.png?v8",
            passenger_ship: "unicode/1f6f3.png?v8",
            passport_control: "unicode/1f6c2.png?v8",
            pause_button: "unicode/23f8.png?v8",
            paw_prints: "unicode/1f43e.png?v8",
            pea_pod: "unicode/1fadb.png?v8",
            peace_symbol: "unicode/262e.png?v8",
            peach: "unicode/1f351.png?v8",
            peacock: "unicode/1f99a.png?v8",
            peanuts: "unicode/1f95c.png?v8",
            pear: "unicode/1f350.png?v8",
            pen: "unicode/1f58a.png?v8",
            pencil: "unicode/1f4dd.png?v8",
            pencil2: "unicode/270f.png?v8",
            penguin: "unicode/1f427.png?v8",
            pensive: "unicode/1f614.png?v8",
            people_holding_hands: "unicode/1f9d1-1f91d-1f9d1.png?v8",
            people_hugging: "unicode/1fac2.png?v8",
            performing_arts: "unicode/1f3ad.png?v8",
            persevere: "unicode/1f623.png?v8",
            person_bald: "unicode/1f9d1-1f9b2.png?v8",
            person_curly_hair: "unicode/1f9d1-1f9b1.png?v8",
            person_feeding_baby: "unicode/1f9d1-1f37c.png?v8",
            person_fencing: "unicode/1f93a.png?v8",
            person_in_manual_wheelchair: "unicode/1f9d1-1f9bd.png?v8",
            person_in_motorized_wheelchair: "unicode/1f9d1-1f9bc.png?v8",
            person_in_tuxedo: "unicode/1f935.png?v8",
            person_red_hair: "unicode/1f9d1-1f9b0.png?v8",
            person_white_hair: "unicode/1f9d1-1f9b3.png?v8",
            person_with_crown: "unicode/1fac5.png?v8",
            person_with_probing_cane: "unicode/1f9d1-1f9af.png?v8",
            person_with_turban: "unicode/1f473.png?v8",
            person_with_veil: "unicode/1f470.png?v8",
            peru: "unicode/1f1f5-1f1ea.png?v8",
            petri_dish: "unicode/1f9eb.png?v8",
            philippines: "unicode/1f1f5-1f1ed.png?v8",
            phone: "unicode/260e.png?v8",
            pick: "unicode/26cf.png?v8",
            pickup_truck: "unicode/1f6fb.png?v8",
            pie: "unicode/1f967.png?v8",
            pig: "unicode/1f437.png?v8",
            pig2: "unicode/1f416.png?v8",
            pig_nose: "unicode/1f43d.png?v8",
            pill: "unicode/1f48a.png?v8",
            pilot: "unicode/1f9d1-2708.png?v8",
            pinata: "unicode/1fa85.png?v8",
            pinched_fingers: "unicode/1f90c.png?v8",
            pinching_hand: "unicode/1f90f.png?v8",
            pineapple: "unicode/1f34d.png?v8",
            ping_pong: "unicode/1f3d3.png?v8",
            pink_heart: "unicode/1fa77.png?v8",
            pirate_flag: "unicode/1f3f4-2620.png?v8",
            pisces: "unicode/2653.png?v8",
            pitcairn_islands: "unicode/1f1f5-1f1f3.png?v8",
            pizza: "unicode/1f355.png?v8",
            placard: "unicode/1faa7.png?v8",
            place_of_worship: "unicode/1f6d0.png?v8",
            plate_with_cutlery: "unicode/1f37d.png?v8",
            play_or_pause_button: "unicode/23ef.png?v8",
            playground_slide: "unicode/1f6dd.png?v8",
            pleading_face: "unicode/1f97a.png?v8",
            plunger: "unicode/1faa0.png?v8",
            point_down: "unicode/1f447.png?v8",
            point_left: "unicode/1f448.png?v8",
            point_right: "unicode/1f449.png?v8",
            point_up: "unicode/261d.png?v8",
            point_up_2: "unicode/1f446.png?v8",
            poland: "unicode/1f1f5-1f1f1.png?v8",
            polar_bear: "unicode/1f43b-2744.png?v8",
            police_car: "unicode/1f693.png?v8",
            police_officer: "unicode/1f46e.png?v8",
            policeman: "unicode/1f46e-2642.png?v8",
            policewoman: "unicode/1f46e-2640.png?v8",
            poodle: "unicode/1f429.png?v8",
            poop: "unicode/1f4a9.png?v8",
            popcorn: "unicode/1f37f.png?v8",
            portugal: "unicode/1f1f5-1f1f9.png?v8",
            post_office: "unicode/1f3e3.png?v8",
            postal_horn: "unicode/1f4ef.png?v8",
            postbox: "unicode/1f4ee.png?v8",
            potable_water: "unicode/1f6b0.png?v8",
            potato: "unicode/1f954.png?v8",
            potted_plant: "unicode/1fab4.png?v8",
            pouch: "unicode/1f45d.png?v8",
            poultry_leg: "unicode/1f357.png?v8",
            pound: "unicode/1f4b7.png?v8",
            pouring_liquid: "unicode/1fad7.png?v8",
            pout: "unicode/1f621.png?v8",
            pouting_cat: "unicode/1f63e.png?v8",
            pouting_face: "unicode/1f64e.png?v8",
            pouting_man: "unicode/1f64e-2642.png?v8",
            pouting_woman: "unicode/1f64e-2640.png?v8",
            pray: "unicode/1f64f.png?v8",
            prayer_beads: "unicode/1f4ff.png?v8",
            pregnant_man: "unicode/1fac3.png?v8",
            pregnant_person: "unicode/1fac4.png?v8",
            pregnant_woman: "unicode/1f930.png?v8",
            pretzel: "unicode/1f968.png?v8",
            previous_track_button: "unicode/23ee.png?v8",
            prince: "unicode/1f934.png?v8",
            princess: "unicode/1f478.png?v8",
            printer: "unicode/1f5a8.png?v8",
            probing_cane: "unicode/1f9af.png?v8",
            puerto_rico: "unicode/1f1f5-1f1f7.png?v8",
            punch: "unicode/1f44a.png?v8",
            purple_circle: "unicode/1f7e3.png?v8",
            purple_heart: "unicode/1f49c.png?v8",
            purple_square: "unicode/1f7ea.png?v8",
            purse: "unicode/1f45b.png?v8",
            pushpin: "unicode/1f4cc.png?v8",
            put_litter_in_its_place: "unicode/1f6ae.png?v8",
            qatar: "unicode/1f1f6-1f1e6.png?v8",
            question: "unicode/2753.png?v8",
            rabbit: "unicode/1f430.png?v8",
            rabbit2: "unicode/1f407.png?v8",
            raccoon: "unicode/1f99d.png?v8",
            racehorse: "unicode/1f40e.png?v8",
            racing_car: "unicode/1f3ce.png?v8",
            radio: "unicode/1f4fb.png?v8",
            radio_button: "unicode/1f518.png?v8",
            radioactive: "unicode/2622.png?v8",
            rage: "unicode/1f621.png?v8",
            rage1: "rage1.png?v8",
            rage2: "rage2.png?v8",
            rage3: "rage3.png?v8",
            rage4: "rage4.png?v8",
            railway_car: "unicode/1f683.png?v8",
            railway_track: "unicode/1f6e4.png?v8",
            rainbow: "unicode/1f308.png?v8",
            rainbow_flag: "unicode/1f3f3-1f308.png?v8",
            raised_back_of_hand: "unicode/1f91a.png?v8",
            raised_eyebrow: "unicode/1f928.png?v8",
            raised_hand: "unicode/270b.png?v8",
            raised_hand_with_fingers_splayed: "unicode/1f590.png?v8",
            raised_hands: "unicode/1f64c.png?v8",
            raising_hand: "unicode/1f64b.png?v8",
            raising_hand_man: "unicode/1f64b-2642.png?v8",
            raising_hand_woman: "unicode/1f64b-2640.png?v8",
            ram: "unicode/1f40f.png?v8",
            ramen: "unicode/1f35c.png?v8",
            rat: "unicode/1f400.png?v8",
            razor: "unicode/1fa92.png?v8",
            receipt: "unicode/1f9fe.png?v8",
            record_button: "unicode/23fa.png?v8",
            recycle: "unicode/267b.png?v8",
            red_car: "unicode/1f697.png?v8",
            red_circle: "unicode/1f534.png?v8",
            red_envelope: "unicode/1f9e7.png?v8",
            red_haired_man: "unicode/1f468-1f9b0.png?v8",
            red_haired_woman: "unicode/1f469-1f9b0.png?v8",
            red_square: "unicode/1f7e5.png?v8",
            registered: "unicode/00ae.png?v8",
            relaxed: "unicode/263a.png?v8",
            relieved: "unicode/1f60c.png?v8",
            reminder_ribbon: "unicode/1f397.png?v8",
            repeat: "unicode/1f501.png?v8",
            repeat_one: "unicode/1f502.png?v8",
            rescue_worker_helmet: "unicode/26d1.png?v8",
            restroom: "unicode/1f6bb.png?v8",
            reunion: "unicode/1f1f7-1f1ea.png?v8",
            revolving_hearts: "unicode/1f49e.png?v8",
            rewind: "unicode/23ea.png?v8",
            rhinoceros: "unicode/1f98f.png?v8",
            ribbon: "unicode/1f380.png?v8",
            rice: "unicode/1f35a.png?v8",
            rice_ball: "unicode/1f359.png?v8",
            rice_cracker: "unicode/1f358.png?v8",
            rice_scene: "unicode/1f391.png?v8",
            right_anger_bubble: "unicode/1f5ef.png?v8",
            rightwards_hand: "unicode/1faf1.png?v8",
            rightwards_pushing_hand: "unicode/1faf8.png?v8",
            ring: "unicode/1f48d.png?v8",
            ring_buoy: "unicode/1f6df.png?v8",
            ringed_planet: "unicode/1fa90.png?v8",
            robot: "unicode/1f916.png?v8",
            rock: "unicode/1faa8.png?v8",
            rocket: "unicode/1f680.png?v8",
            rofl: "unicode/1f923.png?v8",
            roll_eyes: "unicode/1f644.png?v8",
            roll_of_paper: "unicode/1f9fb.png?v8",
            roller_coaster: "unicode/1f3a2.png?v8",
            roller_skate: "unicode/1f6fc.png?v8",
            romania: "unicode/1f1f7-1f1f4.png?v8",
            rooster: "unicode/1f413.png?v8",
            rose: "unicode/1f339.png?v8",
            rosette: "unicode/1f3f5.png?v8",
            rotating_light: "unicode/1f6a8.png?v8",
            round_pushpin: "unicode/1f4cd.png?v8",
            rowboat: "unicode/1f6a3.png?v8",
            rowing_man: "unicode/1f6a3-2642.png?v8",
            rowing_woman: "unicode/1f6a3-2640.png?v8",
            ru: "unicode/1f1f7-1f1fa.png?v8",
            rugby_football: "unicode/1f3c9.png?v8",
            runner: "unicode/1f3c3.png?v8",
            running: "unicode/1f3c3.png?v8",
            running_man: "unicode/1f3c3-2642.png?v8",
            running_shirt_with_sash: "unicode/1f3bd.png?v8",
            running_woman: "unicode/1f3c3-2640.png?v8",
            rwanda: "unicode/1f1f7-1f1fc.png?v8",
            sa: "unicode/1f202.png?v8",
            safety_pin: "unicode/1f9f7.png?v8",
            safety_vest: "unicode/1f9ba.png?v8",
            sagittarius: "unicode/2650.png?v8",
            sailboat: "unicode/26f5.png?v8",
            sake: "unicode/1f376.png?v8",
            salt: "unicode/1f9c2.png?v8",
            saluting_face: "unicode/1fae1.png?v8",
            samoa: "unicode/1f1fc-1f1f8.png?v8",
            san_marino: "unicode/1f1f8-1f1f2.png?v8",
            sandal: "unicode/1f461.png?v8",
            sandwich: "unicode/1f96a.png?v8",
            santa: "unicode/1f385.png?v8",
            sao_tome_principe: "unicode/1f1f8-1f1f9.png?v8",
            sari: "unicode/1f97b.png?v8",
            sassy_man: "unicode/1f481-2642.png?v8",
            sassy_woman: "unicode/1f481-2640.png?v8",
            satellite: "unicode/1f4e1.png?v8",
            satisfied: "unicode/1f606.png?v8",
            saudi_arabia: "unicode/1f1f8-1f1e6.png?v8",
            sauna_man: "unicode/1f9d6-2642.png?v8",
            sauna_person: "unicode/1f9d6.png?v8",
            sauna_woman: "unicode/1f9d6-2640.png?v8",
            sauropod: "unicode/1f995.png?v8",
            saxophone: "unicode/1f3b7.png?v8",
            scarf: "unicode/1f9e3.png?v8",
            school: "unicode/1f3eb.png?v8",
            school_satchel: "unicode/1f392.png?v8",
            scientist: "unicode/1f9d1-1f52c.png?v8",
            scissors: "unicode/2702.png?v8",
            scorpion: "unicode/1f982.png?v8",
            scorpius: "unicode/264f.png?v8",
            scotland: "unicode/1f3f4-e0067-e0062-e0073-e0063-e0074-e007f.png?v8",
            scream: "unicode/1f631.png?v8",
            scream_cat: "unicode/1f640.png?v8",
            screwdriver: "unicode/1fa9b.png?v8",
            scroll: "unicode/1f4dc.png?v8",
            seal: "unicode/1f9ad.png?v8",
            seat: "unicode/1f4ba.png?v8",
            secret: "unicode/3299.png?v8",
            see_no_evil: "unicode/1f648.png?v8",
            seedling: "unicode/1f331.png?v8",
            selfie: "unicode/1f933.png?v8",
            senegal: "unicode/1f1f8-1f1f3.png?v8",
            serbia: "unicode/1f1f7-1f1f8.png?v8",
            service_dog: "unicode/1f415-1f9ba.png?v8",
            seven: "unicode/0037-20e3.png?v8",
            sewing_needle: "unicode/1faa1.png?v8",
            seychelles: "unicode/1f1f8-1f1e8.png?v8",
            shaking_face: "unicode/1fae8.png?v8",
            shallow_pan_of_food: "unicode/1f958.png?v8",
            shamrock: "unicode/2618.png?v8",
            shark: "unicode/1f988.png?v8",
            shaved_ice: "unicode/1f367.png?v8",
            sheep: "unicode/1f411.png?v8",
            shell: "unicode/1f41a.png?v8",
            shield: "unicode/1f6e1.png?v8",
            shinto_shrine: "unicode/26e9.png?v8",
            ship: "unicode/1f6a2.png?v8",
            shipit: "shipit.png?v8",
            shirt: "unicode/1f455.png?v8",
            shit: "unicode/1f4a9.png?v8",
            shoe: "unicode/1f45e.png?v8",
            shopping: "unicode/1f6cd.png?v8",
            shopping_cart: "unicode/1f6d2.png?v8",
            shorts: "unicode/1fa73.png?v8",
            shower: "unicode/1f6bf.png?v8",
            shrimp: "unicode/1f990.png?v8",
            shrug: "unicode/1f937.png?v8",
            shushing_face: "unicode/1f92b.png?v8",
            sierra_leone: "unicode/1f1f8-1f1f1.png?v8",
            signal_strength: "unicode/1f4f6.png?v8",
            singapore: "unicode/1f1f8-1f1ec.png?v8",
            singer: "unicode/1f9d1-1f3a4.png?v8",
            sint_maarten: "unicode/1f1f8-1f1fd.png?v8",
            six: "unicode/0036-20e3.png?v8",
            six_pointed_star: "unicode/1f52f.png?v8",
            skateboard: "unicode/1f6f9.png?v8",
            ski: "unicode/1f3bf.png?v8",
            skier: "unicode/26f7.png?v8",
            skull: "unicode/1f480.png?v8",
            skull_and_crossbones: "unicode/2620.png?v8",
            skunk: "unicode/1f9a8.png?v8",
            sled: "unicode/1f6f7.png?v8",
            sleeping: "unicode/1f634.png?v8",
            sleeping_bed: "unicode/1f6cc.png?v8",
            sleepy: "unicode/1f62a.png?v8",
            slightly_frowning_face: "unicode/1f641.png?v8",
            slightly_smiling_face: "unicode/1f642.png?v8",
            slot_machine: "unicode/1f3b0.png?v8",
            sloth: "unicode/1f9a5.png?v8",
            slovakia: "unicode/1f1f8-1f1f0.png?v8",
            slovenia: "unicode/1f1f8-1f1ee.png?v8",
            small_airplane: "unicode/1f6e9.png?v8",
            small_blue_diamond: "unicode/1f539.png?v8",
            small_orange_diamond: "unicode/1f538.png?v8",
            small_red_triangle: "unicode/1f53a.png?v8",
            small_red_triangle_down: "unicode/1f53b.png?v8",
            smile: "unicode/1f604.png?v8",
            smile_cat: "unicode/1f638.png?v8",
            smiley: "unicode/1f603.png?v8",
            smiley_cat: "unicode/1f63a.png?v8",
            smiling_face_with_tear: "unicode/1f972.png?v8",
            smiling_face_with_three_hearts: "unicode/1f970.png?v8",
            smiling_imp: "unicode/1f608.png?v8",
            smirk: "unicode/1f60f.png?v8",
            smirk_cat: "unicode/1f63c.png?v8",
            smoking: "unicode/1f6ac.png?v8",
            snail: "unicode/1f40c.png?v8",
            snake: "unicode/1f40d.png?v8",
            sneezing_face: "unicode/1f927.png?v8",
            snowboarder: "unicode/1f3c2.png?v8",
            snowflake: "unicode/2744.png?v8",
            snowman: "unicode/26c4.png?v8",
            snowman_with_snow: "unicode/2603.png?v8",
            soap: "unicode/1f9fc.png?v8",
            sob: "unicode/1f62d.png?v8",
            soccer: "unicode/26bd.png?v8",
            socks: "unicode/1f9e6.png?v8",
            softball: "unicode/1f94e.png?v8",
            solomon_islands: "unicode/1f1f8-1f1e7.png?v8",
            somalia: "unicode/1f1f8-1f1f4.png?v8",
            soon: "unicode/1f51c.png?v8",
            sos: "unicode/1f198.png?v8",
            sound: "unicode/1f509.png?v8",
            south_africa: "unicode/1f1ff-1f1e6.png?v8",
            south_georgia_south_sandwich_islands: "unicode/1f1ec-1f1f8.png?v8",
            south_sudan: "unicode/1f1f8-1f1f8.png?v8",
            space_invader: "unicode/1f47e.png?v8",
            spades: "unicode/2660.png?v8",
            spaghetti: "unicode/1f35d.png?v8",
            sparkle: "unicode/2747.png?v8",
            sparkler: "unicode/1f387.png?v8",
            sparkles: "unicode/2728.png?v8",
            sparkling_heart: "unicode/1f496.png?v8",
            speak_no_evil: "unicode/1f64a.png?v8",
            speaker: "unicode/1f508.png?v8",
            speaking_head: "unicode/1f5e3.png?v8",
            speech_balloon: "unicode/1f4ac.png?v8",
            speedboat: "unicode/1f6a4.png?v8",
            spider: "unicode/1f577.png?v8",
            spider_web: "unicode/1f578.png?v8",
            spiral_calendar: "unicode/1f5d3.png?v8",
            spiral_notepad: "unicode/1f5d2.png?v8",
            sponge: "unicode/1f9fd.png?v8",
            spoon: "unicode/1f944.png?v8",
            squid: "unicode/1f991.png?v8",
            sri_lanka: "unicode/1f1f1-1f1f0.png?v8",
            st_barthelemy: "unicode/1f1e7-1f1f1.png?v8",
            st_helena: "unicode/1f1f8-1f1ed.png?v8",
            st_kitts_nevis: "unicode/1f1f0-1f1f3.png?v8",
            st_lucia: "unicode/1f1f1-1f1e8.png?v8",
            st_martin: "unicode/1f1f2-1f1eb.png?v8",
            st_pierre_miquelon: "unicode/1f1f5-1f1f2.png?v8",
            st_vincent_grenadines: "unicode/1f1fb-1f1e8.png?v8",
            stadium: "unicode/1f3df.png?v8",
            standing_man: "unicode/1f9cd-2642.png?v8",
            standing_person: "unicode/1f9cd.png?v8",
            standing_woman: "unicode/1f9cd-2640.png?v8",
            star: "unicode/2b50.png?v8",
            star2: "unicode/1f31f.png?v8",
            star_and_crescent: "unicode/262a.png?v8",
            star_of_david: "unicode/2721.png?v8",
            star_struck: "unicode/1f929.png?v8",
            stars: "unicode/1f320.png?v8",
            station: "unicode/1f689.png?v8",
            statue_of_liberty: "unicode/1f5fd.png?v8",
            steam_locomotive: "unicode/1f682.png?v8",
            stethoscope: "unicode/1fa7a.png?v8",
            stew: "unicode/1f372.png?v8",
            stop_button: "unicode/23f9.png?v8",
            stop_sign: "unicode/1f6d1.png?v8",
            stopwatch: "unicode/23f1.png?v8",
            straight_ruler: "unicode/1f4cf.png?v8",
            strawberry: "unicode/1f353.png?v8",
            stuck_out_tongue: "unicode/1f61b.png?v8",
            stuck_out_tongue_closed_eyes: "unicode/1f61d.png?v8",
            stuck_out_tongue_winking_eye: "unicode/1f61c.png?v8",
            student: "unicode/1f9d1-1f393.png?v8",
            studio_microphone: "unicode/1f399.png?v8",
            stuffed_flatbread: "unicode/1f959.png?v8",
            sudan: "unicode/1f1f8-1f1e9.png?v8",
            sun_behind_large_cloud: "unicode/1f325.png?v8",
            sun_behind_rain_cloud: "unicode/1f326.png?v8",
            sun_behind_small_cloud: "unicode/1f324.png?v8",
            sun_with_face: "unicode/1f31e.png?v8",
            sunflower: "unicode/1f33b.png?v8",
            sunglasses: "unicode/1f60e.png?v8",
            sunny: "unicode/2600.png?v8",
            sunrise: "unicode/1f305.png?v8",
            sunrise_over_mountains: "unicode/1f304.png?v8",
            superhero: "unicode/1f9b8.png?v8",
            superhero_man: "unicode/1f9b8-2642.png?v8",
            superhero_woman: "unicode/1f9b8-2640.png?v8",
            supervillain: "unicode/1f9b9.png?v8",
            supervillain_man: "unicode/1f9b9-2642.png?v8",
            supervillain_woman: "unicode/1f9b9-2640.png?v8",
            surfer: "unicode/1f3c4.png?v8",
            surfing_man: "unicode/1f3c4-2642.png?v8",
            surfing_woman: "unicode/1f3c4-2640.png?v8",
            suriname: "unicode/1f1f8-1f1f7.png?v8",
            sushi: "unicode/1f363.png?v8",
            suspect: "suspect.png?v8",
            suspension_railway: "unicode/1f69f.png?v8",
            svalbard_jan_mayen: "unicode/1f1f8-1f1ef.png?v8",
            swan: "unicode/1f9a2.png?v8",
            swaziland: "unicode/1f1f8-1f1ff.png?v8",
            sweat: "unicode/1f613.png?v8",
            sweat_drops: "unicode/1f4a6.png?v8",
            sweat_smile: "unicode/1f605.png?v8",
            sweden: "unicode/1f1f8-1f1ea.png?v8",
            sweet_potato: "unicode/1f360.png?v8",
            swim_brief: "unicode/1fa72.png?v8",
            swimmer: "unicode/1f3ca.png?v8",
            swimming_man: "unicode/1f3ca-2642.png?v8",
            swimming_woman: "unicode/1f3ca-2640.png?v8",
            switzerland: "unicode/1f1e8-1f1ed.png?v8",
            symbols: "unicode/1f523.png?v8",
            synagogue: "unicode/1f54d.png?v8",
            syria: "unicode/1f1f8-1f1fe.png?v8",
            syringe: "unicode/1f489.png?v8",
            "t-rex": "unicode/1f996.png?v8",
            taco: "unicode/1f32e.png?v8",
            tada: "unicode/1f389.png?v8",
            taiwan: "unicode/1f1f9-1f1fc.png?v8",
            tajikistan: "unicode/1f1f9-1f1ef.png?v8",
            takeout_box: "unicode/1f961.png?v8",
            tamale: "unicode/1fad4.png?v8",
            tanabata_tree: "unicode/1f38b.png?v8",
            tangerine: "unicode/1f34a.png?v8",
            tanzania: "unicode/1f1f9-1f1ff.png?v8",
            taurus: "unicode/2649.png?v8",
            taxi: "unicode/1f695.png?v8",
            tea: "unicode/1f375.png?v8",
            teacher: "unicode/1f9d1-1f3eb.png?v8",
            teapot: "unicode/1fad6.png?v8",
            technologist: "unicode/1f9d1-1f4bb.png?v8",
            teddy_bear: "unicode/1f9f8.png?v8",
            telephone: "unicode/260e.png?v8",
            telephone_receiver: "unicode/1f4de.png?v8",
            telescope: "unicode/1f52d.png?v8",
            tennis: "unicode/1f3be.png?v8",
            tent: "unicode/26fa.png?v8",
            test_tube: "unicode/1f9ea.png?v8",
            thailand: "unicode/1f1f9-1f1ed.png?v8",
            thermometer: "unicode/1f321.png?v8",
            thinking: "unicode/1f914.png?v8",
            thong_sandal: "unicode/1fa74.png?v8",
            thought_balloon: "unicode/1f4ad.png?v8",
            thread: "unicode/1f9f5.png?v8",
            three: "unicode/0033-20e3.png?v8",
            thumbsdown: "unicode/1f44e.png?v8",
            thumbsup: "unicode/1f44d.png?v8",
            ticket: "unicode/1f3ab.png?v8",
            tickets: "unicode/1f39f.png?v8",
            tiger: "unicode/1f42f.png?v8",
            tiger2: "unicode/1f405.png?v8",
            timer_clock: "unicode/23f2.png?v8",
            timor_leste: "unicode/1f1f9-1f1f1.png?v8",
            tipping_hand_man: "unicode/1f481-2642.png?v8",
            tipping_hand_person: "unicode/1f481.png?v8",
            tipping_hand_woman: "unicode/1f481-2640.png?v8",
            tired_face: "unicode/1f62b.png?v8",
            tm: "unicode/2122.png?v8",
            togo: "unicode/1f1f9-1f1ec.png?v8",
            toilet: "unicode/1f6bd.png?v8",
            tokelau: "unicode/1f1f9-1f1f0.png?v8",
            tokyo_tower: "unicode/1f5fc.png?v8",
            tomato: "unicode/1f345.png?v8",
            tonga: "unicode/1f1f9-1f1f4.png?v8",
            tongue: "unicode/1f445.png?v8",
            toolbox: "unicode/1f9f0.png?v8",
            tooth: "unicode/1f9b7.png?v8",
            toothbrush: "unicode/1faa5.png?v8",
            top: "unicode/1f51d.png?v8",
            tophat: "unicode/1f3a9.png?v8",
            tornado: "unicode/1f32a.png?v8",
            tr: "unicode/1f1f9-1f1f7.png?v8",
            trackball: "unicode/1f5b2.png?v8",
            tractor: "unicode/1f69c.png?v8",
            traffic_light: "unicode/1f6a5.png?v8",
            train: "unicode/1f68b.png?v8",
            train2: "unicode/1f686.png?v8",
            tram: "unicode/1f68a.png?v8",
            transgender_flag: "unicode/1f3f3-26a7.png?v8",
            transgender_symbol: "unicode/26a7.png?v8",
            triangular_flag_on_post: "unicode/1f6a9.png?v8",
            triangular_ruler: "unicode/1f4d0.png?v8",
            trident: "unicode/1f531.png?v8",
            trinidad_tobago: "unicode/1f1f9-1f1f9.png?v8",
            tristan_da_cunha: "unicode/1f1f9-1f1e6.png?v8",
            triumph: "unicode/1f624.png?v8",
            troll: "unicode/1f9cc.png?v8",
            trolleybus: "unicode/1f68e.png?v8",
            trollface: "trollface.png?v8",
            trophy: "unicode/1f3c6.png?v8",
            tropical_drink: "unicode/1f379.png?v8",
            tropical_fish: "unicode/1f420.png?v8",
            truck: "unicode/1f69a.png?v8",
            trumpet: "unicode/1f3ba.png?v8",
            tshirt: "unicode/1f455.png?v8",
            tulip: "unicode/1f337.png?v8",
            tumbler_glass: "unicode/1f943.png?v8",
            tunisia: "unicode/1f1f9-1f1f3.png?v8",
            turkey: "unicode/1f983.png?v8",
            turkmenistan: "unicode/1f1f9-1f1f2.png?v8",
            turks_caicos_islands: "unicode/1f1f9-1f1e8.png?v8",
            turtle: "unicode/1f422.png?v8",
            tuvalu: "unicode/1f1f9-1f1fb.png?v8",
            tv: "unicode/1f4fa.png?v8",
            twisted_rightwards_arrows: "unicode/1f500.png?v8",
            two: "unicode/0032-20e3.png?v8",
            two_hearts: "unicode/1f495.png?v8",
            two_men_holding_hands: "unicode/1f46c.png?v8",
            two_women_holding_hands: "unicode/1f46d.png?v8",
            u5272: "unicode/1f239.png?v8",
            u5408: "unicode/1f234.png?v8",
            u55b6: "unicode/1f23a.png?v8",
            u6307: "unicode/1f22f.png?v8",
            u6708: "unicode/1f237.png?v8",
            u6709: "unicode/1f236.png?v8",
            u6e80: "unicode/1f235.png?v8",
            u7121: "unicode/1f21a.png?v8",
            u7533: "unicode/1f238.png?v8",
            u7981: "unicode/1f232.png?v8",
            u7a7a: "unicode/1f233.png?v8",
            uganda: "unicode/1f1fa-1f1ec.png?v8",
            uk: "unicode/1f1ec-1f1e7.png?v8",
            ukraine: "unicode/1f1fa-1f1e6.png?v8",
            umbrella: "unicode/2614.png?v8",
            unamused: "unicode/1f612.png?v8",
            underage: "unicode/1f51e.png?v8",
            unicorn: "unicode/1f984.png?v8",
            united_arab_emirates: "unicode/1f1e6-1f1ea.png?v8",
            united_nations: "unicode/1f1fa-1f1f3.png?v8",
            unlock: "unicode/1f513.png?v8",
            up: "unicode/1f199.png?v8",
            upside_down_face: "unicode/1f643.png?v8",
            uruguay: "unicode/1f1fa-1f1fe.png?v8",
            us: "unicode/1f1fa-1f1f8.png?v8",
            us_outlying_islands: "unicode/1f1fa-1f1f2.png?v8",
            us_virgin_islands: "unicode/1f1fb-1f1ee.png?v8",
            uzbekistan: "unicode/1f1fa-1f1ff.png?v8",
            v: "unicode/270c.png?v8",
            vampire: "unicode/1f9db.png?v8",
            vampire_man: "unicode/1f9db-2642.png?v8",
            vampire_woman: "unicode/1f9db-2640.png?v8",
            vanuatu: "unicode/1f1fb-1f1fa.png?v8",
            vatican_city: "unicode/1f1fb-1f1e6.png?v8",
            venezuela: "unicode/1f1fb-1f1ea.png?v8",
            vertical_traffic_light: "unicode/1f6a6.png?v8",
            vhs: "unicode/1f4fc.png?v8",
            vibration_mode: "unicode/1f4f3.png?v8",
            video_camera: "unicode/1f4f9.png?v8",
            video_game: "unicode/1f3ae.png?v8",
            vietnam: "unicode/1f1fb-1f1f3.png?v8",
            violin: "unicode/1f3bb.png?v8",
            virgo: "unicode/264d.png?v8",
            volcano: "unicode/1f30b.png?v8",
            volleyball: "unicode/1f3d0.png?v8",
            vomiting_face: "unicode/1f92e.png?v8",
            vs: "unicode/1f19a.png?v8",
            vulcan_salute: "unicode/1f596.png?v8",
            waffle: "unicode/1f9c7.png?v8",
            wales: "unicode/1f3f4-e0067-e0062-e0077-e006c-e0073-e007f.png?v8",
            walking: "unicode/1f6b6.png?v8",
            walking_man: "unicode/1f6b6-2642.png?v8",
            walking_woman: "unicode/1f6b6-2640.png?v8",
            wallis_futuna: "unicode/1f1fc-1f1eb.png?v8",
            waning_crescent_moon: "unicode/1f318.png?v8",
            waning_gibbous_moon: "unicode/1f316.png?v8",
            warning: "unicode/26a0.png?v8",
            wastebasket: "unicode/1f5d1.png?v8",
            watch: "unicode/231a.png?v8",
            water_buffalo: "unicode/1f403.png?v8",
            water_polo: "unicode/1f93d.png?v8",
            watermelon: "unicode/1f349.png?v8",
            wave: "unicode/1f44b.png?v8",
            wavy_dash: "unicode/3030.png?v8",
            waxing_crescent_moon: "unicode/1f312.png?v8",
            waxing_gibbous_moon: "unicode/1f314.png?v8",
            wc: "unicode/1f6be.png?v8",
            weary: "unicode/1f629.png?v8",
            wedding: "unicode/1f492.png?v8",
            weight_lifting: "unicode/1f3cb.png?v8",
            weight_lifting_man: "unicode/1f3cb-2642.png?v8",
            weight_lifting_woman: "unicode/1f3cb-2640.png?v8",
            western_sahara: "unicode/1f1ea-1f1ed.png?v8",
            whale: "unicode/1f433.png?v8",
            whale2: "unicode/1f40b.png?v8",
            wheel: "unicode/1f6de.png?v8",
            wheel_of_dharma: "unicode/2638.png?v8",
            wheelchair: "unicode/267f.png?v8",
            white_check_mark: "unicode/2705.png?v8",
            white_circle: "unicode/26aa.png?v8",
            white_flag: "unicode/1f3f3.png?v8",
            white_flower: "unicode/1f4ae.png?v8",
            white_haired_man: "unicode/1f468-1f9b3.png?v8",
            white_haired_woman: "unicode/1f469-1f9b3.png?v8",
            white_heart: "unicode/1f90d.png?v8",
            white_large_square: "unicode/2b1c.png?v8",
            white_medium_small_square: "unicode/25fd.png?v8",
            white_medium_square: "unicode/25fb.png?v8",
            white_small_square: "unicode/25ab.png?v8",
            white_square_button: "unicode/1f533.png?v8",
            wilted_flower: "unicode/1f940.png?v8",
            wind_chime: "unicode/1f390.png?v8",
            wind_face: "unicode/1f32c.png?v8",
            window: "unicode/1fa9f.png?v8",
            wine_glass: "unicode/1f377.png?v8",
            wing: "unicode/1fabd.png?v8",
            wink: "unicode/1f609.png?v8",
            wireless: "unicode/1f6dc.png?v8",
            wolf: "unicode/1f43a.png?v8",
            woman: "unicode/1f469.png?v8",
            woman_artist: "unicode/1f469-1f3a8.png?v8",
            woman_astronaut: "unicode/1f469-1f680.png?v8",
            woman_beard: "unicode/1f9d4-2640.png?v8",
            woman_cartwheeling: "unicode/1f938-2640.png?v8",
            woman_cook: "unicode/1f469-1f373.png?v8",
            woman_dancing: "unicode/1f483.png?v8",
            woman_facepalming: "unicode/1f926-2640.png?v8",
            woman_factory_worker: "unicode/1f469-1f3ed.png?v8",
            woman_farmer: "unicode/1f469-1f33e.png?v8",
            woman_feeding_baby: "unicode/1f469-1f37c.png?v8",
            woman_firefighter: "unicode/1f469-1f692.png?v8",
            woman_health_worker: "unicode/1f469-2695.png?v8",
            woman_in_manual_wheelchair: "unicode/1f469-1f9bd.png?v8",
            woman_in_motorized_wheelchair: "unicode/1f469-1f9bc.png?v8",
            woman_in_tuxedo: "unicode/1f935-2640.png?v8",
            woman_judge: "unicode/1f469-2696.png?v8",
            woman_juggling: "unicode/1f939-2640.png?v8",
            woman_mechanic: "unicode/1f469-1f527.png?v8",
            woman_office_worker: "unicode/1f469-1f4bc.png?v8",
            woman_pilot: "unicode/1f469-2708.png?v8",
            woman_playing_handball: "unicode/1f93e-2640.png?v8",
            woman_playing_water_polo: "unicode/1f93d-2640.png?v8",
            woman_scientist: "unicode/1f469-1f52c.png?v8",
            woman_shrugging: "unicode/1f937-2640.png?v8",
            woman_singer: "unicode/1f469-1f3a4.png?v8",
            woman_student: "unicode/1f469-1f393.png?v8",
            woman_teacher: "unicode/1f469-1f3eb.png?v8",
            woman_technologist: "unicode/1f469-1f4bb.png?v8",
            woman_with_headscarf: "unicode/1f9d5.png?v8",
            woman_with_probing_cane: "unicode/1f469-1f9af.png?v8",
            woman_with_turban: "unicode/1f473-2640.png?v8",
            woman_with_veil: "unicode/1f470-2640.png?v8",
            womans_clothes: "unicode/1f45a.png?v8",
            womans_hat: "unicode/1f452.png?v8",
            women_wrestling: "unicode/1f93c-2640.png?v8",
            womens: "unicode/1f6ba.png?v8",
            wood: "unicode/1fab5.png?v8",
            woozy_face: "unicode/1f974.png?v8",
            world_map: "unicode/1f5fa.png?v8",
            worm: "unicode/1fab1.png?v8",
            worried: "unicode/1f61f.png?v8",
            wrench: "unicode/1f527.png?v8",
            wrestling: "unicode/1f93c.png?v8",
            writing_hand: "unicode/270d.png?v8",
            x: "unicode/274c.png?v8",
            x_ray: "unicode/1fa7b.png?v8",
            yarn: "unicode/1f9f6.png?v8",
            yawning_face: "unicode/1f971.png?v8",
            yellow_circle: "unicode/1f7e1.png?v8",
            yellow_heart: "unicode/1f49b.png?v8",
            yellow_square: "unicode/1f7e8.png?v8",
            yemen: "unicode/1f1fe-1f1ea.png?v8",
            yen: "unicode/1f4b4.png?v8",
            yin_yang: "unicode/262f.png?v8",
            yo_yo: "unicode/1fa80.png?v8",
            yum: "unicode/1f60b.png?v8",
            zambia: "unicode/1f1ff-1f1f2.png?v8",
            zany_face: "unicode/1f92a.png?v8",
            zap: "unicode/26a1.png?v8",
            zebra: "unicode/1f993.png?v8",
            zero: "unicode/0030-20e3.png?v8",
            zimbabwe: "unicode/1f1ff-1f1fc.png?v8",
            zipper_mouth_face: "unicode/1f910.png?v8",
            zombie: "unicode/1f9df.png?v8",
            zombie_man: "unicode/1f9df-2642.png?v8",
            zombie_woman: "unicode/1f9df-2640.png?v8",
            zzz: "unicode/1f4a4.png?v8"
        },
        data_diva: {
            ac_t: "diva_icon/FT-BUTTON-SANKAKU.png",
            ac_s: "diva_icon/FT-BUTTON-SHIKAKU.png",
            ac_x: "diva_icon/FT-BUTTON-BATSU.png",
            ac_o: "diva_icon/FT-BUTTON-MARU.png",
            ac_l: "diva_icon/BUTTON-SLIDE20-L.png",
            ac_r: "diva_icon/BUTTON-SLIDE20-R.png",
            cs_u: "diva_icon/PS-BUTTON-UP.png",
            cs_l: "diva_icon/PS-BUTTON-LEFT.png",
            cs_d: "diva_icon/PS-BUTTON-DOWN.png",
            cs_r: "diva_icon/PS-BUTTON-RIGHT.png",
            cs_s: "diva_icon/N-BUTTON-TOUCH.png",
            cs_sw: "diva_icon/N-BUTTON-TOUCH-W.png"
        }
    };
    var divaData = {
        data: {
            ac_t: "data:image/png;base64,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",
            ac_s: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAKi0lEQVR4Aexce4wdVR3+Zm537+223RpriS27FJSmdk2IkTRtpQhqomA0CpJQUrtFQkI0xtCaFmiCLEYJhj9UEk0M9E1bjII2mEjRqDQgu0QUeRhbWmBL3y3tPsrudm/3Dt83e+fu7dK9vTuPe2aW2ZxvzpnHOb/f9/vmnJk5M3dtpH9GI5AKYDT8QCpAKoDhCBg2n/aAVADDETBsPu0BqQCGI2DYfNoDUgEMR8Cw+Q9nDzAc9HLzqQDl0TBQTgUwEPRyk6kA5dEwUE4FMBD0cpOpAOXRMFCOUoBp5LOcaEs4xEFcSCP8FJUA36OrrxObifsSDnEQF3EilXBTFAL8mC7+imgmJkoSF3ESt1A5hS2AHLzX89CyLCy9/ibcftOtWPGNZWiNM26kf9fdgtarb8aKa5fi9i8tx9LP3QDLsjw6ysVNHFUOBWEKIMfkoOtYyyfno+O3u7D94W145OcbsPEXj2FTnPFr+te2BZu+vx4bV23EIyvXYfvqjeh44Bm0XDzP5VRciKO4FleDZWEJsJBuyDFmQMsn5mHnuh1YsHAJcCIP7D0NdL4HdMYYBweA17uA548DLxDPHQX29GFBy+ex80e/Q8vsuS634kJcxbm46j8LS4C7PBfmzGpm8J9C0yV0+M0e4OgZON2DQPeZ+ON4P5x3iEP9KBB4jSdOxxE0zbycIjyBOTOaPJrKS5y14hdhCJCl8WsJ2LaNtXesQdNcBv+dXqD7LJyMA0wC85hDPmZtOFnLBXIWClkHzn72jJffRVNzC9Z+axVsyxZVQZzFXWXfKLXmuwUgx7pTCUiAxVcuAk5x2DldgKPWz7mG6aiYokC/zvJkKffXtuDUc8Mh8jnSg8XzF5QLIM7izor+k0Lkv/ZwTbnO8YVnuOOgr78PsOoAbaXvSMJfHR1Vb+3k2Z4bFRKb+woUZiiDvnw/2Cc8RuI85K34zUdZ89vMSD2HIoBugn6PbI15ifHFJDqs/HyuKkra7XIrHaCjqVhp3VdBTfuqOKEqqQcc4zDTz26bYaSrI1fPw3QnpJxFfykVQOexhp2TZ4FejiiZqgOp2F3No79OzCF8JTXiq+KEqaSA9/HM76IAEkKCVEeOlaAh6CIe/hXClwjxEYB0LJ6AtYB7g8CIuUljP4PvHOKziu543I1VL+g1eL+NKawhEWYxH1cyL4DOOAU+Nwn4CG+rhenMo4DaJizZok3dK6AhA2j8f4+xrH78Hx1kPuKjkRuvJNggl8V0ocysAAy+zningRe+2bx1vZQn0iXEnIigtmWDtmTTYsyR5+Iwz37/wfdizEYwgyuTiaqTUQEsCoCpNuzmKfhf5/9x28oVaL1zGVbc+e1I0Mq2ZUO2ZBMX1cHax6mSNzmUN4QSCq9fJUAABV9TvTMbcPjEQdyyshUbntyMLTu2YfOOrZFgC9uWDdmSTcxuAI7y4punM6HE3x3Uqg6+DgzHrFryA4vm6+qx+6038Mqe1/y04KuObO0+sBfoyQC6+E5hTg18NRawEiMQsIWg1fmYn6vPIpNhEIbb4imJp1n8A/GnkKC21KbaRsbOINfIoXp/P9DFUUN3QjRkIpkX4IOsFaT13Pww8ZuQoLbUptoGOOvpBl5n//hvPelSeCmOAvCWCLqf1uT7bFINA2pLbaptgL0OuvORHAbPfnJDHAWQX2NBAZTPfjHc7iAH/DO8/dQcEIvDG80sRcSM5fFbrWOVHJH1gXrWEZgxSUbd9xsOPj1JTA9Q8PS0+QKdfpZ4bpzYxePbCV5xuYxRSkIP4BwF9JSpIL7I2L1MvFQRwOj9e3i8xOO4w1KMUhIE0NDTy5jtJ4Ik9aIg9SOpmwQBNFLLz6ABVBuRBDFIo7F0agxCunSOsSu5m5MkQHKjXMHzVIAKwanFrlSAWkS5go1UgArBqcWuVIBaRLmCjVSACsGpxa5UgFpEuYKNEAWoYCXdNWYEUgHGDE1tdoQvgN4wTeFDq74y0MsOzblXgo4J34vaRC8EK+FTP8bXTK/yXevbZ4AhTuPog9dK0IsRVgmBSyKbCFcAxtv9ymzvAPBsN5w/d8F5Zgzs7AKePsWJY07zH6BYqjscQpUOs3iAOER4ZR7INf9JM6ofguloDUGNGbivevS1caWzX/vcHqCYlyKr+f/buPYD4g7CK/+U5bYAeIB19UaNWXxSuD3A46V46pWfxKg0/mtfNoOBoUEMFUovqyTAdWzqBuJrhMo3Ml9L3BcA97CuO6UtWwN59rpMNPRpp+pk1gN9nZAfxLymubii+dNVOx30QNmSTdC2+4VE0AYD1DcngAU4BQ7J+3owq+HjeHz1o/jOF5Zh+TU3o/WapZFAbcuGbMkmaNv1gb4EiGGgqmYF4BDkHMlj6KVTmD/jcqz/4TpsXrUBmyKC2pYN2ZJN2Xbog8nfs5kTQOcNzzz9DNTSB7IvngbaTwAdJwnlUYBtywZtyaZsBw2+aASBWQHkuTzgxbrQk4ezvw/OQaGfeRRg27QhW6BN905NPhiE6Bs0X2aaQ4GTs+D9Uj2ynDZAW2WWjRbjI4DRMJgzngpgLvau5VQANwzmFqELYFm8tREfPQ0rnwgocrGsIrcQOYUhgLwqtVOX4UyC/qdC0ekQfTXXlLiQk8ttxAvxFka2+CiVAuejrlelwAJn37hk6u7tAaaxWf3uapC7ArvIRk0l+S4O4kJOLrcRX0jSXZE8bsHPwmvET12vjqaJ3Q9nNcm17i+PAdMnA5+aDLueumjGkzogiaDvLgdyESdxE8cicT7VQVPc7PLFLT6yMATQGfCoZ3vr87/Hz7bcD1zWCHx2GuzGLOyCDdsh+OSTiKV8lc/0XRzERZzEzePJXJ+784UG6ln2ncIQQMZ/ycVBwk13b/8JHtr6IHDpR4GriEUzgEUfAxaGhKjbka/yWb6Tg7iIk0tueMFxFk+x2EAEimGgyjTuJU6u4yqulERYs/V+3Prgcvx999/w797/oP1UB9pPticD9FU+y3dxEBdy85KCrxdD3dygf2msEYBFf8n2V+28tTq59RwRNu16HF9s+yYW3/VlLLn7eiy556vJAH2Vz/JdHMjLS17w93EDu7V7ZWPRfwpTAHnhiaCfBGndxeBZTjnzjZcuYEmBfHadH1kcY5EXNyj4s1gOdOazvpvCFkCNSoQrWFhD/JfgPDME3THojinPbRqykgJ9HPAEfb6XELdKwc/wGN28MqsuRSGALCu4D7HwGcL7ofXFLF9GfJdoI1YTEinukK/b6KtOnpnMz3fma5tiqQ9sBB5WXVKl6o70f5TOfA/H2cw/CY2l2vYuy7qfjjMUUI33U+mrnmaYnZMUfP2QUM8DGnoHztl7gZVaCDDahb3cIIjUdJZ1KxdnZOmjhhUFmsUPJAV/Mre+QmjIZVZ9MiGArgF/pYuvEl7gcywnEZ7/4iJO4kYq1ScTAsg7dWU5/A+uaFjqYq7hKEmQz/JdHMRFnEhjfMmUAPJSDv+LhScJ/T+fPzJPEuSzfBcHcaH740/jEGD8jVdZo5/H6YKsu4wkQT7Ld7rvP8VBAP/eT4CaqQCGRUwFSAUwHAHD5tMekApgOAKGzac9IBXAcAQMm097QCqA4QhcwHzUu98HAAD//25fsJwAAAAGSURBVAMA2tSCKqcFnGAAAAAASUVORK5CYII=",
            ac_x: "data:image/png;base64,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",
            ac_o: "data:image/png;base64,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",
            ac_l: "data:image/png;base64,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",
            ac_r: "data:image/png;base64,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",
            cs_u: "data:image/png;base64,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",
            cs_l: "data:image/png;base64,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",
            cs_d: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAQAElEQVR4AexbC1xU1db/zwvkJTBAIIaIqCgi+bghat1Ks3daFpXen/nIrFtqmdyeXsPUSvPLvn52S+tWt7rlJ5lllvn1K7LShOsjIcBHCIKoiA7IQ97wrXXOnDNnhgEc5kV+w2+vs9dee+29115r77XX2WdQw/PnVg14DOBW9QMeA3gM4GYNuHl4zw7wGMDNGnDz8J4d4DGAmzXg5uE9O8BjADdrwM3D///cAW5WunJ4jwGU2nAD7jGAG5SuHNJjAKU23IB7DOAGpSuH9BhAqQ034G41QEpKij4qKiqV5p1N0OYGyObxWQ4a2y3JbQagScekp6fvLykpeYVmPpzAHWk4j89ysDzuEMAtBuDJ0qQzaMLRBD0hRbM8SUlJMa4WxuUGSJm/hFe+mfIn3jET//U/v2DdFwfxxtZspwOPw+PxuAqFR2dlZWUkpSxxqRFcaoCUB9L06etWmCn/oedex1/mpyEyJgFBfYcg0AXA4/B4PC6Pb2aE9BUZY1PS9AqaU1EXGgDY88OmOTQb2e3w5MdNugPq3pEorvXDsUovHKvQOR9oHB6Px+XxWQ6SS0rRh/cIckplp+YuNUBJQd790mwmktsZc93taPMNR2m1Dg0tKqnKJTmPx+Py+CwHyyMNbCgxySnRnJW71AA0CTnauWXaw/DpHYqyWh1a2lyrfJJDSDwuj89ysDwCUXzIcopF5z1dbQB5Jt69fNGi9gKvRJnoBoTHZznq4euG0eG+n6WoVCqAAeJfU30Djv2aj/zdBzqFg9/tQfb3e1BxuhwtzS04VVDSKb/UX96u/fjPVztRergQDRfq0dbG733i2CxHdQPJYyy6MnPbDlBOMuOjrVh13xN4/6k1+GTZuk5h8+q38emqt7F25tNYdus8vPlIWqf8Un8bX3gDX77+AdYvXIGVdz6KF6cuQPpL61FTUaUURcbDwxP9qOB0q7jdAEcys5Hx4RdorKun+bouNVyoQ84PWfjgubVoamjCMYP52GVl2bcQZRQBG4Iy5yS3G+Dovt/kmSUnx2LK5JGYfPuIDmH6tDGYdt8YREeHQKtVo3//UGrTMb/U1x1TRuLBuX/G6NHR8Pf3lsc8XVCM7F0H5bICCSZ8JEEygdOM4HYDnCsto/mJaemS2/H5Z/PxxZYFHcK/P5yHjz+ahyP5L2LL5vmCoT7/bEGH/FJfzLvhrZnYm7kUudnLceWVphfeHzJPiAK0f7J+mNFpRuAB2g/rQopKZXKzZgdjFzJ4eWkRER6IpqbmLjjbV/frF4KWlla5Iiiqr4xbQVhHbIQhVGcSlgqOSNy5I/pxSx+GiloygEmRFytEY2MzKisuyOzaPvLLuUyzQFhPbASbY1WLftoVueN2RFcS1BqTCBWklNLSCpywAiUlBrDilLKdOVOFmpp6GMgQra1iWMnlkhMGuQ/GK8+blM3ty8/WoLLSRFPrtKC4lKs6Ax1VmoSlgiOSwzu0VajIQf3lJg88+B7i4p/DECuQcMVSHCs8K/MycuRoGYKDfFFb00D6Ew3w1dfZGDzkWbkPxt9550dml6G8vBrVZDiJcOzbtag1lEpFl+ZuN0DsyHh6DxJda0NDM2prGwRlajQqAecyg5+fF8IvCzBTzu+/l6HyfB2iovTQGHfS0KGRqK9vktsyPjzhcrN2vMuamlpEmrcKTXWVICHgjj9nGUBPk5lKkGYBVDRPmVu/ExQuUS8jJX/5+UJs/Phh+PuZwsUBMWEIDPSR2MAup7DoLA4fOS3TGOkbGYSIiEBGBeCQc+DAywRcemRnl0go4KeCSq2BVmfq21h5O+USTCSczwDKHJucYYBUEvEAwWaC5y2AiopE1wFHsnJkQmLi5fgx42lMmDAUN980HOvXz4SXl0aoHzGiH9Rqk7jsw4uLDSgkt8RngMBEj+BgXwxSKJx3BwNVyemg0gBaFXS9/KDx6iXXG5HbKJfgHsJXEmwicKghTDOinh2QXqA+XiHoR9Blqq2+QPcydQIfK27rloWIi4sQyvyYTi9cq19OEbzD+HEDmSQDH9Rnz1ajqqoO+XknZTobadxYE2/ymAFkRDpkjRzs5nJzTfzwUUHbyx8aXTsDGFuYZTdRKYMghsAhyZEG4JX/d6VUE6bMwPVTZ2OSBdyYMhe9fP3hE+CPgJAgoUkFRUCLFm8U/LdAMD4eWzgJzzx9K0aONLfpb7+VUlTUIsTzB34tNnKL2TXXxAlG49ItNydyJgNHRey6ZEKAGhrfYHj59cbQSXMxZOJsM4i7bib00WZ9RFNbNoKecruTowzAwiyQpImJS8SrmzIx47HlmJO6CnP+ttoMZi9eBf/gCBjqNLgqhReV2HLL5/vx7HObBf8uUsTn8mV3YvAg085g6s+7jnImQMYPh4RceoweFY2wsN4IoghpwnVDJbKQ799fJBzQQoEOYNBhX66KQptvBJJnrMLY+1ebQfKMl3EDLYzxc9YKTYwPNsIcI25X5igDXEtSyEt0wfK3Ed5vMJp9L8fp5lCcsoCTTXoUVfugiq6Ax945ycwIr73+LTa8vZO6MyW1WkX+XwXpjyOYzKxjUhG8A6qrTZd5YWEBGD8uFjdMGga93g/Kv6++zjEVg8TpnyYDbDvqgx0leuw4EWoGP5eHo8pnAPonTQHvBlNjyF/3FDSbUVECm5u1ayDvUXY7waHhuIAAnKrRoKZRBQrT2wFFnHInE+6/AxEDooQynct4InUjMixWtVBpfBw/fg75+SY/zodxnqKsUqlw7z1JePCBPxtbiBkbaefOw2KBn+R+oNJSJNSHFgNwsqo9FBhU+LnECy29wjDspoeh+BuuwLuNOsoAsgAqNflUrQ71Nnzj1XrpcP+Li6CPFMPFuromzJj5NoqLz8n9KhE2DvNINL7X2b49RyoChN01dbQQTREqpz2ZBTgu9amjHeVH0+8VDPiEyDzWkAZ6Zahv1UCt0Vmrtoumtqu1qXGlhBbk7kfl2TKE6mrQ21t8O5XqOsv9gwMx6+XFCNCLMXxpaSXun/VPumpoaNesuYU0YkHduu1XcIQjkbVaDdRqUrJEoHyD8o04WE0USgG087Sm9w2imCUtsV3VrxkBLWdxKu8nZd15ZaG7OHXf3aZm7X6WSkVHcrD22dmoOncKId6N0Kgu3ghB4aFIuCZJ6gr5+aWorqoA2urMYO7sK+kbgLkHyM4+gZwcOhcseKW2hcdKsX17ttw3jP4fYQkmmhUsOqgVfb2rULR3G3a9u0jJIc9ZSbQVV9vaoAP+vURfTiCkwkMHse/Hb9B64Qz6BjTDYiEKPNYe/Hkw9yfuSqydPTUXfRrHAceHmYHuZCJeT12P8NBGkZGeLS2teH8dBWIWvFLbdS/PoujHyM/Rjw9NXUMrP3gQtbaeogLbkBxRgzpDCXK/eUvJdJwKNBg97UwkhZ09mJovJfQrAiFteOlxZGZsg1dLFbmii7sy3r5+I6rO0oqnHli5C2d2+KEE/SIbsOIJWvEw7bCPvghHxXkttTZPRwp98G56pIkYqhHxQHqf6sD/e2vbMDysEa3Vp/D967NgOK7YPQDPVU+djDYCh6VehNucHGkAHpxXBa8OxvH1J2/h7OkShHnVkBFMihIqLR6/frsbORmZMnXJI0WIvMy4YmWqOTJr6mmMG0Whi5E8+67T6O3f/gNNfYMarcrhy1uARiL0vcrY0jyT/H4IzqD4wDc4V3RQycCLrBcRJOVzzmH4eKKZx7xE6Co52gCFNODdBEIqOpKNtc/MQlfnQVkR+Wda/UIjelw/3oCHppvCTCKhulaD7MPt55cwuJaq2/DgvSex6qkCuhWlokVKHFKLN184DJ3OuBNZ+QVkqJb2/XHTaKXf/+fjTJKAQ62tUkGRky9DLJVt/mrmaAOQDGAnftHnwb7tP+Ld1FWoq2ZFAtGR9Xhv1SHoyAVwZxJ8uj0M0x4fhgv1osg1F9R44JkheH9zBJ5fWIQ3lh2Bl45WtdTAIp8++QzWPX+UeCQjUP7JamDnJjPOTvz+OWLcSNBRYsFiUlNTfTtisEbnRtbo9tLYR/JWFfrp6Dw4VVCML177l6z8MH0jtryVg8sjzEPPcoMOS1+LQd5RP3zwWQTOnNNh8rxEZB7sjS835CBtYVE7gwkDWzzm3XcS/16bh5CgJlPNf3YAh7KEchd+fz0xmX8RIoJF0tFloE06tYnZYrCuiguI4TiBkKydB4d28621UI0BUXXY8f5BjIyvEQnGJ78ZL1oxECdOs9sFXnorGlMeGo4brzYgc/Ne3EC5kVXO2OcvWDYIRSfENnIFIXffVI7d6ftw63UKXRblQkua4Hi/E78vz4W6sZZoS+G0r6+v+eqxxqmg0bCKkmPRQuqu0/OgstxALGKaPrkMVwwxVz7XbNgYiY+/DGdUgOKTvXAgLwDRfesRGECHqUA1PWrorJjz1BCs+/By3LtwmNWoaFD/OowdUWVqVFeDaNv9vqm9iJVQlpWWltZ55EBMyqRWFuzDrbbeGxU7tMPzIDYxTm608h/RWPOOfJ8n0L/bHYzFLw6kL2YqoSw9GhrVePjvce0O5eKT3rht3nB8sk00WFZ2b9w9PwHnKs1D03c29cHz/x0jdYfIxPiO4v2u/L7UBx9g+VTgnLKLT842AEoK8peSOFbPg+SJIxHSV1RWW5sKS16NwWc7Qokd+OVAb9yzYBhq6cpaIHiREQbSXQznRDhfrcVDz8WB3U1bG5BOh3Ty3aOxM5PudqheSt//EowbZo7AsWLRHe3NCcATKwehpZX6Iya1nw7Dxsd3FO9fjN9nl5NJXfEOoMy25HQDsDgp85dYPQ/6BjZh0bonERrVh9nQ1KzGI8/HgSObW+cmwnCeFM41vIBjCfcjcftTzjSCPb8GYsUb0bjr0QRMe2wYTp3haBDinz/xihj25waAjfNuegQeTRuMmgvii5iK3ogj6CaiLOMVHMr4l7V4/2L8fjENw0DLgDAbk0lKGxvawp6+bkVhwrV3tTsPcn4/hQsaHwz+62LQLZzQZdlZL8x+aij5bp1QhqB8L8C48jHwamDcZLGOniv/0R9b/jdMXtHgZv2oERusj4Y4xFRu8KKwdSiyKHISKUDAYC0CejWi/Pd9OLD5JYnMeUfxPtcpgVc9h1A2+X1lB2plwZn4bz9s3qvva34e7PzuG5ScPAOfIH9or50KqCzE8aYVHesF9BLdBfR0ZsTdBfzpRiBYdF1Q/oX4A4OIP9io+Kgw4NopQECwkkvAfaM0CA9pQXN9DQwluQLN+HC63zeOI2QWMxZoTnsYSs3Pg130lsm3jHzbGD12DDAzDbiSlDt4NHDdfcDslUAU/0CZRAocACTOBfgCjX/BMIOOlhtnA/HJwJhbgenPAHfSW6s3bwHiv2wU0Z8E/kS7ZeYyYMI0IHYEMHICvO+YhciEMLQ11qI053s0VLPOqY2YnO73xWHEp0sNwEMmpZifB7l0y8i3jXzrGBUbCVxzDzD5EWD0eVauoQAAA9VJREFUJNCHY2AoGaLPWFLcXwGd4uqAjTCc7nJueRC4mnZP5EAgKAaIuZkMNY9gDuAdyEPSDqJ2o64nAy2AdtJfcNUNybSJZlBdG+rNlc/BgtP9Pg0sJ7WMuQjJSl9ROCDJdB7wLSPfNrbSrSPfPvLbqJko3r2BBFKWUvlmDBaFAWSAcFrplu7MyCbF+6W/ZeD3n8xuFlzm942iCJnLDcCjHssyPw/O0W0j3zqG0O3jVfT1id9Kmc/RYMc9jyQKx/n5VOCcMvuTWwzAYnd6HtBbKfM4Enhn8Q7jncY7jneeon+X+n3FuHCbAViITs8D+hrFPI4A3lG8s3iH8U7jHafo1y6/r+inW6hbDWDzedCtKcJh9zw0fLfjfWprNbnVACyRs8+Dnuj3ed4SuN0ALIizzoOe6vd5zhL0CAOwMI4+D3qy3+f5StBjDODo80CK9/lNm9+4pQlTftHxfnh4ol33PDRWl6nHGIAlddR54Ci/X1aW7bB4n+dnDXqUAVhAe8+DP4Lf53lK0OMMwIJ19zxwlN+Pj0/p9v0+y28L9EgDdPc8cJTfz8tLd3i835FReqQBWFhbz4M/kt/n+UnQYw3AAnZ0HkR6nceoPi1gf898rPxR4fVooRvVnnTPw7J1BT3aACx8+/PgTdSeKcAQvzLcHFuP2wY34urIKvjUHUfxvq+6/V3XlX6f5yVBjzdA+/MgB589lYyCXenQVuTDt+oQ6k7l4ds192H3e/RtWZoZYFO870q/bxIR7r0NVQrSGS6cB3r9ciXPrncfx6eLR2PToiuw5Zlxliv/HPGafW2hsrXEcX6+K+J9a4MzrcfvABaSwWAwLNXr9X8jnENEyjpMvPJfpVrFbw+p1D7Z9Xue9t11j/KHMQBPj4ywJikp6VrC+Q7f8n+02DCfUt06gq6U30o8xfHx8dymW7/nofYOSX8oA/CMs7Ky+DentxEeRKAygobyiQTbCC4mlYSHh2fl5eW5LN7vSKg/nAE6mEircTXziubV3QGbQDb6/TLOBYI7H5eKAcCrmVc1KZN/rUaZ1dQj/L5SskvGADypsjJhVfOvFvj/li13Aiv/uHGnuNXvs6wSXFIGME6qJDg4eAfhBQTVRjBQvouUv5t3CuE9JtlggB4jc1eCtFVUVJxPS0vb9eSTT25jSE1N3d7W1lbQ05TPE7kUDcDzAhmgcfXq1dUMa9asqVWpbPiXfaEH1zwuWQO4Rn32j+IxgP06tKsHjwHsUp/9jT0GsF+HdvXgMYBd6rO/sccA9uvQrh48BrBLffY39hjAfh3a1YPHAF2oz9nV/wcAAP//2bfK5AAAAAZJREFUAwDresg5slyVnwAAAABJRU5ErkJggg==",
            cs_r: "data:image/png;base64,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",
            cs_s: "data:image/png;base64,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",
            cs_sw: "data:image/png;base64,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"
        }
    };
    function replaceEmojiShorthand(m, $1, useNativeEmoji) {
        const emojiMatch = emojiData.data[$1];
        const divaMatch = divaData.data[$1];
        let result = m;
        if (emojiMatch) {
            if (useNativeEmoji && /unicode/.test(emojiMatch)) {
                const emojiUnicode = emojiMatch.replace("unicode/", "").replace(/\.png.*/, "").split("-").map((u => `&#x${u};`)).join("&zwj;").concat("&#xFE0E;");
                result = `<span class="emoji">${emojiUnicode}</span>`;
            } else {
                result = `<img src="${emojiData.baseURL}${emojiMatch}.png" alt="${$1}" class="emoji" loading="lazy">`;
            }
        } else if (divaMatch) {
            result = `<img src="${divaMatch}" alt="${$1}" class="emoji" loading="lazy">`;
        }
        return result;
    }
    function emojify(text, useNativeEmoji) {
        return text.replace(/<(code|pre|script|template)[^>]*?>[\s\S]+?<\/(code|pre|script|template)>/g, (m => m.replace(/:/g, "__colon__"))).replace(/<!--[\s\S]+?-->/g, (m => m.replace(/:/g, "__colon__"))).replace(/([a-z]{2,}:)?\/\/[^\s'">)]+/gi, (m => m.replace(/:/g, "__colon__"))).replace(/:([a-z0-9_\-+]+?):/g, ((m, $1) => replaceEmojiShorthand(m, $1, useNativeEmoji))).replace(/__colon__/g, ":");
    }
    function getAndRemoveConfig(str = "") {
        const config = {};
        if (str) {
            str = str.replace(/^('|")/, "").replace(/('|")$/, "").replace(/(?:^|\s):([\w-]+:?)=?([\w-%]+)?/g, ((m, key, value) => {
                if (key.indexOf(":") !== -1) {
                    return m;
                }
                value = value && value.replace(/&quot;/g, "") || true;
                if (value !== true && config[key] !== undefined) {
                    if (!Array.isArray(config[key]) && value !== config[key]) {
                        config[key] = [ config[key] ];
                    }
                    config[key].includes(value) || config[key].push(value);
                } else {
                    config[key] = value;
                }
                return "";
            })).trim();
        }
        return {
            str: str,
            config: config
        };
    }
    function removeAtag(str = "") {
        return str.replace(/(<\/?a.*?>)/gi, "");
    }
    function getAndRemoveDocsifyIgnoreConfig(content = "") {
        let ignoreAllSubs, ignoreSubHeading;
        if (/<!-- {docsify-ignore} -->/g.test(content)) {
            content = content.replace("\x3c!-- {docsify-ignore} --\x3e", "");
            ignoreSubHeading = true;
        }
        if (/{docsify-ignore}/g.test(content)) {
            content = content.replace("{docsify-ignore}", "");
            ignoreSubHeading = true;
        }
        if (/<!-- {docsify-ignore-all} -->/g.test(content)) {
            content = content.replace("\x3c!-- {docsify-ignore-all} --\x3e", "");
            ignoreAllSubs = true;
        }
        if (/{docsify-ignore-all}/g.test(content)) {
            content = content.replace("{docsify-ignore-all}", "");
            ignoreAllSubs = true;
        }
        return {
            content: content,
            ignoreAllSubs: ignoreAllSubs,
            ignoreSubHeading: ignoreSubHeading
        };
    }
    const imageCompiler = ({renderer: renderer, contentBase: contentBase, router: router}) => renderer.image = ({href: href, title: title, text: text}) => {
        let url = href;
        const attrs = [];
        const {str: str, config: config} = getAndRemoveConfig(title);
        title = str;
        if (config["no-zoom"]) {
            attrs.push("data-no-zoom");
        }
        if (title) {
            attrs.push(`title="${title}"`);
        }
        if (config.size) {
            const [width, height] = config.size.split("x");
            if (height) {
                attrs.push(`width="${width}" height="${height}"`);
            } else {
                attrs.push(`width="${width}"`);
            }
        }
        if (config.class) {
            let classes = config.class;
            if (Array.isArray(config.class)) {
                classes = config.class.join(" ");
            }
            attrs.push(`class="${classes}"`);
        }
        if (config.id) {
            attrs.push(`id="${config.id}"`);
        }
        if (!isAbsolutePath(href)) {
            url = getPath(contentBase, getParentPath(router.getCurrentPath()), href);
        }
        return `<img src="${url}" data-origin="${href}" alt="${text}" ${attrs.join(" ")} />`;
    };
    const headingCompiler = ({renderer: renderer, router: router, compiler: compiler}) => renderer.heading = function({tokens: tokens, depth: depth, text: text}) {
        const parsedText = this.parser.parseInline(tokens);
        let {str: str, config: config} = getAndRemoveConfig(parsedText);
        const nextToc = {
            depth: depth,
            title: str
        };
        const {content: content, ignoreAllSubs: ignoreAllSubs, ignoreSubHeading: ignoreSubHeading} = getAndRemoveDocsifyIgnoreConfig(str);
        str = content.trim();
        nextToc.title = removeAtag(str);
        nextToc.ignoreAllSubs = ignoreAllSubs;
        nextToc.ignoreSubHeading = ignoreSubHeading;
        const slug = slugify(config.id || text);
        const url = router.toURL(router.getCurrentPath(), {
            id: slug
        });
        nextToc.slug = stripUrlExceptId(url);
        compiler.toc.push(nextToc);
        return `<h${depth} id="${slug}" tabindex="-1"><a href="${url}" data-id="${slug}" class="anchor"><span>${str}</span></a></h${depth}>`;
    };
    (function(Prism) {
        function getPlaceholder(language, index) {
            return "___" + language.toUpperCase() + index + "___";
        }
        Object.defineProperties(Prism.languages["markup-templating"] = {}, {
            buildPlaceholders: {
                value: function(env, language, placeholderPattern, replaceFilter) {
                    if (env.language !== language) {
                        return;
                    }
                    var tokenStack = env.tokenStack = [];
                    env.code = env.code.replace(placeholderPattern, (function(match) {
                        if (typeof replaceFilter === "function" && !replaceFilter(match)) {
                            return match;
                        }
                        var i = tokenStack.length;
                        var placeholder;
                        while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
                            ++i;
                        }
                        tokenStack[i] = match;
                        return placeholder;
                    }));
                    env.grammar = Prism.languages.markup;
                }
            },
            tokenizePlaceholders: {
                value: function(env, language) {
                    if (env.language !== language || !env.tokenStack) {
                        return;
                    }
                    env.grammar = Prism.languages[language];
                    var j = 0;
                    var keys = Object.keys(env.tokenStack);
                    function walkTokens(tokens) {
                        for (var i = 0; i < tokens.length; i++) {
                            if (j >= keys.length) {
                                break;
                            }
                            var token = tokens[i];
                            if (typeof token === "string" || token.content && typeof token.content === "string") {
                                var k = keys[j];
                                var t = env.tokenStack[k];
                                var s = typeof token === "string" ? token : token.content;
                                var placeholder = getPlaceholder(language, k);
                                var index = s.indexOf(placeholder);
                                if (index > -1) {
                                    ++j;
                                    var before = s.substring(0, index);
                                    var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), "language-" + language, t);
                                    var after = s.substring(index + placeholder.length);
                                    var replacement = [];
                                    if (before) {
                                        replacement.push.apply(replacement, walkTokens([ before ]));
                                    }
                                    replacement.push(middle);
                                    if (after) {
                                        replacement.push.apply(replacement, walkTokens([ after ]));
                                    }
                                    if (typeof token === "string") {
                                        tokens.splice.apply(tokens, [ i, 1 ].concat(replacement));
                                    } else {
                                        token.content = replacement;
                                    }
                                }
                            } else if (token.content) {
                                walkTokens(token.content);
                            }
                        }
                        return tokens;
                    }
                    walkTokens(env.tokens);
                }
            }
        });
    })(Prism);
    const lang_dependencies = {
        javascript: "clike",
        actionscript: "javascript",
        apex: [ "clike", "sql" ],
        arduino: "cpp",
        aspnet: [ "markup", "csharp" ],
        birb: "clike",
        bison: "c",
        c: "clike",
        csharp: "clike",
        cpp: "c",
        cfscript: "clike",
        chaiscript: [ "clike", "cpp" ],
        cilkc: "c",
        cilkcpp: "cpp",
        coffeescript: "javascript",
        crystal: "ruby",
        "css-extras": "css",
        d: "clike",
        dart: "clike",
        django: "markup-templating",
        ejs: [ "javascript", "markup-templating" ],
        etlua: [ "lua", "markup-templating" ],
        erb: [ "ruby", "markup-templating" ],
        fsharp: "clike",
        "firestore-security-rules": "clike",
        flow: "javascript",
        ftl: "markup-templating",
        gml: "clike",
        glsl: "c",
        go: "clike",
        gradle: "clike",
        groovy: "clike",
        haml: "ruby",
        handlebars: "markup-templating",
        haxe: "clike",
        hlsl: "c",
        idris: "haskell",
        java: "clike",
        javadoc: [ "markup", "java", "javadoclike" ],
        jolie: "clike",
        jsdoc: [ "javascript", "javadoclike", "typescript" ],
        "js-extras": "javascript",
        json5: "json",
        jsonp: "json",
        "js-templates": "javascript",
        kotlin: "clike",
        latte: [ "clike", "markup-templating", "php" ],
        less: "css",
        lilypond: "scheme",
        liquid: "markup-templating",
        markdown: "markup",
        "markup-templating": "markup",
        mongodb: "javascript",
        n4js: "javascript",
        objectivec: "c",
        opencl: "c",
        parser: "markup",
        php: "markup-templating",
        phpdoc: [ "php", "javadoclike" ],
        "php-extras": "php",
        plsql: "sql",
        processing: "clike",
        protobuf: "clike",
        pug: [ "markup", "javascript" ],
        purebasic: "clike",
        purescript: "haskell",
        qsharp: "clike",
        qml: "javascript",
        qore: "clike",
        racket: "scheme",
        cshtml: [ "markup", "csharp" ],
        jsx: [ "markup", "javascript" ],
        tsx: [ "jsx", "typescript" ],
        reason: "clike",
        ruby: "clike",
        sass: "css",
        scss: "css",
        scala: "java",
        "shell-session": "bash",
        smarty: "markup-templating",
        solidity: "clike",
        soy: "markup-templating",
        sparql: "turtle",
        sqf: "clike",
        squirrel: "clike",
        stata: [ "mata", "java", "python" ],
        "t4-cs": [ "t4-templating", "csharp" ],
        "t4-vb": [ "t4-templating", "vbnet" ],
        tap: "yaml",
        tt2: [ "clike", "markup-templating" ],
        textile: "markup",
        twig: "markup-templating",
        typescript: "javascript",
        v: "clike",
        vala: "clike",
        vbnet: "basic",
        velocity: "markup",
        wiki: "markup",
        xeora: "markup",
        "xml-doc": "markup",
        xquery: "markup"
    };
    const lang_aliases = {
        html: "markup",
        xml: "markup",
        svg: "markup",
        mathml: "markup",
        ssml: "markup",
        atom: "markup",
        rss: "markup",
        js: "javascript",
        g4: "antlr4",
        ino: "arduino",
        "arm-asm": "armasm",
        art: "arturo",
        adoc: "asciidoc",
        avs: "avisynth",
        avdl: "avro-idl",
        gawk: "awk",
        sh: "bash",
        shell: "bash",
        shortcode: "bbcode",
        rbnf: "bnf",
        oscript: "bsl",
        cs: "csharp",
        dotnet: "csharp",
        cfc: "cfscript",
        "cilk-c": "cilkc",
        "cilk-cpp": "cilkcpp",
        cilk: "cilkcpp",
        coffee: "coffeescript",
        conc: "concurnas",
        jinja2: "django",
        "dns-zone": "dns-zone-file",
        dockerfile: "docker",
        gv: "dot",
        eta: "ejs",
        xlsx: "excel-formula",
        xls: "excel-formula",
        gamemakerlanguage: "gml",
        po: "gettext",
        gni: "gn",
        ld: "linker-script",
        "go-mod": "go-module",
        hbs: "handlebars",
        mustache: "handlebars",
        hs: "haskell",
        idr: "idris",
        gitignore: "ignore",
        hgignore: "ignore",
        npmignore: "ignore",
        webmanifest: "json",
        kt: "kotlin",
        kts: "kotlin",
        kum: "kumir",
        tex: "latex",
        context: "latex",
        ly: "lilypond",
        emacs: "lisp",
        elisp: "lisp",
        "emacs-lisp": "lisp",
        md: "markdown",
        moon: "moonscript",
        n4jsd: "n4js",
        nani: "naniscript",
        objc: "objectivec",
        qasm: "openqasm",
        objectpascal: "pascal",
        px: "pcaxis",
        pcode: "peoplecode",
        plantuml: "plant-uml",
        pq: "powerquery",
        mscript: "powerquery",
        pbfasm: "purebasic",
        purs: "purescript",
        py: "python",
        qs: "qsharp",
        rkt: "racket",
        razor: "cshtml",
        rpy: "renpy",
        res: "rescript",
        robot: "robotframework",
        rb: "ruby",
        "sh-session": "shell-session",
        shellsession: "shell-session",
        smlnj: "sml",
        sol: "solidity",
        sln: "solution-file",
        rq: "sparql",
        sclang: "supercollider",
        t4: "t4-cs",
        trickle: "tremor",
        troy: "tremor",
        trig: "turtle",
        ts: "typescript",
        tsconfig: "typoscript",
        uscript: "unrealscript",
        uc: "unrealscript",
        url: "uri",
        vb: "visual-basic",
        vba: "visual-basic",
        webidl: "web-idl",
        mathematica: "wolfram",
        nb: "wolfram",
        wl: "wolfram",
        xeoracube: "xeora",
        yml: "yaml"
    };
    const depTreeCache = {};
    function checkLangDependenciesAllLoaded(lang) {
        if (!lang) {
            return;
        }
        lang = lang_aliases[lang] || lang;
        const validLang = lang_dependencies[lang];
        if (!validLang) {
            return;
        }
        if (!depTreeCache[lang]) {
            const dummy = {
                cur: "",
                loaded: true,
                dependencies: []
            };
            buildAndCheckDepTree(lang, dummy, dummy);
            const depTree = dummy.dependencies[0];
            depTreeCache[lang] = depTree;
            if (!dummy.loaded) {
                const prettyOutput = prettryPrint(depTree, 1);
                console.warn(`The language '${lang}' required dependencies for code block highlighting are not satisfied.`, `Priority dependencies from low to high, consider to place all the necessary dependencie by priority (higher first): \n`, prettyOutput);
            }
        }
    }
    const buildAndCheckDepTree = (lang, parent, dummy) => {
        if (!lang) {
            return;
        }
        const cur = {
            cur: lang,
            loaded: true,
            dependencies: []
        };
        let deps = lang_dependencies[lang] || [];
        if (!(lang in prismExports.languages)) {
            dummy.loaded = false;
            cur.loaded = false;
        }
        if (typeof deps === "string") {
            deps = [ deps ];
        }
        deps.forEach((dep => {
            buildAndCheckDepTree(dep, cur, dummy);
        }));
        parent.dependencies.push(cur);
    };
    const prettryPrint = (depTree, level) => {
        let cur = `${"  ".repeat(level * 3)} ${depTree.cur} ${depTree.loaded ? "(+)" : "(-)"}`;
        if (depTree.dependencies.length) {
            depTree.dependencies.forEach((dep => {
                cur += prettryPrint(dep, level + 1);
            }));
        }
        return "\n" + cur;
    };
    const highlightCodeCompiler = ({renderer: renderer}) => renderer.code = function({text: text, lang: lang = "markup"}) {
        checkLangDependenciesAllLoaded(lang);
        const langOrMarkup = prismExports.languages[lang] || prismExports.languages.markup;
        const code = prismExports.highlight(text.replace(/@DOCSIFY_QM@/g, "`"), langOrMarkup, lang);
        return `<pre data-lang="${lang}" class="language-${lang}"><code class="lang-${lang} language-${lang}" tabindex="0">${code}</code></pre>`;
    };
    const paragraphCompiler = ({renderer: renderer}) => renderer.paragraph = function({tokens: tokens}) {
        const text = this.parser.parseInline(tokens);
        let result;
        if (text.startsWith("!&gt;")) {
            result = helper("callout important", text);
        } else if (text.startsWith("?&gt;")) {
            result = helper("callout tip", text);
        } else {
            result = `<p>${text}</p>`;
        }
        return result;
    };
    const blockquoteCompiler = ({renderer: renderer}) => renderer.blockquote = function({tokens: tokens}) {
        let openTag = "<blockquote>";
        let closeTag = "</blockquote>";
        const firstParagraphIndex = tokens.findIndex((t => t.type === "paragraph"));
        const firstParagraph = tokens[firstParagraphIndex];
        if (firstParagraph) {
            const calloutData = firstParagraph.raw.match(/^(\[!(\w+)\])/);
            if (calloutData) {
                const calloutMark = calloutData[1];
                const calloutType = calloutData[2].toLowerCase();
                firstParagraph.raw = firstParagraph.raw.replace(calloutMark, "").trimStart();
                if (firstParagraph.tokens && firstParagraph.tokens.length > 0) {
                    firstParagraph.tokens.forEach((t => {
                        if (t.raw) {
                            t.raw = t.raw.replace(calloutMark, "");
                        }
                        if (t.text) {
                            t.text = t.text.replace(calloutMark, "");
                        }
                    }));
                }
                if (!firstParagraph.raw.trim()) {
                    tokens.splice(firstParagraphIndex, 1);
                }
                openTag = `<div class="callout ${calloutType}">`;
                closeTag = `</div>`;
            }
        }
        const body = this.parser.parse(tokens);
        return `${openTag}${body}${closeTag}`;
    };
    const taskListCompiler = ({renderer: renderer}) => renderer.list = function(token) {
        const ordered = token.ordered;
        const start = token.start;
        let body = "";
        for (let j = 0; j < token.items.length; j++) {
            const item = token.items[j];
            body += this.listitem?.(item);
        }
        const isTaskList = /<li class="task-list-item">/.test(body.split('class="task-list"')[0]);
        const isStartReq = start && start > 1;
        const tag = ordered ? "ol" : "ul";
        const tagAttrs = [ isTaskList ? 'class="task-list"' : "", isStartReq ? `start="${start}"` : "" ].join(" ").trim();
        return `<${tag} ${tagAttrs}>${body}</${tag}>`;
    };
    const taskListItemCompiler = ({renderer: renderer}) => renderer.listitem = function(item) {
        let text = "";
        if (item.task) {
            const checkbox = this.checkbox?.({
                checked: !!item.checked
            });
            if (item.loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                    item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                    if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                        item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                    }
                } else {
                    item.tokens.unshift({
                        type: "text",
                        raw: checkbox + " ",
                        text: checkbox + " "
                    });
                }
            }
        }
        text += this.parser?.parse(item.tokens, !!item.loose);
        const isTaskItem = /^(<input.*type="checkbox"[^>]*>)/.test(text);
        const html = isTaskItem ? `<li class="task-list-item"><label>${text}</label></li>` : `<li>${text}</li>`;
        return html;
    };
    const linkCompiler = ({renderer: renderer, router: router, linkTarget: linkTarget, linkRel: linkRel, compiler: compiler}) => renderer.link = function({href: href, title: title = "", tokens: tokens}) {
        const attrs = [];
        const text = this.parser.parseInline(tokens) || "";
        const {str: str, config: config} = getAndRemoveConfig(title);
        const isAbsolute = isAbsolutePath(href);
        const isNotCompilable = compiler._matchNotCompileLink(href);
        const isMailto = href.startsWith("mailto:");
        linkTarget = config.target || linkTarget;
        linkRel = linkTarget === "_blank" ? compiler.config.externalLinkRel || "noopener" : "";
        title = str;
        if (!isAbsolute && !isNotCompilable && !config.ignore) {
            if (href === compiler.config.homepage) {
                href = "README";
            }
            href = router.toURL(href, null, router.getCurrentPath());
            if (config.target && !isMailto) {
                attrs.push(`target="${linkTarget}"`);
            }
        } else {
            if (!isAbsolute && href.startsWith("./")) {
                href = router.toURL(href, null, router.getCurrentPath()).replace(/^#\//, "/");
            }
            if (!isMailto) {
                attrs.push(`target="${linkTarget}"`);
                if (linkRel !== "") {
                    attrs.push(`rel="${linkRel}"`);
                }
            }
        }
        if (config.disabled) {
            attrs.push("disabled");
            href = "javascript:void(0)";
        }
        if (config.class) {
            let classes = config.class;
            if (Array.isArray(config.class)) {
                classes = config.class.join(" ");
            }
            attrs.push(`class="${classes}"`);
        }
        if (config.id) {
            attrs.push(`id="${config.id}"`);
        }
        if (title) {
            attrs.push(`title="${title}"`);
        }
        return `<a href="${href}" ${attrs.join(" ")}>${text}</a>`;
    };
    const compileMedia = {
        markdown(url) {
            return {
                url: url
            };
        },
        mermaid(url) {
            return {
                url: url
            };
        },
        iframe(url, title) {
            return {
                html: `<iframe src="${url}" ${title || "width=100% height=400"}></iframe>`
            };
        },
        video(url, title) {
            return {
                html: `<video src="${url}" ${title || "controls"}>Not Supported</video>`
            };
        },
        audio(url, title) {
            return {
                html: `<audio src="${url}" ${title || "controls"}>Not Supported</audio>`
            };
        },
        code(url, title) {
            let lang = url.match(/\.(\w+)$/);
            lang = title || lang && lang[1];
            if (lang === "md") {
                lang = "markdown";
            }
            return {
                url: url,
                lang: lang
            };
        }
    };
    const tableCellCompiler = ({renderer: renderer}) => renderer.tablecell = function(token) {
        let content;
        if (token.embedTokens && token.embedTokens.length > 0) {
            content = this.parser.parse(token.embedTokens);
        } else {
            content = this.parser.parseInline(token.tokens);
        }
        const type = token.header ? "th" : "td";
        const tag = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
        return tag + content + `</${type}>\n`;
    };
    const cachedLinks = {};
    class Compiler {
        constructor(config, router) {
            this.config = config;
            this.router = router;
            this.cacheTree = {};
            this.toc = [];
            this.cacheTOC = {};
            this.linkTarget = config.externalLinkTarget || "_blank";
            this.linkRel = this.linkTarget === "_blank" ? config.externalLinkRel || "noopener" : "";
            this.contentBase = router.getBasePath();
            this.renderer = this._initRenderer();
            let compile;
            const mdConf = config.markdown || {};
            if (isFn(mdConf)) {
                compile = mdConf(d, this.renderer);
            } else {
                d.setOptions(Object.assign(mdConf, {
                    renderer: Object.assign(this.renderer, mdConf.renderer)
                }));
                compile = d;
            }
            this._marked = compile;
            this.compile = text => {
                let isCached = true;
                const result = cached$1((_ => {
                    isCached = false;
                    let html = "";
                    if (!text) {
                        return text;
                    }
                    if (isPrimitive(text)) {
                        html = compile(text);
                    } else {
                        html = compile.parser(text);
                    }
                    html = config.noEmoji ? html : emojify(html, config.nativeEmoji);
                    slugify.clear();
                    return html;
                }))(text);
                const curFileName = this.router.parse().file;
                if (isCached) {
                    this.toc = this.cacheTOC[curFileName];
                } else {
                    this.cacheTOC[curFileName] = [ ...this.toc ];
                }
                return result;
            };
        }
        compileEmbed(href, title) {
            const {str: str, config: config} = getAndRemoveConfig(title);
            let embed;
            title = str;
            if (config.include) {
                if (!isAbsolutePath(href)) {
                    href = getPath(this.contentBase, getParentPath(this.router.getCurrentPath()), href);
                }
                let media;
                if (config.type && (media = compileMedia[config.type])) {
                    embed = media.call(this, href, title);
                    embed.type = config.type;
                } else {
                    let type = "code";
                    if (/\.(md|markdown)/.test(href)) {
                        type = "markdown";
                    } else if (/\.mmd/.test(href)) {
                        type = "mermaid";
                    } else if (/\.html?/.test(href)) {
                        type = "iframe";
                    } else if (/\.(mp4|ogg)/.test(href)) {
                        type = "video";
                    } else if (/\.mp3/.test(href)) {
                        type = "audio";
                    }
                    embed = compileMedia[type](href, title);
                    embed.type = type;
                }
                embed.fragment = config.fragment;
                embed.omitFragmentLine = config.omitFragmentLine;
                return embed;
            }
        }
        _matchNotCompileLink(link) {
            const links = this.config.noCompileLinks || [];
            for (const n of links) {
                const re = cachedLinks[n] || (cachedLinks[n] = new RegExp(`^${n}$`));
                if (re.test(link)) {
                    return link;
                }
            }
        }
        _initRenderer() {
            const renderer = new d.Renderer;
            const {linkTarget: linkTarget, linkRel: linkRel, router: router, contentBase: contentBase} = this;
            const origin = {};
            origin.heading = headingCompiler({
                renderer: renderer,
                router: router,
                compiler: this
            });
            origin.blockquoteCompiler = blockquoteCompiler({
                renderer: renderer
            });
            origin.code = highlightCodeCompiler({
                renderer: renderer
            });
            origin.link = linkCompiler({
                renderer: renderer,
                router: router,
                linkTarget: linkTarget,
                linkRel: linkRel,
                compiler: this
            });
            origin.paragraph = paragraphCompiler({
                renderer: renderer
            });
            origin.image = imageCompiler({
                renderer: renderer,
                contentBase: contentBase,
                router: router
            });
            origin.list = taskListCompiler({
                renderer: renderer
            });
            origin.listitem = taskListItemCompiler({
                renderer: renderer
            });
            origin.tablecell = tableCellCompiler({
                renderer: renderer
            });
            renderer.origin = origin;
            return renderer;
        }
        sidebar(text, level) {
            const {toc: toc} = this;
            const currentPath = this.router.getCurrentPath();
            let html = "";
            if (text) {
                return this.compile(text);
            }
            for (let i = 0; i < toc.length; i++) {
                if (toc[i].ignoreSubHeading) {
                    const deletedHeaderLevel = toc[i].depth;
                    toc.splice(i, 1);
                    while (i < toc.length && toc[i].depth > deletedHeaderLevel) {
                        toc.splice(i, 1);
                    }
                    i--;
                }
            }
            const tree$1 = this.cacheTree[currentPath] || genTree(toc, level);
            html = tree(tree$1);
            this.cacheTree[currentPath] = tree$1;
            return html;
        }
        resetToc() {
            this.toc = [];
        }
        subSidebar(level) {
            const currentPath = this.router.getCurrentPath();
            const {cacheTree: cacheTree, toc: toc} = this;
            toc[0] && toc[0].ignoreAllSubs && toc.splice(0);
            toc[0] && toc[0].depth === 1 && toc.shift();
            for (let i = 0; i < toc.length; i++) {
                toc[i].ignoreSubHeading && toc.splice(i, 1) && i--;
            }
            const tree$1 = cacheTree[currentPath] || genTree(toc, level);
            cacheTree[currentPath] = tree$1;
            this.toc = [];
            return tree(tree$1);
        }
        header(text, level) {
            const tokenHeading = {
                type: "heading",
                raw: text,
                depth: level,
                text: text,
                tokens: [ {
                    type: "text",
                    raw: text,
                    text: text
                } ]
            };
            return this.renderer.heading(tokenHeading);
        }
        cover(text) {
            const cacheToc = this.toc.slice();
            const html = this.compile(text);
            this.toc = cacheToc.slice();
            return html;
        }
    }
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    var _templateObject = _taggedTemplateLiteral([ "", "" ], [ "", "" ]);
    function _taggedTemplateLiteral(strings, raw) {
        return Object.freeze(Object.defineProperties(strings, {
            raw: {
                value: Object.freeze(raw)
            }
        }));
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var TemplateTag = function() {
        function TemplateTag() {
            var _this = this;
            for (var _len = arguments.length, transformers = Array(_len), _key = 0; _key < _len; _key++) {
                transformers[_key] = arguments[_key];
            }
            _classCallCheck(this, TemplateTag);
            this.tag = function(strings) {
                for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    expressions[_key2 - 1] = arguments[_key2];
                }
                if (typeof strings === "function") {
                    return _this.interimTag.bind(_this, strings);
                }
                if (typeof strings === "string") {
                    return _this.transformEndResult(strings);
                }
                strings = strings.map(_this.transformString.bind(_this));
                return _this.transformEndResult(strings.reduce(_this.processSubstitutions.bind(_this, expressions)));
            };
            if (transformers.length > 0 && Array.isArray(transformers[0])) {
                transformers = transformers[0];
            }
            this.transformers = transformers.map((function(transformer) {
                return typeof transformer === "function" ? transformer() : transformer;
            }));
            return this.tag;
        }
        _createClass(TemplateTag, [ {
            key: "interimTag",
            value: function interimTag(previousTag, template) {
                for (var _len3 = arguments.length, substitutions = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                    substitutions[_key3 - 2] = arguments[_key3];
                }
                return this.tag(_templateObject, previousTag.apply(undefined, [ template ].concat(substitutions)));
            }
        }, {
            key: "processSubstitutions",
            value: function processSubstitutions(substitutions, resultSoFar, remainingPart) {
                var substitution = this.transformSubstitution(substitutions.shift(), resultSoFar);
                return "".concat(resultSoFar, substitution, remainingPart);
            }
        }, {
            key: "transformString",
            value: function transformString(str) {
                var cb = function cb(res, transform) {
                    return transform.onString ? transform.onString(res) : res;
                };
                return this.transformers.reduce(cb, str);
            }
        }, {
            key: "transformSubstitution",
            value: function transformSubstitution(substitution, resultSoFar) {
                var cb = function cb(res, transform) {
                    return transform.onSubstitution ? transform.onSubstitution(res, resultSoFar) : res;
                };
                return this.transformers.reduce(cb, substitution);
            }
        }, {
            key: "transformEndResult",
            value: function transformEndResult(endResult) {
                var cb = function cb(res, transform) {
                    return transform.onEndResult ? transform.onEndResult(res) : res;
                };
                return this.transformers.reduce(cb, endResult);
            }
        } ]);
        return TemplateTag;
    }();
    var trimResultTransformer = function trimResultTransformer() {
        var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return {
            onEndResult: function onEndResult(endResult) {
                if (side === "") {
                    return endResult.trim();
                }
                side = side.toLowerCase();
                if (side === "start" || side === "left") {
                    return endResult.replace(/^\s*/, "");
                }
                if (side === "end" || side === "right") {
                    return endResult.replace(/\s*$/, "");
                }
                throw new Error("Side not supported: " + side);
            }
        };
    };
    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }
    var stripIndentTransformer = function stripIndentTransformer() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "initial";
        return {
            onEndResult: function onEndResult(endResult) {
                if (type === "initial") {
                    var match = endResult.match(/^[^\S\n]*(?=\S)/gm);
                    var indent = match && Math.min.apply(Math, _toConsumableArray(match.map((function(el) {
                        return el.length;
                    }))));
                    if (indent) {
                        var regexp = new RegExp("^.{" + indent + "}", "gm");
                        return endResult.replace(regexp, "");
                    }
                    return endResult;
                }
                if (type === "all") {
                    return endResult.replace(/^[^\S\n]+/gm, "");
                }
                throw new Error("Unknown type: " + type);
            }
        };
    };
    var replaceResultTransformer = function replaceResultTransformer(replaceWhat, replaceWith) {
        return {
            onEndResult: function onEndResult(endResult) {
                if (replaceWhat == null || replaceWith == null) {
                    throw new Error("replaceResultTransformer requires at least 2 arguments.");
                }
                return endResult.replace(replaceWhat, replaceWith);
            }
        };
    };
    var replaceSubstitutionTransformer = function replaceSubstitutionTransformer(replaceWhat, replaceWith) {
        return {
            onSubstitution: function onSubstitution(substitution, resultSoFar) {
                if (replaceWhat == null || replaceWith == null) {
                    throw new Error("replaceSubstitutionTransformer requires at least 2 arguments.");
                }
                if (substitution == null) {
                    return substitution;
                } else {
                    return substitution.toString().replace(replaceWhat, replaceWith);
                }
            }
        };
    };
    var defaults = {
        separator: "",
        conjunction: "",
        serial: false
    };
    var inlineArrayTransformer = function inlineArrayTransformer() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;
        return {
            onSubstitution: function onSubstitution(substitution, resultSoFar) {
                if (Array.isArray(substitution)) {
                    var arrayLength = substitution.length;
                    var separator = opts.separator;
                    var conjunction = opts.conjunction;
                    var serial = opts.serial;
                    var indent = resultSoFar.match(/(\n?[^\S\n]+)$/);
                    if (indent) {
                        substitution = substitution.join(separator + indent[1]);
                    } else {
                        substitution = substitution.join(separator + " ");
                    }
                    if (conjunction && arrayLength > 1) {
                        var separatorIndex = substitution.lastIndexOf(separator);
                        substitution = substitution.slice(0, separatorIndex) + (serial ? separator : "") + " " + conjunction + substitution.slice(separatorIndex + 1);
                    }
                }
                return substitution;
            }
        };
    };
    var splitStringTransformer = function splitStringTransformer(splitBy) {
        return {
            onSubstitution: function onSubstitution(substitution, resultSoFar) {
                {
                    if (typeof substitution === "string" && substitution.includes(splitBy)) {
                        substitution = substitution.split(splitBy);
                    }
                }
                return substitution;
            }
        };
    };
    var isValidValue = function isValidValue(x) {
        return x != null && !Number.isNaN(x) && typeof x !== "boolean";
    };
    var removeNonPrintingValuesTransformer = function removeNonPrintingValuesTransformer() {
        return {
            onSubstitution: function onSubstitution(substitution) {
                if (Array.isArray(substitution)) {
                    return substitution.filter(isValidValue);
                }
                if (isValidValue(substitution)) {
                    return substitution;
                }
                return "";
            }
        };
    };
    new TemplateTag(inlineArrayTransformer({
        separator: ","
    }), stripIndentTransformer, trimResultTransformer);
    new TemplateTag(inlineArrayTransformer({
        separator: ",",
        conjunction: "and"
    }), stripIndentTransformer, trimResultTransformer);
    new TemplateTag(inlineArrayTransformer({
        separator: ",",
        conjunction: "or"
    }), stripIndentTransformer, trimResultTransformer);
    new TemplateTag(splitStringTransformer("\n"), removeNonPrintingValuesTransformer, inlineArrayTransformer, stripIndentTransformer, trimResultTransformer);
    new TemplateTag(splitStringTransformer("\n"), inlineArrayTransformer, stripIndentTransformer, trimResultTransformer, replaceSubstitutionTransformer(/&/g, "&amp;"), replaceSubstitutionTransformer(/</g, "&lt;"), replaceSubstitutionTransformer(/>/g, "&gt;"), replaceSubstitutionTransformer(/"/g, "&quot;"), replaceSubstitutionTransformer(/'/g, "&#x27;"), replaceSubstitutionTransformer(/`/g, "&#x60;"));
    new TemplateTag(replaceResultTransformer(/(?:\n(?:\s*))+/g, " "), trimResultTransformer);
    new TemplateTag(replaceResultTransformer(/(?:\n\s*)/g, ""), trimResultTransformer);
    new TemplateTag(inlineArrayTransformer({
        separator: ","
    }), replaceResultTransformer(/(?:\s+)/g, " "), trimResultTransformer);
    new TemplateTag(inlineArrayTransformer({
        separator: ",",
        conjunction: "or"
    }), replaceResultTransformer(/(?:\s+)/g, " "), trimResultTransformer);
    new TemplateTag(inlineArrayTransformer({
        separator: ",",
        conjunction: "and"
    }), replaceResultTransformer(/(?:\s+)/g, " "), trimResultTransformer);
    new TemplateTag(inlineArrayTransformer, stripIndentTransformer, trimResultTransformer);
    new TemplateTag(inlineArrayTransformer, replaceResultTransformer(/(?:\s+)/g, " "), trimResultTransformer);
    var stripIndent = new TemplateTag(stripIndentTransformer, trimResultTransformer);
    new TemplateTag(stripIndentTransformer("all"), trimResultTransformer);
    let barEl;
    let timeId;
    function init() {
        const div = create("div");
        div.classList.add("progress");
        div.setAttribute("role", "progressbar");
        div.setAttribute("aria-valuemin", "0");
        div.setAttribute("aria-valuemax", "100");
        div.setAttribute("aria-label", "Loading...");
        appendTo(body, div);
        barEl = div;
    }
    function progressbar(info) {
        const {loaded: loaded, total: total, step: step} = info;
        let num;
        !barEl && init();
        if (typeof step !== "undefined") {
            num = parseInt(barEl.style.width || 0, 10) + step;
            num = num > 80 ? 80 : num;
        } else {
            num = Math.floor(loaded / total * 100);
        }
        barEl.style.opacity = 1;
        barEl.style.width = num >= 95 ? "100%" : num + "%";
        barEl.setAttribute("aria-valuenow", num >= 95 ? 100 : num);
        if (num >= 95) {
            clearTimeout(timeId);
            timeId = setTimeout((_ => {
                barEl.style.opacity = 0;
                barEl.style.width = "0%";
                barEl.removeAttribute("aria-valuenow");
            }), 200);
        }
    }
    const cache = {};
    function get(url, hasBar = false, headers = {}) {
        const xhr = new XMLHttpRequest;
        const cached = cache[url];
        if (cached) {
            return {
                then: cb => cb(cached.content, cached.opt),
                abort: noop
            };
        }
        xhr.open("GET", url);
        for (const i of Object.keys(headers)) {
            xhr.setRequestHeader(i, headers[i]);
        }
        xhr.send();
        return {
            then(success, error = noop) {
                const getResponseStatus = event => ({
                    ok: event.target.status >= 200 && event.target.status < 300,
                    status: event.target.status,
                    statusText: event.target.statusText
                });
                if (hasBar) {
                    const id = setInterval((_ => progressbar({
                        step: Math.floor(Math.random() * 5 + 1)
                    })), 500);
                    xhr.addEventListener("progress", progressbar);
                    xhr.addEventListener("loadend", (evt => {
                        progressbar(evt);
                        clearInterval(id);
                    }));
                }
                xhr.addEventListener("error", (event => {
                    error(event, getResponseStatus(event));
                }));
                xhr.addEventListener("load", (event => {
                    const target = event.target;
                    if (target.status >= 400) {
                        error(event, getResponseStatus(event));
                    } else {
                        if (typeof target.response !== "string") {
                            throw new TypeError("Unsupported content type.");
                        }
                        const result = cache[url] = {
                            content: target.response,
                            opt: {
                                updatedAt: xhr.getResponseHeader("last-modified") ?? ""
                            }
                        };
                        success(result.content, result.opt, getResponseStatus(event));
                    }
                }));
            },
            abort: _ => xhr.readyState !== 4 && xhr.abort()
        };
    }
    const cached = {};
    function extractFragmentContent(text, fragment, fullLine) {
        if (!fragment) {
            return text;
        }
        let fragmentRegex = `(?:###|\\/\\/\\/)\\s*\\[${fragment}\\]`;
        const contentRegex = `[\\s\\S]*?`;
        if (fullLine) {
            fragmentRegex = `.*${fragmentRegex}.*\n`;
        }
        const pattern = new RegExp(`(?:${fragmentRegex})(${contentRegex})(?:${fragmentRegex})`);
        const match = text.match(pattern);
        return stripIndent((match || [])[1] || "").trim();
    }
    function walkFetchEmbed({embedTokens: embedTokens, compile: compile, fetch: fetch}, cb) {
        let token;
        let step = 0;
        let count = 0;
        if (!embedTokens.length) {
            return cb({});
        }
        while (token = embedTokens[step++]) {
            const currentToken = token;
            const next = text => {
                let embedToken;
                if (text) {
                    if (currentToken.embed.type === "markdown") {
                        let path = currentToken.embed.url.split("/");
                        path.pop();
                        path = path.join("/");
                        text = text.replace(/\[([^[\]]+)\]\(([^)]+)\)/g, (x => {
                            const linkBeginIndex = x.indexOf("(");
                            if (x.slice(linkBeginIndex, linkBeginIndex + 2) === "(.") {
                                return x.substring(0, linkBeginIndex) + `(${window.location.protocol}//${window.location.host}${path}/` + x.substring(linkBeginIndex + 1, x.length - 1) + ")";
                            }
                            return x;
                        }));
                        const frontMatterInstalled = $docsify?.frontMatter?.installed;
                        if (frontMatterInstalled) {
                            text = $docsify.frontMatter?.parseMarkdown(text);
                        }
                        if (currentToken.embed.fragment) {
                            text = extractFragmentContent(text, currentToken.embed.fragment, currentToken.embed.omitFragmentLine);
                        }
                        embedToken = compile.lexer(text);
                    } else if (currentToken.embed.type === "code") {
                        if (currentToken.embed.fragment) {
                            text = extractFragmentContent(text, currentToken.embed.fragment, currentToken.embed.omitFragmentLine);
                        }
                        embedToken = compile.lexer("```" + currentToken.embed.lang + "\n" + text.replace(/`/g, "@DOCSIFY_QM@") + "\n```\n");
                    } else if (currentToken.embed.type === "mermaid") {
                        embedToken = [ {
                            type: "html",
                            text: `<div class="mermaid">\n${text}\n</div>`
                        } ];
                        embedToken.links = {};
                    } else {
                        embedToken = [ {
                            type: "html",
                            text: text
                        } ];
                        embedToken.links = {};
                    }
                }
                cb({
                    token: currentToken,
                    embedToken: embedToken,
                    rowIndex: currentToken.rowIndex,
                    cellIndex: currentToken.cellIndex,
                    tokenRef: currentToken.tokenRef
                });
                if (++count >= embedTokens.length) {
                    cb({});
                }
            };
            if (token.embed.url) {
                get(token.embed.url).then(next);
            } else {
                next(token.embed.html);
            }
        }
    }
    function prerenderEmbed({compiler: compiler, raw: raw = "", fetch: fetch}, done) {
        const hit = cached[raw];
        if (hit) {
            const copy = hit.slice();
            copy.links = hit.links;
            return done(copy);
        }
        const compile = compiler._marked;
        let tokens = compile.lexer(raw);
        const embedTokens = [];
        const linkRE = compile.Lexer.rules.inline.normal.link;
        const links = tokens.links;
        const linkMatcher = new RegExp(linkRE.source, "g");
        tokens.forEach(((token, index) => {
            if (token.type === "paragraph") {
                token.text = token.text.replace(linkMatcher, ((src, filename, href, title) => {
                    const embed = compiler.compileEmbed(href, title);
                    if (embed) {
                        embedTokens.push({
                            index: index,
                            tokenRef: token,
                            embed: embed
                        });
                    }
                    return src;
                }));
            } else if (token.type === "table") {
                token.rows.forEach(((row, rowIndex) => {
                    row.forEach(((cell, cellIndex) => {
                        cell.text = cell.text.replace(linkMatcher, ((src, filename, href, title) => {
                            const embed = compiler.compileEmbed(href, title);
                            if (embed) {
                                embedTokens.push({
                                    index: index,
                                    tokenRef: token,
                                    rowIndex: rowIndex,
                                    cellIndex: cellIndex,
                                    embed: embed
                                });
                            }
                            return src;
                        }));
                    }));
                }));
            }
        }));
        const moves = [];
        walkFetchEmbed({
            compile: compile,
            embedTokens: embedTokens,
            fetch: fetch
        }, (({embedToken: embedToken, token: token, rowIndex: rowIndex, cellIndex: cellIndex, tokenRef: tokenRef}) => {
            if (token) {
                if (typeof rowIndex === "number" && typeof cellIndex === "number") {
                    const cell = tokenRef.rows[rowIndex][cellIndex];
                    cell.embedTokens = embedToken;
                } else {
                    let index = token.index;
                    moves.forEach((pos => {
                        if (index > pos.start) {
                            index += pos.length;
                        }
                    }));
                    Object.assign(links, embedToken.links);
                    tokens = tokens.slice(0, index).concat(embedToken, tokens.slice(index + 1));
                    moves.push({
                        start: index,
                        length: embedToken.length - 1
                    });
                }
            } else {
                cached[raw] = tokens.concat();
                tokens.links = cached[raw].links = links;
                done(tokens);
            }
        }));
    }
    function Render(Base) {
        return class Render extends Base {
            compiler;
            #vueGlobalData;
            #addTextAsTitleAttribute(cssSelector) {
                findAll(cssSelector).forEach((elm => {
                    const e = elm;
                    if (!e.title && e.innerText) {
                        e.title = e.innerText;
                    }
                }));
            }
            #executeScript() {
                const script = findAll(".markdown-section>script").filter((s => !/template/.test(s.type)))[0];
                if (!script) {
                    return false;
                }
                const code = script.innerText.trim();
                if (!code) {
                    return false;
                }
                new Function(code)();
            }
            #formatUpdated(html, updated, fn) {
                updated = typeof fn === "function" ? fn(updated) : typeof fn === "string" ? tinydate(fn)(new Date(updated)) : updated;
                return html.replace(/{docsify-updated}/g, updated);
            }
            #renderMain(html) {
                const docsifyConfig = this.config;
                const markdownElm = find(".markdown-section");
                const vueVersion = "Vue" in window && window.Vue.version && Number(window.Vue.version.charAt(0));
                const isMountedVue = elm => {
                    const isVue2 = Boolean(elm.__vue__ && elm.__vue__._isVue);
                    const isVue3 = Boolean(elm._vnode && elm._vnode.__v_skip);
                    return isVue2 || isVue3;
                };
                if ("Vue" in window) {
                    const mountedElms = findAll(".markdown-section > *").filter((elm => isMountedVue(elm)));
                    for (const mountedElm of mountedElms) {
                        if (vueVersion === 2) {
                            mountedElm.__vue__?.$destroy?.();
                        } else if (vueVersion === 3) {
                            mountedElm.__vue_app__?.unmount();
                        }
                    }
                }
                setHTML(markdownElm, html);
                if (docsifyConfig.executeScript || "Vue" in window && docsifyConfig.executeScript !== false) {
                    this.#executeScript();
                }
                if ("Vue" in window) {
                    const vueGlobalOptions = docsifyConfig.vueGlobalOptions || {};
                    const vueMountData = [];
                    const vueComponentNames = Object.keys(docsifyConfig.vueComponents || {});
                    if (vueVersion === 2 && vueComponentNames.length) {
                        vueComponentNames.forEach((name => {
                            const isNotRegistered = !window.Vue.options.components[name];
                            if (isNotRegistered) {
                                window.Vue.component(name, docsifyConfig.vueComponents[name]);
                            }
                        }));
                    }
                    if (!this.#vueGlobalData && vueGlobalOptions.data && typeof vueGlobalOptions.data === "function") {
                        this.#vueGlobalData = vueGlobalOptions.data();
                    }
                    vueMountData.push(...Object.keys(docsifyConfig.vueMounts || {}).map((cssSelector => [ find(markdownElm, cssSelector), docsifyConfig.vueMounts[cssSelector] ])).filter((([elm, vueConfig]) => elm)));
                    const reHasBraces = /{{2}[^{}]*}{2}/;
                    const reHasDirective = /<[^>/]+\s([@:]|v-)[\w-:.[\]]+[=>\s]/;
                    vueMountData.push(...findAll(".markdown-section > *").filter((elm => !vueMountData.some((([e, c]) => e === elm)))).filter((elm => {
                        const selector = vueComponentNames.join(",");
                        const hasComponents = selector ? Boolean(elm.querySelector(selector)) : false;
                        const isVueMount = elm.tagName.toLowerCase() in (docsifyConfig.vueComponents || {}) || hasComponents || reHasBraces.test(elm.outerHTML) || reHasDirective.test(elm.outerHTML);
                        return isVueMount;
                    })).map((elm => {
                        const vueConfig = {
                            ...vueGlobalOptions
                        };
                        if (this.#vueGlobalData) {
                            vueConfig.data = () => this.#vueGlobalData;
                        }
                        return [ elm, vueConfig ];
                    })));
                    if (vueMountData.length === 0) {
                        return;
                    }
                    for (const [mountElm, vueConfig] of vueMountData) {
                        const isVueAttr = "data-isvue";
                        const isSkipElm = mountElm.matches("pre, :not([v-template]):has(pre), script") || isMountedVue(mountElm) || mountElm.querySelector(`[${isVueAttr}]`);
                        if (!isSkipElm) {
                            mountElm.setAttribute(isVueAttr, "");
                            if (vueVersion === 2) {
                                vueConfig.el = undefined;
                                new window.Vue(vueConfig).$mount(mountElm);
                            } else if (vueVersion === 3) {
                                const app = window.Vue.createApp(vueConfig);
                                vueComponentNames.forEach((name => {
                                    const config = docsifyConfig.vueComponents[name];
                                    app.component(name, config);
                                }));
                                app.mount(mountElm);
                            }
                        }
                    }
                }
            }
            #renderNameLink(vm) {
                const el = getNode(".app-name-link");
                const nameLink = vm.config.nameLink;
                const path = vm.route.path;
                if (!el) {
                    return;
                }
                if (isPrimitive(vm.config.nameLink)) {
                    el.setAttribute("href", nameLink);
                } else if (typeof nameLink === "object") {
                    const match = Object.keys(nameLink).filter((key => path.indexOf(key) > -1))[0];
                    el.setAttribute("href", nameLink[match]);
                }
            }
            #renderSkipLink(vm) {
                const {skipLink: skipLink} = vm.config;
                if (skipLink !== false) {
                    const el = getNode("#skip-to-content");
                    let skipLinkText = typeof skipLink === "string" ? skipLink : "Skip to main content";
                    if (skipLink?.constructor === Object) {
                        const matchingPath = Object.keys(skipLink).find((path => vm.route.path.startsWith(path.startsWith("/") ? path : `/${path}`)));
                        const matchingText = matchingPath && skipLink[matchingPath];
                        skipLinkText = matchingText || skipLinkText;
                    }
                    if (el) {
                        el.innerHTML = skipLinkText;
                    } else {
                        const html = `<button type="button" id="skip-to-content" class="primary">${skipLinkText}</button>`;
                        body.insertAdjacentHTML("afterbegin", html);
                    }
                }
            }
            _renderSidebar(text) {
                const {maxLevel: maxLevel, subMaxLevel: subMaxLevel, loadSidebar: loadSidebar, hideSidebar: hideSidebar} = this.config;
                const sidebarEl = getNode("aside.sidebar");
                const sidebarNavEl = getNode(".sidebar-nav");
                const sidebarToggleEl = getNode("button.sidebar-toggle");
                if (hideSidebar) {
                    sidebarEl?.remove();
                    sidebarToggleEl?.remove();
                    return null;
                }
                if (!this.compiler) {
                    throw new Error("Compiler is not initialized");
                }
                setHTML(".sidebar-nav", this.compiler.sidebar(text, maxLevel));
                sidebarToggleEl.setAttribute("aria-expanded", String(!isMobile()));
                const activeElmHref = this.router.toURL(this.route.path);
                const activeEl = find(`.sidebar-nav a[href="${activeElmHref}"]`);
                this.#addTextAsTitleAttribute(".sidebar-nav a");
                if (loadSidebar && activeEl) {
                    const parent = activeEl.parentElement;
                    parent.innerHTML += this.compiler.subSidebar(subMaxLevel) || "";
                } else {
                    this.compiler.resetToc();
                }
                this._bindEventOnRendered(activeEl);
                const pageLinks = findAll(sidebarNavEl, 'a:is(li > a, li > p > a):not(.section-link, [target="_blank"])');
                const pageLinkGroups = findAll(sidebarEl, "li").filter((elm => elm.querySelector(":scope > ul") && !elm.querySelectorAll(":scope > a, :scope > p > a").length));
                pageLinks.forEach((elm => {
                    elm.classList.add("page-link");
                }));
                pageLinkGroups.forEach((elm => {
                    elm.classList.add("group");
                    elm.querySelector(":scope > p:not(:has(> *))")?.classList.add("group-title");
                }));
            }
            _bindEventOnRendered(activeEl) {
                const {autoHeader: autoHeader} = this.config;
                this.onRender();
                if (autoHeader && activeEl) {
                    const main = getNode("#main");
                    const hasH1 = main.querySelector("h1");
                    if (!hasH1) {
                        const h1HTML = this.compiler.header(activeEl.innerText, 1);
                        const h1Node = create("div", h1HTML).firstElementChild;
                        if (h1Node) {
                            before(main, h1Node);
                        }
                    }
                }
            }
            _renderNav(text) {
                if (!text) {
                    return;
                }
                const html = this.compiler.compile(text);
                [ ".app-nav", ".app-nav-merged" ].forEach((selector => {
                    setHTML(selector, html);
                    this.#addTextAsTitleAttribute(`${selector} a`);
                }));
            }
            _renderMain(text, opt = {}, next) {
                const {response: response} = this.route;
                if (response && !response.ok && (!text || response.status !== 404)) {
                    text = `# ${response.status} - ${response.statusText}`;
                }
                this.callHook("beforeEach", text, (result => {
                    let html;
                    const callback = () => {
                        if (opt.updatedAt) {
                            html = this.#formatUpdated(html, opt.updatedAt, this.config.formatUpdated);
                        }
                        this.callHook("afterEach", html, (hookData => {
                            this.#renderMain(hookData);
                            next();
                        }));
                    };
                    if (this.isHTML) {
                        html = this.result = text;
                        callback();
                    } else {
                        prerenderEmbed({
                            compiler: this.compiler,
                            raw: result,
                            fetch: undefined
                        }, (tokens => {
                            html = this.compiler.compile(tokens);
                            callback();
                        }));
                    }
                }));
            }
            _renderCover(text, coverOnly) {
                const el = getNode(".cover");
                const rootElm = document.documentElement;
                const coverBg = getComputedStyle(rootElm).getPropertyValue("--cover-bg");
                getNode("main").classList[coverOnly ? "add" : "remove"]("hidden");
                if (!text) {
                    el.classList.remove("show");
                    return;
                }
                el.classList.add("show");
                let html = this.coverIsHTML ? text : this.compiler.cover(text);
                if (!coverBg) {
                    const mdBgMatch = html.trim().match('<p><img.*?data-origin="(.*?)".*?alt="(.*?)"[^>]*?>([^<]*?)</p>$');
                    let mdCoverBg;
                    if (mdBgMatch) {
                        const [bgMatch, bgValue, bgType] = mdBgMatch;
                        if (bgType === "color") {
                            mdCoverBg = bgValue;
                        } else {
                            const path = !isAbsolutePath(bgValue) ? getPath(this.router.getBasePath(), bgValue) : bgValue;
                            mdCoverBg = `center center / cover url(${path})`;
                        }
                        html = html.replace(bgMatch, "");
                    } else {
                        const degrees = Math.round(Math.random() * 120 / 2);
                        let hue1 = Math.round(Math.random() * 360);
                        let hue2 = Math.round(Math.random() * 360);
                        if (Math.abs(hue1 - hue2) < 50) {
                            const hueShift = Math.round(Math.random() * 25) + 25;
                            hue1 = Math.max(hue1, hue2) + hueShift;
                            hue2 = Math.min(hue1, hue2) - hueShift;
                        }
                        if (window?.CSS?.supports("color", "oklch(0 0 0 / 1%)")) {
                            const l = 90;
                            const c = 20;
                            mdCoverBg = `linear-gradient(\n              ${degrees}deg,\n              oklch(${l}% ${c}% ${hue1}) 0%,\n              oklch(${l}% ${c}% ${hue2}) 100%\n            )`.replace(/\s+/g, " ");
                        } else {
                            const s = 100;
                            const l = 85;
                            const o = 100;
                            mdCoverBg = `linear-gradient(\n              ${degrees}deg,\n              hsl(${hue1} ${s}% ${l}% / ${o}%) 0%,\n              hsl(${hue2} ${s}% ${l}% / ${o}%) 100%\n            )`.replace(/\s+/g, " ");
                        }
                    }
                    rootElm.style.setProperty("--cover-bg", mdCoverBg);
                }
                setHTML(".cover-main", html);
                findAll(".cover-main > p:last-of-type > a:not([class])").forEach((elm => {
                    const buttonType = elm.matches(":first-child") ? "primary" : "secondary";
                    elm.classList.add("button", buttonType);
                }));
            }
            _updateRender() {
                this.#renderNameLink(this);
                this.#renderSkipLink(this);
            }
            initRender() {
                const config = this.config;
                this.compiler = new Compiler(config, this.router);
                window.__current_docsify_compiler__ = this.compiler;
                const id = config.el || "#app";
                const el = find(id);
                if (el) {
                    let html = "";
                    if (config.repo) {
                        html += corner(config.repo, config.cornerExternalLinkTarget);
                    }
                    if (config.coverpage) {
                        html += cover();
                    }
                    if (config.logo) {
                        const isBase64 = /^data:image/.test(config.logo);
                        const isExternal = /(?:http[s]?:)?\/\//.test(config.logo);
                        const isRelative = /^\./.test(config.logo);
                        if (!isBase64 && !isExternal && !isRelative) {
                            config.logo = getPath(this.router.getBasePath(), config.logo);
                        }
                    }
                    html += main(config);
                    setHTML(el, html, true);
                } else {
                    this.rendered = true;
                }
                if (config.loadNavbar) {
                    const navEl = find("nav") || create("nav");
                    const isMergedSidebar = config.mergeNavbar;
                    navEl.classList.add("app-nav");
                    navEl.setAttribute("aria-label", "secondary");
                    body.prepend(navEl);
                    if (isMergedSidebar) {
                        const mergedNavEl = create("div");
                        const sidebarEl = find(".sidebar");
                        const sidebarNavEl = find(".sidebar-nav");
                        mergedNavEl?.classList.add("app-nav-merged");
                        sidebarEl?.insertBefore(mergedNavEl, sidebarNavEl);
                    }
                }
                if (config.themeColor) {
                    const themeNode = create("div", theme(config.themeColor)).firstElementChild;
                    if (themeNode) {
                        $$1.head.appendChild(themeNode);
                    }
                }
                this._updateRender();
                body.classList.add("ready");
            }
        };
    }
    function Fetch(Base) {
        return class Fetch extends Base {
            #loadNested(path, qs, file, next, vm, first) {
                path = first ? path : path.replace(/\/$/, "");
                path = getParentPath(path);
                if (!path) {
                    return;
                }
                get(vm.router.getFile(path + file) + qs, false, vm.config.requestHeaders).then(next, (_error => this.#loadNested(path, qs, file, next, vm)));
            }
            #last;
            #abort=() => this.#last && this.#last.abort && this.#last.abort();
            #request=(url, requestHeaders) => {
                this.#abort();
                this.#last = get(url, true, requestHeaders);
                return this.#last;
            };
            #get404Path=(path, config) => {
                const {notFoundPage: notFoundPage, ext: ext} = config;
                const defaultPath = "_404" + (ext || ".md");
                let key;
                let path404;
                switch (typeof notFoundPage) {
                  case "boolean":
                    path404 = defaultPath;
                    break;

                  case "string":
                    path404 = notFoundPage;
                    break;

                  case "object":
                    key = Object.keys(notFoundPage).sort(((a, b) => b.length - a.length)).filter((k => path.match(new RegExp("^" + k))))[0];
                    path404 = key && notFoundPage[key] || defaultPath;
                    break;
                }
                return path404;
            };
            _loadSideAndNav(path, qs, loadSidebar, cb) {
                return () => {
                    const renderSidebar = result => {
                        this._renderSidebar(result);
                        cb();
                    };
                    if (!loadSidebar) {
                        renderSidebar(null);
                        return;
                    }
                    this.#loadNested(path, qs, loadSidebar, renderSidebar, this, true);
                };
            }
            _fetch(cb = noop) {
                const {query: query} = this.route;
                const {path: path} = this.route;
                if (isExternal(path)) {
                    history.replaceState(null, "", "#");
                    this.router.normalize();
                } else {
                    const qs = stringifyQuery(query, [ "id" ]);
                    const {loadNavbar: loadNavbar, requestHeaders: requestHeaders, loadSidebar: loadSidebar} = this.config;
                    const file = this.router.getFile(path);
                    this.isRemoteUrl = isExternal(file);
                    this.isHTML = /\.html$/g.test(file);
                    const contentFetched = (text, opt, response) => {
                        this.route.response = response;
                        this._renderMain(text, opt, this._loadSideAndNav(path, qs, loadSidebar, cb));
                    };
                    const contentFailedToFetch = (_error, response) => {
                        this.route.response = response;
                        this._fetchFallbackPage(path, qs, cb) || this._fetch404(file, qs, cb);
                    };
                    if (!this.isRemoteUrl) {
                        this.matchVirtualRoute(path).then((contents => {
                            if (typeof contents === "string") {
                                contentFetched(contents);
                            } else {
                                this.#request(file + qs, requestHeaders).then(contentFetched, contentFailedToFetch);
                            }
                        }));
                    } else {
                        this.#request(file + qs, requestHeaders).then(contentFetched, contentFailedToFetch);
                    }
                    loadNavbar && this.#loadNested(path, qs, loadNavbar, (text => this._renderNav(text)), this, true);
                }
            }
            _fetchCover() {
                const {coverpage: coverpage, requestHeaders: requestHeaders} = this.config;
                const query = this.route.query;
                const root = getParentPath(this.route.path);
                if (coverpage) {
                    let path = null;
                    const routePath = this.route.path;
                    if (typeof coverpage === "string") {
                        if (routePath === "/") {
                            path = coverpage;
                        }
                    } else if (Array.isArray(coverpage)) {
                        path = coverpage.indexOf(routePath) > -1 && "_coverpage";
                    } else {
                        const cover = coverpage[routePath];
                        path = cover === true ? "_coverpage" : cover;
                    }
                    const coverOnly = Boolean(path) && this.config.onlyCover;
                    if (path) {
                        path = this.router.getFile(root + path);
                        this.coverIsHTML = /\.html$/g.test(path);
                        get(path + stringifyQuery(query, [ "id" ]), false, requestHeaders).then((text => this._renderCover(text, coverOnly)));
                    } else {
                        this._renderCover(null, coverOnly);
                    }
                    return coverOnly;
                }
            }
            $fetch(cb = noop, onNavigate = this.onNavigate.bind(this)) {
                const done = () => {
                    this.callHook("doneEach");
                    cb();
                };
                const onlyCover = this._fetchCover();
                if (onlyCover) {
                    done();
                } else {
                    this._fetch((() => {
                        onNavigate();
                        done();
                    }));
                }
            }
            _fetchFallbackPage(path, qs, cb = noop) {
                const {requestHeaders: requestHeaders, fallbackLanguages: fallbackLanguages, fallbackDefaultLanguage: fallbackDefaultLanguage, loadSidebar: loadSidebar} = this.config;
                if (!fallbackLanguages) {
                    return false;
                }
                const local = path.split("/")[1];
                if (fallbackLanguages.indexOf(local) === -1) {
                    return false;
                }
                const newPath = this.router.getFile(path.replace(new RegExp(`^/${local}`), fallbackDefaultLanguage));
                const req = this.#request(newPath + qs, requestHeaders);
                req.then(((text, opt) => this._renderMain(text, opt, this._loadSideAndNav(path, qs, loadSidebar, cb))), (_error => this._fetch404(path, qs, cb)));
                return true;
            }
            _fetch404(path, qs, cb = noop) {
                const {loadSidebar: loadSidebar, requestHeaders: requestHeaders, notFoundPage: notFoundPage} = this.config;
                const fnLoadSideAndNav = this._loadSideAndNav(path, qs, loadSidebar, cb);
                if (notFoundPage) {
                    const path404 = this.#get404Path(path, this.config);
                    this.#request(this.router.getFile(path404), requestHeaders).then(((text, opt) => this._renderMain(text, opt, fnLoadSideAndNav)), (_error => this._renderMain(null, {}, fnLoadSideAndNav)));
                    return true;
                }
                this._renderMain(null, {}, fnLoadSideAndNav);
                return false;
            }
            initFetch() {
                this.$fetch((() => this.callHook("ready")));
            }
        };
    }
    function Events(Base) {
        return class Events extends Base {
            #intersectionObserver=new IntersectionObserver((() => {}));
            #isScrolling=false;
            #title=$$1.title;
            initEvent() {
                const {topMargin: topMargin} = this.config;
                if (topMargin) {
                    const value = typeof topMargin === "number" ? `${topMargin}px` : topMargin;
                    document.documentElement.style.setProperty("--scroll-padding-top", value);
                }
                this.#initCover();
                this.#initSkipToContent();
                this.#initSidebar();
                this.#initSidebarToggle();
                this.#initKeyBindings();
            }
            #initCover() {
                const coverElm = find("section.cover");
                if (!coverElm) {
                    body.classList.add("sticky");
                    return;
                }
                const observer = new IntersectionObserver((entries => {
                    const isIntersecting = entries[0].isIntersecting;
                    const op = isIntersecting ? "remove" : "add";
                    body.classList[op]("sticky");
                }), {
                    threshold: .01
                });
                observer.observe(coverElm);
            }
            #initHeadings() {
                const headingElms = findAll("#main :where(h1, h2, h3, h4, h5, h6)");
                const headingsInView = new Set;
                let isInitialLoad = true;
                this.#intersectionObserver?.disconnect();
                this.#intersectionObserver = new IntersectionObserver((entries => {
                    if (isInitialLoad) {
                        isInitialLoad = false;
                        return;
                    }
                    if (this.#isScrolling) {
                        return;
                    }
                    for (const entry of entries) {
                        const op = entry.isIntersecting ? "add" : "delete";
                        headingsInView[op](entry.target);
                    }
                    let activeHeading;
                    if (headingsInView.size === 1) {
                        activeHeading = headingsInView.values().next().value;
                    } else if (headingsInView.size > 1) {
                        activeHeading = Array.from(headingsInView).reduce(((closest, current) => !closest || closest.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_FOLLOWING ? current : closest), null);
                    }
                    if (activeHeading) {
                        const id = activeHeading.getAttribute("id");
                        const href = this.router.toURL(this.router.getCurrentPath(), {
                            id: id
                        });
                        const newSidebarActiveElm = this.#markSidebarActiveElm(href);
                        newSidebarActiveElm?.scrollIntoView({
                            behavior: "instant",
                            block: "nearest",
                            inline: "nearest"
                        });
                    }
                }), {
                    rootMargin: "0% 0% -50% 0%"
                });
                headingElms.forEach((elm => {
                    this.#intersectionObserver.observe(elm);
                }));
            }
            #initKeyBindings() {
                const {keyBindings: keyBindings} = this.config;
                const modifierKeys = [ "alt", "ctrl", "meta", "shift" ];
                if (keyBindings && keyBindings.constructor === Object) {
                    Object.values(keyBindings || []).forEach((bindingConfig => {
                        const {bindings: bindings} = bindingConfig;
                        if (!bindings) {
                            return;
                        }
                        bindingConfig.bindings = Array.isArray(bindings) ? bindings : [ bindings ];
                        bindingConfig.bindings = bindingConfig.bindings.map((keys => {
                            const sortedKeys = [ [], [] ];
                            if (typeof keys === "string") {
                                keys = keys.split("+");
                            }
                            keys.forEach((key => {
                                const isModifierKey = modifierKeys.includes(key);
                                const targetArray = sortedKeys[isModifierKey ? 0 : 1];
                                const newKeyValue = key.trim().toLowerCase();
                                targetArray.push(newKeyValue);
                            }));
                            sortedKeys.forEach((arr => arr.sort()));
                            return sortedKeys.flat();
                        }));
                    }));
                    on("keydown", (e => {
                        const isTextEntry = document.activeElement.matches("input, select, textarea");
                        if (isTextEntry) {
                            return;
                        }
                        const bindingConfigs = Object.values(keyBindings || []);
                        const matchingConfigs = bindingConfigs.filter((({bindings: bindings}) => bindings && bindings.some((keys => keys.every((k => modifierKeys.includes(k) && e[k + "Key"] || e.key === k || e.code.toLowerCase() === k || e.code.toLowerCase() === `key${k}`))))));
                        matchingConfigs.forEach((({callback: callback}) => {
                            e.preventDefault();
                            callback(e);
                        }));
                    }));
                }
            }
            #initSidebar() {
                const sidebarElm = document.querySelector(".sidebar");
                if (!sidebarElm) {
                    return;
                }
                window?.matchMedia?.(`(max-width: ${mobileBreakpoint})`).addEventListener("change", (evt => {
                    this.#toggleSidebar(!evt.matches);
                }));
                on(sidebarElm, "click", (({target: target}) => {
                    const linkElm = target.closest("a");
                    const linkParent = linkElm?.closest("li");
                    const hasSubSidebar = linkParent?.querySelector(".app-sub-sidebar");
                    if (hasSubSidebar) {
                        linkParent.classList.toggle("collapse");
                    }
                }));
            }
            #initSidebarToggle() {
                const contentElm = find("main > .content");
                const toggleElm = find("button.sidebar-toggle");
                if (!toggleElm) {
                    return;
                }
                let lastContentFocusElm;
                on(contentElm, "focusin", (e => {
                    const focusAttr = "data-restore-focus";
                    lastContentFocusElm?.removeAttribute(focusAttr);
                    lastContentFocusElm = e.target;
                    lastContentFocusElm.setAttribute(focusAttr, "");
                }));
                on(toggleElm, "click", (e => {
                    e.stopPropagation();
                    this.#toggleSidebar();
                }));
            }
            #initSkipToContent() {
                const skipElm = document.querySelector("#skip-to-content");
                if (!skipElm) {
                    return;
                }
                skipElm.addEventListener("click", (evt => {
                    const focusElm = this.#focusContent();
                    evt.preventDefault();
                    focusElm?.scrollIntoView({
                        behavior: "smooth"
                    });
                }));
            }
            onRender() {
                const {name: name} = this.config;
                const currentPath = this.router.toURL(this.router.getCurrentPath());
                const currentSection = find(`.sidebar a[href='${currentPath}']`)?.getAttribute("title");
                const currentTitle = name ? currentSection ? `${currentSection} - ${name}` : name : currentSection;
                $$1.title = currentTitle || this.#title;
                this.#markAppNavActiveElm();
                this.#markSidebarCurrentPage();
                this.#initHeadings();
            }
            onNavigate(source) {
                const {auto2top: auto2top, topMargin: topMargin} = this.config;
                const {path: path, query: query} = this.route;
                const activeSidebarElm = this.#markSidebarActiveElm();
                if (source !== "history") {
                    if (query.id) {
                        const headingElm = find(`.markdown-section :where(h1, h2, h3, h4, h5, h6)[id="${query.id}"]`);
                        if (headingElm) {
                            this.#watchNextScroll();
                            headingElm.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }
                    } else if (source === "navigate") {
                        if (auto2top) {
                            document.scrollingElement.scrollTop = topMargin ?? 0;
                        }
                    }
                }
                const isNavigate = source === "navigate";
                const hasId = "id" in query;
                const noSubSidebar = !activeSidebarElm?.querySelector(".app-sub-sidebar");
                const shouldCloseSidebar = path === "/" || isNavigate && (hasId || noSubSidebar);
                if (shouldCloseSidebar && isMobile()) {
                    this.#toggleSidebar(false);
                }
                if (hasId || isNavigate) {
                    this.#focusContent();
                }
            }
            #focusContent(options = {}) {
                const settings = {
                    preventScroll: true,
                    ...options
                };
                const {query: query} = this.route;
                const focusEl = query.id ? find(`#${query.id}`) : find("#main :where(h1, h2, h3, h4, h5, h6)") || find("#main");
                if (focusEl) {
                    if (!focusEl.hasAttribute("tabindex")) {
                        focusEl.setAttribute("tabindex", "-1");
                        focusEl.setAttribute("data-added-tabindex", "true");
                    }
                    if (focusEl.hasAttribute("data-added-tabindex")) {
                        focusEl.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                    focusEl.focus(settings);
                }
                return focusEl;
            }
            #markAppNavActiveElm() {
                const href = decodeURIComponent(this.router.toURL(this.route.path));
                [ ".app-nav", ".app-nav-merged" ].forEach((selector => {
                    const navElm = find(selector);
                    if (!navElm) {
                        return;
                    }
                    const newActive = findAll(navElm, "a").sort(((a, b) => b.href.length - a.href.length)).find((a => href.includes(a.getAttribute("href")) || href.includes(decodeURI(a.getAttribute("href")))))?.closest("li");
                    const oldActive = find(navElm, "li.active");
                    if (newActive && newActive !== oldActive) {
                        oldActive?.classList.remove("active");
                        newActive.classList.add("active");
                    }
                }));
            }
            #markSidebarActiveElm(href) {
                href ??= this.router.toURL(this.router.getCurrentPath());
                const sidebar = find(".sidebar");
                if (!sidebar) {
                    return;
                }
                href = stripUrlExceptId(href);
                const oldActive = find(sidebar, "li.active");
                const newActive = find(sidebar, `a[href="${href}"], a[href="${decodeURIComponent(href)}"]`)?.closest("li");
                if (newActive && newActive !== oldActive) {
                    oldActive?.classList.remove("active");
                    newActive.classList.add("active");
                }
                return newActive;
            }
            #markSidebarCurrentPage(href) {
                href ??= this.router.toURL(this.route.path);
                const sidebar = find(".sidebar");
                if (!sidebar) {
                    return;
                }
                const path = href?.split("?")[0];
                const oldPage = find(sidebar, "li[aria-current]");
                const newPage = find(sidebar, `a[href="${path}"], a[href="${decodeURIComponent(path)}"]`)?.closest("li");
                if (newPage && newPage !== oldPage) {
                    oldPage?.removeAttribute("aria-current");
                    newPage.setAttribute("aria-current", "page");
                }
                return newPage;
            }
            #toggleSidebar(force) {
                const sidebarElm = find(".sidebar");
                if (!sidebarElm) {
                    return;
                }
                const ariaElms = findAll('[aria-controls="__sidebar"]');
                const inertElms = findAll("body > *:not(main, script), main > .content");
                const isShow = sidebarElm.classList.toggle("show", force);
                ariaElms.forEach((toggleElm => {
                    const expanded = force ?? sidebarElm.classList.contains("show");
                    toggleElm.setAttribute("aria-expanded", String(expanded));
                    toggleElm.setAttribute("aria-label", expanded ? "Hide primary navigation" : "Show primary navigation");
                }));
                if (isShow && isMobile()) {
                    inertElms.forEach((elm => elm.setAttribute("inert", "")));
                } else {
                    inertElms.forEach((elm => elm.removeAttribute("inert")));
                }
                if (isShow) {
                    sidebarElm.focus();
                } else {
                    const restoreElm = document.querySelector("main > .content [data-restore-focus]");
                    if (restoreElm) {
                        restoreElm.focus({
                            preventScroll: true
                        });
                    }
                }
            }
            #watchNextScroll() {
                document.addEventListener("scroll", (() => {
                    this.#isScrolling = true;
                    if ("onscrollend" in window) {
                        document.addEventListener("scrollend", (() => this.#isScrolling = false), {
                            once: true
                        });
                    } else {
                        let scrollTimer;
                        const callback = () => {
                            clearTimeout(scrollTimer);
                            scrollTimer = setTimeout((() => {
                                document.removeEventListener("scroll", callback);
                                this.#isScrolling = false;
                            }), 100);
                        };
                        document.addEventListener("scroll", callback, false);
                    }
                }), {
                    once: true
                });
            }
        };
    }
    function makeExactMatcher(matcher) {
        const matcherWithBeginningOfInput = matcher.startsWith("^") ? matcher : `^${matcher}`;
        const matcherWithBeginningAndEndOfInput = matcherWithBeginningOfInput.endsWith("$") ? matcherWithBeginningOfInput : `${matcherWithBeginningOfInput}$`;
        return matcherWithBeginningAndEndOfInput;
    }
    function createNextFunction() {
        let storedCb = () => {};
        function next(value) {
            storedCb(value);
        }
        function onNext(cb) {
            storedCb = cb;
        }
        return [ next, onNext ];
    }
    function VirtualRoutes(Base) {
        return class VirtualRoutes extends Base {
            routes() {
                return this.config.routes || {};
            }
            matchVirtualRoute(path) {
                const virtualRoutes = this.routes();
                const virtualRoutePaths = Object.keys(virtualRoutes);
                let done = () => null;
                function asyncMatchNextRoute() {
                    const virtualRoutePath = virtualRoutePaths.shift();
                    if (!virtualRoutePath) {
                        return done(null);
                    }
                    const matcher = makeExactMatcher(virtualRoutePath);
                    const matched = path.match(matcher);
                    if (!matched) {
                        return asyncMatchNextRoute();
                    }
                    const virtualRouteContentOrFn = virtualRoutes[virtualRoutePath];
                    if (typeof virtualRouteContentOrFn === "string") {
                        const contents = virtualRouteContentOrFn;
                        return done(contents);
                    }
                    if (typeof virtualRouteContentOrFn === "function") {
                        const fn = virtualRouteContentOrFn;
                        const [next, onNext] = createNextFunction();
                        onNext((contents => {
                            if (typeof contents === "string") {
                                return done(contents);
                            } else if (contents === false) {
                                return done(null);
                            } else {
                                return asyncMatchNextRoute();
                            }
                        }));
                        if (fn.length <= 2) {
                            const returnedValue = fn(path, matched);
                            return next(returnedValue);
                        } else {
                            return fn(path, matched, next);
                        }
                    }
                    return asyncMatchNextRoute();
                }
                return {
                    then(cb) {
                        done = cb;
                        asyncMatchNextRoute();
                    }
                };
            }
        };
    }
    const currentScript = document.currentScript;
    const defaultDocsifyConfig = () => ({
        alias: {},
        auto2top: false,
        autoHeader: false,
        basePath: "",
        catchPluginErrors: true,
        cornerExternalLinkTarget: "_blank",
        coverpage: "",
        el: "#app",
        executeScript: null,
        ext: ".md",
        externalLinkRel: "noopener",
        externalLinkTarget: "_blank",
        fallbackLanguages: null,
        fallbackDefaultLanguage: "",
        formatUpdated: "",
        frontMatter: null,
        hideSidebar: false,
        homepage: "README.md",
        keyBindings: {},
        loadNavbar: null,
        loadSidebar: null,
        logo: false,
        markdown: null,
        maxLevel: 6,
        mergeNavbar: false,
        name: "",
        nameLink: window.location.pathname,
        nativeEmoji: false,
        noCompileLinks: [],
        noEmoji: false,
        notFoundPage: false,
        onlyCover: false,
        plugins: [],
        relativePath: false,
        repo: "",
        requestHeaders: {},
        routerMode: "hash",
        routes: {},
        skipLink: "Skip to main content",
        subMaxLevel: 0,
        vueComponents: {},
        vueGlobalOptions: {},
        vueMounts: {},
        get themeColor() {
            return this.__themeColor;
        },
        set themeColor(value) {
            if (value) {
                this.__themeColor = value;
                console.warn(stripIndent(`\n          $docsify.themeColor is deprecated as of v5. Use the "--theme-color" CSS property to customize your theme color.\n          <style>\n            :root {\n              --theme-color: deeppink;\n            }\n          </style>\n        `).trim());
            }
        },
        __themeColor: "",
        get topMargin() {
            return this.__topMargin;
        },
        set topMargin(value) {
            if (value) {
                this.__topMargin = value;
                console.warn(stripIndent(`\n          $docsify.topMargin is deprecated as of v5. Use the "--scroll-padding-top" CSS property to specify a scroll margin when using a sticky navbar.\n          <style>\n            :root {\n              --scroll-padding-top: 10px;\n            }\n          </style>\n        `).trim());
            }
        },
        __topMargin: 0
    });
    function config(vm, config = {}) {
        config = Object.assign(defaultDocsifyConfig(), window.$docsify, typeof window.$docsify === "function" ? window.$docsify(vm) : undefined, config);
        if (config.keyBindings !== false) {
            config.keyBindings = Object.assign({
                toggleSidebar: {
                    bindings: [ "\\" ],
                    callback(e) {
                        const toggleElm = document.querySelector(".sidebar-toggle-button");
                        if (toggleElm) {
                            toggleElm.click();
                        }
                    }
                }
            }, config.keyBindings);
        }
        const script = currentScript || Array.from(document.getElementsByTagName("script")).filter((n => /docsify\./.test(n.src)))[0];
        if (script) {
            for (const prop of Object.keys(config)) {
                const val = script.getAttribute("data-" + hyphenate(prop));
                if (isPrimitive(val)) {
                    console.warn(`DEPRECATION: data-* attributes on the docsify global script (f.e. ${"data-" + hyphenate(prop)}) are deprecated.`);
                    config[prop] = val === "" ? true : val;
                }
            }
        }
        if (config.loadSidebar === true) {
            config.loadSidebar = "_sidebar" + config.ext;
        }
        if (config.loadNavbar === true) {
            config.loadNavbar = "_navbar" + config.ext;
        }
        if (config.coverpage === true) {
            config.coverpage = "_coverpage" + config.ext;
        }
        if (config.name === true) {
            config.name = "";
        }
        return config;
    }
    function Lifecycle(Base) {
        return class Lifecycle extends Base {
            _hooks={};
            _lifecycle={};
            initLifecycle() {
                const hooks = [ "init", "mounted", "beforeEach", "afterEach", "doneEach", "ready" ];
                hooks.forEach((hook => {
                    const arr = this._hooks[hook] = [];
                    this._lifecycle[hook] = fn => arr.push(fn);
                }));
            }
            callHook(hookName, data, next = noop) {
                const queue = this._hooks[hookName];
                const catchPluginErrors = this.config.catchPluginErrors;
                const step = function(index) {
                    const hookFn = queue[index];
                    if (index >= queue.length) {
                        next(data);
                    } else if (typeof hookFn === "function") {
                        const errTitle = "Docsify plugin error";
                        if (hookFn.length === 2) {
                            try {
                                hookFn(data, (result => {
                                    data = result === undefined ? data : result;
                                    step(index + 1);
                                }));
                            } catch (err) {
                                if (catchPluginErrors) {
                                    console.error(errTitle, err);
                                } else {
                                    throw err;
                                }
                                step(index + 1);
                            }
                        } else {
                            try {
                                const result = hookFn(data);
                                data = result === undefined ? data : result;
                                step(index + 1);
                            } catch (err) {
                                if (catchPluginErrors) {
                                    console.error(errTitle, err);
                                } else {
                                    throw err;
                                }
                                step(index + 1);
                            }
                        }
                    } else {
                        step(index + 1);
                    }
                };
                step(0);
            }
        };
    }
    var util = Object.freeze({
        __proto__: null,
        cached: cached$1,
        cleanPath: cleanPath,
        getParentPath: getParentPath,
        getPath: getPath,
        hyphenate: hyphenate,
        isAbsolutePath: isAbsolutePath,
        isExternal: isExternal,
        isFn: isFn,
        isMobile: isMobile,
        isPrimitive: isPrimitive,
        mobileBreakpoint: mobileBreakpoint,
        noop: noop,
        parseQuery: parseQuery,
        removeParams: removeParams,
        replaceSlug: replaceSlug,
        resolvePath: resolvePath,
        stringifyQuery: stringifyQuery,
        stripUrlExceptId: stripUrlExceptId
    });
    class Docsify extends(Fetch(Events(Render(VirtualRoutes(Router(Lifecycle(Object))))))){
        config;
        constructor(conf = {}) {
            super();
            this.config = config(this, conf);
            this.initLifecycle();
            this.initPlugin();
            this.callHook("init");
            this.initRouter();
            this.initRender();
            this.initEvent();
            this.initFetch();
            this.callHook("mounted");
        }
        initPlugin() {
            this.config.plugins.forEach((fn => {
                try {
                    isFn(fn) && fn(this._lifecycle, this);
                } catch (err) {
                    if (this.config.catchPluginErrors) {
                        const errTitle = "Docsify plugin error";
                        console.error(errTitle, err);
                    } else {
                        throw err;
                    }
                }
            }));
        }
    }
    function initGlobalAPI() {
        window.Docsify = {
            util: util,
            dom: dom,
            get: get,
            slugify: slugify,
            version: "5.0.0-rc.3"
        };
        window.DocsifyCompiler = Compiler;
        window.marked = d;
        window.Prism = prism$1;
    }
    initGlobalAPI();
    documentReady((() => new Docsify));
})();
