export const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const;
export const YEARS = [{ value: 2026, label: "2026" }];
export const MONTH_LABEL = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Ags",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
export interface dataTypeGetMonthlyReport {
  month: string;
  totalSales: number;
  totalOrders: number;
}
export interface dataTypeGetProductReport {
  month: string;
  productId: string;
  productName: string;
  totalSales: number;
  quantitySold: number;
}
export interface dataTypeGetCategoryReport {
  month: string;
  categoryId: string;
  categoryName: string;
  totalSales: number;
}
