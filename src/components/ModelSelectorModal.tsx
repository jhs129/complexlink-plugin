import React, { ChangeEvent } from 'react';
import { styles } from './ComplexLink.styles';
import { ModelInstance } from '../types';

interface ModelSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (instance: ModelInstance) => void;
    selectedModelType: string;
    onModelTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    referenceId: string;
    instances: ModelInstance[];
}

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({
    isOpen,
    onClose,
    onSelect,
    selectedModelType,
    onModelTypeChange,
    referenceId,
    instances
}) => {
    if (!isOpen) return null;

    const filteredInstances = instances.filter(
        instance => instance.type === selectedModelType
    );

    const handleInstanceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selectedInstance = instances.find(instance => instance.id === selectedId);
        if (selectedInstance) {
            onSelect(selectedInstance);
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <button 
                    onClick={onClose}
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
                            onChange={onModelTypeChange}
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
    );
}; 