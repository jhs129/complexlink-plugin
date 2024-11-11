// contents of plugin.jsx
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/react';
import ComplexLink from './complexlink';

// test comment


// function ComplexLink(props) {
//     return (
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', alignItems: 'center' }}>

//             <label style={{ gridColumn: '1 / 2' }}>
//                 My First Input:
//             </label>
//             <input style={{ gridColumn: '2 / 3' }} type="text" value={props.value} onChange={e => props.onChange(e.target.value)} />
//             <label style={{ gridColumn: '1 / 2' }}>
//                 Second Input:
//             </label>
//             <input style={{ gridColumn: '2 / 3' }} type="text" value={props.value} onChange={e => props.onChange(e.target.value)} />
//         </div>
//     );
// }

Builder.registerEditor({
    name: 'ComplexLink',
    component: ComplexLink,
});