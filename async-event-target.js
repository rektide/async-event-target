"use module"
import { EventTarget} from "yaeti"

const __dispatchEvent= EventTarget.prototype.dispatchEvent

class ExtendableEventTarget extends EventTarget{
	dispatchEvent( evt){
		var awaiting= []
		function waitUntil( promise){
			awaiting.push( promise)
		}
		// https://www.w3.org/TR/service-workers-1/#dom-extendableevent-waituntil
		evt.waitUntil= waitUntil
		var value= __dispatchEvent.call( this, evt)
		if( value=== false){
			return false
		}
		return new Promise( res=> setImmediate(()=> res( Promise.all( awaiting))))
	}
}
export default ExtendableEventTarget
