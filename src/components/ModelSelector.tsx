import React, { useState, ChangeEvent } from 'react';
import { styles } from './ComplexLink.styles';
import { ModelInstance, ModelSelectorProps } from '../types';

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

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  href,
  referenceId,
  onModelSelect
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModelType, setSelectedModelType] = useState<string>('');
    
    const filteredInstances = SAMPLE_INSTANCES.filter(
        instance => instance.type === selectedModelType
    );

    const handleModelTypeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedModelType(e.target.value);
    };

    const handleInstanceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selectedInstance = SAMPLE_INSTANCES.find(instance => instance.id === selectedId);
        
        if (selectedInstance) {
            onModelSelect(selectedInstance);
            setIsModalOpen(false);
        }
    };

    return (
        <>
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
                        onClick={() => setIsModalOpen(true)}
                        className="complex-link-button"
                    >
                        Select Model
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button 
                            onClick={() => setIsModalOpen(false)}
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
        </>
    );
};

export default ModelSelector;