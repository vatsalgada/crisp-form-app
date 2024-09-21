import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GetForms, GetFormStats } from "../lib/actions/form";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { BiRightArrowAlt } from "react-icons/bi";
import { TbArrowBounce } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { ReactNode, Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import Link from "next/link";


export default function Home() {
  return (
    <div className="container pt-4">
    <Suspense fallback={<StatsCards loading={true} />}>
    <CardStatsWrapper />
    </Suspense>
    <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
    <Separator className="my-6" /> 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <CreateFormBtn />
       <Suspense fallback={[1,2,3,4].map((element) => (
          <FormCardSkeleton key={element}/>
        ))}>
          <FormCards/>
        </Suspense>
    </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const  session  = await GetFormStats();
  if(!session) return (<div>No user</div>)
  const jsj = JSON.stringify(session)
  
 // return <div> {JSON.stringify(jsj) }</div>
   
 const stats = await GetFormStats();
 return <StatsCards loading = {false} data={ stats }></StatsCards>
  
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean
}

function StatsCards (props: StatsCardProps){ 
  const { data, loading } = props;

  return <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total visits"
      icon={<LuView className="text-blue-600" />}
      helperText="All time form visits"
      value={data?.visit.toLocaleString() || ""}
      loading={loading}
      className="shadow-md shadow-blue-600"
       />

<StatCard title="Total submissions"
      icon={<FaWpforms className="text-yellow-600" />}
      helperText="All time form submissions"
      value={data?.submissions.toLocaleString() || ""}
      loading={loading}
      className="shadow-md shadow-yellow-600"
       />

<StatCard title="Subission rate"
      icon={<HiCursorClick className="text-green-600" />}
      helperText="Visits that result in form submission"
      value={data?.submissions.toLocaleString() + "%" || ""}
      loading={loading}
      className="shadow-md shadow-green-600"
       />

<StatCard title="Bounce Rate"
      icon={<TbArrowBounce className="text-red-600" />}
      helperText="Visits that leaves without interacting"
      value={data?.bounceRate.toLocaleString() + "%" || ""}
      loading={loading}
      className="shadow-md shadow-red-600"
       />
  </div>
}

export function StatCard({title, value, icon, helperText, loading, className}: {
  title: String, 
  value: string | undefined,
  helperText: string, 
  className: string, 
  loading: boolean,
  icon: ReactNode
}) {
  return <> <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-mute-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (<Skeleton><span className="opacity-0">0</span></Skeleton>)}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1"></p>
      </CardContent>
    </Card></>
}

function FormCardSkeleton(){
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />
}

async function FormCards(){
  const forms = await GetForms();
  //console.log(forms)
  return (
    <>
    {forms.map((form) => (
      <FormCard key ={form.id} form={form}/>
    )
  )}
    </>
  ) 
}


function FormCard({form}: {form: Form}) {
  console.log(form.name)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">
            {form.name}
          </span> 
          {form.published && <Badge> Published </Badge>}
          {!form.published && <Badge> Draft </Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm">
          {formatDistance(form.createdAt, new Date(), 
          {addSuffix: true})}
          {
            form.published && <span className="flex items-center gap-2"> 
              <LuView className="" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm">
          {form.description || "No description"}
      </CardContent>
      <CardFooter> 
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4"> 
            <Link href={`/forms/${form.id}`}>View submissions <BiRightArrowAlt /></Link>
          </Button>
        ) }
        {!form.published && (
          <Button asChild 
          variant={"secondary"}
          className="w-full mt-2 text-md gap-4"> 
            <Link href={`/builder/${form.id}`}>form<FaEdit /></Link>
          </Button>
        ) }
      </CardFooter>
    </Card>
  )
}