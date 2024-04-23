import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';

const Chart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: 'my-chart', // Unique chart ID for media queries
      height: 450,
      width: '100%',
      type: 'bar',
      background: '#f4f4f4',
      foreColor: '#333',
    },
    plotOptions: {
      bar: {
        horizontal: false, // Initially set to vertical bars
      },
    },
    series: [
      {
        name: 'População em milhões',
        data: [
          11.45,
          6.21,
          2.81,
          2.42,
          2.41,
          2.31,
          2.05,
          1.87,
          1.38,
          1.37,
        ],
      },
    ],
    xaxis: {
      categories: [
        'São Paulo (SP)',
        'Rio de Janeiro (RJ)',
        'Brasília (DF)',
        'Fortaleza (CE)',
        'Salvador (BA)',
        'Belo Horizonte (MG)',
        'Manaus (AM)',
        'Curitiba (PR)',
        'Guarulhos (SP)',
        'Goiânia (GO)',
      ],
    },
    fill: {
      colors: ['#F44336'],
    },
    dataLabels: {
      enabled: true, // Habilitar labels
      formatter: (value) => value.toFixed(2), // Formatar com duas casas decimais
    },
    title: {
      text: 'Cidades mais populosas do Brasil (em milhões)',
      align: 'center',
      margin: 20,
      offsetY: 20,
      style: {
        fontSize: '25px',
      },
    },
  });

  // Update chart orientation and button text
  const handleOrientationChange = () => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      plotOptions: {
        bar: {
          horizontal: !prevOptions.plotOptions.bar.horizontal,
        },
      },
    }));
  };

  const getButtonText = () => {
    return options.plotOptions.bar.horizontal ? 'Vertical' : 'Horizontal';
  };

  useEffect(() => {
    const chartElement = document.querySelector('#chart');
    const chart = new ApexCharts(chartElement, options);
    chart.render();

    // Media query listener for responsive behavior
    const handleResize = () => {
      if (window.innerWidth < 768) { // Adjust breakpoint as needed
        setOptions((prevOptions) => ({
          ...prevOptions,
          plotOptions: {
            bar: {
              horizontal: true, // Switch to horizontal bars on small screens
            },
          },
        }));
      } else {
        setOptions((prevOptions) => ({
          ...prevOptions,
          plotOptions: {
            bar: {
              horizontal: prevOptions.plotOptions.bar.horizontal, // Maintain previous state on larger screens
            },
          },
        }));
      }
      chart.render(); // Re-render chart with updated options
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to avoid memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.destroy();
    };
  }, [options]); // Re-render chart when options change

  return (
    <div className="container">
      <div id="chart"></div>
      <button id="change" onClick={handleOrientationChange}>
        {getButtonText()}
      </button>
    </div>
  );
};

export default Chart;
