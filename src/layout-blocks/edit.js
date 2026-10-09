import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	useSettings,
	InspectorControls,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	BaseControl,
	ColorPalette,
	RangeControl,
} from '@wordpress/components';
import './editor.scss';

const TEMPLATE = [
	[ 'core/heading', { level: 3, placeholder: 'Titre de la carte' } ],
	[ 'core/paragraph', { placeholder: 'Texte de la carte…' } ],
];

export default function Edit( { attributes, setAttributes, context } ) {
	const {
		url,
		opensInNewTab,
		usePostLink,
		ariaLabel,
		hoverEffect,
		overlayColor,
		customOverlayColor,
		overlayOpacity,
	} = attributes;

	// Palette du thème (puis celle de WordPress en complément).
	const [ themePalette, defaultPalette ] = useSettings(
		'color.palette.theme',
		'color.palette.default'
	);
	const palette = [ ...( themePalette || [] ), ...( defaultPalette || [] ) ];

	// Valeur CSS de l'overlay : variable du thème si couleur de palette, sinon couleur libre.
	const overlayCssColor = overlayColor
		? `var(--wp--preset--color--${ overlayColor })`
		: customOverlayColor;

	// Couleur affichée dans le sélecteur.
	const selectedPaletteColor = palette.find( ( c ) => c.slug === overlayColor );
	const overlayDisplayValue = selectedPaletteColor
		? selectedPaletteColor.color
		: customOverlayColor;

	const onOverlayColorChange = ( value ) => {
		if ( ! value ) {
			setAttributes( { overlayColor: '', customOverlayColor: '' } );
			return;
		}
		const found = palette.find(
			( c ) => c.color.toLowerCase() === value.toLowerCase()
		);
		setAttributes( {
			overlayColor: found ? found.slug : '',
			customOverlayColor: found ? '' : value,
		} );
	};

	const hasLink = usePostLink ? !! context?.postId : !! url;

	const blockProps = useBlockProps( {
		className: `linked-card is-hover-${ hoverEffect }${
			hasLink ? ' has-link' : ''
		}`,
	} );

	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Lien de la carte', 'layout-blocks' ) }>
					<ToggleControl
						label={ __( 'Pointer vers l’article', 'layout-blocks' ) }
						help={ __(
							'À utiliser dans une Boucle de requête : chaque carte pointe vers son article.',
							'layout-blocks'
						) }
						checked={ usePostLink }
						onChange={ ( value ) =>
							setAttributes( { usePostLink: value } )
						}
					/>

					{ ! usePostLink && (
						<BaseControl
							label={ __( 'Adresse du lien', 'layout-blocks' ) }
							id="linked-card-url"
						>
							<URLInput
								value={ url }
								onChange={ ( value ) =>
									setAttributes( { url: value } )
								}
							/>
						</BaseControl>
					) }

					<ToggleControl
						label={ __( 'Ouvrir dans un nouvel onglet', 'layout-blocks' ) }
						checked={ opensInNewTab }
						onChange={ ( value ) =>
							setAttributes( { opensInNewTab: value } )
						}
					/>

					<TextControl
						label={ __( 'Étiquette d’accessibilité', 'layout-blocks' ) }
						help={ __(
							'Lue par les lecteurs d’écran. Si vide, le premier titre de la carte est utilisé.',
							'layout-blocks'
						) }
						value={ ariaLabel }
						onChange={ ( value ) =>
							setAttributes( { ariaLabel: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Calque de couleur', 'layout-blocks' ) }
					initialOpen={ false }
				>
					<BaseControl
						label={ __( 'Couleur du calque', 'layout-blocks' ) }
						id="linked-card-overlay-color"
					>
						<ColorPalette
							colors={ palette }
							value={ overlayDisplayValue }
							onChange={ onOverlayColorChange }
							enableAlpha={ false }
							clearable
						/>
					</BaseControl>

					<RangeControl
						label={ __( 'Opacité du calque', 'layout-blocks' ) }
						value={ overlayOpacity }
						onChange={ ( value ) =>
							setAttributes( { overlayOpacity: value ?? 50 } )
						}
						min={ 0 }
						max={ 100 }
						help={ __(
							'S’applique seulement si une couleur est choisie.',
							'layout-blocks'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Effet au survol', 'layout-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Effet', 'layout-blocks' ) }
						value={ hoverEffect }
						options={ [
							{ label: __( 'Aucun', 'layout-blocks' ), value: 'none' },
							{ label: __( 'Élévation', 'layout-blocks' ), value: 'lift' },
							{ label: __( 'Zoom sur l’image', 'layout-blocks' ), value: 'zoom' },
							{ label: __( 'Ombre', 'layout-blocks' ), value: 'shadow' },
						] }
						onChange={ ( value ) =>
							setAttributes( { hoverEffect: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps }>
				{ children }
				{ overlayCssColor && (
					<span
						className="linked-card__overlay"
						aria-hidden="true"
						style={ {
							backgroundColor: overlayCssColor,
							opacity: overlayOpacity / 100,
						} }
					/>
				) }
			</div>
		</>
	);
}