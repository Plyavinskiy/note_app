import { notes, categories, icons } from './data.js';
import { generateRandomID, getDatesFromText } from './utils.js';

const statisticsTable = document.querySelector('.stats-table');
const notesTable = document.querySelector('.active-archive-table');
let notesTableShown = true;

function showHeaderIcons() {
  Array.from(document.querySelectorAll('.header-icon')).forEach(col => {
    const hasArchive = col.classList.contains('archive');
    const hasDelete = col.classList.contains('delete');

    if (hasArchive) {
      col.innerHTML = icons.ARCHIVE_ICON;
    }

    if (hasDelete) {
      col.innerHTML = icons.DELETE_ICON;
    }
  });
}

function createNote(note) {
  notes.push(note);
  updateTables();
}

function updateNote(note) {
  try {
    const index = notes.findIndex(n => n.id === note.id);

    if (index < 0) {
      throw 'There is no such note!';
    }

    notes.splice(index, 1, note);
    updateTables();
  } catch(e) {
    console.error(e);
  }
}

function deleteNote(noteID) {
  try {
    const index = notes.findIndex(n => n.id === noteID);

    if (index < 0) {
      throw 'There is no such note!';
    }

    notes.splice(index, 1);
    document.getElementById(noteID).remove();
    clearInnerHTML(statisticsTable);
    createStatisticTable();
  } catch(e) {
    console.error(e);
  }
}

function archiveAndUnarchive(note) {
  notes[notes.findIndex(n => n.id === note.id)]
    .archived = !notes[notes.findIndex(n => n.id === note.id)]
    .archived;

  updateTables()
}

function createForm(note) {
  const form = document.createElement('form');

  form.innerHTML = `
    <input type='text' name='name' value='${typeof note.name === 'string' ? note.name : ''}' placeholder='Name' required>
    <select name='categories'>
      ` + Object.keys(categories).map(c => `<option value='${c}' ${note.category === c ? 'selected' : ''}>${c}</option>`) + `
    </select>
    <textarea name='content' placeholder='Content'>${note.content? note.content : ''}</textarea>
    <input class='cancel' type='button' value='Cancel'>
    <input class='submit-btn' type='submit' value='Submit' >
  `;

  form.querySelector('.cancel').addEventListener('click', () => {
    document.querySelector('.wrapper-div').remove();
  });

  form.onsubmit = (event) => {
    event.preventDefault();

    let newNote = {
      id: (typeof note.name === 'string') ? note.id : generateRandomID(10),
      name: event.target.name.value,
      created: (typeof note.name === 'string') ? note.created : new Date(),
      category: event.target.categories.value,
      content: event.target.content.value,
      dates: getDatesFromText(event.target.content.value),
      archived: (typeof note.name === 'string') ? note.archived : false
    }

    if (typeof note.name === 'string') {
      updateNote(newNote);
    } else {
      createNote(newNote);
    }

    document.querySelector('.wrapper-div').remove();
  };


  const wrapperDiv = document.createElement('div');

  wrapperDiv.className = 'wrapper-div';
  wrapperDiv.append(form);
  document.body.prepend(wrapperDiv);
}

function updateTables() {
  clearAllTables();
  createNotesTable();
  createStatisticTable();
}

function clearAllTables() {
  clearInnerHTML(notesTable);
  clearInnerHTML(statisticsTable);
}

function clearInnerHTML(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createStatisticTable() {
  let ideas, quotes, tasks, thoughts, ideasActive, quotesActive, tasksActive, thoughtsActive;
  ideas = quotes = tasks = thoughts = ideasActive = quotesActive = tasksActive = thoughtsActive = 0;

  notes.forEach(note => {
    if (note.category === 'Idea') {
      ideas++;

      if (!note.archived) {
        ideasActive++;
      }
    }

    if (note.category === 'Quote') {
      quotes++;

      if (!note.archived) {
        quotesActive++;
      }
    }

    if (note.category === 'Task') {
      tasks++;

      if (!note.archived) {
        tasksActive++;
      }
    }

    if (note.category === 'Random Thought') {
      thoughts++;

      if (!note.archived) {
        thoughtsActive++;
      }
    }
  });

  statisticsTable.innerHTML += (ideas) ? createStatisticsRow('Idea', ideasActive, ideas) : ``;
  statisticsTable.innerHTML += (quotes) ? createStatisticsRow('Quote', quotesActive, quotes) : ``;
  statisticsTable.innerHTML += (tasks) ? createStatisticsRow('Task', tasksActive, tasks) : ``;
  statisticsTable.innerHTML += (thoughts) ? createStatisticsRow('Random Thought', thoughtsActive, thoughts) : ``;
}

function createStatisticsRow(category, active, total) {
  return `
    <tr>
      <td className='category-icon statistics-icon'>${ categories[category] }</td>
      <td className='category'>${ category }</td>
      <td className='active'>${ active }</td>
      <td className='archived'>${ total-active }</td>
    </tr>
  `;
}

function createNotesTable() {
  notes.forEach(note => {
    const isArchived = (note.archived === notesTableShown);

    if (!isArchived) {
      notesTable.append( createNoteRow(note) );
    }
  });
}

function createNoteRow(note) {
  const tr = document.createElement('tr');
  tr.id = note.id;

  const creationDateFormat = { month: 'long', day: 'numeric', year: 'numeric' };

  tr.innerHTML = `
    <td className='category-icon fch'>${ categories[note.category] }</td>
    <td className='name'>${ note.name }</td>
    <td className='created'>${ note.created.toLocaleDateString('en-CA', creationDateFormat) }</td>
    <td className='category'>${ note.category }</td>
    <td className='content'>${ note.content }</td>
    <td className='dates'>${ note.dates }</td>
  `;

  const tdEdit = document.createElement('td');
  const tdArchive = document.createElement('td');
  const tdDelete = document.createElement('td');

  tdEdit.className = 'row-icon edit';
  tdEdit.addEventListener('click', () => { createForm(note) });
  tdEdit.innerHTML = icons.EDIT_ICON;

  tdArchive.className = 'row-icon archive';
  tdArchive.addEventListener('click', () => { archiveAndUnarchive(note) });
  tdArchive.innerHTML = notesTableShown ? icons.ARCHIVE_ICON : icons.UNARCHIVE_ICON ;

  tdDelete.className = 'row-icon delete';
  tdDelete.addEventListener('click', () => { deleteNote(note.id) });
  tdDelete.innerHTML = icons.DELETE_ICON;

  tr.append(tdEdit, tdArchive, tdDelete);

  return tr;
}

function switchTable() {
  notesTableShown = !notesTableShown;
  clearInnerHTML(notesTable);
  createNotesTable();

  const mainTable = document.querySelector('.main-table');
  mainTable.innerText = notesTableShown ? 'Active notes' : 'Archive notes';

  const archiveIcon = document.querySelector('.header-icon.archive');
  archiveIcon.innerHTML = notesTableShown ? icons.ARCHIVE_ICON : icons.UNARCHIVE_ICON;
}

export { updateTables, showHeaderIcons, notes }

document.querySelector('.table-switcher').addEventListener('click', switchTable);
document.querySelector('.create-note-btn').addEventListener('click', createForm);

