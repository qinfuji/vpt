import React from 'react';
import { text, select, boolean, object } from '@storybook/addon-knobs';
import { optionalSelect } from '../../../util/optionalSelect';
import { action } from '@storybook/addon-actions';

import readme from './README.md';
import Button from '../Button';

const sizeOptions = {
	xs: 'xs',
	sm: 'sm',
	lg: 'lg',
	'': 'No Value'
};

const contextOptions = {
	default: 'default',
	outline: 'outline',
	primary: 'primary',
	secondary: 'secondary',
	success: 'success',
	warning: 'warning',
	info: 'info',
	danger: 'danger'
};

const component = () => (
	<Button
    className={text('ClassName', '')}
    context={select('Context', contextOptions, 'default')}
    group={boolean('Group', false)}
    onClick={action('button_clicked')}
    size={optionalSelect('Size', sizeOptions, '')}
    style={object('Style', {})}
    type={text('Type', 'button')}
	>
		<i className="fa fa-check -m-r-2" />
		Great Success
	</Button>
);

export default [readme, component];
