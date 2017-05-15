$(document).on("click", "a", function (evt) {
    var href = $(this).attr("href");
    if (!href) return false;
    if (href.slice(4) !== 'http' && href.indexOf(Backbone.history.root) == 0) {
        href = href.replace(Backbone.history.root, '');
        evt.preventDefault();
        Backbone.history.navigate(href, true);
    }
});
