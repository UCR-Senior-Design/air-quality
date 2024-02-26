/* eslint-disable @next/next/no-img-element */
const Profile = ({ name, position, image }) => {
  return (
    <div className="text-center">
      <img
        className="rounded-full"
        src="https://m.media-amazon.com/images/I/810XSuEz1vL.jpg"
        alt="User Profile Pictures"
      />
      <p className="font-semibold text-xl">{name}</p>
      <p>{position}</p>
    </div>
  );
};

export default Profile;
