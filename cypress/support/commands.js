
Cypress.Commands.add('hebrewSearchRun',({text,page=''})=>{
  cy.setLanguageMode('Hebrew')
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

Cypress.Commands.add('removeTaamim',()=>{
  cy.get('[class*="text-select f-narkis"]').click()
})

Cypress.Commands.add('showAllWordForms',($accordionLi)=>{
  cy.document().its('body').find('div.he').then($body=>{
    if($body.find('[class*="inner-li"]').length>0){
      cy.get($accordionLi).click()
    }
  }).then(()=>{
    cy.get($accordionLi).then($slideLi=>{
      if($slideLi.find('.morebtn').length>0){
        cy.get('.morebtn').click()
      }
    })
  })
})



Cypress.Commands.add('getWordFormsArray',(wordFormsArray)=>{
  cy.get('[id="word_forms"] > span').click()
  cy.get('[class="inner-accordion"] > li').each($accordionLi=>{
    let wordForms=[]
    cy.get($accordionLi).within(()=>{
      cy.showAllWordForms($accordionLi)
    })
    //each word forms of words in the search
    cy.get('.text-numbers').each($textNumbers=>{
      if($textNumbers.text()=='(0)'){
        cy.get($accordionLi).within(()=>{
          cy.get('.inner-accordion-link').click()
          cy.get('[class*="loader"]').should('not.exist')
        })
        return false
      }else{
        wordForms.push($textNumbers.siblings().text())                  
      }
    }).then(()=>{
      wordFormsArray.push(wordForms)
    })
  })
})
    

Cypress.Commands.add('resultContainsWordsForm',(wordFormsArray,result)=>{
  let hasWordForm=false
  for(let i=0;i<wordFormsArray.length;i++){
    hasWordForm=false
    for (let j=0;j<wordFormsArray[i].length;j++){ 
        if(result.text().includes(wordFormsArray[i][j])){
            hasWordForm=true
            break  
        }
    }
    expect(hasWordForm).eq(true)
  }
})

Cypress.Commands.add('resultContainsConsecutiveWordsForm',(wordFormsArray,result)=>{
  let hasWordForm=false
  for(let i=0;i<wordFormsArray.length;i++){
    if(result.text().includes(wordFormsArray[i])){
      hasWordForm=true
      break  
    }
  }
  expect(hasWordForm).eq(true)
})

Cypress.Commands.add('resultFromBooks',(booksMap,result)=>{
  cy.get(result).within(()=>{
    cy.get('.text-primary').then(book=>{
      for (let [key, value] of booksMap) {
        if(book.text().includes(key)){
          booksMap.set(key,value-1)
        }
      }
    })
  })
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

Cypress.Commands.add('getConsecutiveWordsFormsArray',()=>{
  let wordFormsArray=[]
  let temp
  let consecutiveWordFormsArray
  cy.getWordFormsArray(wordFormsArray).then(()=>{
    temp=wordFormsArray[0]
    for(let i=1;i<wordFormsArray.length;i++){
      consecutiveWordFormsArray=[] 
      for (let j=0;j<wordFormsArray[i].length;j++){
        for(let k=0;k<temp.length;k++){
          consecutiveWordFormsArray.push(temp[k]+' '
          +wordFormsArray[i][j])
        }
      }
      temp=consecutiveWordFormsArray
    }
  }).then(()=>{
    return consecutiveWordFormsArray
  })
})

Cypress.Commands.add('wordFormNumberTest',($textNumbers,numberOfPages,textNumber,numOfResults)=>{
  let wordForm=''
  cy.get($textNumbers).parent().parent().within(()=>{
    textNumber=parseInt($textNumbers.text().substring(1,$textNumbers.text().length-1))
    cy.get('input[type="checkbox"]').click({force: true})
    cy.get('[class="f-narkis"]').then(fNarkis=>{
      wordForm=fNarkis.text()
    })
  })



  cy.get('[class*="loader"]').should('not.exist')
  cy.get('body').then(($body)=>{  
    if($body.find('.pagination').length>0){
      cy.get('ul[class="pagination"] > li').then(elements=>{
        numberOfPages=elements.length
      })
    }
  }).then(()=>{
    cy.get('body').then(($body)=>{  
      if($body.find('.pagination').length>0){
        cy.get('ul[class="pagination"] > li').then(elements=>{
          numberOfPages=elements.length
        })
      }
  
      if($body.find('.result-list').length>0){
        cy.log($body.find('.result-list').length)
        cy.get('.result-list > li').each(result=>{
          numOfResults=numOfResults+result.length
          expect(result.text()).contains(wordForm)
        }) 
        //Loop through each page
        for(let i=0;i<numberOfPages-3;i++){    
          cy.get('ul[class="pagination"] > li').last().click()
          cy.get('.result-list > li').each(result=>{
            numOfResults=numOfResults+result.length
            cy.get(result).contains(wordForm)
          })  
        }
      }
    }).then(()=>{
      if(wordForm!=''){
        expect(textNumber).eq(numOfResults)
      }
    })            
  })
  
  

  cy.get($textNumbers).parent().parent().within(()=>{
    cy.get('input[type="checkbox"]').click({force: true})
  })
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
    }else if(tests=='existsInResults'){
      cy.existsInResult(result,data).then(exists=>{
        if(exists==true){
          return true
        }
      })
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
    if(tests=='existsInResults'){

    }
    cy.get('.f > span > :nth-child(2)').should('contain',numOfResults)
  })
})

Cypress.Commands.add('booksMap',()=>{
  let books=new Map()
  cy.get('#books').click()
  cy.get('.inner-accordion-link').each($link=>{
    cy.get($link).click()
    cy.get('.inner-accordion-content > .selectAll > .f').click()
    cy.get('.slide-list > li').each(li=>{
      cy.contains('()').should('not.exist').then(()=>{
        books.set(li.text().substring(li.text().indexOf('ספר')+4),
        parseInt(li.text().substring(li.text().indexOf('(')+1,li.text().indexOf(')'))))
      })
    })
    cy.get('.inner-accordion-content > .selectAll > .f').click()
    cy.get($link).click()
  }).then(()=>{
    return books
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

Cypress.Commands.add('existsInResult',(result,word)=>{
  let exists =false
  cy.get(result).within(()=>{
    cy.get('b').each($b=>{
      if($b.text()==word){
        exists=true
      }
    })
  }).then(()=>{
    return exists
  })
})





