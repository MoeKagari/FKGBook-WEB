FKGBook.table.option.init = function() {
    FKGBook.table.option.button.init();
    FKGBook.table.option.select.init();
}

FKGBook.table.option.getFilter = function() {
    var button_filter = FKGBook.table.option.button.getFilter();
    var select_filter = FKGBook.table.option.select.getFilter();
    return tbody_tr => button_filter(tbody_tr) && select_filter(tbody_tr);
}
