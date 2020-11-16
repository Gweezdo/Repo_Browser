
// Function to return window to pos 0, 0 after reloading page
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Delete this
document.getElementById("div-results").onload = getRepos();


// Function for obtaining Catalyst organisation data from github API
async function getOrgData(){
  const org_url = "https://api.github.com/orgs/catalyst";
  
  const org_responce = await fetch(org_url);
  const org_result = await org_responce.json();
  
  document.getElementById("org-description").innerHTML = org_result.description;
  document.getElementById("org-location").innerHTML = org_result.location;
  document.getElementById("org-repo-no").innerHTML = org_result.public_repos + " Repositories";
  document.getElementById("view-blog-btn").href = org_result.blog;
  document.getElementById("view-git-btn").href = org_result.html_url;

  console.log("Repo Name = " + org_result.name);
    
}
//Uncomment
document.getElementById("org-info").onload = getOrgData();

// Function for obtaining Catalyst repository data from github API
async function getRepos(){

    // All information necessary to populate catalyst repo list
    const repo_url =
    "https://api.github.com/orgs/catalyst/repos?per_page=30&type=owner";
      // "https://api.github.com/search/repositories?q=author:catalyst repo:catalyst";
    // "https://api.github.com/orgs/catalyst/repos?per_page=100&type=owner"; //-> change number to display less pages, 100 limit
   
    const repo_responce = await fetch(repo_url);
    const repo_result = await repo_responce.json();
    const div_results = document.getElementById("div-results");


    
    // iterate over each repo element, create html elements, assign css classnames to html elements 
    repo_result.forEach(function(i) {

  
      function date_created(){
        //tbc
      }



      var repo_card = document.createElement("div");
      repo_card.className += "repo-card";
      div_results.appendChild(repo_card);

      var top_section = document.createElement("div");
      top_section.className += "top-section";
      repo_card.appendChild(top_section);
      
      var repo_title = document.createElement("h4");
      repo_title.className += "repo-title";
      repo_title.innerHTML = i.name;
      top_section.appendChild(repo_title);

      var repo_description = document.createElement("h5");
      repo_description.className += "repo-description";
      repo_description.innerHTML = i.description;
      top_section.appendChild(repo_description);

      var btm_container = document.createElement("div");
      btm_container.className += "btm-container";
      top_section.appendChild(btm_container);

      var btm_left_container = document.createElement("div");
      btm_left_container.className += "btm-left-container";
      btm_container.appendChild(btm_left_container);

      var update_text = document.createElement("p");
      update_text.className += "update-text";
      var date = new Date(Date.parse(i.updated_at));
      var day_updt = date.getDate();
      var month_updt = date.getMonth() + 1;
      var year_updt = date.getFullYear();
      var minutes = date.getMinutes();
      var hours = date.getHours();

      function minsOrHrs(){
        if(minutes < 10 && hours < 10){
        var mins_hrs = "0" + hours.toString() + ":" + "0" + minutes.toString();
          return mins_hrs;
        } 

        if(hours < 10){
          var mins_hrs = "0" + hours.toString() + ":" + minutes.toString();
          return mins_hrs;
        }

        if(minutes < 10){
          var mins_hrs = hours.toString() + ":" + "0" + minutes.toString();
          return mins_hrs;
        }

        var mins_hrs = hours.toString() + ":" + minutes.toString();
        return mins_hrs;
      }
      
      update_text.innerHTML = "Updated: " + day_updt.toString() + "/" + month_updt.toString() + "/" + year_updt.toString() + " " + minsOrHrs();
      btm_left_container.appendChild(update_text);

      var fork_container = document.createElement("div");
      fork_container.className += "fork-container";
      btm_left_container.appendChild(fork_container);

      var fork_separator = document.createElement("p");
      fork_separator.className += "fork-separator";
      fork_separator.innerHTML = "|";
      fork_container.appendChild(fork_separator);

      var forked_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var forked_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      forked_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/fork-icon_20px.svg#fork-icon" )
      
      forked_icon.setAttribute("class", "forked-icon");
      forked_icon.appendChild(forked_icon_use);
      fork_container.appendChild(forked_icon);

      //Need to obtain name of forked repo and add it here
      var fork_info = document.createElement("p");
      fork_info.className += "fork-info";
      fork_info.innerHTML = "Forked? " + i.fork;
      fork_container.appendChild(fork_info);

      var btm_right_container = document.createElement("div");
      btm_right_container.className += "btm-right-container";
      btm_container.appendChild(btm_right_container);  

      var show_info = document.createElement("div");
      show_info.className += "show-info";
      btm_right_container.appendChild(show_info); 

      var show_more_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var show_more_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      show_more_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/show-more-icon.svg#show-more" )
      
      show_more_icon.setAttribute("class", "show-more-icon");
      show_more_icon.appendChild(show_more_icon_use);
      show_info.appendChild(show_more_icon);

      // show more or less function to be updated
      var show_text = document.createElement("p");
      show_text.className += "show-text";
      show_text.innerHTML = "Show more";
      show_info.appendChild(show_text);

      var repo_git_btn = document.createElement("a");
      repo_git_btn.className += "repo-git-btn";
      repo_git_btn.href = i.html_url
      repo_git_btn.target = "_blank"
      btm_right_container.appendChild(repo_git_btn);

      var repo_git_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var repo_git_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      repo_git_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/github-icon_24px.svg#git-icon")
      
      repo_git_icon.setAttribute("class", "repo-git-icon" + " git-icon");
      repo_git_icon.appendChild(repo_git_icon_use);
      repo_git_btn.appendChild(repo_git_icon);

      var view_text = document.createElement("p");
      view_text.className += "view-text";
      view_text.innerHTML = "VIEW"
      repo_git_btn.appendChild(view_text);

      var btm_section = document.createElement("div");
      btm_section.className += "btm-section";
      repo_card.appendChild(btm_section);

      var line = document.createElement("div");
      line.className += "line";
      btm_section.appendChild(line);

      var line = document.createElement("hr");
      line.className += "line";
      btm_section.appendChild(line);

      var repo_info_container = document.createElement("div");
      repo_info_container.className += "repo-info-container";
      btm_section.appendChild(repo_info_container);

      var repo_stats = document.createElement("div");
      repo_stats.className += "repo-stats";
      repo_info_container.appendChild(repo_stats);

      var repo_stats_title = document.createElement("h6");
      repo_stats_title.className += "repo-stats-title";
      repo_stats_title.innerHTML = "Repo Stats:";
      repo_stats.appendChild(repo_stats_title);

      var stats_container = document.createElement("div");
      stats_container.className += "stats-container";
      repo_stats.appendChild(stats_container);

      var stats_left = document.createElement("div");
      stats_left.className += "stats-left";
      stats_container.appendChild(stats_left);

      var star_stat = document.createElement("div");
      star_stat.className += "star-stat";
      star_stat.className += " stat-flex";
      stats_left.appendChild(star_stat);

      var star_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var star_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      star_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/star-icon_20px.svg#star-icon")
      
      star_icon.setAttribute("class", "star-icon" + " stat-icon");
      star_icon.appendChild(star_icon_use);
      star_stat.appendChild(star_icon);

      var star_text = document.createElement("p");
      star_text.className += "star-text";
      star_text.className += " stat-text";
      star_text.innerHTML = "Stargazers: " + i.stargazers_count;
      star_stat.appendChild(star_text);

      var watch_stat = document.createElement("div");
      watch_stat.className += "watch-stat";
      watch_stat.className += " stat-flex";
      stats_left.appendChild(watch_stat);

      var watch_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var watch_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      watch_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/watchers-icon_20px.svg#watch-icon")
      
      watch_icon.setAttribute("class", "watch-icon" + " stat-icon");
      watch_icon.appendChild(watch_icon_use);
      watch_stat.appendChild(watch_icon);

      var watch_text = document.createElement("p");
      watch_text.className += "watch-text";
      watch_text.className += " stat-text";
      watch_text.innerHTML = "Watchers: " + i.watchers_count;
      watch_stat.appendChild(watch_text);

      var language_stat = document.createElement("div");
      language_stat.className += "language-stat";
      language_stat.className += " stat-flex";
      stats_left.appendChild(language_stat);

      var language_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var language_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      language_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/language-icon_20px.svg#language-icon")
      
      language_icon.setAttribute("class", "language-icon" + " stat-icon");
      language_icon.appendChild(language_icon_use);
      language_stat.appendChild(language_icon);

      var language_text = document.createElement("p");
      language_text.className += "language-text";
      language_text.className += " stat-text";
      language_text.innerHTML = i.language;
      language_stat.appendChild(language_text);

      var license_stat = document.createElement("div");
      license_stat.className += "license-stat";
      license_stat.className += " stat-flex";
      stats_left.appendChild(license_stat);

      var license_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var license_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      license_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/license-icon_20px.svg#license-icon")
      
      license_icon.setAttribute("class", "license-icon" + " stat-icon");
      license_icon.appendChild(license_icon_use);
      license_stat.appendChild(license_icon);

      var license_text = document.createElement("p");
      license_text.className += "license-text";
      license_text.className += " stat-text";
      if (i.license === null) {
        license_text.innerHTML = "None";
      } else {
        license_text.innerHTML = i.license.name;
      }
      license_stat.appendChild(license_text);

      var stats_right = document.createElement("div");
      stats_right.className += "stats-right";
      stats_container.appendChild(stats_right);

      var fork_stat = document.createElement("div");
      fork_stat.className += "forks-stat";
      fork_stat.className += " stat-flex";
      stats_right.appendChild(fork_stat);

      var fork_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var fork_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      fork_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/fork-icon_20px.svg#fork-icon")
      
      fork_icon.setAttribute("class", "fork-icon" + " stat-icon");
      fork_icon.appendChild(fork_icon_use);
      fork_stat.appendChild(fork_icon);

      var fork_text = document.createElement("p");
      fork_text.className += "fork-text";
      fork_text.className += " stat-text";
      fork_text.innerHTML = i.forks_count;
      fork_stat.appendChild(fork_text);

      var issue_stat = document.createElement("div");
      issue_stat.className += "issue-stat";
      issue_stat.className += " stat-flex";
      stats_right.appendChild(issue_stat);

      var issue_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var issue_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      issue_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/issues-icon_20px.svg#issue-icon")
      
      issue_icon.setAttribute("class", "issue-icon" + " stat-icon");
      issue_icon.appendChild(issue_icon_use);
      issue_stat.appendChild(issue_icon);

      var issue_text = document.createElement("p");
      issue_text.className += "issue-text";
      issue_text.className += " stat-text";
      issue_text.innerHTML = i.open_issues_count;
      issue_stat.appendChild(issue_text);

      var date_stat = document.createElement("div");
      date_stat.className += "date-stat";
      date_stat.className += " stat-flex";
      stats_right.appendChild(date_stat);

      var calendar_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var calendar_icon_use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      calendar_icon_use.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", "/icons/calendar-icon_20px.svg#calendar-icon")
      
      calendar_icon.setAttribute("class", "calendar-icon" + " stat-icon");
      calendar_icon.appendChild(calendar_icon_use);
      date_stat.appendChild(calendar_icon);

      //Add date created function
      var date_text = document.createElement("p");
      date_text.className += "date-text";
      date_text.className += " stat-text";

      var date1 = new Date(Date.parse(i.updated_at));
      var day_created = date.getDate();
      var month_created = date.getMonth() + 1;
      var year_created = date.getFullYear();

      date_text.innerHTML = "Created: " + day_created.toString() + "/" + month_created.toString() + "/" + year_created.toString();
      // date_text.innerHTML = i.created_at;
      date_stat.appendChild(date_text);

      var contributor_stats = document.createElement("div");
      contributor_stats.className += "contributor-stats";
      repo_info_container.appendChild(contributor_stats);

      var contributor_title = document.createElement("h6");
      contributor_title.className += "contributor-title";
      contributor_title.innerHTML = "Top Contributors:"
      contributor_stats.appendChild(contributor_title);

      var contributor_list = document.createElement("ul");
      contributor_list.className += "contributor-list";
      contributor_stats.appendChild(contributor_list);

      // var contributors_url = i.contributors_url;
      // async function get_contributors(contributors_url) {
      //   // var contributors_url = i.contributors_url;
      //   var cont_list = [];
      //   const contributors_responce = await fetch(contributors_url);
      //   const contributors_result = await contributors_responce.json();
      //   for (var i = 0; i < contributors_result.length; i++) {
      //     cont_list.push(contributors_result[i].login);
      //     if (i == 4) {
      //       break;
      //     }
      //   }
      //   return cont_list;
      // }  
      // var contr = document.createElement("li");
      // contr.className += "contr" + toString(i + 1);
      // contr.innerHTML = contributors_result[i].login;
      // var cont_list = get_contributors(contributors_url);
      // console.log(cont_list)
    });

    
    var showBtn = document.querySelectorAll(".show-info");
    var downArrow = document.querySelectorAll(".show-more-icon");
    var showText = document.querySelectorAll(".show-text");
    var btmSection = document.querySelectorAll(".btm-section");


    showBtn.forEach(function (element, index) {
      element.addEventListener("click", function () {
        
        if(showText[index].innerHTML == "Show more"){
          rotateArrowUp(index);
          showLess(index);
          openStats(index);
        }else{
          rotateArrowDown(index);
          showMore(index);
          closeStats(index);
        }
      });
    });

    function rotateArrowDown(index){
      downArrow[index].style.transform = "rotate(" + 0 + "deg)";
    }

    function rotateArrowUp(index) {
      downArrow[index].style.transform = "rotate(" + 180 + "deg)";
    }

    function showLess(index){
      showText[index].innerHTML = "Show less";
    }

    function showMore(index) {
      showText[index].innerHTML = "Show more";
    }

    function closeStats(index){
        btmSection[index].style.display = 'none';
    }

    function openStats(index) {
      btmSection[index].style.display = "block";
    }
    

    //Testing data below
    // var index = 12;
    // console.log("Repo Name = " + repo_result[index].name);
    // console.log("Description = " + repo_result[index].description);
    // console.log("Github url = " + repo_result[index].html_url);
    // console.log("Progamming language = " + repo_result[index].language);
    // console.log("Stars count = " + repo_result[index].stargazers_count);
    // console.log("Watchers count = " + repo_result[index].watchers_count);
    // console.log("Fork = " + repo_result[index].fork);
    
    // if (repo_result[index].license === null){
    //     console.log("License = none");
    // }else{
    //     console.log("License = " + repo_result[index].license.name);
    // }
    
    // console.log("Date Created = " + repo_result[index].created_at);
    // console.log("Date Updated = " + repo_result[index].updated_at);
    // console.log("Full name = " + repo_result[index].full_name);

    // test on formatting date
  //   let date = new Date(Date.parse(repo_result[index].created_at));
  //   console.log("date = " + date)
  //   console.log("getDate = " + date.getDate());
  //   console.log("getDay = " + date.getDay())
  //   console.log("getMonth = " + date.getMonth());
  //   console.log("getTime = " + date.getTime());
    
  // var contributors_url = repo_result[index].contributors_url;
  // console.log(contributors_url);
  // const contributors_responce = await fetch(contributors_url);
  // const contributors_result = await contributors_responce.json();
  // for (var i = 0; i < contributors_result.length; i++) {
  //   console.log("Name " + i.toString() + " = " + contributors_result[i].login);
  //   console.log("Total contributions = " + contributors_result[i].contributions);
  //   if (i == 4) {
  //     break;
  //   }
  // }


  // for loop to extract repos that is a fork
  //   for (var i = 0; i < result.length; i++) {
  //     if (result[i].fork != false) {
  //       console.log(i);
  //       // 9, 12, 15, 16, 23
  //     }
  //   }
}

var filterDropdownBtn = document.getElementById("filter-dropdown-btn");
var filterDropdownContent = document.getElementById("filter-dropdown-content");

filterDropdownBtn.addEventListener("click", function(){
  console.log(filterDropdownContent.style.display);
  if(filterDropdownContent.style.display == "none"){
    openFilterDropdown();
    console.log("OPEN!!")
  }else{
    closeFilterDropdown();
    console.log("close!!")

  }
});



function openFilterDropdown(){
  filterDropdownContent.style.display = "block";
  filterDropdownBtn.style["border-bottom"] = "none";
  filterDropdownBtn.style["border-bottom-left-radius"] = 0 + "rem";
  filterDropdownBtn.style["border-bottom-right-radius"] = 0 + "rem";
}

function closeFilterDropdown() {
  filterDropdownContent.style.display = "none";
  filterDropdownBtn.style["border-bottom"] = "block";
  filterDropdownBtn.style["border-bottom-left-radius"] = 0.8 + "rem";
  filterDropdownBtn.style["border-bottom-right-radius"] = 0.8 + "rem";
}



