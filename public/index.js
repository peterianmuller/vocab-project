const parseResponse = resData => {

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
			console.log(data);
			$(`input[name*='word']`).val($(`input[name*='word']`).attr('placeholder'));
		}
	});
});
