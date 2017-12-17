/** @jsx vdo */
const vdo = require('vdo');
const styled = require('../src/index');

test('render a component with a class name', () => {
	const Cmpnt = styled('div')`
		color: red;
	`;
	const result = <Cmpnt id="pizza" />;
	expect(result.toString()).toMatchSnapshot();
});

test('omit non-HTML props', () => {
	const Cmpnt = styled('div')`
		color: red;
	`;
	const result = <Cmpnt id="pizza" coffee={42} />;
	expect(result.toString()).toMatchSnapshot();
});

test('render a component with children', () => {
	const Cmpnt = styled('div')`
		color: red;
	`;
	const result = (
		<Cmpnt>
			<h1>Hello</h1>
		</Cmpnt>
	);
	expect(result.toString()).toMatchSnapshot();
});

test('withComponent changes component', () => {
	const Cmpnt = styled('div')`
		color: red;
	`;
	const Cmpnt2 = Cmpnt.withComponent('span');
	const result = <Cmpnt2 />;
	expect(result.toString()).toMatchSnapshot();
});
