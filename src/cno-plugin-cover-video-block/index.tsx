import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	ColorPalette,
	Panel,
	PanelBody,
	PanelRow,
	RangeControl,
} from '@wordpress/components';
import { homeButton } from '@wordpress/icons';
import './style.scss';
import metadata from './block.json';
import { select } from '@wordpress/data';

const innerBlocksArgs = {
	directInsert: true,
	orientation: 'horizontal',
	template: [
		[
			'cno-lite-vimeo/cno-plugin-lite-vimeo-block',
			{
				lock: { move: true, remove: true },
			},
		],
		[
			'core/group',
			{
				metadata: { name: 'Content Container' },
				className:
					'wp-block-cno-cover-video-cno-plugin-cover-video-block__content-container',
				lock: { move: true, remove: true },
				layout: {
					type: 'constrained',
					orientation: 'vertical',
				},
			},
			[ [ 'core/heading', { placeholder: 'Enter heading...' } ] ],
		],
	],
	renderAppender: false,
	templateInsertUpdatesSelection: true,
};

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: ( { attributes, setAttributes } ) => {
		const { overlayColor, minHeight } = attributes;
		const themeColors = select( 'core/block-editor' )?.getSettings()
			?.colors || [
			{
				color: '#fff',
				name: 'White',
			},
			{
				color: '#000',
				name: 'Black',
			},
		];

		return (
			<>
				<InspectorControls>
					<Panel>
						<PanelBody initialOpen={ true }>
							<PanelRow>
								<RangeControl
									value={ minHeight }
									onChange={ ( minHeight ) =>
										setAttributes( { minHeight } )
									}
									label="Set a min height for the container on desktop screens"
									help="Height in pixels"
									min={ 100 }
									defaultValue={ 430 }
									max={ 900 }
								/>
							</PanelRow>
							<div style={ { marginBlock: '1.5rem' } }>
								<p
									id="overlay-color-label"
									style={ { fontWeight: '700' } }
								>
									Select an overlay color:
								</p>
								<ColorPalette
									aria-labelledby="overlay-color-label"
									value={ overlayColor }
									colors={ themeColors }
									enableAlpha={ true }
									onChange={ ( overlayColor ) =>
										setAttributes( { overlayColor } )
									}
								/>
							</div>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div
					{ ...useInnerBlocksProps(
						useBlockProps( {
							style: {
								backgroundColor: overlayColor,
								'--custom-minHeight': `${ minHeight }px`,
							},
						} ),
						innerBlocksArgs
					) }
				/>
			</>
		);
	},
	save: ( { attributes: { overlayColor, minHeight } } ) => (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( {
					style: {
						backgroundColor: overlayColor,
						'--custom-minHeight': `${ minHeight }px`,
					},
				} )
			) }
		/>
	),
} );
