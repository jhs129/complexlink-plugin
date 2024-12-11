import { ModelInstance } from "./ModelInstance";

export interface ModelSelectorProps {
    href: string;
    referenceId: string;
    onModelSelect: (instance: ModelInstance) => void;
  }