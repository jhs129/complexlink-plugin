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

    const [error, setError] = useState<{message: string; stack?: string} | null>(null);
    const [debugInfo, setDebugInfo] = useState<string>('');

    // Add new state for modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Add modal toggle handlers
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

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
            setError(error instanceof Error ? {message: error.message, stack: error.stack} : {message: 'An error occurred'});
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
            setError(error instanceof Error ? {message: error.message, stack: error.stack} : {message: 'An error occurred'});
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
            
            {(type === 'model' || value?.type === 'model') && (
                <>
                    <label htmlFor="modelSelector">Select Model:</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            id="modelSelector" 
                            type="text" 
                            value={href}
                            readOnly
                            className="complex-link-input"
                            placeholder="No model selected..."
                        />
                        <button 
                            onClick={handleOpenModal}
                            className="complex-link-button"
                        >
                            Select Model
                        </button>
                    </div>
                </>
            )}

            {/* Add modal placeholder - you'll need to implement your actual modal component */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }}>
                    {/* Replace this with your actual modal component */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px' }}>
                        <h2>Select Model</h2>
                        {/* Add your model selection content here */}
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}

            {error && (
                <div className="complex-link-error" style={{ gridColumn: '1 / -1', color: 'red', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                    <div>{error.message}</div>
                    {error.stack && <div style={{ fontSize: '0.9em', marginTop: '8px' }}>{error.stack}</div>}
                </div>
            )}

            {/* Debug information */}
            <div style={{ display: 'flex', gridColumn: '1 / -1', marginTop: '10px', padding: '8px', background: '#f5f5f5', fontSize: '12px' }}>
                <pre>{debugInfo}</pre>
            </div>
        </div>
    );
};

export default ComplexLink;