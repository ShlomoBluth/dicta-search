///<reference types="cypress"/>





describe('bible-search-tests',()=>{

    before(() => {
        cy.visit('https://use-dicta-components-2--cranky-banach-377068.netlify.app/')
    })

    // afterEach(() => {
    //     cy.go(-2)
    //   })
    

    // it('Run search in hebrew mode',()=>{
    //     cy.setLanguageMode('Hebrew')
    //     cy.get('[class*="home-logo-holder"]').should('contain','חיפוש בתנ"ך')
    //     cy.searchRun('שיר השירים')
    //     cy.resultsTests('שִׁ֥יר הַשִּׁירִ֖ים אֲשֶׁ֥ר לִשְׁלֹמֹֽה')
    // })

    // it('Run search in english mode',()=>{
    //     cy.setLanguageMode('English')
    //     cy.get('[class*="home-logo-holder"]').should('contain','חיפוש בתנ"ך')
    //     cy.searchRun('שיר השירים')
    //     cy.resultsTests('שִׁ֥יר הַשִּׁירִ֖ים אֲשֶׁ֥ר לִשְׁלֹמֹֽה')
    // })

    // it('Run search in hebrew mode',()=>{
    //     cy.setLanguageMode('Hebrew')
    //     cy.get('[class*="home-logo-holder"]').should('contain','חיפוש בתנ"ך')
    //     cy.searchRun('"יום השישי"')
    //     cy.get('[class*="loader"]').should('not.exist')
    //     cy.get('[class*="top-number-of-results"] > span > :nth-child(2)')
    //     .contains(new RegExp('6', "g")).should('exist')
    //     cy.resultsTests('בַּיֹּום֙ הַשִּׁשִּׁ֔י נָשִׂ֖יא לִבְנֵ֣י גָ֑ד אֶלְיָסָ֖ף בֶּן־דְּעוּאֵֽל׃')
    // })

    // it('Run search in hebrew mode',()=>{
    //     cy.setLanguageMode('Hebrew')
    //     cy.get('[class*="home-logo-holder"]').should('contain','חיפוש בתנ"ך')
    //     cy.searchRun('"יום השישי"')
    //     cy.get('[class*="loader"]').should('not.exist')
    //     cy.get('[class*="top-number-of-results"] > span > :nth-child(2)')
    //     .contains(new RegExp('6', "g")).should('exist')
    //     cy.get('.result-list > li').should('have.length',6)
    //     //cy.resultsTests('בַּיֹּום֙ הַשִּׁשִּׁ֔י נָשִׂ֖יא לִבְנֵ֣י גָ֑ד אֶלְיָסָ֖ף בֶּן־דְּעוּאֵֽל׃')
    // })

    // it('Run search in hebrew mode',()=>{
    //     cy.setLanguageMode('Hebrew')
    //     cy.get('[class*="home-logo-holder"]').should('contain','חיפוש בתנ"ך')
    //     cy.searchRun('יום השישי')
    //     cy.get('[class*="loader"]').should('not.exist')
    //     // cy.get('[class*="top-number-of-results"] > span > :nth-child(2)')
    //     // .contains(new RegExp('12', "g")).should('exist')
    //     let numOfResults=0
    //     let numberOfPages
        // cy.get('ul[class="pagination"] > li').then(elements=>{
        //     numberOfPages=elements.length
        // }).then(()=>{
        //     cy.get('.result-list > li').then(elem1=>{
        //         numOfResults=numOfResults+elem1.length
        //     }) 
        //     for(let i=0;i<numberOfPages-3;i++){    
        //         cy.get('ul[class="pagination"] > li').last().click()
        //         cy.get('.result-list > li').then(elem1=>{
        //             numOfResults=numOfResults+elem1.length
        //         })  
        //     }
        // }).then(()=>{
        //      expect(numOfResults).eq(12)
        // })
    // })

    

    // it('Each result has word form of every word in the search',()=>{
    //    cy.hebrewSearchRun({text:'יום השישי',page:'Start'})
    //     let wordFormsArray=[]
    //     cy.removeTaamim()
    //     cy.getWordFormsArray(wordFormsArray).then(()=>{
    //         cy.resultPagination({
    //             wordFormsArray:wordFormsArray
    //         })
    //     })
    //     cy.get('[id="word_forms"] > span').click()
    // })
        
       
    
    // it('Evry word forms with number of Appearances',()=>{
    //     cy.hebrewSearchRun({text:'אריה',page:'Start'})
    //     cy.removeTaamim()
    //     let textNumber
    //     let numberOfPages
    //     let numOfResults=0
    //     cy.get('[id="word_forms"] > span').click()
    //     cy.get('[class="inner-accordion"] > li').each($accordionLi=>{
    //         cy.get($accordionLi).within(()=>{
    //             cy.showAllWordForms($accordionLi)
    //             cy.contains('בחר הכל').click() 
    //         })
    //         cy.get('.text-numbers').each($textNumbers=>{
    //             if($textNumbers.text()=='(0)'){
    //                 return false
    //             }else{
    //                 cy.wordFormNumberTest($textNumbers,numberOfPages,textNumber,numOfResults)                  
    //             }
    //         })
    //         cy.get($accordionLi).within($wordForms=>{
    //             cy.contains('בחר הכל').click()
    //             if($wordForms.find('.inner-accordion-link').length>0){
    //                 cy.get('.inner-accordion-link').click() 
    //             }          
    //         })
    //     })
    //     cy.get('[id="word_forms"] > span').click()
    // })

    // it('Each result has specific search',()=>{
    //     cy.hebrewSearchRun({text:'לַאֲרָיֹות',page:'Start'})
    //      let wordFormsArray=[]
    //      cy.removeTaamim()
    //      cy.resultPagination({
    //         tests: 'specific search',
    //         data:'לַאֲרָיֹות'
    //      })
    //      cy.get('[id="word_forms"] > span').click()
    //  })

    

    // it('Each result has consecutive word forms of every word in the search',()=>{
    //     cy.hebrewSearchRun({text:'"יום השישי"'})
    //     cy.removeTaamim()
        // cy.getConsecutiveWordsFormsArray().then(consecutiveWordFormsArray=>{
        //     cy.resultPagination({
        //         tests:'wordFormsConsecutive',
        //         data:consecutiveWordFormsArray
        //     })
        // })
    //     cy.get('[id="word_forms"] > span').click()
    // })

    // it('Evry books with number of Appearances',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
    //     cy.booksMap().then(books=>{
    //         cy.resultPagination({
    //             tests:'books',
    //             data:books
    //         })
    //     })
    //     cy.get('#books').click()
    // })

    // it('Each result has meaning of every word in the search',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי',page:'Start'})
    //     cy.removeTaamim()
    //     cy.showMeaningsAndSynonyms()
    //     cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //         cy.resultPagination({
    //             tests:'selectedMeaningsAndSynonyms',
    //             data:meaningsAndSynonymsMatrix
    //         })
    //     })
    //     cy.clearInput()  
    // })

    // it('Each meaning with number of Appearances',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
    //     //cy.removeTaamim()
    //     cy.showMeaningsAndSynonyms()
    //     cy.eachMeaningTests()
    //     cy.clearInput()  
    // })

    // it('Evry meaning with synonym and a number of Appearances',()=>{
    //     cy.hebrewSearchRun({text:'שיר השירים'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.synonymsTests()
    //     cy.clearInput()  
    // })

    // it('Meaning with synonyms',()=>{
    //     let numberOfResults
    //     cy.hebrewSearchRun({text:'צבי'})
    //     //num of results befor synonyms
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         numberOfResults=parseInt($numberOfResults.text())
    //     }).then(()=>{
    //         cy.showMeaningsAndSynonyms()
    //         cy.selectSynonym('עֹפֶר')
    //         cy.selectSynonym('צָבָא')
    //     }).then(()=>{
    //         //num of results after synonyms
    //         cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //             expect(parseInt($numberOfResults.text())).to.greaterThan( numberOfResults)
    //         })
    //     }).then(()=>{
    //         cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //             cy.resultPagination({
    //                 tests:'selectedMeaningsAndSynonyms',
    //                 data:meaningsAndSynonymsMatrix
    //             })
    //         })
    //     })
    //     cy.clearInput()  
    // })

    // it('remove Meaning',()=>{
    //     cy.hebrewSearchRun({text:'אריה'})
    //     cy.showMeaningsAndSynonyms()
    //     cy.get('p').contains('אֲרִי').click().then(()=>{
    //         cy.get('[class*="loader"]').should('not.exist')
    //         cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //             cy.resultPagination({
    //                 tests:'selectedMeaningsAndSynonyms',
    //                 data:meaningsAndSynonymsMatrix
    //             })
    //         })
    //     })  
    //     cy.clearInput()      
    // })

    


    // it('No meanings but there are synonyms',()=>{
    //     cy.hebrewSearchRun({text:'ששון חדווה'})
    //     cy.get('[class="result-list"]').should('not.exist').then(()=>{
    //         cy.showMeaningsAndSynonyms()
    //         cy.get('[class="inner-ul"]').first().within(()=>{
    //             cy.selectSynonym('גִּילָה')
    //         })
    //         cy.get('[class="inner-ul"]').first().next().within(()=>{
    //             cy.selectSynonym('רִנָּה')
    //         })
    //     }).then(()=>{
            // cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            //     expect(parseInt($numberOfResults.text())).to.eq(6)
            // })
    //     })
        // cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
        //     cy.resultPagination({tests:'selectedMeaningsAndSynonyms',data:meaningsAndSynonymsMatrix})
        // })
        // cy.clearInput()  
    // })

    // it('A pair of words that come one after the other',()=>{
    //     cy.hebrewSearchRun({text:'שלום בית',page:'Start'})
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         expect(parseInt($numberOfResults.text())).to.eq(116)
    //     })
    //     cy.hebrewSearchRun({text:'"שלום בית"'})
    //     cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //         expect(parseInt($numberOfResults.text())).to.eq(2)
    //     }).then(()=>{
    //         cy.removeTaamim()
    //         cy.getConsecutiveWordsFormsArray().then(consecutiveWordFormsArray=>{
    //             cy.resultPagination({
    //                 tests:'wordFormsConsecutive',
    //                 data:consecutiveWordFormsArray
    //             })
    //         })
    //     })
        
    // })

    it('Search with root words',()=>{
        cy.hebrewSearchRun({text:'ברא',page:'Start'})
         cy.removeTaamim()
         cy.resultPagination({
            tests: 'existsInResults',
            data:'וַיִּבְרָא'
         })
        //  cy.get('[id="word_forms"] > span').click()
     })



})