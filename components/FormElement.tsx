import React from 'react'
import { TextFieldFormElement } from './fields/TextField';
import { IconType } from 'react-icons/lib';

export type ElementsType = "TextField"
export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance; 
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>
    formComponent: React.FC<{
        elementInstance: FormElementInstance
    }>
    propertiesComponent:  React.FC<{
        elementInstance: FormElementInstance
    }>

    designerBtnElement: {
        icon: React.ElementType,
        label: string;
    }
    
}
const propertiesComponent = () =>{
    return <div>
        Properties component
    </div>
}

export type FormElementInstance ={
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>
}

export type FormElementsType = {
    [key in ElementsType]: FormElement;
};


export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
}

