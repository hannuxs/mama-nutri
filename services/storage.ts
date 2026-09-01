import { NursingLog, BMIData, User, ChildProfile } from '../types';

const LOGS_KEY = 'mamanutri_logs';
const BMI_KEY = 'mamanutri_bmi';
const USER_KEY = 'mamanutri_user';
const CHILDREN_KEY = 'mamanutri_children';

export const storage = {
  getLogs: (): NursingLog[] => {
    const data = localStorage.getItem(LOGS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveLog: (log: NursingLog) => {
    const logs = storage.getLogs();
    logs.unshift(log);
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  },
  deleteLog: (id: string) => {
    const logs = storage.getLogs();
    const filtered = logs.filter((l) => l.id !== id);
    localStorage.setItem(LOGS_KEY, JSON.stringify(filtered));
  },
  getChildren: (): ChildProfile[] => {
    const data = localStorage.getItem(CHILDREN_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveChild: (child: ChildProfile) => {
    const children = storage.getChildren();
    children.push(child);
    localStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
  },
  updateChild: (updatedChild: ChildProfile) => {
    const children = storage.getChildren();
    const index = children.findIndex((c) => c.id === updatedChild.id);
    if (index !== -1) {
      children[index] = updatedChild;
      localStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
    }
  },
  deleteChild: (id: string) => {
    const children = storage.getChildren();
    const filtered = children.filter((c) => c.id !== id);
    localStorage.setItem(CHILDREN_KEY, JSON.stringify(filtered));
  },
  getBMIData: (): BMIData[] => {
    const data = localStorage.getItem(BMI_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveBMI: (bmi: BMIData) => {
    const history = storage.getBMIData();
    history.unshift(bmi);
    localStorage.setItem(BMI_KEY, JSON.stringify(history));
  },
  getUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  },
};
