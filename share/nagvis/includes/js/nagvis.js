/*****************************************************************************
 *
 * nagvis.js - Some NagVis function which are used in NagVis frontend
 *
 * Copyright (c) 2004-2008 NagVis Project (Contact: lars@vertical-visions.de)
 *
 * License:
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 *
 *****************************************************************************/
 
/**
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */

/* Comments for jslint */
/*global document, location, navigator, window, setTimeout, ActiveXObject */
/*global XMLHttpRequest, alert */

/*jslint evil: true, */

/* Initiate global vars which are set later in the parsed HTML */
var oWorkerProperties, oGeneralProperties, oRotationProperties, oPageProperties;
var oFileAges;
var aInitialMapObjects, aInitialMaps, aInitialRotations, aMapObjects, aMaps;
var aRotations;
var oStatusMessageTimer;

var aMapObjects = [];

// Initialize and define some other basic vars
var iNow = Date.parse(new Date());

// Define some state options
var oStates = {};

function date(format, timestamp) {
	// http://kevin.vanzonneveld.net
	// +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
	// +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: MeEtc (http://yass.meetcweb.com)
	// +   improved by: Brad Touesnard
	// +   improved by: Tim Wiel
	// *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
	// *     returns 1: '09:09:40 m is month'
	// *     example 2: date('F j, Y, g:i a', 1062462400);
	// *     returns 2: 'September 2, 2003, 2:26 am'
	
	var a;
	var jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
	
	var pad = function(n, c) {
		var len = (n = n + "").length;
		if(len < c ) {
			do {
				n = "0" + n;
				len++;
			} while(len < c);
			return n;
		} else {
			return n;
		}
	};
	
	var txt_weekdays = ["Sunday","Monday","Tuesday","Wednesday",
		"Thursday","Friday","Saturday"];
	var txt_ordin = {1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};
	var txt_months =  ["", "January", "February", "March", "April",
		"May", "June", "July", "August", "September", "October", "November",
		"December"];
	
	var f = {
		// Day
		d: function(){
				return pad(f.j(), 2);
		},
		D: function(){
				return f.l().substr(0,3);
		},
		j: function(){
				return jsdate.getDate();
		},
		l: function(){
				return txt_weekdays[f.w()];
		},
		N: function(){
				return f.w() + 1;
		},
		S: function(){
				return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
		},
		w: function(){
				return jsdate.getDay();
		},
		z: function(){
				return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
		},
		// Week
		W: function(){
				a = f.z();
				var b = 364 + f.L() - a;
				
				var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
	
				if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
						return 1;
				} else{
	
						if(a <= 2 && nd >= 4 && a >= (6 - nd)){
								nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
								return date("W", Math.round(nd2.getTime()/1000));
						} else{
								return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
						}
				}
		},
		// Month
		F: function(){
				return txt_months[f.n()];
		},
		m: function(){
				return pad(f.n(), 2);
		},
		M: function(){
				return f.F().substr(0,3);
		},
		n: function(){
				return jsdate.getMonth() + 1;
		},
		t: function(){
				var n;
				if( (n = jsdate.getMonth() + 1) == 2 ){
						return 28 + f.L();
				} else{
						if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
								return 31;
						} else{
								return 30;
						}
				}
		},
		
		// Year
		L: function(){
				var y = f.Y();
				return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
		},
		//o not supported yet
		Y: function(){
				return jsdate.getFullYear();
		},
		y: function(){
				return (jsdate.getFullYear() + "").slice(2);
		},
		// Time
		a: function(){
				return jsdate.getHours() > 11 ? "pm" : "am";
		},
		A: function(){
				return f.a().toUpperCase();
		},
		B: function(){
				// peter paul koch:
				var off = (jsdate.getTimezoneOffset() + 60)*60;
				var theSeconds = (jsdate.getHours() * 3600) +
												 (jsdate.getMinutes() * 60) +
													jsdate.getSeconds() + off;
				var beat = Math.floor(theSeconds/86.4);
				
				if (beat > 1000) { beat -= 1000; }
				if (beat < 0) { beat += 1000; }
				if ((String(beat)).length == 1) { beat = "00"+beat; }
				if ((String(beat)).length == 2) { beat = "0"+beat; }
				
				return beat;
		},
		g: function(){
				return jsdate.getHours() % 12 || 12;
		},
		G: function(){
				return jsdate.getHours();
		},
		h: function(){
				return pad(f.g(), 2);
		},
		H: function(){
				return pad(jsdate.getHours(), 2);
		},
		i: function(){
				return pad(jsdate.getMinutes(), 2);
		},
		s: function(){
				return pad(jsdate.getSeconds(), 2);
		},
		//u not supported yet
		// Timezone
		//e not supported yet
		//I not supported yet
		O: function(){
			 var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
			 if (jsdate.getTimezoneOffset() > 0) { t = "-" + t; } else { t = "+" + t; }
			 return t;
		},
		P: function(){
				var O = f.O();
				return (O.substr(0, 3) + ":" + O.substr(3, 2));
		},
		//T not supported yet
		//Z not supported yet
		// Full Date/Time
		c: function(){
				return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
		},
		//r not supported yet
		U: function(){
				return Math.round(jsdate.getTime()/1000);
		}
	};
	
	return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
			var ret;
			
			if( t!=s ){
					// escaped
					ret = s;
			} else if( f[s] ){
					// a date function exists
					ret = f[s]();
			} else{
					// nothing special
					ret = s;
			}
			
			return ret;
		});
}

