import { Event } from "@/helpers/types";
import DetailHead from "./DetailHead";
import DetailBody from "./DetailBody";
import DetailFooter from "./DetailFooter";

interface PropsType {
  event: Event;
}

function EventDetails({ event }: PropsType) {
  const { date, description, image, location, title } = event;

  return (
    <section className="w-full mx-auto flex flex-col justify-center items-center relative">
      <DetailHead>{title}</DetailHead>
      <DetailBody date={date} image={image} location={location} title={title} />
      <DetailFooter>{description}</DetailFooter>
    </section>
  );
}

export default EventDetails;
