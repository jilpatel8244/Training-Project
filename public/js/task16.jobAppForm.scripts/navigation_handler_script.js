
let pageCount = 1;

function prevPage(){
    if (pageCount > 1) {
        pageCount -= 1;
        displayPage();
    }
}

function nextPage(){
    if (Array.from(document.getElementsByTagName("section")).length > pageCount) {
        switch (pageCount) {
            case 1:
                if (basic_details_page_validation()) {
                    pageCount += 1;
                    displayPage();
                }
                break;
            
            case 2:
                if (education_details_page_validation()) {
                    pageCount += 1;
                    displayPage();
                }
                break;

            case 3:
                if (work_exp_page_validation()) {
                    pageCount += 1;
                    displayPage();
                }
                break;

            case 4:
                if (language_and_technology_validation()) {
                    pageCount += 1;
                    displayPage();
                }
                break;
            
            case 5:
                if (reference_page_validation()) {
                    pageCount += 1;
                    displayPage();
                }
                break;
        
            default:
                pageCount += 1;
                displayPage();
                break;
        }
    }
}

function displayPage(){
    let all_sections = Array.from(document.getElementsByTagName("section"));

    all_sections.forEach(singleSection => {
        singleSection.style.display = "none";
    });

    all_sections[pageCount-1].style.display = "block";
}

displayPage();