import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot for React 18
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    
    const [message, setMessage] = useState('');

    useEffect(() => {
        const url = '/api/goals/hello';   
        console.log('Fetching:', url);
    
        fetch(url)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setMessage(data.message);
            })
            .catch(err => {
                console.error('Fetch error:', err.message); // Log the specific error
                console.error(err); // Log the full error object for debugging
            });
    }, []);

    return (
        <div className="container">
            <h1>{message}</h1> {/* Display the message */}
        </div>
    );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Use createRoot
root.render(<App />);

// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom'; // Correct import for ReactDOM

// const App = () => {

//     useEffect(
//         ()=>{
//             fetch('/goals/hello')
//             .then(response=>response.json())
//             .then(data=>{console.log(data)
//                 .setMessage(data.message)
//             })
//             .catch(err=>console.log(err))
//         },[]
//     )

//     const [message, setMessage] = useState('');
//     return (
//         <div className="container">
//             <h1>{message}</h1>
//         </div>
//     )
// }

// ReactDOM.render(<App />, document.getElementById('root'));