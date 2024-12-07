import React, { useState, ChangeEvent, useEffect } from 'react';

interface ComplexLinkProps {
    value: {
        get(key: "type" | "href"): string | undefined;
        type: string;
        href: string;
    };
    onChange: (value: { type: string; href: string }) => void;
    defaultType?: string;
}

const ComplexLink: React.FC<ComplexLinkProps> = ({ value, onChange, defaultType = 'url' }) => {

    // Initialize state directly from value prop
    const [type, setType] = useState<string>(() => {
        try {
            return value.get("type") || defaultType;
        } catch (error) {
            console.error('Error initializing type state:', error);
            return defaultType;
        }
    });
    
    const [href, setHref] = useState<string>(() => {
        try {
            return value.get("href") || '';
        } catch (error) {
            console.error('Error initializing href state:', error);
            return '';
        }
    });

    const [error, setError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<string>('');

 

    // Sync effect - runs when value prop changes
    useEffect(() => {
        console.log('Value changed:', value);
        if (value) {
            setType(value.get("type") || defaultType);
            setHref(value.get("href") || '');
        }
    }, [value?.type, value?.href, defaultType]);

    // Debug info update
    useEffect(() => {
        setDebugInfo(JSON.stringify({
            value,
            internalState: { type, href }
        }, null, 2));
    }, [value, type, href]);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        console.log('Type changed to:', newType);
        setType(newType);
        setError(null);
        
        try {
            const newValue = { href: value.get("href") || '', type: newType };
            console.log('handleTypeChange - sending value:', newValue);
            onChange(newValue);
        } catch (error) {
            console.error('Error in handleTypeChange:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newHref = e.target.value;
        console.log('Link changed to:', newHref);
        setHref(newHref);
        setError(null);

        try {
            if (type === 'url' && newHref && !isValidUrl(newHref)) {
                throw new Error('Invalid URL format');
            }
            const newValue = { type, href: newHref };
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
                        value={href}
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
            <div style={{ display: 'none', gridColumn: '1 / -1', marginTop: '10px', padding: '8px', background: '#f5f5f5', fontSize: '12px' }}>
                <pre>{debugInfo}</pre>
            </div>
        </div>
    );
};

export default ComplexLink;