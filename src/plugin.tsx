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
  // Only use this if you want a default when the field is first added
  // defaultValue: {
  //   type: 'model',
  //   link: ''
  // }
});