export default function Cover({ entry, hero = false }) {
  return (
    <div className="cursor-default shadow-md hover:shadow-lg transition-all ease-in-out h-fit rounded-2xl">
      {entry.image ? (
        <img
          className="rounded-2xl w-full h-auto"
          src={entry.image}
          alt={entry.name}
          type="image/png"
        />
      ) : (
        <div
          className={`bg-gray-300 text-gray-500 flex p-6 font-bold ${
            hero ? "text-3xl" : "text-xl"
          } font-display text-center aspect-[2/3] h-full w-full rounded-2xl items-center justify-center`}
        >
          <span>{entry.name}</span>
        </div>
      )}
    </div>
  );
}
