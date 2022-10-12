'use strict'
const STORAGE_KEY = 'questDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    _saveToStorage()
  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars

  // if (res === 'yes') {
  //   gCurrQuest
  // } else if (res === 'no') {
  //   gCurrQuest = gQuestsTree.no
  // }



  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
  console.log(gPrevQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the questions tree
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest

  console.log(lastRes, gPrevQuest)
  gPrevQuest[lastRes] = newQuest
  console.log(gQuestsTree);
  _saveToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function _saveToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}