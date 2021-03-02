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

    

    it('Each result has word form of every word in the search',()=>{
        cy.hebrewSearchRun({text:'יום השישי',page:'Start'})
        cy.removeTaamim()
        cy.showAllWordForms()
        cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
            cy.resultPagination({
                tests:'wordForms',
                data:selectedWordFormMatrix
            })
        })
        cy.closeAllWordForms()
    })

    it('Remove word form',()=>{
        cy.hebrewSearchRun({text:'יום השישי'})
        cy.showAllWordForms()
        cy.contains('יָמִים').click()
        cy.eachSelectedWordFormMatrix().then(selectedWordFormMatrix=>{
            cy.resultPagination({
                tests:'wordForms',
                data:selectedWordFormMatrix
            })
        })
        cy.contains('יָמִים').click()
        cy.closeAllWordForms()
    })
        
       
    
    it('Evry word forms with number of Appearances',()=>{
        cy.hebrewSearchRun({text:'אריה'})
        cy.removeTaamim()
        cy.showAllWordForms()
        cy.wordFormsWithNumberOfAppearances()
        cy.closeAllWordForms()
    })

    it('A pair of words that come one after the other',()=>{
        cy.hebrewSearchRun({text:'שלום בית'})
        //Number of results
        cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            expect(parseInt($numberOfResults.text())).to.eq(116)
        })
        cy.hebrewSearchRun({text:'"שלום בית"'})
        //Number of results
        cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
            expect(parseInt($numberOfResults.text())).to.eq(2)
        }).then(()=>{
            cy.showAllWordForms()
            cy.removeTaamim()
            cy.consecutiveWordsFormsArray().then(consecutiveWordFormsArray=>{
                cy.resultPagination({
                    tests:'wordFormsConsecutive',
                    data:consecutiveWordFormsArray
                })
            })
        })
        cy.closeAllWordForms()
    })

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
    //     cy.clearInput()
    // })

    // it('Each result has meaning of every word in the search',()=>{
    //     cy.hebrewSearchRun({text:'יום השישי'})
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
    //         cy.get('.f > span > :nth-child(2)').then($numberOfResults=>{
    //             expect(parseInt($numberOfResults.text())).to.eq(6)
    //         })
    //     })
    //     cy.eachSelectedMeaningsAndSynonymsMatrix().then(meaningsAndSynonymsMatrix=>{
    //         cy.resultPagination({tests:'selectedMeaningsAndSynonyms',data:meaningsAndSynonymsMatrix})
    //     })
    //     cy.clearInput()  
    // })

    

    // it('Search with root words',()=>{
    //     cy.hebrewSearchRun({text:'ברא',page:'Start'})
    //     cy.removeTaamim()
    //     cy.existsInResult('וַיִּבְרָא')
    //     cy.clearInput() 
    // })

    // it('Full spelling',()=>{
    //     cy.hebrewSearchRun({text:'דָּוִיד'})
    //     cy.existsInResult('דָוִד')
    //     cy.clearInput() 
    // })

    // it('Partial spelling',()=>{
    //     cy.hebrewSearchRun({text:'דָוִד'})
    //     cy.existsInResult('דָּוִיד')
    //     cy.clearInput() 
    // })

    // it('Second person',()=>{
    //     cy.hebrewSearchRun({text:'אֹתְכָה'})
    //     cy.existsInResult('אֹותְךָ')
    //     cy.clearInput() 
    // })

    // it('Second person',()=>{
    //     cy.hebrewSearchRun({text:'אֹותְךָ'})
    //     cy.existsInResult('אֹתְכָה')
    //     cy.clearInput() 
    // })

    // it('Second person, female',()=>{
    //     cy.hebrewSearchRun({text:'גַּרְתָּה'})
    //     cy.existsInResult('גַּרְתָּ')
    //     cy.clearInput() 
    // })

    // it('Second person, female',()=>{
    //     cy.hebrewSearchRun({text:'גַּרְתָּ'})
    //     cy.existsInResult('גַּרְתָּה')
    //     cy.clearInput() 
    // })

    // it('Third person',()=>{
    //     cy.hebrewSearchRun({text:'כֻּלֹּה'})
    //     cy.existsInResult('כֻּלֹּו')
    //     cy.clearInput() 
    // })

    // it('Third person',()=>{
    //     cy.hebrewSearchRun({text:'כֻּלֹּו'})
    //     cy.existsInResult('כֻּלֹּה')
    //     cy.clearInput() 
    // })

    // it('Additional א',()=>{
    //     cy.hebrewSearchRun({text:'ונטמאתם'})
    //     cy.existsInResult('וְנִטְמֵתֶם')
    //     cy.clearInput() 
    // })

    // it('Missing א',()=>{
    //     cy.hebrewSearchRun({text:'ורציתי'})
    //     cy.existsInResult('וְרָצִאתִי')
    //     cy.clearInput() 
    // })

    // it('Missing ה',()=>{
    //     cy.hebrewSearchRun({text:'כָּמֹוךָ'})
    //     cy.existsInResult('כָמֹכָה')
    //     cy.clearInput() 
    // })

    // it('Additional ה',()=>{
    //     cy.hebrewSearchRun({text:'כָמֹכָה'})
    //     cy.existsInResult('כָּמֹוךָ')
    //     cy.clearInput() 
    // })

    // it('Interchangeable letters',()=>{
    //     cy.hebrewSearchRun({text:'ימלא'})
    //     cy.existsInResult('יְמַלֵּה')
    //     cy.clearInput() 
    // })

    // it('Interchangeable letters',()=>{
    //     cy.hebrewSearchRun({text:'יְמַלֵּה'})
    //     cy.existsInResult('יִמָּלֵא')
    //     cy.clearInput() 
    // })

    // it('Interchangeable letters',()=>{
    //     cy.hebrewSearchRun({text:'וארסתיך'})
    //     cy.existsInResult('וְאֵרַשְׂתִּיךְ')
    //     cy.clearInput() 
    // })

    // it('Different ways the bible refers to G-d',()=>{
    //     cy.hebrewSearchRun({text:'א-להים'})
    //     cy.existsInResult('הָאֱלֹהִים')
    //     cy.clearInput() 
    // })

    // it('Search with numbers',()=>{
    //     cy.hebrewSearchRun({text:'127'})
    //     cy.existsInResult('מֵאָה')
    //     cy.existsInResult('וְעֶשְׂרִים')
    //     cy.existsInResult('וְשֶׁבַע')
    //     cy.clearInput() 
    // })




})