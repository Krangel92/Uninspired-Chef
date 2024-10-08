import { useState } from 'react';
import { Knife } from "../Knife/Knife";
import { Tomato } from "../Tomato/Tomato";
import './LandingScreen.css';
import GetInspiredButton from '../../components/GetInspiredButton/GetInspiredButton';


export const LandingScreen = ({ className, setSuggestionsData, setDisplaySavedRecipes }) => {
  const [isCutting, setIsCutting] = useState(false);

  const handleCut = () => {
    setIsCutting(true);
    setTimeout(() => {
      document.getElementById("recipe-feed-container").scrollIntoView({ behavior: 'smooth' });
    }, 2000); // Adjust timing as needed
  };

  return (
    <div className={`landing-screen ${className}`}>
      <div className="content-container h-full flex flex-col justify-center items-center relative">
        <h1 className="title-content">Uninspired?</h1>
        <h2 className="subtitle-content">That can change</h2>
        <div className="mt-5">
          <GetInspiredButton setSuggestionsData={setSuggestionsData} setDisplaySavedRecipes={setDisplaySavedRecipes}/>
          {/* <button className="inspire-button" onClick={handleCut}>
            <div className="button-text">Inspire Me!</div>
          </button> */}
        </div>
        <img
          className="chopping-board"
          alt="Chopping board"
          src="https://c.animaapp.com/XNVGwrYa/img/chopping-board-2.svg"
        />
        <div className="cutting-transition-container">
          <div className="tomato-position">
            <Tomato />
          </div>
          {isCutting && (
            <div className="knife-position">
              <Knife />
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};
