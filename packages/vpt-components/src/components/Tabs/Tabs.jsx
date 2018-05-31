import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers.js';

const cx = lucidClassNames.bind('&-Tabs');

const { func, number, string } = PropTypes;

const Tabs = props => {
	const { className, count, ...passThroughs } = props;

	return (
		<div className={cx('&', className)} {...passThroughs}>
			Count: {count}
		</div>
	);
};

// Tabs.peek = {
// 	description: `
//		This component was generated to quickly start development in Lucid UI.
//		Update this description with something appropriate for the new component
//		to be added to the library.
// 	`
// 	categories: ['controls', 'selectors'],
// };

Tabs.propTypes = {
	// Note: optional description text can be added with backticks:
	className: string`
		Appended to the component-specific class names set on the root element.
	`,
	count: number,
	onIncrement: func`
		A function that is called when the button is clicked.
		Signature: \`({ props, event }) => {}\`
	`
};

Tabs.defaultProps = {
	count: 0,
	onIncrement: _.noop
};

export default Tabs;
