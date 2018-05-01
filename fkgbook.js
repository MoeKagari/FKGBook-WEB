var FKGBook = {
    "data": {
        "chara": [],
        "allChara": [],
        "icon": {},
        "newChara": [],
        "version": ""
    },
    "table": {
        "option": {
            "button": {},
            "select": {}
        },
        "table": {}
    },
    "detail": {},
    "tool": {}
}

FKGBook.tool.extraTotalHeight = style =>
    parseInt(style.css("marginTop")) + parseInt(style.css("marginBottom")) +
    parseInt(style.css("borderTop")) + parseInt(style.css("borderBottom")) +
    parseInt(style.css("paddingTop")) + parseInt(style.css("paddingBottom"));

FKGBook.tool.append = (parentJqueryObj, childJqueryObj) => {
    parentJqueryObj.append(childJqueryObj);
    return parentJqueryObj;
};

window.onload = function() {
    FKGBook.data.init();
    FKGBook.table.init();
    FKGBook.detail.init();
}
