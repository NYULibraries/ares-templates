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

 
function Lace(defaultInterval, timeout) {
  	// Member functions
	this.init          = laceInit;
	this.start         = laceStart;
	this.stop          = laceStop;
 	this.send          = laceSend;
 	this.get           = laceGet;
 	this.handleSend    = laceHandleSend;
 	this.handleGet     = laceHandleGet;
 	this.httpObject    = laceHttpObject;
 	this.insertResults = laceInsertResults; 
 	this.previewUpdate = lacePreviewUpdate;
 	this.timerStart    = laceTimerStart;
 	this.timerStop     = laceTimerStop;
 	this.timerReset    = laceTimerReset;
 	this.timerSet      = laceTimerSet;
 	this.timerStep     = laceTimerStep;
 	this.statusDisplay = laceStatusDisplay;
 	this.setActive     = laceSetActive;
 	this.resetInputs   = laceResetInputs;
 	this.disableInputs = laceDisableInputs;
 	this.enableInputs  = laceEnableInputs;
 	this.removeAllChildNodes = laceRemoveAllChildNodes;
 	
 	this.setName = laceSetName;
	// Fire it up!
 	this.init(defaultInterval, timeout);
}

function laceInit(defaultInterval, timeout) {
	// Inititialize member variables
	this.interval   = 0;
	this.defaultInterval = defaultInterval * 1000; // Default interval if IntervalManager is not present
	this.url        = 'ares.dll';
	this.nameObj    = document.getElementById('name');
	this.textObj    = document.getElementById('text');
	this.laceDomRef = document.getElementById('laceoutput');
	
	var thisObj = this;
	
	// Initialize Live Preview if present
	if (window.Preview) {
		this.PreviewObj = new Preview('preview');
		// Javascript has scope issues with using 'this'
		// inside of an anonymous function, so we use a
		// copy of 'this' (thisObj)
		this.textObj.onkeyup = function() { thisObj.previewUpdate(thisObj.textObj.value); };
	}
	
	// Inititalize HTML Buttons if present
	if (window.createHTMLButtons) {
		createHTMLButtons();
	}
	
	//Inititalize Interval Manager if present
	if (window.IntervalManager) {
		this.intManObj = new IntervalManager(timeout);
	}
	
	// Turn off AutoComplete for the text box
	this.textObj.setAttribute('autocomplete', 'off');
	this.textObj.focus();
	
	// Used for detecting updates
	this.hash = 'default hash';
	
	// Used for detecting redundant/double posts
	this.lastPost = '';
	
	// Lace state and timer properties
	this.isActive = false;
	this.interval = false;
	
	// XMLHttpRequest!
	this.httpSendObj = this.httpObject();
	this.httpGetObj  = this.httpObject();
	
	// Set the internal name change monitor
	this.name = encodeURIComponent(this.nameObj.value);
	
	// Start Lace if XMLHttpRequest is present.  Also, we need 
	// to use encodeURIComponent.  Sorry IE5.0...
if (this.httpSendObj !== false && this.httpGetObj !== false && window.encodeURIComponent) {
		// Inititalize status display

	this.statusDisplay();

		// Connect the form to XMLHttpRequest
		document.getElementById('laceform').onsubmit = function() {thisObj.send(); return false;};
	
		// Activate Lace
		this.start();
	}
}

function laceDisableInputs()
{
	this.inputsDisabled = true;
	this.textObj.value = 'Sorry, your message is taking longer than expected to send.'
	this.textObj.disabled = true;
	var say = document.getElementById('say');
	say.disabled = true;
}

function laceEnableInputs()
{
	if (!this.inputsDisabled)
		return;
		
	this.inputsDisabled = false;	
	clearTimeout(this.waitMsgTimer);
	this.textObj.value = '';
	this.textObj.disabled = false;
	var say = document.getElementById('say');
	say.disabled = false;
	this.textObj.focus();
}

// Reset user inputs
function laceResetInputs()
{
	// Clear field value - even in Safari
	this.textObj.blur();
	this.textObj.value='';
	this.textObj.focus();
	
	this.previewUpdate('');
}

