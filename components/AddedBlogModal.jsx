import successImage from "../src/assets/success-button.png";
import svgImage from "../src/assets/add.svg";
import { Link } from "react-router-dom";

export const AddedBlogModal = () => {
  return (
    <div className="modal-background-succes">
      <div className="login-modal bg-color">
        <div className="close-button">
          <button className="btn-stealth">
            <img src={svgImage} alt="close button" />
          </button>
        </div>
        <div className="validated">
          <img src={successImage} alt="success icon" />
          <p>ჩანაწი წარმატებით დაემატა</p>

          <Link to="/" className="button">
            <button className="button">მთავარ გვერდზე დაბრუნება</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
