import React, { useState, ChangeEvent, useEffect } from 'react';
import { styles } from './complexlink.styles';

interface ComplexLinkProps {
    value: {
        get(key: "type" | "href" | "model" | "referenceId"): string | undefined;
        type: string;
        href: string;
        model?: string;
        referenceId?: string;
    };
    onChange: (value: { 
        type: string; 
        href: string; 
        model?: string;
        referenceId?: string;
    }) => void;
    defaultType?: string;
}

interface ModelInstance {
    id: string;
    href: string;
    name: string;
    type: string;
}

const SAMPLE_INSTANCES: ModelInstance[] = [
    // Page instances
    { id: 'page_1', href: '/pages/home', name: 'Home Page', type: 'page' },
    { id: 'page_2', href: '/pages/about', name: 'About Us', type: 'page' },
    { id: 'page_3', href: '/pages/contact', name: 'Contact Page', type: 'page' },
    { id: 'page_4', href: '/pages/services', name: 'Services', type: 'page' },
    { id: 'page_5', href: '/pages/privacy', name: 'Privacy Policy', type: 'page' },
    // Blog instances
    { id: 'blog_1', href: '/blog/getting-started', name: 'Getting Started Guide', type: 'blog' },
    { id: 'blog_2', href: '/blog/top-10-tips', name: '10 Tips for Success', type: 'blog' },
    { id: 'blog_3', href: '/blog/product-updates-2024', name: 'Product Updates 2024', type: 'blog' },
    { id: 'blog_4', href: '/blog/industry-insights', name: 'Industry Insights', type: 'blog' },
    { id: 'blog_5', href: '/blog/customer-stories', name: 'Customer Stories', type: 'blog' },
];

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
        // try {
        //     //new URL(urlString);
        //     return true;
        // } catch {
        //     return false;
        // }
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
            handleCloseModal();
        } catch (error) {
            console.error('Error in handleModelSelect:', error);
            setError(error instanceof Error ? 
                { message: error.message, stack: error.stack } : 
                { message: 'An error occurred' }
            );
        }
    };

    const [selectedModelType, setSelectedModelType] = useState<string>('');
    
    // Filter instances based on selected model type
    const filteredInstances = SAMPLE_INSTANCES.filter(
        instance => instance.type === selectedModelType
    );

    // Update model type selection handler
    const handleModelTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedModelType(e.target.value);
    };

    // Update instance selection handler
    const handleInstanceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selectedInstance = SAMPLE_INSTANCES.find(instance => instance.id === selectedId);
        
        if (selectedInstance) {
            try {
                const newValue = { 
                    type, 
                    href: selectedInstance.href,
                    model: selectedInstance.type,
                    referenceId: selectedInstance.id
                };
                onChange(newValue);
                handleCloseModal();
            } catch (error) {
                console.error('Error in handleInstanceSelect:', error);
                setError(error instanceof Error ? 
                    { message: error.message, stack: error.stack } : 
                    { message: 'An error occurred' }
                );
            }
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
                <div style={styles.formRow}>
                    <label htmlFor="modelSelector">Select Model:</label>
                    <div style={styles.modelInputGroup}>
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
                </div>
            )}
            
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button 
                            onClick={handleCloseModal}
                            style={styles.closeButton}
                        >
                            x
                        </button>
                        <h2>Select Model</h2>
                        <div style={styles.modalForm}>
                            <div style={styles.modalField}>
                                <label>Model Type:</label>
                                <select
                                    style={styles.modelSelect}
                                    value={selectedModelType}
                                    onChange={handleModelTypeSelect}
                                >
                                    <option value="">Select a model type...</option>
                                    <option value="page">Page</option>
                                    <option value="blog">Blog</option>
                                </select>
                            </div>
                            
                            {selectedModelType && (
                                <div style={styles.modalField}>
                                    <label>Select Instance:</label>
                                    <select
                                        style={styles.modelSelect}
                                        onChange={handleInstanceSelect}
                                        value={referenceId || ''}
                                    >
                                        <option value="">Select an instance...</option>
                                        {filteredInstances.map(instance => (
                                            <option key={instance.id} value={instance.id}>
                                                {instance.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
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