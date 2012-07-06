<?php
class PhpTemplate
{
  function PhpTemplate($tpl_name)
  {
    $this->tpl_name = $tpl_name;
    $this->parts = array();
    $this->part = null;
    $this->baseTemplate = false;
  }

  public function render($ctx=false)
  {
    ob_start();
    include $this->tpl_name;
    $content = ob_get_contents();
    ob_clean();
    if($this->baseTemplate)
    {  
       ob_start();
       include $this->baseTemplate;
       $content = ob_get_contents();
       ob_clean();
    }
    return $content;
  }

  public function start_part($name)
  {
    $this->part = $name;
    ob_start();
  }

  public function end_part()
  {
    if($this->part)
      $this->parts[$this->part] = ob_get_contents();
    ob_clean();
    $this->part = false;
  }

  public function base($name)
  {
    $this->baseTemplate = $name;
  }

  public function part($name)
  {
    if(array_key_exists($name,$this->parts))
      echo $this->parts[$name];
  }
}
?>