import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { CredentialType } from '@/types';
import { useAuth } from '@/hooks';
import { AuthStore } from '@/stores';

export function Auth() {
  const { handleSubmit, register, resetField } = useForm<CredentialType.CredentialType>();
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(AuthStore.AuthAtom);
  useEffect(() => {
    if (auth) navigate('/past');
  }, [auth]);
  const onSubmit = async (credential: CredentialType.CredentialType) => {
    const result = await useAuth.useAuth(credential);
    if (!result) resetField('password');
    else {
      setAuth(result);
      navigate('/future');
    }
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
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register('email')}
              />
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
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
