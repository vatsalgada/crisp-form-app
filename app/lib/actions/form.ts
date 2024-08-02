"use server"

import { authOptions } from "@/app/api/lib/auth"
import prisma from "@/prisma/prisma";
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

export async function GetFormStats() {
    const session: Session |  any = await getServerSession(authOptions)
    //console.log(session)
    if(!session){
        return null
    }

    const user = JSON.stringify(session.user.id)

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
        session, visit, submissionRate, bounceRate, submissions
}}



