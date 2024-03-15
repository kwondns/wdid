import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { AuthAtom } from '@/stores/Auth.store';
import { useAuth } from '@/hooks/useAuth';
import { AuthType } from '@/types/Auth.type';

export function Auth() {
  const { handleSubmit, register, resetField } = useForm<AuthType>();
  const navigate = useNavigate();
  const { auth, isPending } = useAuth();
  const credential = useRecoilValue(AuthAtom);
  useEffect(() => {
    if (credential) navigate('/past');
  }, [credential]);
  const onSubmit = async (data: AuthType) => {
    auth(data);
    resetField('password');
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex w-full flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">관리 모드</h1>
        </div>
        <div className="card w-full max-w-sm flex-1 bg-base-100 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Username</span>
              </label>
              <input placeholder="UserName" className="input input-bordered" required {...register('username')} />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register('password')}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={isPending}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
