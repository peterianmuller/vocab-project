const parseResponse = resData => {
	// for every resData we get data.entry_list.entry, which is an array if there are multiple entries, or an object if there is a single entry.
	// let's write a function to create an item for one word
	Array.isArray(resData)
		? resData.forEach(word => {
				parseOneEntry(word);
		  })
		: parseOneEntry(resData);
};

const parseOneEntry = entry => {
	// what different data types is entry.def.dt?
	// either string, array, or object
	// deal with strings first. Problem here is we're dealing with phrases that contain the word 'chicken-and-egg', etc.

	if (typeof entry.def.dt === 'string') {
		console.log(entry.def);
		let div = $('<div></div>');
		div.append(document.createTextNode(`${entry.id} ${entry.def.dt}`));
		$('.words-container').append(div);
	} else if (Array.isArray(entry.def.dt)) {
		entry.def.dt.forEach(definition => {
			let div = $('<div></div>');
			console.log(definition, entry.id);
			div.append(document.createTextNode(`${entry.id} ${definition}`));
			$('.words-container').append(div);
		});
	}
};

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
			$(`input[name*='word']`).val($(`input[name*='word']`).attr('placeholder'));
			parseResponse(data.entry_list.entry);
		}
	});
});
