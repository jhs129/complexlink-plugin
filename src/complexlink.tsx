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
    const [link, setLink] = useState(value.link || value.link);   
    const [message, setMessage] = useState('No Error');

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setType(newType);
        
        try {
            setMessage(newType);
            onChange({ link: link, type: newType });
        } catch (error) {
            setMessage(error.message);
            
        }
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newLink = e.target.value;
        setLink(newLink);

        try {
            onChange({ type: type, link: newLink });
        } catch (error) {
            setMessage(error.message);
        }
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
            <div>[message: {message}]</div>

        </div>
    );
};

export default ComplexLink;