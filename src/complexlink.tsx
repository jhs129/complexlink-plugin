import React, { useState, ChangeEvent } from 'react';

interface ComplexLinkProps {
    value: string;
    onChange: (value: string) => void;
    defaultType?: string;
}

const ComplexLink: React.FC<ComplexLinkProps> = ({ value, onChange, defaultType = 'model' }) => {
    const [type, setType] = useState(defaultType);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', alignItems: 'center' }}>
            <label htmlFor="type">Link Type:</label>
            <select id="type" value={type} onChange={handleTypeChange}>
                <option value="model">Model</option>
                <option value="url">URL</option>
            </select>
            {type === 'url' && (
                <>
                    <label htmlFor="link">Enter Url:</label>
                    <input id="link" type="text" value={value} onChange={handleChange} />
                </>
            )}
        </div>
    );
};

export default ComplexLink;