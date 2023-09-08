export default async function handler(req, res) {
  const { type, location, time } = req.body;
  try {
    const response = 
    await fetch('http://localhost:8000/sensorReadings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
    const result = await response.json();
    res.status(200).json(result)
    }catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
}