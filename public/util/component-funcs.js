partOfSpeechElement = partOfSpeechStr => {
	console.log('partOfSpeechStr is', partOfSpeechStr);
	return $('<span>', {
		class: 'part-of-speech',
		text: partOfSpeechStr.toLowerCase() + ': '
	});
};

definitionElement = definitionStr => {
	return $('<span>', {
		class: 'definition',
		text: definitionStr + ' '
	});
};

wordContainerElement = word => {
	return $('<section>', {
		class: 'word-container'
	});
};
