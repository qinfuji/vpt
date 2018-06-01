// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { withReadme } from 'storybook-readme';
// //import { withNotes } from '@storybook/addon-notes';
// import { withKnobs } from '@storybook/addon-knobs';
// import { withInfo } from '@storybook/addon-info';

// import TestComp from '../src/components/pane/examples/base';
// import Button from '../src/components/Button/examples';

// //const req = require.context('../src/component', true, /\.stories.js$/);

// const storyWrapper = story => {
// 	return <div style={{ margin: '35px' }}>{story()}</div>;
// };

// const stories = storiesOf('Test', module);

// stories
// 	.addDecorator((story, context) => withInfo('')(story)(context))
// 	.addDecorator(storyWrapper)
// 	.addDecorator(withKnobs)
// 	.add('subTest', withReadme(...TestComp))
// 	.add('Button', withReadme(...Button));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Label', module).add('文字', () => (
	<div onClick={action('clicked')}>Hello Label</div>
));
