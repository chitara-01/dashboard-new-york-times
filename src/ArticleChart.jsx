import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { scalePoint } from 'd3-scale';
import { withStyles } from '@material-ui/core/styles';

const data = [
  { year: '2011', artcless: 50 },
  { year: '2012', artcles: 50 },
  { year: '2013', artcles: 110 },
  { year: '2014', artcles: 100 },
  { year: '2015', artcles: 150 },
  { year: '2016', artcles: 140 },
  { year: '2017', artcles: 200 },
  { year: '2018', artcles: 250 },
  { year: '2019', artcles: 255 },
  { year: '2020', artcles: 300 },
];

const chartRootStyles = {
  chart: {
    paddingRight: '20px',
  },
};

const ChartRootBase = ({ classes, ...restProps }) => (
  <Chart.Root {...restProps} className={classes.chart} />
);
const ChartRoot = withStyles(chartRootStyles, { name: 'ChartRoot' })(ChartRootBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    return (
      <Paper>
        <Chart
          data={chartData}
          rootComponent={ChartRoot}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <AreaSeries
            name=""
            valueField="artcles"
            argumentField="year"
          />
          <Animation />
          <Title
            text="NUMBER OF artclesS PUBLISHED FOR “Elections”"/>
        </Chart>
      </Paper>
    );
  }
}
