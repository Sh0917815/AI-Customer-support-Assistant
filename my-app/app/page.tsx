"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("/dashboard");
  }, []);

  return (
    <main>
      <p>Redirecting to dashboard...</p>
      <p>
        If you are not redirected,{" "}
        <a href="/dashboard">click here</a>.
      </p>
    </main>
  );
}
