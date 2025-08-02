import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock BEFORE importing userApi!
vi.mock('../src/api/index', () => {
  const signUp = vi.fn();
  const signInWithPassword = vi.fn();
  const signOut = vi.fn();
  return {
    supabase: {
      auth: {
        signUp,
        signInWithPassword,
        signOut,
      },
    },
  };
});

import * as userApi from '../src/api/userApi';
import { supabase } from '../src/api/index';

describe('userApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('signUpUser returns data on success', async () => {
    supabase.auth.signUp.mockResolvedValue({ data: { id: 1 }, error: null });
    const data = await userApi.signUpUser('test@example.com', 'pass');
    expect(data).toEqual({ id: 1 });
  });

  it('signUpUser throws on error', async () => {
    supabase.auth.signUp.mockResolvedValue({ data: null, error: new Error('fail') });
    await expect(userApi.signUpUser('a', 'b')).rejects.toThrow('fail');
  });

  it('signInUser returns data on success', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ data: { token: 'abc' }, error: null });
    const data = await userApi.signInUser('test@example.com', 'pass');
    expect(data).toEqual({ token: 'abc' });
  });

  it('signInUser throws on error', async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({ data: null, error: new Error('bad') });
    await expect(userApi.signInUser('a', 'b')).rejects.toThrow('bad');
  });

  it('signOutUser resolves on success', async () => {
    supabase.auth.signOut.mockResolvedValue({ error: null });
    await expect(userApi.signOutUser()).resolves.toBeUndefined();
  });

  it('signOutUser throws on error', async () => {
    supabase.auth.signOut.mockResolvedValue({ error: new Error('logout fail') });
    await expect(userApi.signOutUser()).rejects.toThrow('logout fail');
  });
});
