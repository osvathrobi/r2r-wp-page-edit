<div class="wrap">

<div id="icon-edit-pages" class="icon32 icon32-posts-page"><br /></div> 
<h2>* Edit pages <a href="post-new.php?post_type=page" class="button add-new-h2">Add New</a> </h2> 
 
 
 
<ul class='subsubsub'> 
	<li class='all'><a href='edit.php?post_type=page' class="current">All <span class="count">(1)</span></a> |</li> 
	<li class='publish'><a href='edit.php?post_status=publish&amp;post_type=page'>Published <span class="count">(1)</span></a></li> 
</ul> 

<br />

<ul id="main_ul">

</ul>

</div>


<?php echo $ctx['sub_templates']; ?>


<script language="javascript">
	
</script>

<script type="text/html" id="pe_dialogs">
<div id="dialog_add_row" class="ui-dialog-content ui-widget-content formloadhide" title="Add new row">
  <a href="javascript:" class="pe_ce_icon_96p pe_layout_1_column new_row_layout" id="tmpl_1_column"></a>
  <a href="javascript:" class="pe_ce_icon_96p pe_layout_2_columns new_row_layout" id="tmpl_2_columns"></a>
  <a href="javascript:" class="pe_ce_icon_96p pe_layout_3_columns new_row_layout" id="tmpl_3_columns"></a>
  <a href="javascript:" class="pe_ce_icon_96p pe_layout_left_sidebar new_row_layout" id="tmpl_left_sidebar"></a>
</div>

<div id="dialog_add_ce" class="ui-dialog-content ui-widget-content formloadhide" title="Add new content element">
  <a href="javascript:" class="pe_ce_icon_96p pe_ce_text pe_new_ce" id="tmpl_module_text"></a>
  <a href="javascript:" class="pe_ce_icon_96p pe_ce_heading pe_new_ce" id="tmpl_module_heading"></a>
  
</div>

<div id="debug"></div>

<div id="pe_ce_options" class="pe_ce_options_window">
	<a href="javascript:" id="pe_move_module_up" class="pe_ce_options_icon_moveup"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_move_module_down" class="pe_ce_options_icon_movedown"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_cut_module" class="pe_ce_options_icon_cut" title="Cut element"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_copy_module" class="pe_ce_options_icon_copy" title="Copy element"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_paste_module" class="pe_ce_options_icon_paste" title="Paste after"></a>
</div>

<div id="pe_row_options" class="pe_ce_options_window pe_row_options">
	<a href="javascript:" id="pe_row_move_module_up" class="pe_ce_options_icon_moveup"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_row_move_module_down" class="pe_ce_options_icon_movedown"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_row_cut_module" class="pe_ce_options_icon_cut" title="Cut element"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_row_copy_module" class="pe_ce_options_icon_copy" title="Copy element"></a>
	<div class="pe_float_spacer">&nbsp;</div>
	<a href="javascript:" id="pe_row_paste_module" class="pe_ce_options_icon_paste" title="Paste after"></a>
</div>

<div id="paste_form" style="display:none;">
	<a href="javascript:" id="pe_paste_here" class="pe_ce_options_icon_paste" title="Paste here"></a>
	<div class="clear"></div>
</div>
</script>


<script type="text/html" id="pe_ce_editor_dialogs">
<div id="dialog_ce_edit" class="ui-dialog-content ui-widget-content formloadhide" title="Edit content element">
XXX
</div>
</script>