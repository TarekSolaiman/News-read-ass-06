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
        <a onclick="categoryClick('${data.category_id}')" class="nav-link " href="#">${data.category_name}</a>
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
        creatNews(data.data);
        const newsNone = document.getElementById('news-none')
        if (data.data.length === 0) {
            newsNone.classList.remove('d-none')
            return
        }
        else {
            newsNone.classList.add('d-none')

        }

    }
    catch (error) {
        console.log(error);
    }
}

const creatNews = (dataArray) => {
    const newsContainer = document.getElementById('news-container')
    const spinner = document.getElementById('spinner')
    newsContainer.innerHTML = ``
    dataArray.forEach(data => {
        const { _id, author, image_url, title, details, total_view } = data;
        const { img, name, published_date } = author;
        console.log(data);
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card mb-3" style="max-width: 100%;">
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${image_url}" class="img-fluid rounded-start m-3 " alt="">
            </div>
            <div class="col-md-9 p-3">
                <div class="card-body align-middle">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.length > 200 ? details.slice(0, 200) + '...' : details}</p>
                    <div class="d-flex justify-content-between">
                        <span class="card-text"><img src="${img}" style="width: 40px;" class="img-fluid rounded-circle" alt=""><small class="text-muted ps-2">${name.length === 0 ? 'Not Find' : name}</small></span>
                        <span class="card-text"><small class="text-muted">${total_view}</small></span>
                        <span class="card-text"><small class="text-muted">${published_date}</small></span>
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
        <img src="${author.img}" class="img-fluid rounded-start m-3" alt="">
        <p class="card-text">${author.name.length === 0 ? 'No Data' : author.name}</p>
        `
        console.log(author.img, author.name);
    }
    catch (error) {
        console.log(error);
    }
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


