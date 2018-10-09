// Response data is array
// the meat of the info is in response.lexicalEntries

const parseResponse = resData => {};

$('button:first-of-type').click(e => {
	let word = $(`input[name*='word']`).val();
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
			console.log(data);
			$(`input[name*='word']`).val($(`input[name*='word']`).attr('placeholder'));
			console.log(
				data[0].lexicalEntries[0].lexicalCategory,
				data[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
			);
			// let word = $;
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
			$(`.words-container`).append(partOfSpeechElement);
			$(`.words-container`).append(defElement);
			$(`.words-container`).append($('<br></br>'));
		}
	});
});
