import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GetFormStats } from "../lib/actions/form";

export default function Home() {
  return (
    <div className="container pt-4"><Button>Start your free trial</Button>
      <CardStatsWrapper></CardStatsWrapper>  
    </div>
  );
}

async function CardStatsWrapper() {
  const  session  = await GetFormStats();

  if(!session) return (<div>No user</div>)

  const jsj = JSON.stringify(session)
  
  return <div> {JSON.stringify(jsj) }</div>
      
  
}
