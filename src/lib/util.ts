function type(str:string){
	return Object.prototype.toString.call(str).slice(8,-1).toLowerCase();

}

function isBlank(str:string) {
	if (type(str) === 'undefined') { //空
	  return true
	} else if (
		type(str) === 'string' ||
		type(str) === 'array') { //字条串或数组
	  if (str == "null") {
		return true
	  } else {
		return str.length == 0 ? true : false
	  }
	} else if (type(str) === 'object') {
	  return JSON.stringify(str) == '{}' ? true : false
	} else if (type(str) === 'number') {
	  return false
	} else {
	  return true
	}
  }

  export {isBlank}