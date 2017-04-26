/* Seconds to minutes and seconds */
export function s_to_m_s (seconds) {
    var min = Math.floor(seconds/60);
    var sec = seconds % 60;
    if ( min > 0 ) {
	return min + ":" + ("00" + sec).slice(-2);
    } else {
	return sec;
    }
}
/* And vice versa */
export function m_s_to_s (min_sec) {
    var components = min_sec.split(":");
    if (components.length > 2 || components.length === 0) {
	throw "Invalid minute:second format";
    } else if ( components.length === 2 ) {
	return 60 * parseInt(components[0]) + parseInt(components[1]);
    } else if ( components.length === 1 ) {
	return parseInt(components[0]);
    }
}

export function parseTime(input) {
    var components = input.toString().split(":")
    let multipliers = [1, 60, 3600]
    if(components.length > 3 || components.length === 0){
        return undefined
    } else {
        //TODO(putterson): parseInt is very lax in what it will accept
        let ints= components.map((x, i) => parseInt(x, 10))
        if(ints.filter(integer => integer === NaN).length > 0){
            return undefined
        }

        let seconds = components.reverse().map((x, i) => x * multipliers[i])
        let sum = seconds.reduce((n, m) => n + m, 0)
        if(sum >= 0){
            return sum
        }
    }
}