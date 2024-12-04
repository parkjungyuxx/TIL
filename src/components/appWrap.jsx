import imagePath from "./images/lb.jpg";

const AppWrap = () => {
  return (
    <div>
      <Navbar>
        <Avatar image={imagePath} name="lucas bergvall" size={200} />
        <p>안녕하세요</p>
      </Navbar>
    </div>
  );
};

const Navbar = ({ children }) => {
  return <header style={{ backgroundColor: "yellow" }}>{children}</header>;
};

const Avatar = ({ image, name, size }) => {
  return (
    <div>
      <img
        src={image}
        alt={`${name}`}
        width={size}
        height={size}
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
};

export default AppWrap;
