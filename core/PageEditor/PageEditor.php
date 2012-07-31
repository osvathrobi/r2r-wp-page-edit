<?php

define("pe_prepend", "pe_");
define("pe_label", "* Page editor");
define("ext_pe", plugin_dir_path(__FILE__) . '');

class PageEditor {

    public function PageEditor() {
        add_action('admin_menu', array(&$this, 'admin_menu'));
        add_action('admin_head', array(&$this, 'admin_head'));

        add_action('wp_ajax_PE_save_page', array(&$this, 'save_page_callback'));

        add_shortcode('PErow', array(&$this, 'shortcode_row'));
        add_shortcode('PElayout', array(&$this, 'shortcode_layout'));
        add_shortcode('PEzone', array(&$this, 'shortcode_zone'));
        add_shortcode('PEmodule', array(&$this, 'shortcode_module'));
        add_shortcode('PEmoduleParam', array(&$this, 'shortcode_module_param'));

        add_filter('the_content', array(&$this, 'shortcode_empty_paragraph_fix'));
    }

    function admin_menu() {
        add_pages_page('Pages', pe_label, 'edit_themes', pe_prepend, array(&$this, 'page_editor_html'));
    }

    function admin_head() {
        $base_url = plugins_url() . '/r2r-wp-page-edit/';

        echo '<link rel="stylesheet" href="' . $base_url . 'core/PageEditor/css/style.css" type="text/css" media="screen" />';
        echo '<script src="' . $base_url . 'core/PageEditor/js/PageEditor.js"></script>';
        echo '<script src="' . $base_url . 'core/PageEditor/js/PageEditorDialogs.js"></script>';
        echo '<script src="' . $base_url . 'core/PageEditor/js/Serializer.js"></script>';
        echo '<script src="' . $base_url . 'core/PageEditor/js/PageEditorCEEditor.js"></script>';
        echo '<script src="' . $base_url . 'core/PageEditor/js/PageEditorWorkspaceLoader.js"></script>';

        // Load current pagecontent and De-Serielize for UI
        $p = get_post($_GET['post']);
        $this->deSerialize($p->post_content);

        if ($_GET['page'] == pe_prepend) {
            $v = 'editor';
        } else {
            if ($_GET['action'] == 'edit') {
                $v = 'tabbed_editor';

                // bring in html templates
                $this->page_editor_html_templatesonly();
            } else {
                $v = 'list';
            }
        }

        $js_inits .= "var initModule = '" . $v . "';";
        $js_inits .= "var peUrl = '" . get_admin_url() . "edit.php?post_type=page&page=pe_';";
        if (isset($_GET['post'])) {
            $js_inits .= "var pePost = " . $_GET['post'] . ";";
        }

        echo '<script language="javascript">' . $js_inits . '</script>';
    }

    function page_editor_html() {

        $this->template1 = new PhpTemplate(ext_pe . 'templates/template_blank.php');

        $this->subs['row'] = new PhpTemplate(ext_pe . PageEditorConfig::$ui_row);

        // Read Row Layouts from config
        foreach (PageEditorConfig::$row_layouts as $name => $rl) {
            $this->subs['rowlayout_' . $name] = new PhpTemplate(ext_pe . $rl['module']);
        }

        // Read ContentElements from config
        foreach (PageEditorConfig::$content_elements as $name => $ce) {
            $this->subs['module_' . $name] = new PhpTemplate(ext_pe . $ce['module']);
            $this->subs['module_' . $name . '_editor'] = new PhpTemplate(ext_pe . $ce['editor']);
        }

        $this->ctx['sub_templates'] = $this->convertToJSTemplate($this->subs);

        echo $this->template1->render($this->ctx);
    }

    function page_editor_html_templatesonly() {
        $this->template1 = new PhpTemplate(ext_pe . 'templates/template_only_header.php');

        $this->subs['row'] = new PhpTemplate(ext_pe . PageEditorConfig::$ui_row);

        // Read Row Layouts from config
        foreach (PageEditorConfig::$row_layouts as $name => $rl) {
            $this->subs['rowlayout_' . $name] = new PhpTemplate(ext_pe . $rl['module']);
        }

        // Read ContentElements from config
        foreach (PageEditorConfig::$content_elements as $name => $ce) {
            $this->subs['module_' . $name] = new PhpTemplate(ext_pe . $ce['module']);
            $this->subs['module_' . $name . '_editor'] = new PhpTemplate(ext_pe . $ce['editor']);
        }

        $this->ctx['sub_templates'] = $this->convertToJSTemplate($this->subs);

        echo $this->template1->render($this->ctx);
    }

