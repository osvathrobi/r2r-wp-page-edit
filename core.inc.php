<?php
require_once(plugin_dir_path(__FILE__) . 'core/libs/PhpTemplate.php');

add_action('admin_head', add_jquery);

function add_jquery() {
	$base_url = plugins_url() . '/r2r-wp-page-edit/';

	echo '<script language="javascript" src="'.$base_url.'core/libs/jquery/js/jquery-1.4.4.min.js"></script>';
	echo '<script language="javascript" src="'.$base_url.'core/libs/jquery/js/jquery-ui-1.8.10.custom.min.js'.'"></script>';
	echo '<script language="javascript" src="'.$base_url.'core/libs/tmpl.js'.'"></script>';	
	echo '<link rel="stylesheet" href="'.$base_url.'core/libs/jquery/css/ui-lightness/jquery-ui-1.8.10.custom.css'.'" type="text/css" media="screen" />';
		
}

