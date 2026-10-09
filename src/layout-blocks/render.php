<?php
/**
 * Rendu front de la carte cliquable.
 *
 * @var array    $attributes Attributs du bloc.
 * @var string   $content    HTML des blocs intérieurs.
 * @var WP_Block $block      Instance du bloc.
 */

$url     = $attributes['url'] ?? '';
$new_tab = ! empty( $attributes['opensInNewTab'] );
$label   = trim( $attributes['ariaLabel'] ?? '' );
$hover   = $attributes['hoverEffect'] ?? 'none';

// Dans une Boucle de requête : le lien pointe vers l'article.
if ( ! empty( $attributes['usePostLink'] ) && ! empty( $block->context['postId'] ) ) {
	$post_id = (int) $block->context['postId'];
	$url     = get_permalink( $post_id );
	if ( '' === $label ) {
		$label = get_the_title( $post_id );
	}
}

// Sans étiquette : on reprend le texte du premier titre de la carte.
if ( '' === $label && preg_match( '/<h[1-6][^>]*>(.*?)<\/h[1-6]>/is', $content, $matches ) ) {
	$label = trim( wp_strip_all_tags( $matches[1] ) );
}

// Calque de couleur : couleur de la palette (variable CSS) ou couleur libre.
$overlay_css = '';
if ( ! empty( $attributes['overlayColor'] ) ) {
	$overlay_css = 'var(--wp--preset--color--' . sanitize_html_class( $attributes['overlayColor'] ) . ')';
} elseif ( ! empty( $attributes['customOverlayColor'] ) ) {
	$overlay_css = (string) sanitize_hex_color( $attributes['customOverlayColor'] );
}

$overlay_opacity = max( 0, min( 100, (int) ( $attributes['overlayOpacity'] ?? 50 ) ) ) / 100;

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'linked-card is-hover-' . sanitize_html_class( $hover ),
] );
?>
<div <?php echo $wrapper_attributes; ?>>
	<?php echo $content; ?>
	<?php if ( '' !== $overlay_css ) : ?>
		<span
			class="linked-card__overlay"
			aria-hidden="true"
			style="background-color:<?php echo esc_attr( $overlay_css ); ?>;opacity:<?php echo esc_attr( $overlay_opacity ); ?>"
		></span>
	<?php endif; ?>
	<?php if ( $url ) : ?>
		<a
			class="linked-card__link"
			href="<?php echo esc_url( $url ); ?>"
			<?php if ( '' !== $label ) : ?>
				aria-label="<?php echo esc_attr( $label ); ?>"
			<?php endif; ?>
			<?php if ( $new_tab ) : ?>
				target="_blank" rel="noopener noreferrer"
			<?php endif; ?>
		></a>
	<?php endif; ?>
</div>