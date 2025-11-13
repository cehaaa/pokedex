import Link from "next/link";
import AppBar from "@/components/layout/AppBar";
import StickyHeader from "@/components/layout/StickyHeader";
import MobileContainer from "@/components/layout/MobileContainer";
import Button from "@/components/UI/Button";
import { MagnifyingGlass } from "@/components/UI/Icon";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<StickyHeader>
				<AppBar title='Pokedex' className='py-3' titleClassName='col-span-2'>
					<div className='justify-self-end'>
						<Link href={{ pathname: "/search", query: { q: "" } }}>
							<Button>
								<MagnifyingGlass className='size-4' strokeWidth={2} />
							</Button>
						</Link>
					</div>
				</AppBar>
			</StickyHeader>
			<main>
				<MobileContainer className='py-6'>{children}</MobileContainer>
			</main>
		</>
	);
}
