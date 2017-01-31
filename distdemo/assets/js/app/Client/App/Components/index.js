"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// root and page management
__export(require("./site-root"));
__export(require("./site-nav"));
// standard pages
__export(require("./site-about"));
// app pages
__export(require("./app-dashboard"));
__export(require("./app-editor"));
__export(require("./app-widgets"));
// app : editor
__export(require("./editor/list"));
__export(require("./editor/delete"));
__export(require("./editor/edit"));
__export(require("./editor/new"));
// app : widgets
__export(require("./widgets/list"));
__export(require("./widgets/analogclock"));
__export(require("./widgets/loadericon"));
__export(require("./widgets/treeview"));
