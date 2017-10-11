//import EventTarget from "yaeti"
var EventTarget= require("yaeti").EventTarget

const __dispatchEvent= EventTarget.prototype.dispatchEvent

class AsyncEventTarget extends EventTarget{
	dispatchEvent( evt){
		var awaiting= []
		function alsoAwait( promise){
			awaiting.push( promise)
		}
		evt.alsoAwait= alsoAwait
		var value= __dispatchEvent.call( this, evt)
		if( value=== false){
			return false
		}
		return Promise.all(awaiting)
	}
}
