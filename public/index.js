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
		// headers: {
		// 	'Access-Control-Allow-Origin': '*',
		// 	'Content-Type': 'application/json;charset=UTF-8',
		// 	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		// 	'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		// },
		contentType: 'application/json',
		success: data => {
			$(`input[name*='word']`).val($(`input[name*='word']`).attr('placeholder'));
			console.log(data);
		}
	});
});
