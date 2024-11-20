import React, { useState, ChangeEvent, FC } from 'react';

interface ComplexLinkProps {
    value: {
        value1: string;
        value2: string;
    }
    onChange: (value: { value1: string; value2: string }) => void;
}

const ComplexLink: React.FC<ComplexLinkProps> = (props) => {
    const [type, setType] = useState('model');
    const [state, setState] = useState(props.value);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = {
            ...state,
            value1: e.target.value,
            value2: e.target.value
        };
        setState(newValue);
        props.onChange(newValue);

    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', alignItems: 'center' }}>
            <label style={{ gridColumn: '1 / 2' }}>
                Link Type:
            </label>
            <select id="type" style={{ gridColumn: '2 / 3' }} value={type} onChange={handleTypeChange}>
                <option value="model">Model</option>
                <option value="url">URL</option>
            </select>
            {type === 'url' && (
                <>
                    <label style={{ gridColumn: '1 / 2' }}>
                        Enter Url:
                    </label>
                    <input id="link" style={{ gridColumn: '2 / 3' }} type="text" value={props.value.value1} onChange={handleOnChange} />
                </>
            )}
        </div>
    );
};

export default ComplexLink;
