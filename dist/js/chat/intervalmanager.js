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
 
function IntervalManager(timeout) {
	
	this.init  = intervalManagerInit;
	this.reset = intervalManagerReset;
	this.add   = intervalManagerAdd;
	this.step  = intervalManagerStep;
	this.get   = intervalManagerGet;
	
	this.init(timeout);
}
	
function intervalManagerInit (timeout) {
	this._timeout  = timeout * 60;
	this._min      = 4;
	this._step     = 0.2;
	this._duration = 0;
	this._count    = 0;
	
	this._interval = this._min;
}

function intervalManagerReset() {
	this._interval = this._min;
	this._duration = 0;	
	this._count    = 0;
		
	return this.get();
}

function intervalManagerAdd (amt) {
	this._interval += amt;
	this._duration += this._interval;		
	this._count++;	
}

function intervalManagerStep() {
	// Timer has reached the _timeout limit
	if (this._duration >= this._timeout) {
		return false;
	}

	var increment = Math.round(this._step * this._count);
	
	this.add(increment);
	return this.get();
}

function intervalManagerGet () {
	return this._interval * 1000;
}