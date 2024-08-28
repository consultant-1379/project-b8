import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts"
import styled from 'styled-components'
import { styles } from '../../styleVariables/colorFontVariables'
import  api from '../../Api'


const ChartWrapper = styled.div`
    position: relative;
    
    width: inherit;
    max-width: inherit;
    border-radius: ${styles.borderRadius};
    background-color: ${styles.mainBoxColor};
    color: ${styles.textColor};
    font-family: ${styles.mainFont};
    margin-top: 7px;
    margin-left: 7px;
    overflow-x: auto;
    overflow-y: hidden;

    h4{
        margin: ${styles.boxPadding};
    }
`


export const MajorAndMinorContributors = (props) => {

  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({})
  const [size, setSize] = useState(0)

  
    const retrieve_files_data_from_backend = async () => {
      let total = { name: 'Total', data: [] }
      let major = { name: 'Major', data: [] }
      let minor = { name: 'Minor', data: [] }
      let categories = []
      await api.get("fileHistory/"+props.id).then(res => {
        for(let i=0;i<res.data.length; i++){
          if(res.data[i]['filename'] != null){
            let index = res.data[i]['filename'].lastIndexOf('\\');
            categories.push(res.data[i]['filename'].slice(index+1))
            total.data.push(res.data[i]['majorContributors'] + res.data[i]['minorContributors'])
            major.data.push(res.data[i]['majorContributors'])
            minor.data.push(res.data[i]['minorContributors'])
          }
        }
        setSize(total.data.length * 130)
        setOptions({
          chart: {
            type: 'bar',
            height: 350,
            toolbar:{
              display: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '100%',
              endingShape: 'rounded'
            },
            
          },
          dataLabels: {
            enabled: false,
            
          },
          stroke: {
            show: true,
            width: 30,
            colors: ['transparent']
          },
          xaxis: {
            categories: categories,
            labels: {
                  style: {
                      colors: 'white'                    
                  },
              },
          },
          yaxis: {
              labels: {
                  style: {
                      colors: 'white'                    
                  },
              },
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            theme: 'dark',
            y: {
              formatter: function (val) {
                return + val + " Contributors"
              }
            }
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'left', 
              labels: {
                  colors: 'white',
              },
          },
          zoom: {
            enabled: true,
            type: 'x',
            resetIcon: {
                offsetX: -10,
                offsetY: 0,
                fillColor: '#fff',
                strokeColor: '#37474F'
            },
            selection: {
                background: '#90CAF9',
                border: '#0D47A1'
            }    
        }
      })

      setSeries([total, major, minor])

      })
    }

    useEffect(() => {
        retrieve_files_data_from_backend()
    }, [props])



    return (
        <ChartWrapper>
            <h4>Number of Major & Minor contributors per file</h4>
            {
              size > 0 ? 
              <Chart options={options} series={series} type="bar" height={350} width={size}/>
              :
              <h1>Hlllo</h1>
            }
        </ChartWrapper>

    )
}
