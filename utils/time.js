/**
 * returns current `timestamp`
 * @returns 
 */
 exports.currentTimestamp = (miliseconds = false) => {

    let date = new Date();
	let timestamp = date.getTime();
	if ( ! miliseconds ) timestamp = +( ( ""+timestamp ).slice(0,-3) );

    return timestamp;
}