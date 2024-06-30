import {ClientSafeProvider, getProviders, signIn} from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ProviderButton } from "./provider-button"
import {redirect} from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session !== null) {
    return redirect("/")
  }
  const providers = await getProviders()

  return (
    <div>
      {Object.values(providers ?? []).map((provider) => (
        <ProviderButton key={provider.name} provider={provider} />
      ))}
    </div>
  )
}
