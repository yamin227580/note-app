import { expenseDataBySiteType } from "@/types/typesForApp";
import { Expense, Labor, Project } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface AppData {
  labors: Labor[];
  projects: Project[];
  expenses: Expense[];
  expensesDataBySiteWithTotal: expenseDataBySiteType[];
  isLightTheme: boolean;
}

export const defaultAppData = {
  labors: [],
  projects: [],
  expenses: [],
  expensesDataBySiteWithTotal: [],
  isLightTheme: true,
};

export interface AppContextType {
  data: AppData;
  setData: (data: AppData) => void;
  addLabor: (labor: Labor) => void;
  addProject: (project: Project) => void;
  addExpense: (expense: Expense) => void;
  filterBySite: (siteName: string) => any;
}

export const defaultAppContextData: AppContextType = {
  data: defaultAppData,
  setData: (data: AppData) => {},
  addLabor: (labor: Labor) => {},
  addProject: (project: Project) => {},
  addExpense: (expense: Expense) => {},
  filterBySite: (siteName: string) => {},
};

export const AppContext = createContext<AppContextType>(defaultAppContextData);

interface Props {
  children: ReactNode;
}

const AppProvider = ({ children }: Props) => {
  const [data, setData] = useState<AppData>(defaultAppData);
  const addLabor = (labor: Labor) => {
    setData({ ...data, labors: [...data.labors, labor] });
  };
  const addProject = (project: Project) => {
    setData({ ...data, projects: [...data.projects, project] });
  };
  const addExpense = (expense: Expense) => {
    setData({ ...data, expenses: [...data.expenses, expense] });
  };
  const filterBySite = (siteName: string) => {
    const filterExpenses = data.expenses.filter(
      (item) => item.siteName === siteName
    );
    const newData = filterExpenses.map((item) => ({
      ...item,
      laborPrice: data.labors.find(
        (labor) => item.laborType === labor.laborType
      )?.price,
    }));

    const initialValue = 0;
    const sumOfExpenses = newData.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.laborPrice) * currentValue.number,
      initialValue
    );
    const expenseDataWithTotal = newData.map((item) => ({
      ...item,
      totalPrice: sumOfExpenses,
    }));
    setData({ ...data, expensesDataBySiteWithTotal: expenseDataWithTotal });
    return expenseDataWithTotal;
  };
  return (
    <AppContext.Provider
      value={{ data, setData, addLabor, addProject, addExpense, filterBySite }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
