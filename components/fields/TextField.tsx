"use client"

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement } from "../FormElement"

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
        extraAttribute: {
            label: "Text field",
            helperText: "Helper text",
            required: false,
            placeHolder: "Value here..."
        }
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text field",
    },
   designerComponent: () => <div>Designer component</div>,
   formComponent: () => <div>Designer component</div>,
   propertiesComponent: () => <div>Designer component</div>,

}