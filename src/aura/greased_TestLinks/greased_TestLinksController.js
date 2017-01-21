({
    doInit: function (component, event, helper) {
        var links = component.get("v.links");
        var linksPerRow = component.get("v.linksPerRow");
        var rows = [];

        var rowCount = Math.floor(links.length / linksPerRow) + 1;

        for (var i = 0; i < rowCount; i++) {
            var row = [];
            for (var j = 0; j < linksPerRow; j++) {
                var pos = (i * linksPerRow) + j;
                if (links[pos]) {
                    var path = (links[pos].split("/"));
                    var app = path[path.length - 1].split(".");
                    row.push({uri: links[pos], label: app[0]});
                } else {
                    row.push({});
                }
            }
            rows.push(row);
        }

        component.set("v.rows", rows);
    },
    runAll: function (component, event, helper) {
        var links = component.get("v.links");
        for (var i = 0; i < links.length; i++) {
            window.open(links[i], "test" + i);
        }
    }
})