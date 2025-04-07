    function startScrollSpy() {
        const view = document.querySelector('#studentDataModal .body #studentDataView')
        view.addEventListener('scroll', activateMenuItems);
        console.log(view)

        let menuItems = document.querySelectorAll('.tabs-scrollspy a');
        menuItems[0].classList.add('active')
    }
     
    function activateMenuItems() {
      // Get all section elements
      let sections = document.querySelectorAll('.scrollspySection');
        
      // Get the scrollspy menu
      let menuItems = document.querySelectorAll('.tabs-scrollspy a');

      const view = document.querySelector('#studentDataModal .body #studentDataView')
      // Get the current scroll position
      const currentPosition = view.scrollTop + (sections[0].offsetTop);
        
      menuItems.forEach(function(item) {
        item.classList.remove('active');
      });

      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        console.log('------')
        console.log(currentPosition)
        console.log(sectionTop)
        console.log(sectionBottom)
  
        if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
          // Add the 'active' class to the corresponding menu item
  
          const targetMenuItem = document.querySelector(`.tabs-scrollspy a[href="#${section.id}"]`);
          targetMenuItem.classList.add('active');
        }
      });
    };