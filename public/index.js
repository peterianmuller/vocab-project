// Response data is array
// the meat of the info is in response.lexicalEntries

const parseResponse = resData => {};

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
			console.log('data is:', data);

			// deinfition object vars
			let definitionInfo = data[0];
			let listOfExamples = definitionInfo.lexicalEntries;

			// examples object vars
			let examplesInfo = data[1];
			let listOfDefinitions = examplesInfo.lexicalEntries;

			// wordInfo: {id: "fight", language: "en", lexicalEntries: Array(2), type: "headword", word: "fight"}
			// wordInfo.lexicalEntries is an array with objects for each part of speech
			// need function to parse each lexical entry. Each lexical entry is an object
			// reassign the placeholder to the original placeholder attribute of the text input

			// Need to write code to parse response from API
			// Need to write code to create markup to present resposne from API to screen

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
