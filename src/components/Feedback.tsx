import { InformationCircleIcon } from '@heroicons/react/solid';

interface InformationProps {
  message: string;
}

export const Information = ({ message }: InformationProps): JSX.Element => {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex justify-between">
          <span className="text-sm text-blue-700">{message}</span>
        </div>
      </div>
    </div>
  );
};
