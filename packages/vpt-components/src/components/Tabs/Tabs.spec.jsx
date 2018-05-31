import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import Tabs from './Tabs';
import Button from '../Button/Button';

describe('Tabs', () => {
	common(Tabs);

	describe('Events', () => {
		describe('onIncrement', () => {
			it('should be called when button is clicked', () => {
				const onIncrement = jest.fn();
				const wrapper = shallow(
					<Tabs onIncrement={onIncrement} />
				);
				wrapper.find(Button).simulate('click');
				expect(onIncrement).toHaveBeenCalled();
			});
		});
	});
});
