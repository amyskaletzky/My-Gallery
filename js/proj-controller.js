'use strict'
console.log('Starting up')

function renderProjs() {

    const projs = getProjsForDisplay()

    const strHTML = projs.map(proj => `
            <div class="col-md-4 col-sm-6 portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${id}">
                <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
                </div>
                </div>
                <img class="img-fluid" src="img/portfolio/0${id}-thumbnail.jpg" >
                </a>
                <div class="portfolio-caption">
                <h4>${name}</h4>
                <p class="text-muted">${desc}</p>
                </div>
            </div>
`)
}

