export function throttleDebounce(fn, delay) {
	let last = 0;
	let timer = null;
	return function () {
		let context = this;
		let args = arguments;
		let now = +new Date();
		if (now - last < delay) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn.apply(context, args);
				last = now;
			}, delay);
		} else {
			last = now;
			fn.apply(context, args);
		}
	}
}
