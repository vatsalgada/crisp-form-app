"use client"

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../FormElement"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { LuHeading1, LuHeading2 } from "react-icons/lu";


const type: ElementsType = "SubTitleField";

const extraAttributes = {
    title: "Subtitle Field",
}

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
   
})

export const SubtitleFieldFormElement: FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
        extraAttributes
    }),
    designerBtnElement: {
        icon: LuHeading2,
        label: "SubTitle field",
    },
   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
    validate: () => true,
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}


function DesignerComponent({elementInstance}: {elementInstance : FormElementInstance}){

    const element = elementInstance as CustomInstance;
    const {title} = element.extraAttributes

 return (<div className="flex flex-col gap-2 w-full">
    <Label className="text-muted-foreground">
    Subtitle field
    </Label>
    <p className="text-lg">{title}</p>    
    </div>)
}

function FormComponent({elementInstance}: {elementInstance : FormElementInstance;
}) {

   const element = elementInstance as CustomInstance;
   const {title} = element.extraAttributes
return ( <p className="text-lg">{title}</p>)
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
function PropertiesComponent({elementInstance}: {elementInstance : FormElementInstance}){
    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<z.infer<typeof propertiesSchema>>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
           title: elementInstance.extraAttributes?.title
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes);
     }, [element, form])

     function applyChanges(values: propertiesFormSchemaType){
        const {title} = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
              title
            }
        })
     }
 
    return (<Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} 
        onSubmit={(e) => {e.preventDefault()}}
        className="space-y-3">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>SubTitle</FormLabel>
                    <FormControl>
                        <Input {...field}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                e.preventDefault();
                                e.currentTarget.blur();
                            }
                        }}
                        />
                    </FormControl>
              
                </FormItem>
            )}
            />
            </form>
    </Form>)                     
}
 