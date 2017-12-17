function omitAssign(testFn, target, ...rest) {
	let idx = 0;
	const length = rest.length;
	for (; idx < length; idx++) {
		const source = rest[idx];
		let key;
		for (key in source) {
			if (testFn(key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
}

module.exports = { omitAssign };
