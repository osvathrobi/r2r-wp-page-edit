var PageEditorWorkspaceLoader = {
    lastElement:-1,
    
    loadWorkspace:function(data) {
        PageEditorWorkspaceLoader.handleNodes($(data), -1, -1);        
    },
    
    handleNodes:function(nodes, lastLevel, lastLevelZone) {

        var thisLevel = -1;
        var thisLevelZone = -1;
        
        nodes.each(function() { 
           
           console.log($(this).attr("tagName"));
           
            switch($(this).attr("tagName")) {
                case 'PEROW':
                    thisLevel = PageEditor.addNewRow('main_ul');
                    console.log('- new row: ' + thisLevel);
                    break;
                case 'PELAYOUT':
                    thisLevel = PageEditor.addNewLayout(lastLevel, 'tmpl_rowlayout_' + $(this).attr('type'));
                    console.log('- new layout for: ' + lastLevel + ' marked thisLevel to: ' + thisLevel);
                    break;
                case 'PEZONE':
                    thisLevelZone = $(this).attr('id');
                    thisLevel = lastLevel;
                    console.log('- marked zone: ' + thisLevelZone + ' sustained thisLevel on: ' + thisLevel);
                    break;
                case 'PEMODULE':
                    thisLevel = PageEditor.addNewModule(lastLevelZone, lastLevel, 'tmpl_module_' + $(this).attr('type'));
                    console.log('- added module to zone: ' + lastLevelZone + ' and layout: ' + lastLevel+ ' marked thisLevel to: ' + thisLevel);
                    break;
                case 'PEMODULEPARAM':
                    console.log($(this));
                    $('#'+lastLevel).find('.pe_type_param[type="' + $(this).attr('type') + '"]').html($(this).html());
                    break;
            }
            
           PageEditorWorkspaceLoader.handleNodes($(this).children(), thisLevel, thisLevelZone);
           
        });
        
    }
}