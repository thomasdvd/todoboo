"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // send the error to a service
    console.error(error);
  }, [error]);

  return <div className="p-4">Something went wrong</div>;
}
