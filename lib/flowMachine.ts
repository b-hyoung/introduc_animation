// lib/flowMachine.ts
export type FlowState = 
  | "IDEATE"
  | "CRITIC"
  | "REVISE"
  | "WIREFRAME"
  | "PLAN_DOC"
  | "TO_JAEMINAI";

export const FLOW_SEQUENCE: FlowState[] = [
  "IDEATE", "CRITIC", "REVISE", "WIREFRAME", "PLAN_DOC", "TO_JAEMINAI"
];