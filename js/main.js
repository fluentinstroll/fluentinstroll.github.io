/*
*   Configuration
*/
document.title = 'Raymond Rambo'

//devto
let devtoUsername = 'fluentinstroll';
let state = 'all'; //only usable
let perPage = 6; //total items to show
let page = 1; //returns the first page results
let articles = [];

// Github
let gitUsername = 'fluentinstroll';
let githubCardLimit = 6;
let githubSort = 'updated'; //Can be one of created, updated, pushed, full_name.
let githubDirection = 'desc'; //Can be asc desc

let otherGitUsernames = [
    'PhilipMroczkowski', 
    'AardWolf',
    'Seneca-CDOT',
];
let otherGitRepos = [
    'Social-Interactions',
    'MHTimerBot',
    'telescope'
];

//Urls for header links
let githubUrl = 'http://bit.ly/3s3YuyW';
let twitterUrl = 'https://bit.ly/2JQuuFE';
let linkedInUrl = '';
let devtoUrl = 'http://bit.ly/3nkrJtV';
let emailAddress = 'fluentinstroll@protonmail.com';

//Default email message
let defaultEmailSubject = ''
let defaultEmailMessage = `Hey! 👋`

/* 
* Document Ready
*/
document.addEventListener('DOMContentLoaded', (event) => {
    loadDevToArticles();
    loadGitRepos();
    loadOtherGitRepos();
})

/* 
* Helper functions 
*/
function populateBlogDOM(response, ele) {
    ele.innerHTML = ele.innerHTML +
        `<div class="col-lg-4 pb-4 ">
        <div class="card card-clickable h-100" onclick="window.open('${response.url.toString()}')">
                ${response.cover_image != null ? `<img class="card-img-top img-fluid" src="${response.cover_image}" alt="Card image cap">` : ''}
                <div class="card-body">
                    <h3 class="card-title">${response.title}</h3>
                    <p class="card-text pb-5">${response.description}</p>
                    <p class="card-text bottom-right capitalise"><small class="text-muted">${new Date(response.published_at).toLocaleDateString('en-Gb')}</small></p>
                </div>
        </div>
        </div>`;
}

function populateGitDom(response, ele) {
    ele.innerHTML = ele.innerHTML +
        `<div class="col-lg-4 pb-4">
        <div class="card card-clickable h-100" onclick="window.open('${response.html_url.toString()}')">
                ${response.cover_image != null ? `<img class="card-img-top img-fluid" src="${response.cover_image}" alt="Card image cap">` : ''}
                <div class="card-body">
                    <h3 class="card-title">${response.full_name.split('/')[1]}</h3>
                    <p class="card-text pb-5">${response.description}</p>
                    ${response.githubSort != undefined ? `<p class="card-text bottom-right capitalise"><small class="text-muted">${githubSort} ${new Date(response.updated_at).toLocaleDateString('en-Gb')}</small></p>` : ''}
                </div>
        </div>
        </div>`;
}

/* 
* Http calls
*/

//TODO: this function needs to get only repos for which I am the actual author, not sure how to do this if they are forked, check github api docs
function loadGitRepos() {
    let ele = document.getElementById('personal github');
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.github.com/users/${gitUsername}/repos?sort=${githubSort}&direction=${githubDirection}`, true)
    request.onload = function () {
        response = JSON.parse(request.response);
        const r = response.filter(res => res.fork == false);
        r.forEach((response, index) => {
            if (index < githubCardLimit) {
                populateGitDom(response, ele);
            }
        });
    }
    request.send();
}

function loadOtherGitRepos() {
    let ele = document.getElementById('other github');
    for(let i = 0; i < otherGitRepos.length; i++){
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.github.com/repos/${otherGitUsernames[i]}/${otherGitRepos[i]}`, true)
    request.onload = function () {
        response = JSON.parse(request.response);
        populateGitDom(response, ele);    
    }
    request.send();
}
    
}

function loadDevToArticles() {
    let ele = document.getElementById('blog');
    let request = new XMLHttpRequest()
    request.open('GET', `https://dev.to/api/articles?username=${devtoUsername}&per_page=${perPage}&page=${page}`)
    request.onload = function () {
        response = JSON.parse(request.response);
        response.forEach(response => populateBlogDOM(response, ele));
    }
    request.send();
}

/* 
*  Link click events
*/
function twitter() {
    window.open(twitterUrl);
}

function linkedIn() {
    window.open(linkedInUrl);
}

function github() {
    window.open(githubUrl);
}

function devto() {
    window.open(devtoUrl);
}

function email(){
    window.location.href = `mailto:${emailAddress}?subject=${defaultEmailSubject}&body=${defaultEmailMessage}`;
}