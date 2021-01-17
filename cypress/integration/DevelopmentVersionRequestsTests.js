///<reference types="cypress"/>

describe('DevelopmentVersionRequestsTests',()=>{

  before(() => {
    cy.visit('https://use-dicta-components-2--tender-hamilton-5d028e.netlify.app/')
  })

  afterEach(() => {
    cy.go(-2)
  })
    
    
  it('Error message for response with a delay of 5 minutes when clicking the run button'+
  ' of search page in hebrew mode',()=>{
    cy.searchRequest({
      language:'Hebrew',
      message:'אופס יש לנו בעיה נסו שנית, או בקרו באתר מאוחר יותר',
      delaySeconds:  60*5
    })
  })

  it('Error message for response with a delay of 5 minutes when clicking the run button'+
  ' of search page in english mode',()=>{
    cy.searchRequest({
      language:'English',
      message:'Oops. Something went wrong Please try again later',
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
      message:'Oops. Something went wrong Please try again later'
    })
  })  
})