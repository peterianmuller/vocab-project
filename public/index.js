// Response data is array
// the meat of the info is in response.lexicalEntries

$('button:first-of-type').click(e => {
	let word = $(`input[name*='word']`).val();
	// reassign the text to loading
	$(`input[name*='word']`).val('loading...');
	console.log('click');

	$.ajax({
		method: 'GET',
		data: {
			word: word
		},
		url: 'lookup',
		dataType: 'json',
		contentType: 'application/json',
		success: data => {
			// TODO: examples
			// examples object vars
			let examplesInfo = data[1];
			let listOfDefinitions = examplesInfo.lexicalEntries;

			replacePlacerholderText();
			//console.log('data is:', data);

			// deinfition object vars
			let definitionInfo = data[0];
			console.log('definitionInfo is:', definitionInfo);
			let listOfExamples = definitionInfo.lexicalEntries;

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

			const parseDefinitionsResponse = definitionsResponse => {
				// prettier-ignore
				// declare var word pointing to definitionsResponse.word
				let word = definitionsResponse.word;
				let wordContainerMarkup = wordContainerElement(word);

				// iterate over definitionInfo.lexicalEntries
				let lexicalEntries = definitionInfo.lexicalEntries;
				// for each lexicalEntry
				// prettier-ignore
				console.log('lexicalEntries are:', lexicalEntries);
				lexicalEntries.forEach(lexicalEntry => {
					// prettier-ignore
					// declare local variable partOfSpeech pointing to lexicalEntry.lexicalCategory
					let partOfSpeech = lexicalEntry.lexicalCategory;
					console.log('partOfSpeech is:', partOfSpeech);
					// iterare over lexicalEntry.entires
					let entries = lexicalEntry.entries;
					// for each entry
					entries.forEach(entry => {
						// iterate over entires
						// for each entry
						let senses = entry.senses;
						// iterate over entry.senses
						entry.senses.forEach(sense => {
							// for each sense
							// iterate over definitions
							let definitions = sense.definitions;
							// for each definitions
							definitions.forEach(definition => {
								// declare variable definition pointing to current element in definitions array
								definition = addPeriod(definition);
								console.log('partOfSpeech is:', partOfSpeech);
								let partOfSpeechMarkup = partOfSpeechElement(partOfSpeech);
								let definitionMarkup = definitionElement(definition);
								wordContainerMarkup.append(partOfSpeechMarkup);
								wordContainerMarkup.append(definitionMarkup);
								wordContainerMarkup.append($('<br></br>'));
								console.log(`${word} (${partOfSpeech}) ${definition}`);
							});
						});
					});
				});
				$(`.words-container`).append(wordContainerMarkup);
			};

			addPeriod = str => {
				return str.charAt(str.length - 1) === '.' ? str : (str += '.');
			};

			parseDefinitionsResponse(definitionInfo);

			// old:
			// let defElement = $('<span>', {
			// 	class: 'definition',
			// 	text:
			// 		data[0].lexicalEntries[0].entries[0].senses[0].definitions[0][0].toUpperCase() +
			// 		data[0].lexicalEntries[0].entries[0].senses[0].definitions[0].slice(1)
			// });

			// let wordContainer = $('<section>', {
			// 	class: 'word-container'
			// });
			//wordContainer.append(partOfSpeechElement);
			// wordContainer.append(defElement);
			// wordContainer.append($('<br></br>'));
			// $(`.words-container`).append(wordContainer);
		},
		error: err => {
			console.log('error is:', err);
			// this is the error
			replacePlacerholderText();
			let error = $('<p>Spelling error! Please try again.</p>');
			$(`.words-container`).append(error);
		}
	});
});

replacePlacerholderText = () => {
	$(`input[name*='word']`).val($(`input[name*='word']`).attr('placeholder'));
};
