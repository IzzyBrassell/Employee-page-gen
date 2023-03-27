const generateTeam = team => {
    const html = [];
    
    team.forEach(employee => {
      let role = employee.getRole();
      let card = `
        <div class="card employee-card">
            <div class="card-header bg-secondary text-white">
                <h2 class="card-title">${employee.getName()}</h2>
                <h3 class="card-title"><i class="fas ${getIcon(role)} mr-2"></i>${role}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${employee.getId()}</li>
                    <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                    ${getAdditionalInfo(employee)}
                </ul>
            </div>
        </div>`;
      
      html.push(card);
    });
    
    return html.join("");
  }
  
  const getIcon = role => {
    switch (role) {
      case 'Manager':
        return 'fa-mug-hot';
      case 'Engineer':
        return 'fa-glasses';
      case 'Intern':
        return 'fa-user-graduate';
      default:
        return '';
    }
  }
  
  const getAdditionalInfo = employee => {
    let role = employee.getRole();
    switch (role) {
      case 'Manager':
        return `<li class="list-group-item">Office number: ${employee.getOfficeNumber()}</li>`;
      case 'Engineer':
        return `<li class="list-group-item">GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank" rel="noopener noreferrer">${employee.getGithub()}</a></li>`;
      case 'Intern':
        return `<li class="list-group-item">School: ${employee.getSchool()}</li>`;
      default:
        return '';
    }
  }


module.exports = team => {

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>
<body class= "bg-info">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading bg-secondary">
                <h1 class="text-center text-white">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="row team-area col-12 d-flex justify-content-center">
                ${generateTeam(team)}
            </div>
        </div>
    </div>
</body>
</html>
    `;
};