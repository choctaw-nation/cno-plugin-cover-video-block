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
	ToggleControl,
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
				spacing: { padding: 0 },
				align: 'full',
			},
		],
		[
			'core/group',
			{
				metadata: { name: 'Content Container' },
				className:
					'wp-block-cno-cover-video-cno-plugin-cover-video-block__content-container',
				lock: { move: true, remove: true },
				align: 'full',
				layout: {
					type: 'constrained',
					orientation: 'vertical',
				},
			},
			[
				[
					'core/heading',
					{
						placeholder: 'Enter heading...',
						style: {
							spacing: {
								margin: {
									top: 0,
									bottom: 0,
								},
							},
							typography: {
								textTransform: 'uppercase',
							},
						},
						textAlign: 'center',
					},
				],
				[
					'core/paragraph',
					{
						placeholder: 'Enter subheading...',
						align: 'center',
						style: {
							typography: {
								textTransform: 'uppercase',
							},
							fontSize: 'h6',
							fontFamily: 'pill-gothic-300mg',
						},
					},
				],
				[
					'core/buttons',
					{
						layout: {
							type: 'flex',
							justifyContent: 'center',
						},
					},
					[
						[
							'core/button',
							{
								placeholder: 'Enter CTA Text',
								typography: {
									letterCase: 'uppercase',
									fontSize: 'var:preset|font-size|sm',
								},
								color: {
									text: {
										color: '#fff',
									},
								},
							},
						],
					],
				],
			],
		],
	],
	renderAppender: false,
	templateInsertUpdatesSelection: true,
};

registerBlockType( metadata.name, {
	icon: homeButton,
	edit: ( { attributes, setAttributes } ) => {
		const { overlayColor, minHeight, hasDropShadow, contentBgColor } =
			attributes;
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
					<Panel header="Cover (Video) Block Settings">
						<PanelBody title="Cover Settings" initialOpen={ true }>
							<PanelRow>
								<RangeControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									__shouldNotWarnDeprecated36pxSize
									value={ minHeight }
									onChange={ ( minHeight ) =>
										setAttributes( { minHeight } )
									}
									label="Set a min height for the container on desktop screens"
									help="Height in pixels"
									min={ 100 }
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
									value={ overlayColor || undefined }
									colors={ themeColors }
									enableAlpha={ true }
									onChange={ ( overlayColor ) =>
										setAttributes( { overlayColor } )
									}
								/>
							</div>
						</PanelBody>
						<PanelBody title="Content Settings">
							<div style={ { marginBlock: '1.5rem' } }>
								<p
									id="content-bg-color-label"
									style={ { fontWeight: '700' } }
								>
									Select a content background color:
								</p>
								<ColorPalette
									aria-labelledby="content-bg-color-label"
									value={ contentBgColor || undefined }
									colors={ themeColors }
									enableAlpha={ true }
									onChange={ ( contentBgColor ) =>
										setAttributes( { contentBgColor } )
									}
								/>
							</div>
							<PanelRow>
								<ToggleControl
									__nextHasNoMarginBottom
									label="Enable Drop Shadow"
									checked={ hasDropShadow }
									onChange={ ( val ) =>
										setAttributes( { hasDropShadow: val } )
									}
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div
					{ ...useInnerBlocksProps(
						useBlockProps( {
							style: {
								backgroundColor: overlayColor,
								'--content-bg-color': contentBgColor,
								'--custom-minHeight': `${ minHeight }px`,
								'--drop-shadow': hasDropShadow
									? '2px 2px 8px rgba(0, 0, 0, 0.5)'
									: 'none',
							},
						} ),
						innerBlocksArgs
					) }
				/>
			</>
		);
	},
	save: ( {
		attributes: { overlayColor, minHeight, hasDropShadow, contentBgColor },
	} ) => (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( {
					style: {
						backgroundColor: overlayColor,
						'--content-bg-color': contentBgColor,
						'--custom-minHeight': `${ minHeight }px`,
						'--drop-shadow': hasDropShadow
							? '2px 2px 8px rgba(0, 0, 0, 0.5)'
							: 'none',
					},
				} )
			) }
		/>
	),
} );
