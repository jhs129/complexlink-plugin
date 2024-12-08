import { Builder } from "@builder.io/react";
import ComplexLink from "./complexlink";

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