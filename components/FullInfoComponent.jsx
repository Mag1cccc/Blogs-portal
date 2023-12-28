import { useState } from "react";
import { LoginModal } from "./LoginModal";
import redberryLogo from "../src/assets/redberry-logo.png";
import fakePhotoTwo from "../src/assets/fake-photo-2.png";

export const FullInfoComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      <header>
        <img src={redberryLogo} alt="redberry logo" />
        <button type="submit" onClick={() => setIsModalOpen(true)}>
          შესვლა
        </button>
      </header>
      <div className="full-info-container">
        <div>
          <img src={fakePhotoTwo} alt="" />
          <div className="container-two">
            <h3>ლილე კვარაცხელია</h3>
            <p>02.11.2023 • lile.kvaratskhelia@redberry.ge</p>
          </div>
          <h2 className="full-info-container-heading">
            მობილური ფოტოგრაფიის კონკურსის გამარჯვებულთა ვინაობა ცნობილია
          </h2>
          <div className="full-info-container-categories">
            <p> მარკეტი მარკეტი მარკეტი მარკეტი </p>
          </div>
          <div className="full-info-container-description">
            <p>
              6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური
              სიზუსტისთვის, ეს პროცესი ორჯერ გაიმეორეს და ორივეჯერ იმ ყველს
              მიენიჭა უპირატესობა, რომელსაც ჰიპ-ჰოპს ასმენინებდნენ. „მუსიკალური
              ენერგია პირდაპირ ყველის შუაგულში რეზონირებდა“, — აღნიშნა ბერნის
              ხელოვნების უნივერსიტეტის წარმომადგენელმა, მაიკლ ჰერენბერგმა. რა
              თქმა უნდა, ეს ერთი კვლევა საკმარისი არ არის საბოლოო დასკვნების
              გამოსატანად. სანაცვლოდ, მეცნიერებს სურთ, უშუალოდ ჰიპ-ჰოპის ჟანრის
              სხვადასხვა მუსიკა მოასმენინონ რამდენიმე ყველს და უკვე ისინი
              შეაჯიბრონ ერთმანეთს. აქვე საგულისხმოა, რომ როგორც ბერნის
              მეცნიერები განმარტავენ, ექსპერიმენტს საფუძვლად არა ყველის
              გაუმჯობესებული წარმოება, არამედ კულტურული საკითხები დაედო. მათი
              თქმით, ადამიანებს უყვართ ყველი და მუსიკა, ამიტომაც საინტერესოა ამ
              ორის კავშირის დანახვა.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="full-info-container-heading ml-40">
          {" "}
          მსგავსი სტატიები{" "}
        </h2>
      </div>
    </div>
  );
};
