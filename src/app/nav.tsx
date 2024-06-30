"use client";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";

export default function Nav() {
  const path = usePathname();
  const customerPath = path.includes('customers')
  const productPath = path.includes('products')
  const invoicePath = path.includes('invoices')

  const {status: authStatus} = useSession();


  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">DAS</p>
        </Link>
      </NavbarBrand>
      {authStatus === "authenticated" && (
        <>
          <NavbarContent className="sm:flex gap-4" justify="center">
            <NavbarItem isActive={customerPath} aria-current={customerPath ? "page" : undefined}>
              <Link color={customerPath ? undefined : "foreground"} href="/customers">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem isActive={invoicePath} aria-current={invoicePath ? "page" : undefined}>
              <Link color={invoicePath ? undefined : "foreground"} href="/invoices">
                Invoices
              </Link>
            </NavbarItem>
            <NavbarItem isActive={productPath} aria-current={productPath ? "page" : undefined}>
              <Link color={productPath ? undefined : "foreground"} href="/products">
                Products
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button color="primary" variant="flat" onPress={() => signOut()}>
                Log out
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}
    </Navbar>
  )
}