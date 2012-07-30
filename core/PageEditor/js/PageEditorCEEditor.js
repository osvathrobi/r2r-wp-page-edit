
var PageEditorCEEditor = {
    init : function() {
        $('#main_ul').after($('#pe_ce_editor_dialogs').html());

        $('.cancel_button').live('click',function() {
            $('#dialog_ce_edit').dialog("close"); 
        });
        PageEditorCEEditor.ceEditDialog = $('#dialog_ce_edit').dialog({
            /*width : '70%',*/
            /*height : '400',*/
            modal : true,
            autoOpen : false,
            close : function(event, ui) {
                $("body").css("overflow", "auto"); // unlock the screen scroll
            },
            open : function(event, ui) {
                $("body").css("overflow", "hidden"); // lock the screen
                // scroll
            },
            buttons: [
                {
                    text: "Save",
                    click: function() {
                        $('#dialog_ce_edit').find('.pe_ce_data').each(function() {
                            // get editor field dataid
                            var v = $(this).attr('class');
                            v = v.replace('pe_ce_data','');
                            v = $.trim(v);
                            
                            // set the field in the workspace area                            
                            $('#' + PageEditorCEEditor.currentlyEditing).find('.' + v).html( $(this).attr('value') );
                            
                        });
                    
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Cancel",
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ]
        });
        
    },
    showEditDialog : function(ce_module_id, ce_type) {
        
        // Load up editor
        var cnt = $('#tmpl_module_' + ce_type + "_editor").html();
        $('#dialog_ce_edit').html(cnt);
        
        // Load data from edited content element
        $('#dialog_ce_edit').find('.pe_ce_data').each(function() {
            // get editor field dataid
            var v = $(this).attr('class');
            v = v.replace('pe_ce_data','');
            v = $.trim(v);
            
            // set the field in the editor
            source = $('#' + ce_module_id).find('.' + v).html();
            $(this).attr('value', source);
        });
        
        PageEditorCEEditor.currentlyEditing = ce_module_id;
        
        PageEditorCEEditor.ceEditDialog.dialog('open');
    },
    
    currentlyEditing:-1
};
