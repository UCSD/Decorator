! function(a) {
    a.fn.wizard = function() {
        function b(a) {
            a.hasClass("first") && (a.hasClass("current") ? a.addClass("current_first") : a.hasClass("visited") && a.addClass("visited_first")), a.hasClass("last") && (a.hasClass("current") ? a.addClass("current_last") : a.hasClass("not_visited") && a.addClass("not_visited_last"))
        }
        this.each(function() {
            var c = a(this).find("li"),
                d = !0;
            c.each(function(e) {
                var f = a(this);
                0 == e && f.addClass("first"), e == c.length - 1 && f.addClass("last"), d ? f.hasClass("current") ? d = !1 : (f.addClass("visited"), 0 < f.find("div a").length && f.addClass("visit")) : f.addClass("not_visited"), b(f), f.hover(function() {
                    f.hasClass("first") ? f.hasClass("visit") && (f.removeClass("visited_first"), f.addClass("hover_first")) : f.hasClass("visit") && f.addClass("hover")
                }, function() {
                    f.hasClass("first") ? f.hasClass("visit") && (f.removeClass("hover_first"), f.addClass("visited_first")) : f.hasClass("visit") && f.removeClass("hover")
                })
            })
        })
    }
}(jQuery)
