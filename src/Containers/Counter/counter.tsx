import { useState } from 'react';
import { Button } from 'reactstrap'

function Counter() {
    const initialCounter = 0
    const [counterValue, setCounterValue] = useState(initialCounter)
    const style = {
        width: 'fit-content'
    }
    return (
        <div className='mt-5 mx-auto' style={style}>
            <p className='d-flex justify-content-center'>Current Value : {counterValue}</p>
            <Button color='primary' className='m-2' onClick={() => setCounterValue(prevState => prevState + 1)}>Increment counter</Button>
            <Button color='warning' className='m-2' onClick={() => setCounterValue(initialCounter)}>Reset counter</Button>
        </div>
    )
}

export default Counter
