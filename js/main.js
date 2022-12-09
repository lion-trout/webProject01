// main.js
window.addEventListener("load", () => {
  // top 버튼
  const btnTop = document.querySelector("a.btn_top");

  window.addEventListener("scroll", () => {
    let scroll = document.querySelector("html").scrollTop;
    if (scroll<=0) {
      btnTop.classList.remove("on", "ab");
    } else if (scroll>2700) {
      btnTop.classList.add("ab");
      btnTop.classList.add("on");
    } else {
      btnTop.classList.remove("ab");
      btnTop.classList.add("on");
    }
  });

  btnTop.addEventListener("click", e => {
    e.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });

  /* 주메뉴 */
  const gnbMenu = document.querySelectorAll(".gnb>ul>li");
  const headerWrap = document.querySelector(".header_wrap");

  for (let i = 0; i < gnbMenu.length; i++) {
    gnbMenu[i].addEventListener("mouseover", e => {
      e.currentTarget.classList.add("on");
      var ht = e.currentTarget.children[1].offsetHeight;
      // console.log(ht)
      headerWrap.style.height = 70 + ht + "px";
    });
    gnbMenu[i].addEventListener("mouseout", e => {
      e.currentTarget.classList.remove("on");
      headerWrap.style.height = "70px";
    });

    gnbMenu[i].children[0],addEventListener("focus", e => {// li>a
      e.currentTarget.parentElement.classList.add("on");
      var ht = e.currentTarget.nextElementSibling.offsetHeight;
      headerWrap.style.height = 70 + ht + "px";
    });
    gnbMenu[i].children[0],addEventListener("blur", e => {//li>div
      e.currentTarget.parentElement.classList.remove("on");
      headerWrap.style.height = "70px";
    });
  }

  /* 검색박스 */
  const srchWrap = document.querySelector(".srch_wrap");
  const btnSrch = document.querySelector(".btn_srch");
  const btnSrchClose = document.querySelector(".btn_srch_close");

  btnSrch.addEventListener("click", e => {
    e.preventDefault();
    srchWrap.classList.add("on");
  });

  btnSrchClose.addEventListener("click", e => {
    e.preventDefault();
    srchWrap.classList.remove("on");
  });

  /* 배너 */
  const btnNext = document.querySelector("a.btn_next");
  const btnPrev = document.querySelector("a.btn_prev");
  const slide = document.querySelectorAll("li.slide"); // 0, 1, 2
  const slideRoll = document.querySelectorAll(".slide_roll li"); // 0, 1, 2
  const btnPlay = document.querySelector(".btn_play");

  let bnnNum = 0;
  let lastNum = document.querySelectorAll(".slide_wrap>li").length-1; // 2

  // next 버튼
  btnNext.addEventListener("click", e => {
    e.preventDefault();
    bnnNum++;
    if (bnnNum>lastNum) {
      bnnNum = 0;
    }
    activation(bnnNum, slide);
    activation(bnnNum, slideRoll);
    /*
    slide.forEach(item => {
      item.classList.remove("active");
    });
    slide[bnnNum].classList.add("active");

    // 하단 롤 버튼
    slideRoll.forEach(idx => {
      idx.classList.remove("on");
    });
    slideRoll[bnnNum].classList.add("on");
    */
  });

  // prev 버튼
  btnPrev.addEventListener("click", e => {
    e.preventDefault();
    bnnNum--;
    if (bnnNum<0) {
      bnnNum = lastNum;
    }
    activation(bnnNum, slide);
    activation(bnnNum, slideRoll);
    /*
    slide.forEach(item => {
      item.classList.remove("active");
    });
    slide[bnnNum].classList.add("active");

    // 하단 롤링 버튼
    slideRoll.forEach(idx => {
      idx.classList.remove("on");
    });
    slideRoll[bnnNum].classList.add("on");
    */
  });

  // 오토배너
  function autoBanner(){
    bnnNum++;
    if (bnnNum>lastNum) {
      bnnNum = 0;
    }
    activation(bnnNum, slide);
    activation(bnnNum, slideRoll);
    /*
    slide.forEach(item => {
      item.classList.remove("active");
    });
    slide[bnnNum].classList.add("active");

    slideRoll.forEach(idx => {
      idx.classList.remove("on");
    });
    slideRoll[bnnNum].classList.add("on");
    */
    autoBnn = setTimeout(autoBanner, 5000); // 재귀함수
  }
  let autoBnn = setTimeout(autoBanner, 5000); // 5초마다 next 버튼 누른 것과 같은 기능, 최초호출

  // 배너 재생 멈춤 버튼
  let flag = true;

  btnPlay.addEventListener("click", () => {
    if (flag) {// 멈춤
      btnPlay.classList.add("on");
      clearTimeout(autoBnn);
      flag = false;
    } else {// 재생
      btnPlay.classList.remove("on");
      autoBnn = setTimeout(autoBanner, 5000);
      flag = true;
    }
  });

  // 롤링 버튼 클릭
  for (let i = 0; i < slideRoll.length; i++) {
    slideRoll[i].addEventListener("click", e => {
      e.preventDefault();
      activation(i, slide);
      activation(i, slideRoll);
    });
  }

  function activation(index, list) {
    for(let el of list){
      el.classList.remove("on", "active");
    }
    list[index].classList.add("on", "active");
  };

  // scroll fade-in
  const para = document.querySelector(".main_visual>ul>li:first-of-type>p")
  const content1 = document.querySelector(".content1")
  const content2H2 = document.querySelector(".content2>h2")
  const content2Ul = document.querySelector(".content2>ul")
  const content2News = document.querySelector(".content2>.newsletter")
  const content2Social = document.querySelector(".content2>.social")
  const prhall = document.querySelector(".prhall")
  const prhallBox = document.querySelector(".prhall>a>.box_wrap")
  const prhallPic = document.querySelector(".prhall>a>p")
  const cont3Img = document.querySelectorAll(".content3_inner>.product_list>ul>li>a>.img_area")
  const cont3Txt = document.querySelectorAll(".content3_inner>.product_list>ul>li>a>.txt_area")

  const observer = new IntersectionObserver((e) => {
    e.forEach((i) => {
      if (i.isIntersecting) {
        i.target.classList.add("fadeIn")
      }
    })
  });
  observer.observe(para)
  observer.observe(prhallBox)
  observer.observe(cont3Txt[0])
  observer.observe(cont3Txt[1])
  observer.observe(cont3Txt[2])


  const observerUp = new IntersectionObserver((e) => {
    e.forEach((i) => {
      if (i.isIntersecting) {
        i.target.classList.add("fadeUp")
      }
    })
  });
  observerUp.observe(content1)
  observerUp.observe(content2H2)
  observerUp.observe(content2Ul)
  observerUp.observe(content2News)
  observerUp.observe(content2Social)
  observerUp.observe(prhall)

  const observerSide = new IntersectionObserver((e) => {
    e.forEach((i) => {
      if (i.isIntersecting) {
        i.target.classList.add("fadeSide")
      }
    })
  });
  observerSide.observe(prhallPic)
  observerSide.observe(cont3Img[0])
  observerSide.observe(cont3Img[1])
  observerSide.observe(cont3Img[2])
});