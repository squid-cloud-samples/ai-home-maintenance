export type MaintenanceTask = {
  __id: string;
  task: string;
  interval: string;
  appliance: string;
  lastUpdated?: string;
  completed: boolean;
};