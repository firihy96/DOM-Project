const
    img1 = '/imgs/01.jpg',
    img2 = '/imgs/02.jpg',
    img3 = '/imgs/03.jpg',
    img4 = '/imgs/04.jpg',
    img5 = '/imgs/05.jpg',
    myImgCont = [
        img1, img2, img3, img4, img5
    ],
    globe = document.querySelector('.global-cont');
let setInt;
    
/* Changing BackGround Fn */
var randBgChange = function () {
    setInt = setInterval(() => {
const
    rand = Math.floor(Math.random() * (myImgCont.length));
    globe.style.backgroundImage = `url('${myImgCont[rand]}')`;
    }, 3000);
}

if (window.localStorage != null) {
    /* Setting Items In local storage */
    document.documentElement.style.setProperty('--main-color', window.localStorage.getItem('default-color'));
} 
    
/* Check Fn */
let check = function () {
    if (window.localStorage.getItem('rand-op') == 0) {
        clearInterval(setInt);
        document.querySelector('main aside .rand li:last-child').style.display = 'none';
        document.querySelector('main aside .rand li:first-child').style.display = 'flex';
    } else {
        document.querySelector('main aside .rand li:last-child').style.display = 'flex';
        document.querySelector('main aside .rand li:first-child').style.display = 'none';
    }
};
/* Changing Background image */
window.onload = function () {
    /* Invoking Changing BackGround Fn */
    randBgChange();
    /* Setting Class Active to the last element selected */
    document.querySelectorAll('main aside .color li').forEach((elem) => {
        if (elem.dataset.color == window.localStorage.getItem('default-color'))
        {
            elem.classList.add('active')
        }
    })
    /* Invoking Check fn */
    check();
}

/*
*************************************************************************************/

/* Side Bar  */

const
    side = document.querySelector('main aside'),
    gearCont = document.querySelector('main aside .icon');

gearCont.firstElementChild.classList.remove('fa-spin');
/* Closing side bar from anywhere */

/* window.addEventListener('click', (e) => {
    if (e.target != side && e.target!=gearCont)  {
        console.log('out')
        document.querySelector('aside').classList.remove('open')
    }
    else {
        console.log('in')
    }
}) */
let gClickCounter = 0;
gearCont.addEventListener('click',
    () => {
        if (gClickCounter % 2 == 0) {
            gearCont.firstElementChild.classList.add('fa-spin');
            side.classList.add('open');
            gClickCounter++;
        }
        else {
            gearCont.firstElementChild.classList.remove('fa-spin');
            side.classList.remove('open');
            gClickCounter++;
        }
})
/* Settings */
let lis= document.querySelectorAll('main aside .color li');

lis.forEach((element) => {
    element.addEventListener('click',
        (e) => {
            document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

            /* Setting last color in local storage */

            window.localStorage.setItem('default-color', e.target.dataset.color);

            e.target.classList.add('active');

            /* Selecting all elements that have .active class including the current element */

            e.target.parentElement.querySelectorAll('.active').forEach(
                (ele) => {
                    /* Removing .active class from all */
                    ele.classList.remove('active');
                    /* Adding to current element */
                    e.target.classList.add('active')
                }
            )
    })
})


/*
*************************************************************************************/

/* Random Background Option */
const
    yBgOp = document.querySelector('main aside .rand li:first-child'),
    nBgOp = document.querySelector('main aside .rand li:last-child');

nBgOp.addEventListener('click', () => {
    clearInterval(setInt);
    window.localStorage.setItem('rand-op', 0);
    document.querySelector('main aside .rand li:last-child').style.display = 'none';
    document.querySelector('main aside .rand li:first-child').style.display = 'flex';
})
yBgOp.addEventListener('click', () => {
    clearInterval(setInt);
    randBgChange();
    window.localStorage.setItem('rand-op',1)
    document.querySelector('main aside .rand li:last-child').style.display = 'flex';
    document.querySelector('main aside .rand li:first-child').style.display = 'none';
})

/*
*************************************************************************************/

/* Reset Button */
const
    rBtOp = document.querySelector('main aside .reset');

rBtOp.addEventListener('click', () => {
    window.localStorage.clear()
    clearInterval(setInt);
    randBgChange();
    window.localStorage.setItem('default-color', '#d11149');
    document.documentElement.style.setProperty('--main-color', window.localStorage.getItem('default-color'));
    /* Adding active state on the default color & removing it from current color  when press rest button  */
    document.querySelectorAll('.active').forEach(
    (ele) => {
    ele.classList.remove('active');
    /* Adding to default color  */
    document.querySelector('main aside .options .color :nth-child(3)').classList.add('active')
                }
    )
    /* Or you can add it to the default-color in the local-storage
     */
    window.localStorage.setItem('rand-op',1)
    document.querySelector('main aside .rand li:last-child').style.display = 'flex';
    document.querySelector('main aside .rand li:first-child').style.display = 'none';
})
/*
*************************************************************************************/
/* Skill appearance on scroll*/

