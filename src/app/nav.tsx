"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar, DropdownItem,
  DropdownMenu
} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import dasLogo from "@/../public/logo.svg";
import React from "react";

export default function Nav() {
  const { status: authStatus, data: session } = useSession();

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <Image src={dasLogo} alt="DAS Logo" />
          <div className="leading-none text-inherit font-semibold">
            <p>Dunedin</p>
            <p>Astronomical</p>
            <p>Society</p>
          </div>
        </Link>
      </NavbarBrand>
      {authStatus === "authenticated" && session !== null && (
        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={session.user?.name ?? ''}
                size="sm"
                src={session.user?.image ?? ''}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys="profile">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="log_out" as="button" onPress={() => signOut()}>Sign out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  )
}