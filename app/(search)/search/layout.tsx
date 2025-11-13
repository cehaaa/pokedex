import StickyHeader from "@/components/layout/StickyHeader";
import SearchAppBar from "@/components/SearchPage/SearchAppBar";
import MobileContainer from "@/components/layout/MobileContainer";

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<StickyHeader>
				<SearchAppBar />
			</StickyHeader>
			<main>
				<MobileContainer className='bg-red-500' withMinHeight>
					{children}
				</MobileContainer>
			</main>
		</>
	);
}
