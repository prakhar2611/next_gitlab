import Image from "next/image";
import { GetProjects, GetUsers, GetBranches,GetCommitsOfBranch } from "./Utils/gitlab";
import { Card, Flex, MultiSelect } from "@tremor/react";
import { MainPage } from "./Pages/main";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
      <MainPage/>
      

    
    </main>
  );
}
