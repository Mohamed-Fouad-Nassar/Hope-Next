import HomeEventsSlider from "./HomeEventsSlider";

import { getEvents } from "@/services/eventsAPI";

export default async function HomeEventsList() {
  const events = await getEvents();

  return <HomeEventsSlider events={events.slice(0, 3)} />;
}
