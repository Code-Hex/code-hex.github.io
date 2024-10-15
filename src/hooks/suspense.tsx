export interface SuspenseReader<T extends any> {
  read(): T;
}

const wrapPromise = <T extends unknown>(
  promise: Promise<T>,
): SuspenseReader<T> => {
  let status = 'pending';
  let result: T;

  const suspender = promise.then(
    (r) => {
      status = 'fulfilled';
      result = r;
    },
    (e) => {
      status = 'rejected';
      result = e;
    },
  );

  const read = (): T => {
    if (status === 'pending') {
      throw suspender;
    }
    if (status === 'rejected') {
      throw result;
    }
    return result;
  };

  return { read };
};

export const wrap4Suspense = <T extends unknown>(promise: Promise<T>) => {
  return wrapPromise(promise);
};
