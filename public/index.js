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
			replacePlacerholderText();
			//console.log('data is:', data);

			// deinfition object vars
			let definitionInfo = data[0];
			console.log('definitionInfo is:', definitionInfo);
			let listOfExamples = definitionInfo.lexicalEntries;

			const parseDefinitionsResponse = definitionsResponse => {
				// prettier-ignore
				// declare var word pointing to definitionsResponse.word
				let word = definitionsResponse.word;
				// iterate over definitionInfo.lexicalEntries
				let lexicalEntries = definitionInfo.lexicalEntries;
				// for each lexicalEntry
				// prettier-ignore
				lexicalEntries.forEach(lexicalEntry => {// prettier-ignore
					// declare local variable partOfSpeech pointing to lexicalEntry.lexicalCategory
					let partOfSpeech = lexicalEntry.lexicalCategory;
					// iterare over lexicalEntry.entires
					let entries = lexicalEntry.entries;
					// for each entry
					entries.forEach(entry=>{
						// iterate over entires
						// for each entry
						let senses = entry.senses;
							// iterate over entry.senses
							entry.senses.forEach(sense=>{
							// for each sense 
							// iterate over definitions
							let definitions = sense.definitions;
							// for each definitions
								definitions.forEach(definition=>{
									// declare variable definition pointing to current element in definitions array
									definition = addPeriod(definition);
									console.log(`${word} (${partOfSpeech}) ${definition}`);
								});
							})
					})

				});
			};

			addPeriod = str => {
				return str.charAt(str.length - 1) === '.' ? str : (str += '.');
			};

			parseDefinitionsResponse(definitionInfo);

			// examples object vars
			let examplesInfo = data[1];
			let listOfDefinitions = examplesInfo.lexicalEntries;

			let partOfSpeechElement = $('<span>', {
				class: 'part-of-speech',
				text: `${word[0].toUpperCase() + word.slice(1)}: (${data[0].lexicalEntries[0].lexicalCategory.toLowerCase()}). `
			});
			let defElement = $('<span>', {
				class: 'definition',
				text:
					data[0].lexicalEntries[0].entries[0].senses[0].definitions[0][0].toUpperCase() +
					data[0].lexicalEntries[0].entries[0].senses[0].definitions[0].slice(1)
			});
			let wordContainer = $('<section>', {
				class: 'word-container'
			});
			wordContainer.append(partOfSpeechElement);
			wordContainer.append(defElement);
			wordContainer.append($('<br></br>'));
			$(`.words-container`).append(wordContainer);
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
