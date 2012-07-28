<?php

define("ext_pe", plugin_dir_path(__FILE__) . '');

//  Content Elements configuration
//  
//  [name]  =>  [module] - The module template for listing
//              [editor] - The editor template for manipulating
//              [button_class] - Button class to use on the "Add new CE" form


class PageEditorConfig {

    public static $content_elements = array(
        'text_block' => array(
            'module' => 'templates/sub_module_text.php',
            'editor' => 'templates/sub_module_text_editor.php',
            'button_class' => 'pe_ce_text'
        ),
        'heading_block' => array(
            'module' => 'templates/sub_module_heading.php',
            'editor' => 'templates/sub_module_heading_editor.php',
            'button_class' => 'pe_ce_heading'
        )
    );
    public static $row_layouts = array(
        '1_column' => array(
            'module' => 'templates/sub_layout_1_column.php',
            'button_class' => 'pe_layout_1_column'
        ),
        '2_column' => array(
            'module' => 'templates/sub_layout_2_columns.php',
            'button_class' => 'pe_layout_2_columns'
        ),
        '3_column' => array(
            'module' => 'templates/sub_layout_3_columns.php',
            'button_class' => 'pe_layout_3_columns'
        ),
        'left_sidebar' => array(
            'module' => 'templates/sub_layout_left_sidebar.php',
            'button_class' => 'pe_layout_left_sidebar'
        )
    );
    public static $ui_row = 'templates/sub_row.php';
        

}