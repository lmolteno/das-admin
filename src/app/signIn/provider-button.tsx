"use client"

import { Button } from "@nextui-org/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react"


export function ProviderButton() {
  return (
    <div>
      <Button
        onPress={() => signIn("google")}
        startContent={<FaGoogle />}>
        Sign in with Google
      </Button>
    </div>
  )
}
