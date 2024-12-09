import { builder } from '@builder.io/react';

// Mock the environment variable
process.env.NEXT_PUBLIC_BUILDER_API_KEY = '9d9c17771b684627bed7d61d5f05ef44'; // Replace with a valid API key

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
if (!apiKey) {
    throw new Error('Builder API key is required');
}
builder.init(apiKey);

const fetchModelInstances = async (modelType: string) => {
    const content = await builder.getAll("page", {
        fields: "id, data.url, name",
        options: { noTargeting: true },
    });

    return content.map((item: any) => ({
        id: item.id,
        href: item.data?.url || '',
        name: item.name,
        type: modelType
    }));
};

// Test harness function
const runTest = async () => {
    try {
        const modelType = 'page'; // Specify the model type you want to fetch
        const instances = await fetchModelInstances(modelType);
        console.log('Fetched Model Instances:', instances);
    } catch (error) {
        console.error('Error fetching model instances:', error);
    }
};

// Execute the test
runTest(); 