/**
 * Update the worker counter
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function updateWorkerCounter() {
	var oWorkerCounter = document.getElementById('workerLastRunCounter');
	// write the time to refresh to header counter
	if(oWorkerCounter) {
		if(oWorkerProperties.last_run) {
			oWorkerCounter.innerHTML = date(oGeneralProperties.date_format, oWorkerProperties.last_run/1000);
		}
	}
	oWorkerCounter = null;
	return true;
}

/**
 * Function to start the page refresh/rotation
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function rotatePage() {
	if(oRotationProperties.nextStepUrl !== '') {
		if(oRotationProperties.rotationEnabled) {
			window.open(oRotationProperties.nextStepUrl, "_self");
			return true;
		}
	} else {
		window.location.reload(true);
		return true;
	}
	return false;
}

/**
 * Function counts down in 1 second intervals. If nextRotationTime is smaller
 * than 0, refresh/rotate
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function rotationCountdown() {
	if(oRotationProperties.nextStepTime && oRotationProperties.nextStepTime !== '') {
		// Countdown one second
		oRotationProperties.nextStepTime -= 1;
		
		if(oRotationProperties.nextStepTime <= 0) {
			return rotatePage();
		} else {
			var oRefCountHead = document.getElementById('refreshCounterHead');
			// write the time to refresh to header counter
			if(oRefCountHead) {
				oRefCountHead.innerHTML = oRotationProperties.nextStepTime;
				oRefCountHead = null;
			}
			
			var oRefCount = document.getElementById('refreshCounter');
			// write the time to refresh to the normal counter
			if(oRefCount) {
				oRefCount.innerHTML = oRotationProperties.nextStepTime;
				oRefCount = null;
			}
		}
	}
	return false;
}

/**
 * Function gets the value of url params
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function getUrlParam(name) {
	var name2 = name.replace('[', '\\[').replace(']', '\\]');
	var regexS = "[\\?&]"+name2+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(window.location);
	if(results === null) {
		return '';
	} else {
		return results[1];
	}
}

/**
 * Function to set the rotation switch label dynamicaly
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function setRotationLabel(startLabel,stopLabel) {
	var oRotationSwitch = document.getElementById('rotationSwitch');
	if(getUrlParam('rotation') === '') {
		oRotationSwitch.style.visibility = 'hidden';
	} else {
		if(oRotationProperties.rotationEnabled) {
			oRotationSwitch.innerHTML = stopLabel;
		} else {
			oRotationSwitch.innerHTML = startLabel;
		}
	}
	oRotationSwitch = null;
}

/**
 * Function to start/stop the rotation
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function switchRotation(obj, startLabel, stopLabel) {
	if(oRotationProperties.rotationEnabled) {
		oRotationProperties.rotationEnabled = false;
		setRotationLabel(startLabel, stopLabel);
	} else {
		oRotationProperties.rotationEnabled = true;
		setRotationLabel(startLabel, stopLabel);
	}
}

function changeMap(htmlBase, mapName) {
	if(mapName.match('^automap=')) {
		location.href=htmlBase+'/nagvis/index.php?' + mapName;
	} else {
		if (mapName === '') {
			location.href=htmlBase+'/nagvis/index.php';
		} else {
			location.href=htmlBase+'/nagvis/index.php?map=' + mapName;
		}
	}
}

function getCurrentTime() {
	var oDate = new Date();
	var sHours = oDate.getHours();
	sHours = (( sHours < 10) ? "0"+sHours : sHours);
	var sMinutes = oDate.getMinutes();
	sMinutes = (( sMinutes < 10) ? "0"+sMinutes : sMinutes);
	var sSeconds = oDate.getSeconds();
	sSeconds = (( sSeconds < 10) ? "0"+sSeconds : sSeconds);
	
	return sHours+":"+sMinutes+":"+sSeconds;
}

function getRandomLowerCaseLetter() {
   return String.fromCharCode(97 + Math.round(Math.random() * 25));
}

function getRandom(min, max) {
	if( min > max ) {
		return -1;
	}
	
	if( min == max ) {
		return min;
	}
	
	return min + parseInt(Math.random() * (max-min+1), 0);
}

function cloneObject(what) {
	var o;
	var i;
	
	if(what instanceof Array) {
		o = [];
	} else {
		o = {};
	}
	
	for (i in what) {
		if (typeof what[i] == 'object') {
			if(i != 'parsedObject') {
				o[i] = cloneObject(what[i]);
			}
		} else {
			o[i] = what[i];
		}
	}
	
	return o;
}

function pageWidth() {
	var w;
	
	if(window.innerWidth !== null) { 
		w = window.innerWidth;
	} else if(document.documentElement && document.documentElement.clientWidth) {
		w = document.documentElement.clientWidth;
	} else if(document.body !== null) {
		w = document.body.clientWidth;
	} else {
		w = null;
	}
	
	return w;
}

function pageHeight() {
	var h;
	
	if(window.innerHeight !== null) { 
		h = window.innerHeight;
	} else if(document.documentElement && document.documentElement.clientHeight) {
		h = document.documentElement.clientHeight;
	} else if(document.body !== null) {
		h = document.body.clientHeight;
	} else {
		h = null;
	}
	
	return h;
}

/**
 * Scrolls the screen to the defined coordinates
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function scrollSlow(iTargetX, iTargetY, iSpeed) {
	var currentScrollTop;
	var currentScrollLeft;
	var iMapOffsetTop;
	var scrollTop;
	var scrollLeft;
	var iWidth;
	var iHeight;
	
	var iStep = 2;
	
	if (typeof window.pageYOffset !== 'undefined') {
		currentScrollTop = window.pageYOffset;
	} else if (typeof document.compatMode !== 'undefined' && document.compatMode !== 'BackCompat') {
		currentScrollTop = document.documentElement.scrollTop;
	} else if (typeof document.body !== 'undefined') {
		currentScrollTop = document.body.scrollTop;
	}
	
	if (typeof window.pageXOffset !== 'undefined') {
		currentScrollLeft = window.pageXOffset;
	} else if (typeof document.compatMode != 'undefined' && document.compatMode !== 'BackCompat') {
		currentScrollLeft = document.documentElement.scrollLeft;
	} else if (typeof document.body !== 'undefined') {
		currentScrollLeft = document.body.scrollLeft;
	}
	
	// Get offset of the map div
	var oMap = document.getElementById('map');
	if(oMap && oMap.offsetTop) {
		iMapOffsetTop = oMap.offsetTop;
	} else {
		iMapOffsetTop = 0;
	}
	oMap = null;
	
	// Get measure of the screen
	iWidth = pageWidth();
	iHeight = pageHeight() - iMapOffsetTop;
		
	if(iTargetY <= (currentScrollTop+iHeight)  && iTargetY >= currentScrollTop) {
		// Target is in current view
		scrollTop = 0;
	} else if(iTargetY < currentScrollTop) {
		// Target is above current view
		scrollTop = -iStep;
	} else if(iTargetY > currentScrollTop) {
		// Target is below current view
		scrollTop = iStep;
	}
	
	if(iTargetX <= (currentScrollLeft+iWidth) && iTargetX >= currentScrollLeft) {
		// Target is in current view
		scrollLeft = 0;
	} else if(iTargetX < currentScrollLeft) {
		// Target is left from current view
		scrollLeft = -iStep;
	} else if(iTargetX > currentScrollLeft) {
		// Target is right from current view
		scrollLeft = iStep;
	} else {
		scrollLeft = 0;
	}
	
	eventlog("scroll", "debug", currentScrollLeft+" to "+iTargetX+" = "+scrollLeft+", "+currentScrollTop+" to "+iTargetY+" = "+scrollTop);
	
	if(scrollTop !== 0 || scrollLeft !== 0) {
		window.scrollBy(scrollLeft, scrollTop);
		
		setTimeout(function() { scrollSlow(iTargetX, iTargetY, iSpeed); }, iSpeed);
	} else {
		eventlog("scroll", "debug", 'No need to scroll: '+currentScrollLeft+' - '+iTargetX+', '+currentScrollTop+' - '+iTargetY);
	}
}

/**
 * escapeUrlValues
 *
 * Escapes some evil signs in the url parameters
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function escapeUrlValues(sStr) {
	if(sStr.search('\\+') !== -1) {
		sStr = sStr.replace(/\+/g, '%2B');
	}
	
	if(sStr.search('&') !== -1) {
		sStr = sStr.replace(/&/g, '%26');
	}
	
	if(sStr.search('#') !== -1) {
		sStr = sStr.replace(/#/g, '%23');
	}
	
	if(sStr.search(':') !== -1) {
		sStr = sStr.replace(/:/g, '%3A');
	}
	
	if(sStr.search(' ') !== -1) {
		sStr = sStr.replace(/ /g, '%20');
	}
	
	if(sStr.search('=') !== -1) {
		sStr = sStr.replace(/=/g, '%3D');
	}
	
	if(sStr.search('\\?') !== -1) {
		sStr = sStr.replace(/\?/g, '%3F');
	}
	
	return sStr;
}

/**
 * Function to dumping arrays/objects in javascript for debugging purposes
 * Taken from http://refactormycode.com/codes/226-recursively-dump-an-object
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function oDump(object, depth, max){
	depth = depth || 0;
	max = max || 2;
	
	if (depth > max) {
		return false;
	}
	
	var indent = "";
	for (var i = 0; i < depth; i++) {
		indent += "  ";
	}
	
	var output = "";  
	for (var key in object) {
		output += "\n" + indent + key + ": ";
		switch (typeof object[key]) {
			case "object": output += oDump(object[key], depth + 1, max); break;
			case "function": output += "function"; break;
			default: output += object[key]; break;        
		}
	}
	return output;
}

/**
 * Detect firefox browser
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function isFirefox() {
  return navigator.userAgent.indexOf("Firefox") > -1;
}

/*
 * addDOMLoadEvent - Option schedules given javascript code to be executed after
 *                   the whole page was loaded in browser
 *
 * (c)2006 Jesse Skinner/Dean Edwards/Matthias Miller/John Resig
 * Special thanks to Dan Webb's domready.js Prototype extension
 * and Simon Willison's addLoadEvent
 *
 * For more info, see:
 * http://www.thefutureoftheweb.com/blog/adddomloadevent
 * http://dean.edwards.name/weblog/2006/06/again/
 * http://www.vivabit.com/bollocks/2006/06/21/a-dom-ready-extension-for-prototype
 * http://simon.incutio.com/archive/2004/05/26/addLoadEvent
 *
 * Hope the use here in NagVis is ok for license reasons. If not please contact me.
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
addDOMLoadEvent = (function(){
    // create event function stack
    var load_events = [],
        load_timer,
        script,
        done,
        exec,
        old_onload,
        init = function () {
            done = true;

            // kill the timer
            clearInterval(load_timer);

            // execute each function in the stack in the order they were added
            while (exec = load_events.shift())
                exec();

            if (script) script.onreadystatechange = '';
        };

    return function (func) {
        // if the init function was already ran, just run this function now and stop
        if (done) return func();

        if (!load_events[0]) {
            // for Mozilla/Opera9
            if (document.addEventListener)
                document.addEventListener("DOMContentLoaded", init, false);

            // for Internet Explorer
            /*@cc_on @*/
            /*@if (@_win32)
                document.write("<script id=__ie_onload defer src=//0><\/scr"+"ipt>");
                script = document.getElementById("__ie_onload");
                script.onreadystatechange = function() {
                    if (this.readyState == "complete")
                        init(); // call the onload handler
                };
            /*@end @*/

            // for Safari
            if (/WebKit/i.test(navigator.userAgent)) { // sniff
                load_timer = setInterval(function() {
                    if (/loaded|complete/.test(document.readyState))
                        init(); // call the onload handler
                }, 10);
            }

            // for other browsers set the window.onload, but also execute the old window.onload
            old_onload = window.onload;
            window.onload = function() {
                init();
                if (old_onload) old_onload();
            };
        }

        load_events.push(func);
    }
})();

