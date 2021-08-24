class Carousel {
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carouselContainer')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        let ratio = children.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + '%'
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carouselItem')
            item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%"
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        });
        this.createNavigation()
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carouselNext')
        let prevButton = this.createDivWithClass('carouselPrev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    next () {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }
    prev () {
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
    }
    gotoItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length | this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0
        };

        let translateX = (-100 / this.items.length) * index
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
    }
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}




document.addEventListener('DOMContentLoaded', function() {

    new Carousel(document.querySelector('#bestMovies') , {
        slidesToScroll: 1,
        slidesVisible: 4
    })

    new Carousel(document.querySelector('#cat1') , {
        slidesToScroll: 1,
        slidesVisible: 4
    })

    new Carousel(document.querySelector('#cat2') , {
        slidesToScroll: 1,
        slidesVisible: 4
    })

    new Carousel(document.querySelector('#cat3') , {
        slidesToScroll: 1,
        slidesVisible: 4
    })

})

