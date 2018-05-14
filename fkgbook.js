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
        "table": {
            "backgroundColor": { //table background color
                "header": "#09294a88", //列头
                "hover": "#99ccff28", //行 - 鼠标移入
                //行index从0开始
                "odd": "#99999910", //奇数行
                "even": "#99999908" //偶数行
            }
        }
    },
    "detail": {
        "version": {},
        "update": {}
    },
    "tool": {}
}

FKGBook.tool.extraTotalHeight = style =>
    parseInt(style.css("marginTop")) + parseInt(style.css("marginBottom")) +
    parseInt(style.css("borderTop")) + parseInt(style.css("borderBottom")) +
    parseInt(style.css("paddingTop")) + parseInt(style.css("paddingBottom"));

FKGBook.tool.append = (parentJqueryObj, childJqueryObj) => {
    if (childJqueryObj) {
        if (Array.isArray(childJqueryObj)) {
            childJqueryObj.forEach(function(child) {
                parentJqueryObj.append(child);
            });
        } else {
            parentJqueryObj.append(childJqueryObj);
        }
    }
    return parentJqueryObj;
}

FKGBook.tool.delayLoad = (array, preLoadSize, loadHandler, blockSize, blockLoadDelayTime) => {
    var getBlockDelayHandler = (blockName, nextHandler, start, end) => {
        return function() {
            console.time(blockName);
            start = start;
            end = Math.min(array.length, end);
            for (var index = start; index < end; index++) {
                loadHandler(array[index], index);
            }
            console.timeEnd(blockName);

            if (nextHandler != null) {
                setTimeout(nextHandler, blockLoadDelayTime);
            }
        };
    };

    preLoadSize = Math.min(array.length, preLoadSize);

    var delayFunction = null;
    for (var index = Math.floor((array.length - preLoadSize) / blockSize); index >= 0; index--) {
        delayFunction = getBlockDelayHandler(
            "block" + (index + 1),
            delayFunction, preLoadSize + index * blockSize, preLoadSize + (index + 1) * blockSize
        );
    }
    getBlockDelayHandler("block0", delayFunction, 0, preLoadSize)();
}
