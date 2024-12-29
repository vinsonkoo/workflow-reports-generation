import Chartjs from './Chartjs'
import ChartjsReactWrapper from './ChartjsReactWrapper'
import CustomVictoryChart from './CustomVictoryChart'
import MUILineChart from './MUILineChart'
import Recharts from './Recharts'
import VisXChart from './VisXChart'

const CustomCharts = () => {
  return (
    <div>
      <Recharts />
      <MUILineChart />
      <CustomVictoryChart />
      <VisXChart />
      <Chartjs />
      <ChartjsReactWrapper />
    </div>
  )
}

export default CustomCharts