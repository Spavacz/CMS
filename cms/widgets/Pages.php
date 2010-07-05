<?php
class Cms_Widget_Pages extends Cms_Widget
{
	public function pagesAction()
	{	
		$pages = new Cms_Model_Mapper_Page();
		$this->view()->pages = $pages->fetchAll();
	}
}