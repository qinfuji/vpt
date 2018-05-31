const getDefaultExport = module => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

module.exports = [
	{
		name: 'Tabs',
		component: getDefaultExport(require('../src/components/Tabs/Tabs')),
		examplesContext: require.context(
			'../src/components/Tabs/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Tabs/examples',
			true,
			/\.jsx?$/
		)
	},
	{
		name: 'Button',
		component: getDefaultExport(require('../src/components/Button/Button')),
		examplesContext: require.context(
			'../src/components/Button/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Button/examples',
			true,
			/\.jsx?$/
		)
	}
];
