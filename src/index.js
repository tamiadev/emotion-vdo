// Adapted from react-emotion

const vdo = require('vdo');
const { memoize, STYLES_KEY } = require('emotion-utils');
const { css, getRegisteredStyles } = require('emotion');
const { omitAssign } = require('./util');
const allowedPropsRegex = require('./props');

const testOmitPropsOnStringTag = memoize(key => allowedPropsRegex.test(key));

const testAlwaysTrue = () => true;

const isHtmlTag = t => typeof t === 'string' && t.charAt(0) === t.charAt(0).toLowerCase();

const createStyled = tag => {
	if (process.env.NODE_ENV !== 'production') {
		if (tag === undefined) {
			throw new Error(
				'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
			);
		}
	}

	const isReal = tag.__emotion_real === tag;
	const baseTag = (isReal && tag.__emotion_base) || tag;

	const omitFn = isHtmlTag(baseTag) ? testOmitPropsOnStringTag : testAlwaysTrue;

	return (strings, ...interpolations) => {
		let styles = (isReal && tag[STYLES_KEY]) || [];
		if (strings == null || strings.raw === undefined) {
			styles = styles.concat(strings, interpolations);
		} else {
			styles = interpolations.reduce(
				(array, interp, idx) => array.concat(interp, strings[idx + 1]),
				styles.concat(strings[0])
			);
		}

		function Styled(props) {
			let className = '';
			const classInterpolations = [];

			if (props.className) {
				className += getRegisteredStyles(classInterpolations, props.className);
			}
			className += css.apply(this, styles.concat(classInterpolations));

			return vdo(baseTag, omitAssign(omitFn, {}, props, { className }), props.children);
		}

		Styled[STYLES_KEY] = styles;
		Styled.__emotion_base = baseTag;
		Styled.__emotion_real = Styled;

		Styled.withComponent = nextTag => createStyled(nextTag)(styles);

		return Styled;
	};
};

module.exports = createStyled;
Object.assign(module.exports, require('emotion'));
