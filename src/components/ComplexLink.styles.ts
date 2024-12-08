import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '8px',
        alignItems: 'center'
    },
    modelInputGroup: {
        display: 'flex',
        gap: '8px'
    },
    modalOverlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: '20px'
    },
    closeButton: {
        position: 'absolute' as const,
        right: '10px',
        top: '10px',
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '5px'
    },
    modelSelect: {
        width: '100%',
        padding: '8px',
        marginBottom: '16px'
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px'
    },
    errorContainer: {
        gridColumn: '1 / -1',
        color: 'red',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace'
    },
    errorStack: {
        fontSize: '0.9em',
        marginTop: '8px'
    },
    debugContainer: {
        display: 'flex',
        gridColumn: '1 / -1',
        marginTop: '10px',
        padding: '8px',
        background: '#f5f5f5',
        fontSize: '12px'
    },
    modalForm: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px'
    },
    modalField: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px'
    }
}; 