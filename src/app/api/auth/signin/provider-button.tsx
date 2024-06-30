"use client";

import { Button } from "@nextui-org/react";
import {ClientSafeProvider, signIn} from "next-auth/react";
import React from "react";
import {FaGoogle} from "react-icons/fa";

export function ProviderButton({ provider } : { provider: ClientSafeProvider }) {
  return (
    <div>
      <Button onClick={() => signIn(provider.id)} startContent={<FaGoogle />}>
        Sign in with {provider.name}
      </Button>
    </div>
  )
}
