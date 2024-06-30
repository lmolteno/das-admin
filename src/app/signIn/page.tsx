import { ProviderButton } from "./provider-button"
import {redirect} from "next/navigation";
import {HeaderText} from "@/components/header-text";
import { auth } from "@/auth";


export default async function Home() {
  const session = await auth()

  if (session !== null) {
    return redirect("/")
  }

  return (
    <div>
      <HeaderText>Dunedin Astronomical Society Admin</HeaderText>
      <ProviderButton />
    </div>
  )
}
