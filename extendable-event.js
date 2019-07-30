"use module"
import { Event} from "yaeti" // does this exist/

export const
  extendableEventWaits= Symbol.for("ExtendableEvent::waits")

export class ExtendableEvent extends Event{

	static mixin( evt){
		if( !evt.waitUntil){
			if( evt.then){
				throw new Error("Event already had a then")
			}
			// enhance!
			Object.defineProperties( evt, {
				waitUntil: {
					value: ExtendableEvent.prototype.waitUntil,
					configurable: true
				},
				then: {
					value: ExtendableEvent.prototype.then,
					configurable: true
				}
			})
		}
		return evt
	}

	// https://www.w3.org/TR/service-workers-1/#dom-extendableevent-waituntil
	waitUntil( p){
		let waits= this[ extendableEventWaits]|| (this[ extendableEventWaits]= [])
		waits.push( p)
	}
	then( a, b){
		// all-in-all would be neat here! so new waitUntils continue to work
		return Promise.all( this[ extendableEventWait]|| []).then( a, b)
	}
}
export const ExtendableEventMixin= ExtendableEvent.mixin
export {
	ExtendableEvent as default,
	ExtendableEventMixin as mixin
}
