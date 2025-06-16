
import { WalletType } from '../../../types/wallet';

export const checkWalletAvailability = (type: WalletType, availableWallets: any): boolean => {
  const key = type.toLowerCase() as keyof typeof availableWallets;
  return !!availableWallets[key];
};
