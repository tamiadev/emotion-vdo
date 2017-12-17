# emotion-vdo

[emotion-react](https://github.com/emotion-js/emotion/blob/master/docs/styled.md) adapted for [VDO](https://github.com/DylanPiercey/vdo/). `styled` accepts styles as a template literal, object, or function that returns an object.

## Installation

```bash
npm install emotion-vdo
```

Works well with [tamia-theme](https://github.com/tamiadev/tamia-theme).

## Usage

### Styling elements and components

```jsx
import styled, { css, cx } from 'emotion-vdo';
import theme from 'tamia-theme';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${theme.space.xl};
`;

const panel = css`
  flex-basis: 300px;
  flex-grow: 1;
`;
const panelPrev = css`
  padding-right: ${theme.space.m};
`;
const panelNext = css`
  padding-left: ${theme.space.m};
  text-align: right;
`;
const Panel = ({ prev, next, ...props }) => (
  <div
    className={cx(panel, {
      [panelPrev]: prev,
      [panelNext]: next,
    })}
    {...props}
  />
);
```

### Change the rendered tag using `withComponent`

```jsx
// Creates a section element
const Content = styled('section')`
  background: #333;
`

// Creates an aside element with the same styles as Content
const Sidebar = Content.withComponent('aside')
```

### Shorthand style

**[Requires Emotion Babel plugin](https://github.com/emotion-js/emotion/blob/master/docs/babel.md). The installation documentation can be found [here](https://github.com/emotion-js/emotion/blob/master/docs/install.md).**

```jsx
import styled from 'emotion-vdo';

const H3 = styled.h3`
  font-size: 24px;
  color: red;
`
function Greeting ({ name }) {
  return <H3>Hello {name}</H3>
}
```

## Change log

The change log can be found on the [Releases page](https://github.com/tamiadev/emotion-vdo/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Artem Sapegin](http://sapegin.me) and [contributors](https://github.com/tamiadev/emotion-vdo/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
