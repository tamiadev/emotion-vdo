const { omitAssign } = require('../src/util');

it('merge objects omitting given some props', () => {
	const result = omitAssign(p => p !== 'foo', {}, { a: 1, b: 2 }, { b: 3, foo: 4 });
	expect(result).toEqual({
		a: 1,
		b: 3,
	});
});
