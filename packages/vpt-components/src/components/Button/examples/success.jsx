import React from 'react';
import createClass from 'create-react-class';
import { Button } from '../../../index';

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column'
};

const articleStyle = {
	display: 'flex',
	margin: '5px 0px'
};

const buttonStyle = {
	marginRight: '5px'
};

export default createClass({
	render() {
		return (
			<section style={sectionStyle}>
				<article style={articleStyle}>
					<Button kind="success" style={buttonStyle}>
						Success
					</Button>
					<Button isDisabled kind="success">
						Disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button kind="success" size="short" style={buttonStyle}>
						Short
					</Button>
					<Button isDisabled kind="success" size="short">
						Short disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button kind="success" size="small" style={buttonStyle}>
						Small
					</Button>
					<Button isDisabled kind="success" size="small">
						Small disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button kind="success" size="large" style={buttonStyle}>
						Large
					</Button>
					<Button isDisabled kind="success" size="large">
						Large disabled
					</Button>
				</article>
			</section>
		);
	}
});
