export default function Cover({ name, id, isBanner = false }) {
  return (
    <div className="cursor-default drop-shadow-lg">
      <object
        className="rounded-2xl w-full h-auto"
        data={`https://res.cloudinary.com/glhfvn/image/upload/c_fit/v1/covers/${id}.jpg`}
        type="image/jpeg"
      >
        <img
          className="rounded-2xl w-full h-auto"
          src={`/api/og?name=${name}`}
          alt={name}
        />
      </object>
    </div>
  );
}
