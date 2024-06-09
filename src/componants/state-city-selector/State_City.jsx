import { useState, useEffect } from "react";
import Selector from "./Selector";
import { City, State, Country } from "country-state-city";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

function StateCitySelector({ state, setState, city, setCity }) {
  let countryData = Country.getCountryByCode("VN");

  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    setStateData(State.getStatesOfCountry(countryData?.isoCode));
  }, [countryData]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(countryData?.isoCode, state?.isoCode));
  }, [state]);

  return (
    <Row>
      <Col md={6} className="mb-3">
        {state && (
          <div>
            <label className="form-label fw-semibold">Tỉnh/Thành Phố:</label>
            <Selector
              data={stateData}
              selected={state}
              setSelected={setState}
            />
          </div>
        )}
      </Col>
      <Col md={6} className="mb-3">
        {city && (
          <div>
            <label className="form-label fw-semibold">Quận/Huyện:</label>
            <Selector data={cityData} selected={city} setSelected={setCity} />
          </div>
        )}
      </Col>
    </Row>
  );
}

StateCitySelector.propTypes = {
  state: PropTypes.object,
  setState: PropTypes.func.isRequired,
  city: PropTypes.object,
  setCity: PropTypes.func.isRequired,
};

export default StateCitySelector;

// import { useState, useEffect } from "react";
// import Selector from "./Selector";
// import { City, State, Country } from "country-state-city";
// import { Col, Row, Form } from "react-bootstrap";

// function StateCitySelector() {
//   let countryData = Country.getCountryByCode("VN");

//   const [stateData, setStateData] = useState([]);
//   const [cityData, setCityData] = useState([]);

//   const [country] = useState(countryData);
//   const [state, setState] = useState();
//   const [city, setCity] = useState();

//   useEffect(() => {
//     setStateData(State.getStatesOfCountry(country?.isoCode));
//   }, [country]);

//   useEffect(() => {
//     setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
//   }, [state]);

//   useEffect(() => {
//     stateData && setState(stateData[0]);
//   }, [stateData]);

//   useEffect(() => {
//     cityData && setCity(cityData[0]);
//   }, [cityData]);

//   return (
//     <Row>
//       <Col md={6} className="mb-3">
//         {state && (
//           <div>
//             <label className="form-label fw-semibold">Tỉnh/Thành Phố:</label>
//             <Selector data={stateData} selected={state} setSelected={setState} />
//           </div>
//         )}
//       </Col>
//       <Col md={6} className="mb-3">
//         {city && (
//           <div>
//             <label className="form-label fw-semibold">Quận/Huyện:</label>
//             <Selector data={cityData} selected={city} setSelected={setCity} />
//           </div>
//         )}
//       </Col>
//     </Row>
//   );
// }

// export default StateCitySelector;
