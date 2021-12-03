import { React, useState, useEffect } from "react";
import { Navbar, Container, Col, Row } from "react-bootstrap";
import WeightEntry from "../components/WeightEntry";
import Metrics from "../services/Metrics";

function Home() {
  const [user_id, setUserID] = useState(0);
  /* eslint-disable */
  const [weightList, setWeightList] = useState(0);
  const [dateList, setDateList] = useState(0);
  const [allData, setAllData] = useState(0);
  /* eslint-enable */

  const handleChange = (e) => {
    setUserID(e.target.value);
  };

  const handleReceiveMetrics = () => {
    event.preventDefault();
    handleReceiveWeight();
    handleReceiveEntryDate();
    handleReceiveAllMetrics();
  };

  const handleReceiveWeight = () => {
    event.preventDefault();
    Metrics.getMetrics(user_id)
      .then((data) => {
        const weightValuesStr = data.metrics.map(function (eM) {
          event.preventDefault();
          return eM.weight;
        });
        const weightValueInt = weightValuesStr.map((w) => Number(w));
        setWeightList(weightValueInt);
      })
      .catch(() => {
        setWeightList([]);
      });
  };

  const handleReceiveEntryDate = () => {
    event.preventDefault();
    Metrics.getMetrics(user_id)
      .then((data) => {
        const dateValues = data.metrics.map(function (eM) {
          event.preventDefault();
          return eM.entry_date;
        });
        const finalDateValues = dateValues.map((d) => d.slice(0, 10));
        setDateList(finalDateValues);
      })
      .catch(() => {
        setDateList([]);
      });
  };

  const handleReceiveAllMetrics = () => {
    event.preventDefault();
    Metrics.getMetrics(user_id).then((data) => {
      setAllData(data);
    });
  };

  useEffect(() => {
    handleReceiveMetrics();
  }, [user_id]);

  return (
    <div>
      <div>
        <Navbar bg="dark" expand="lg">
          <Container>
            <Navbar.Brand>WEIGHT TRACKER TOOL</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div>
        <Container>
          <Row>
            <Col>
              <WeightEntry onChange={handleChange} />
            </Col>
            <Col></Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <div>Your tracked weight measurements are: {weightList}</div>
            </Col>
            <br />
            <br />
            <Col>
              <div>Your tracked date measurements are: {dateList}</div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