function laceSetName(name)
{
	if (name != this.name)
	{
		var oldName = this.name;
		this.name = name;
		
		date = new Date();
		setCookie(lace_name_cookie, name, date.getTime() + 2592000, lace_url_rel);
	}
}

function laceSend () {
	var thisObj = this;
	var name    = encodeURIComponent(this.nameObj.value);
	var text    = encodeURIComponent(this.textObj.value);
	
 	// No redundant/duplicate posts
	if (this.lastPost != '' && text == this.lastPost)
 	{
 		this.resetInputs();
 		alert('Sorry, you can\'t post the same message twice in a row.');
 		this.get();
 		return;
 	}
		
	if (name !== '' && text !== '') {
		if (this.httpSendObj.readyState === 4 || this.httpSendObj.readyState === 0) {
			this.setName(name);
			this.lastPost = text;
			this.resetInputs();
			//this.waitMsgTimer = setTimeout(function () {thisObj.disableInputs();}, 1200);

			var param = 'action=71&type=202&chatid=' + chatid + '&sessionid=' + sessionid + '&text=' + text;
			this.httpSendObj.open('POST','ares.dll', true);
			this.httpSendObj.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
			this.httpSendObj.onreadystatechange = function () { thisObj.handleSend(); };
			this.httpSendObj.send(param);
		}else {
			setTimeout(function () { thisObj.send(); }, 1000);
		}
	}
}

function laceHandleSend () {
	if (this.isActive === false)
		return;
			
	if (this.httpSendObj.readyState === 4) {
		// useful for debugging
		//alert(this.httpSendObj.responseText);
		this.timerReset();
		this.get();
	}
}

function laceGet (system) {
    var msgList = document.getElementById('laceoutput');
	msgList.innerHTML = simpleRequest('ares.dll?action=71&type=200&chatid=' + chatid + '&sessionid=' + sessionid);
	this.timerStep(system);
	updateUsersOnline();

//	if (this.httpGetObj.readyState === 4 || this.httpGetObj.readyState === 0) {
//		var param = 'hash=' + encodeURIComponent(this.hash);
		// Even though we're retrieving data, we still use
		// a POST request for security reasons.

//		this.httpGetObj.open('POST', this.url, true);
//		this.httpGetObj.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');		
//		var thisObj = this;
//		this.httpGetObj.onreadystatechange = function () { thisObj.handleGet(system); };
//		this.httpGetObj.send(param);
//  }
}

function laceHandleGet (system) {
	if (this.httpGetObj.readyState === 4) {
		var response = this.httpGetObj.responseText;
		// Very useful for debugging
		//alert(response);
		if (response !== null && typeof(response) != "undefined" && response.length > 0) {
			this.removeAllChildNodes(this.laceDomRef);
			this.insertResults();
		}
		//this.enableInputs();
		this.timerStep(system);
		updateUsersOnline();
	}
}

function laceStart() {
	this.setActive(true);
	this.timerStart();
}

function laceStop() {
	if (this.timerStop() === true) {
		this.setActive(false);
		alert('Chat is now stopped.\n\nTo resume chatting you can:\n\n - Say something\n - Press the Resume button\n - Refresh your browser window');
	}
}

function laceToggle() {
	if (this.isActive === false) {
		this.start();
	} else {
		this.stop();
	}
}


/* Lace's timer functions.
 * These functions should be better
 * abstracted into the IntervalManager.
 */
function laceTimerStart() {
	if (this.isActive === false) {
		return false;
	}
	
	if (this.intManObj) {
		var interval = this.intManObj.reset();
		this.timerSet(interval);
		return true;
	} else {
		// Use the default interval
		// if IntervalManager isn't present
		this.timerSet(this.defaultInterval);
	}
	
	return false;
}

function laceTimerStop(prompt) {
	if (this.isActive === false) {
		return true;
	}
	
	if (this.intManObj) {
		if (prompt === true) {
			this.timerStop();
			var reset = confirm('You have been idle for a while and chat has stopped checking for updates.\n\nIf you would like to restart chat, press OK.\n\nTo keep chat stopped, press Cancel.  You can always resume chat again later.');
			
			if (reset === true) {
				this.timerReset();
				this.get();
				return false;
			} else {
				 return this.stop();
			}
		}
		
		clearInterval(this.timerID);
		this.interval = false;
		return true;
	}
	
	return false;
}

