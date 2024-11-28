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
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";


const type: ElementsType = "DateField";

const extraAttributes = {
    label: "Date field",
    helperText: "Pick a date",
    required: false,
}

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200).optional(),
    required: z.boolean().default(false),
})

export const DateFieldFormElement: FormElement = {
    type, 
    construct: (id: string) => ({
        id,
        type, 
        extraAttributes
    }),
    designerBtnElement: {
        icon: BsFillCalendarDateFill,
        label: "Date field",
    },
   designerComponent: DesignerComponent,
   formComponent: FormComponent,
   propertiesComponent: PropertiesComponent,
    validate: (formElement : FormElementInstance, currentValue: string):boolean => {
        const element = formElement as CustomInstance;
        if(element.extraAttributes.required){
            return currentValue.length > 0;
        }
        return true;
    }
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}
function FormComponent({elementInstance, submitValue, isInvalid, defaultValue}: {elementInstance : FormElementInstance;
    submitValue?: SubmitFunction; isInvalid?: boolean;  defaultValue?: string}) {

    const element = elementInstance as CustomInstance;
    const {label, required, placeholder, helperText} = element.extraAttributes

    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid])

 return (<div className="flex flex-col gap-2 w-full">
    <Label className={cn(error && 'text-red-500')}>
    {element.extraAttributes?.label}
    {element.extraAttributes.required && "*"}
    </Label>
    <Popover>
        <PopoverTrigger asChild>
        <Button variant={"outline"} className='w-full justify-start text-left font-normal'>
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date ? format(date, "PPP") : <span>Pick a date</span> }
        </Button>
     </PopoverTrigger>
     <PopoverContent className="w-auto p-0" align ='start'>
        <Calendar 
        mode="single"
        selected={date}
        onSelect={(date) => {
            setDate(date);
            if(!submitValue) return;
            const value = date?.toUTCString() || ""
            const valid = DateFieldFormElement.validate(element, value);
            setError(!valid);
            submitValue(element.id, value);
            
        }}
        initialFocus
          />
     </PopoverContent>
    </Popover>
    {helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && 'text-red-500')}>{helperText}</p>}

    </div>)
}

function DesignerComponent({elementInstance}: {elementInstance : FormElementInstance}){

    const element = elementInstance as CustomInstance;
    const {label, required, placeholder, helperText} = element.extraAttributes

 return (<div className="flex flex-col gap-2 w-full">
    <Label>
        {element.extraAttributes?.label}
        {element.extraAttributes.required && "*"}
    </Label>
   <Button variant={"outline"} className='w-full justify-start text-left font-normal'>
    <CalendarIcon className="mr-2 h-4 w-4"/>
    <span>Pick a date</span>
    </Button>
    {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}

    </div>)
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
function PropertiesComponent({elementInstance}: {elementInstance : FormElementInstance}){
    const element = elementInstance as CustomInstance;
    const {updateElement} = useDesigner();
    const form = useForm<z.infer<typeof propertiesSchema>>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
           
        }
    })

    useEffect(() => {
        form.reset(element.extraAttributes);
     }, [element, form])

     function applyChanges(values: propertiesFormSchemaType){
        const {label, helperText, required} = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
               helperText: values.helperText,
               required: values.required,
               label: values.label
            }
        })
     }
 
    return (<Form {...form}>
        <form onBlur={form.handleSubmit(applyChanges)} 
        onSubmit={(e) => {e.preventDefault()}}
        className="space-y-3">
            <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Label</FormLabel>
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
                    <FormDescription>
                            The label of the text field. < br />
                            It is displayed above the text field.
                        </FormDescription>
                </FormItem>
            )}
            />
         
            <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Helper text</FormLabel>
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
                    <FormDescription>
                            The helper text of the text field. < br />
                            It is displayed below the text field.
                        </FormDescription>
                </FormItem>
            )}
            />
              <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm  ">
                    <div className="space-y-0.5">
                    <FormLabel>Required</FormLabel>
               
                    <FormDescription>
                           Choose weather the text field is required.
                        </FormDescription>
                        </div>
                        <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />   
                    </FormControl>
                </FormItem>
            )}
            />
            </form>
    </Form>)                     
}
