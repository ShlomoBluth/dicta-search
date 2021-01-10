/// <reference types="cypress"/>

////run tests on requests from search run some in hebrew mode and english mode

describe('RequestsTest',()=>{

    
  before(() => {
    cy.visit('https://search.dicta.org.il/')
  })

  afterEach(() => {
    cy.go(-2)
  })

  
   

  
  it('Error message for response with a delay of 5 minutes when clicking the run button'+
  ' of search page in hebrew mode',()=>{
    cy.visit('https://search.dicta.org.il/')
    cy.searchRequest({
      language:'Hebrew',
      message:'לא ניתן לגשת כעת לשרת, נסה שוב מאוחר יותר',
      delaySeconds:  60*5
    })
  })

  it('Error message for response with a delay of 5 minutes when clicking the run button'+
  ' of search page in english mode',()=>{
    cy.searchRequest({
      language:'English',
      message:'Server error. Please try again later',
      delaySeconds: 60*5
    })
  })

  it('Error message for response with status code 500 when clicking the run button of search page'+
  ' in hebrew mode',()=>{
    cy.searchRequest({
      language:'Hebrew',
      status:500,
      message:'לא ניתן לגשת כעת לשרת, נסה שוב מאוחר יותר'
    })
  })

  it('Error message for response with status code 500 when clicking the run button of search page'+
  ' in english mode',()=>{
    cy.searchRequest({
      language:'English',
      status:500,
      message:'Server error. Please try again later'
    })
  })

    

    
    
})