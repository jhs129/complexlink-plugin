import { jsx } from "@emotion/react";
import React, { useState, ChangeEvent, FC } from 'react';
import { Builder } from "@builder.io/react";
import ComplexLink from "./complexlink";



Builder.registerEditor({
  name: "ComplexLink",
  component: ComplexLink,  
});


function handleErrors(response: any) {
  if (!response.ok) {
    throw Error(
      "custon error" + response.statusText);
  }
  return response;
}