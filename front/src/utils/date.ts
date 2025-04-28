export function formatDate(date: string | Date): string {
    const d = date instanceof Date ? date : new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
