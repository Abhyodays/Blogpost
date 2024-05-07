import "./Icon.css";
function Icon({ url, text }) {
  return (
    <div className="icon-container">
      <img className="icon" src={url} />
      <span className="icon-text">{text}</span>
    </div>
  );
}
export default Icon;
