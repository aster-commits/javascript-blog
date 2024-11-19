'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links */

    const activeLinks = document.querySelectorAll('.titles a.active')

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using a selector (value of 'href' attribute) */

    const targetArticle = document.querySelector (articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* Remove contents of list in left column */

    const titleList = document.querySelector (optTitleListSelector);
    titleList.innerHTML = '';
    
    /* for each article: */

    const articles = document.querySelectorAll (optArticleSelector)

    let html = '';

    for (let article of articles){

    /* find id const */

        const articleId = article.getAttribute ('id');

    /* find element with title and save it as const */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* based on the info above create HTML link and save it as const */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert created HTML code to the list of links on the left */

        html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();