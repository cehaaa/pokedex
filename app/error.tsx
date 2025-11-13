"use client";
import ErrorBase from "@/components/layout/ErrorBase";

export default function Error() {
	return (
		<ErrorBase
			headerTitle='Error'
			title='Oops! Something went wrong'
			description='An error occurred while loading the page. Please try again later.'
		/>
	);
}
