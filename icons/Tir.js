import React from 'react';
import withIconEnhancer from '../HOCs/withIconEnhancer';

export default withIconEnhancer('Tir', 'tir', (props) => (
<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="5" cy="17" r="2" />
  <circle cx="17" cy="17" r="2" />
  <path d="M7 18h8m4 0h2v-6a5 7 0 0 0 -5 -7h-1l1.5 7h4.5" />
  <path d="M12 18v-13h3" />
  <polyline points="3 17 3 12 12 12" />
</svg>
));
