'use client';
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
function Custom404() {
  const router  = useRouter()
  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center  h-[80vh]">
      <Image src={`/logo.png`} width={350} height={350} alt="404image" />
      <h1 className="font-bold text-xl">Go Back To Home Page</h1>
    <Button className="w-44 " onClick={() => router.push('/')}><span className="font-bold">Home Page</span></Button>
    </div>
  );
}

export default Custom404;
