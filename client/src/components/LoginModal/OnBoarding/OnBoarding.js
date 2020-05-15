import React from "react";

import "./OnBoarding.scss";

const OnBoarding = () => (
  <div className="onboardingContainer">
    <h3 className="onboardingText">There's more here than you think</h3>
    <div className="onboardingTextBody">- save your favourites</div>
    <div className="onboardingTextBody">- upload your own</div>
    <div className="onboardingTextBody">
      {" "}
      - Mobile first NSFW never looked so good ;)
    </div>
  </div>
);

export default OnBoarding;