window.onscroll = function () {
    /*
Condition of an element to be visible within the viewport is:
    viewport height  [window.innerHeight] >=
    element top position relative to viewport top-left corner [element.getBoundingClientHeight().top]
    */
    if ((window.innerHeight) >= (document.querySelector('.skills').getBoundingClientRect().top)) {
        // if element is visible
        document.querySelectorAll('.skills  span.prog').forEach((ele) => {
            /* Display Block*/
            ele.classList.remove('disapp')
            /* Changing progress value for each skill */
            document.documentElement.style.setProperty(`--${ele.dataset.prog}`, myProgObj[ele.dataset.prog] + '%')
        })
    } else {
        // if element is [not] visible
        document.querySelectorAll('.skills  span.prog').forEach((ele) => { ele.classList.add('disapp') })
    }

    // When footer appear 
    if ((window.innerHeight) >= ((footer.getBoundingClientRect().top))) {
        clearInterval(Int2)
        icreate();
        setTimeout(stopCreate, 5000)
        
        // when footor is not seen
    } else {
        document.querySelectorAll('.footer-cont i').forEach((ele)=>{ ele.remove()})
    }

    // displaying UP button
    if (window.scrollY >= window.innerHeight * .8) {
        upBtn.style.display = 'block';
        upBtn.style.animationName = 'ani-show';
    } else {
        upBtn.style.animationName = 'ani-hide';
        upBtn.style.animationFillMode = 'forwards';
    }
}
/* Controlling skill progress through JS*/
let myProgObj = {
    html: '65',
    css: '75',
    js: '85',
};
let myProgArr = [];
let mySkillArr = [];

for (let k in myProgObj) {
    mySkillArr.push(k)
    myProgArr.push(parseFloat(myProgObj[k]))
}

/*
*************************************************************************************/
/* Image Previewer */
const galImg = document.querySelectorAll('.gallery img');

galImg.forEach((ele) => {

    ele.setAttribute('data-img', `${ele.getAttribute('src')}`)

    ele.addEventListener('click', () => {
        document.querySelector('.layer').setAttribute('style','display:block')
        let view = ele.parentElement.parentElement.previousElementSibling.firstElementChild.children[1];
        /* Setting img part in src att */
        view.setAttribute('src', `${
            ele.dataset.img
        }`)
        view.parentElement.parentElement.setAttribute('style', 'display:block')
    })
}
)

/* Close Image Previewer */
const closeBtn = document.getElementById('close');
closeBtn.addEventListener('click',
    () => {
        closeBtn.parentElement.parentElement.setAttribute('style', 'display:none')
    }
)
/*
*************************************************************************************/
document.querySelectorAll('input').forEach((ele) => {
    ele.onfocus = () => {
        ele.removeAttribute('placeholder')
    }
    ele.onblur = () => {
        ele.setAttribute('placeholder', `${
        ele.dataset.info
    }`)
        
    }
})

/*
*************************************************************************************/
let
    ii = document.createElement('i'),
    footer = document.querySelector('footer'),
    footCont = document.querySelector('footer div');

const create = function ()
{
        let i = document.createElement('i');
        i.classList.add('fa-solid', 'fa-heart', 'fa-beat');
        footCont.appendChild(i)
}


let Int2;

const icreate = function ()
{
    Int2 = setInterval(() => {
            create()
        },500)
}

const stopCreate = function ()
{
    clearInterval(Int2)
}


/*
*************************************************************************************/
// creating up Button
let upBtn = document.createElement('span');
document.body.insertBefore(upBtn, document.body.children[1]);
upBtn.setAttribute('id', 'upBtn')
// upBtn.style.display = 'none';

// creating up arrow
let arrow = document.createElement('i');
arrow.classList.add('fa-solid' ,'fa-arrow-up-long')
upBtn.appendChild(arrow)

upBtn.onclick = () => {
    // document.querySelector('#about').scrollIntoView()
    window.scrollTo(0,0)
}
/* Media Query for mnu-bar */
if (window.innerWidth < 576) {
    document.querySelector('header ul').classList.remove('normal')
    document.querySelector('header ul').classList.add('upnormal')
}
else {
    document.querySelector('header ul').classList.add('normal')
    document.querySelector('header ul').classList.remove('upnormal')
}
console.log(window.innerWidth);