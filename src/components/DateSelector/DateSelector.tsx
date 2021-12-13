import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import './DateSelector.scss';

interface Props {
  results: { x: Date, y: Number }[],
  setData: any
}

const DateSelector = ({results, setData}: Props) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(results[0].x);
  const [dateTo, setDateTo] = useState<Date | null>(results[results.length - 1].x);
  const [error, setError] = useState(false);

  const updateData = (newValue: Date | null, dateType: 'from' | 'to') => {

    // const dateTypeValid = dateType === 'from' ?
    //   new Date(newValue).getTime() < dateTo?.getTime() && dateTo  :
    //   dateType === 'to' ?
    //     new Date(newValue).getTime() > dateFrom?.getTime() : true;

    if (newValue !== null && dateFrom !== null && dateTo !== null) {
      const dateTypeValid = dateType === 'from' ?
        new Date(newValue).getTime() <= dateTo?.getTime() && dateTo :
        dateType === 'to' ?
          new Date(newValue).getTime() >= dateFrom?.getTime() : true;

      if (dateTypeValid) {
        const updatedResults = results.filter(result => dateType === 'to' ? new Date(newValue).getTime() >= new Date(result.x).getTime() : new Date(newValue).getTime() <= new Date(result.x).getTime());
        const labels = updatedResults.map(result => result.x.toLocaleDateString());

        setData({
          labels,
          datasets: [
            {
              label: 'Trees planted per day',
              data: updatedResults,
              backgroundColor: 'rgb(40, 195, 130)',
            }
          ],
        });

        setError(false);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className="dateselector">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="dateselector-wrapper">
          <div className="datepicker">
            <DatePicker
              label="Choose 'From Date'"
              value={dateFrom}
              onChange={(newValue) => {
                setDateFrom(newValue);
                updateData(newValue, 'from');
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div className="datepicker">
            <DatePicker
              label="Choose 'To Date'"
              value={dateTo}
              onChange={(newValue) => {
                setDateTo(newValue);
                updateData(newValue, 'to');
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </div>


        {
          error &&
          <Button variant="outlined" color="error">
            Invalid Date Range Selection
          </Button>
        }
      </LocalizationProvider>
    </div>
  );
};

export default DateSelector;
