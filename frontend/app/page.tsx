'use client'
import { useState, useEffect} from 'react';

function App() {
	const [counter, setCounter] = useState(5);
	const handleIncrease = () => {
		setCounter((prev) => prev + 1);
	};

	const handleDecrease = () => {
		setCounter((prev) => prev - 1);
	};

	console.log('Rendering!!!');

	return (
		<div>
			<button onClick={handleDecrease}>
				decrease
			</button>
			<span> {counter} </span>
			<button onClick={handleIncrease}>
				increase
			</button>
		</div>
	);
}

export default App;