export default async function handler(req, res) {
    const { message } = req.body;
  try {
    const response = 
    await fetch('http://djangoapi:8000/sensorReadings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
    const count = await response.json();
    res.status(200).json(count)
    }catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
}