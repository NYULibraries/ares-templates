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
 
function Preview(id) {
 	
 	this.init    = previewInit;
 	this.update  = previewUpdate;
 	this.display = previewDisplay;

 	if (arguments.length > 0) {
 		this.init(id);
 	}
}

function previewInit (id) {
	this.display();
	this.domRef = document.getElementById(id);
}
 		
function previewUpdate (text) {
	if (!this.domRef) {
		return false;
	}

	this.domRef.innerHTML = text;
}

function previewDisplay () {
	var parent  = document.getElementById('lacecontrols');
	if (!parent) {
		return false;
	}	
	var tr      = document.createElement('tr');
	var label   = document.createElement('td');
	var text    = document.createTextNode('Live Preview:');
	var preview = document.createElement('td');

	label.setAttribute('className', 'preview');
	label.setAttribute('class', 'preview');
	preview.setAttribute('id', 'preview');
	label.appendChild(text);
	tr.appendChild(label);
	tr.appendChild(preview);
	parent.insertBefore(tr, parent.firstChild);
}