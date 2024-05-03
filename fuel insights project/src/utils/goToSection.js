 export const goToSection = (sectionIdx, sectionRefs) =>{
    console.log("gotochapter")
          window.scrollTo({
            top : sectionRefs.current[sectionIdx].offsetTop,
            behavior : "smooth"
          })
  }