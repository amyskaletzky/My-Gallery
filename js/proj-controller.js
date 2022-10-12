'use strict'
console.log('Starting up')

$(document).ready(init)

function init() {
    renderProjs()
    renderModals()
}

function renderProjs() {

    const projs = getProjsForDisplay()

    const strHTML = projs.map(proj => `
            <div class="col-md-4 col-sm-6 portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${proj.id}">
                <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
                </div>
                </div>
                <img class="img-fluid" src="img/portfolio/${proj.id}.png" >
                </a>
                <div class="portfolio-caption">
                <h4>${proj.name}</h4>
                <p class="text-muted">${proj.title}</p>
                </div>
            </div>
`)
    document.getElementById('projs').innerHTML = strHTML.join('')
}

function renderModals() {
    const projs = getProjsForDisplay()
    
    const strHTML = projs.map(proj => `
            <div class="portfolio-modal modal fade" id="portfolioModal${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="close-modal" data-dismiss="modal">
                            <div class="lr">
                                <div class="rl"></div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-8 mx-auto">
                                    <div class="modal-body">
                                    <!-- Project Details Go Here -->
                                        <h2>${proj.name}</h2>
                                        <p class="item-intro text-muted">${proj.title}</p>
                                        <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.png" alt="${proj.name}">
                                        <p>${proj.desc}</p>
                                        <ul class="list-inline">
                                        <li>Date: ${proj.publishedAt}</li>
                                        <li>Category: ${proj.labels.join(', ')} </li>
                                        </ul>
                                        <button class="btn btn-primary" type="button">
                                        <i class="fa"></i>
                                        <a href="projs/${proj.id}" tab target="_blank">
                                        Check it out</button></a>
                                        <button class="btn btn-primary" data-dismiss="modal" type="button">
                                        <i class="fa fa-times"></i>
                                        Close Project</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
    `)
    document.querySelector('body').innerHTML += strHTML
}






