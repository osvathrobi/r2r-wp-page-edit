var PageEditorDialogs = {
    init : function() {
        $('#main_ul').after($('#pe_dialogs').html());
        
        PageEditorDialogs.addRowDialog = $('#dialog_add_row').dialog({
            width : '70%',
            height : '400',
            modal : true,
            autoOpen : false,
            close : function(event, ui) {
                $("body").css("overflow", "auto"); // unlock the screen scroll
            },
            open : function(event, ui) {
                $("body").css("overflow", "hidden"); // lock the screen
                                                        // scroll
            }
        });
        
        $('.new_row_layout').live('click',function() {
            PageEditorDialogs.addRowDialog.dialog('close');
            PageEditor.onAddRowDialogSelect($(this).attr('id'));
        });
        
        
        
        PageEditorDialogs.addNewCEDialog = $('#dialog_add_ce').dialog({
            width : '70%',
            height : '400',
            modal : true,
            autoOpen : false,
            close : function(event, ui) {
                $("body").css("overflow", "auto"); // unlock the screen scroll
            },
            open : function(event, ui) {
                $("body").css("overflow", "hidden"); // lock the screen
                                                        // scroll
            }
        });
        
        $('.pe_new_ce').live('click', function() {
            PageEditorDialogs.addNewCEDialog.dialog('close');
            PageEditor.onNewCEDialogSelect($(this).attr('id'));
        });
    }

};
