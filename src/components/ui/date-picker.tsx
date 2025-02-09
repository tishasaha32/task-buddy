import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { DayPicker, Matcher } from "react-day-picker";
import { ComponentProps, ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type CalendarProps = ComponentProps<typeof DayPicker>;

export interface DatePickerProps extends Omit<CalendarProps, "disabled" | "mode" | "onSelect" | "selected"> {
	dateRange?: Matcher | Matcher[];
	disabled?: boolean;
	endContent?: ReactNode;
	onChange?: (date?: Date) => void;
	placeholder?: string;
	required?: boolean;
	startContent?: ReactNode;
	value?: Date;
}

const DatePicker = ({ className, disabled, endContent, onChange, placeholder, required, startContent, value, ...props }: DatePickerProps) => {
	const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

	const onSelect = (date?: Date) => {
		if (onChange) {
			onChange(date);
		}
		setIsCalendarOpen(false);
	};
	return (
		<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
			<PopoverTrigger asChild>
				<Button
					className={cn("w-full justify-between border border-border px-3 text-sm font-normal disabled:pointer-events-auto disabled:cursor-not-allowed", className, !value && "text-muted-foreground")}
					disabled={disabled}
					size="lg"
					variant={"outline"}
				>
					{startContent}
					<div className="w-full text-left">{value ? format(new Date(value), "do LLL, yyyy") : <span>{placeholder ?? ""}</span>}</div>
					{endContent}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="center" className="w-auto p-0" onOpenAutoFocus={event => event.preventDefault()}>
				<Calendar mode="single" onSelect={onSelect} required={required ?? true} selected={value ? new Date(value) : undefined} {...props} />
			</PopoverContent>
		</Popover>
	);
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
