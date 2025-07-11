import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

export const CampSite = ({ backgroundImage, title, subtitle }: CampProps) => {
  return (
    <div
      className={`h-full w-full min-w-[1100px] ${backgroundImage} bg-cover bg-no-repeat lg:rounded-r-5xl 2xl:rounded-5xl`}
    >
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="bold-18 text-white">{title}</h4>
            <p className="regular-14 text-white">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Camp = () => {
  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
      {/* Heading */}
      <h2 className="text-center text-black text-5xl font-bold mb-8">Collections</h2>

      {/* Scrollable Camp Sites */}
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        {/* <CampSite
          backgroundImage="bg-bg-img-2"
          title="JUST RED"
          subtitle="Bar Area"
          peopleJoined="50+ Ordered"
        />
        <CampSite
          backgroundImage="bg-bg-img-7"
          title="Calacatta series"
          subtitle="Dining Area"
          peopleJoined="50+ Ordered"
        />
        <CampSite
          backgroundImage="bg-bg-img-8"
          title="OLYMPIA WHITE"
          subtitle="Stair Area"
          peopleJoined="50+ Ordered"
        />
        <CampSite
          backgroundImage="bg-bg-img-5"
          title="CARRARA BEIGE"
          subtitle="Bar Area"
          peopleJoined="50+ Ordered"
        />
        <CampSite
          backgroundImage="bg-bg-img-3"
          title="GRAINY BEIGE"
          subtitle="Open Kitchen"
          peopleJoined="50+ Ordered"
        />
        <CampSite
          backgroundImage="bg-bg-img-6"
          title="CARRARA BEIGE"
          subtitle="Bar Area"
          peopleJoined="50+ Ordered"
        />
        <CampSite
          backgroundImage="bg-bg-img-1"
          title="IMPERIAL WHITE"
          subtitle="Living Room"
          peopleJoined="50+ Ordered"
        />
        <CampSite
          backgroundImage="bg-bg-img-4"
          title="JUST RED"
          subtitle="Bar Area"
          peopleJoined="50+ Ordered"
        /> */}
        <InfiniteMovingCards
          items={[]}
          speed="slow"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default Camp;
