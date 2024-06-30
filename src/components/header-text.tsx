import {ReactNode} from "react";

export const HeaderText = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-center pb-8 text-6xl font-bold">
    {children}
  </div>
)
