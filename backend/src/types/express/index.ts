import { Request } from 'express';
import { IUser } from '../../models/User';

export interface AuthRequest extends Request {
  user?: IUser & {
    _id: string;
    id?: string;
    userId?: number;
    username?: string;
  };
}

export interface AdminRequest extends AuthRequest {
  user: IUser & {
    _id: string;
    id?: string;
    userId?: number;
    username?: string;
    isAdmin: boolean;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterQuery {
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}