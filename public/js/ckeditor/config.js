/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	config.language = 'pl';
	// config.uiColor = '#AADC6E';
	config.toolbar = 'Medium';
	config.toolbar_Medium =
    [
		['Source','-','NewPage','Preview','-','Templates'],
		['Cut','Copy','Paste','PasteText','PasteFromWord'],
		['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
		['BidiLtr', 'BidiRtl'],
		['Maximize', 'ShowBlocks'],
		'/',
		['Format','Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
		['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
		['TextColor','BGColor']
		['Link','Unlink','Anchor'],
		['Image','Flash','Table','HorizontalRule','SpecialChar','PageBreak']
    ];
};