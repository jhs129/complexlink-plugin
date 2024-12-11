import React, { useState, ChangeEvent, useEffect } from 'react';
import { styles } from './ComplexLink.styles';
import { ComplexLinkProps } from '../types';
import ModelSelector from './ModelSelector';


const ComplexLink: React.FC<ComplexLinkProps> = ({ value, onChange, defaultType = 'url' }) => {
    // Add debug logging to safeGet
    const safeGet = (key: "type" | "href" | "model" | "referenceId", defaultValue: string = '') => {
        try {
            const val = value[key] || defaultValue;
            console.debug(`Getting ${key}:`, val);
            return val;
        } catch (error) {
            console.error(`Error getting ${key}:`, error);
            return defaultValue;
        }
    };

    const [type, setType] = useState(() => safeGet('type', defaultType));
    const [href, setHref] = useState(() => safeGet('href'));
    const [model, setModel] = useState(() => safeGet('model'));
    const [referenceId, setReferenceId] = useState(() => safeGet('referenceId'));
    const [error, setError] = useState<{message: string; stack?: string} | null>(null);

    // Add debug logging to updateValue
    const updateValue = (newValues: Record<string, string>) => {
        try {
            const updatedValue = { 
                type, 
                href: href || '',
                model: model || '',
                referenceId: referenceId || '',
                ...newValues 
            };
            console.debug('Updating value:', updatedValue);
            onChange(updatedValue);
            setError(null);
        } catch (error) {
            const contextualError = error instanceof Error ? error : new Error('An error occurred');
            console.error('Error updating value:', contextualError);
            setError({
                message: contextualError.message,
                stack: contextualError.stack
            });
        }
    };

    // Add debug logging to handlers
    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        console.debug('Type changed to:', newType);
        setType(newType);
        updateValue({ type: newType });
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newHref = e.target.value;
        console.debug('Link changed to:', newHref);
        setHref(newHref);
        updateValue({ href: newHref });
    };

    const isValidUrl = (urlString: string): boolean => {
        try {
            console.debug('Validating URL:', urlString);
            new URL(urlString);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="complex-link-container" style={styles.container}>
            <div style={styles.formRow}>
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
            </div>
            
            {type === 'url' && (
                <div style={styles.formRow}>
                    <label htmlFor="link">Enter URL:</label>
                    <input 
                        id="link" 
                        type="text" 
                        value={href}
                        onChange={handleLinkChange}
                        className="complex-link-input"
                        placeholder="Enter URL..."
                    />
                </div>
            )}
            
            {type === 'model' && (
                <ModelSelector
                    href={href}
                    referenceId={referenceId}
                    onModelSelect={(instance) => {
                        setHref(instance.href);
                        setReferenceId(instance.id);
                        setModel(instance.type);
                        updateValue({
                            href: instance.href,
                            referenceId: instance.id,
                            model: instance.type
                        });
                    }}
                />
            )}

            {error && (
                <div style={styles.errorContainer}>
                    <div>{error.message}</div>
                    {error.stack && (
                        <div style={{ fontSize: '0.9em', marginTop: '8px' }}>
                            {error.stack}
                        </div>
                    )}
                </div>
            )}

            <div style={{
                marginTop: '20px',
                padding: '10px',
                background: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace'
            }}>
                <pre>
                    {JSON.stringify({
                        type,
                        href,
                        model,
                        referenceId,
                        error
                    }, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default ComplexLink;