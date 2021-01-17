/// <reference types="cypress"/>

////run tests on requests from search run some in hebrew mode and english mode

describe('RequestsTest',()=>{

    
  before(() => {
    cy.visit('https://search.dicta.org.il/')
  })

  afterEach(() => {
    cy.go(-2)
  })

  // cy.newIntercept('/lexemes',delaySeconds,status,'lexemes')
  // cy.newIntercept('/related',delaySeconds,status,'related')
  // cy.newIntercept('/wordforms',delaySeconds,status,'wordforms')
  //cy.newIntercept('/search',delaySeconds,status,'search')
  // cy.newIntercept('/books',delaySeconds,status,'books')
  // cy.newIntercept('/textAnalysis',delaySeconds,status,'textAnalysis')
   

  
  it('Error message for response with a delay of 5 minutes when clicking the run button'+
  ' of search page in hebrew mode',()=>{
    cy.searchRequest({
      url:'/search',
      language:'Hebrew',
      message:'אופס יש לנו בעיה נסו שנית, או בקרו באתר מאוחר יותר',
      delaySeconds:  60*5
    })
  })

  // it('Error message for response with a delay of 5 minutes when clicking the run button'+
  // ' of search page in english mode',()=>{
  //   cy.searchRequest({
  //     language:'English',
  //     message:'Oops. Something went wrong Please try again later',
  //     delaySeconds: 60*5
  //   })
  // })

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
      message:'Oops. Something went wrong Please try again later'
    })
  })  

    

    
    
})