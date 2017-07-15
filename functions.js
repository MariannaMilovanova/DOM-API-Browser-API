
function scrollFunction(array) {
    
        let maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let currentScroll = window.pageYOffset;
        if ( currentScroll  ==  maxScroll ) {  
            render(array);
        }
    }

//delete button 

function buttonDelete(btn) {
    let btnArr = document.getElementsByClassName(btn);
        for (let i = 0; i < btnArr.length; i++) {
            let parent = btnArr[i].parentNode;
                btnArr[i].addEventListener("click" , function() {
                    parent.style.display = "none";
            });      
        }
}
////turn the date string into the date object
function reviver(value) {
    return new Date(value);
}

//tags
function tagSort(array, currentTag) {
    //debugger;
    let newArray = array.filter(function(elem, index) {
        for (let i in currentTag ) {
            for (let j in elem.tags ) {
                if ( !elem.tags.includes(currentTag[i]) ) {
                  return false;
                }
           }
        }
        return elem
    })

    let restOfArray = array.filter(function(elem, index) {
           if ( !newArray.includes(elem) ) {
                return elem;
           }
    }); 
    console.log(newArray);
    for ( let i = newArray.length, j = 0; i < i + restOfArray.length, j < restOfArray.length; i++, j++ ) {
        newArray[i] = restOfArray[j];
    }
    console.log(restOfArray);
    console.log(newArray);
    while ( mainContent.hasChildNodes() ) {
        mainContent.removeChild(mainContent.lastChild);
    }
    blogNum = 0;
    render(newArray);
}

//renderHTML on page
function renderHTML(data) {
    let mainContent = document.getElementsByClassName("main-content")[0];
    let blogDate = reviver(data["createdAt"]);

    let year = blogDate.getFullYear();
    let month = blogDate.getMonth();
    let date = blogDate.getDate();
    let hours = blogDate.getHours();
    let minutes = blogDate.getMinutes();

    let htmlEl = '<article class = "sticker">' + '<button type="button" id="delete" class="btn">delete</button>' + 
                    '<div class = "title">' + data.title + '</div>' + 
                    '<img class = "image" src = "' + data.image + '" />' +
                    '<div class = "description">' + data.description + '</div>' +
                    '<div class = "createdAt">' +  date + '-' + month + '-' + year + ' ' + hours + ':' + minutes + '</div>'
                    for ( let i=0; i < data.tags.length; i++ ) {
                        htmlEl += '<div class = "tags">' + data.tags[i] + '</div>';
                    }
                '</article>';
                
    mainContent.insertAdjacentHTML("beforeend", htmlEl);
}
//render array
function render(array) {
    let numPerPage = 10;
    for ( let i = blogNum; i < blogNum + numPerPage; i++) {
            renderHTML(array[i]);
        }
        
    blogNum += numPerPage;
    //delete button
    buttonDelete("btn");
    
    window.onscroll = function() { scrollFunction(array) };
}

//searchbox
function search(array) {
    let searchArray = [];
    let search = document.getElementById("mySearch");
    
    search.addEventListener("keyup", () => { 
        let input = search.value;
        let filter = search.value.toLowerCase();
                

        for ( let i = 0; i < array.length; i++) {
            a = array[i].title.toLowerCase();         

            if ( a.indexOf(filter) > -1) {
                searchArray[i] = array[i];
            }
        }

    let NewSearchArray = searchArray.filter( function(elem) {
           if (typeof (elem) !== 'undefined') {
            return elem;
            }
         });

        while ( mainContent.hasChildNodes() ) {
            mainContent.removeChild(mainContent.lastChild);
                    }
            blogNum = 0;
            render(NewSearchArray);
    });
}   
