"use client";

import {SessionProvider} from "next-auth/react";
import {NextUIProvider} from "@nextui-org/react";
import React, {ReactNode} from "react";

export const Providers= ({ children }: {children: ReactNode}) => {

  return (
    <NextUIProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextUIProvider>
  )

}