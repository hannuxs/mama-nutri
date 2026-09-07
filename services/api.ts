import { CONFIG } from '../config';
import { User } from '../types';

export const apiService = {
  login: async (
    phone: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; message?: string }> => {
    if (CONFIG.DEBUG_MODE) {
      if (phone === '123' && password === '123') {
        return { success: true, user: { name: 'Mama Debug', phone: '123' } };
      }
      return { success: false, message: 'Nomor HP atau Password salah (Mode Debug)' };
    }

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      return data;
    } catch {
      return { success: false, message: 'Gagal terhubung ke server.' };
    }
  },

  register: async (user: User): Promise<{ success: boolean; message?: string }> => {
    if (CONFIG.DEBUG_MODE) {
      return { success: true };
    }

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch {
      return { success: false, message: 'Gagal terhubung ke server.' };
    }
  },
};
