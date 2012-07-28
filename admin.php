<?php 
/*
Plugin Name: R2R Wordpress Page Edit
Plugin URI: http://www.ready2run.ro
Description: Build up your pages in WordPress from multiple content elements blocks.
Version: 0.01
Author: Osvath - Boros Robert
Author URI: http://nerdcore.eu
License: A "Slug" license name e.g. GPL2
*/

$path = plugin_dir_path(__FILE__);

require_once($path . 'core.inc.php');

require_once($path . 'core/PageEditor/config.php');
require_once($path . 'core/PageEditor/PageEditor.php');
$pe = new PageEditor();



// register main menu
add_action( 'init', 'register_my_menu' );

function register_my_menu() {
	register_nav_menu( 'primary-menu', __( 'Primary Menu' ) );
}