function laceTimerSet(interval) {
	if (this.isActive === false) {
		return false;
	}

	this.interval = interval;
	var thisObj = this;
	clearInterval(this.timerID);
	this.timerID = setInterval(function () { thisObj.get(true); }, interval);
	
	return true;
}	

function laceTimerReset() {
	if (this.isActive === false) {
		return false;
	}
	if (this.intManObj) {
		var interval = this.intManObj.reset();
		return this.timerSet(interval);
	} else {
		this.timerStart();
	}
	
	return false;
}

function laceTimerStep(system) {
	if (this.isActive === false) {
		if (system !== true) {
			return this.start();
		}			
		else {
			return false;
		}
	}

	if (this.intManObj) {
		var interval = this.intManObj.step();
		if (interval !== false) {
			return this.timerSet(interval);
		} else {
			return this.timerStop(true);
		}
	}
	return false;
}

/* DOM madness */
function laceInsertResults() {
	// Records are separated by four pipes ||||
	var results = this.httpGetObj.responseText.split('||||');
	this.hash   = results[0];
	
	for (var i = 1; i < results.length; i++) {
		var first;
		// Fields are separated by two pipes ||
		var fields = results[i].split('||');
		
		if (fields[0].indexOf('date') !== -1) {
			// fields[0] = id attribute
			// fields[1] = date string (a * prefix denotes that it's 
			//                          class attribute is 'first')
			first = (fields[1].indexOf('*') === 0) ? true : false;
			var dayDiv = document.createElement('div');
			var h4 = document.createElement('h4');

			var dayClass = (first) ? 'daystamp first' : 'daystamp';

			dayDiv.setAttribute('id', fields[0]);
			dayDiv.setAttribute('class', dayClass);
			dayDiv.setAttribute('className', dayClass);
			
			var dayString = (first) ? fields[1].substring(1) : fields[1];
			var date = document.createTextNode(dayString);
			
			h4.appendChild(date);
			dayDiv.appendChild(h4);
			this.laceDomRef.appendChild(dayDiv);
			continue;
		}
		
		if (fields[0].indexOf('hour') !== -1) {
			// fields[0] = id attribute
			// fields[1] = hour string (a * prefix denotes that it's 
			//                          class attribute is 'first')			
			first  = (fields[1].indexOf('*') === 0) ? true : false;
			var hourDiv = document.createElement('div');
			var h5 = document.createElement('h5');
			
			var hourClass = (first) ? 'hourstamp first' : 'hourstamp';

			hourDiv.setAttribute('id', fields[0]);
			hourDiv.setAttribute('class', hourClass);
			hourDiv.setAttribute('className', hourClass);
			
			var hourString = (first) ? fields[1].substring(1) : fields[1];
			var hour = document.createTextNode(hourString);
			
			h5.appendChild(hour);
			hourDiv.appendChild(h5);
			this.laceDomRef.appendChild(hourDiv);
			continue;
		}
		
		// fields[0] = id attribute
		// fields[1] = time string
		// fields[2] = name (a * prefix denotes an action, a ! denotes a notice)
		// fields[3] = text                       
		var p       = document.createElement('p');
		var nameDiv = document.createElement('span');
		var textDiv = document.createElement('span');
		
		var timeStr = fields[1];
		var textStr = fields[3];
		
		var action = (fields[2].indexOf('*') === 0) ? true : false;
		var notice = (fields[2].indexOf('!') === 0) ? true : false;
		var nameStr = (action || notice) ? fields[2].substring(1) : fields[2];
		
		// System messages appear as an action by the user Lace
		var system = (action && nameStr == 'Lace');
		
		//p.setAttribute('id', 'msg_' + fields[0] + '_' + i);
		if (notice) {
			p.setAttribute('class', 'notice');
			p.setAttribute('className', 'notice');
		}
		if (system) {
			p.setAttribute('class', 'system');
			p.setAttribute('className', 'system');
			action = false;
		}			
		nameDiv.setAttribute('class', 'name');
		nameDiv.setAttribute('className', 'name');
		var className = (action) ? 'message action' : 'message';
		textDiv.setAttribute('class', className);
		textDiv.setAttribute('className', className);
			
		// After all that DOM junk, we settle for innerHTML
		// as there may be HTML in textStr that we want to keep.
		nameDiv.innerHTML = (action || notice && nameStr != 'Lace') ? '&nbsp;' : nameStr + ' <a title="' + timeStr + '">::</a> ';
		textDiv.innerHTML = (action || notice && nameStr != 'Lace') ? '<a title="' + timeStr + '">' + nameStr + '</a> ' + textStr : textStr;

		p.appendChild(nameDiv);
		p.appendChild(textDiv);
		this.laceDomRef.appendChild(p);
	}
}

