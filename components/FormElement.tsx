import React from 'react'
import { TextFieldFormElement } from './fields/TextField';
import { IconType } from 'react-icons/lib';

export type ElementsType = "TextField"
export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance; 
    designerComponent: React.FC
    formComponent: React.FC;
    propertiesComponent: React.FC

    designerBtnElement: {
        icon: React.ElementType,
        label: string;
    }
    
}

export type FormElementInstance ={
    id: String;
    type: ElementsType;
    extraAttribute?: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType]: FormElement;
};


export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
}

