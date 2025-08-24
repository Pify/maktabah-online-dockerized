import { format } from "date-fns";

export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return format(date, 'dd MMM yyyy, HH:mm');
}