export default function intakeFormHandler(req, res) {
  const {query} = req
  switch (req.method) {

  }
  console.log(query.fieldset);
  return res.status(200).json({hello: 'hello'});
}
