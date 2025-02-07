import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import { useModalContext } from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

import { deleteEventSchema } from "@/lib/validations";
import { deleteEvent, TDeleteEventState } from "@/lib/actions";

export default function DeleteEventForm({ eventId }: { eventId: number }) {
  const { close } = useModalContext();
  const initialState: TDeleteEventState | undefined = {};

  async function clientAction(
    prev: TDeleteEventState | undefined,
    formData: FormData
  ) {
    const eventId = parseInt(formData?.get("eventId") as string);

    const result = deleteEventSchema.safeParse({ eventId });
    if (!result.success) {
      console.log(result?.error?.flatten().fieldErrors);
      toast.error("Missing Fields. Failed to delete event");
      return {
        status: 400,
        errors: result.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to delete event",
      };
    }

    const res = await deleteEvent(result.data.eventId);
    if (res?.message) {
      if (res?.status === 400) {
        toast.error(res.message);
        if (res?.errors) return res;
      } else if (res?.status === 200) {
        toast.success(res.message);
        close();
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(clientAction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="eventId" value={eventId} />
      <ConfirmDelete close={close} resourceName="event" />
    </form>
  );
}
