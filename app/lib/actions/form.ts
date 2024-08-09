"use server"

import { authOptions } from "@/app/api/lib/auth"
import prisma from "@/prisma/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { sub } from "date-fns";
import { getServerSession } from "next-auth"
import { GetServerSideProps } from "next/types";


interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
    };
  }

class UserNotFountErr extends Error {}

async function currentUserId() {
    const session: Session |  any = await getServerSession(authOptions)
    //console.log(session)
    if(!session){
        return null
    }

    return JSON.stringify(session.user.id)
}

export async function GetFormStats() {
    const user = await currentUserId()
    if(!user) {
        return null
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user,
        }, 
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visit = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0; 

    if(visit > 0) {
         submissionRate = (submissions / visit) * 100;
    }

    const bounceRate= 100 - submissionRate;
    
    return {
      visit, submissionRate, bounceRate, submissions
}}


export async function CreateForm(data:formSchemaType) {

    const validation = formSchema.safeParse(data);

    if(!validation.success){
        throw new Error("form not valid")
    }

    const user = await currentUserId();
    if(!user) {
        throw new UserNotFountErr();
    }

    const form = await prisma.form.create(
        {
            data: {
                userId: user,
                name: data.name,
                description: data.description
            }
        }
    )

    if(!form){
        throw new Error("Something went wrong while creating the form")
    }
    console.log("Name on server", data.name)

    return form.id
}


export async function  GetForms() {
    const user = await currentUserId();
    if(!user){
        throw new UserNotFountErr(); 
    }

    return await prisma.form.findMany({
        where: {
            userId: user
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function GetFormById(id: number) {
    const user = await currentUserId();

    if(!user){ 
        throw new UserNotFountErr();
    }

    return await prisma.form.findUnique({
        where: {
            userId: user,
            id: id
        }
    })
}
