/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { getPhrasingContentSchema } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import edit from './edit';

const tableContentPasteSchema = {
	tr: {
		children: {
			th: {
				children: getPhrasingContentSchema(),
			},
			td: {
				children: getPhrasingContentSchema(),
			},
		},
	},
};

const tablePasteSchema = {
	table: {
		children: {
			thead: {
				children: tableContentPasteSchema,
			},
			tfoot: {
				children: tableContentPasteSchema,
			},
			tbody: {
				children: tableContentPasteSchema,
			},
		},
	},
};

function getTableSectionAttributeSchema( section ) {
	return {
		type: 'array',
		default: [],
		source: 'query',
		selector: `t${ section } tr`,
		query: {
			cells: {
				type: 'array',
				default: [],
				source: 'query',
				selector: 'td,th',
				query: {
					content: {
						type: 'array',
						default: [],
						source: 'children',
					},
					tag: {
						type: 'string',
						default: 'td',
						source: 'tag',
					},
				},
			},
		},
	};
}

export const name = 'core/table';

export const settings = {
	title: __( 'Table' ),
	description: __( 'Insert a table -- perfect for sharing charts and data.' ),
	icon: 'editor-table',
	category: 'formatting',

	attributes: {
		hasFixedLayout: {
			type: 'boolean',
			default: false,
		},
		head: getTableSectionAttributeSchema( 'head' ),
		body: getTableSectionAttributeSchema( 'body' ),
		foot: getTableSectionAttributeSchema( 'foot' ),
	},

	supports: {
		align: true,
	},

	transforms: {
		from: [
			{
				type: 'raw',
				selector: 'table',
				schema: tablePasteSchema,
			},
		],
	},

	edit,

	save( { attributes } ) {
		const { hasFixedLayout, head, body, foot } = attributes;
		const isEmpty = ! head.length && ! body.length && ! foot.length;

		if ( isEmpty ) {
			return null;
		}

		const classes = classnames( {
			'has-fixed-layout': hasFixedLayout,
		} );

		const Section = ( { type, rows } ) => {
			if ( ! rows.length ) {
				return null;
			}

			const Tag = `t${ type }`;

			return (
				<Tag>
					{ rows.map( ( { cells }, rowIndex ) =>
						<tr key={ rowIndex }>
							{ cells.map( ( { content, tag }, cellIndex ) =>
								<RichText.Content tagName={ tag } value={ content } key={ cellIndex } />
							) }
						</tr>
					) }
				</Tag>
			);
		};

		return (
			<table className={ classes }>
				<Section type="head" rows={ head } />
				<Section type="body" rows={ body } />
				<Section type="foot" rows={ foot } />
			</table>
		);
	},
};
