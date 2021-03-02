Cypress.Commands.add('showAllWordForms',()=>{
    cy.get('[id="word_forms"] > span').click()
    //Each word in search
    cy.get('[class="inner-accordion"] > li').each($accordionLi=>{
        cy.get($accordionLi).then(()=>{
            //More than 1 word in search
            if($accordionLi.find('[class="inner-accordion-link"]').length>0){
                //Open the list of word form of a word
                cy.get($accordionLi).click()
            }
        }).then(()=>{
            if($accordionLi.find('.morebtn').length>0){
                cy.get($accordionLi).within(()=>{
                    cy.get('.morebtn').click()
                })
            }
        })
    })
})

Cypress.Commands.add('closeAllWordForms',()=>{
    //Each word in search
    cy.get('[class="inner-accordion"] > li').each($accordionLi=>{
        cy.get($accordionLi).then(()=>{
            if($accordionLi.find('.morebtn').length>0){
                cy.get($accordionLi).within(()=>{
                    cy.get('.morebtn').click()
                })
            }
        }).then(()=>{
            //More than 1 word in search
            if($accordionLi.find('[class="inner-accordion-link"]').length>0){
                //Close the list of word form of a word
                cy.get($accordionLi).click()
            }
        })
    })
    cy.get('[id="word_forms"] > span').click()
})

Cypress.Commands.add('eachSelectedWordFormMatrix',()=>{
    let wordFormsMatrix=[]
    //Each word in the search
    cy.get('[class="inner-accordion"] > li').each($searchWord=>{
        cy.get($searchWord).within(()=>{
            cy.selectedWordFormArr().then(wordFormsArr=>{
                wordFormsMatrix.push(wordFormsArr)
            })
        })
    }).then(()=>{
        return wordFormsMatrix
    })
})

Cypress.Commands.add('selectedWordFormArr',()=>{
    let wordFormsArr=[]
    //Each word form 
    cy.get('[class="slide-li"]').each($wordForm=>{
        if($wordForm.text().includes('(0)')){
            return false
        }
        cy.log($wordForm.text())
        cy.get($wordForm).within(()=>{
            cy.getTextNumbers().then(textMumbers=>{
                if(textMumbers!=0){
                    cy.get('[class*="checkbox-indicator"]').then($checkbox=>{
                        //if selected
                        if($checkbox.css('background-color')!=='rgba(0, 0, 0, 0)'){
                            cy.getWordform().then(word=>{
                                wordFormsArr.push(word)
                            })
                        }
                    })
                }
            })
        })
    }).then(()=>{
        return wordFormsArr
    })
})

Cypress.Commands.add('wordFormsWithNumberOfAppearances',()=>{
    //Each word in search
    cy.get('[class="inner-accordion"] > li').each($searchWord=>{
        cy.get($searchWord).within(()=>{
            //More than 1 word form
            if($searchWord.find('[class*="selectAll"]').length>0){
                cy.contains('בחר הכל').click() 
            }
        }).then(()=>{
            cy.get($searchWord).within(()=>{
                //Each word form
                cy.get('[class="slide-li"]').each($wordForm=>{
                    cy.window().then(win => {
                        win.gc()
                    })
                    cy.get($wordForm).within(()=>{
                        cy.getTextNumbers().then($textNum=>{
                            if($textNum==0){
                                return false
                            }else{
                                cy.get($wordForm).click()
                                cy.document().its('body').find('div.he').within(()=>{
                                    cy.eachSelectedWordFormMatrix().
                                    then(selectedWordFormMatrix=>{
                                        expect(selectedWordFormMatrix[0].length).eq(1)
                                        cy.resultPagination({
                                            tests:'wordForms',
                                            data:selectedWordFormMatrix,
                                            textNumbers:$textNum
                                        })
                                    })
                                })
                                cy.get($wordForm).click()
                            }
                        })
                    })
                })
            })
        }).then(()=>{
            cy.get($searchWord).within(()=>{
                //More than 1 word form
                if($searchWord.find('[class*="selectAll"]').length>0){
                    cy.contains('בחר הכל').click() 
                }
            })
        })
    })
})

Cypress.Commands.add('consecutiveWordsFormsArray',()=>{
    let wordFormsArray=[]
    let temp
    let consecutiveWordFormsArray
    cy.eachSelectedWordFormMatrix().then(wordFormsArray=>{
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

Cypress.Commands.add('resultContainsWordsForm',(wordFormsArray,result)=>{
    let boldWordsList=[]
    cy.get(result).within(()=>{
        //Each bold word in result
        cy.get('b').each($b=>{
            if($b.text().charAt(0)=='['||$b.text().charAt(0)=='('){
                boldWordsList.push($b.text().substring(1,$b.text().length-1))
            }else if($b.text().charAt($b.text().length)=='־'||
            $b.text().charAt($b.text().length)=='-'){
                boldWordsList.push($b.text().substring(0,$b.text().length-1))
            }else if($b.text().charAt(0)=='־'||$b.text().charAt(0)=='-'){
                boldWordsList.push($b.text().substring(1))
            }
            else{
                boldWordsList.push($b.text().trim())
            }
        })
    }).then(()=>{
        let hasWordForm=false
        for(let i=0;i<wordFormsArray.length;i++){
            hasWordForm=false
            for (let j=0;j<wordFormsArray[i].length;j++){
                let wordForm=boldWordsList.find(x=>x===wordFormsArray[i][j])
                if(wordForm==wordFormsArray[i][j]){
                    expect(wordForm).eq(wordFormsArray[i][j])
                    hasWordForm=true
                    break  
                }
            }
            expect(hasWordForm).eq(true)
        }
    })
})

Cypress.Commands.add('getWordform',()=>{
    cy.get('[class="f-narkis"]').then(text=>{
        return text.text()
    })
})
  