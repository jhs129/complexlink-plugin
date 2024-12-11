import { Builder } from "@builder.io/react";
import ComplexLink from "./components/ComplexLink";
import {
  pluginId,
} from './utils';

Builder.registerEditor({
  name: "ComplexLink",
  component: ComplexLink,
  inputs: [
    {
      name: 'defaultType',
      type: 'string',
      defaultValue: 'model'
    }

  ],
});

//  Register the plugin itself with Builder, to define plugin options that the input type will reference
Builder.register('plugin', {
  // id should match the name in package.json, which is why we grab it directly from the package.json
  id: pluginId,
  // will be used to prefix generated types
  name: 'cms-link-plugin',
  // a list of input definition that you might need to communicate with custom backend API
  settings: [
    {
      type: 'text',
      name: "apiKey",
      friendlyName: 'Builder API Key',
    },
    {
      type: 'boolean',
      advanced: true,
      name: "showDebug",
      friendlyName: 'Show Debug Info',
    },
    {
      type: 'text',
      advanced: true,
      name: "models",
      friendlyName: 'Models',
      helperText: 'Provide a comma separated list of models to use in the model selector',
    },
  ],
  // Modify the save button text
  ctaText: 'Save Changes',
  // If we need to make a request to validate anything:
  // async onSave(actions) {
  //   appState.dialogs.alert("Plugin settings saved.");
  // },
});