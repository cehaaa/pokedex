import ErrorBase from "@/components/layout/ErrorBase";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "404 - Page Not Found",
	description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
	return (
		<ErrorBase
			headerTitle='Not Found'
			title='404 Not Found'
			description='The page you are looking for does not exist.'
		/>
	);
}
