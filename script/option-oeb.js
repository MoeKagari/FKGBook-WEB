FKGBook.option.oeb = {};
FKGBook.option.oeb.value = 1;
FKGBook.option.oeb.enum = {
    "原始": 1,
    "进化": 2,
    "无开花": 13,
    "假开花": 4,
    "真开花": 5,
    "开花": 3,
    "最高进化": 11,
    "全部角色": 12
};
FKGBook.option.oeb.filter = function(data) {
    var oeb = data["oeb"];
    var kariBloom = data["kariBloom"];
    var hasBloom = data["hasBloom"];
    switch (this.value) {
        case 1:
        case 2:
        case 3:
            return oeb == this.value;
        case 4:
            return oeb == 3 && kariBloom;
        case 5:
            return oeb == 3 && !kariBloom;

        case 12:
            return true;
        case 11:
            switch (oeb) {
                case 1:
                    return false;
                case 2:
                    return !hasBloom;
                case 3:
                    return true;
            }
            break;
        case 13:
            switch (oeb) {
                case 1:
                    return false;
                case 2:
                    return !hasBloom;
                case 3:
                    return false;
            }
            break;
    }
    return false;
}
