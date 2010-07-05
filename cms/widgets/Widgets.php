<?php
class Cms_Widget_Widgets extends Cms_Widget
{
	public function widgetsAction()
	{
		$widgets = new Cms_Model_Mapper_Widget();
		$this->view()->widgets = $widgets->fetchAll();
	}
}