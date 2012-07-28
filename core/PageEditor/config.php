<?php

define("ext_pe", plugin_dir_path(__FILE__) . '');

// listing

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

}