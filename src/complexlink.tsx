import React, { useState, ChangeEvent, useEffect } from 'react';

interface ComplexLinkProps {
    value: {
        type: string;
        link: string;
    };
    onChange: (value: { type: string; link: string }) => void;
    defaultType?: string;
}

const ComplexLink: React.FC<ComplexLinkProps> = ({ value, onChange, defaultType = 'url' }) => {
    // Initialize state directly from value prop
    const [type, setType] = useState<string>(value?.type || defaultType);
    const [link, setLink] = useState<string>(value?.link || '');
    const [error, setError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string>('');

    // Sync effect - runs when value prop changes
    useEffect(() => {
        console.log('Value changed:', value);
        if (value) {
            setType(value.type || defaultType);
            setLink(value.link || '');
        }
    }, [value?.type, value?.link, defaultType]);

    // Debug info update
    useEffect(() => {
        setDebugInfo(JSON.stringify({
            value,
            internalState: { type, link }
        }, null, 2));
    }, [value, type, link]);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        console.log('Type changed to:', newType);
        setType(newType);
        setError(null);
        
        try {
            const newValue = { link: value?.link || '', type: newType };
            console.log('handleTypeChange - sending value:', newValue);
            onChange(newValue);
        } catch (error) {
            console.error('Error in handleTypeChange:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newLink = e.target.value;
        console.log('Link changed to:', newLink);
        setLink(newLink);
        setError(null);

        try {
            if (type === 'url' && newLink && !isValidUrl(newLink)) {
                throw new Error('Invalid URL format');
            }
            const newValue = { type, link: newLink };
            console.log('handleLinkChange - sending value:', newValue);
            onChange(newValue);
        } catch (error) {
            console.error('Error in handleLinkChange:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const isValidUrl = (urlString: string): boolean => {
        try {
            new URL(urlString);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="complex-link-container" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', alignItems: 'center' }}>
            <label htmlFor="type">Link Type:</label>
            <select 
                id="type" 
                value={type} 
                onChange={handleTypeChange}
                className="complex-link-select"
            >
                <option value="url">URL</option>
                <option value="model">Model</option>
            </select>
            
            {(type === 'url' || value?.type === 'url') && (
                <>
                    <label htmlFor="link">Enter URL:</label>
                    <input 
                        id="link" 
                        type="text" 
                        value={link}
                        onChange={handleLinkChange}
                        className="complex-link-input"
                        placeholder="Enter URL..."
                    />
                </>
            )}
            
            {error && (
                <div className="complex-link-error" style={{ gridColumn: '1 / -1', color: 'red' }}>
                    {error}
                </div>
            )}

            {/* Debug information */}
            <div style={{ gridColumn: '1 / -1', marginTop: '10px', padding: '8px', background: '#f5f5f5', fontSize: '12px' }}>
                <pre>{debugInfo}</pre>
            </div>
        </div>
    );
};

export default ComplexLink;