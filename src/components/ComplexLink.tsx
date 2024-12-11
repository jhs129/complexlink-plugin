import React, { useState, ChangeEvent, useEffect } from 'react';
import { styles } from './ComplexLink.styles';
import { ComplexLinkProps, ModelInstance } from '../types';
import { ModelSelector } from './ModelSelector';
import { builder } from '@builder.io/react';

// Move this to a separate constants file if needed
const DEFAULT_MODEL_CONTENT_INSTANCES_OLD: ModelInstance[] = [
    // Page instances
    { id: 'page_1', href: '/pages/home', name: 'Home Page', type: 'page' },
    { id: 'page_2', href: '/pages/about', name: 'About Us', type: 'page' },
    { id: 'page_3', href: '/pages/services', name: 'Our Services', type: 'page' },
    { id: 'page_4', href: '/pages/contact', name: 'Contact Us', type: 'page' },
    
    // Blog instances
    { id: 'blog_1', href: '/blog/getting-started', name: 'Getting Started Guide', type: 'blog' },
    { id: 'blog_2', href: '/blog/best-practices', name: 'Development Best Practices', type: 'blog' },
    { id: 'blog_3', href: '/blog/case-studies', name: 'Customer Success Stories', type: 'blog' },
    { id: 'blog_4', href: '/blog/tech-trends', name: 'Latest Tech Trends', type: 'blog' }
];

builder.init("9d9c17771b684627bed7d61d5f05ef44");


const fetchInstancesByModel = async (type: string): Promise<ModelInstance[]> => {
    // let items = DEFAULT_MODEL_CONTENT_INSTANCES.filter(instance => instance.type === type);
    const content = await builder.getAll(type, {
        fields: "id,data.url,name",
        options: { noTargeting: true },
    });

    const items = content.map((item: any) => ({
        id: item.id,
        name: item.name,
        href: item.data.url,
        type: type
      }));

    return items;
};

const pageInstances = await fetchInstancesByModel("page");
const blogInstances = await fetchInstancesByModel("blog");

const DEFAULT_MODEL_CONTENT_INSTANCES: ModelInstance[] = [...pageInstances, ...blogInstances];

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

    // Add model state
    const [model, setModel] = useState<string>(() => {
        try {
            return value.get("model") || '';
        } catch (error) {
            console.error('Error initializing model state:', error);
            return '';
        }
    });

    // Add referenceId state
    const [referenceId, setReferenceId] = useState<string>(() => {
        try {
            return value.get("referenceId") || '';
        } catch (error) {
            console.error('Error initializing referenceId state:', error);
            return '';
        }
    });

    // Sync effect - runs when value prop changes
    useEffect(() => {
        console.log('Value changed:', value);
        if (value) {
            setType(value.get("type") || defaultType);
            setHref(value.get("href") || '');
            setModel(value.get("model") || '');
            setReferenceId(value.get("referenceId") || '');
        }
    }, [value, defaultType]);

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
            const newValue = { href: href || '', type: newType };
            console.log('handleTypeChange - sending value:', newValue);
            onChange(newValue);
        } catch (error) {
            const contextualError = new Error(
                `Error while changing link type to '${newType}': ${error instanceof Error ? error.message : 'An error occurred'}`
            );
            console.error('Error in handleTypeChange:', contextualError);
            setError(error instanceof Error ? 
                {
                    message: contextualError.message,
                    stack: `${contextualError.stack}\n\nCaused by: ${error instanceof Error ? error.stack : ''}`
                } : 
                {message: contextualError.message}
            );
        }
    };

    const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newHref = e.target.value;
        console.log('Link changed to:', newHref);
        setHref(newHref);
        setError(null);

        try {
            if (type === 'url' && newHref && !isValidUrl(newHref)) {
                throw new Error(`Invalid URL format: "${newHref}"`);
            }
            const newValue = { type, href: newHref };
            console.log('handleLinkChange - sending value:', newValue);
            onChange(newValue);
        } catch (error) {
            const contextualError = new Error(
                `Error while updating link value to '${newHref}': ${error instanceof Error ? error.message : 'An error occurred'}`
            );
            console.error('Error in handleLinkChange:', contextualError);
            setError(error instanceof Error ? 
                {
                    message: contextualError.message,
                    stack: `${contextualError.stack}\n\nCaused by: ${error instanceof Error ? error.stack : ''}`
                } : 
                {message: contextualError.message}
            );
        }
    };

    const isValidUrl = (urlString: string): boolean => {

        return true;
    };

    // Update model selection handler
    const handleModelSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedModel = e.target.value;
        setModel(selectedModel);
        
        try {
            const newValue = { 
                type, 
                href: href || '', 
                model: selectedModel 
            };
            onChange(newValue);
        } catch (error) {
            console.error('Error in handleModelSelect:', error);
            setError(error instanceof Error ? 
                { message: error.message, stack: error.stack } : 
                { message: 'An error occurred' }
            );
        }
    };

    const handleModelInstanceSelect = (instance: ModelInstance) => {
        try {
            const newValue = { 
                type, 
                href: instance.href,
                model: instance.type,
                referenceId: instance.id
            };
            setHref(instance.href);
            setReferenceId(instance.id);
            onChange(newValue);
        } catch (error) {
            console.error('Error in handleModelInstanceSelect:', error);
            setError(error instanceof Error ? 
                { message: error.message, stack: error.stack } : 
                { message: 'An error occurred' }
            );
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
            
            {(type === 'url' || value?.type === 'url') && (
                <div style={styles.formRow}>
                    <label htmlFor="link">Enter URL:</label>
                    <input 
                        id="link" 
                        type="text" 
                        value={href}
                        onChange={handleLinkChange}
                        className="complex-link-input"
                        placeholder="Enter URL..."
                        readOnly={type === 'model'}
                    />
                </div>
            )}
            
            {(type === 'model' || value?.type === 'model') && (
                <ModelSelector
                    href={href}
                    referenceId={referenceId}
                    instances={DEFAULT_MODEL_CONTENT_INSTANCES}
                    onModelSelect={handleModelInstanceSelect}
                />
            )}

            {error && (
                <div style={styles.errorContainer}>
                    <div>{error.message}</div>
                    {error.stack && <div style={{ fontSize: '0.9em', marginTop: '8px' }}>{error.stack}</div>}
                </div>
            )}

            <div style={styles.debugContainer}>
                <pre>{debugInfo}</pre>
            </div>
        </div>
    );
};

export default ComplexLink;