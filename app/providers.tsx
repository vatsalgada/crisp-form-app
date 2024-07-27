"use client";

import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: {children: React.ReactNode} )  {
    return <SessionProvider>{children}</SessionProvider>;
}

//importing this in layout file
// not directly using session provider in app/layout.tsx file
// because it is not available in the server side
// and we are using it in the client side
