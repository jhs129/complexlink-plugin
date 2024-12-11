import React, { useState, ChangeEvent } from 'react';
import { styles } from './ComplexLink.styles';
import { ModelInstance } from '../types';
import { builder } from '@builder.io/react';

interface ModelSelectorProps {
  href: string;
  referenceId: string;
  instances: ModelInstance[];
  onModelSelect: (instance: ModelInstance) => void;
}

builder.init("9d9c17771b684627bed7d61d5f05ef44");


const fetchInstancesByModel = async (type: string): Promise<ModelInstance[]> => {
    try {
        const content = await builder.getAll(type, {
            fields: "id,data.url,name",
            options: { noTargeting: true },
        });

        const items = content.map((item: any) => ({
            id: item.id || '',
            name: item.name || '',
            href: (item?.data?.url) || `/${type}/${item.name || ''}`,
            type: type
        }));

        return items;
    } catch (error) {
        console.error(`Error fetching ${type} instances:`, error);
        return [];
    }
};

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  href,
  referenceId,
  instances,
  onModelSelect
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModelType, setSelectedModelType] = useState<string>('');
    const [instanceData, setInstanceData] = useState<ModelInstance[]>(instances);
    
    const filteredInstances = instanceData.filter(
        instance => instance.type === selectedModelType
    );

    const handleModelTypeSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        setSelectedModelType(selectedType);

        if (selectedType) {
            const fetchedInstances = await fetchInstancesByModel(selectedType);
            setInstanceData(fetchedInstances);
        }
    };

    const handleInstanceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selectedInstance = instances.find(instance => instance.id === selectedId);
        
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