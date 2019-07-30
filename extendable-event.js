"use module"
import { Event} from "yaeti" // does this exist/

export const
  extendableEventWaits= Symbol.for("ExtendableEvent::waits")

export class ExtendableEvent extends Event{
	waitUntil( p){
		let waits= this[ extendableEventWaits]|| (this[ extendableEventWaits]= [])
		waits.push( p)
	}
	then(){
		// all-in-all would be neat here!
		return Promise.all( this[ extendableEventWait]|| [])
	}
}
export default ExtendableEvent
