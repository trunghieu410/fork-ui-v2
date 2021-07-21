import React from 'react';
import withIconEnhancer from '../HOCs/withIconEnhancer';

export default withIconEnhancer('ZoomQuestion', 'zoom-question', (props) => (
<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="10" cy="10" r="7" />
  <path d="M21 21l-6 -6" />
  <line x1="10" y1="13" x2="10" y2="13.01" />
  <path d="M10 10a1.5 1.5 0 1 0 -1.14 -2.474" />
</svg>
));
