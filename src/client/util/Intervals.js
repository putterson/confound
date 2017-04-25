let instance = null
let interval_handles = [];

class Intervals {
    constructor() {
        if(!instance){
              instance = this;
        }
        return instance
    }

    register_interval(callback, interval) {
        var handle = setInterval(callback, interval);
        interval_handles.push(handle);
        // console.log("After register: ");
        // console.log(interval_handles);
        return handle;
    }

    clear_interval(handle) {
        var idx = interval_handles.indexOf(handle);
        if ( idx === -1 ) {
        throw "Interval handle " + handle + " is not registered."
        }
        clearInterval(handle);
        interval_handles.splice(idx,1);
        // console.log("After clear: ");
        // console.log(interval_handles);
    }

    clear_all_intervals() {
        while ( interval_handles.length > 0 ) {
        var handle = interval_handles[0];
        clearInterval(handle);
        interval_handles.splice(0,1);
        }
        // console.log("After clear all: ");
        // console.log(interval_handles);
    }


    start_interval(seconds, update_callback) {
        var remaining = seconds;
        var interval = null;
        var update = () => {
            // console.log("Timer remaining: " + remaining)
            if ( remaining <= 0 ) {
                this.clear_interval(interval);
            }
            update_callback(remaining);
            remaining--;
        };
        update(remaining);
        interval = this.register_interval(update, 1000);
    }

    /* Return the number of registered handlers */
    num_handlers() {
        return interval_handles.length;
    }
}

export default Intervals