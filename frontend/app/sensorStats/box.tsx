import { ResponsiveBoxPlot } from '@nivo/boxplot';
export const data =
[
    {
      "group": "Summer",
      "mu": 0,
      "sd": 0,
      "n": 1,
      "value": 22
    },
    {
      "group": "Summer",
      "mu": 0,
      "sd": 0,
      "n": 1,
      "value": 29
    },
    {
      "group": "Summer",
      "mu": 0,
      "sd": 0,
      "n": 1,
      "value": 29
    },
    {
        "group": "Summer",
        "mu": 0,
        "sd": 0,
        "n": 1,
        "value": 30.7
      },
      {
        "group": "Summer",
        "mu": 0,
        "sd": 0,
        "n": 1,
        "value": 32
      },
      {
        "group": "Summer",
        "mu": 0,
        "sd": 0,
        "n": 1,
        "value": 32
      },
      {
        "group": "Summer",
        "mu": 0,
        "sd": 0,
        "n": 1,
        "value": 41
      }
]


function BoxPlot({ data, xLabel}) {
  return (
    <div style={{ height: '300px', width: '600px' }}>
      <ResponsiveBoxPlot
        data={data}
        margin={{ top: 10, right: 50, bottom: 50, left: 50 }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: xLabel,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Values',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        width={1800} 
        height={400}
      />
    </div>
  );
}
export default BoxPlot;
