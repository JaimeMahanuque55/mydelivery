import { Tenant } from "../../types/Tenant"

export type DataType = {
  tenant: Tenant | null;
}

export type ActionType = {
  type: Actions;
  payload?: any;
}

export enum Actions {
  SET_TENANT
}