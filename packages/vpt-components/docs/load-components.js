const getDefaultExport = module => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

module.exports = [
	{
		name: 'Accordion',
		component: getDefaultExport(
			require('../src/components/Accordion/Accordion')
		),
		examplesContext: require.context(
			'../src/components/Accordion/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Accordion/examples',
			true,
			/\.jsx?$/
		),
	}
];
