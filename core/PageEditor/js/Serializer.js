var Serializer = {
    init : function() {
        $('.serialize').live('click', function() {
            $('#debug').html(Serializer.get_it($('#main_ul')));

            // ajax save it
            var data = {
                action : 'PE_save_page',
                serialized_layout : Serializer.sanitize(Serializer.get_it($('#main_ul'))),
                post_id : pePost
            };

            jQuery.post(ajaxurl, data, function(response) {
                //alert('Got this from the server: ' + response);
            });
        });
    },
    get_it : function(id) {
        var s = '';

        if (id.hasClass('pe_type_exclude')) {
            return '';
        }

        if (id.hasClass('pe_type_row')) {
            s += '[PErow]';
        }
        if (id.hasClass('pe_type_layout')) {
            s += '[PElayout type="' + id.attr('type') + '"]';
        }
        if (id.hasClass('pe_type_zone')) {
            var zone_id = id.attr('id').split("_")[0];
            var isLast = 0;
            if (id.hasClass('pe_last')) {
                var isLast = 1;
            }
            s += '[PEzone id="' + zone_id + '" is_last="' + isLast + '"]';
        }
        if (id.hasClass('pe_type_module')) {
            s += '[PEmodule type="' + id.attr('type') + '"]';
        }

        if (id.hasClass('pe_type_param')) {
            s += '[PEmoduleParam type="' + id.attr('type') + '"]';
            s += id.html();
        }
        
        id.children().each(function() {
            s += Serializer.get_it($(this));
        });

        if (id.hasClass('pe_type_row')) {
            s += '[/PErow]';
        }
        if (id.hasClass('pe_type_layout')) {
            s += '[/PElayout]';
        }
        if (id.hasClass('pe_type_zone')) {
            s += '[/PEzone]';
        }
        if (id.hasClass('pe_type_module')) {
            s += '[/PEmodule]';
        }
        
        if (id.hasClass('pe_type_param')) {
            s += '[/PEmoduleParam]';
        }

        return s;
    },
    sanitize : function(str) {
        var s = str.replace(/\]\[/g, "]\n[");
        //alert(s);
        return s;
    }

};

$(Serializer.init);