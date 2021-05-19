let journalId = 0;

let journalDb = [];

function createJournal(newJournalId, title, body) {
  const newJournalContainer = document.querySelector('#newJournalContainer');
  newJournalContainer.textContent = '';
  const newJournal = document.createElement('div');
  
  const journalTitle = document.createElement('p');
  journalTitle.className = 'currentJournalTitle';
  journalTitle.id = 'currentJournalTitle' + newJournalId; 
  journalTitle.textContent = 'New Journal'
  journalTitle.contentEditable = true;
  if(title) journalTitle.innerText = title;
  newJournal.appendChild(journalTitle);
  
  const textBox = document.createElement('div');
  textBox.id = 'currentJournalBox' + newJournalId;
  textBox.className = 'currentJournalBox';
  textBox.contentEditable = true;
  textBox.textContent = 'Write your thoughts here!'
  if(body) textBox.innerText = body;
  newJournal.appendChild(textBox);
  newJournalContainer.appendChild(newJournal);
  
  journalTitle.focus();
  
  const id = journalTitle.id.replace('currentJournalTitle', '');
  journalDb[+id] = {
    title: journalTitle.textContent,
    body: textBox.innerText
  }
  localStorage.setItem('journals', JSON.stringify(journalDb));
  
  journalTitle.addEventListener('input', () => {
    const id = journalTitle.id.replace('currentJournalTitle', '');
    journalDb[+id] = {
      title: journalTitle.textContent,
      body: textBox.innerText
    }
    localStorage.setItem('journals', JSON.stringify(journalDb));
  });
  
  textBox.addEventListener('input', () => {
    const id = journalTitle.id.replace('currentJournalTitle', '');
    journalDb[+id] = {
      title: journalTitle.textContent,
      body: textBox.innerText
    }
    localStorage.setItem('journals', JSON.stringify(journalDb));
  });

}

document.getElementById('addJournalBtn').addEventListener('click', () => {
  const journalList = document.querySelector('#journalList');
  createJournal(journalId);
  const journalSideTitleComponent = document.createElement('div');
  journalSideTitleComponent.style.display = 'flex';
  const newJournalSideTitle = document.createElement('h3');
  newJournalSideTitle.id = 'journalSideTitle' + journalId;
  newJournalSideTitle.className = 'journalSideTitle';
  newJournalSideTitle.innerText = 'New Journal'
  
  newJournalSideTitle.addEventListener('click', () => {
    const id = newJournalSideTitle.id.replace('journalSideTitle', '');
    // console.log(journalDb[+id]);
    createJournal(+id, journalDb[+id].title, journalDb[+id].body);

    const journalTitle = document.querySelector('.currentJournalTitle');
    const sideJournalTitle = document.querySelector('#journalSideTitle' + +id);
    journalTitle.addEventListener('input', () => {
      sideJournalTitle.textContent = journalTitle.textContent;
    });
  });

  const journalTitle = document.querySelector('.currentJournalTitle');
  journalTitle.addEventListener('input', () => {
    newJournalSideTitle.textContent = journalTitle.textContent;
  })
  journalSideTitleComponent.appendChild(newJournalSideTitle);
  
  const journalDelete = document.createElement('span');
  journalDelete.className = 'ti-close';
  journalDelete.id = 'journalDelete' + journalId;
  journalDelete.addEventListener('click', () => {
    const thisId = journalDelete.id.replace('journalDelete', '');
    journalDb[+thisId] = {};
    newJournalSideTitle.remove();
    journalDelete.remove();
    localStorage.setItem('journals', JSON.stringify(journalDb));
    const journalTitle = document.querySelector('#currentJournalTitle' + thisId);
    if(journalTitle) {
      journalTitle.remove();
      const journalTextBox = document.querySelector('#currentJournalBox' + thisId);
      if(journalTextBox) journalTextBox.remove();
      let i;
      for(i = journalDb.length-1; i >= 0; i--) {
        if(Object.keys(journalDb[i]).length !== 0) {
          const sideTitle = document.querySelector('#journalSideTitle' + i);
          if(sideTitle) sideTitle.click();
          break;
        }
      }
      if(i === -1) {
        document.getElementById('addJournalBtn').click();
      }
    }

  });

  journalSideTitleComponent.append(journalDelete);
  journalList.append(journalSideTitleComponent);

  journalId++;
});

const journalList = document.getElementById('journalList');
if(journalList.textContent.trim() === '') {
  const savedJournals = localStorage.getItem('journals');
  if(savedJournals && savedJournals !== '[]') {
    console.log('There are saved journals');
    const journalJSON = JSON.parse(savedJournals);

    let id = 0;
    journalJSON.forEach(journal => {
      if(Object.keys(journal).length !== 0){
        document.getElementById('addJournalBtn').click();
        document.querySelector('#journalSideTitle' + id).textContent = journal.title;
        document.querySelector('#currentJournalTitle' + id).textContent = journal.title;
        document.querySelector('#currentJournalBox' + id).innerText = journal.body;
        
        journalDb[id] = {... journal};
        id++;
      }
    });
    localStorage.setItem('journals', JSON.stringify(journalDb));
  } else {
    console.log('There are no saved journals.');
    document.getElementById('addJournalBtn').click();
  }

} else {
  document.getElementById('addJournalBtn').click();
}