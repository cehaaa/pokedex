"use client";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/cn";
import { TABS, Tab } from "@/app/[name]/constants";

import Link from "next/link";
import Button from "@/components/UI/Button";

const constructHref = (
  pathname: string,
  searchParams: URLSearchParams,
  tab: Tab
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("tab", tab);
  return `${pathname}?${params.toString()}`;
};

export default function Tabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || Tab.ABOUT;

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar">
      {TABS.map((tab) => (
        <Link key={tab} href={constructHref(pathname, searchParams, tab)}>
          <Button
            className={cn(
              "text-xs text-white px-3 py-2 font-medium capitalize hover:underline underline-offset-2",
              activeTab === tab && "bg-red-700 underline underline-offset-2"
            )}
          >
            {tab}
          </Button>
        </Link>
      ))}
    </div>
  );
}
