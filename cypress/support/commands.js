Cypress.Commands.add('setLanguageMode',(language)=>{
  cy.get('body').then(elem => {
    let languageMode
    if(language=='Hebrew'){
      languageMode='he'
    }else if(language=='English'){
      languageMode=''
    }
    let classAttr 
    if(elem.attr("class").substring(0,2)=='he'){
      classAttr=elem.attr("class").substring(0,2)
    }else{
      classAttr=''
    }
    if(classAttr!=languageMode)
    {
      cy.get('a').contains(/^English$|^עברית$/g).click();
    }
    if(languageMode=='he'){
      cy.get('a').contains(/^English$/).should('exist')
    } else{
      cy.get('a').contains(/^עברית$/).should('exist')
    }
  })
})


Cypress.Commands.add('hebrewSearchRun',({text,page=''})=>{
  cy.setLanguageMode('Hebrew')
  //if the start page
  if(page=='Start'){
    cy.get('[class*="home-logo-holder"]').should('contain','חיפוש בתנ"ך')
    cy.get('input[id="search_box"]').type(text)
    cy.get('button[id="mobile_search_button"]').click({force:true})
  }else{
    cy.get('span[class*="inner-header-logo-title"]').should('contain','חיפוש בתנ"ך')
    cy.get('input[class*="search-form-control"]').clear().type(text)
    cy.get('[class*="fa-search text"]').click({force:true})
  }
  cy.get('[class*="loader"]').should('not.exist')
})

Cypress.Commands.add('clearInput',()=>{
  cy.get('input[class*="search-form-control"]').clear()
  cy.get('[class*="fa-search text"]').click({force:true})
})

Cypress.Commands.add('removeTaamim',()=>{
  cy.get('[class*="text-select f-narkis"]').click()
})



Cypress.Commands.add('resultsTests',(text)=>{
  // cy.get('[class*="loader"]').should('not.exist')
  let nakdanResults=''
  cy.get('[class="sentence-holder"]').within(()=>{
    cy.get('b').parent().then($restOfTheSentence=>{
      nakdanResults=$restOfTheSentence.text()
    })
  }).then(()=>{
      expect(nakdanResults.substring(0,nakdanResults.length-1))
      .to.eq(text)
  }) 
})

Cypress.Commands.add('searchRequest',({url,language,status=200,message='',delaySeconds=0})=>{
  cy.intercept('POST', '**'+url+'**', {
    delayMs:1000*delaySeconds,
    statusCode: status
  })
  cy.setLanguageMode(language)
  if(message.length>0){
    cy.contains(message,{timeout:1000*delaySeconds}).should('not.exist')
  }  
  cy.searchRun('בראשית ברא')

  if(delaySeconds>0){
    cy.get('body').then(($body) => {
      cy.get('[class*="loader"]',{timeout:1000*delaySeconds}).should('not.exist')
      cy.contains(/Loading|טוען נתונים/g,{timeout:1000*delaySeconds}).should('not.exist')
    })
  }

  if(message.length>0){
    cy.contains(message).should('exist')
  }  

   
})


Cypress.Commands.add('resultForMeanings',(arrayOfMapsWithMeaningsNumbers,result)=>{
  for(let i=0;i<arrayOfMapsWithMeaningsNumbers.length;i++){
    for(let [key,value] of arrayOfMapsWithMeaningsNumbers[i]){
      if(result.text().replaceAll('‎','').includes(key)){
        arrayOfMapsWithMeaningsNumbers[i].set(key,value-1)
      }
    }
  }
})


Cypress.Commands.add('resultList',(tests,data,textNumbers)=>{
  let res=[]
  cy.get('.result-list>li').then(list=>{
    res.push(list.length)
  })
  cy.get('.result-list > li').each(result=>{
    if(tests=='wordForms'){
      cy.resultContainsWordsForm(data,result)
    }else if(tests=='wordFormsConsecutive'){
      cy.resultContainsConsecutiveWordsForm(data,result) 
    }else if(tests=='specific search'){
      let specificArr={data}
      cy.resultContainsWordsForm(data,result)
    }else if(tests=='books'){
      cy.resultFromBooks(data,result)
    } else if(tests=='meaningsMaps'){
      cy.get(result).within(()=>{
        cy.get('a[class*="list-collapse-btn hidden-mobile-view"]').click({multiple: true })
      })
      cy.resultForMeanings(data,result)
    } 
    else if(tests=='synonym'){
    cy.get('[class*="loader"]').should('not.exist')
      cy.getResultListOfMeanings(result).then(listMeanings=>{
        cy.resultMeanings(data,listMeanings,textNumbers).then($res=>{
          textNumbers=$res
        })
      })
    }else if(tests='selectedMeaningsAndSynonyms'){
      cy.ResultsOfSelectedMeaningsAndSynonyms(result,data)
    }
  }).then(()=>{
    res.push(textNumbers)
  }).then(()=>{
    return res
  })
})

