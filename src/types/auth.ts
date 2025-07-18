export type UserRole = 'superadmin' | 'admin' | 'pengajar' | 'cpmi';

export type CpmiStatus = 'aktif' | 'piket' | 'sudah_terbang';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  kelas_id?: string;
  status?: CpmiStatus;
  avatar?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}