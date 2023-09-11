export default async function handler(req, res) {
  try {
    const response = 
    await fetch('http://djangoapi:8000/sensorMetrics/', {
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