export interface CreateLaborPayload {
  laborType: string;
  price: number;
}
export interface CreateProjectPayload {
  siteName: string;
  siteAddress: string;
  date: string;
  totalPrice: number;
}
export interface CreateExpensePayload {
  date: string;
  laborType: string;
  number: number;
  siteName: string;
}
export interface expenseDataBySiteType {
  id: number;
  siteName: string;
  laborType: string;
  number: number;
  date: string;
  laborPrice: number | undefined;
  totalPrice: number | undefined;
}
export interface LaborToUpdate {
  laborType: string;
  price: number;
}
export interface ProjectToUpdate {
  siteName: string;
  siteAddress: string;
  date: string;
  totalPrice: number;
}
export interface ExpenseToUpdate {
  siteName: string;
  laborType: string;
  number: number;
  date: string;
}
