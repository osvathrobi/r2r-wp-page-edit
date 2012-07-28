var PageEditor = {
    row_id : 0,

    init : function() {

        PageEditor.liveAction();

        var v1 = PageEditor.addNewLayout(PageEditor.addNewRow('main_ul'), 'tmpl_rowlayout_1_column');
        PageEditor.addNewModule('zone1', v1, 'tmpl_module_text_block');

        PageEditor.addNewRowButton(PageEditor.addNewRow('main_ul'));

    },
    generateUID : function() {
        PageEditor.row_id++;
        return PageEditor.row_id;
    },
    addNewRow : function(el, prepend) {
        var el_id = 'pe_row_' + PageEditor.generateUID();
        content = {
            id : el_id,
            html : '<div id="' + el_id + '"> </div>'
        };

        var node = '<li id="li_' + PageEditor.generateUID() + '" class="pe_row_placeholder">' + tmpl_row(content) + '</li>';
        if (prepend) {
            $('#' + el).before(node);
        } else {
            $('#' + el).append(node);
        }
        return el_id;
    },
    addNewRowButton : function(el) {
        var el_id = 'btn_' + PageEditor.generateUID();
        var but = '<a href="javascript:" class="button add_new_row">Add new Row</a>';
        but += '&nbsp;&nbsp;<a href="javascript:" class="button serialize">Save</a>';

        $('#' + el).html(PageEditor.wrapInPad(but));
        return el_id;
    },
    addNewModuleButton : function(el) {
        var el_id = 'btn_' + PageEditor.generateUID();
        $('#' + el).append(PageEditor.wrapInPad('<a href="javascript:" class="button add_new_module">Add new Module</a>', 'pe_add_new_ce_button'));
        return el_id;
    },
    addNewLayout : function(el, layout_id) {
        var layout_tmpl = eval(layout_id);
        var el_id = 'layout_' + PageEditor.generateUID();
        content = {
            id : el_id
        };

        var val = layout_tmpl(content);
        $('#' + el).html(val);

        // TODO: call this after reshref so it appends to END of listing
        // add new module buttons to all zones
        var zones_count = eval("" + layout_id + "_nr_zones");
        for ( var i = 0; i < zones_count; i++) {
            PageEditor.addNewModuleButton('zone' + (i + 1) + "_" + el_id);
        }

        return el_id;
    },
    addNewModule : function(zone, el, ce_id) {
        var el_id = 'module_' + PageEditor.generateUID();
        var module_tmpl = eval(ce_id);
        content = {
            id : el_id
        };
        $('#' + zone + "_" + el).append(PageEditor.wrapInPad(module_tmpl(content), 'pe_pad_ce_module'));
        return el_id;
    },
    wrapInPad : function(html, setClass) {
        return '<div class="pe_pad ' + setClass + '">' + html + '</div>';
    },
    wrapInLi : function(html, setClass) {
        return '<li class="' + setClass + '">' + html + '</li>';
    },
    liveAction : function() {
        $('.add_new_row').live('click', function() {
            PageEditor.prependNode = $(this).parent().parent().parent().attr('id');
            PageEditorDialogs.addRowDialog.dialog('open');
        });

        $('.add_new_module').live('click', function() {
            PageEditorDialogs.addNewCEDialog.dialog('open');
            PageEditor.prependContainer = $(this).parent().parent().parent().attr('id');
            PageEditor.prependZone = ($(this).parent().parent().attr('id')).split("_")[0];
        });

        $('.pe_module_edit').live('click', function() {
            var node = $(this).parentsUntil('.pe_type_module').parent();
            PageEditor.showEditCE(node);
        });

        // setup option window
        $('.pe_container_remove').live('click', function() {
            $(this).parent().parent().parent().parent().remove();
        });

        $('.pe_ce_container').live('mouseover', function() {
            PageEditor.showCEOptionsDialog($(this));

        }).live('mouseout', function() {
            // $('#pe_ce_options').hide();
        });

        // setup 'paste here' icons
        $('.pe_paste_button').live('click', function() {
            obj = $(this);
            if (PageEditor.ce_to_copy_object.hasClass('pe_to_cut')) {
                var tempHtml = PageEditor.ce_to_copy_module;
                if (PageEditor.ce_to_copy_type == 'row') {
                    obj.after(PageEditor.wrapInLi(tempHtml, 'pe_row_placeholder'));
                } else {
                    obj.after(PageEditor.wrapInPad(tempHtml, 'pe_pad_ce_module'));
                }
                PageEditor.ce_to_copy_object.remove();

            } else {
                var tempHtml = PageEditor.ce_to_copy_module;
                if (PageEditor.ce_to_copy_type == 'row') {
                    obj.after(PageEditor.wrapInLi(tempHtml, 'pe_row_placeholder'));
                } else {
                    obj.after(PageEditor.wrapInPad(tempHtml, 'pe_pad_ce_module'));
                }
            }
            $('.pe_paste_button').remove();
        });

        // row hovering
        $('.pe_ui_row').live('mouseenter', function() {
            // $('.pe_ui_row').fadeTo(0,0.7);
            // $(this).fadeTo(0,1.0);

        });

        $('.pe_ui_row').live('mouseover', function(ev) {

            PageEditor.showRowOptionsDialog($(this));
            return false;
        }).live('mouseout', function() {
            // $('#pe_row_options').hide();
        });

    },
    onAddRowDialogSelect : function(tmpl) {
        PageEditor.addNewLayout(PageEditor.addNewRow(PageEditor.prependNode, true), (tmpl));
    },
    onNewCEDialogSelect : function(tmpl) {
        PageEditor.addNewModule(PageEditor.prependZone, PageEditor.prependContainer, tmpl);
    },
    showEditCE : function(obj) {
        CEEditor.showEditDialog(obj.attr('id'), obj.attr('type'));
    },
    showRowOptionsDialog : function(obj) {
        // set up position
        var p = obj.position();
        var $ce = $('#pe_row_options');
        var px = p.left + obj.width() - $ce.outerWidth();
        var py = p.top;
        $ce.css('left', px + "px");
        $ce.css('top', py + "px");

        // bind new events
        $('#pe_row_move_module_down').unbind();
        $('#pe_row_move_module_down').click(function() {
            var nextObj = obj.parent().next();
            var tempHtml = obj.parent().html();
            if (nextObj.hasClass('pe_row_placeholder')) {
                obj.parent().html(nextObj.html());
                nextObj.html(tempHtml);

                // refresh bindings
                $ce.hide();
            }
        });

        $('#pe_row_move_module_up').unbind();
        $('#pe_row_move_module_up').click(function() {
            var nextObj = obj.parent().prev();
            var tempHtml = obj.parent().html();
            if (nextObj.hasClass('pe_row_placeholder')) {
                obj.parent().html(nextObj.html());
                nextObj.html(tempHtml);

                // refresh bindings
                $ce.hide();
            }
        });

        $('#pe_row_copy_module').unbind();
        $('#pe_row_copy_module').click(function() {
            PageEditor.ce_to_copy_module = obj.parent().html();
            PageEditor.ce_to_copy_object = obj.parent();
            PageEditor.ce_to_copy_type = 'row';

            PageEditor.addRowPasteHereIcons();

            // clear cut classes
            $('.pe_to_cut').removeClass('pe_to_cut');

            $ce.hide();
        });

        $('#pe_row_cut_module').unbind();
        $('#pe_row_cut_module').click(function() {
            PageEditor.ce_to_copy_module = obj.parent().html();
            PageEditor.ce_to_copy_object = obj.parent();
            PageEditor.ce_to_copy_type = 'row';

            // clear previously cut items
            $('.pe_to_cut').removeClass('pe_to_cut');

            // add cut class
            PageEditor.ce_to_copy_object.addClass('pe_to_cut');

            PageEditor.addRowPasteHereIcons();

            $ce.hide();
        });

        $('#pe_row_paste_module').unbind();
        $('#pe_row_paste_module').click(function() {
            if (PageEditor.ce_to_copy_object.hasClass('pe_to_cut')) {
                var tempHtml = PageEditor.ce_to_copy_module;
                obj.parent().after(PageEditor.wrapInLi(tempHtml, 'pe_row_placeholder'));
                PageEditor.ce_to_copy_object.remove();

            } else {
                var tempHtml = PageEditor.ce_to_copy_module;
                obj.parent().after(PageEditor.wrapInLi(tempHtml, 'pe_row_placeholder'));
            }
        });
        $ce.show();
        $ce.fadeTo(0, 0.6);
    },
    showCEOptionsDialog : function(obj) {
        // set up position
        var p = obj.position();
        var $ce = $('#pe_ce_options');
        var px = p.left + obj.width() - $ce.width() - 3;
        var py = p.top + 4;
        $ce.css('left', px + "px");
        $ce.css('top', py + "px");

        // bind new events
        $('#pe_move_module_down').unbind();
        $('#pe_move_module_down').click(function() {
            var nextObj = obj.parent().next();
            var tempHtml = obj.parent().html();
            if (nextObj.hasClass('pe_pad_ce_module')) {
                obj.parent().html(nextObj.html());
                nextObj.html(tempHtml);

                // refresh bindings
                $ce.hide();
            }
        });

        $('#pe_move_module_up').unbind();
        $('#pe_move_module_up').click(function() {
            var nextObj = obj.parent().prev();
            var tempHtml = obj.parent().html();
            if (nextObj.hasClass('pe_pad_ce_module')) {
                obj.parent().html(nextObj.html());
                nextObj.html(tempHtml);

                // refresh bindings
                $ce.hide();
            }
        });

        $('#pe_copy_module').unbind();
        $('#pe_copy_module').click(function() {
            PageEditor.ce_to_copy_module = obj.parent().html();
            PageEditor.ce_to_copy_object = obj.parent();

            PageEditor.ce_to_copy_type = 'ce';

            PageEditor.addPasteHereIcons();

            // clear cut classes
            $('.pe_to_cut').removeClass('pe_to_cut');

            $ce.hide();
        });

        $('#pe_cut_module').unbind();
        $('#pe_cut_module').click(function() {
            PageEditor.ce_to_copy_module = obj.parent().html();
            PageEditor.ce_to_copy_object = obj.parent();

            PageEditor.ce_to_copy_type = 'ce';

            // clear previously cut items
            $('.pe_to_cut').removeClass('pe_to_cut');

            // add cut class
            PageEditor.ce_to_copy_object.addClass('pe_to_cut');

            PageEditor.addPasteHereIcons();

            $ce.hide();
        });

        $('#pe_paste_module').unbind();
        $('#pe_paste_module').click(function() {
            if (PageEditor.ce_to_copy_object.hasClass('pe_to_cut')) {
                var tempHtml = PageEditor.ce_to_copy_module;
                obj.parent().after(PageEditor.wrapInPad(tempHtml, 'pe_pad_ce_module'));
                PageEditor.ce_to_copy_object.remove();

            } else {
                var tempHtml = PageEditor.ce_to_copy_module;
                obj.parent().after(PageEditor.wrapInPad(tempHtml, 'pe_pad_ce_module'));
            }
        });

        // show it
        $ce.show();
    },
    addPasteHereIcons : function() {
        var tempHtml = '<div class="pe_pad pe_paste_button">' + $('#paste_form').html() + '</div>';

        // clear previously added paste here icons
        $('.pe_paste_button').remove();

        // add new icons
        $('.pe_pad_ce_module').after(tempHtml);
        $('.pe_add_new_ce_button').after(tempHtml);
    },
    addRowPasteHereIcons : function() {
        var tempHtml = '<li class="pe_pad pe_paste_button">' + $('#paste_form').html() + '</li>';

        // clear previously added paste here icons
        $('.pe_row_paste_button').remove();

        // add new icons
        $('.pe_type_row').parent().after(tempHtml);
        // $('.pe_add_new_ce_button').after(tempHtml);
    }
};

