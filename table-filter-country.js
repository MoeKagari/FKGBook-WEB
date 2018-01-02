var countryValue = 0;
var countryEnum = {
    "无": 0,
    "ウィンターローズ": 1,
    "バナナオーシャン": 2,
    "ブロッサムヒル": 3,
    "ベルガモットバレー": 4,
    "リリィウッド": 5,
    "ロータスレイク": 7
};

function countryFilter(data) {
    return countryValue == 0 || countryValue == data["country"];
}
