export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      console.log(req);
    default: return res;
  }
}
