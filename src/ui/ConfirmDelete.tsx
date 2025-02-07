import { useFormStatus } from "react-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import Button from "./Button";
import Spinner from "./Spinner";

type ConfirmDeleteProps = {
  resourceName: string;
  close: () => void;
};
export default function ConfirmDelete({
  close,
  resourceName,
}: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col min-h-full items-end p-4 text-center sm:items-center sm:p-0">
      <div className="bg-transparent">
        <div className="sm:flex sm:items-center">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="h-6 w-6 text-red-600"
            />
          </div>

          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete {resourceName}? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      <Buttons close={close} />
    </div>
  );
}

function Buttons({ close }: { close: () => void }) {
  const { pending } = useFormStatus();

  return (
    <div className="bg-transparent w-full pt-5 flex flex-row-reverse justify-center md:justify-start gap-2">
      <Button
        disabled={pending}
        className="!py-2"
        type="submit"
        variation="danger"
      >
        {pending ? (
          <div className="flex items-center gap-2">
            <Spinner size="!size-4" />
            <span>Deleting...</span>
          </div>
        ) : (
          "Yes, Delete it!"
        )}
      </Button>

      <Button
        type="button"
        onClick={close}
        className="!py-2"
        disabled={pending}
        variation="secondary"
      >
        Cancel
      </Button>
    </div>
  );
}
