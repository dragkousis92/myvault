import { TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import slugify from 'slugify'

export interface IReminderAdd {
    name: string
    description: string
    date: Date
    repeatDays?: string
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}

const App = () => {
    const { control, handleSubmit, register } = useForm<IReminderAdd>({})

    const onSubmit = async (data: IReminderAdd) => {
        console.log(data)
        const res = await postData('/api/create', data)
        console.log(res)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                label="Standard"
                variant="standard"
                {...register('name')}
            />
            <TextField
                label="Standard"
                variant="standard"
                {...register('description')}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            onChange={onChange} // send value to hook form
                            value={value}
                        />
                    )}
                />
            </LocalizationProvider>

            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                {...register('repeatDays')}
            />

            <input type="submit" />
        </form>
    )
}

export default App
