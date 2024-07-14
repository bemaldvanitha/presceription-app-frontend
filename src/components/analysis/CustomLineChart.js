import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CustomLineChart = ({ data }) => {
    const chartData = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Prescription Analysis'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Count'
            }
        },
        series: [
            {
                name: 'Count',
                data: data
            }
        ]
    };

    return(
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartData}/>
        </div>
    )
}

export default CustomLineChart;