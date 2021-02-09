import React from 'react';
import {Bar} from 'react-chartjs-2';


export default function ApexChart(props) {
 
  const state = {
      labels: props.title === "Etkinliklere başvuran sayısına göre bar-chart" ? props.events : ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"],
  datasets: [
    {
      label: 'Katılımcı sayısı',
      backgroundColor:  props.title === "Etkinliklere başvuran sayısına göre bar-chart" ?'rgba(75,192,192,1)' : "orange",
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
      data: props.people
    }
  ] 
}

    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text: props.title,
              fontSize:40
            },
            legend:{
              display:true,
              position:'right',

            }
          }}
        width="500px" height="500px"/>
      </div>
    );
  
        }