import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import { MagnifyingGlass } from "../UI/Icon";

interface SearchInputProps {
	searchTerm: string;
	isLoading: boolean;
	error: {
		isError: boolean;
		message: string;
	};
	handleOnSearch: (e: React.FormEvent<HTMLFormElement>) => void;
	handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
	searchTerm,
	isLoading,
	error,
	handleOnSearch,
	handleSearchInputChange,
}: SearchInputProps) {
	return (
		<div className='space-y-1.5'>
			<form
				className='flex border border-zinc-900 items-center border-r-0'
				onSubmit={handleOnSearch}
			>
				<input
					type='text'
					placeholder='Enter a Pokemon name'
					className='w-full border-zinc-300 p-2 focus:outline-none'
					value={searchTerm}
					onChange={handleSearchInputChange}
				/>
				<div className='shrink-0'>
					<Button>
						{isLoading ? (
							<Spinner className='size-5' />
						) : (
							<MagnifyingGlass className='size-5' strokeWidth={2} />
						)}
					</Button>
				</div>
			</form>
			{error.isError && (
				<p className='text-red-500 text-xs font-medium'>{error.message}</p>
			)}
		</div>
	);
}
