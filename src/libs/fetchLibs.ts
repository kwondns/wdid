export const checkStatus = (response: Response) => {
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
};

export const fetchGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      Accept: 'Application/json',
    },
  });
  checkStatus(response);
  return response.json();
};

export const fetchPatch = async (url: string, body: Object) => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/${url}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  checkStatus(response);
};

export const fetchPost = async (url: string, body: Object) => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  checkStatus(response);
};
