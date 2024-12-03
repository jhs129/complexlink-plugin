import React, { useState, ChangeEvent } from 'react';

interface ComplexLinkProps {
    value: {
        type: string;
        link: string;
    };
    onChange: (value: { type: string; link: string }) => void;
    defaultType?: string;
}

const ComplexLink: React.FC<ComplexLinkProps> = ({ value, onChange, defaultType = 'model' }) => {
    const [type, setType] = useState(value.type || defaultType);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setType(newType);
        onChange({ ...value, type: newType });
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, link: e.target.value });
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
                    <input id="link" type="text" value={value.link} onChange={handleLinkChange} />
                </>
            )}
        </div>
    );
};

export default ComplexLink;