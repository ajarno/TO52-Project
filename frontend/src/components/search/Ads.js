import React, { useState } from "react";
import { useEffectOnlyOnce } from "../../api/Utils";
import { fetchAdsByCategory } from "../../api/AdsAPI";
import AdMiniature from "./AdMiniature";
import AdMiniatureLoading from "./AdMiniatureLoading";

export default function Ads(props) {
  const [ads, setAds] = useState([]);
  const minimumTime = 850;
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffectOnlyOnce(() => {
    setIsLoading(true);
    setMinimumTimeElapsed(false);
    setTimeout(() => { 
      setMinimumTimeElapsed(true); 
    }, minimumTime); 
    fetchAdsByCategory(props.category)
      .then((_ads) => {
        setAds(_ads.data);
        console.log(_ads.data);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .then(() => setIsLoading(false));
  });

  return (
    <React.Fragment>
      {(!minimumTimeElapsed && ads.length === 0) || isLoading ? (
        <AdMiniatureLoading />
      ) : ads.length > 0 ? (
        ads.map((ad) => {
          return <AdMiniature ad={ad} key={ad.id} />;
        })
      ) : (
        <p>
          Aucune annonce disponible pour votre recherche... <br />
          <small>Essayez de changer vos critères de recherches</small>
        </p>
      )}
    </React.Fragment>
  );
}
