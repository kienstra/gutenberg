/**
 * Internal dependencies
 */
import { toggleScreenOption } from './toggle-screen-option';
import { toggleMoreMenu } from './toggle-more-menu';

/**
 * Enables Pre-publish checks.
 */
export async function enablePrePublishChecks() {
	await toggleScreenOption( 'Include pre-publish checklist', true );
	await toggleMoreMenu();
}
