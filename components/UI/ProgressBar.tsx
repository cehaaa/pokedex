interface ProgressBarProps {
	value: number;
	maxValue?: number;
	className?: string;
}

export default function ProgressBar({
	value,
	maxValue = 200,
}: ProgressBarProps) {
	const percentage = (value / maxValue) * 100;
	return (
		<div className='w-full h-2 bg-zinc-200 rounded-full'>
			<div
				className='h-full bg-red-700 rounded-full'
				style={{ width: `${percentage}%` }}
			></div>
		</div>
	);
}
