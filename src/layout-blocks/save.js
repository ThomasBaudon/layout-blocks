import { InnerBlocks } from '@wordpress/block-editor';

// Le HTML de la carte est généré en PHP (render.php).
// On enregistre seulement les blocs intérieurs, qui arrivent dans $content.
export default function save() {
	return <InnerBlocks.Content />;
}