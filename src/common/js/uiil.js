export  function urlParse () {
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);
	if(arr) {
		arr.forEach((item) => {
			let tempArr = item.substring(1).split('=');
			// console.log(tempArr[0])
			// let key = decodeURLComponent(tempArr[0]);
			// let val = decodeURLComponent(tempArr[1]);
			obj[tempArr[0]] = tempArr[1];
		})
	}
	return obj
}