Cypress.Commands.add('resultPagination',({tests='',data,textNumbers})=>{
  let numberOfPages
  let numOfResults=0
  cy.lastPage().then(lastPage=>{
    numberOfPages=lastPage
  }).then(()=>{
    cy.resultList(tests,data,textNumbers).then(res=>{
      numOfResults=numOfResults+res[0]
      textNumbers=res[1]
    }).then(()=>{
       //Loop through each page
      for(let i=2;i<=numberOfPages;i++){    
        cy.get('ul[class="pagination"] > li').last().click()
        cy.resultList(tests,data,textNumbers).then(res=>{
          numOfResults=numOfResults+res[0]
          textNumbers=res[1]
        })
      }
    })
  }).then(()=>{
    if(tests=='books'){
      for (let [key, value] of data) {
        expect(value).eq(0)
      }
    }
    if(tests=='meaningsMaps'){
      for(let i=0;i<data.length;i++){
        for(let [key,value] of data[i]){
          expect(value).eq(0)
        }
      }
    }
    if(tests=='synonym'){
      expect(textNumbers).eq(0)
    }
    if(textNumbers!==undefined){
      expect(textNumbers).eq(numOfResults)
    }
    cy.get('.f > span > :nth-child(2)').should('contain',numOfResults)
  })
})






Cypress.Commands.add('getMeaning',()=>{
  let meaning
  cy.get('[class="f-narkis"]').siblings().not('[class="text-numbers"]').then(text=>{
    meaning=text.text()
  }).then(()=>{
    return meaning
  })
})



Cypress.Commands.add('resultMeanings',(meaningsAndSynonyms,listMeanings,textNumbers)=>{
  let meaning
  for (let i=0;i<meaningsAndSynonyms.length;i++) {
    meaning=listMeanings.find(x=>x.replaceAll('‎','').replaceAll(' ','')===meaningsAndSynonyms[i])
    if(meaning===meaningsAndSynonyms[i]){
      textNumbers=textNumbers-1
      break
    }
  }
  return textNumbers
})



Cypress.Commands.add('listOfWordsMeanings',(res)=>{
  let meanings=''
  cy.get(res).within(()=>{
    cy.get('a[class*="list-collapse-btn hidden-mobile-view"]').each($listCollapseBtn=>{
      cy.get($listCollapseBtn).click()
      cy.document().its('body').find('div.listing-wrapper').then(listMeanings=>{
        meanings=meanings+listMeanings.text()
      })
      cy.get($listCollapseBtn).click()
    }) 
  }).then(()=>{
    return meanings
  })
})




Cypress.Commands.add('runThrghouMeaning',(synonym)=>{
  let word
  let textNumbers
  cy.get('[class="slide-li"]').each($meaning=>{
    cy.meaningCheckbox($meaning)
    cy.get('[class*="loader"]').should('not.exist')
    let meaningsAndSynonyms=[]
    if(synonym!==undefined){
      meaningsAndSynonyms.push(synonym)
    }
    cy.get($meaning).within(()=>{
      cy.getWordInAList().then($word=>{
        word=$word
        cy.log($word)
      })
      cy.getTextNumbers().then($textNumbers=>{
        textNumbers=$textNumbers
        cy.log($textNumbers)
      })
    }).then(()=>{
      if(textNumbers>0){
        meaningsAndSynonyms.push(word)
      }
    }).then(()=>{
      if(textNumbers>0){
        cy.document().its('body').find('div.he').within(()=>{
          cy.resultPagination({tests:'synonym',data:meaningsAndSynonyms,textNumbers})
        })
      }
    })
    cy.meaningCheckbox($meaning)
  })
})





Cypress.Commands.add('synonymsTests',()=>{
  cy.get('ul[class="inner-ul"]').each($wordMeanings=>{
    cy.get($wordMeanings).within($synonyms=>{
      if($synonyms.find('[class="switch"]').length>0){
        cy.get('[class="switch"]').each($synonym=>{
          cy.get($synonym).click()
          cy.get('[class*="loader"]').should('not.exist')
          cy.document().its('body').find('div.he').within(()=>{
            cy.eachMeaningTests()
          })
          cy.get($synonym).click()
        })
      }     
    })
  })
})


Cypress.Commands.add('meaningCheckbox',($meaning)=>{
  cy.get($meaning).within($checkbox=>{
    if($checkbox.find('[class*=chek-box-holder]').length>0){
      cy.get('[class*=chek-box-holder]').click()
    }
  })
})

Cypress.Commands.add('titleMeaningsOfAWord',()=>{
  cy.get('a[class*="inner-accordion-link"]').then($meanings=>{
    return $meanings.text()
  }) 
})





//***************** */




 Cypress.Commands.add('lastPage',()=>{
  cy.get('[class*="pagination__item"]').last().then($lastPage=>{
    return parseInt($lastPage.text())
  })
})

Cypress.Commands.add('existsInResult',(text)=>{
  let numberOfPages
  let exists=false
  cy.lastPage().then(lastPage=>{
    numberOfPages=lastPage
  }).then(()=>{
    function existsInResults(text){
      return cy.existsInPageResult(text).then($exists=>{
        if($exists==true){
          return true
        }else{
          cy.get('[class*="pagination__navigation"]').last().then($lastPage=>{
            if($lastPage.attr('class').includes('disabled')){
              expect($exists).to.be.true
            }else{
              cy.get('[class*="pagination__navigation"]').last().click()
              return existsInResults(text)
            }
          })
        }
      })
    }
    existsInResults(text)
  })
})

Cypress.Commands.add('existsInPageResult',(text)=>{
  let exists=false
  cy.get('.result-list').within(()=>{
    cy.get('b').each($b=>{
      if($b.text()==text){
        exists=true
      }
    })
  }).then(()=>{
    return exists
  })
})











