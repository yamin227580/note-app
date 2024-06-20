import {
  ExpenseToUpdate,
  LaborToUpdate,
  ProjectToUpdate,
  expenseDataBySiteType,
} from "@/types/typesForApp";
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
  deleteData: (id: number, dataToDelete: string) => void;
  updateLabor: (id: number, dataToUpdate: LaborToUpdate) => void;
  updateProject: (id: number, dataToUpdate: ProjectToUpdate) => void;
  updateExpense: (id: number, dataToUpdate: ExpenseToUpdate) => void;
}

export const defaultAppContextData: AppContextType = {
  data: defaultAppData,
  setData: (data: AppData) => {},
  addLabor: (labor: Labor) => {},
  addProject: (project: Project) => {},
  addExpense: (expense: Expense) => {},
  filterBySite: (siteName: string) => {},
  deleteData: (id: number, dataToDelete: string) => {},
  updateLabor: (id: number, dataToUpdate: LaborToUpdate) => {},
  updateProject: (id: number, dataToUpdate: ProjectToUpdate) => {},
  updateExpense: (id: number, dataToUpdate: ExpenseToUpdate) => {},
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
  const deleteData = (id: number, dataToDelete: string) => {
    if (dataToDelete === "labor") {
      const filterData = data.labors.filter((item) => item.id !== id);
      setData({ ...data, labors: filterData });
    }
    if (dataToDelete === "project") {
      const filterData = data.projects.filter((item) => item.id !== id);
      setData({ ...data, projects: filterData });
    }
    if (dataToDelete === "expense") {
      const filterData = data.expenses.filter((item) => item.id !== id);
      setData({ ...data, expenses: filterData });
    }
  };
  const updateLabor = (id: number, dataToUpdate: LaborToUpdate) => {
    const updatedData = data.labors.map((item) =>
      item.id === id
        ? {
            ...item,
            laborType: dataToUpdate.laborType,
            price: dataToUpdate.price,
          }
        : item
    );
    setData({ ...data, labors: updatedData });
  };
  const updateProject = (id: number, dataToUpdate: ProjectToUpdate) => {
    const updatedData = data.projects.map((item) =>
      item.id === id
        ? {
            ...item,
            siteName: dataToUpdate.siteName,
            siteAddress: dataToUpdate.siteAddress,
            totalPrice: dataToUpdate.totalPrice,
            date: dataToUpdate.date,
          }
        : item
    );
    setData({ ...data, projects: updatedData });
  };
  const updateExpense = (id: number, dataToUpdate: ExpenseToUpdate) => {
    const updatedData = data.expenses.map((item) =>
      item.id === id
        ? {
            ...item,
            siteName: dataToUpdate.siteName,
            laborType: dataToUpdate.laborType,
            number: dataToUpdate.number,
            date: dataToUpdate.date,
          }
        : item
    );
    setData({ ...data, expenses: updatedData });
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        addLabor,
        addProject,
        addExpense,
        filterBySite,
        deleteData,
        updateLabor,
        updateProject,
        updateExpense,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
