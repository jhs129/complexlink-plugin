import React, { useState, ChangeEvent, useEffect } from 'react';

interface ComplexLinkProps {
    value: {
        type: string;
        link: string;
    };
    onChange: (value: { type: string; link: string }) => void;
    defaultType?: string;
}

const ComplexLink: React.FC<ComplexLinkProps> = ({ value, onChange, defaultType = 'model' }) => {
    const [type, setType] = useState(value?.type || defaultType);
    const [link, setLink] = useState(value?.link || '');
    const [error, setError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string>('');

    // Debug logging for incoming props
    useEffect(() => {
        console.log('ComplexLink value prop:', value);
        console.log('Current internal state:', { type, link });
        setDebugInfo(JSON.stringify({ value, internalState: { type, link }}, null, 2));
    }, [value, type, link]);

    useEffect(() => {
        // Sync with external value changes
        console.log('Value changed externally:', value);
        if (value?.type !== type) {
            setType(value?.type || defaultType);
        }
        if (value?.link !== link) {
            setLink(value?.link || '');
        }
    }, [value?.type, value?.link]);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setType(newType);
        setError(null);
        
        try {
            const newValue = { link, type: newType };
            console.log('handleTypeChange - sending value:', newValue);
            onChange(newValue);
        } catch (error) {
            console.error('Error in handleTypeChange:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newLink = e.target.value;
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
                <option value="model">Model</option>
                <option value="url">URL</option>
            </select>
            
            {type === 'url' && (
                <>
                    <label htmlFor="link">Enter URL:</label>
                    <input 
                        id="link" 
                        type="text" 
                        value={link} 
                        onChange={handleLinkChange}
                        className="complex-link-input"
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
                <h3>Debug Info</h3>
                <pre>{debugInfo}</pre>
            </div>
        </div>
    );
};

export default ComplexLink;