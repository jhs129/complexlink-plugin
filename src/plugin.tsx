import { jsx } from "@emotion/react";
import React, { useState, ChangeEvent, FC } from 'react';
import { Builder } from "@builder.io/react";
import ComplexLink from "./complexlink";


// interface Props {
//   value?: any;
//   onChange: (value: any) => void;
//   context: any;
// }

// export default class MyComplexLink extends React.Component<any, any> {
//   constructor(props: any) {
//     super(props);

//     // this.state = {
//     //   name:
//     //     props.value && props.value.get && props.value.get("name")
//     //       ? props.value.get("name")
//     //       : "",
//     //   href:
//     //     props.value && props.value.get && props.value.get("href")
//     //       ? props.value.get("href")
//     //       : "",
//     // };
//   }

//   componentDidMount() {}

//   render() {

//     const [type, setType] = useState('model');
//     // const [name, setName] = useState(this.props.value.name);
//     // const [href, setHref] = useState(this.props.value.href);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

//         this.props.onChange(e.target.value);
//     };


//     const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
//         setType(e.target.value);
//     };

//     // const handleChangeHref = (e: ChangeEvent<HTMLInputElement>) => {

//     //     const newLink: IComplexLink = {
//     //         name: name,
//     //         href: e.target.value,
//     //     };
        
//     //     this.props.onChange(newLink);
//     // };

//     // const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {

//     //     const newLink: IComplexLink = {
//     //         name: e.target.value,
//     //         href: href,
//     //     };
        
//     //     this.props.onChange(newLink);
//     // };

//     return (
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', alignItems: 'center' }}>
//             <label style={{ gridColumn: '1 / 2' }}>
//                 Link Type:
//             </label>
//             <select id="type" style={{ gridColumn: '2 / 3' }} value={type} onChange={handleTypeChange}>
//                 <option value="model">Model</option>
//                 <option value="url">URL</option>
//             </select>
//             {type === 'url' && (
//                 <>
//                     <label style={{ gridColumn: '1 / 2' }}>
//                         Enter Link Text:
//                     </label>
//                     <input id="name" style={{ gridColumn: '2 / 3' }} type="text" value={this.props.value} onChange={handleChange} />

//                 </>
//             )}
//         </div>
//     );


//   }
// }

Builder.registerEditor({
  name: "ComplexLink",
  component: ComplexLink,
});

function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(
      "custon error" + response.statusText);
  }
  return response;
}