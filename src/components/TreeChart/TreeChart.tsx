import { useEffect, useState } from 'react';
import { getTrees } from '../../api/trees';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { parseTreesResults } from '../../helpers/parseTreesResults';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import './TreeChart.scss';
import DateSelector from '../DateSelector/DateSelector';

const TreeChart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<{x: Date, y: Number}[] | null>(null);
  const [data, setData] = useState<any>(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      },
    },
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const trees = await getTrees();

        if (trees?.data?.length > 0) {
          const parsedResults = parseTreesResults(trees.data.slice(0, 500));
          const labels = parsedResults.map(result => result.x.toLocaleDateString());

          setData({
            labels,
            datasets: [
              {
                label: 'Trees planted per day',
                data: parsedResults,
                backgroundColor: 'rgb(40, 195, 130)',
              }
            ],
          });

          setResults(parsedResults);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="treechart">
      {loading && <LoadingSpinner/>}
      {results && data && <DateSelector results={results} setData={setData}/>}
      {results && data && <Bar options={options} data={data}/>}
    </div>
  );
};

export default TreeChart;
