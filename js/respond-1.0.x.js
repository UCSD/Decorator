(function (d, f) {
    function a() {
        o(!0)
    }
    d.respond = {};
    respond.update = function () {};
    respond.mediaQueriesSupported = f;
    if (!f) {
        var e = d.document,
            g = e.documentElement,
            p = [],
            m = [],
            i = [],
            q = {}, k = e.getElementsByTagName("head")[0] || g,
            n = k.getElementsByTagName("link"),
            r = [],
            w = function () {
                for (var b = n.length, s = 0, c, a, e, j; s < b; s++) c = n[s], a = c.href, e = c.media, j = c.rel && "stylesheet" === c.rel.toLowerCase(), a && j && !q[a] && (c.styleSheet && c.styleSheet.rawCssText ? (u(c.styleSheet.rawCssText, a, e), q[a] = !0) : (!/^([a-zA-Z]+?:(\/\/)?)/.test(a) || a.replace(RegExp.$1,
                    "").split("/")[0] === d.location.host) && r.push({
                    href: a,
                    media: e
                }));
                v()
            }, v = function () {
                if (r.length) {
                    var b = r.shift();
                    y(b.href, function (a) {
                        u(a, b.href, b.media);
                        q[b.href] = !0;
                        v()
                    })
                }
            }, u = function (b, a, c) {
                var d = b.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),
                    e = d && d.length || 0,
                    a = a.substring(0, a.lastIndexOf("/")),
                    j = function (b) {
                        return b.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + a + "$2$3")
                    }, h = !e && c,
                    f = 0,
                    g, l, i, k;
                a.length && (a += "/");
                for (h && (e = 1); f < e; f++) {
                    g = 0;
                    h ? (l = c, m.push(j(b))) : (l = d[f].match(/@media *([^\{]+)\{([\S\s]+?)$/) &&
                        RegExp.$1, m.push(RegExp.$2 && j(RegExp.$2)));
                    i = l.split(",");
                    for (k = i.length; g < k; g++) l = i[g], p.push({
                        media: l.match(/(only\s+)?([a-zA-Z]+)(\sand)?/) && RegExp.$2,
                        rules: m.length - 1,
                        minw: l.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/) && parseFloat(RegExp.$1),
                        maxw: l.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/) && parseFloat(RegExp.$1)
                    })
                }
                o()
            }, t, x, o = function (b) {
                var a = g.clientWidth,
                    c = "CSS1Compat" === e.compatMode && a || e.body.clientWidth || a,
                    a = {}, d = e.createDocumentFragment(),
                    f = n[n.length - 1],
                    j = (new Date).getTime();
                if (b && t && 30 > j - t) clearTimeout(x), x = setTimeout(o, 30);
                else {
                    t = j;
                    for (var h in p)
                        if (b = p[h], !b.minw && !b.maxw || (!b.minw || b.minw && c >= b.minw) && (!b.maxw || b.maxw && c <= b.maxw)) a[b.media] || (a[b.media] = []), a[b.media].push(m[b.rules]);
                    for (h in i) i[h] && i[h].parentNode === k && k.removeChild(i[h]);
                    for (h in a) b = e.createElement("style"), c = a[h].join("\n"), b.type = "text/css", b.media = h, b.styleSheet ? b.styleSheet.cssText = c : b.appendChild(e.createTextNode(c)), d.appendChild(b), i.push(b);
                    k.insertBefore(d, f.nextSibling)
                }
            }, y = function (a,
                             d) {
                var c = z();
                c && (c.open("GET", a, !0), c.onreadystatechange = function () {
                    4 != c.readyState || 200 != c.status && 304 != c.status || d(c.responseText)
                }, 4 != c.readyState && c.send(null))
            }, z = function () {
                var a = !1;
                try {
                    a = new XMLHttpRequest
                } catch (d) {
                    a = new ActiveXObject("Microsoft.XMLHTTP")
                }
                return function () {
                    return a
                }
            }();
        w();
        respond.update = w;
        d.addEventListener ? d.addEventListener("resize", a, !1) : d.attachEvent && d.attachEvent("onresize", a)
    }
})(this, function (d) {
        if (d.matchMedia) return !0;
        var f, a = document,
            d = a.documentElement;
        f = d.firstElementChild ||
            d.firstChild;
        var e = !a.body,
            g = a.body || a.createElement("body"),
            a = a.createElement("div");
        a.id = "mq-test-1";
        a.style.cssText = "position:absolute;top:-99em";
        g.appendChild(a);
        a.innerHTML = '_<style media="only all"> #mq-test-1 { width: 9px; }</style>';
        e && d.insertBefore(g, f);
        a.removeChild(a.firstChild);
        f = 9 == a.offsetWidth;
        e ? d.removeChild(g) : g.removeChild(a);
        return f
    }(this));