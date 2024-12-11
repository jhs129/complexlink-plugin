export interface ComplexLinkProps {
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