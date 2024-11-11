import React from 'react';
import { ChangeEvent, FC } from 'react';

interface ComplexLinkProps {
    value: string;
    onChange: (value: string) => void;
}

const ComplexLink: React.FC<ComplexLinkProps> = (props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', alignItems: 'center' }}>
            <label style={{ gridColumn: '1 / 2' }}>
                Type:
            </label>
            <select style={{ gridColumn: '2 / 3' }}>
                <option value="model">Model</option>
                <option value="url">URL</option>
            </select>
            <label style={{ gridColumn: '1 / 2' }}>
                Input 2:
            </label>
            <input style={{ gridColumn: '2 / 3' }} type="text" value={props.value} onChange={handleChange} />
        </div>
    );
};

export default ComplexLink;
