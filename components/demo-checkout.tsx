"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const steps = [
  { key: "processing", label: "Processing payment" },
  { key: "paid", label: "Payment succeeded" },
  { key: "licensed", label: "License issued" },
  { key: "ready", label: "Download link ready" },
] as const;

type StepKey = (typeof steps)[number]["key"];

export function DemoCheckout() {
  const [active, setActive] = useState<StepKey | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  function runFlow() {
    setDownloadUrl(null);
    setActive("processing");
    setProgress(10);
    // Simulate async flow
    setTimeout(() => {
      setActive("paid");
      setProgress(40);
    }, 700);
    setTimeout(() => {
      setActive("licensed");
      setProgress(70);
    }, 1400);
    setTimeout(() => {
      setActive("ready");
      setProgress(100);
      setDownloadUrl("/download/mock-file.pdf?sig=demo");
    }, 2100);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo checkout</CardTitle>
        <CardDescription>
          Runs a fake happy path with visual status updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className="text-sm font-medium">
            {active ? steps.find((s) => s.key === active)?.label : "Idle"}
          </span>
        </div>
        <Progress value={progress} />
        <ul className="space-y-1 text-sm">
          {steps.map((s) => (
            <li
              key={s.key}
              className={
                active === s.key ? "text-foreground" : "text-muted-foreground"
              }
            >
              {active &&
              steps.findIndex((x) => x.key === s.key) <=
                steps.findIndex((x) => x.key === active!)
                ? "✔ "
                : "• "}
              {s.label}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={runFlow}>Buy now (fake)</Button>
        {downloadUrl && (
          <Button asChild variant="secondary">
            <a href={downloadUrl}>Open download</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
