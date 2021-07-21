import React from 'react';
import withIconEnhancer from '../HOCs/withIconEnhancer';

export default withIconEnhancer('Devices2', 'devices-2', (props) => (
<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 15h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h6" />
  <rect x="13" y="4" width="8" height="16" rx="1" />
  <line x1="7" y1="19" x2="10" y2="19" />
  <line x1="17" y1="8" x2="17" y2="8.01" />
  <circle cx="17" cy="16" r="1" />
  <line x1="9" y1="15" x2="9" y2="19" />
</svg>
));
