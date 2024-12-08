import { Builder } from "@builder.io/react";
import ComplexLink from "./components/ComplexLink";

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