export default function Cover({ entry, hero = false }) {
  return (
    <div className="h-fit w-full">
      {entry.image ? (
        <img
          className="h-auto w-full"
          src={entry.image}
          alt={entry.name}
          type="image/png"
        />
      ) : (
        <div
          className={`flex bg-gray-300 p-6 font-bold text-gray-500 ${
            hero ? "text-3xl" : "text-xl"
          } aspect-[2/3] h-full w-full items-center justify-center text-center font-display`}
        >
          <span>{entry.name}</span>
        </div>
      )}
    </div>
  );
}
