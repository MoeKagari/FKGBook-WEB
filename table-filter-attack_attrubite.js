var attackAttributeValue = 0;
var attackAttributeEnum = {
    "无": 0,
    "斩": 1,
    "打": 2,
    "突": 3,
    "魔": 4
};

function attackAttributeFilter(data) {
    return attackAttributeValue == 0 || attackAttributeValue == data["attackAttribute"];
}
