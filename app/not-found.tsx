import ErrorBase from "@/components/layout/ErrorBase";

export default function NotFound() {
	return (
		<ErrorBase
			headerTitle='Not Found'
			title='404 Not Found'
			description='The page you are looking for does not exist.'
		/>
	);
}
