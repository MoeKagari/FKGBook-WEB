var FKGBook = {
    "data": {
        "chara": [],
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
}

FKGBook.tool.delayLoad = (array, preLoadSize, loadHandler, blockSize, blockLoadDelayTime) => {
    preLoadSize = Math.min(array.length, preLoadSize);

    for (var index = 0; index < preLoadSize; index++) {
        loadHandler(array[index], index);
    }

    var getBlockDelayHandler = (nextHandler, start, end) => {
        return function() {
            setTimeout(function() {
                start = preLoadSize + start;
                end = Math.min(array.length, preLoadSize + end);
                for (var index = start; index < end; index++) {
                    loadHandler(array[index], index);
                }

                nextHandler();
            }, blockLoadDelayTime);
        };
    };
    var blockNumber = Math.floor((array.length - preLoadSize) / blockSize);
    var delayFunction = () => {};
    for (var index = blockNumber; index >= 0; index--) {
        delayFunction = getBlockDelayHandler(delayFunction, index * blockSize, (index + 1) * blockSize);
    }
    delayFunction();
}

window.onload = function() {
    console.time("data.init");
    FKGBook.data.init();
    console.timeEnd("data.init");

    console.time("table.init");
    FKGBook.table.init();
    console.timeEnd("table.init");

    console.time("detail.init");
    FKGBook.detail.init();
    console.timeEnd("detail.init");
}
