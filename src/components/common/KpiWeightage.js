import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PieChart from "../PieChart";

const KpiWeightage = ({ data }) => {
  const [quarter, setQuarter] = React.useState("Q1");

  const [weightageData, setWeightageData] = React.useState([]);

  React.useEffect(() => {
    setWeightageData([]);
    const newData = data
      .map((d) => {
        console.log(d);
        const matchedQuarters = d.kpis.filter((k) => k.quarter == quarter);
        return matchedQuarters.map((m) => ({
          legendLabel: d.kpiName,
          text: m.weightage + "%",
          value: Number(m.weightage),
        }));
      })
      .flat();
    console.log(newData);
    setWeightageData(newData);
  }, [quarter]);

  const handleChange = (e) => setQuarter(e.target.value);

  return (
    <>
      <FormControl>
        {/* <InputLabel id="demo-simple-select-label">Quarter</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quarter}
          label="Quarter"
          onChange={handleChange}
        >
          <MenuItem value="Q1">Q1</MenuItem>
          <MenuItem value="Q2">Q2</MenuItem>
          <MenuItem value="Q3">Q3</MenuItem>
          <MenuItem value="Q4">Q4</MenuItem>
        </Select>
      </FormControl>
      {console.log("weigh", weightageData)}
      <PieChart data={weightageData} />
    </>
  );
};

export default KpiWeightage;
