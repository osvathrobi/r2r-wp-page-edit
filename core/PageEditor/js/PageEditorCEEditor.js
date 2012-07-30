
var PageEditorCEEditor = {
    init : function() {
        $('#main_ul').after($('#pe_ce_editor_dialogs').html());

        PageEditorCEEditor.ceEditDialog = $('#dialog_ce_edit').dialog({
            /*width : '70%',*/
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
    },
    showEditDialog : function(ce_module_id, ce_type) {
        
        var cnt = $('#tmpl_module_' + ce_type + "_editor").html();
        $('#dialog_ce_edit').html(cnt);
        PageEditorCEEditor.ceEditDialog.dialog('open');
    }
};
