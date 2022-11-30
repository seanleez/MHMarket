// export { default as BlankInfomationStallForm } from './BlankInfomationStallForm'
// export { default as ClientIdentifyForm } from './ClientIdentifyForm'
// export { default as Payment } from './Payment'
export { default as EditStallApplication } from './EditStallApplication'

export type IStallFormShared = {
  step: number;
  status: string;
  dateSubmitted: string
  formNumber: string
}