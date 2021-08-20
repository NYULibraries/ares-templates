/* 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
 * Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */
 
function createHTMLButtons() {
	var parent = document.getElementById('lacecontrols');
	
	var tr     = document.createElement('tr');
	var blank  = document.createElement('td');
	var td     = document.createElement('td');
	
	var link   = htmlButton('link', 'Link', 'button bump', 'a');
	var bold   = htmlButton('bold', 'B', 'button', 'b');
	var ital   = htmlButton('italic', 'I', 'button', 'i');
	
	td.setAttribute('id', 'buttons');	
	td.appendChild(link);
	td.appendChild(bold);
	td.appendChild(ital);
	
	tr.appendChild(blank);
	tr.appendChild(td);
	
	parent.appendChild(tr);
}

function htmlButton(id, value, className, tag) {
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('name', id);
	button.setAttribute('id', id);
	button.setAttribute('className', className);
	button.setAttribute('class', className);
	button.setAttribute('value', value);
	button.onclick = function () { markup(tag); };
	return button;
}

function markup(tag) {
	var verb, url, title, open, close;
	switch(tag) {
	case 'a':
		verb = 'to create your link with';
		url  = prompt('Enter the address to link to:', 'http://');
		if (url === null || url === '' || url === 'http://') {
			return false;
		}
		if (url.indexOf('http://') === -1) {
			url = 'http://' + url;
		}
		title = prompt('Enter a description to appear as a tooltip, or press OK to skip:');
		open  = '<a rel="external" href="' + url + '"';
		open += (title) ? ' title="' + title + '"' : '';
		open += '>';
		close = '</a>';
		break;
	case 'b':
		verb  = 'made bold';
		open  = '<strong>';
		close = '</strong>';
		break;
	case 'i':
		verb  = 'italicised';
		open  = '<em>';
		close = '</em>';
		break;
	default:
		return;
	}

	txt = prompt('Enter the text you would like ' + verb + ':', '');
	if (txt === null || txt === '') {
		return;
	}
	input = document.getElementById('text');
	input.value += open + txt + close + ' ';
	setSelectionRange(input, input.value.length, input.value.length);
	input.focus();
	return;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	}
	else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	}
}