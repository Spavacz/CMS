<?php
class Cms_Widget_Lorem extends Cms_Widget
{
	public function loremAction()
	{
		$this->view()->param = $this->getParam('parametr');
	}
}