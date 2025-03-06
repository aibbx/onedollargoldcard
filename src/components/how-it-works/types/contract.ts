
import { ReactNode } from 'react';

export interface ContractSection {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  code: string;
  securityPoints: string[];
}
