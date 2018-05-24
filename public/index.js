const makeTable = data => {
	let table = $('<table></table>');

	// create caption
	let caption = $('<caption></caption>');
	caption.append(document.createTextNode(`${data[0].firstName} ${data[0].lastName}`));
	table.append(caption);

	// create head
	let thead = $('<thead></thead>');

	// create tr
	let trHead = $('<tr></tr>');

	// create position header
	let thPosition = $('<th></th>').append(document.createTextNode('position'));

	// create height header
	let thHeight = $('<th></th>').append(document.createTextNode('height'));

	// create jerseyNum header
	let thJerseyNum = $('<th></th>').append(document.createTextNode('number'));

	// append trHead and tHead to table
	trHead.append(thPosition);
	trHead.append(thHeight);
	trHead.append(thJerseyNum);
	thead.append(trHead);
	table.append(thead);

	// create table body
	let tbody = $('<tbody></tbody>');
	let trBody = $('<tr></tr>');
	let tdPosition = $('<td></td>').append(document.createTextNode(data[0].pos));
	let tdHeight = $('<td></td>').append(
		document.createTextNode(`${data[0].heightFeet} feet ${data[0].heightInches} inches`)
	);
	let tdJerseyNum = $('<td></td>').append(document.createTextNode(data[0].jersey));

	// append td to tr

	trBody.append(tdPosition);
	trBody.append(tdHeight);
	trBody.append(tdJerseyNum);

	// append tr to tbody
	tbody.append(trBody);

	// append tbody to table

	table.append(tbody);

	$('.data-container').append(table);
};

$('button:first-of-type').click(e => {
	console.log('click');
	$.ajax({
		method: 'GET',
		url: 'nba',
		dataType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
		},
		contentType: 'application/json',
		success: data => {
			console.log(data[0]);
			makeTable(data);
		}
	});
});
