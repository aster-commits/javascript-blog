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
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optArticleAuthorSelector = '.post-author';

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
}

generateTitleLinks();

function generateTags(){

  /* remove list contents */

  const tagListElements = document.querySelectorAll (optArticleTagsSelector);
  for (let tagListElement of tagListElements){
    tagListElement.innerHTML = '';
  }

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
      // console.log(tagLink);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
        // console.log(allTags);
      }

    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */

    /* [NEW] create variable for all links HTML code */

    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      // allTagsHTML += tag + ' (' + allTags[tag] + ') ';

      allTagsHTML += '<li><a href="#tag-' + tag + '"><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>';

      /* [NEW] END LOOP: for each tag in allTags: */
    }

    /* [NEW] add html from allTagsHTML to TagList */

    tagList.innerHTML = allTagsHTML;
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
  // console.log(equalTags);

  /* START LOOP: for each found tag link */

  for (let equalTag of equalTags){

    /* add class active */

    equalTag.classList.add('active');

  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);

}

function addClickListenersToTags(){
  /* find all links to tags */

  const links = document.querySelectorAll ('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let link of links){

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);
  }

  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){

  /* find all articles */
  
  const articles = document.querySelectorAll (optArticleSelector);

  /* START LOOP: for every author: */

  for (let article of articles){

    /* find author wrapper */

    const authorWrapper = article.querySelector (optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-tags attribute */

    const authourTags = authorWrapper.getAttribute('data-author');

    /* generate HTML of the link */

    const authourSpace = authourTags.replace('-',' ');

    const authorLink = '<li><a href="#' + authourTags + '"><span>' + authourSpace + '</span></a></li>';
    // console.log(authorLink);

    /* add generated code to html variable */

    html = html + authorLink;
    // console.log(html);

    /* insert HTML of all the links into the authour wrapper */

    authorWrapper.innerHTML = html;
    // console.log(authorWrapper);

    /* END LOOP: for every article: */

  }
}

generateAuthors();

function authourClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* prevent default action for this event */
  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  // console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const authorName = href.replace('#', '');

  /* find all tag links with class active */

  const activeAuthors = document.querySelectorAll('.post-author a.active[href^="#"]');
  console.log(activeAuthors);

  /* START LOOP: for each active tag link */

  for (let activeAuthor of activeAuthors){

    /* remove class active */

    activeAuthor.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const equalAuthors = document.querySelectorAll('a[href="' + href + '"]');
  console.log(equalAuthors);

  /* add class active to found links */

  for (let equalAuthor of equalAuthors){

    equalAuthor.classList.add('active');
    // console.log(equalAuthor);
  }

  // /* END LOOP: for each found tag link */

  // /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + authorName + '"]');

}

function addClickListenersToAuthors(){
  /* find all links to tags */

  const links = document.querySelectorAll ('.post-author a[href^="#"]');

  /* START LOOP: for each link */

  for (let link of links){

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', authourClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

