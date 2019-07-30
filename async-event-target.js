"use module"
import { EventTarget} from "yaeti"
import { ExtendableEventMixin} from "./extendable-event.js"

const __dispatchEvent= EventTarget.prototype.dispatchEvent

class ExtendableEventTarget extends EventTarget{

	static mixin( eventTarget){
		if( !( eventTarget instanceof ExtendableEventTarget)&& eventTarget.dispatchEvent!== ExtendableEventTarget.prototype.dispatchEvent){
			Object.defineProperties( eventTarget, {
				dispatchEvent: {
					value: ExtendableEventTarget.prototype.dispatchEvent,
					configurable: true
				}
			})
		}
		return eventTarget
	}

	dispatchEvent( evt){
		// enhance event
		ExtendableEventMixin( evt)

		// call underlying
		var value= __dispatchEvent.call( this, evt)
		if( value=== false){
			return false
		}
		// return a promise for when all the waits are done
		return evt.then()
	}
}
export const ExtendableEventTargetMixin= ExtendableEventTarget.mixin
export {
	ExtendableEventTarget as default,
	ExtendableEventTargetMixin as mixin
}
