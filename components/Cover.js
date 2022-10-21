export default function Cover({ name, id, isBanner = false }) {
  return (
    <div className="cursor-default drop-shadow-lg hover:drop-shadow-xl transition-all ease-in-out ">
      <img
        className="rounded-2xl w-full h-auto"
        src={`https://res.cloudinary.com/glhfvn/image/upload/c_fit/v1/covers/${id}.jpg`}
        alt={name}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `/api/og?name=${name}`;
        }}
      />
    </div>
  );
}
