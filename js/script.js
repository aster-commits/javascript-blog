'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

  /* Remove contents of list in left column */

  const titleList = document.querySelector (optTitleListSelector);
  titleList.innerHTML = '';
    
  /* for each article: */

  const articles = document.querySelectorAll (optArticleSelector + customSelector);

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
  console.log(customSelector);
}

generateTitleLinks();

function generateTags(){

  /* remove list contents */

  const tagListElements = document.querySelectorAll (optArticleTagsSelector);
  for (let tagListElement of tagListElements){
    tagListElement.innerHTML = '';
  }

  /* find all articles */

  const articles = document.querySelectorAll (optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles){

    /* find tags wrapper */

    const tagWrapper = article.querySelector (optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray){

      /* generate HTML of the link */

      const tagLink = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */

      html = html + tagLink;
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* prevent default action for this event */
  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-','');
  console.log(tag);

  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */

  for (let activeTag of activeTags){

    /* remove class active */

    activeTag.classList.remove('active');

  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const equalTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(equalTags);

  /* START LOOP: for each found tag link */

  for (let equalTag of equalTags){

    /* add class active */

    equalTag.classList.add('active');

  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const links = document.querySelectorAll ('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let link of links){
    // console.log(link);

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);
    
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();

//////

