import { connection } from "next/server";
import SearchPageContent from "@/components/SearchPage/SearchPageContent";

export default async function Page() {
	await connection();
	return <SearchPageContent />;
}
