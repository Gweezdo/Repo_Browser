const btnRepos = document.getElementById("btnRepos")
btnRepos.addEventListener("click", getRepos)

async function getRepos(){
    // All information necessary to populate catalyst organisation header
    const org_url = "https://api.github.com/orgs/catalyst";

    const org_responce = await fetch(org_url);
    const org_result = await org_responce.json();
    
    console.log("Repo Name = " + org_result.name);
    console.log("Description = " + org_result.description);
    console.log("Location = " + org_result.location);
    console.log("No. of Repos = " + org_result.public_repos);
    console.log("Blog url = " + org_result.blog);
    console.log("Github url = " + org_result.html_url);
    
    
    // All information necessary to populate catalyst repo list
    const repo_url =
    //   "https://api.github.com/orgs/catalyst/repos";
    "https://api.github.com/orgs/catalyst/repos?per_page=100&type=owner"; //-> change number to display less pages, 100 limit
    const repo_responce = await fetch(repo_url);
    const repo_result = await repo_responce.json();
    
    var index = 12;
    console.log("Repo Name = " + repo_result[index].name);
    console.log("Description = " + repo_result[index].description);
    console.log("Github url = " + repo_result[index].html_url);
    console.log("Progamming language = " + repo_result[index].language);
    console.log("Stars count = " + repo_result[index].stargazers_count);
    console.log("Watchers count = " + repo_result[index].watchers_count);
    console.log("Fork = " + repo_result[index].fork);
    
    if (repo_result[index].license === null){
        console.log("License = none");
    }else{
        console.log("License = " + repo_result[index].license.name);
    }
    
    console.log("Date Created = " + repo_result[index].created_at);
    console.log("Date Updated = " + repo_result[index].updated_at);
    console.log("Full name = " + repo_result[index].full_name);

    // test on formatting date
    let date = new Date(Date.parse(repo_result[index].created_at));
    console.log("date = " + date)
    console.log("getDate = " + date.getDate());
    console.log("getDay = " + date.getDay())
    console.log("getMonth = " + date.getMonth());
    console.log("getTime = " + date.getTime());
    
  var contributors_url = repo_result[index].contributors_url;
  console.log(contributors_url);
  const contributors_responce = await fetch(contributors_url);
  const contributors_result = await contributors_responce.json();
  for (var i = 0; i < contributors_result.length; i++) {
    console.log("Name " + i.toString() + " = " + contributors_result[i].login);
    console.log("Total contributions = " + contributors_result[i].contributions);
    if (i == 4) {
      break;
    }
  }

  // iterate over each repo element, create html elements, assign css classnames to html elements 
  repo_result.forEach((el) => {
    if (el.fork != false) {
      console.log(el);
    }
  });

  // for loop to extract repos that is a fork
  //   for (var i = 0; i < result.length; i++) {
  //     if (result[i].fork != false) {
  //       console.log(i);
  //       // 9, 12, 15, 16, 23
  //     }
  //   }
}