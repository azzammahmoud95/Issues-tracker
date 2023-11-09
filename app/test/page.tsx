import { getServerSession } from "next-auth/next"
import { options } from "../api/auth/[...nextauth]/options"
import Image from "next/image"
export default async function Page() {
  const session = await getServerSession(options)

  return (
    <div>
        <Image src={`${session?.user?.image}`} width={100} height={100} alt="hel"/>
        {/* <p>{session?.user?.email}</p> */}
    </div>
  )
}