const pdfSubmit = document.getElementById('pdf-submit');
const namesNumber = document.getElementById('names');
const fileName = document.getElementById('filename');
const generatePDF = (e) => {
  e.preventDefault();
  const doc = new jsPDF();
  fetch(`/pdf?names=${namesNumber.value}`)
  .then(res => res.json())
  .then(resJson => {
    const table = {
      head: [['First Name', 'Last Name', 'Email', 'Phone Number']],
      body: []
    }
    resJson.forEach(person => {
      const { firstName, lastName, email, phoneNumber } = person;
      table.body.push([firstName, lastName, email, phoneNumber]);
    });
    doc.autoTable(table);
    doc.save(fileName.value ? `${fileName.value}.pdf` : 'employees.pdf');
  })
  .catch(err => console.error(err));
  
}

pdfSubmit.addEventListener('click', generatePDF);