var PageEditorLoader = {
    init : function() {
        if (initModule == 'editor') {
            PageEditorDialogs.init();
            CEEditor.init();
            PageEditor.init();
        } else {
            if (initModule == 'list') {
                $('.row-actions').each(function() {
                    var v = $(this).parent().parent().attr('id').split("-")[1];
                    $(this).children(':first-child').after('<span class="edit"><a href="' + peUrl + '&post=' + v + '">Edit with PE Editor</a> | </span>');
                });

            } else {
                if (initModule == 'tabbed_editor') {
                    /* redirects to PE page */
                    // //$('#editor-toolbar #edButtonPreview').after('<a
                    // href="'+peUrl+'&post='+pePost+'" id="pe_edit_tab"
                    // class="pe_edit_tab" >PE Page Editor</a>');
                    $('#editor-toolbar #edButtonPreview').after('<a href="javascript:" id="pe_edit_tab" class="pe_edit_tab" >PE Page Editor</a>');

                    $('#editor-toolbar #edButtonPreview').click(function() {
                        $('#pe_edit_tab').removeClass('active');
                        $(this).addClass("active");

                        $('#pe_container').hide();

                        $('#ed_toolbar').show();
                        $('#editorcontainer').show();
                        $('#post-status-info').show();

                        switchEditors.go('content', 'tinymce');
                    });

                    $('#editor-toolbar #edButtonHTML').click(function() {
                        $('#pe_edit_tab').removeClass('active');
                        $(this).addClass("active");

                        $('#pe_container').hide();

                        $('#ed_toolbar').show();
                        $('#editorcontainer').show();
                        $('#post-status-info').show();

                        switchEditors.go('content', 'html');
                    });

                    $('#pe_edit_tab').click(function() {
                        $('#editor-toolbar a').removeClass('active');

                        $(this).addClass('active');

                        // change ui
                        $('#ed_toolbar').hide();
                        $('#editorcontainer').hide();
                        $('#post-status-info').hide();

                        if (!PageEditorLoader.already_initialized) {
                            // add a container
                            $('#post-status-info').after('<div id="pe_container"><ul id="main_ul"></ul></div>');

                            PageEditorDialogs.init();
                            CEEditor.init();
                            PageEditor.init();
                            PageEditorLoader.already_initialized = true;
                        } else {
                            $('#pe_container').show();
                        }

                    });
                }
            }

        }
    }
};

var CEEditor = {
    init : function() {
        $('#main_ul').after($('#pe_ce_editor_dialogs').html());

        CEEditor.ceEditDialog = $('#dialog_ce_edit').dialog({
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
        CEEditor.ceEditDialog.dialog('open');
    }
};

$(PageEditorLoader.init);