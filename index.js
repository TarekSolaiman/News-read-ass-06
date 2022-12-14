// url=`https://openapi.programming-hero.com/api/news/category/01`

const categories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        AllCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const AllCategory = (Datas) => {
    const categories = document.getElementById('categories')
    for (const data of Datas) {
        const li = document.createElement('li')
        li.classList.add('nav-link')
        li.innerHTML = `
        <a onclick="categoryClick('${data.category_id}')" class="nav-link p-3" href="#">${data.category_name}</a>
        `
        categories.appendChild(li)
    }
}

categories();


const categoryClick = async (data = '08') => {
    const url = `https://openapi.programming-hero.com/api/news/category/${data}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        lodeSpinner(true)
        creatNews(data.data);
    }
    catch (error) {
        console.log(error);
    }

}

const creatNews = (dataArray) => {
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ``
    const newsNone = document.getElementById('news-none')
    const itemList = document.getElementById('item-Number')
    itemList.innerText = `News toDay`
    if (dataArray.length === 0) {
        newsNone.classList.remove('d-none')
        itemList.innerText = `${0} News toDay`
        lodeSpinner(false)
        return
    }
    else {

        newsNone.classList.add('d-none')

    }
    const ArrayLength = dataArray.length
    itemList.innerText = `${ArrayLength} News toDay`
    dataArray.forEach(data => {
        const { _id, author, image_url, title, details, total_view } = data;
        const { img, name, published_date } = author;
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 100%;">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${data.image_url}" class="img-fluid rounded-start p-3 " alt="">
            </div>
            <div class="col-md-9 p-3">
                <div class="card-body align-middle">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.length > 200 ? details.slice(0, 250) + '...' : details}</p>
                    <div class="d-flex justify-content-between">
                        <span class="card-text"><img src="${img}" style="width: 40px;" class="img-fluid rounded-circle" alt=""><small class="text-muted ps-2">Name : ${name?.length ? name : 'Not Find'}</small></span>
                        <span class="card-text"><small class="text-muted">View : ${total_view?.length ? total_view : 'No Data'}</small></span>
                        <span class="card-text"><small class="text-muted">Date : ${published_date?.length ? published_date : 'No Date'}</small></span>
                        <button onclick="OpenModal('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        newsContainer.appendChild(div)
        lodeSpinner(false)
    });
}

categoryClick();

const OpenModal = async (data) => {
    const titleModal = document.getElementById('staticBackdropLabel')
    const modalBody = document.getElementById('modalBody')
    modalBody.innerHTML = ''
    const url = `https://openapi.programming-hero.com/api/news/${data}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        const { title, author } = data.data[0]
        titleModal.innerText = title
        modalBody.innerHTML = `
        <img src="${author.img}" class="img-fluid rounded-start p-3" alt="">
        <p class="card-text">Name :${author.name?.length ? author.name : 'No Data'}</p>
        <p class="card-text">Date : ${author.published_date?.length ? author.published_date : 'No Date'}</p>
        `
        console.log(author.img, author.name);
    }
    catch (error) {
        console.log(error);
    }
}




const lodeSpinner = (loding) => {
    const spinner = document.getElementById('spinner');
    if (loding === true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

const OpenModalQUs = () => {
    const titleModal = document.getElementById('staticBackdropLabel')
    titleModal.innerText = 'Question and Answer'
    const modalBody = document.getElementById('modalBody')
    modalBody.innerHTML = `
    <h5>Difference between var let and const ?</h5>
    <p>The scope of a var variable is functional scope. The scope of a let variable is block scope. The scope of a const variable is block scope. It can be updated and re-declared into the scope.</p>
    
    <h5>Difference between arrow function and normal function ?</h5>
    <p> In regular function, you always have to return any value, but in Arrow function you can skip return keyword and write in single line.</p>

    <h5>Difference between map and foreach ?</h5>
    <p>The main difference between this two methods is that forEach allows you to change elements of original array and returns undefined and map does not allow you to change original array and intended for making new array based on original one.</p>

    <h5>Difference between filter and find ?</h5>
    <p>You've relearned the find array method. find returns the first matching element and filter returns an array of all.</p>

    <h5>Why you use template string ?</h5>
    <p>Template literals provide an easy way to interpolate variables and expressions into strings. The method is called string interpolation.</p>
    
    `
}















/*          
    <div class="card mb-3" style="max-width: 100%;">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="..." class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div> 
*/