    function convertToJSTemplate($templates) {
        $tpls = '';
        $js_inits = '';
        foreach ($templates as $key => $template) {
            $v = $template->render();
            $tpls .= '<script type="text/html" id="tmpl_' . $key . '">' . $v . '</script>';
            $js_inits .= 'var tmpl_' . $key . ' = tmpl("tmpl_' . $key . '");';
            $js_inits .= 'var tmpl_' . $key . '_nr_zones = ' . substr_count($v, 'zone') . ';';
        }

        return $tpls . '<script language="javascript">' . $js_inits . '</script>';
    }

    function convertToJSVar($name, $data) {
        return '<script language="javascript">var ' . $name . '=eval(' . json_encode($data) . ');</script>';
    }

    // ### AJAX FUNCTIONS ###
    public static function save_page_callback() {
        global $wpdb; // this is how you get access to the database

        $content = $_POST['serialized_layout'];

        $my_post = array();
        $my_post['ID'] = $_POST['post_id'];
        $my_post['post_content'] = $content;

        // Update the post into the database
        wp_update_post($my_post);

        echo "OK";
        die();
    }

    // ### SHORTCODES ###

    var $current_layout = '';

    function shortcode_empty_paragraph_fix($content) {
        $array = array(
            '<p>[' => '[',
            ']</p>' => ']',
            ']<br />' => ']'
        );

        $content = strtr($content, $array);

        return $content;
    }

    function shortcode_row($atts, $content = null) {
        if (!is_null($content)) {
            $content = do_shortcode($content);
        }

        $retv = '<div class="pe_row">' . $content . '</div>';
        return $retv;
    }

    function shortcode_layout($atts, $content = null) {
        extract(shortcode_atts(array(
                    'type' => 'default_layout',
                        ), $atts));

        $this->current_layout = $atts['type'];

        if (!is_null($content)) {
            $content = do_shortcode($content);
        }

        $retv = '<div class="pe_layout">' . $atts['type'] . '<br />' . $content . '</div>';
        return $retv;
    }

    function shortcode_zone($atts, $content = null) {
        extract(shortcode_atts(array(
                    'id' => 'default_zone',
                    'is_last' => 0,
                        ), $atts));

        if (!is_null($content)) {
            $content = do_shortcode($content);
        }

        $appendClass = '';
        $appendClear = '';
        if ($atts['is_last'] == 1) {
            $appendClass = 'last';
            $appendClear = '<div class="clear"></div>';
        }

        $retv = '<div class="pe_zone ' . $this->getLayoutOutputClassName($this->current_layout, $atts['id']) . ' ' . $appendClass . '">' . $this->current_layout . ' / ' . $atts['id'] . $content . '</div>' . $appendClear;
        return $retv;
    }

    function shortcode_module($atts, $content = null) {
        extract(shortcode_atts(array(
                    'type' => 'default_module',
                        ), $atts));

        if (!is_null($content)) {
            $content = do_shortcode($content);
        }

        $retv = '<div class="pe_module">' . $content . '</div>';
        return $retv;
    }

    function shortcode_module_param($atts, $content = null) {
        extract(shortcode_atts(array(
                    'type' => 'default_module_param',
                        ), $atts));

        if (!is_null($content)) {
            $content = do_shortcode($content);
        }

        $retv = '<p>' . $content . '</p>';
        return $retv;
    }

    function deSerialize($content) {
        $this->sequence = array();

        $content = str_replace('[', '<', $content);
        $content = str_replace(']', '>', $content);
       
        echo $this->convertToJSVar('currentContentDataXML', array('xmldata' => $content));
    }

    function getLayoutOutputClassName($id, $zone) {
        switch ($id) {
            case '1_column':
                return 'float100p';
                break;
            case '2_column':
                return 'float50p';
                break;
            case '3_column':
                return 'float33p';
                break;
            case 'left_sidebar':
                switch ($zone) {
                    case 'zone1':
                        return 'float20p';
                        break;
                    case 'zone2':
                        return 'float80p';
                        break;
                }

                break;
        }
    }


}

