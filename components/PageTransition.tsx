"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {children}
    </div>
  );
}
