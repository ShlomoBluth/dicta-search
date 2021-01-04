/// <reference types="cypress"/>

////run tests on requests from search run some in hebrew mode and english mode

describe('RequestsTest',()=>{

    
    beforeEach(() => {
      cy.visit('https://search.dicta.org.il/he')
    })

   

  
  it('Message after request failed with seconds delay of response when clicking the run butten'+
  ' of search page',()=>{
    cy.searchRequest({
      language:'Hebrew',
      message:'לא ניתן לגשת כעת לשרת, נסה שוב מאוחר יותר',
      delaySeconds: 60*4
    })
  })

    

    
    
})