
import is from "./is";

function EventEmitter(){
    this._events = {};
}

var proto = EventEmitter.prototype;

/**
 * $on
 */
proto.$on = function(type, callback){
    if (!is.str(type)) 
        throw new Error(`the first argument method $on must be a string`);
    if (!is.fun(callback)) 
        throw new Error(`the second argument method $on must be a function`);

    if(!this._events[type]){
        this._events[type] = [];
    }
    this._events[type].push(callback);
    return this;
}

/**
 * $emit
 */
proto.$emit = function(type, args){
    if (!this._events[type])
        throw new Error(`can not found event type named ${type}`);
    this._events[type].forEach(callback => {
        callback(args);
    });
}

export default EventEmitter;