//JSON
let mainContent = document.getElementsByClassName("main-content")[0];
let blogNum = 0;


function JSONrequest() {
    
    let request = new XMLHttpRequest();

    request.open("GET", "https://raw.githubusercontent.com/MariannaMilovanova/pictures/master/myjson.json");
    request.onload = function () {
        let jsonData = JSON.parse(request.responseText);

        //sorting 
        jsonData.data.sort( function (obj1, obj2) {
            return reviver(obj2.createdAt).getTime() - reviver(obj1.createdAt).getTime()
            
        });
        search(jsonData.data);

        //sorting by tags
        let tagArr = document.getElementsByClassName("header-menu-item");

            let arrayTags = [];
            for (let i = 0; i < tagArr.length; i++) {
                let li = tagArr[i];
                    tagArr[i].addEventListener("click" , function(evt) {
                        li.className += " preferTag";
                        let tagName = evt.target.innerHTML;
                        arrayTags.push(tagName);

                        tagSort(jsonData.data, arrayTags);
                        let preferTags = [];
                        for ( let i = 0; i < arrayTags.length; i++ ) {
                            preferTags[i] = `${arrayTags[i]}`;
                        }
                        localStorage.setItem("prefer", JSON.stringify(preferTags));
                })
            }
       
        let storagedTags = JSON.parse(localStorage.getItem("prefer"));

        //local Storage preferences
        let arrayTagsInner = [];
        for (let i = 0; i < tagArr.length; i++) {
            arrayTagsInner[i]= tagArr[i].innerHTML;
        }
        if (storagedTags) {
            tagSort(jsonData.data, storagedTags);
            for (let i = 0; i <arrayTagsInner.length; i++) {
                if ( arrayTagsInner.includes(storagedTags[i]) ) {
                    for ( let i = 0; i < arrayTagsInner.length; i++ ) {
                        for ( let j = 0; j < storagedTags.length; j++ ) {
                            if ( tagArr[i].innerHTML == storagedTags[j] ) {
                                tagArr[i].className += " preferTag";
                            }
                            
                        }
                    }
                }
            }
        } else {
            render(jsonData.data)
        }
    };

    request.send();
}
//function call
JSONrequest();






