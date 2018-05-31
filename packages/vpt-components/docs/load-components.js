const getDefaultExport = module => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

module.exports = [
	{
		name: 'Tabs',
		component: getDefaultExport(require('../src/components/Tbas/Tabs')),
		examplesContext: require.context(
			'../src/components/Accordion/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Accordion/examples',
			true,
			/\.jsx?$/
		)
	}
];
