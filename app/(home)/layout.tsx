import Link from "next/link";
import AppBar from "@/components/layout/AppBar";
import StickyHeader from "@/components/layout/StickyHeader";
import MobileContainer from "@/components/layout/MobileContainer";
import Button from "@/components/ui/Button";
import { MagnifyingGlass } from "@/components/ui/Icon";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StickyHeader>
        <AppBar title="Pokedex" className="py-3" titleClassName="col-span-2">
          <div className="justify-self-end">
            <Link href={{ pathname: "/search", query: { name: "" } }}>
              <Button>
                <MagnifyingGlass className="size-4" strokeWidth={2} />
              </Button>
            </Link>
          </div>
        </AppBar>
      </StickyHeader>
      <main>
        <MobileContainer className="py-6">{children}</MobileContainer>
      </main>
    </>
  );
}