function laceRemoveAllChildNodes(parent) {
	while (parent.hasChildNodes()) {
		var removed = parent.removeChild(parent.firstChild);
	}
	return true;
}

/* Create an XMLHttpRequest Object */
function laceHttpObject () {
	var xmlhttp = false;
	/*@cc_on
	@if (@_jscript_version >= 5)
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	}
	@else
	xmlhttp = false;
	@end @*/
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	    try {
	    	xmlhttp = new XMLHttpRequest();
	    } catch (e) {
	    	xmlhttp = false;
	    }
	}		
	return xmlhttp;
}

function lacePreviewUpdate (text) {
	if (this.PreviewObj) {
		this.PreviewObj.update(text);
	}
}

function laceSetActive(active) {
var img  = document.getElementById('statusimage');
	var text = document.getElementById('statustext');
	
	if (active === true) {
		img.setAttribute('src', './images/pause.gif');
		img.setAttribute('alt', 'Stop');
		img.setAttribute('title', 'Click to stop');
		
		this.isActive  = true;
		text.innerHTML = 'Chat is active.';
		
		// Issues arose after prolonged use of the XMLHttpRequest object where
		// XMLHttpRequest would hang or crash the browser.
		//
		// Re-initializing the XMLHttpRequest object appears to have solved that problem.
		this.httpGetObj  = this.httpObject();
		this.httpSendObj = this.httpObject();
		
		// Don't necessarily need this, but for some reason
		// it helps browsers redraw the screen, and removes
		// an intermittent bug where the Status Display
		// would fall out of view
		this.get();
	} else if (active === false) {
		img.setAttribute('src', './images/play.gif');
		img.setAttribute('alt', 'Start');
		img.setAttribute('title', 'Click to start');
		
		this.httpGetObj  = null;
		this.httpSendObj = null;		
		
		this.isActive = false;
		text.innerHTML  = 'Chat is stopped.';
		clearInterval(this.timerID);
	}
}

function laceStatusDisplay() {
	var outer = document.createElement('div');

	outer.setAttribute('id', 'status');
	
	var div = document.createElement('div');
	div.setAttribute('id', 'statuswrap');
	
	var txt = document.createElement('span');
	txt.setAttribute('id', 'statustext');	
	
	var img = document.createElement('img');		
	img.setAttribute('width', '13');
	img.setAttribute('height', '13');
	img.setAttribute('id', 'statusimage');
	
	var thisObj = this;
	img.onclick = function () { 
		if (thisObj.isActive === true) {
			thisObj.stop();
		} else {
			thisObj.start();
		}
	};
		
	div.appendChild(txt);
	div.appendChild(img);
	outer.appendChild(div);
	
  	var parent = document.getElementById('subnav');	
    parent.appendChild(outer);
}

/* Simple, fire and forget XHR */
function simpleRequest(url, params) {
	req = laceHttpObject();
	req.open('GET', url, false);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');	
	req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );	
	req.send(params);
	if (req.responseText.indexOf('|') == -1)
		return req.responseText;
	else
		return req.responseText.split('|');
}

function updateUsersOnline() {
	var userList = document.getElementById('users');
	userList.innerHTML = simpleRequest('ares.dll?action=71&type=201&chatid=' + chatid + '&sessionid=' + sessionid + '&hash=' + Math.random());
}