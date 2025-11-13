"use client";

import Link from "next/link";
import AppBar from "@/components/layout/AppBar";
import MobileContainer from "@/components/layout/MobileContainer";

interface ErrorBaseProps {
	headerTitle: string;
	title: string;
	description: string | React.ReactNode;
}

export default function ErrorBase({
	headerTitle,
	title,
	description,
}: ErrorBaseProps) {
	return (
		<>
			<header>
				<AppBar
					withBackButton
					backRoute='/'
					title={headerTitle}
					titleClassName='text-center'
				/>
			</header>
			<main>
				<MobileContainer className='pt-5' withMinHeight>
					<h1 className='text-2xl font-bold tracking-wider uppercase mb-2'>
						{title}
					</h1>
					<p>
						{description}{" "}
						<Link
							href='/'
							className='hover:underline underline-offset-2 text-red-700'
						>
							Back to homepage
						</Link>
					</p>
				</MobileContainer>
			</main>
		</>
	);
}
