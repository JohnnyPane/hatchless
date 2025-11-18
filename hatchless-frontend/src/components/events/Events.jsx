import { Text } from "@mantine/core";
import { useResourceContext } from "../../contexts/ResourceContext.jsx";
import EventCard from "./EventCard.jsx";


const Events = () => {
  const { data: events } = useResourceContext();

  return (
    <div>
      {events.length === 0 ? (
        <Text size="lg" className="center-text margin-80-t">No events available.</Text>
      ) : (
          <div className="flex column align-center">
            {events.map((event) => (
              <div key={event.id} className="margin-bottom">
                <EventCard key={event.id} event={event} />
              </div>
            ))}
          </div>
      )}
    </div>
  );
};

export default Events;