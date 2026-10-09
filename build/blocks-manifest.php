<?php
// This file is generated. Do not modify it manually.
return array(
	'layout-blocks' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'thomasbaudon/linked-card',
		'version' => '0.1.0',
		'title' => 'Carte cliquable',
		'category' => 'design',
		'icon' => 'id-alt',
		'description' => 'Un conteneur dont toute la surface est cliquable, avec le contenu de ton choix.',
		'textdomain' => 'layout-blocks',
		'usesContext' => array(
			'postId'
		),
		'attributes' => array(
			'url' => array(
				'type' => 'string',
				'default' => ''
			),
			'opensInNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'usePostLink' => array(
				'type' => 'boolean',
				'default' => false
			),
			'ariaLabel' => array(
				'type' => 'string',
				'default' => ''
			),
			'hoverEffect' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'overlayColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'customOverlayColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'overlayOpacity' => array(
				'type' => 'number',
				'default' => 50
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'background' => array(
				'backgroundImage' => true,
				'backgroundSize' => true
			),
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'shadow' => true,
			'dimensions' => array(
				'minHeight' => true
			),
			'layout' => true
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Par défaut',
				'isDefault' => true
			),
			array(
				'name' => 'outlined',
				'label' => 'Contour'
			),
			array(
				'name' => 'elevated',
				'label' => 'Surélevée'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
