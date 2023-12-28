import fakePhoto from "../src/assets/fake-photo.png";
import nextButton from "../src/assets/Arrow.svg";

export const BlogCard = () => {
  return (
    <div className="blog-card m-24">
      <img src={fakePhoto} alt="" />
      <div className="mt-24 mb-16">
        <h4 className="author-name">ლილე კვარაცხელია</h4>
        <p className="posted-date">02.11.2023</p>
      </div>
      <h2 className="blog-heading mb-16">
        EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა
      </h2>
      <div className="mb-16">
        <p className="added-blog-categories">
          მარკეტი აპლიკაცია ხელოვნური ინტელექტი სადსადსადსასდადსდსად
        </p>
      </div>
      <div className="mb-16 description-container">
        <p className="added-blog-description">
          6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური
          სიზუსტისთვის, ეს პროცესი... 6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც
          დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...
        </p>
      </div>
      <div className="blog-card-container">
        <button className="blog-card-btn">
          სრულად ნახვა <img src={nextButton} alt="" />
        </button>
      </div>
    </div>
  );
};
