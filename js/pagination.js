let listDiv = document.getElementById('listOfCars');
let pageSize = 6;


(function(){
    
    let myRequest = new Request('./cars.json');
    
    fetch(myRequest)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            getCarBrand(data, 1);
            createFilter(data);
        });    
})()

function createFilter(data){

    let search = document.getElementById('search');
    search.addEventListener("keyup", function(event){
        let val = search.value.toLowerCase();
        //getCarBrand(data, 1);
        
        let result = data.filter(e => e.brand.toLowerCase().startsWith(val));
        console.log(result);
        getCarBrand(result, 1);
    })  
}

function getCarBrand(data, page){
    
    let lastItem = page * pageSize;
    let startItem = lastItem - pageSize;
    
    while(listDiv.firstChild){
        listDiv.removeChild(listDiv.firstChild);
    }
    
    let pageCount = Math.ceil(data.length / pageSize);
    createNav(pageCount, page, data);

    for (let i = startItem; i < lastItem && i < data.length; i++) {  
        let innerDiv = document.createElement('div');
        innerDiv.classList.add("carItem");   
        let img = document.createElement('img');
        img.src = data[i].img;
        img.classList.add("carImg");
        innerDiv.appendChild(img);                
        listDiv.appendChild(innerDiv);
    }    
}

function createNav(pageCount, numPage, data){    
    
    let pagination = document.getElementById('pagination');

    while(pagination.firstChild){
        pagination.removeChild(pagination.firstChild);
    }

    let liBack = document.createElement('li');
    liBack.classList.add("page-item");
    let btnBack = document.createElement('button');
    btnBack.classList.add("page-link");
    btnBack.innerHTML = 'Назад';
    btnBack.addEventListener('click', function(event){
        getCarBrand(data, numPage - 1);
    })
    liBack.appendChild(btnBack);
    pagination.appendChild(liBack);
    if(numPage === 1){ liBack.classList.add('disabled')}    

    for(let i = 1; i <= pageCount; i++){
        
        let li = document.createElement('li');
        li.classList.add("page-item");        
        let a = document.createElement('button');
        a.classList.add("page-link")
        a.innerHTML = i;
        if(numPage === i){
            li.classList.add('active');
        }
        a.addEventListener('click', function(event){
            getCarBrand(data, i);
        })
        li.appendChild(a);
        pagination.appendChild(li);
    }   

    let liForward = document.createElement('li');
    liForward.classList.add("page-item");
    let btnForward = document.createElement('button');
    btnForward.classList.add("page-link");
    btnForward.innerHTML = 'Вперед';
    btnForward.addEventListener('click', function(event){
        getCarBrand(data, numPage + 1);
    })
    liForward.appendChild(btnForward);
    pagination.appendChild(liForward);
    if(numPage === pageCount){ liForward.classList.add('disabled')}  
}