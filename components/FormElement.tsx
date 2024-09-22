import React from 'react'
import { TextFieldFormElement } from './fields/TextField';
import { IconType } from 'react-icons/lib';

export type ElementsType = "TextField"
export type SubmitFunction = (key: string, value: string) => void;
export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance; 
    designerComponent: React.FC<{
        elementInstance: FormElementInstance
    }>
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: (key: string, value: string) => void;
        isInvlaid?: boolean
    }>
    propertiesComponent:  React.FC<{
        elementInstance: FormElementInstance
    }>

    validate: (formElement : FormElementInstance, currentValue: string) => boolean;

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