/**
 * Handles javascript errors in the browser. It sends some entry to the frontend
 * eventlog. It also displays an error box to the user.
 * It returns true to let the browser also handle the error.
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function handleJSError(sMsg, sUrl, iLine) {
    // Log to javascript eventlog
	eventlog("js-error", "critical", "JS-Error occured: " + sMsg + " " + sUrl + " (" + iLine + ")");
	
	// Show error box
	var oMsg = {};
	oMsg.type = 'CRITICAL';
	oMsg.message = "Javascript error occured:\n " + sMsg + " " + sUrl + " (" + iLine + ")";
	oMsg.title = "Javascript error";
	
	// Handle application message/error
	frontendMessage(oMsg);
	oMsg = null;
	
	return false;
}

// Enable javascript error handler
try {
	window.onerror = handleJSError;
} catch(er) {}


/**
 * Displays a system status message
 *
 * @author	Lars Michelsen <lars@vertical-visions.de>
 */
function displayStatusMessage(msg, type, hold) {
	var iMessageTime = 5000;
	
	var oMessage = document.getElementById('statusMessage');
	
	// Initialize when not yet done
	if(!oMessage) {
		oMessage = document.createElement('div');
		oMessage.setAttribute('id', 'statusMessage');
		
		document.body.appendChild(oMessage);
	}
	
	// When there is another timer clear it
	if(oStatusMessageTimer) {
		clearTimeout(oStatusMessageTimer);
	}
	
	var cont = msg;
	if (type) {
		cont = '<div class="'+type+'">'+cont+'</div>';
	}
	
	oMessage.innerHTML = cont;
	oMessage.style.display = 'block';
	
	if (type != 'loading') {
		oMessage.onmousedown = function() { hideStatusMessage(); return true; };
	}
	
	if (!hold) {
		oStatusMessageTimer = window.setTimeout(function() { hideStatusMessage(); }, iMessageTime);
	}
	
	oMessage = null;
}


// make a message row disapear
function hideStatusMessage() {
	var oMessage = document.getElementById('statusMessage');
	
	// Only hide when initialized
	if(oMessage) {
		oMessage.style.display = 'none';
		oMessage.onmousedown = null;
	}
}

